
import React from 'react';
import { Button } from "@/components/ui/button";
import { LogOut, RefreshCw, Wallet, Copy, Check } from "lucide-react";
import { useWallet } from "@/context/WalletContext";
import { toast } from "sonner";
import { SolAmount } from '@/components/SolAmount';
import { useNavigate } from 'react-router-dom';
import { copyAddressToClipboard } from '@/components/bounty/utils/walletUtils';

interface WalletDisconnectProps {
  onDisconnect?: () => void;
}

export const WalletDisconnect = ({ onDisconnect }: WalletDisconnectProps) => {
  const { disconnectWallet, address, balance, connectWallet } = useWallet();
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [isCopied, setIsCopied] = React.useState(false);
  const navigate = useNavigate();

  const handleDisconnect = async () => {
    // We'll let the disconnectWallet function handle the toast notification
    await disconnectWallet();
    
    if (onDisconnect) {
      onDisconnect();
    }
    navigate('/');
  };

  const handleRefreshBalance = async () => {
    setIsRefreshing(true);
    try {
      await connectWallet();
      toast.success("Balance updated");
    } catch (error) {
      toast.error("Failed to refresh balance");
    } finally {
      setIsRefreshing(false);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  const handleCopyAddress = async () => {
    if (address) {
      const success = await copyAddressToClipboard(address);
      if (success) {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      }
    }
  };

  return (
    <div className="mb-6 p-4 bg-western-sand/20 rounded-lg border border-western-wood/30">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Wallet className="h-5 w-5 text-western-accent mr-2" />
            <span className="text-sm font-medium text-western-wood">Connected Wallet</span>
          </div>
          <Button 
            variant="outline"
            size="sm" 
            onClick={handleDisconnect}
            className="border-western-wood/50 text-western-accent hover:bg-western-wood hover:text-western-parchment"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Disconnect
          </Button>
        </div>
        
        <div className="bg-western-parchment/50 p-3 rounded border border-western-wood/20">
          <div className="flex justify-between items-center">
            <span className="text-sm text-western-wood/70">Address</span>
            <div className="flex items-center">
              <span 
                className="text-sm font-mono text-western-wood cursor-pointer hover:text-western-accent transition-colors"
                onClick={handleCopyAddress}
              >
                {address ? formatAddress(address) : 'Not connected'}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopyAddress}
                className="h-6 w-6 ml-1 hover:bg-western-wood/10 rounded-full"
                aria-label="Copy address to clipboard"
              >
                {isCopied ? (
                  <Check className="h-3.5 w-3.5 text-green-600" />
                ) : (
                  <Copy className="h-3.5 w-3.5 text-western-accent/70" />
                )}
              </Button>
            </div>
          </div>
        </div>
        
        <div className="bg-western-parchment/50 p-3 rounded border border-western-wood/20">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/b56ce7fa-4bb2-4920-b10e-4b0c6907f0ec.png" 
                alt="SOL"
                className="h-5 w-5 mr-2" 
                style={{ objectFit: "contain" }}
              />
              <span className="text-sm text-western-wood/70">Balance</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-mono text-western-wood font-medium mr-3">
                {balance !== null ? (
                  <SolAmount amount={balance} />
                ) : (
                  "0.00 SOL"
                )}
              </span>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleRefreshBalance}
                disabled={isRefreshing}
                className="h-6 w-6 rounded-full hover:bg-western-wood/10"
              >
                <RefreshCw className={`h-4 w-4 text-western-accent ${isRefreshing ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
