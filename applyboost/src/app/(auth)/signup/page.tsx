"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  CheckCircle,
  AlertCircle,
  User,
} from "lucide-react";
import Link from "next/link";

// Define validation schema
const signUpSchema = z
  .object({
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password is too long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string().min(8, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
        router.replace("/dashboard");
      }
    };
    checkUser();
  }, [router]);

  const validateForm = () => {
    setErrors({});

    try {
      signUpSchema.parse({ email, password, confirmPassword });
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
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) {
        setMessage(error.message);
      } else {
        setMessage(
          "Success! Please check your email to verify your account before signing in."
        );
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
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
    }
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-purple-950/20 flex items-center justify-center p-4'>
      {/* Background elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse' />
        <div className='absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000' />
      </div>

      <div className='relative w-full max-w-md'>
        {/* Header */}
        <div className='text-center mb-8'>
          <Link href='/' className='inline-flex items-center space-x-2 mb-8'>
            <div className='w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center'>
              <Zap className='w-6 h-6 text-white' />
            </div>
            <span className='text-2xl font-bold text-gray-900 dark:text-white'>
              ApplyBoost.ai
            </span>
          </Link>

          <Badge className='mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 px-4 py-2'>
            <Sparkles className='w-4 h-4 mr-2' />
            Join the Community
          </Badge>

          <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>
            Create your account
          </h1>
          <p className='text-gray-600 dark:text-gray-300'>
            Start optimizing your resume and land your dream job
          </p>
        </div>

        {/* Sign Up Card */}
        <Card className='bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-0 shadow-2xl'>
          <CardContent className='p-8'>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEmailAuth();
              }}
              className='space-y-6'
            >
              {/* Email Field */}
              <div className='space-y-2'>
                <label
                  htmlFor='email'
                  className='text-sm font-medium text-gray-700 dark:text-gray-300'
                >
                  Email Address
                </label>
                <div className='relative'>
                  <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                  <Input
                    id='email'
                    type='email'
                    placeholder='you@example.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`pl-10 h-12 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 ${
                      errors.email
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                  />
                </div>
                {errors.email && (
                  <div className='flex items-center gap-2 text-red-600 text-sm'>
                    <AlertCircle className='w-4 h-4' />
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Password Field */}
              <div className='space-y-2'>
                <label
                  htmlFor='password'
                  className='text-sm font-medium text-gray-700 dark:text-gray-300'
                >
                  Password
                </label>
                <div className='relative'>
                  <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                  <Input
                    id='password'
                    type={showPassword ? "text" : "password"}
                    placeholder='••••••••'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`pl-10 pr-10 h-12 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 ${
                      errors.password
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
                  >
                    {showPassword ? (
                      <EyeOff className='w-5 h-5' />
                    ) : (
                      <Eye className='w-5 h-5' />
                    )}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {password && (
                  <div className='space-y-2'>
                    <div className='flex gap-1'>
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded-full transition-colors ${
                            passwordStrength >= level
                              ? passwordStrength <= 2
                                ? "bg-red-500"
                                : passwordStrength <= 3
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                              : "bg-gray-200 dark:bg-gray-700"
                          }`}
                        />
                      ))}
                    </div>
                    <p className='text-xs text-gray-500 dark:text-gray-400'>
                      {passwordStrength <= 2 && "Weak password"}
                      {passwordStrength === 3 && "Medium password"}
                      {passwordStrength >= 4 && "Strong password"}
                    </p>
                  </div>
                )}

                {errors.password && (
                  <div className='flex items-center gap-2 text-red-600 text-sm'>
                    <AlertCircle className='w-4 h-4' />
                    {errors.password}
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className='space-y-2'>
                <label
                  htmlFor='confirmPassword'
                  className='text-sm font-medium text-gray-700 dark:text-gray-300'
                >
                  Confirm Password
                </label>
                <div className='relative'>
                  <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                  <Input
                    id='confirmPassword'
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder='••••••••'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`pl-10 pr-10 h-12 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 ${
                      errors.confirmPassword
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                  />
                  <button
                    type='button'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
                  >
                    {showConfirmPassword ? (
                      <EyeOff className='w-5 h-5' />
                    ) : (
                      <Eye className='w-5 h-5' />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <div className='flex items-center gap-2 text-red-600 text-sm'>
                    <AlertCircle className='w-4 h-4' />
                    {errors.confirmPassword}
                  </div>
                )}
              </div>

              {/* Terms and Privacy */}
              <div className='text-sm text-gray-600 dark:text-gray-300'>
                By creating an account, you agree to our{" "}
                <Link
                  href='/terms'
                  className='text-blue-600 hover:text-blue-700 font-medium'
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href='/privacy'
                  className='text-blue-600 hover:text-blue-700 font-medium'
                >
                  Privacy Policy
                </Link>
                .
              </div>

              {/* Sign Up Button */}
              <Button
                type='submit'
                disabled={loading}
                className='w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105'
              >
                {loading ? (
                  <div className='flex items-center gap-2'>
                    <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                    Creating account...
                  </div>
                ) : (
                  <div className='flex items-center gap-2'>
                    <User className='w-5 h-5' />
                    Create Account
                    <ArrowRight className='w-5 h-5' />
                  </div>
                )}
              </Button>

              {/* Message */}
              {message && (
                <div
                  className={`p-4 rounded-lg text-sm flex items-center gap-2 ${
                    message.includes("Success") ||
                    message.includes("check your email")
                      ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800"
                      : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800"
                  }`}
                >
                  {message.includes("Success") ||
                  message.includes("check your email") ? (
                    <CheckCircle className='w-4 h-4' />
                  ) : (
                    <AlertCircle className='w-4 h-4' />
                  )}
                  {message}
                </div>
              )}
            </form>

            {/* Divider */}
            <div className='relative my-8'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-gray-200 dark:border-gray-700'></div>
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='px-4 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400'>
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Sign Up */}
            <Button
              type='button'
              variant='outline'
              onClick={handleOAuth}
              disabled={loading}
              className='w-full h-12 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300'
            >
              <svg className='mr-3 h-5 w-5' viewBox='0 0 24 24'>
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
              Continue with Google
            </Button>
          </CardContent>
        </Card>

        {/* Sign In Link */}
        <div className='text-center mt-8'>
          <p className='text-gray-600 dark:text-gray-300'>
            Already have an account?{" "}
            <Link
              href='/signin'
              className='text-blue-600 hover:text-blue-700 font-semibold hover:underline'
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Trust indicators */}
        <div className='mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400'>
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse' />
            <span>Secure & encrypted</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 bg-blue-500 rounded-full animate-pulse' />
            <span>GDPR compliant</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 bg-purple-500 rounded-full animate-pulse' />
            <span>Privacy protected</span>
          </div>
        </div>
      </div>
    </div>
  );
}
