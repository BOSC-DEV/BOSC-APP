
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

/**
 * Helper function to check if a storage bucket exists
 */
export async function ensureBucketExists(bucketName: string): Promise<boolean> {
  try {
    // Check if the bucket exists
    const { data: existingBuckets, error: bucketError } = await supabase.storage.listBuckets();
    
    if (bucketError) {
      console.error(`Error checking if bucket ${bucketName} exists:`, bucketError);
      return false;
    }
    
    // Check if our bucket is in the list
    const bucketExists = existingBuckets.some(bucket => bucket.name === bucketName);
    
    if (!bucketExists) {
      console.warn(`Bucket ${bucketName} not found.`);
      return false;
    } else {
      console.log(`Bucket ${bucketName} exists`);
      return true;
    }
  } catch (error) {
    console.error(`Unexpected error in ensureBucketExists for ${bucketName}:`, error);
    return false;
  }
}

/**
 * Helper function to upload images to Supabase Storage
 */
export async function uploadImage(file: File, bucketName: string, fileName: string): Promise<string | null> {
  try {
    console.log(`Starting upload to ${bucketName} bucket with filename: ${fileName}`);
    
    // Create a unique file path to avoid collisions
    const fileExt = file.name.split('.').pop();
    const uniqueFilePath = `${fileName.trim().replace(/\s+/g, '-')}-${uuidv4()}.${fileExt}`;
    
    // Upload the file to the specified bucket
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(uniqueFilePath, file, {
        cacheControl: '3600',
        upsert: true
      });
    
    if (error) {
      console.error(`Error uploading to ${bucketName}:`, error);
      return null;
    }
    
    if (!data || !data.path) {
      console.error(`Upload to ${bucketName} succeeded but no path returned`);
      return null;
    }
    
    // Generate a public URL for the uploaded file
    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(data.path);
    
    if (!publicUrlData || !publicUrlData.publicUrl) {
      console.error(`Failed to get public URL for ${data.path}`);
      return null;
    }
    
    console.log(`Successfully uploaded to ${bucketName}, public URL:`, publicUrlData.publicUrl);
    return publicUrlData.publicUrl;
  } catch (error) {
    console.error(`Unexpected error in uploadImage to ${bucketName}:`, error);
    return null;
  }
}

/**
 * Helper function to store images locally (as a fallback)
 */
export async function storeImageLocally(file: File, userId: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        // Return the data URL which can be used as the src for an image
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert image to data URL'));
      }
    };
    reader.onerror = () => {
      reject(new Error('Failed to read image file'));
    };
    reader.readAsDataURL(file);
  });
}
