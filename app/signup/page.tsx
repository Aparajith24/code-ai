"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Github, Mail } from 'lucide-react'
import { UserAuth } from "@/app/AuthContext";

export default function SignupPage() {
  const userAuthResult = UserAuth() || {};
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register, googleSignIn, githubSignIn } = userAuthResult;
  const router = useRouter();

  const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    try {
      if (register) {
        await register(email, password, name);
        router.push("/editor");
      } else {
        throw new Error("register function not found");
      }
    } catch (error: any) {
      console.error("Registration Error:", error.code, error.message);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An error occurred during registration");
      }
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
        throw new Error("googleSignIn function not found");
      }
    } catch (e) {
      const error = e as Error;
      setError(error.message);
      console.log(error.message);
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
        throw new Error("githubSignIn function not found");
      }
    } catch (e) {
      const error = e as Error;
      setError(error.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center">CodeAI</CardTitle>
          <CardDescription className="text-center">Create an account to get started</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form className="space-y-4" onSubmit={handleRegistration}>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                placeholder="Enter your name" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
                placeholder="Create a password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input 
                id="confirm-password" 
                type="password" 
                placeholder="Confirm your password" 
                required 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
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
              <span className="bg-background px-2 text-muted-foreground">Or sign up with</span>
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
            Already have an account?{" "}
            <span onClick={() => router.push("/")} className="text-blue-600 hover:underline dark:text-blue-400 hover:cursor-pointer">
              Log in
            </span>
          </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}