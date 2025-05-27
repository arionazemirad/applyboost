"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { FirstTimeDashboard } from "@/components/dashboard/first-time-dashboard";
import { UploadJobPosting } from "@/components/dashboard/upload-job-posting";
import { ResumeMatchAnalyzer } from "@/components/dashboard/resume-match-analyzer";
import { KeywordEnhancementPreview } from "@/components/dashboard/keyword-enhancement-preview";
import { ApplicationsTracker } from "@/components/dashboard/applications-tracker";
import { OptimizationHistory } from "@/components/dashboard/optimization-history";
import { SmartSuggestionsPanel } from "@/components/dashboard/smart-suggestions-panel";
import { ResumeTemplateSelector } from "@/components/dashboard/resume-template-selector";
import { CoverLetterGenerator } from "@/components/dashboard/cover-letter-generator";
import { supabase } from "@/lib/supabase";

interface Resume {
  id: string;
  filename: string;
  fileUrl: string;
  uploadedAt: string;
  optimized: boolean;
  scoreBefore?: number;
  scoreAfter?: number;
}

export default function DashboardPage() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          // Redirect to sign-in page if not authenticated
          router.replace("/signin");
          return;
        }

        const response = await fetch("/api/resume/upload", {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch resumes");
        }

        const result = await response.json();

        if (result.success) {
          setResumes(result.data || []);
        } else {
          throw new Error(result.error || "Failed to fetch resumes");
        }
      } catch (err) {
        console.error("Error fetching resumes:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load dashboard"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchResumes();
  }, [router]);

  // Show loading state
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className='flex items-center justify-center min-h-[400px]'>
          <div className='text-center space-y-4'>
            <div className='w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto'></div>
            <p className='text-gray-600 dark:text-gray-300'>
              Loading your dashboard...
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Show error state
  if (error) {
    return (
      <DashboardLayout>
        <div className='flex items-center justify-center min-h-[400px]'>
          <div className='text-center space-y-4'>
            <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto'>
              <svg
                className='w-8 h-8 text-red-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
              Something went wrong
            </h3>
            <p className='text-gray-600 dark:text-gray-300'>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
            >
              Try Again
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Show first-time user experience if no resumes
  const isFirstTimeUser = resumes.length === 0;

  return (
    <DashboardLayout>
      {isFirstTimeUser ? (
        <FirstTimeDashboard />
      ) : (
        <div className='space-y-8'>
          {/* Main Analysis Section */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            <UploadJobPosting />
            <ResumeMatchAnalyzer />
          </div>

          {/* Keyword Enhancement */}
          <KeywordEnhancementPreview />

          {/* Smart Suggestions Panel */}
          <SmartSuggestionsPanel />

          {/* Applications Tracker */}
          <ApplicationsTracker />

          {/* Bottom Section */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            <OptimizationHistory />
            <div className='space-y-6'>
              <ResumeTemplateSelector />
              <CoverLetterGenerator />
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
