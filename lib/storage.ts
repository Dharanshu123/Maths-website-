import { supabase } from './supabase'

// =============================================
// FILE STORAGE CONFIGURATION
// =============================================

// Storage buckets configuration
export const STORAGE_BUCKETS = {
  AVATARS: 'avatars',
  MEDIA: 'media',
  DOCUMENTS: 'documents',
  TEMP: 'temp'
} as const

// File type configurations
export const FILE_CONFIGS = {
  images: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    bucket: STORAGE_BUCKETS.MEDIA
  },
  documents: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    bucket: STORAGE_BUCKETS.DOCUMENTS
  },
  avatars: {
    maxSize: 2 * 1024 * 1024, // 2MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
    bucket: STORAGE_BUCKETS.AVATARS
  }
} as const

// =============================================
// STORAGE UTILITY FUNCTIONS
// =============================================

export const storage = {
  // Upload file to storage
  uploadFile: async (
    file: File, 
    path: string, 
    bucket: string = STORAGE_BUCKETS.MEDIA,
    options?: { upsert?: boolean }
  ) => {
    try {
      // Validate file
      const validation = storage.validateFile(file, bucket)
      if (!validation.isValid) {
        throw new Error(validation.error || 'File validation failed')
      }

      // Generate unique filename if not provided
      const fileName = path || `${Date.now()}-${file.name}`
      
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: options?.upsert || false
        })

      if (error) throw error

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName)

      // Save to media_files table
      const { data: mediaFile, error: dbError } = await supabase
        .from('media_files')
        .insert({
          filename: fileName,
          original_name: file.name,
          file_path: data.path,
          file_size: file.size,
          mime_type: file.type,
          uploaded_by: (await supabase.auth.getUser()).data.user?.id
        })
        .select()
        .single()

      if (dbError) {
        console.error('Error saving to database:', dbError)
      }

      return {
        data: {
          path: data.path,
          publicUrl,
          mediaFile
        },
        error: null
      }
    } catch (error) {
      return {
        data: null,
        error: error as Error
      }
    }
  },

  // Delete file from storage
  deleteFile: async (path: string, bucket: string = STORAGE_BUCKETS.MEDIA) => {
    try {
      const { error } = await supabase.storage
        .from(bucket)
        .remove([path])

      if (error) throw error

      // Remove from media_files table
      await supabase
        .from('media_files')
        .delete()
        .eq('file_path', path)

      return { error: null }
    } catch (error) {
      return { error: error as Error }
    }
  },

  // Get public URL for file
  getPublicUrl: (path: string, bucket: string = STORAGE_BUCKETS.MEDIA) => {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path)
    
    return data.publicUrl
  },

  // Create signed URL for private files
  createSignedUrl: async (
    path: string, 
    expiresIn: number = 3600, 
    bucket: string = STORAGE_BUCKETS.MEDIA
  ) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(path, expiresIn)

    return { data, error }
  },

  // List files in bucket
  listFiles: async (
    folder: string = '', 
    bucket: string = STORAGE_BUCKETS.MEDIA,
    limit: number = 100
  ) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(folder, {
        limit,
        offset: 0
      })

    return { data, error }
  },

  // Validate file before upload
  validateFile: (file: File, bucket: string) => {
    // Determine file type category
    let category: keyof typeof FILE_CONFIGS = 'images'
    
    if (bucket === STORAGE_BUCKETS.AVATARS) {
      category = 'avatars'
    } else if (file.type.startsWith('application/')) {
      category = 'documents'
    } else if (file.type.startsWith('image/')) {
      category = 'images'
    }

    const config = FILE_CONFIGS[category]

    // Check file size
    if (file.size > config.maxSize) {
      return {
        isValid: false,
        error: `File size exceeds ${config.maxSize / (1024 * 1024)}MB limit`
      }
    }

    // Check file type
    if (!(config.allowedTypes as readonly string[]).includes(file.type)) {
      return {
        isValid: false,
        error: `File type ${file.type} not allowed. Allowed types: ${config.allowedTypes.join(', ')}`
      }
    }

    return { isValid: true, error: null }
  },

  // Upload multiple files
  uploadMultiple: async (
    files: File[],
    folder: string = '',
    bucket: string = STORAGE_BUCKETS.MEDIA
  ) => {
    const results = await Promise.allSettled(
      files.map((file, index) => 
        storage.uploadFile(file, `${folder}/${Date.now()}-${index}-${file.name}`, bucket)
      )
    )

    const successful = results
      .filter((result): result is PromiseFulfilledResult<any> => result.status === 'fulfilled')
      .map(result => result.value.data)
      .filter(data => data !== null)

    const failed = results
      .filter((result): result is PromiseRejectedResult => result.status === 'rejected')
      .map(result => result.reason)

    return {
      successful,
      failed,
      total: files.length
    }
  }
}

// =============================================
// IMAGE PROCESSING UTILITIES
// =============================================

export const imageUtils = {
  // Resize image before upload
  resizeImage: (file: File, maxWidth: number = 1200, quality: number = 0.8): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()

      img.onload = () => {
        // Calculate new dimensions
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height)
        canvas.width = img.width * ratio
        canvas.height = img.height * ratio

        // Draw and compress
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const resizedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now()
              })
              resolve(resizedFile)
            }
          },
          file.type,
          quality
        )
      }

      img.src = URL.createObjectURL(file)
    })
  },

  // Generate thumbnail
  generateThumbnail: (file: File, size: number = 200): Promise<File> => {
    return imageUtils.resizeImage(file, size, 0.7)
  },

  // Convert to WebP format
  convertToWebP: (file: File, quality: number = 0.8): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()

      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx?.drawImage(img, 0, 0)

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const webpFile = new File([blob], file.name.replace(/\.[^/.]+$/, '.webp'), {
                type: 'image/webp',
                lastModified: Date.now()
              })
              resolve(webpFile)
            }
          },
          'image/webp',
          quality
        )
      }

      img.src = URL.createObjectURL(file)
    })
  }
}

// =============================================
// STORAGE POLICIES SETUP (Run in Supabase SQL Editor)
// =============================================

export const STORAGE_POLICIES_SQL = `
-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES 
('avatars', 'avatars', true),
('media', 'media', true),
('documents', 'documents', false),
('temp', 'temp', false)
ON CONFLICT (id) DO NOTHING;

-- Avatars bucket policies
CREATE POLICY "Users can upload their own avatar" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'avatars' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Anyone can view avatars" ON storage.objects
FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Users can update their own avatar" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'avatars' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Media bucket policies
CREATE POLICY "Authenticated users can upload media" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'media' AND 
  auth.role() = 'authenticated'
);

CREATE POLICY "Anyone can view media" ON storage.objects
FOR SELECT USING (bucket_id = 'media');

CREATE POLICY "Users can update their own media" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'media' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Documents bucket policies (private)
CREATE POLICY "Authenticated users can upload documents" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'documents' AND 
  auth.role() = 'authenticated'
);

CREATE POLICY "Users can view their own documents" ON storage.objects
FOR SELECT USING (
  bucket_id = 'documents' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Temp bucket policies
CREATE POLICY "Authenticated users can upload to temp" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'temp' AND 
  auth.role() = 'authenticated'
);

CREATE POLICY "Users can manage their temp files" ON storage.objects
FOR ALL USING (
  bucket_id = 'temp' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);
`
