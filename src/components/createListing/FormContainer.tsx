
import { useState } from "react";
import { useWallet } from "@/context/WalletContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ListingDisclaimer } from "@/components/scammer/ListingDisclaimer";
import { ListingFormActions } from "@/components/scammer/ListingFormActions";
import { useListingForm } from "./useListingForm";
import { BasicInfoFields } from "./BasicInfoFields";
import { AdditionalInfoFields } from "./AdditionalInfoFields";
import { TurnstileVerification } from "./TurnstileVerification";
import { useSubmitListing } from "./SubmitListingHandler";

export function FormContainer() {
  const {
    isConnected
  } = useWallet();
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const {
    name,
    setName,
    photoUrl,
    setPhotoUrl,
    accusedOf,
    setAccusedOf,
    currentLink,
    setCurrentLink,
    links,
    setLinks,
    currentAlias,
    setCurrentAlias,
    aliases,
    setAliases,
    currentAccomplice,
    setCurrentAccomplice,
    accomplices,
    setAccomplices,
    officialResponse,
    setOfficialResponse,
    handleAddLink,
    handleAddAlias,
    handleAddAccomplice,
    removeLink,
    removeAlias,
    removeAccomplice,
    validateForm
  } = useListingForm();
  const {
    isSubmitting,
    handleSubmit
  } = useSubmitListing();
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit({
      name,
      photoUrl,
      accusedOf,
      links,
      aliases,
      accomplices,
      officialResponse,
      turnstileToken,
      validateForm,
      onSubmitStart: () => {},
      onSubmitEnd: () => {}
    });
  };
  return <form onSubmit={handleFormSubmit}>
      <Card className="w-full max-w-3xl mx-auto border-western-wood/40 bg-western-parchment/80">
        <CardHeader className="border-b border-western-wood/10">
          <CardTitle className="text-western-wood font-wanted">Wanted Poster Details</CardTitle>
          <CardDescription className="text-western-wood/80">Shame scammers with their very own wanted poster. When funding bounties starts, the scammer with the most funded $BOSC will rank first, and so on. For now, it's ranked on views.</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6 pt-6">
          <BasicInfoFields name={name} setName={setName} photoUrl={photoUrl} setPhotoUrl={setPhotoUrl} accusedOf={accusedOf} setAccusedOf={setAccusedOf} />

          <AdditionalInfoFields currentLink={currentLink} setCurrentLink={setCurrentLink} links={links} handleAddLink={handleAddLink} removeLink={removeLink} currentAlias={currentAlias} setCurrentAlias={setCurrentAlias} aliases={aliases} handleAddAlias={handleAddAlias} removeAlias={removeAlias} currentAccomplice={currentAccomplice} setCurrentAccomplice={setCurrentAccomplice} accomplices={accomplices} handleAddAccomplice={handleAddAccomplice} removeAccomplice={removeAccomplice} officialResponse={officialResponse} setOfficialResponse={setOfficialResponse} />

          <TurnstileVerification onVerify={setTurnstileToken} token={turnstileToken} />

          <ListingDisclaimer />
        </CardContent>
        
        <CardFooter className="border-t border-western-wood/10 bg-western-sand/10">
          <ListingFormActions isSubmitting={isSubmitting} />
        </CardFooter>
      </Card>
    </form>;
}
