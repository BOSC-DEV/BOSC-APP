
import { ScammerListing, ScammerDbRecord } from './scammerTypes';
import { safeJsonToStringArray } from '../baseSupabaseService';

/**
 * Utility class for processing scammer data between formats
 */
export class ScammerDataProcessor {
  /**
   * Convert a database record to a client-facing listing
   */
  static dbRecordToListing(record: ScammerDbRecord): ScammerListing {
    return {
      id: record.id,
      name: record.name,
      photoUrl: record.photo_url || '',
      accusedOf: record.accused_of || '',
      links: safeJsonToStringArray(record.links),
      aliases: safeJsonToStringArray(record.aliases),
      accomplices: safeJsonToStringArray(record.accomplices),
      officialResponse: record.official_response || '',
      bountyAmount: Number(record.bounty_amount) || 0,
      walletAddress: record.wallet_address || '',
      dateAdded: record.date_added,
      addedBy: record.added_by || '',
      comments: safeJsonToStringArray(record.comments),
      likes: record.likes || 0,
      dislikes: record.dislikes || 0,
      views: record.views || 0,
      shares: record.shares || 0
    };
  }

  /**
   * Convert a client-facing listing to a database record
   */
  static listingToDbRecord(listing: ScammerListing): ScammerDbRecord {
    return {
      id: listing.id,
      name: listing.name,
      photo_url: listing.photoUrl,
      accused_of: listing.accusedOf,
      links: listing.links,
      aliases: listing.aliases,
      accomplices: listing.accomplices,
      official_response: listing.officialResponse,
      bounty_amount: listing.bountyAmount,
      wallet_address: listing.walletAddress,
      date_added: listing.dateAdded,
      added_by: listing.addedBy,
      comments: listing.comments,
      likes: listing.likes,
      dislikes: listing.dislikes,
      views: listing.views,
      shares: listing.shares
    };
  }
}
