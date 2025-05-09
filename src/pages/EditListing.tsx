
import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useEditScammer } from "@/hooks/useEditScammer";
import { LoadingState } from "@/components/scammer/LoadingState";
import { ScammerNotFound } from "@/components/scammer/ScammerNotFound";
import { UnauthorizedAccess } from "@/components/scammer/UnauthorizedAccess";
import { EditScammerForm } from "@/components/scammer/EditScammerForm";
import { useIsMobile } from "@/hooks/use-mobile";
import { WalletDisconnect } from "@/components/wallet/WalletDisconnect";
import { useWallet } from "@/context/WalletContext";

const EditListing = () => {
  const { id } = useParams<{ id: string }>();
  const { isLoading, scammer, isAuthorized } = useEditScammer(id);
  const isMobile = useIsMobile();
  const { isConnected, address } = useWallet();
  const navigate = useNavigate();

  // Redirect if not connected
  useEffect(() => {
    if (!isConnected || !address) {
      navigate('/');
    }
  }, [isConnected, address, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col old-paper">
        <Header />
        <main className="flex-1 py-1 md:py-4 overflow-y-auto">
          <div className="container mx-auto px-4">
            <LoadingState />
          </div>
        </main>
        {/* SiteFooter is now rendered at the App level */}
      </div>
    );
  }

  if (!scammer) {
    return <ScammerNotFound />;
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex flex-col old-paper">
        <Header />
        <main className="flex-1 py-1 md:py-4 overflow-y-auto">
          <div className="container mx-auto px-4">
            <UnauthorizedAccess scammerId={id || ""} />
          </div>
        </main>
        {/* SiteFooter is now rendered at the App level */}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col old-paper">
      <Header />

      <main className={`flex-1 py-1 md:py-4 overflow-y-auto ${isMobile ? 'pb-32' : 'pb-16'}`}>
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="mb-6 md:mb-8 hover:bg-western-sand/20 text-western-wood"
          >
            <Link to={`/scammer/${id}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Scammer Details
            </Link>
          </Button>

          {isConnected && (
            <div className="mb-6">
              <WalletDisconnect />
            </div>
          )}

          <div className="paper-texture border-2 border-western-wood rounded-sm p-6 mb-6">
            <div className="mb-6 text-center">
              <h1 className="text-3xl font-wanted text-western-accent mb-2">Edit Listing</h1>
              <p className="text-western-wood max-w-2xl mx-auto">
                Update the information for this scammer listing
              </p>
            </div>
            
            {id && scammer && <EditScammerForm scammer={scammer} scammerId={id} />}
          </div>
        </div>
      </main>
      
      {/* SiteFooter is now rendered at the App level */}
    </div>
  );
};

export default EditListing;
