
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, User } from 'lucide-react';
import Logo from '@/components/Logo';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/components/ui/use-toast";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const { user, loading, signInWithEmail, signUpWithEmail } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/"); // Redirect to home page instead of dashboard after login/signup
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSubmitting(true);
    try {
      if (isLogin) {
        const { error } = await signInWithEmail(email, password);
        if (error) {
          setFormError(error.message || "Login failed. Please try again.");
          toast({ title: "Login failed", description: error.message, variant: "destructive" });
        } else {
          toast({ title: "Logged in!", description: "Welcome back!" });
        }
      } else {
        const { error } = await signUpWithEmail(email, password, name);
        if (error) {
          setFormError(error.message || "Signup failed. Please try again.");
          toast({ title: "Signup failed", description: error.message, variant: "destructive" });
        } else {
          toast({ title: "Account created!", description: "Check your email for confirmation (if required)" });
        }
      }
    } catch (err: any) {
      setFormError(err.message || "Unexpected error occured.");
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-acuveda-light flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <CardTitle className="text-2xl">{isLogin ? 'Login to Your Account' : 'Create an Account'}</CardTitle>
          <CardDescription>
            {isLogin
              ? 'Enter your credentials to access your account'
              : 'Sign up to start using AcuVeda health monitoring'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                disabled={submitting}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                {isLogin && (
                  <Link to="#" className="text-xs text-acuveda-blue hover:underline">
                    Forgot password?
                  </Link>
                )}
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete={isLogin ? "current-password" : "new-password"}
                disabled={submitting}
              />
            </div>
            {formError && (
              <div className="text-red-600 text-sm mt-2 text-center">{formError}</div>
            )}
            <Button
              type="submit"
              className="w-full bg-acuveda-blue hover:bg-acuveda-blue/90 flex items-center justify-center gap-2"
              disabled={submitting}
            >
              {isLogin ? (
                <>
                  <LogIn size={18} />
                  {submitting ? "Logging in..." : "Login"}
                </>
              ) : (
                <>
                  <User size={18} />
                  {submitting ? "Creating..." : "Create Account"}
                </>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-sm text-center text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-acuveda-blue hover:underline ml-1"
            >
              {isLogin ? 'Sign up' : 'Login'}
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
