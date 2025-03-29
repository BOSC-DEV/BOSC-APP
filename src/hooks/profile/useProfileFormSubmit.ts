
import { useState, useEffect } from "react";
import { useWallet } from "@/context/WalletContext";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase";
import { storageService } from "@/services/storage";

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
          const exists = await storageService.hasProfile(address);
          setHasProfile(exists);
          if (exists) {
            setProfileId(address);
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

    setIsSubmitting(true);
    console.log("[useProfileFormSubmit] Starting profile save for address:", address);
    
    try {
      // Skip the Supabase auth check and directly save using wallet address
      const profileData = {
        id: address,
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
      
      // Use alternative method for profile saving that doesn't rely on Supabase auth
      // but instead uses the wallet address directly
      const success = await storageService.updateProfile(profileData);
      
      if (!success) {
        console.error('[useProfileFormSubmit] Error saving profile through service');
        toast.error("Failed to save profile");
        return false;
      }
      
      console.log("[useProfileFormSubmit] Profile saved successfully");
      toast.success("Profile saved successfully");
      setHasProfile(true);
      setProfileId(address);
      return true;
    } catch (error) {
      console.error("[useProfileFormSubmit] Error saving profile:", error);
      toast.error("Failed to save profile");
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
