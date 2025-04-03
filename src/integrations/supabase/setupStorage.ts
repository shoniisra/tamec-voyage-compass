
import { supabase } from './client';

/**
 * Creates a storage bucket for blog images if it doesn't already exist
 */
export const setupBlogStorage = async () => {
  try {
    // Check if the bucket already exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error('Error checking storage buckets:', listError);
      return false;
    }
    
    const bucketExists = buckets.some(bucket => bucket.name === 'blog-content');
    
    if (!bucketExists) {
      const { data, error } = await supabase.storage.createBucket('blog-content', {
        public: true, // Make files publicly accessible
        fileSizeLimit: 10485760, // 10MB limit for images
      });
      
      if (error) {
        console.error('Error creating blog-content bucket:', error);
        return false;
      }
      
      console.log('Created blog-content storage bucket');
    }
    
    return true;
  } catch (error) {
    console.error('Error setting up blog storage:', error);
    return false;
  }
};
