import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfilePictureUpload } from "./ProfilePictureUpload";
import { BasicInfoForm } from "./BasicInfoForm";
import { useProfileForm } from "./useProfileForm";
import { Twitter, Globe } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
export function UserProfile() {
  const navigate = useNavigate();
  const {
    formData,
    setDisplayName,
    setProfilePicUrl,
    setXLink,
    setWebsiteLink,
    handleBioChange,
    isSubmitting,
    hasProfile,
    saveProfile,
    address,
    isConnected
  } = useProfileForm();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await saveProfile();
    if (success) {
      // Redirect to the previous page or home
      navigate(-1);
    }
  };
  if (!isConnected) {
    return <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Connect Your Wallet</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Please connect your wallet to create or update your profile.</p>
        </CardContent>
      </Card>;
  }
  return <form onSubmit={handleSubmit}>
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>{hasProfile ? "Update Your Profile" : "Create Your Profile"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ProfilePictureUpload displayName={formData.displayName} profilePicUrl={formData.profilePicUrl} onProfilePicChange={setProfilePicUrl} />
          
          <div className="space-y-4">
            {/* Basic Info */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                <Input id="displayName" placeholder="Your Name" value={formData.displayName} onChange={e => setDisplayName(e.target.value)} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <textarea id="bio" placeholder="Short bio about yourself (142 chars max)" value={formData.bio} onChange={handleBioChange} maxLength={142} className="resize-none w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px]" />
                <p className="text-xs text-muted-foreground flex justify-between">
                  <span>Brief description about yourself</span>
                  <span className={formData.bioCharCount > 120 ? "text-amber-500" : ""}>
                    {formData.bioCharCount}/142
                  </span>
                </p>
              </div>

              {/* Social Links - now merged under bio */}
              <div className="space-y-2 pt-2 border-t">
                <Label className="text-base font-medium">Social Links</Label>
                
                <div className="space-y-2">
                  <Label htmlFor="xLink" className="flex items-center gap-2">
                    <Twitter size={16} className="text-muted-foreground" />
                    X (Twitter) Profile
                  </Label>
                  <Input id="xLink" placeholder="https://x.com/username" value={formData.xLink} onChange={e => setXLink(e.target.value)} />
                  <p className="text-xs text-muted-foreground"></p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="websiteLink" className="flex items-center gap-2">
                    <Globe size={16} className="text-muted-foreground" />
                    Website
                  </Label>
                  <Input id="websiteLink" placeholder="https://example.com" value={formData.websiteLink} onChange={e => setWebsiteLink(e.target.value)} />
                  <p className="text-xs text-muted-foreground"></p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="walletAddress">Wallet Address</Label>
                <Input id="walletAddress" value={address || ""} disabled className="bg-muted" />
                <p className="text-xs text-muted-foreground">Your connected wallet address (public)</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : hasProfile ? "Update Profile" : "Create Profile"}
          </Button>
        </CardFooter>
      </Card>
    </form>;
}
export default UserProfile;