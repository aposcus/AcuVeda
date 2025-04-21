
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type Profile = {
  id: string;
  full_name: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export function useProfile(userId: string | null | undefined) {
  const queryClient = useQueryClient();
  // Fetch profile
  const { data, isLoading, error } = useQuery({
    queryKey: ["profile", userId],
    queryFn: async () => {
      if (!userId) return null;
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();
      if (error) throw error;
      return data as Profile | null;
    },
    enabled: !!userId,
  });

  // Mutation to update profile (currently only supports full_name)
  const updateMutation = useMutation({
    mutationFn: async (updates: { full_name: string }) => {
      if (!userId) throw new Error("User not logged in");
      const { error } = await supabase
        .from("profiles")
        .update({ full_name: updates.full_name, updated_at: new Date().toISOString() })
        .eq("id", userId);
      if (error) throw error;
      await queryClient.invalidateQueries({ queryKey: ["profile", userId] });
    },
  });

  return {
    profile: data,
    isLoading,
    error,
    updateProfile: updateMutation.mutateAsync,
    updating: updateMutation.isPending,
  };
}
