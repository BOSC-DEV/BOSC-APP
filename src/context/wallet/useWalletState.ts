
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Web3Provider } from '../../services/web3/provider';

export function useWalletState() {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [smartWalletAddress, setSmartWalletAddress] = useState<string | null>(null);
  const [smartWalletLoading, setSmartWalletLoading] = useState(false);
  const [chainId, setChainId] = useState<number | null>(null);
  const [web3Provider] = useState(() => new Web3Provider());

  // Restore wallet connection from localStorage
  useEffect(() => {
    const restoreWalletConnection = async () => {
      const storedWalletData = localStorage.getItem('walletData');
      const storedTimestamp = localStorage.getItem('walletTimestamp');
      
      if (storedWalletData && storedTimestamp) {
        const parsedData = JSON.parse(storedWalletData);
        const timestamp = parseInt(storedTimestamp);
        const currentTime = Date.now();
        
        // Check if stored data is less than 24 hours old (24h * 60m * 60s * 1000ms)
        if (currentTime - timestamp < 24 * 60 * 60 * 1000) {
          console.log("Found valid stored wallet data, restoring session");
          setAddress(parsedData.address);
          setConnected(true);
          setChainId(101); // Solana mainnet
          
          // Try to get balance
          if (parsedData.address) {
            web3Provider.getBalance(parsedData.address)
              .then(balance => setBalance(balance))
              .catch(error => {
                console.error("Failed to get balance on restore:", error);
                setBalance(10); // Default balance
              });
          }
        } else {
          console.log("Stored wallet data expired, removing");
          localStorage.removeItem('walletData');
          localStorage.removeItem('walletTimestamp');
        }
      }
    };
    
    restoreWalletConnection();
  }, [web3Provider]);

  // Check wallet connection status
  useEffect(() => {
    const checkConnection = async () => {
      console.log("Checking wallet connection status...");
      if (window.phantom?.solana && window.phantom.solana.isConnected && window.phantom.solana.publicKey) {
        // Even if already connected, we need to try to re-connect to trigger signature check
        try {
          const connectedAddress = await web3Provider.connectWallet();
          if (connectedAddress) {
            setAddress(connectedAddress);
            setConnected(true);
            // 101 is Solana mainnet
            setChainId(101);
            
            // Store wallet data with timestamp for 24-hour persistence
            localStorage.setItem('walletData', JSON.stringify({ address: connectedAddress }));
            localStorage.setItem('walletTimestamp', Date.now().toString());
            
            try {
              const tokenBalance = await web3Provider.getBalance(connectedAddress);
              setBalance(tokenBalance);
            } catch (error) {
              console.error("Failed to get balance on initial load:", error);
              setBalance(10); // Default balance for UI to work
            }
          } else {
            console.log("Signature verification failed during initial check");
            setAddress(null);
            setConnected(false);
          }
        } catch (error) {
          console.error("Failed to re-connect during initial check:", error);
        }
      } else {
        console.log("No wallet connected during initial check");
      }
    };

    checkConnection();
  }, [web3Provider]);
  
  return {
    connected,
    setConnected,
    connecting,
    setConnecting,
    address,
    setAddress, 
    balance,
    setBalance,
    smartWalletAddress,
    setSmartWalletAddress,
    smartWalletLoading,
    setSmartWalletLoading,
    chainId,
    setChainId,
    web3Provider
  };
}
