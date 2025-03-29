
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

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
      console.error(`Bucket ${bucketName} not found. This bucket must be created by an admin.`);
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
    
    // First ensure the bucket exists
    const bucketExists = await ensureBucketExists(bucketName);
    
    if (!bucketExists) {
      console.error(`Bucket ${bucketName} does not exist. Please contact your administrator.`);
      toast.error(`Storage configuration error. Please contact support.`);
      return null;
    }
    
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
      if (error.message.includes('auth/insufficient_permissions')) {
        toast.error('Insufficient permissions. Please sign in first.');
      } else {
        toast.error(`Upload failed: ${error.message}`);
      }
      return null;
    }
    
    if (!data || !data.path) {
      console.error(`Upload to ${bucketName} succeeded but no path returned`);
      toast.error('Error getting image URL');
      return null;
    }
    
    // Generate a public URL for the uploaded file
    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(data.path);
    
    if (!publicUrlData || !publicUrlData.publicUrl) {
      console.error(`Failed to get public URL for ${data.path}`);
      toast.error('Error getting public image URL');
      return null;
    }
    
    console.log(`Successfully uploaded to ${bucketName}, public URL:`, publicUrlData.publicUrl);
    toast.success('Image uploaded successfully');
    return publicUrlData.publicUrl;
  } catch (error) {
    console.error(`Unexpected error in uploadImage to ${bucketName}:`, error);
    toast.error('Unexpected error uploading image');
    return null;
  }
}
