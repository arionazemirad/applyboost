"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Define validation schemas
const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signUpSchema = z
  .object({
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password is too long"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        router.replace("/");
      }
    };
    checkUser();
  }, [router]);

  // Reset errors when form mode changes
  useEffect(() => {
    setErrors({});
    setMessage("");
    setConfirmPassword("");
  }, [isSignUp]);

  const validateForm = () => {
    setErrors({});

    try {
      if (isSignUp) {
        signUpSchema.parse({ email, password, confirmPassword });
      } else {
        signInSchema.parse({ email, password });
      }
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const field = err.path[0].toString();
          newErrors[field] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleEmailAuth = async () => {
    setMessage("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const { error } = isSignUp
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        setMessage(error.message);
      } else {
        if (!isSignUp) {
          router.replace("/");
        } else {
          setMessage(
            "Success! Please check your email to verify your account."
          );
        }
      }
    } catch (err) {
      setMessage("An unexpected error occurred");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4'>
      <Card className='w-full max-w-md shadow-lg border-0'>
        <CardHeader className='space-y-1 text-center pb-0'>
          <CardTitle className='text-2xl font-bold'>
            {isSignUp ? "Create an Account" : "Welcome Back"}
          </CardTitle>
          <p className='text-sm text-gray-500'>
            {isSignUp
              ? "Create an account to get started"
              : "Enter your credentials to sign in"}
          </p>
        </CardHeader>

        <CardContent className='pt-6 space-y-4'>
          <div className='space-y-2'>
            <label htmlFor='email' className='text-sm font-medium'>
              Email
            </label>
            <Input
              id='email'
              type='email'
              placeholder='you@example.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`h-10 ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && (
              <p className='text-red-500 text-xs mt-1'>{errors.email}</p>
            )}
          </div>

          <div className='space-y-2'>
            <label htmlFor='password' className='text-sm font-medium'>
              Password
            </label>
            <Input
              id='password'
              type='password'
              placeholder='••••••••'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`h-10 ${errors.password ? "border-red-500" : ""}`}
            />
            {errors.password && (
              <p className='text-red-500 text-xs mt-1'>{errors.password}</p>
            )}
          </div>

          {isSignUp && (
            <div className='space-y-2'>
              <label htmlFor='confirmPassword' className='text-sm font-medium'>
                Confirm Password
              </label>
              <Input
                id='confirmPassword'
                type='password'
                placeholder='••••••••'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`h-10 ${errors.confirmPassword ? "border-red-500" : ""}`}
              />
              {errors.confirmPassword && (
                <p className='text-red-500 text-xs mt-1'>
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          )}

          <Button
            onClick={handleEmailAuth}
            className='w-full h-10'
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : isSignUp
                ? "Create Account"
                : "Sign In"}
          </Button>

          {message && (
            <div
              className={`p-3 rounded-md text-sm ${
                message.includes("Success")
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {message}
            </div>
          )}
        </CardContent>

        <CardFooter className='flex flex-col gap-4 pt-0'>
          <div className='relative w-full'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-200'></div>
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='px-2 bg-white text-gray-500'>
                Or continue with
              </span>
            </div>
          </div>

          <Button
            variant='outline'
            onClick={handleOAuth}
            className='w-full h-10'
            disabled={loading}
          >
            <svg className='mr-2 h-4 w-4' viewBox='0 0 24 24'>
              <path
                d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                fill='#4285F4'
              />
              <path
                d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                fill='#34A853'
              />
              <path
                d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                fill='#FBBC05'
              />
              <path
                d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                fill='#EA4335'
              />
            </svg>
            Google
          </Button>

          <div className='text-sm text-center text-gray-500 mt-2'>
            {isSignUp ? "Already have an account?" : "Need an account?"}{" "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className='text-blue-600 hover:underline font-medium'
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
