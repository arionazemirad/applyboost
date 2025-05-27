import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Sparkles, CheckCircle } from "lucide-react";

export function AIPreviewSection() {
  const beforeKeywords = ["JavaScript", "HTML", "CSS", "React"];
  const afterKeywords = [
    "JavaScript",
    "HTML",
    "CSS",
    "React",
    "TypeScript",
    "Node.js",
    "AWS",
    "Docker",
    "Kubernetes",
    "CI/CD",
  ];
  const addedKeywords = [
    "TypeScript",
    "Node.js",
    "AWS",
    "Docker",
    "Kubernetes",
    "CI/CD",
  ];

  return (
    <section className='py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section header */}
        <div className='text-center mb-16'>
          <Badge className='mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 px-4 py-2'>
            <Sparkles className='w-4 h-4 mr-2' />
            AI-Powered Keyword Matching
          </Badge>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6'>
            See the Magic in Action
          </h2>
          <p className='text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
            Instantly identify and add missing keywords from the job
            description. ApplyBoost.ai ensures your resume speaks the language
            of every employer and clears application tracking systems.
          </p>
        </div>

        {/* Before/After comparison */}
        <div className='grid lg:grid-cols-3 gap-8 items-center'>
          {/* Before */}
          <Card className='bg-white dark:bg-gray-900 border border-red-200 dark:border-red-800 shadow-lg'>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between mb-4'>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                  Before Optimization
                </h3>
                <Badge
                  variant='destructive'
                  className='bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                >
                  68% Match
                </Badge>
              </div>

              <div className='space-y-4'>
                <div>
                  <h4 className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                    Skills Section
                  </h4>
                  <div className='flex flex-wrap gap-2'>
                    {beforeKeywords.map((keyword) => (
                      <Badge
                        key={keyword}
                        variant='secondary'
                        className='bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                      >
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className='bg-red-50 dark:bg-red-900/20 p-3 rounded-lg'>
                  <p className='text-sm text-red-700 dark:text-red-300'>
                    ⚠️ Missing 6 key requirements from job posting
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Arrow and transformation indicator */}
          <div className='flex flex-col items-center justify-center space-y-4'>
            <div className='hidden lg:block'>
              <ArrowRight className='w-8 h-8 text-gray-400 dark:text-gray-500' />
            </div>
            <div className='lg:hidden'>
              <div className='w-px h-8 bg-gray-300 dark:bg-gray-600' />
            </div>

            <div className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg animate-pulse'>
              AI Enhancement
            </div>

            <div className='hidden lg:block'>
              <ArrowRight className='w-8 h-8 text-gray-400 dark:text-gray-500' />
            </div>
            <div className='lg:hidden'>
              <div className='w-px h-8 bg-gray-300 dark:bg-gray-600' />
            </div>
          </div>

          {/* After */}
          <Card className='bg-white dark:bg-gray-900 border border-green-200 dark:border-green-800 shadow-lg'>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between mb-4'>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                  After Optimization
                </h3>
                <Badge className='bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'>
                  92% Match
                </Badge>
              </div>

              <div className='space-y-4'>
                <div>
                  <h4 className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                    Enhanced Skills Section
                  </h4>
                  <div className='flex flex-wrap gap-2'>
                    {beforeKeywords.map((keyword) => (
                      <Badge
                        key={keyword}
                        variant='secondary'
                        className='bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                      >
                        {keyword}
                      </Badge>
                    ))}
                    {addedKeywords.map((keyword) => (
                      <Badge
                        key={keyword}
                        className='bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 animate-pulse'
                      >
                        + {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className='bg-green-50 dark:bg-green-900/20 p-3 rounded-lg'>
                  <p className='text-sm text-green-700 dark:text-green-300 flex items-center'>
                    <CheckCircle className='w-4 h-4 mr-2' />
                    All job requirements matched!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Improvement metrics */}
        <div className='mt-16 bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 lg:p-12'>
          <div className='grid md:grid-cols-3 gap-8 text-center'>
            <div className='space-y-2'>
              <div className='text-3xl lg:text-4xl font-bold text-green-600'>
                +24%
              </div>
              <p className='text-gray-600 dark:text-gray-300'>
                Match Score Improvement
              </p>
            </div>
            <div className='space-y-2'>
              <div className='text-3xl lg:text-4xl font-bold text-blue-600'>
                +6
              </div>
              <p className='text-gray-600 dark:text-gray-300'>Keywords Added</p>
            </div>
            <div className='space-y-2'>
              <div className='text-3xl lg:text-4xl font-bold text-purple-600'>
                100%
              </div>
              <p className='text-gray-600 dark:text-gray-300'>ATS Compatible</p>
            </div>
          </div>
        </div>

        {/* AI features highlight */}
        <div className='mt-16 text-center'>
          <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-8'>
            AI-Enhanced. Human-Sounding.
          </h3>

          <div className='grid md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
            <div className='bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg'>
              <div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4'>
                <Sparkles className='w-6 h-6 text-white' />
              </div>
              <h4 className='font-semibold text-gray-900 dark:text-white mb-2'>
                Smart Keyword Injection
              </h4>
              <p className='text-sm text-gray-600 dark:text-gray-300'>
                Naturally integrates missing keywords without sounding robotic
              </p>
            </div>

            <div className='bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg'>
              <div className='w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4'>
                <CheckCircle className='w-6 h-6 text-white' />
              </div>
              <h4 className='font-semibold text-gray-900 dark:text-white mb-2'>
                ATS Optimization
              </h4>
              <p className='text-sm text-gray-600 dark:text-gray-300'>
                Ensures your resume passes through applicant tracking systems
              </p>
            </div>

            <div className='bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg'>
              <div className='w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4'>
                <ArrowRight className='w-6 h-6 text-white' />
              </div>
              <h4 className='font-semibold text-gray-900 dark:text-white mb-2'>
                Context-Aware
              </h4>
              <p className='text-sm text-gray-600 dark:text-gray-300'>
                Understands job context to suggest relevant improvements
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
