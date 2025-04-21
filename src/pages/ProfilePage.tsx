
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

const ProfilePage: React.FC = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { profile, isLoading, updateProfile, updating } = useProfile(user?.id);
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    setFullName(profile?.full_name || "");
  }, [profile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      toast({ title: "Full name required", variant: "destructive" });
      return;
    }
    try {
      await updateProfile({ full_name: fullName });
      toast({ title: "Profile updated!", description: "Your name has been saved." });
    } catch (err: any) {
      toast({ title: "Update failed", description: err.message, variant: "destructive" });
    }
  };

  const handleLogout = async () => {
    await signOut();
    toast({ title: "Logged out" });
    navigate("/login");
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
        <CardHeader>
          <CardTitle>My Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input value={user?.email} id="email" readOnly className="bg-muted" />
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
                placeholder="Enter your full name"
              />
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

