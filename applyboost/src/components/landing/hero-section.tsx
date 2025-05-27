"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, Upload, Sparkles } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  const scrollToDemo = () => {
    document
      .getElementById("how-it-works")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className='relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden'>
      {/* Background gradient */}
      <div className='absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-purple-950/20' />

      {/* Animated background elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse' />
        <div className='absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000' />
      </div>

      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          {/* Left column - Content */}
          <div className='text-center lg:text-left'>
            {/* Badge */}
            <Badge className='mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 px-4 py-2'>
              <Sparkles className='w-4 h-4 mr-2' />
              AI-Powered Resume Optimization
            </Badge>

            {/* Headline */}
            <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight'>
              Land More Interviews with{" "}
              <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                Smarter Resumes
              </span>
            </h1>

            {/* Subtext */}
            <p className='text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl'>
              ApplyBoost.ai analyzes your resume and matches it against job
              descriptions, optimizing your content and keywords to maximize
              your interview chances—instantly and intelligently.
            </p>

            {/* CTA Buttons */}
            <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>
              <Link href='/signup'>
                <Button
                  size='lg'
                  className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105'
                >
                  <Upload className='w-5 h-5 mr-2' />
                  Upload Your Resume
                  <ArrowRight className='w-5 h-5 ml-2' />
                </Button>
              </Link>

              <Button
                variant='outline'
                size='lg'
                onClick={scrollToDemo}
                className='px-8 py-6 text-lg font-semibold border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300'
              >
                <Play className='w-5 h-5 mr-2' />
                See How It Works
              </Button>
            </div>

            {/* Trust indicators */}
            <div className='mt-12 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-sm text-gray-500 dark:text-gray-400'>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse' />
                <span>Free to start</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 bg-blue-500 rounded-full animate-pulse' />
                <span>No credit card required</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 bg-purple-500 rounded-full animate-pulse' />
                <span>Privacy protected</span>
              </div>
            </div>
          </div>

          {/* Right column - App mockup */}
          <div className='relative'>
            {/* Main mockup container */}
            <div className='relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500'>
              {/* Browser header */}
              <div className='bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700'>
                <div className='flex items-center gap-2'>
                  <div className='w-3 h-3 bg-red-500 rounded-full' />
                  <div className='w-3 h-3 bg-yellow-500 rounded-full' />
                  <div className='w-3 h-3 bg-green-500 rounded-full' />
                  <div className='ml-4 bg-gray-200 dark:bg-gray-700 rounded px-3 py-1 text-xs text-gray-600 dark:text-gray-300'>
                    applyboost.ai/optimize
                  </div>
                </div>
              </div>

              {/* App content mockup */}
              <div className='p-6 space-y-4'>
                {/* Header */}
                <div className='flex items-center justify-between'>
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                    Resume Analysis
                  </h3>
                  <Badge className='bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'>
                    92% Match
                  </Badge>
                </div>

                {/* Progress bars */}
                <div className='space-y-3'>
                  <div>
                    <div className='flex justify-between text-sm mb-1'>
                      <span className='text-gray-600 dark:text-gray-300'>
                        Keywords Match
                      </span>
                      <span className='text-gray-900 dark:text-white font-medium'>
                        92%
                      </span>
                    </div>
                    <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2'>
                      <div className='bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full w-[92%] animate-pulse' />
                    </div>
                  </div>

                  <div>
                    <div className='flex justify-between text-sm mb-1'>
                      <span className='text-gray-600 dark:text-gray-300'>
                        Skills Alignment
                      </span>
                      <span className='text-gray-900 dark:text-white font-medium'>
                        88%
                      </span>
                    </div>
                    <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2'>
                      <div className='bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full w-[88%] animate-pulse delay-300' />
                    </div>
                  </div>

                  <div>
                    <div className='flex justify-between text-sm mb-1'>
                      <span className='text-gray-600 dark:text-gray-300'>
                        Experience Match
                      </span>
                      <span className='text-gray-900 dark:text-white font-medium'>
                        95%
                      </span>
                    </div>
                    <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2'>
                      <div className='bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full w-[95%] animate-pulse delay-500' />
                    </div>
                  </div>
                </div>

                {/* Suggested keywords */}
                <div className='mt-6'>
                  <h4 className='text-sm font-medium text-gray-900 dark:text-white mb-3'>
                    Suggested Keywords
                  </h4>
                  <div className='flex flex-wrap gap-2'>
                    {["React", "TypeScript", "Node.js", "AWS", "Docker"].map(
                      (keyword, index) => (
                        <Badge
                          key={keyword}
                          variant='secondary'
                          className='bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 animate-bounce'
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          + {keyword}
                        </Badge>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className='absolute -top-4 -right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg animate-bounce'>
              +17% Match!
            </div>

            <div className='absolute -bottom-4 -left-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg animate-bounce delay-1000'>
              ATS Optimized
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
