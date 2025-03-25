
import React from "react";
import { TableHeader, TableHead, TableRow } from "@/components/ui/table";
import { ArrowUpDown } from "lucide-react";

type SortField = 'totalReports' | 'totalLikes' | 'totalViews' | 'totalComments';

interface LeaderboardHeaderProps {
  onSort: (field: SortField) => void;
}

export const LeaderboardHeader: React.FC<LeaderboardHeaderProps> = ({ onSort }) => {
  return (
    <TableHeader>
      <TableRow className="border-b border-western-accent/30">
        <TableHead className="w-12 text-center text-western-accent font-wanted">Rank</TableHead>
        <TableHead className="text-left text-western-accent font-wanted">Hunter</TableHead>
        <TableHead className="text-center text-western-accent font-wanted">Socials</TableHead>
        <TableHead 
          className="text-center hidden md:table-cell text-western-accent font-wanted cursor-pointer"
          onClick={() => onSort('totalReports')}
        >
          <div className="flex items-center justify-center">
            Reports
            <ArrowUpDown className="ml-1 h-4 w-4" />
          </div>
        </TableHead>
        <TableHead 
          className="text-center hidden md:table-cell text-western-accent font-wanted cursor-pointer"
          onClick={() => onSort('totalLikes')}
        >
          <div className="flex items-center justify-center">
            Likes
            <ArrowUpDown className="ml-1 h-4 w-4" />
          </div>
        </TableHead>
        <TableHead 
          className="text-center hidden md:table-cell text-western-accent font-wanted cursor-pointer"
          onClick={() => onSort('totalViews')}
        >
          <div className="flex items-center justify-center">
            Views
            <ArrowUpDown className="ml-1 h-4 w-4" />
          </div>
        </TableHead>
        <TableHead 
          className="text-center hidden md:table-cell text-western-accent font-wanted cursor-pointer"
          onClick={() => onSort('totalComments')}
        >
          <div className="flex items-center justify-center">
            Comments
            <ArrowUpDown className="ml-1 h-4 w-4" />
          </div>
        </TableHead>
        <TableHead className="text-center text-western-accent font-wanted">Total Bounty</TableHead>
      </TableRow>
    </TableHeader>
  );
};
