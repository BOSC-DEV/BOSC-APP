
import React from 'react';
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Eye } from "lucide-react";

interface ScammerInteractionButtonsProps {
  likes: number;
  dislikes: number;
  views: number;
  isLiked: boolean;
  isDisliked: boolean;
  onLike: () => void;
  onDislike: () => void;
}

export function ScammerInteractionButtons({ 
  likes, 
  dislikes, 
  views, 
  isLiked, 
  isDisliked,
  onLike,
  onDislike
}: ScammerInteractionButtonsProps) {
  return (
    <div className="flex justify-center gap-4 mt-3">
      <div className="flex flex-col items-center">
        <Button 
          variant="outline"
          size="sm"
          className={`h-10 w-10 rounded-full ${isLiked ? 'bg-green-100 border-green-500 text-green-700' : ''}`}
          onClick={onLike}
        >
          <ThumbsUp className="h-5 w-5" />
        </Button>
        <span className="text-sm mt-1">{likes}</span>
      </div>
      
      <div className="flex flex-col items-center">
        <Button 
          variant="outline"
          size="sm"
          className={`h-10 w-10 rounded-full ${isDisliked ? 'bg-red-100 border-red-500 text-red-700' : ''}`}
          onClick={onDislike}
        >
          <ThumbsDown className="h-5 w-5" />
        </Button>
        <span className="text-sm mt-1">{dislikes}</span>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="h-10 w-10 rounded-full border flex items-center justify-center">
          <Eye className="h-5 w-5" />
        </div>
        <span className="text-sm mt-1">{views}</span>
      </div>
    </div>
  );
}
