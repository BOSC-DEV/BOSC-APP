
import React, { forwardRef } from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { Trophy, Award, Medal } from "lucide-react";
import { formatCurrency } from "@/utils/formatters";
import type { LeaderboardUser } from "@/services/storage/leaderboardService";
import { ProfileLinks } from "@/components/profile/ProfileLinks";

interface LeaderboardRowProps {
  user: LeaderboardUser;
  originalIndex: number;
}

export const LeaderboardRow = forwardRef<HTMLTableRowElement, LeaderboardRowProps>(
  ({ user, originalIndex }, ref) => {
    const getRankDisplay = (index: number) => {
      switch (index) {
        case 0:
          return <Trophy className="h-6 w-6 text-yellow-400" />;
        case 1:
          return <Award className="h-6 w-6 text-gray-300" />;
        case 2:
          return <Medal className="h-6 w-6 text-amber-700" />;
        default:
          return <span className="font-bold text-western-parchment/70">{index + 1}</span>;
      }
    };

    return (
      <TableRow 
        ref={ref}
        key={user.id} 
        className="border-b border-western-accent/20 hover:bg-western-parchment/10"
      >
        <TableCell className="text-center">
          {getRankDisplay(originalIndex)}
        </TableCell>
        <TableCell>
          <Link to={`/${user.username}`} className="flex items-center space-x-3 hover:text-western-accent">
            <Avatar className="h-10 w-10 border border-western-accent/20">
              <AvatarImage src={user.profilePicUrl} alt={user.displayName} />
              <AvatarFallback className="bg-western-wood text-western-parchment">
                {user.displayName.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium font-western">{user.displayName}</p>
              <p className="text-xs text-western-parchment/70">@{user.username}</p>
            </div>
          </Link>
        </TableCell>
        <TableCell className="text-center">
          <div className="flex justify-center">
            <ProfileLinks xLink={user.xLink} websiteLink={user.websiteLink} />
          </div>
        </TableCell>
        <TableCell className="text-center hidden md:table-cell">{user.totalReports}</TableCell>
        <TableCell className="text-center hidden md:table-cell">{user.totalLikes}</TableCell>
        <TableCell className="text-center hidden md:table-cell">{user.totalViews}</TableCell>
        <TableCell className="text-center hidden md:table-cell">{user.totalComments}</TableCell>
        <TableCell className="text-center font-bold text-western-accent">
          {formatCurrency(user.totalBounty)} BOSC
        </TableCell>
      </TableRow>
    );
  }
);

LeaderboardRow.displayName = "LeaderboardRow";
