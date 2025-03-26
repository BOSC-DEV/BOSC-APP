
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/lib/supabase";
import { useWallet } from "@/context/WalletContext";
import { CommentList } from "@/components/comments/CommentList";

export function CommentsTab() {
  const [comments, setComments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { address } = useWallet();

  useEffect(() => {
    async function loadComments() {
      setIsLoading(true);
      try {
        if (address) {
          const { data: userComments, error } = await supabase
            .from('comments')
            .select('*')
            .eq('author', address)
            .order('created_at', { ascending: false });
            
          if (error) {
            console.error("Error fetching comments:", error);
            throw error;
          }
          
          setComments(userComments || []);
        }
      } catch (error) {
        console.error("Error loading user comments:", error);
        setComments([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadComments();
  }, [address]);

  if (isLoading) {
    return (
      <>
        <h2 className="text-xl font-bold mb-4 font-western text-western-accent">Comments</h2>
        <Card className="p-6">
          <Skeleton className="h-24 w-full mb-4" />
          <Skeleton className="h-24 w-full" />
        </Card>
      </>
    );
  }

  if (!comments.length) {
    return (
      <>
        <h2 className="text-xl font-bold mb-4 font-western text-western-accent">Comments</h2>
        <Card className="p-6 text-center">
          <p className="text-western-sand">You haven't posted any comments yet</p>
        </Card>
      </>
    );
  }

  return (
    <>
      <h2 className="text-xl font-bold mb-4 font-western text-western-accent">Comments</h2>
      <Card className="p-6">
        <CommentList comments={comments} />
      </Card>
    </>
  );
}
