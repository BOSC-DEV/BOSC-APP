
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IdentityTab } from './tabs/IdentityTab';
import { SocialsTab } from './tabs/SocialsTab';
import { NetworkTab } from './tabs/NetworkTab';
import { ResponseTab } from './tabs/ResponseTab';

interface ScammerContentProps {
  aliases: string[];
  links: string[];
  accomplices: string[];
  officialResponse: string;
}

export function ScammerContent({ aliases, links, accomplices, officialResponse }: ScammerContentProps) {
  // Add console logs to debug the data
  console.log('ScammerContent props:', { aliases, links, accomplices, officialResponse });
  
  return (
    <Tabs defaultValue="identity" className="w-full">
      <TabsList className="grid grid-cols-4 mb-6">
        <TabsTrigger value="identity">Identity</TabsTrigger>
        <TabsTrigger value="socials">Links</TabsTrigger>
        <TabsTrigger value="network">Network</TabsTrigger>
        <TabsTrigger value="response">Response</TabsTrigger>
      </TabsList>
      
      <TabsContent value="identity">
        <IdentityTab aliases={aliases} />
      </TabsContent>
      
      <TabsContent value="socials">
        <SocialsTab links={links} />
      </TabsContent>
      
      <TabsContent value="network">
        <NetworkTab accomplices={accomplices} />
      </TabsContent>
      
      <TabsContent value="response">
        <ResponseTab officialResponse={officialResponse} />
      </TabsContent>
    </Tabs>
  );
}
