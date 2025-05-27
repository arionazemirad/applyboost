"use client";

import { useState } from "react";
import { ResumeUpload } from "./resume-upload";
import { UploadJobPosting } from "./upload-job-posting";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Target,
  TrendingUp,
  FileText,
  ArrowRight,
  CheckCircle,
  Clock,
  Zap,
  Download,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

interface UploadedResume {
  id: string;
  filename: string;
  fileUrl: string;
  uploadedAt: string;
  contentPreview: string;
}

interface UploadedJobPost {
  id: string;
  title: string;
  company?: string;
  keywords: string[];
  keywordCategories: Record<string, string[]>;
  createdAt: string;
  contentPreview: string;
}

interface OptimizationResult {
  optimizationId: string;
  scoreBefore: number;
  scoreAfter: number;
  improvement: number;
  addedKeywords: string[];
  optimizedText: string;
  suggestions: string[];
  createdAt: string;
}

export function FirstTimeDashboard() {
  const [uploadedResume, setUploadedResume] = useState<UploadedResume | null>(
    null
  );
  const [uploadedJobPost, setUploadedJobPost] =
    useState<UploadedJobPost | null>(null);
  const [optimizationResult, setOptimizationResult] =
    useState<OptimizationResult | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleResumeUpload = (resume: UploadedResume) => {
    setUploadedResume(resume);
    setCurrentStep(2);
  };

  const handleJobPostUpload = (jobPost: UploadedJobPost) => {
    setUploadedJobPost(jobPost);
    setCurrentStep(3);
  };

  const handleOptimizeResume = async () => {
    if (!uploadedResume || !uploadedJobPost) return;

    setIsOptimizing(true);
    setError(null);

    try {
      // Get the current user session
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error("Please sign in to optimize resume");
      }

      // Call optimization API
      const response = await fetch("/api/optimize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          resumeId: uploadedResume.id,
          jobPostId: uploadedJobPost.id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Optimization failed");
      }

      const result = await response.json();

      if (result.success) {
        setOptimizationResult(result.data);
        setCurrentStep(4);
      } else {
        throw new Error(result.error || "Optimization failed");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Optimization failed";
      setError(errorMessage);
    } finally {
      setIsOptimizing(false);
    }
  };

  const steps = [
    {
      number: 1,
      title: "Upload Your Resume",
      description: "Start by uploading your current resume",
      icon: FileText,
      completed: !!uploadedResume,
    },
    {
      number: 2,
      title: "Add Job Description",
      description: "Paste a job posting you're interested in",
      icon: Target,
      completed: !!uploadedJobPost,
    },
    {
      number: 3,
      title: "Get AI Analysis",
      description: "Receive optimization suggestions",
      icon: Sparkles,
      completed: !!optimizationResult,
    },
    {
      number: 4,
      title: "Download Optimized Resume",
      description: "Get your improved resume",
      icon: TrendingUp,
      completed: !!optimizationResult,
    },
  ];

  return (
    <div className='space-y-8'>
      {/* Welcome Header */}
      <div className='text-center space-y-4'>
        <div className='inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full'>
          <Sparkles className='w-5 h-5' />
          <span className='font-semibold'>Welcome to ApplyBoost.ai!</span>
        </div>
        <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
          Let's optimize your resume in 4 simple steps
        </h1>
        <p className='text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
          Our AI will analyze your resume against job requirements and suggest
          improvements to increase your interview chances.
        </p>
      </div>

      {/* Progress Steps */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center space-x-2'>
            <Clock className='h-5 w-5' />
            <span>Your Progress</span>
          </CardTitle>
          <CardDescription>
            Follow these steps to optimize your resume
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = step.completed;

              return (
                <div
                  key={step.number}
                  className={`relative p-4 rounded-lg border-2 transition-all ${
                    isCompleted
                      ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                      : isActive
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  {/* Step Number/Check */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mb-3 ${
                      isCompleted
                        ? "bg-green-500 text-white"
                        : isActive
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className='w-5 h-5' />
                    ) : (
                      <span className='text-sm font-bold'>{step.number}</span>
                    )}
                  </div>

                  {/* Step Icon */}
                  <IconComponent
                    className={`w-6 h-6 mb-2 ${
                      isCompleted
                        ? "text-green-600"
                        : isActive
                          ? "text-blue-600"
                          : "text-gray-400"
                    }`}
                  />

                  {/* Step Content */}
                  <h3
                    className={`font-semibold text-sm mb-1 ${
                      isCompleted
                        ? "text-green-800 dark:text-green-200"
                        : isActive
                          ? "text-blue-800 dark:text-blue-200"
                          : "text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`text-xs ${
                      isCompleted
                        ? "text-green-600 dark:text-green-300"
                        : isActive
                          ? "text-blue-600 dark:text-blue-300"
                          : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {step.description}
                  </p>

                  {/* Connector Arrow */}
                  {index < steps.length - 1 && (
                    <div className='hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2'>
                      <ArrowRight className='w-4 h-4 text-gray-400' />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Step 1: Resume Upload */}
        <div
          className={`transition-all ${currentStep === 1 ? "ring-2 ring-blue-500 ring-opacity-50" : ""}`}
        >
          <ResumeUpload
            onUploadSuccess={handleResumeUpload}
            onUploadError={(error) => console.error("Upload error:", error)}
          />
        </div>

        {/* Step 2: Job Posting */}
        <div
          className={`transition-all ${
            currentStep === 2 ? "ring-2 ring-blue-500 ring-opacity-50" : ""
          } ${!uploadedResume ? "opacity-50 pointer-events-none" : ""}`}
        >
          <UploadJobPosting
            onUploadSuccess={handleJobPostUpload}
            onUploadError={(error) => console.error("Job post error:", error)}
          />
        </div>
      </div>

      {/* Step 3: Optimization */}
      {uploadedResume && uploadedJobPost && !optimizationResult && (
        <Card
          className={`transition-all ${currentStep === 3 ? "ring-2 ring-blue-500 ring-opacity-50" : ""}`}
        >
          <CardHeader>
            <CardTitle className='flex items-center space-x-2'>
              <Sparkles className='h-5 w-5' />
              <span>AI Optimization</span>
            </CardTitle>
            <CardDescription>
              Ready to optimize your resume for this job posting
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <h4 className='font-medium'>Resume</h4>
                <p className='text-sm text-muted-foreground'>
                  {uploadedResume.filename}
                </p>
              </div>
              <div className='space-y-2'>
                <h4 className='font-medium'>Job Posting</h4>
                <p className='text-sm text-muted-foreground'>
                  {uploadedJobPost.title}
                </p>
                <div className='flex flex-wrap gap-1'>
                  {uploadedJobPost.keywords
                    .slice(0, 5)
                    .map((keyword, index) => (
                      <Badge key={index} variant='outline' className='text-xs'>
                        {keyword}
                      </Badge>
                    ))}
                  {uploadedJobPost.keywords.length > 5 && (
                    <Badge variant='outline' className='text-xs'>
                      +{uploadedJobPost.keywords.length - 5} more
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {error && (
              <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
                <p className='text-sm text-red-700'>{error}</p>
              </div>
            )}

            <Button
              onClick={handleOptimizeResume}
              disabled={isOptimizing}
              className='w-full'
              size='lg'
            >
              {isOptimizing ? (
                <>
                  <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2' />
                  Optimizing Resume...
                </>
              ) : (
                <>
                  <Zap className='h-5 w-5 mr-2' />
                  Optimize My Resume
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Results */}
      {optimizationResult && (
        <Card
          className={`transition-all ${currentStep === 4 ? "ring-2 ring-green-500 ring-opacity-50" : ""}`}
        >
          <CardHeader>
            <CardTitle className='flex items-center space-x-2'>
              <TrendingUp className='h-5 w-5' />
              <span>Optimization Results</span>
            </CardTitle>
            <CardDescription>
              Your resume has been optimized for better ATS compatibility
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            {/* Score Improvement */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div className='text-center p-4 bg-red-50 rounded-lg'>
                <div className='text-2xl font-bold text-red-600'>
                  {optimizationResult.scoreBefore}%
                </div>
                <div className='text-sm text-red-700'>Before</div>
              </div>
              <div className='flex items-center justify-center'>
                <ArrowRight className='h-8 w-8 text-gray-400' />
              </div>
              <div className='text-center p-4 bg-green-50 rounded-lg'>
                <div className='text-2xl font-bold text-green-600'>
                  {optimizationResult.scoreAfter}%
                </div>
                <div className='text-sm text-green-700'>After</div>
              </div>
            </div>

            {/* Improvement Summary */}
            <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
              <h4 className='font-medium text-blue-800 mb-2'>
                🎉 Improvement: +{optimizationResult.improvement}%
              </h4>
              <p className='text-sm text-blue-700'>
                Added {optimizationResult.addedKeywords.length} relevant
                keywords to improve ATS compatibility
              </p>
            </div>

            {/* Added Keywords */}
            <div className='space-y-3'>
              <h4 className='font-medium'>Added Keywords</h4>
              <div className='flex flex-wrap gap-2'>
                {optimizationResult.addedKeywords.map((keyword, index) => (
                  <Badge key={index} className='bg-green-100 text-green-800'>
                    + {keyword}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Suggestions */}
            {optimizationResult.suggestions.length > 0 && (
              <div className='space-y-3'>
                <h4 className='font-medium'>AI Suggestions</h4>
                <ul className='space-y-2'>
                  {optimizationResult.suggestions.map((suggestion, index) => (
                    <li key={index} className='flex items-start space-x-2'>
                      <CheckCircle className='h-4 w-4 text-green-600 mt-0.5 flex-shrink-0' />
                      <span className='text-sm text-gray-700'>
                        {suggestion}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Download Button */}
            <div className='flex space-x-3'>
              <Button className='flex-1'>
                <Download className='h-4 w-4 mr-2' />
                Download Optimized Resume
              </Button>
              <Button variant='outline' className='flex-1'>
                <FileText className='h-4 w-4 mr-2' />
                View Full Analysis
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State Cards */}
      {!uploadedResume && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {/* Match Score Preview */}
          <Card className='opacity-50'>
            <CardHeader>
              <CardTitle className='flex items-center space-x-2'>
                <TrendingUp className='h-5 w-5' />
                <span>Match Score</span>
              </CardTitle>
              <CardDescription>
                See how well your resume matches job requirements
              </CardDescription>
            </CardHeader>
            <CardContent className='text-center'>
              <div className='text-6xl font-bold text-gray-300 mb-2'>--</div>
              <p className='text-sm text-gray-500'>
                Upload resume to see score
              </p>
            </CardContent>
          </Card>

          {/* Keywords Preview */}
          <Card className='opacity-50'>
            <CardHeader>
              <CardTitle className='flex items-center space-x-2'>
                <Zap className='h-5 w-5' />
                <span>Keywords</span>
              </CardTitle>
              <CardDescription>
                Missing keywords will be highlighted
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-2'>
                {["React", "TypeScript", "Node.js", "AWS"].map((keyword) => (
                  <Badge key={keyword} variant='outline' className='opacity-50'>
                    {keyword}
                  </Badge>
                ))}
              </div>
              <p className='text-sm text-gray-500 mt-3'>
                Upload resume to see suggestions
              </p>
            </CardContent>
          </Card>

          {/* Applications Preview */}
          <Card className='opacity-50'>
            <CardHeader>
              <CardTitle className='flex items-center space-x-2'>
                <FileText className='h-5 w-5' />
                <span>Applications</span>
              </CardTitle>
              <CardDescription>Track your job applications</CardDescription>
            </CardHeader>
            <CardContent className='text-center'>
              <div className='text-6xl font-bold text-gray-300 mb-2'>0</div>
              <p className='text-sm text-gray-500'>No applications yet</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Help Section */}
      <Card className='bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800'>
        <CardContent className='p-6'>
          <div className='flex items-start space-x-4'>
            <div className='w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0'>
              <Sparkles className='w-6 h-6 text-white' />
            </div>
            <div className='space-y-2'>
              <h3 className='text-lg font-semibold text-blue-900 dark:text-blue-100'>
                How ApplyBoost.ai Works
              </h3>
              <p className='text-blue-700 dark:text-blue-200'>
                Our AI analyzes your resume against job descriptions, identifies
                missing keywords, and suggests improvements to increase your ATS
                compatibility and interview chances.
              </p>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
                <div className='flex items-center space-x-2'>
                  <CheckCircle className='w-5 h-5 text-green-600' />
                  <span className='text-sm text-blue-700 dark:text-blue-200'>
                    ATS Optimization
                  </span>
                </div>
                <div className='flex items-center space-x-2'>
                  <CheckCircle className='w-5 h-5 text-green-600' />
                  <span className='text-sm text-blue-700 dark:text-blue-200'>
                    Keyword Enhancement
                  </span>
                </div>
                <div className='flex items-center space-x-2'>
                  <CheckCircle className='w-5 h-5 text-green-600' />
                  <span className='text-sm text-blue-700 dark:text-blue-200'>
                    Match Score Analysis
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
