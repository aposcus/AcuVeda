
import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { LogOut } from "lucide-react";
import AvatarUpload from "@/components/AvatarUpload";

const GENDERS = ["Male", "Female", "Other", "Prefer not to say"];

const ProfilePage: React.FC = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { profile, isLoading, updateProfile, updating, uploadAvatar } = useProfile(user?.id);

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [gender, setGender] = useState<string>("");

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    setAvatarUrl(profile?.avatar_url || null);
    setFullName(profile?.full_name || "");
    setUsername(profile?.username || "");
    setAge(profile?.age ?? "");
    setGender(profile?.gender || "");
  }, [profile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      toast({ title: "Full name required", variant: "destructive" });
      return;
    }
    if (!username.trim()) {
      toast({ title: "Username required", variant: "destructive" });
      return;
    }
    if (age !== "" && (isNaN(Number(age)) || Number(age) < 0)) {
      toast({ title: "Valid age required", variant: "destructive" });
      return;
    }
    try {
      await updateProfile({
        full_name: fullName,
        username,
        age: age === "" ? null : Number(age),
        gender,
      });
      toast({ title: "Profile updated!", description: "Your profile has been saved." });
    } catch (err: any) {
      if (err?.message?.includes("duplicate key value")) {
        toast({ title: "Username taken", description: "Please choose a different username.", variant: "destructive" });
      } else {
        toast({ title: "Update failed", description: err.message, variant: "destructive" });
      }
    }
  };

  const handleLogout = async () => {
    await signOut();
    toast({ title: "Logged out" });
    navigate("/login");
  };

  const handleAvatarChange = async (file: File) => {
    try {
      const url = await uploadAvatar(file);
      setAvatarUrl(url);
      await updateProfile({ avatar_url: url });
      toast({ title: "Avatar updated!" });
    } catch (err: any) {
      toast({ title: "Failed to upload avatar", description: err.message, variant: "destructive" });
    }
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-gray-500">Loading profile…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-acuveda-light flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center">
          <AvatarUpload src={avatarUrl} name={fullName} loading={updating} onChange={handleAvatarChange} />
          <CardTitle className="mt-2">My Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input value={user?.email} id="email" readOnly className="bg-muted" />
            </div>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                disabled={updating}
                placeholder="Unique username"
              />
            </div>
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                disabled={updating}
                autoComplete="name"
                placeholder="Your full name"
              />
            </div>
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                min={0}
                value={age}
                onChange={(e) => setAge(e.target.value === "" ? "" : Number(e.target.value))}
                disabled={updating}
                placeholder="Your age"
              />
            </div>
            <div>
              <Label htmlFor="gender">Gender</Label>
              <select
                id="gender"
                className="block w-full py-2 px-3 border border-input rounded-md"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                disabled={updating}
              >
                <option value="">Select gender</option>
                {GENDERS.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
            <Button type="submit" disabled={updating}>
              {updating ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleLogout}
            className="w-full flex items-center gap-2 mt-2"
          >
            <LogOut size={18} />
            Log out
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfilePage;
