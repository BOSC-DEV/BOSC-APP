
import { Header } from "@/components/Header";
import { CreateListingForm } from "@/components/CreateListingForm";
import { useWallet } from "@/context/WalletContext";
import ConnectWallet from "@/components/ConnectWallet";
import { Link } from "react-router-dom";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const CreateListing = () => {
  const { isConnected } = useWallet();

  return (
    <div className="min-h-screen flex flex-col old-paper">
      <Header />

      <main className="flex-1 pt-28 pb-16">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="mb-8 hover:bg-western-sand/20 text-western-wood"
          >
            <Link to="/most-wanted">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Most Wanted
            </Link>
          </Button>

          <div className="max-w-3xl mx-auto mb-6">
            <Alert className="border-western-wood bg-western-sand/20">
              <AlertCircle className="h-4 w-4 text-western-accent" />
              <AlertTitle className="text-western-accent font-western">Important Note</AlertTitle>
              <AlertDescription className="text-western-wood">
                All scammer listings created will have wallet addresses that are controlled by the developer. 
                The bounty amounts shown represent BOSC tokens, not dollar amounts.
              </AlertDescription>
            </Alert>
          </div>

          {isConnected ? (
            <div className="paper-texture border-2 border-western-wood rounded-sm p-6">
              <CreateListingForm />
            </div>
          ) : (
            <div className="max-w-2xl mx-auto paper-texture border-2 border-western-wood rounded-sm p-6">
              <ConnectWallet 
                message="Connect your wallet to create a new scammer listing"
                redirectPath="/create-listing"
              />
            </div>
          )}
        </div>
      </main>

      <div className="mt-auto">
        <footer className="py-8 border-t border-western-wood wood-texture">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-wanted text-western-accent">Book of Scams</span>
                <span className="px-2 py-1 bg-western-sand/20 text-western-accent text-xs font-medium rounded-full border border-western-accent/30">
                  BOSC
                </span>
              </div>
              
              <div className="flex space-x-6">
                <Link to="/" className="text-sm text-western-parchment hover:text-western-sand font-western">
                  Home
                </Link>
                <Link to="/most-wanted" className="text-sm text-western-parchment hover:text-western-sand font-western">
                  Most Wanted
                </Link>
                <Link to="/create-listing" className="text-sm text-western-parchment hover:text-western-sand font-western">
                  Report Scammer
                </Link>
              </div>
              
              <div className="text-sm text-western-parchment/70 font-western">
                &copy; {new Date().getFullYear()} Book of Scams
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CreateListing;
