"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Upload, Sparkles, CheckCircle } from "lucide-react";
import Link from "next/link";

export function CTASection() {
  return (
    <section className='py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 relative overflow-hidden'>
      {/* Background elements */}
      <div className='absolute inset-0 bg-gradient-to-br from-blue-600/90 to-purple-600/90' />
      <div className='absolute inset-0'>
        <div className='absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2' />
        <div className='absolute bottom-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2' />
      </div>

      <div className='relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
        {/* Badge */}
        <div className='inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-8'>
          <Sparkles className='w-4 h-4' />
          Start your job search with an unfair advantage
        </div>

        {/* Headline */}
        <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight'>
          Ready to Land Your Dream Job?
        </h2>

        {/* Subtext */}
        <p className='text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed'>
          Join thousands of job seekers who've already boosted their interview
          rates with AI-powered resume optimization. Your next career
          breakthrough is just one click away.
        </p>

        {/* Benefits list */}
        <div className='flex flex-col sm:flex-row justify-center gap-6 mb-12 text-blue-100'>
          <div className='flex items-center gap-2'>
            <CheckCircle className='w-5 h-5 text-green-300' />
            <span>Free to start</span>
          </div>
          <div className='flex items-center gap-2'>
            <CheckCircle className='w-5 h-5 text-green-300' />
            <span>Results in 5 minutes</span>
          </div>
          <div className='flex items-center gap-2'>
            <CheckCircle className='w-5 h-5 text-green-300' />
            <span>No credit card required</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center mb-12'>
          <Link href='/dashboard'>
            <Button
              size='lg'
              className='bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0'
            >
              <Upload className='w-5 h-5 mr-2' />
              Upload Resume to Get Started
              <ArrowRight className='w-5 h-5 ml-2' />
            </Button>
          </Link>

          <Button
            variant='outline'
            size='lg'
            className='border-2 border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold backdrop-blur-sm transition-all duration-300'
            onClick={() =>
              document
                .getElementById("how-it-works")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Learn More
          </Button>
        </div>

        {/* Trust indicators */}
        <div className='flex flex-col sm:flex-row items-center justify-center gap-8 text-blue-100 text-sm'>
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 bg-green-300 rounded-full animate-pulse' />
            <span>50,000+ resumes optimized</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 bg-yellow-300 rounded-full animate-pulse' />
            <span>4.9/5 user rating</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 bg-purple-300 rounded-full animate-pulse' />
            <span>85% interview rate increase</span>
          </div>
        </div>
      </div>
    </section>
  );
}
