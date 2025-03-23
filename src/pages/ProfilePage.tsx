
import React, { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { UserProfile } from "@/components/profile/UserProfile";
import { useWallet } from "@/context/WalletContext";
import { ProfileLinks } from "@/components/profile/ProfileLinks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { storageService, UserProfile as ProfileType } from "@/services/storage/localStorageService";

export function ProfilePage() {
  const { isConnected, address } = useWallet();
  const [profileData, setProfileData] = useState<ProfileType | null>(null);
  
  useEffect(() => {
    if (isConnected && address) {
      const profile = storageService.getProfile(address);
      if (profile) {
        setProfileData(profile);
      }
    }
  }, [isConnected, address]);

  return (
    <div className="min-h-screen old-paper">
      <Header />
      <main className="container mx-auto px-4 py-8 pt-28">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-wanted text-western-accent text-center mb-8">Your Profile</h1>
          
          {isConnected && profileData ? (
            <div className="mb-8">
              <Card className="p-4">
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={profileData.profilePicUrl} alt={profileData.displayName} />
                    <AvatarFallback className="bg-western-sand">
                      <UserCircle2 className="w-10 h-10 text-western-wood" />
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">{profileData.displayName}</h2>
                    <p className="text-sm text-muted-foreground truncate">
                      {address}
                    </p>
                    {profileData.bio && (
                      <p className="text-sm mt-2 text-muted-foreground">
                        {profileData.bio}
                      </p>
                    )}
                    <ProfileLinks 
                      xLink={profileData.xLink} 
                      websiteLink={profileData.websiteLink} 
                    />
                  </div>
                </div>
              </Card>
            </div>
          ) : null}
          
          <UserProfile />
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;
