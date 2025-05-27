import {
  Upload,
  FileText,
  Target,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export function HowItWorksSection() {
  const steps = [
    {
      icon: Upload,
      title: "Upload Your Resume",
      description:
        "Start by uploading your existing resume in PDF or Word format. Our AI instantly parses and analyzes your content.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: FileText,
      title: "Paste Job Description",
      description:
        "Copy and paste the job posting you're interested in. Our AI extracts key requirements and skills instantly.",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Target,
      title: "Get AI Analysis",
      description:
        "Receive a detailed match score, missing keywords, and specific suggestions to optimize your resume for the role.",
      color: "from-green-500 to-green-600",
    },
    {
      icon: CheckCircle,
      title: "Apply with Confidence",
      description:
        "Download your optimized resume and apply knowing you've maximized your chances of getting noticed by recruiters.",
      color: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <section id='how-it-works' className='py-20 bg-gray-50 dark:bg-gray-900'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section header */}
        <div className='text-center mb-16'>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6'>
            How ApplyBoost.ai Works
          </h2>
          <p className='text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
            Optimize your job search in minutes. Our AI helps you tailor and
            amplify your resume for each job, highlighting the skills that
            matter.
          </p>
        </div>

        {/* Steps grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className='relative'>
                <Card className='h-full bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2'>
                  <CardContent className='p-8 text-center'>
                    {/* Step number */}
                    <div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
                      <div className='w-8 h-8 bg-white dark:bg-gray-800 border-4 border-gray-200 dark:border-gray-600 rounded-full flex items-center justify-center text-sm font-bold text-gray-600 dark:text-gray-300'>
                        {index + 1}
                      </div>
                    </div>

                    {/* Icon */}
                    <div
                      className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
                    >
                      <IconComponent className='w-8 h-8 text-white' />
                    </div>

                    {/* Content */}
                    <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
                      {step.title}
                    </h3>
                    <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                      {step.description}
                    </p>
                  </CardContent>
                </Card>

                {/* Arrow connector (hidden on mobile and last item) */}
                {index < steps.length - 1 && (
                  <div className='hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10'>
                    <ArrowRight className='w-6 h-6 text-gray-400 dark:text-gray-500' />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className='text-center mt-16'>
          <p className='text-lg text-gray-600 dark:text-gray-300 mb-6'>
            Ready to boost your resume in under 5 minutes?
          </p>
          <Link href='/signup'>
            <div className='inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer'>
              <Upload className='w-5 h-5' />
              Start Optimizing Now
              <ArrowRight className='w-5 h-5' />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
