
import React, { forwardRef } from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { Trophy, Award, Medal, ThumbsUp, Eye, MessageSquare, Clock } from "lucide-react";
import { formatTimeAgo } from "@/utils/formatters";
import type { LeaderboardUser } from "@/services/storage/leaderboardService";
import { ProfileLinks } from "@/components/profile/ProfileLinks";
import { SolAmount } from "@/components/SolAmount";

interface LeaderboardRowProps {
  user: LeaderboardUser;
  rank: number;
}

export const LeaderboardRow = forwardRef<HTMLTableRowElement, LeaderboardRowProps>(
  ({ user, rank }, ref) => {
    const getRankDisplay = (rank: number) => {
      // For top 3, show the corresponding icon
      if (rank === 1) {
        return (
          <div className="flex flex-col items-center justify-center">
            <Trophy className="h-6 w-6 text-yellow-400" />
            <span className="font-bold text-western-accent">{rank}</span>
            <span className="text-xs text-yellow-500">{user.points.toLocaleString()} pts</span>
          </div>
        );
      } else if (rank === 2) {
        return (
          <div className="flex flex-col items-center justify-center">
            <Award className="h-6 w-6 text-gray-300" />
            <span className="font-bold text-western-accent">{rank}</span>
            <span className="text-xs text-yellow-500">{user.points.toLocaleString()} pts</span>
          </div>
        );
      } else if (rank === 3) {
        return (
          <div className="flex flex-col items-center justify-center">
            <Medal className="h-6 w-6 text-amber-700" />
            <span className="font-bold text-western-accent">{rank}</span>
            <span className="text-xs text-yellow-500">{user.points.toLocaleString()} pts</span>
          </div>
        );
      } else {
        return (
          <div className="text-center">
            <span className="font-bold text-western-accent">{rank}</span>
            <div className="text-xs text-yellow-500">{user.points.toLocaleString()} pts</div>
          </div>
        );
      }
    };

    // Format the joined duration (time since sign up)
    const formatJoinedDuration = (dateString: string) => {
      try {
        return formatTimeAgo(new Date(dateString));
      } catch (error) {
        return "unknown";
      }
    };

    // Determine profile route - use username if available, otherwise ID
    const profileRoute = user.username ? `/${user.username}` : `/profile/${user.id}`;

    return (
      <TableRow 
        ref={ref}
        key={user.id} 
        className="border-b border-western-accent/20 hover:bg-western-parchment/10"
      >
        <TableCell className="text-center">
          {getRankDisplay(rank)}
        </TableCell>
        <TableCell>
          <Link to={profileRoute} className="flex items-center space-x-3 hover:text-western-accent">
            <Avatar className="h-10 w-10 border border-western-accent/20 flex-shrink-0">
              <AvatarImage src={user.profilePicUrl} alt={user.displayName} />
              <AvatarFallback className="bg-western-wood text-western-parchment">
                {user.displayName.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center">
              <p className="font-medium font-western">{user.displayName}</p>
              {user.username && (
                <p className="text-xs text-western-accent/80 font-medium">@{user.username}</p>
              )}
            </div>
          </Link>
        </TableCell>
        <TableCell className="text-center">
          <div className="flex justify-center gap-2">
            <ProfileLinks xLink={user.xLink} websiteLink={user.websiteLink} />
          </div>
        </TableCell>
        <TableCell className="text-center hidden md:table-cell">{user.totalReports}</TableCell>
        <TableCell className="text-center hidden md:table-cell">{user.totalLikes}</TableCell>
        <TableCell className="text-center hidden md:table-cell">{user.totalViews}</TableCell>
        <TableCell className="text-center hidden md:table-cell">{user.totalComments}</TableCell>
        <TableCell className="text-center font-bold text-western-accent">
          <SolAmount amount={user.totalBountyGenerated} />
        </TableCell>
        <TableCell className="text-center font-bold text-western-accent">
          <SolAmount amount={user.totalBountySpent} />
        </TableCell>
        <TableCell className="text-center text-western-wood">
          {formatJoinedDuration(user.createdAt)}
        </TableCell>
      </TableRow>
    );
  }
);

LeaderboardRow.displayName = "LeaderboardRow";
