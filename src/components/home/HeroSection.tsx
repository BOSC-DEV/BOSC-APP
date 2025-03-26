
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

export const HeroSection = () => {
  return <section className="pt-20 pb-12 md:pt-32 md:pb-24 px-3 sm:px-4 old-paper">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
          <div className="space-y-3 md:space-y-4 md:pr-8 animate-fade-in flex flex-col items-start">
            <h1 className="font-wanted uppercase tracking-wide wanted-poster mx-0 my-0 py-[15px] px-0 text-western-accent">
              <span className="block text-5xl md:text-6xl lg:text-7xl">BOOK OF</span>
              <span className="block text-[4.2rem] md:text-[4.9rem] lg:text-[5.6rem] -mt-2">SCAMS</span>
            </h1>
            
            <p className="sm:text-xl text-western-wood max-w-lg font-western text-xl -mt-16 mb-0">Book of Scams is a decentralised criminal registry bringing accountability and justice to The Wild West of crypto.</p>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-2 w-full">
              <Button asChild size="default" className="western-btn gap-2 hover:animate-wiggle bg-western-leather hover:bg-western-accent text-western-parchment">
                <Link to="/most-wanted">
                  Most Wanted
                </Link>
              </Button>
              <Button asChild variant="outline" size="default" className="western-btn gap-2 border-2 border-dashed border-western-wood text-western-wood hover:animate-wiggle hover:bg-western-wood hover:text-western-parchment">
                <Link to="/create-listing">
                  Report Scammer
                  <BookOpen className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="relative h-[250px] sm:h-[300px] md:h-[400px] animate-fade-in rounded-sm overflow-hidden border-4 border-western-wood transform -rotate-1 shadow-lg wanted-poster-bg mx-auto w-full max-w-[320px] sm:max-w-none">
            <div className="absolute inset-0 bg-gradient-to-br from-western-leather/30 via-western-accent/20 to-western-parchment/50 opacity-70 rounded-sm"></div>
            
            {/* Nail at the center top of the wanted poster - moved down slightly */}
            <div className="absolute top-[15px] left-1/2 transform -translate-x-1/2 z-10">
              <div className="w-8 h-8 bg-gray-600 rounded-full shadow-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-gradient-to-br from-gray-500 to-gray-700 rounded-full shadow-inner flex items-center justify-center">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                </div>
              </div>
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-[2px] h-[4px] bg-gray-800 rounded-b"></div>
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center text-western-wood p-4 sm:p-6">
              <div className="text-center space-y-8">
                <h2 className="font-wanted uppercase text-center">
                  <div className="text-5xl sm:text-6xl text-western-accent font-bold tracking-wider mb-4">WANTED:</div>
                  <div className="text-2xl sm:text-3xl text-western-leather tracking-wide py-0 my-2 px-0">Scammers, Grifters & Criminals of All Creeds</div>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
