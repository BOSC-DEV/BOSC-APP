
import { useState } from "react";
import { Link } from "react-router-dom";
import { Copy, Check } from "lucide-react";
import { DEVELOPER_WALLET_ADDRESS } from "@/contracts/contract-abis";
import { formatWalletAddress } from "@/utils/formatters";
import { toast } from "sonner";

export const HomeFooter = () => {
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
    <footer className="py-8 border-t-2 border-western-leather/30 bg-western-parchment/10">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <span className="font-wanted text-transparent bg-clip-text bg-gradient-to-r from-western-accent to-western-leather">Book of Scams</span>
          </div>
          
          <div className="flex space-x-6">
            <Link to="/" className="text-sm text-western-wood hover:text-western-accent hover:scale-110 transform duration-200 font-western">
              Home
            </Link>
            <Link to="/most-wanted" className="text-sm text-western-wood hover:text-western-accent hover:scale-110 transform duration-200 font-western">
              Most Wanted
            </Link>
            <Link to="/create-listing" className="text-sm text-western-wood hover:text-western-accent hover:scale-110 transform duration-200 font-western">
              Report Scammer
            </Link>
          </div>
          
          <div className="text-sm text-western-wood font-western">
            &copy; {new Date().getFullYear()} Book of Scams
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-western-wood/20 text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm text-western-wood font-western">To support this public good, send tokens to:</span>
            <button 
              onClick={copyToClipboard}
              className="flex items-center mx-auto bg-western-wood/10 py-1 px-3 rounded text-western-wood hover:bg-western-sand/20 transition-colors"
            >
              <span className="font-mono text-sm">{formatWalletAddress(DEVELOPER_WALLET_ADDRESS)}</span>
              {copied ? (
                <Check className="h-4 w-4 ml-2 text-green-600" />
              ) : (
                <Copy className="h-4 w-4 ml-2" />
              )}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
