
import { useState, useEffect, useCallback, useMemo } from "react";
import { Scammer } from "@/lib/types";
import { scammerService } from "@/services/storage";
import { storageService } from "@/services/storage/localStorageService";
import { toast } from "sonner";

export const useScammers = () => {
  const [scammers, setScammers] = useState<Scammer[]>([]);
  const [filteredScammers, setFilteredScammers] = useState<Scammer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "bounty">("newest");
  const [error, setError] = useState<string | null>(null);

  // Load scammers from both Supabase and localStorage
  const loadScammers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Try to load from Supabase first
      let supabaseScammers: Scammer[] = [];
      try {
        const supabaseData = await scammerService.getAllScammers();
        supabaseScammers = supabaseData.map(s => ({
          id: s.id,
          name: s.name,
          photoUrl: s.photoUrl,
          accusedOf: s.accusedOf,
          links: s.links || [],
          aliases: Array.isArray(s.aliases) ? s.aliases : [],
          accomplices: s.accomplices || [],
          officialResponse: s.officialResponse || '',
          bountyAmount: s.bountyAmount,
          walletAddress: s.walletAddress || '',
          dateAdded: new Date(s.dateAdded),
          addedBy: s.addedBy || ''
        }));
      } catch (err) {
        console.error("Error loading from Supabase:", err);
      }

      // Also load from localStorage as a fallback
      const localScammers = storageService.getAllScammers().map(s => ({
        id: s.id,
        name: s.name,
        photoUrl: s.photoUrl,
        accusedOf: s.accusedOf,
        links: s.links || [],
        aliases: Array.isArray(s.aliases) ? s.aliases : [],
        accomplices: s.accomplices || [],
        officialResponse: s.officialResponse || '',
        bountyAmount: s.bountyAmount,
        walletAddress: s.walletAddress || '',
        dateAdded: new Date(s.dateAdded),
        addedBy: s.addedBy || ''
      }));

      // Merge the scammers, preferring Supabase versions but including local-only ones
      const supabaseIds = supabaseScammers.map(s => s.id);
      const uniqueLocalScammers = localScammers.filter(s => !supabaseIds.includes(s.id));
      
      const allScammers = [...supabaseScammers, ...uniqueLocalScammers];
      
      if (allScammers.length === 0) {
        console.log("No scammers found in either Supabase or localStorage");
      } else {
        console.log(`Loaded ${allScammers.length} scammers (${supabaseScammers.length} from Supabase, ${uniqueLocalScammers.length} local-only)`);
      }
      
      setScammers(allScammers);
      setFilteredScammers(allScammers);
    } catch (error) {
      console.error("Error loading scammers:", error);
      setError("Failed to load scammers. Please try again later.");
      toast.error("Failed to load scammers. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadScammers();
  }, [loadScammers]);

  // Filter and sort scammers based on search query and sort option
  useEffect(() => {
    let result = [...scammers];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        scammer => 
          scammer.name.toLowerCase().includes(query) ||
          scammer.accusedOf.toLowerCase().includes(query) ||
          (Array.isArray(scammer.aliases) && scammer.aliases.some(alias => alias.toLowerCase().includes(query)))
      );
    }
    
    result = [...result].sort((a, b) => {
      if (sortBy === "newest") {
        return b.dateAdded.getTime() - a.dateAdded.getTime();
      } else if (sortBy === "oldest") {
        return a.dateAdded.getTime() - b.dateAdded.getTime();
      } else if (sortBy === "bounty") {
        return b.bountyAmount - a.bountyAmount;
      }
      return 0;
    });
    
    setFilteredScammers(result);
  }, [scammers, searchQuery, sortBy]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleSortChange = useCallback((sort: "newest" | "oldest" | "bounty") => {
    setSortBy(sort);
  }, []);

  const refreshScammers = useCallback(() => {
    loadScammers();
  }, [loadScammers]);

  return {
    scammers,
    filteredScammers,
    isLoading,
    error,
    searchQuery,
    sortBy,
    handleSearch,
    handleSortChange,
    refreshScammers
  };
};
