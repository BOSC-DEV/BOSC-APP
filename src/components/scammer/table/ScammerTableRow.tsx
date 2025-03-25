
import { Link } from "react-router-dom";
import { Scammer } from "@/lib/types";
import { TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { LinkIcon } from "lucide-react";
import { UploaderAvatar } from "./UploaderAvatar";
import { storageService } from "@/services/storage/localStorageService";

interface ScammerTableRowProps {
  scammer: Scammer;
  index: number;
  currentPage: number;
  itemsPerPage: number;
  formatCurrency: (amount: number) => string;
  formatDate: (date: Date) => string;
}

export const ScammerTableRow = ({ 
  scammer, 
  index, 
  currentPage, 
  itemsPerPage,
  formatCurrency,
  formatDate
}: ScammerTableRowProps) => {
  // Ensure aliases is always an array
  const aliases = Array.isArray(scammer.aliases) ? scammer.aliases : [];
  // Ensure links is always an array
  const links = Array.isArray(scammer.links) ? scammer.links : [];
  // Get comments count
  const commentsCount = storageService.getCommentsForScammer(scammer.id).length;
  
  return (
    <TableRow className="border-b border-western-wood/20 hover:bg-western-sand/10">
      <TableCell className="font-medium text-center">
        {(currentPage - 1) * itemsPerPage + index + 1}
      </TableCell>
      <TableCell>
        <Link to={`/scammer/${scammer.id}`}>
          <div className="flex items-center space-x-3">
            <Avatar className="border-2 border-western-wood">
              <AvatarImage src={scammer.photoUrl} alt={scammer.name} />
              <AvatarFallback className="bg-western-wood text-western-parchment">{scammer.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium font-western">{scammer.name}</div>
              <div className="text-xs text-western-wood/70 truncate max-w-[150px] hidden md:block">
                {scammer.walletAddress}
              </div>
            </div>
          </div>
        </Link>
      </TableCell>
      <TableCell>
        {links.length > 0 ? (
          <div className="flex items-center space-x-2">
            {links.slice(0, 3).map((link, index) => (
              <a 
                key={index} 
                href={link.startsWith('http') ? link : `https://${link}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-western-sand/20 text-western-wood hover:bg-western-sand/40 transition-colors"
              >
                <LinkIcon className="h-4 w-4" />
              </a>
            ))}
            {links.length > 3 && (
              <Badge variant="outline" className="text-sm bg-western-sand/20 border-western-wood/30 text-western-wood">
                +{links.length - 3} more
              </Badge>
            )}
          </div>
        ) : (
          <span className="text-western-wood/50 text-sm">-</span>
        )}
      </TableCell>
      <TableCell className="max-w-[200px]">
        <p className="truncate">{scammer.accusedOf}</p>
      </TableCell>
      <TableCell className="text-center">
        {aliases.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-1">
            <Badge variant="outline" className="text-sm bg-western-sand/20 border-western-wood/30 text-western-wood">
              {aliases[0]}
              {aliases.length > 1 && ` +${aliases.length - 1}`}
            </Badge>
          </div>
        ) : (
          <span className="text-western-wood/50 text-sm">-</span>
        )}
      </TableCell>
      <TableCell className="text-center font-medium">
        <div className="flex items-center justify-center">
          <span className="text-western-accent font-wanted">{formatCurrency(scammer.bountyAmount)} $BOSC</span>
        </div>
      </TableCell>
      <TableCell className="text-center">
        {scammer.likes || 0}
      </TableCell>
      <TableCell className="text-center">
        {scammer.views || 0}
      </TableCell>
      <TableCell className="text-right text-western-wood/90 text-sm">
        {formatDate(scammer.dateAdded)}
      </TableCell>
      <TableCell className="text-center">
        <UploaderAvatar addedBy={scammer.addedBy} />
      </TableCell>
    </TableRow>
  );
};
