
import { Json } from '@/integrations/supabase/types';

/**
 * Type definitions for the scammer service
 */

export interface ScammerListing {
  id: string;
  name: string;
  photoUrl: string;
  accusedOf: string;
  links: string[];
  aliases: string[];
  accomplices: string[];
  officialResponse: string;
  bountyAmount: number;
  walletAddress: string;
  dateAdded: string; // ISO string
  addedBy: string;
  comments?: string[]; // Array of comment IDs
  likes: number;
  dislikes: number;
  views: number;
  xLink?: string; // Added X.com link field
}

export interface ScammerStats {
  likes?: number;
  dislikes?: number;
  views?: number;
}

export interface ScammerDbRecord {
  id: string; // ID is required by Supabase
  name: string;
  photo_url: string | null;
  accused_of: string | null;
  links: Json;
  aliases: Json;
  accomplices: Json;
  official_response: string | null;
  bounty_amount: number | null;
  wallet_address: string | null;
  date_added: string;
  added_by: string | null;
  likes: number | null;
  dislikes: number | null;
  views: number | null;
  comments: Json | null;
  x_link: string | null; // Added X.com link field
}
