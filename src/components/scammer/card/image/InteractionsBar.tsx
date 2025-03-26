
import { useState, useEffect } from "react";
import { ThumbsUp, ThumbsDown, Eye, MessageSquare, Share2 } from "lucide-react";
import { toast } from "sonner";
import { InteractionButton } from "./InteractionButton";
import { storageService } from "@/services/storage/localStorageService";
import { useWallet } from "@/context/WalletContext";
import { profileService } from "@/services/storage/profileService";

interface InteractionsBarProps {
  scammerId?: string;
  likes: number;
  dislikes: number;
  views: number;
  comments: number;
  onScrollToComments?: () => void;
}

export function InteractionsBar({
  scammerId,
  likes,
  dislikes,
  views,
  comments,
  onScrollToComments
}: InteractionsBarProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [localLikes, setLocalLikes] = useState(likes);
  const [localDislikes, setLocalDislikes] = useState(dislikes);
  const { isConnected, address, connectWallet } = useWallet();
  const [profileChecked, setProfileChecked] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  
  // Check if user has already liked/disliked on component mount
  useEffect(() => {
    if (scammerId && address) {
      // Check for local interactions
      const userInteractions = localStorage.getItem(`scammer-interactions-${scammerId}`);
      if (userInteractions) {
        const { liked, disliked } = JSON.parse(userInteractions);
        setIsLiked(liked);
        setIsDisliked(disliked);
      }
      
      // Check if user has a profile
      const checkProfile = async () => {
        try {
          const exists = await profileService.hasProfile(address);
          setHasProfile(exists);
          setProfileChecked(true);
        } catch (error) {
          console.error("Error checking if user has profile:", error);
          setProfileChecked(true);
        }
      };
      
      checkProfile();
    }
  }, [scammerId, address]);
  
  // Update local likes/dislikes when props change
  useEffect(() => {
    setLocalLikes(likes);
    setLocalDislikes(dislikes);
  }, [likes, dislikes]);

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    
    if (!scammerId) return;

    // Check if user is connected
    if (!isConnected || !address) {
      toast.error("You must be connected with a wallet to like");
      connectWallet();
      return;
    }

    // Check if profile check has completed
    if (!profileChecked) {
      toast.info("Please wait while we check your profile");
      return;
    }
    
    // Check if user has a profile once profile check is done
    if (!hasProfile) {
      toast.error("You need to create a profile before liking", {
        description: "Go to your profile page to create one",
        action: {
          label: "Create Profile",
          onClick: () => window.location.href = "/profile"
        }
      });
      return;
    }

    if (isLiked) {
      // Unlike
      setIsLiked(false);
      setLocalLikes(prev => prev - 1);
      toast.info("Like removed");
    } else {
      // Like
      if (isDisliked) {
        // Remove dislike if present
        setIsDisliked(false);
        setLocalDislikes(prev => prev - 1);
      }
      setIsLiked(true);
      setLocalLikes(prev => prev + 1);
      toast.success("Liked scammer");
    }

    // Store interaction in localStorage
    localStorage.setItem(`scammer-interactions-${scammerId}`, JSON.stringify({ 
      liked: !isLiked, 
      disliked: isDisliked ? false : isDisliked 
    }));

    // Update in storage service
    try {
      storageService.updateScammerStats(scammerId, {
        likes: isLiked ? localLikes - 1 : localLikes + 1,
        dislikes: isDisliked ? localDislikes - 1 : localDislikes,
      });
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const handleDislike = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    
    if (!scammerId) return;

    // Check if user is connected
    if (!isConnected || !address) {
      toast.error("You must be connected with a wallet to dislike");
      connectWallet();
      return;
    }

    // Check if profile check has completed
    if (!profileChecked) {
      toast.info("Please wait while we check your profile");
      return;
    }
    
    // Check if user has a profile once profile check is done
    if (!hasProfile) {
      toast.error("You need to create a profile before disliking", {
        description: "Go to your profile page to create one",
        action: {
          label: "Create Profile",
          onClick: () => window.location.href = "/profile"
        }
      });
      return;
    }

    if (isDisliked) {
      // Remove dislike
      setIsDisliked(false);
      setLocalDislikes(prev => prev - 1);
      toast.info("Dislike removed");
    } else {
      // Dislike
      if (isLiked) {
        // Remove like if present
        setIsLiked(false);
        setLocalLikes(prev => prev - 1);
      }
      setIsDisliked(true);
      setLocalDislikes(prev => prev + 1);
      toast.success("Disliked scammer");
    }

    // Store interaction in localStorage
    localStorage.setItem(`scammer-interactions-${scammerId}`, JSON.stringify({ 
      liked: isLiked ? false : isLiked, 
      disliked: !isDisliked 
    }));

    // Update in storage service
    try {
      storageService.updateScammerStats(scammerId, {
        likes: isLiked ? localLikes - 1 : localLikes,
        dislikes: isDisliked ? localDislikes - 1 : localDislikes + 1,
      });
    } catch (error) {
      console.error("Error updating dislikes:", error);
    }
  };

  const scrollToComments = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onScrollToComments) {
      onScrollToComments();
    } else if (scammerId) {
      // If we're not on a detail page, navigate to the detail page with a hash
      window.location.href = `/scammer/${scammerId}#comments`;
    }
  };

  const copyShareLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!scammerId) return;
    
    const shareUrl = `${window.location.origin}/scammer/${scammerId}`;
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        toast.success("Link copied to clipboard", {
          description: "Share this scammer with others"
        });
      })
      .catch((error) => {
        console.error("Failed to copy link:", error);
        toast.error("Failed to copy link");
      });
  };

  return (
    <div className="absolute top-0 right-0 p-2 flex space-x-2">
      <InteractionButton 
        icon={ThumbsUp} 
        count={localLikes} 
        onClick={handleLike} 
        active={isLiked}
        activeColor="bg-green-600/80"
      />
      
      <InteractionButton 
        icon={ThumbsDown} 
        count={localDislikes} 
        onClick={handleDislike} 
        active={isDisliked}
        activeColor="bg-red-600/80"
      />
      
      <InteractionButton 
        icon={Eye} 
        count={views} 
      />
      
      <InteractionButton 
        icon={MessageSquare} 
        count={comments} 
        onClick={scrollToComments}
        title="View comments"
      />
      
      {scammerId && (
        <InteractionButton 
          icon={Share2} 
          count={0} 
          onClick={copyShareLink}
          title="Copy share link"
          className="[&>span]:hidden"
        />
      )}
    </div>
  );
}
