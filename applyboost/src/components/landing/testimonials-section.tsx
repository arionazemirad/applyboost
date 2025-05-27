import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer",
      company: "Google",
      image: "/api/placeholder/64/64",
      content:
        "ApplyBoost.ai helped me land my dream job at Google! The AI suggestions were spot-on and increased my interview rate by 300%. I went from 2 interviews to 8 in just one month.",
      rating: 5,
      improvement: "+300% interviews",
    },
    {
      name: "Marcus Rodriguez",
      role: "Product Manager",
      company: "Microsoft",
      image: "/api/placeholder/64/64",
      content:
        "The keyword optimization is incredible. I was missing so many important terms that ATS systems look for. Now my resume gets past the initial screening every time.",
      rating: 5,
      improvement: "100% ATS pass rate",
    },
    {
      name: "Emily Johnson",
      role: "UX Designer",
      company: "Airbnb",
      image: "/api/placeholder/64/64",
      content:
        "As a designer, I was skeptical about AI writing tools. But ApplyBoost.ai enhanced my resume while keeping my authentic voice. The results speak for themselves - 5 job offers in 3 weeks!",
      rating: 5,
      improvement: "5 offers in 3 weeks",
    },
  ];

  const companies = [
    { name: "Google", logo: "🔍" },
    { name: "Microsoft", logo: "🪟" },
    { name: "Apple", logo: "🍎" },
    { name: "Amazon", logo: "📦" },
    { name: "Meta", logo: "👥" },
    { name: "Netflix", logo: "🎬" },
  ];

  return (
    <section className='py-20 bg-white dark:bg-gray-950'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section header */}
        <div className='text-center mb-16'>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6'>
            Trusted by Job Seekers Worldwide
          </h2>
          <p className='text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
            Join thousands of professionals who've already boosted their careers
            with ApplyBoost.ai
          </p>
        </div>

        {/* Testimonials grid */}
        <div className='grid md:grid-cols-3 gap-8 mb-16'>
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className='bg-white dark:bg-gray-900 border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2'
            >
              <CardContent className='p-8'>
                {/* Quote icon */}
                <Quote className='w-8 h-8 text-blue-600 mb-4' />

                {/* Rating */}
                <div className='flex items-center mb-4'>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className='w-5 h-5 text-yellow-400 fill-current'
                    />
                  ))}
                </div>

                {/* Content */}
                <p className='text-gray-600 dark:text-gray-300 mb-6 leading-relaxed'>
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-3'>
                    <div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold'>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className='font-semibold text-gray-900 dark:text-white'>
                        {testimonial.name}
                      </div>
                      <div className='text-sm text-gray-500 dark:text-gray-400'>
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </div>

                  <Badge className='bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'>
                    {testimonial.improvement}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Company logos */}
        <div className='text-center'>
          <p className='text-sm text-gray-500 dark:text-gray-400 mb-8 uppercase tracking-wide font-medium'>
            Trusted by applicants hired at
          </p>

          <div className='flex flex-wrap justify-center items-center gap-8 lg:gap-12 opacity-60 hover:opacity-100 transition-opacity duration-300'>
            {companies.map((company, index) => (
              <div
                key={index}
                className='flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300'
              >
                <span className='text-2xl'>{company.logo}</span>
                <span className='font-semibold text-lg'>{company.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats section */}
        <div className='mt-20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 lg:p-12'>
          <div className='grid md:grid-cols-4 gap-8 text-center'>
            <div>
              <div className='text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2'>
                50,000+
              </div>
              <p className='text-gray-600 dark:text-gray-300 font-medium'>
                Happy Users
              </p>
            </div>
            <div>
              <div className='text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2'>
                2.5M+
              </div>
              <p className='text-gray-600 dark:text-gray-300 font-medium'>
                Resumes Optimized
              </p>
            </div>
            <div>
              <div className='text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2'>
                89%
              </div>
              <p className='text-gray-600 dark:text-gray-300 font-medium'>
                Success Rate
              </p>
            </div>
            <div>
              <div className='text-3xl lg:text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2'>
                4.9★
              </div>
              <p className='text-gray-600 dark:text-gray-300 font-medium'>
                Average Rating
              </p>
            </div>
          </div>
        </div>

        {/* Social proof badges */}
        <div className='mt-16 flex flex-wrap justify-center gap-6'>
          <Badge className='bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-4 py-2'>
            🏆 #1 Resume Tool 2024
          </Badge>
          <Badge className='bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-4 py-2'>
            ✅ Featured on Product Hunt
          </Badge>
          <Badge className='bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 px-4 py-2'>
            🚀 Trending on IndieHackers
          </Badge>
          <Badge className='bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 px-4 py-2'>
            📰 Featured in TechCrunch
          </Badge>
        </div>
      </div>
    </section>
  );
}
