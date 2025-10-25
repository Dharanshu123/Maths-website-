-- =============================================
-- SUPABASE FUNCTIONS & BUSINESS LOGIC
-- Custom functions for your website backend
-- =============================================

-- =============================================
-- CONTACT MANAGEMENT FUNCTIONS
-- =============================================

-- Function to get contact statistics
CREATE OR REPLACE FUNCTION get_contact_stats()
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'total', (SELECT COUNT(*) FROM public.contacts),
    'new', (SELECT COUNT(*) FROM public.contacts WHERE status = 'new'),
    'contacted', (SELECT COUNT(*) FROM public.contacts WHERE status = 'contacted'),
    'closed', (SELECT COUNT(*) FROM public.contacts WHERE status = 'closed'),
    'this_month', (SELECT COUNT(*) FROM public.contacts WHERE created_at >= date_trunc('month', NOW())),
    'this_week', (SELECT COUNT(*) FROM public.contacts WHERE created_at >= date_trunc('week', NOW()))
  ) INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to assign contact to user
CREATE OR REPLACE FUNCTION assign_contact(contact_id UUID, user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  -- Check if user has permission (admin or manager)
  IF NOT is_admin_or_manager(auth.uid()) THEN
    RAISE EXCEPTION 'Insufficient permissions';
  END IF;
  
  UPDATE public.contacts 
  SET assigned_to = user_id, 
      status = 'contacted',
      updated_at = NOW()
  WHERE id = contact_id;
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- APPOINTMENT FUNCTIONS
-- =============================================

-- Function to check appointment availability
CREATE OR REPLACE FUNCTION check_appointment_availability(
  appointment_date TIMESTAMPTZ,
  duration_minutes INTEGER DEFAULT 60
)
RETURNS BOOLEAN AS $$
DECLARE
  conflict_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO conflict_count
  FROM public.appointments
  WHERE status IN ('scheduled', 'confirmed')
    AND (
      (appointment_date BETWEEN appointment_date AND appointment_date + INTERVAL '1 minute' * duration_minutes)
      OR
      (appointment_date + INTERVAL '1 minute' * duration_minutes BETWEEN appointment_date AND appointment_date + INTERVAL '1 minute' * duration_minutes)
    );
  
  RETURN conflict_count = 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to book appointment
CREATE OR REPLACE FUNCTION book_appointment(
  client_name TEXT,
  client_email TEXT,
  client_phone TEXT,
  service_id UUID,
  appointment_date TIMESTAMPTZ,
  notes TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  new_appointment_id UUID;
  service_duration INTEGER;
BEGIN
  -- Get service duration
  SELECT duration_minutes INTO service_duration
  FROM public.services
  WHERE id = service_id AND is_active = true;
  
  IF service_duration IS NULL THEN
    RAISE EXCEPTION 'Invalid or inactive service';
  END IF;
  
  -- Check availability
  IF NOT check_appointment_availability(appointment_date, service_duration) THEN
    RAISE EXCEPTION 'Time slot not available';
  END IF;
  
  -- Create appointment
  INSERT INTO public.appointments (
    client_name, client_email, client_phone, service_id, 
    appointment_date, duration_minutes, notes
  ) VALUES (
    client_name, client_email, client_phone, service_id,
    appointment_date, service_duration, notes
  ) RETURNING id INTO new_appointment_id;
  
  RETURN new_appointment_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- ANALYTICS FUNCTIONS
-- =============================================

-- Function to track page views
CREATE OR REPLACE FUNCTION track_page_view(
  page_path TEXT,
  user_agent TEXT DEFAULT NULL,
  ip_address INET DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
  INSERT INTO public.analytics_events (
    event_type, 
    event_data, 
    user_id, 
    user_agent, 
    ip_address
  ) VALUES (
    'page_view',
    json_build_object('page', page_path),
    auth.uid(),
    user_agent,
    ip_address
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get analytics summary
CREATE OR REPLACE FUNCTION get_analytics_summary(days INTEGER DEFAULT 30)
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  -- Only admins can access analytics
  IF NOT is_admin(auth.uid()) THEN
    RAISE EXCEPTION 'Insufficient permissions';
  END IF;
  
  SELECT json_build_object(
    'page_views', (
      SELECT COUNT(*) 
      FROM public.analytics_events 
      WHERE event_type = 'page_view' 
        AND created_at >= NOW() - INTERVAL '1 day' * days
    ),
    'unique_visitors', (
      SELECT COUNT(DISTINCT ip_address) 
      FROM public.analytics_events 
      WHERE event_type = 'page_view' 
        AND created_at >= NOW() - INTERVAL '1 day' * days
    ),
    'top_pages', (
      SELECT json_agg(
        json_build_object(
          'page', event_data->>'page',
          'views', count
        )
      )
      FROM (
        SELECT event_data->>'page' as page, COUNT(*) as count
        FROM public.analytics_events
        WHERE event_type = 'page_view'
          AND created_at >= NOW() - INTERVAL '1 day' * days
        GROUP BY event_data->>'page'
        ORDER BY COUNT(*) DESC
        LIMIT 10
      ) top_pages_data
    )
  ) INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- NEWSLETTER FUNCTIONS
-- =============================================

-- Function to subscribe to newsletter
CREATE OR REPLACE FUNCTION subscribe_newsletter(
  subscriber_email TEXT,
  subscriber_name TEXT DEFAULT NULL,
  source_page TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  subscriber_id UUID;
BEGIN
  INSERT INTO public.newsletter_subscribers (email, name, source, tags)
  VALUES (subscriber_email, subscriber_name, source_page, ARRAY[source_page])
  ON CONFLICT (email) 
  DO UPDATE SET 
    status = 'active',
    name = COALESCE(EXCLUDED.name, newsletter_subscribers.name),
    subscribed_at = NOW()
  RETURNING id INTO subscriber_id;
  
  RETURN subscriber_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to unsubscribe from newsletter
CREATE OR REPLACE FUNCTION unsubscribe_newsletter(subscriber_email TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  UPDATE public.newsletter_subscribers
  SET status = 'unsubscribed', unsubscribed_at = NOW()
  WHERE email = subscriber_email;
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- CONTENT MANAGEMENT FUNCTIONS
-- =============================================

-- Function to publish/unpublish content
CREATE OR REPLACE FUNCTION toggle_content_status(
  table_name TEXT,
  content_id UUID,
  publish BOOLEAN
)
RETURNS BOOLEAN AS $$
BEGIN
  -- Check permissions
  IF NOT is_admin_or_manager(auth.uid()) THEN
    RAISE EXCEPTION 'Insufficient permissions';
  END IF;
  
  -- Update based on table
  CASE table_name
    WHEN 'pages' THEN
      UPDATE public.pages SET is_published = publish WHERE id = content_id;
    WHEN 'articles' THEN
      UPDATE public.articles SET is_published = publish, published_at = CASE WHEN publish THEN NOW() ELSE NULL END WHERE id = content_id;
    WHEN 'services' THEN
      UPDATE public.services SET is_active = publish WHERE id = content_id;
    WHEN 'pricing_plans' THEN
      UPDATE public.pricing_plans SET is_active = publish WHERE id = content_id;
    WHEN 'faqs' THEN
      UPDATE public.faqs SET is_published = publish WHERE id = content_id;
    ELSE
      RAISE EXCEPTION 'Invalid table name';
  END CASE;
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- SEARCH FUNCTIONS
-- =============================================

-- Function for full-text search across content
CREATE OR REPLACE FUNCTION search_content(search_query TEXT)
RETURNS TABLE(
  type TEXT,
  id UUID,
  title TEXT,
  excerpt TEXT,
  url TEXT,
  relevance REAL
) AS $$
BEGIN
  RETURN QUERY
  -- Search in articles
  SELECT 
    'article'::TEXT as type,
    a.id,
    a.title,
    a.excerpt,
    '/blog/' || a.slug as url,
    ts_rank(to_tsvector('english', a.title || ' ' || a.content), plainto_tsquery('english', search_query)) as relevance
  FROM public.articles a
  WHERE a.is_published = true
    AND (
      to_tsvector('english', a.title || ' ' || a.content) @@ plainto_tsquery('english', search_query)
    )
  
  UNION ALL
  
  -- Search in services
  SELECT 
    'service'::TEXT as type,
    s.id,
    s.name as title,
    s.short_description as excerpt,
    '/services#' || s.id::TEXT as url,
    ts_rank(to_tsvector('english', s.name || ' ' || s.description), plainto_tsquery('english', search_query)) as relevance
  FROM public.services s
  WHERE s.is_active = true
    AND (
      to_tsvector('english', s.name || ' ' || s.description) @@ plainto_tsquery('english', search_query)
    )
  
  UNION ALL
  
  -- Search in FAQs
  SELECT 
    'faq'::TEXT as type,
    f.id,
    f.question as title,
    LEFT(f.answer, 200) as excerpt,
    '/faq#' || f.id::TEXT as url,
    ts_rank(to_tsvector('english', f.question || ' ' || f.answer), plainto_tsquery('english', search_query)) as relevance
  FROM public.faqs f
  WHERE f.is_published = true
    AND (
      to_tsvector('english', f.question || ' ' || f.answer) @@ plainto_tsquery('english', search_query)
    )
  
  ORDER BY relevance DESC
  LIMIT 20;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- UTILITY FUNCTIONS
-- =============================================

-- Function to generate slug from title
CREATE OR REPLACE FUNCTION generate_slug(title TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN lower(
    regexp_replace(
      regexp_replace(
        regexp_replace(title, '[^a-zA-Z0-9\s-]', '', 'g'),
        '\s+', '-', 'g'
      ),
      '-+', '-', 'g'
    )
  );
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function to get site setting
CREATE OR REPLACE FUNCTION get_site_setting(setting_key TEXT)
RETURNS JSONB AS $$
DECLARE
  setting_value JSONB;
BEGIN
  SELECT value INTO setting_value
  FROM public.site_settings
  WHERE key = setting_key;
  
  RETURN setting_value;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
