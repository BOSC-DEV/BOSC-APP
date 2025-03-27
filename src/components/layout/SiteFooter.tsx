
import { Link } from "react-router-dom";
import { Twitter, Mail } from "lucide-react";

export const SiteFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 border-t border-western-wood wood-texture">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/193c1585-dc76-49e4-9490-147d52522837.png"
              alt="Book of Scams Logo"
              className="h-12 mr-3"
              style={{ objectFit: "contain" }}
            />
            <span className="text-western-parchment font-western text-sm">
              Book of Scams {currentYear} &copy; All Rights Reserved
            </span>
          </div>
          
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
      </div>
    </footer>
  );
};
