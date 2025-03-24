
import React from 'react';
import { Link } from "react-router-dom";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { ScammerInteractionButtons } from './ScammerInteractionButtons';

interface ScammerHeaderProps {
  name: string;
  accusedOf: string;
  isCreator: boolean;
  scammerId: string;
  likes: number;
  dislikes: number;
  views: number;
  isLiked: boolean;
  isDisliked: boolean;
  onLike: () => void;
  onDislike: () => void;
}

export function ScammerHeader({ 
  name, 
  accusedOf, 
  isCreator, 
  scammerId, 
  likes, 
  dislikes, 
  views,
  isLiked,
  isDisliked,
  onLike,
  onDislike
}: ScammerHeaderProps) {
  return (
    <div className="flex justify-between items-start">
      <div>
        <CardTitle className="text-2xl">{name}</CardTitle>
        <CardDescription className="text-muted-foreground mt-1">
          Accused of: {accusedOf}
        </CardDescription>
      </div>
      <div className="flex flex-col items-end gap-2">
        <ScammerInteractionButtons 
          likes={likes}
          dislikes={dislikes}
          views={views}
          isLiked={isLiked}
          isDisliked={isDisliked}
          onLike={onLike}
          onDislike={onDislike}
        />
        
        {isCreator && (
          <Button 
            variant="outline" 
            size="sm"
            asChild
          >
            <Link to={`/edit-listing/${scammerId}`}>
              <Edit className="h-4 w-4 mr-1" />
              Edit Listing
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
