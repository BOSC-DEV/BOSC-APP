import React from "react";
import {
  Input,
} from "@/components/ui/input";
import {
  Label,
} from "@/components/ui/label";
import {
  Textarea,
} from "@/components/ui/textarea";
import { ProfilePictureUpload } from "./ProfilePictureUpload";
import { ProfileFormHeader } from "./ProfileFormHeader";
import { ProfileFormFooter } from "./ProfileFormFooter";
import { UsernameInput } from "./UsernameInput";
import { ProfileLinks } from "./ProfileLinks";
import { Button } from "@/components/ui/button";

// Update the interface to include our new props
interface UserProfileFormProps {
  formData: {
    displayName: string;
    username: string;
    profilePicUrl: string;
    xLink: string;
    websiteLink: string;
    bio: string;
  };
  setDisplayName: (name: string) => void;
  setUsername: (username: string) => void;
  setProfilePicUrl: (url: string) => void;
  setXLink: (link: string) => void;
  setWebsiteLink: (link: string) => void;
  handleBioChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isSubmitting: boolean;
  hasProfile: boolean;
  saveProfile: () => Promise<boolean>;
  address: string | undefined;
  usernameAvailable: boolean;
  checkingUsername: boolean;
  emailVerified?: boolean;
  onRequestEmailVerification?: () => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export function UserProfileForm({
  formData,
  setDisplayName,
  setUsername,
  setProfilePicUrl,
  setXLink,
  setWebsiteLink,
  handleBioChange,
  isSubmitting,
  hasProfile,
  saveProfile,
  address,
  usernameAvailable,
  checkingUsername,
  emailVerified,
  onRequestEmailVerification,
  handleSubmit
}: UserProfileFormProps) {
  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <ProfileFormHeader hasProfile={hasProfile} />
      
      <div className="p-6 space-y-6">
        <ProfilePictureUpload
          currentUrl={formData.profilePicUrl}
          onImageChange={setProfilePicUrl}
        />
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                placeholder="Enter your display name"
                value={formData.displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <UsernameInput
              value={formData.username}
              onChange={setUsername}
              isAvailable={usernameAvailable}
              checkingUsername={checkingUsername}
            />
            
            {/* Email verification section */}
            {onRequestEmailVerification && (
              <div className="bg-muted/30 p-4 rounded-md mt-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Email Verification</h3>
                    <p className="text-sm text-muted-foreground">
                      {emailVerified === true 
                        ? "Your email is verified" 
                        : "Verify your email for additional security"}
                    </p>
                  </div>
                  {emailVerified !== true && (
                    <Button 
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={onRequestEmailVerification}
                    >
                      Verify Email
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself"
              value={formData.bio}
              onChange={handleBioChange}
              className="mt-1 h-32"
            />
          </div>
          
          <ProfileLinks
            xLink={formData.xLink}
            websiteLink={formData.websiteLink}
            setXLink={setXLink}
            setWebsiteLink={setWebsiteLink}
          />
        </div>
      </div>
      
      <ProfileFormFooter 
        isSubmitting={isSubmitting} 
        hasProfile={hasProfile} 
        usernameAvailable={usernameAvailable}
        emailVerified={emailVerified}
      />
    </form>
  );
}
