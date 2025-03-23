
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/context/WalletContext";
import { UserCircle2 } from "lucide-react";
import { storageService, UserProfile } from "@/services/storage";

export function ProfileButton() {
  const { isConnected, address } = useWallet();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  
  useEffect(() => {
    // Fetch user profile if wallet is connected
    const fetchProfile = async () => {
      if (isConnected && address) {
        try {
          const userProfile = await storageService.getProfile(address);
          setProfile(userProfile);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      } else {
        setProfile(null);
      }
    };

    fetchProfile();
  }, [isConnected, address]);

  if (!isConnected) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9 border border-western-sand/30">
            <AvatarImage src={profile?.profilePicUrl} alt={profile?.displayName || "Profile"} />
            <AvatarFallback className="bg-western-sand/20">
              <UserCircle2 className="h-5 w-5 text-western-parchment" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 font-western">
        {profile && (
          <>
            <div className="flex items-center justify-start gap-2 p-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={profile.profilePicUrl} alt={profile.displayName} />
                <AvatarFallback className="bg-western-sand/20">
                  <UserCircle2 className="h-4 w-4 text-western-parchment" />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col space-y-1 leading-none">
                <p className="font-medium text-sm text-western-parchment">{profile.displayName}</p>
                <p className="w-[176px] truncate text-xs text-western-sand">
                  {address}
                </p>
              </div>
            </div>
            <DropdownMenuSeparator />
          </>
        )}
        
        <DropdownMenuItem asChild>
          <Link to="/profile" className="cursor-pointer text-western-parchment hover:text-western-accent">
            {profile ? "Edit Profile" : "Create Profile"}
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem asChild>
          <Link to="/most-wanted" className="cursor-pointer text-western-parchment hover:text-western-accent">
            Most Wanted List
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link to="/create-listing" className="cursor-pointer text-western-parchment hover:text-western-accent">
            Report a Scammer
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
