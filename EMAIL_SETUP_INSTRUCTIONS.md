# Email Setup Instructions for Contact Form

Your contact form is currently working and logging submissions to the console. To enable email notifications, you need to configure one of the following email services:

## Option 1: Gmail (Recommended)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. **Update `.env.local`**:
   ```env
   GMAIL_USER=your-actual-email@gmail.com
   GMAIL_APP_PASSWORD=your-16-character-app-password
   ```

## Option 2: EmailJS (Alternative)

1. **Create EmailJS Account**: https://www.emailjs.com/
2. **Set up Email Service** (Gmail, Outlook, etc.)
3. **Create Email Template** with these variables:
   - `{{guardian_name}}`
   - `{{phone}}`
   - `{{email}}`
   - `{{student_name}}`
   - `{{school}}`
   - `{{grade_level}}`
   - `{{message}}`
   - `{{source}}`
   - `{{submitted_at}}`
4. **Update `.env.local`**:
   ```env
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   ```

## Current Status

✅ **Contact form is working** - submissions are logged to console
✅ **Form validation** - client and server-side validation
✅ **Supabase storage** - attempts to store in database (if configured)
⚠️ **Email notifications** - requires setup above

## Testing

After configuring email, restart your development server:
```bash
npm run dev
```

Test the contact form and check:
1. Form submits successfully
2. You receive business notification email
3. Customer receives confirmation email
4. Console shows "Email sent successfully"

## Production Deployment

Remember to:
1. Add the same environment variables to Vercel
2. Test the form on your live site
3. Monitor the Vercel function logs for any issues

## Support

If you need help setting up email services, contact your developer or refer to:
- [Gmail App Passwords Guide](https://support.google.com/accounts/answer/185833)
- [EmailJS Documentation](https://www.emailjs.com/docs/)
