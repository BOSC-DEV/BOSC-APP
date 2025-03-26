
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen } from "lucide-react";
import { BookPage } from "./BookPage";
import { Scammer } from "@/lib/types";

interface BookContainerProps {
  scammers: Scammer[];
  currentPage: number;
  totalPages: number;
  direction: "left" | "right";
  animationKey: number;
  visiblePage: number;
  formatCurrency: (amount: number) => string;
  formatDate: (date: Date) => string;
}

export const BookContainer = ({
  scammers,
  currentPage,
  totalPages,
  direction,
  animationKey,
  visiblePage,
  formatCurrency,
  formatDate
}: BookContainerProps) => {
  const [displayedScammerIndex, setDisplayedScammerIndex] = useState(0);
  
  // Get the current scammer to display
  const currentScammer = scammers.length > 0 
    ? scammers[displayedScammerIndex] 
    : null;
  
  // Update the displayed scammer index when the page changes
  useEffect(() => {
    if (scammers.length > 0) {
      // Since we're showing one scammer per page, the displayedScammerIndex is always 0
      // because the pagination already gives us the correct scammer for this page
      setDisplayedScammerIndex(0);
    }
  }, [currentPage, scammers]);

  return (
    <div className="relative w-full max-w-4xl mx-auto h-[650px] sm:h-[700px] perspective-1000">
      <AnimatePresence mode="wait">
        <motion.div
          key={animationKey}
          className="w-full h-full"
          initial={{
            rotateY: direction === "right" ? -60 : 60,
            opacity: 0.5,
            transformOrigin: direction === "right" ? "left" : "right"
          }}
          animate={{
            rotateY: 0,
            opacity: 1
          }}
          exit={{
            rotateY: direction === "right" ? 60 : -60,
            opacity: 0.5,
            transformOrigin: direction === "right" ? "right" : "left"
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            duration: 0.6
          }}
        >
          <div className="relative w-full h-full overflow-hidden">
            {/* Fancy book cover design */}
            <div className="absolute inset-0 paper-texture rounded-lg border-4 border-western-leather shadow-[0_10px_15px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.05),inset_0_0_0_1px_rgba(255,255,255,0.1)]">
              {/* Book binding effect */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-western-wood to-western-leather transform -skew-y-6 origin-top"></div>
              
              {/* Book page curl effect */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-transparent via-transparent to-western-sand/30 transform -translate-y-2 translate-x-2 rotate-6"></div>
              
              {/* Bottom page curl effect */}
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tr from-transparent to-western-sand/20 transform translate-y-2 translate-x-2 -rotate-6"></div>
              
              {/* Book shine effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-lg opacity-60"></div>
            </div>
            
            {/* Page content */}
            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col">
              <div className="flex justify-center items-center mb-4 sm:mb-6 relative">
                <div className="font-wanted text-xl sm:text-2xl text-western-accent uppercase tracking-wide text-center py-1 px-4 bg-western-sand/20 border-b border-western-wood/30 rounded-t-md">
                  Most Wanted Scammers
                </div>
                <div className="absolute right-6 sm:right-8 flex items-center text-western-wood">
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  <span className="font-western text-xs sm:text-sm">Volume 1</span>
                </div>
              </div>
              
              <div className="flex-1 flex items-center justify-center px-2 sm:px-4">
                <BookPage 
                  scammer={currentScammer}
                  pageNumber={visiblePage}
                  totalPages={totalPages}
                  formatCurrency={formatCurrency}
                  formatDate={formatDate}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
