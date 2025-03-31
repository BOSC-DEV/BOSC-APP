
import { Scammer } from "@/lib/types";
import { ScammerCard } from "@/components/scammer/card/ScammerCard";
import { Pagination } from "@/components/pagination/Pagination";

interface ScammerGridProps {
  paginatedScammers: Scammer[];
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export const ScammerGrid = ({
  paginatedScammers,
  currentPage,
  totalPages,
  setCurrentPage
}: ScammerGridProps) => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {paginatedScammers.map((scammer, index) => {
          // Calculate absolute position for rank
          const absolutePosition = (currentPage - 1) * paginatedScammers.length + index + 1;
          
          return (
            <ScammerCard
              key={scammer.id}
              scammer={scammer}
              rank={absolutePosition}
            />
          );
        })}
      </div>
      
      {totalPages > 1 && (
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};
