
import { useState, useMemo } from 'react';
import type { LeaderboardUser } from '@/services/storage/leaderboardService';

type SortField = 'rank' | 'name' | 'reports' | 'likes' | 'views' | 'comments' | 'bountyGenerated' | 'bountySpent' | 'joined' | 'points';
type SortDirection = 'asc' | 'desc';

interface UseSortableLeaderboardReturn {
  sortedUsers: LeaderboardUser[];
  handleSort: (field: SortField) => void;
  sortField: SortField;
  sortDirection: SortDirection;
}

export const useSortableLeaderboard = (users: LeaderboardUser[]): UseSortableLeaderboardReturn => {
  // Default sort by bounty generated (descending)
  const [sortField, setSortField] = useState<SortField>('bountyGenerated');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle direction if clicking the same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // New field, set to descending by default (most common expectation)
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case 'rank':
          // Rank is implicit in the original order
          return sortDirection === 'asc' ? 1 : -1;
        case 'name':
          comparison = a.displayName.localeCompare(b.displayName);
          break;
        case 'reports':
          comparison = a.totalReports - b.totalReports;
          break;
        case 'likes':
          comparison = a.totalLikes - b.totalLikes;
          break;
        case 'views':
          comparison = a.totalViews - b.totalViews;
          break;
        case 'comments':
          comparison = a.totalComments - b.totalComments;
          break;
        case 'bountyGenerated':
          comparison = a.totalBountyGenerated - b.totalBountyGenerated;
          break;
        case 'bountySpent':
          comparison = a.totalBountySpent - b.totalBountySpent;
          break;
        case 'joined':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'points':
          comparison = a.points - b.points;
          break;
        default:
          comparison = 0;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [users, sortField, sortDirection]);

  return {
    sortedUsers,
    handleSort,
    sortField,
    sortDirection
  };
};
