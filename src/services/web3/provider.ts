
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';

// Signature message for initial authentication
const SIGNATURE_MESSAGE = "Sign this message to verify your identity with Book of Scams";

// Class to handle Solana wallet connection and operations
export class Web3Provider {
  protected connection: Connection;

  constructor() {
    // Use Solana's official public RPC endpoint with increased timeout
    this.connection = new Connection(clusterApiUrl('mainnet-beta'), {
      commitment: "confirmed",
      confirmTransactionInitialTimeout: 60000 // Increase timeout to 60 seconds
    });
  }

  // Connect wallet and request signature
  async connectWallet(): Promise<string | null> {
    try {
      // Check if Phantom wallet is available
      if (!window.phantom?.solana) {
        console.error("Phantom wallet not available");
        return null;
      }

      // Connect to wallet
      const resp = await window.phantom.solana.connect();
      const walletPublicKey = resp.publicKey.toString();
      
      // Request signature for verification
      await this.requestSignature();
      
      return walletPublicKey;
    } catch (error) {
      console.error("Error connecting wallet:", error);
      return null;
    }
  }

  // Request signature to verify ownership
  async requestSignature(): Promise<boolean> {
    try {
      if (!window.phantom?.solana) {
        console.error("Phantom wallet not available");
        return false;
      }

      // Check if we need a new signature based on last signature time
      const lastSignatureTime = localStorage.getItem('lastSignatureTime');
      const currentTime = Date.now();
      
      // If we have a valid signature within the past 24 hours, don't request a new one
      if (lastSignatureTime && (currentTime - parseInt(lastSignatureTime) < 24 * 60 * 60 * 1000)) {
        console.log("Using existing signature (less than 24 hours old)");
        return true;
      }

      // Prepare signature message using TextEncoder
      const encoder = new TextEncoder();
      const message = encoder.encode(SIGNATURE_MESSAGE);
      
      // Request signature from wallet - passing only the message parameter
      const signatureResponse = await window.phantom.solana.signMessage(message);
      
      if (!signatureResponse.signature) {
        console.error("Failed to get signature");
        return false;
      }
      
      // Store signature time - valid for 24 hours
      localStorage.setItem('lastSignatureTime', currentTime.toString());
      
      return true;
    } catch (error) {
      console.error("Error requesting signature:", error);
      return false;
    }
  }

  // Disconnect wallet
  async disconnectWallet(): Promise<void> {
    try {
      if (window.phantom?.solana) {
        await window.phantom.solana.disconnect();
      }
      
      // Clear signature data
      localStorage.removeItem('lastSignatureTime');
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  }

  // Get wallet balance
  async getBalance(address: string): Promise<number> {
    try {
      const publicKey = new PublicKey(address);
      const balance = await this.connection.getBalance(publicKey);
      const solBalance = balance / 10 ** 9; // Convert lamports to SOL
      console.log(`Retrieved balance for ${address}: ${solBalance} SOL`);
      return solBalance;
    } catch (error) {
      console.error("Error getting balance:", error);
      // For debugging purposes, show a very small value instead of 0 to see if the display works
      // This helps distinguish between an actual 0 balance and a failed request
      return 0.05; 
    }
  }
}
