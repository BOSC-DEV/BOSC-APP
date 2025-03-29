
import { useState, useEffect } from "react";
import { useWallet } from "@/context/WalletContext";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase";
import { storageService } from "@/services/storage";
import { v4 as uuidv4 } from 'uuid';

interface ProfileFormData {
  displayName: string;
  username: string;
  profilePicUrl: string;
  xLink: string;
  websiteLink: string;
  bio: string;
}

interface FormValidation {
  valid: boolean;
  message: string;
}

export function useProfileFormSubmit() {
  const { isConnected, address } = useWallet();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const [profileId, setProfileId] = useState<string | undefined>(undefined);
  const supabaseReady = isSupabaseConfigured();

  // Check if user has a profile on mount
  useEffect(() => {
    const checkProfile = async () => {
      if (isConnected && address && supabaseReady) {
        try {
          console.log("[useProfileFormSubmit] Checking if user has profile:", address);
          const exists = await storageService.hasProfile(address);
          setHasProfile(exists);
          if (exists) {
            // Get the profile to retrieve its ID
            const profile = await storageService.getProfile(address);
            if (profile && profile.id) {
              setProfileId(profile.id);
              console.log("[useProfileFormSubmit] Found existing profile with ID:", profile.id);
            }
          }
        } catch (error) {
          console.error("[useProfileFormSubmit] Error checking profile:", error);
        }
      }
    };
    
    checkProfile();
  }, [isConnected, address, supabaseReady]);

  const validateForm = (
    formData: ProfileFormData, 
    usernameAvailable: boolean,
    urlValidation: FormValidation
  ) => {
    if (!supabaseReady) {
      toast.error("Supabase is not configured properly. Please check your environment variables.");
      return false;
    }

    if (!formData.displayName.trim()) {
      toast.error("Please enter a display name");
      return false;
    }

    if (!formData.username.trim()) {
      toast.error("Please enter a username");
      return false;
    }

    if (!usernameAvailable) {
      toast.error("Username is not available or invalid");
      return false;
    }

    if (!urlValidation.valid) {
      toast.error(urlValidation.message);
      return false;
    }

    return true;
  };

  const saveProfile = async (
    formData: ProfileFormData, 
    usernameAvailable: boolean,
    urlValidation: FormValidation
  ) => {
    // Security check: Only allow save if wallet is connected
    if (!isConnected || !address) {
      toast.error("Wallet not connected. Authentication required to save profile.");
      return false;
    }

    if (!validateForm(formData, usernameAvailable, urlValidation)) return false;

    // Prevent multiple submissions
    if (isSubmitting) return false;
    
    setIsSubmitting(true);
    console.log("[useProfileFormSubmit] Starting profile save for address:", address);
    console.log("[useProfileFormSubmit] Form data being saved:", formData);
    
    try {
      // Generate a new ID if none exists or use existing one
      let currentProfileId = profileId || uuidv4();
      
      // Prepare the profile data
      const profileData = {
        id: currentProfileId,
        displayName: formData.displayName,
        username: formData.username,
        profilePicUrl: formData.profilePicUrl,
        walletAddress: address,
        createdAt: new Date().toISOString(),
        xLink: formData.xLink || '',
        websiteLink: formData.websiteLink || '',
        bio: formData.bio || ''
      };
      
      console.log("[useProfileFormSubmit] Prepared profile data:", profileData);
      
      let success = false;
      
      // Direct update for existing profiles to avoid the RPC column ambiguity issue
      if (hasProfile && currentProfileId) {
        console.log("[useProfileFormSubmit] Updating existing profile with ID:", currentProfileId);
        const { error } = await supabase
          .from('profiles')
          .update({
            display_name: profileData.displayName,
            username: profileData.username, // Ensure username is included
            profile_pic_url: profileData.profilePicUrl,
            x_link: profileData.xLink,
            website_link: profileData.websiteLink,
            bio: profileData.bio
          })
          .eq('id', currentProfileId);
          
        if (error) {
          console.error("[useProfileFormSubmit] Error updating profile:", error);
          // Try fallback storage service
          success = await storageService.saveProfile(profileData);
        } else {
          success = true;
        }
      } else {
        // For new profiles, use the storage service
        console.log("[useProfileFormSubmit] Creating new profile");
        success = await storageService.saveProfile(profileData);
      }
      
      if (!success) {
        throw new Error("Failed to save profile");
      }
      
      console.log("[useProfileFormSubmit] Profile saved successfully");
      setHasProfile(true);
      setProfileId(currentProfileId);
      
      // High contrast, themed success toast
      toast.success("Profile saved successfully!", {
        style: {
          backgroundColor: "#ea384c", // Bright red
          color: "#ffffff", // White text for contrast
          fontWeight: "bold"
        },
      });
      
      return true;
      
    } catch (error) {
      console.error("[useProfileFormSubmit] Error saving profile:", error);
      toast.error(`Failed to save profile: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    hasProfile,
    profileId,
    supabaseReady,
    saveProfile,
  };
}
