import { TrendingUp, Clock, Shield, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function ValuePropositionSection() {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Increase Resume Match Rate",
      description:
        "Boost your ATS compatibility and keyword matching by up to 40% with AI-powered optimization.",
      color: "from-green-500 to-emerald-600",
      stat: "+40%",
    },
    {
      icon: Clock,
      title: "Save Time with Smart Automation",
      description:
        "Optimize your resume in minutes, not hours. Focus on applying to more jobs instead of manual tweaking.",
      color: "from-blue-500 to-cyan-600",
      stat: "5 min",
    },
    {
      icon: Shield,
      title: "ATS-Friendly & HR-Approved",
      description:
        "Ensure your resume passes through Applicant Tracking Systems and reaches human recruiters.",
      color: "from-purple-500 to-violet-600",
      stat: "99%",
    },
    {
      icon: Target,
      title: "Track Every Application",
      description:
        "Organize your job search with built-in application tracking and follow-up reminders.",
      color: "from-orange-500 to-red-600",
      stat: "∞",
    },
  ];

  return (
    <section id='features' className='py-20 bg-white dark:bg-gray-950'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section header */}
        <div className='text-center mb-16'>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6'>
            Why Choose ApplyBoost.ai?
          </h2>
          <p className='text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
            Join thousands of job seekers who&apos;ve already boosted their
            interview rates with our AI-powered resume optimization platform.
          </p>
        </div>

        {/* Benefits grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <Card
                key={index}
                className='relative bg-white dark:bg-gray-900 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 group overflow-hidden'
              >
                {/* Gradient background overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                <CardContent className='p-8 text-center relative z-10'>
                  {/* Stat badge */}
                  <div className='absolute -top-3 -right-3'>
                    <div
                      className={`px-3 py-1 bg-gradient-to-r ${benefit.color} text-white text-sm font-bold rounded-full shadow-lg`}
                    >
                      {benefit.stat}
                    </div>
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className='w-8 h-8 text-white' />
                  </div>

                  {/* Content */}
                  <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300'>
                    {benefit.title}
                  </h3>
                  <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                    {benefit.description}
                  </p>

                  {/* Hover effect line */}
                  <div
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${benefit.color} w-0 group-hover:w-full transition-all duration-500`}
                  />
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats section */}
        <div className='mt-20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 lg:p-12'>
          <div className='grid md:grid-cols-3 gap-8 text-center'>
            <div>
              <div className='text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2'>
                10,000+
              </div>
              <p className='text-gray-600 dark:text-gray-300 font-medium'>
                Resumes Optimized
              </p>
            </div>
            <div>
              <div className='text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2'>
                85%
              </div>
              <p className='text-gray-600 dark:text-gray-300 font-medium'>
                Interview Rate Increase
              </p>
            </div>
            <div>
              <div className='text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2'>
                4.9/5
              </div>
              <p className='text-gray-600 dark:text-gray-300 font-medium'>
                User Satisfaction
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
