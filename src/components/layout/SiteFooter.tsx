
import { useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Copy, Check } from "lucide-react";
import { DEVELOPER_WALLET_ADDRESS } from "@/contracts/contract-abis";
import { formatWalletAddress } from "@/utils/formatters";
import { toast } from "sonner";

export const SiteFooter = () => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(DEVELOPER_WALLET_ADDRESS)
      .then(() => {
        setCopied(true);
        toast.success("Address copied to clipboard");
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        toast.error("Failed to copy address");
      });
  };

  return (
    <footer className="py-8 border-t border-western-wood wood-texture">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div>
            <span className="text-xl font-wanted text-zinc-950">Book of Scams</span>
          </div>
          
          <div className="flex space-x-6">
            <Link to="/" className="text-sm text-western-parchment hover:text-western-sand font-western">
              Saloon
            </Link>
            <Link to="/most-wanted" className="text-sm text-western-parchment hover:text-western-sand font-western">
              Most Wanted
            </Link>
            <Link to="/create-listing" className="text-sm text-western-parchment hover:text-western-sand font-western">
              Report Outlaw
            </Link>
          </div>
          
          <div className="text-sm text-western-parchment/70 font-western">
            &copy; {new Date().getFullYear()} Book of Scams
          </div>
        </div>
        
        <div className="border-t border-western-wood/20 pt-4 text-center">
          <div className="text-sm text-western-parchment/80 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-sm text-western-parchment/80 font-western">To support this public good, send tokens to:</span>
              <button 
                onClick={copyToClipboard}
                className="flex items-center bg-western-wood/10 py-1 px-3 rounded text-western-parchment hover:bg-western-wood/20 transition-colors"
              >
                <span className="font-mono">{formatWalletAddress(DEVELOPER_WALLET_ADDRESS)}</span>
                {copied ? (
                  <Check className="h-4 w-4 ml-2 text-green-400" />
                ) : (
                  <Copy className="h-4 w-4 ml-2" />
                )}
              </button>
              <a 
                href={`https://solscan.io/account/${DEVELOPER_WALLET_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-western-sand hover:text-western-accent"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
