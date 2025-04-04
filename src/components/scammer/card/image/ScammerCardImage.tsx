
import { useState, useEffect, memo, useCallback, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ScammerImageLoader } from "./ScammerImageLoader";
import { InteractionsBar } from "./InteractionsBar";
import { ScammerCardBadge } from "./ScammerCardBadge";
import { scammerService } from "@/services/storage/scammer/scammerService";
import { useIsMobile } from "@/hooks/use-mobile";

interface ScammerCardImageProps {
  name: string;
  photoUrl: string;
  likes: number;
  dislikes: number;
  views: number;
  shares: number;
  comments?: number;
  scammerId?: string;
  rank?: number;
  interactionsPosition?: "topRight" | "bottomRight";
}

const ScammerCardImageComponent = ({ 
  name, 
  photoUrl, 
  likes, 
  dislikes, 
  views,
  shares,
  comments = 0,
  scammerId,
  rank,
  interactionsPosition = "bottomRight" // Changed default from "topRight" to "bottomRight"
}: ScammerCardImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [hasAttemptedViewIncrement, setHasAttemptedViewIncrement] = useState(false);
  const mounted = useRef(true);
  const instanceId = useRef(`scammer-card-${Date.now()}`);
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Always show interactions
  const showInteractions = true;

  // Reset component state on mount and updates
  useEffect(() => {
    mounted.current = true;
    
    // Reset state when photoUrl changes
    setImageLoaded(false);
    setImageError(false);
    setHasAttemptedViewIncrement(false);
    
    return () => {
      mounted.current = false;
    };
  }, [photoUrl]);

  // Handle image loading state changes
  const handleImageLoaded = useCallback((loaded: boolean, error: boolean) => {
    if (!mounted.current) return;
    
    setImageLoaded(loaded);
    setImageError(error);
  }, []);

  // Increment view count when image loads, but only once
  useEffect(() => {
    if (!mounted.current) return;
    
    if (scammerId && imageLoaded && !hasAttemptedViewIncrement) {
      setHasAttemptedViewIncrement(true);
      
      // Use a separate function to avoid blocking the UI
      const incrementViews = async () => {
        try {
          await scammerService.incrementScammerViews(scammerId);
        } catch (error) {
          console.error("Failed to increment views:", error);
        }
      };
      
      incrementViews();
    }
  }, [scammerId, imageLoaded, hasAttemptedViewIncrement]);

  // Scroll to comments section if on detail page
  const scrollToComments = useCallback(() => {
    if (scammerId) {
      const commentsSection = document.querySelector('.comments-section');
      if (commentsSection) {
        commentsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [scammerId]);
  
  return (
    <div className="flex flex-col font-western">
      <Link 
        to={scammerId ? `/scammer/${scammerId}` : "#"} 
        className="block relative aspect-square overflow-hidden bg-muted cursor-pointer w-full"
      >
        <ScammerImageLoader 
          name={name} 
          photoUrl={photoUrl} 
          onImageLoaded={handleImageLoaded} 
        />
        
        {/* Interactions bar with dynamic position */}
        <InteractionsBar 
          scammerId={scammerId}
          likes={likes}
          dislikes={dislikes}
          views={views}
          shares={shares}
          comments={comments}
          onScrollToComments={scrollToComments}
          className=""
          position={interactionsPosition}
        />
        
        {/* Only show rank badge if rank is provided */}
        {rank && (
          <ScammerCardBadge rank={rank} />
        )}
      </Link>
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export const ScammerCardImage = memo(ScammerCardImageComponent);
