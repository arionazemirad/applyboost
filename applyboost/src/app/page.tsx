import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import Link from "next/link";
import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { ValuePropositionSection } from "@/components/landing/value-proposition-section";
import dynamic from "next/dynamic";

const CTASection = dynamic(() => import("@/components/landing/cta-section"), { ssr: false });
const Footer = dynamic(() => import("@/components/landing/footer"), { ssr: false });

const AIPreviewSection = dynamic(() => import("@/components/landing/ai-preview-section"), { ssr: false });
const TestimonialsSection = dynamic(() => import("@/components/landing/testimonials-section"), { ssr: false });
const FAQSection = dynamic(() => import("@/components/landing/faq-section"), { ssr: false });

export default function LandingPage() {
  return (
    <div className='min-h-screen bg-white dark:bg-gray-950'>
      {/* Navigation */}
      <nav className='fixed top-0 w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 z-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            <div className='flex items-center space-x-2'>
              <div className='w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center'>
                <Zap className='w-5 h-5 text-white' />
              </div>
              <span className='text-xl font-bold text-gray-900 dark:text-white'>
                ApplyBoost.ai
              </span>
            </div>
            <div className='hidden md:flex items-center space-x-8'>
              <Link
                href='#features'
                className='text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors'
              >
                Features
              </Link>
              <Link
                href='#faq'
                className='text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors'
              >
                FAQ
              </Link>
              <Link href='/signin'>
                <Button variant='outline' size='sm'>
                  Sign In
                </Button>
              </Link>
              <Link href='/signup'>
                <Button
                  size='sm'
                  className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Value Proposition Section */}
      <ValuePropositionSection />

      {/* AI Preview Section */}
      <AIPreviewSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Final CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
