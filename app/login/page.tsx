'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Github, Mail } from 'lucide-react';
import { UserAuth } from "@/app/AuthContext";

export default function LoginPage() {
  const { login, googleSignIn, githubSignIn } = UserAuth() || {};
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (login) {
        await login(email, password);
        router.push("/editor");
      } else {
        throw new Error("Login function not available");
      }
    } catch (e) {
      const error = e as Error;
      setError(error.message);
      console.error("Login error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      if (googleSignIn) {
        await googleSignIn();
        router.push("/editor");
      } else {
        throw new Error("Google Sign-In not available");
      }
    } catch (e) {
      const error = e as Error;
      setError(error.message);
      console.error("Google Sign-In error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGithubSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      if (githubSignIn) {
        await githubSignIn();
        router.push("/editor");
      } else {
        throw new Error("GitHub Sign-In not available");
      }
    } catch (e) {
      const error = e as Error;
      setError(error.message);
      console.error("GitHub Sign-In error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center">
            CodeAI
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to login
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={handleGithubSignIn}
              disabled={loading}
            >
              <Github className="mr-2 h-4 w-4" />
              Github
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              <Mail className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <div className="ml-auto mr-auto">
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 w-full">
              Don't have an account?{" "}
              <span
                onClick={() => router.push("/signup")}
                className="text-blue-600 hover:underline dark:text-blue-400 hover:cursor-pointer"
              >
                Sign up
              </span>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}