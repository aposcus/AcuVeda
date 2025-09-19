
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type Profile = {
  id: string;
  user_id: string;
  full_name: string | null;
  username: string | null;
  avatar_url: string | null;
  age: number | null;
  gender: string | null;
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
        .select("id, user_id, full_name, username, avatar_url, age, gender, created_at, updated_at")
        .eq("user_id", userId)
        .maybeSingle();
      if (error) throw error;
      return data as Profile | null;
    },
    enabled: !!userId,
  });

  // Mutation to update profile
  const updateMutation = useMutation({
    mutationFn: async (updates: Partial<Profile>) => {
      if (!userId) throw new Error("User not logged in");
      const { error } = await supabase
        .from("profiles")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("user_id", userId);
      if (error) throw error;
      await queryClient.invalidateQueries({ queryKey: ["profile", userId] });
    },
  });

  // Avatar upload utility
  const uploadAvatar = async (file: File) => {
    if (!userId) throw new Error("Not logged in");
    const fileExt = file.name.split(".").pop();
    const filePath = `${userId}/avatar.${fileExt}`;
    // Remove any previous avatars
    await supabase.storage.from("avatars").remove([`${userId}/avatar.jpg`, `${userId}/avatar.png`, `${userId}/avatar.jpeg`]);
    const { data, error } = await supabase.storage.from("avatars").upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
    });
    if (error) throw error;
    // Public URL
    const { data: publicUrlData } = supabase.storage.from("avatars").getPublicUrl(filePath);
    return publicUrlData.publicUrl;
  };

  return {
    profile: data,
    isLoading,
    error,
    updateProfile: updateMutation.mutateAsync,
    updating: updateMutation.isPending,
    uploadAvatar,
  };
}
