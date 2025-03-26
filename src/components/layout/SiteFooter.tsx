
import { Link } from "react-router-dom";
import { Twitter, Mail } from "lucide-react";

export const SiteFooter = () => {
  return (
    <footer className="py-8 border-t border-western-wood wood-texture">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div>
            <span className="text-xl font-wanted text-western-parchment">Book of Scams</span>
          </div>
          
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-6">
              <a 
                href="https://x.com/bookofscamslol" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-western-parchment hover:text-western-sand transition-colors"
              >
                <Twitter className="h-4 w-4" />
                <span className="font-western text-sm">@bookofscamslol</span>
              </a>
              
              <a 
                href="mailto:dev@bookofscamslol" 
                className="flex items-center gap-2 text-western-parchment hover:text-western-sand transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span className="font-western text-sm">dev@bookofscamslol</span>
              </a>
            </div>
          </div>
          
          <div className="text-sm text-western-parchment font-western">
            &copy; {new Date().getFullYear()} Book of Scams
          </div>
        </div>
      </div>
    </footer>
  );
};

