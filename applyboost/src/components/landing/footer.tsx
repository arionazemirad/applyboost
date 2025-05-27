import { Zap, Github, Twitter, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-gray-900 text-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid md:grid-cols-4 gap-8'>
          {/* Logo and description */}
          <div className='md:col-span-2'>
            <div className='flex items-center space-x-2 mb-4'>
              <div className='w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center'>
                <Zap className='w-5 h-5 text-white' />
              </div>
              <span className='text-xl font-bold'>ApplyBoost.ai</span>
            </div>
            <p className='text-gray-400 mb-6 max-w-md'>
              AI-powered resume optimization that helps job seekers land more
              interviews. Boost your career with smarter resumes that speak the
              language of every employer.
            </p>

            {/* Social links */}
            <div className='flex space-x-4'>
              <a
                href='https://twitter.com/applyboostai'
                className='w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors duration-300'
                aria-label='Twitter'
              >
                <Twitter className='w-5 h-5' />
              </a>
              <a
                href='https://linkedin.com/company/applyboostai'
                className='w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors duration-300'
                aria-label='LinkedIn'
              >
                <Linkedin className='w-5 h-5' />
              </a>
              <a
                href='https://github.com/applyboostai'
                className='w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors duration-300'
                aria-label='GitHub'
              >
                <Github className='w-5 h-5' />
              </a>
              <a
                href='mailto:hello@applyboost.ai'
                className='w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors duration-300'
                aria-label='Email'
              >
                <Mail className='w-5 h-5' />
              </a>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>Product</h3>
            <ul className='space-y-3 text-gray-400'>
              <li>
                <Link
                  href='#features'
                  className='hover:text-white transition-colors duration-300'
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href='#pricing'
                  className='hover:text-white transition-colors duration-300'
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href='/dashboard'
                  className='hover:text-white transition-colors duration-300'
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href='/templates'
                  className='hover:text-white transition-colors duration-300'
                >
                  Resume Templates
                </Link>
              </li>
              <li>
                <Link
                  href='/api-docs'
                  className='hover:text-white transition-colors duration-300'
                >
                  API Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>Company</h3>
            <ul className='space-y-3 text-gray-400'>
              <li>
                <Link
                  href='/about'
                  className='hover:text-white transition-colors duration-300'
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href='/blog'
                  className='hover:text-white transition-colors duration-300'
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href='/careers'
                  className='hover:text-white transition-colors duration-300'
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href='/contact'
                  className='hover:text-white transition-colors duration-300'
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href='/press'
                  className='hover:text-white transition-colors duration-300'
                >
                  Press Kit
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className='border-t border-gray-800 mt-12 pt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <div className='flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-gray-400 text-sm'>
              <p>&copy; {currentYear} ApplyBoost.ai. All rights reserved.</p>
              <div className='flex space-x-6'>
                <Link
                  href='/privacy'
                  className='hover:text-white transition-colors duration-300'
                >
                  Privacy Policy
                </Link>
                <Link
                  href='/terms'
                  className='hover:text-white transition-colors duration-300'
                >
                  Terms of Service
                </Link>
                <Link
                  href='/cookies'
                  className='hover:text-white transition-colors duration-300'
                >
                  Cookie Policy
                </Link>
              </div>
            </div>

            <div className='mt-4 md:mt-0'>
              <p className='text-gray-400 text-sm'>
                Made with ❤️ for job seekers everywhere
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
