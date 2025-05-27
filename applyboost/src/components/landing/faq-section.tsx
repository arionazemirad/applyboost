"use client";

import { useState } from "react";
import {
  ChevronDown,
  Shield,
  Download,
  CreditCard,
  Sparkles,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      icon: Shield,
      question: "Will my resume stay private and secure?",
      answer:
        "Absolutely! We take privacy seriously. Your resume data is encrypted in transit and at rest. We never share your personal information with third parties, and you can delete your data at any time. Our servers are SOC 2 compliant and we follow industry best practices for data security.",
    },
    {
      icon: Sparkles,
      question: "How does AI improve my resume match score?",
      answer:
        "Our AI analyzes job descriptions to identify key requirements, skills, and keywords that ATS systems look for. It then compares your resume against these criteria and suggests specific improvements like adding missing keywords, enhancing skill descriptions, and optimizing formatting for better ATS compatibility.",
    },
    {
      icon: Download,
      question: "Can I export and download my optimized resume?",
      answer:
        "Yes! You can download your optimized resume in multiple formats including PDF, Word (.docx), and plain text. The formatting is preserved and optimized for ATS systems while maintaining professional appearance for human reviewers.",
    },
    {
      icon: CreditCard,
      question: "Do I need to pay to use ApplyBoost.ai?",
      answer:
        "We offer a generous free tier that includes 3 resume optimizations per month and basic keyword suggestions. Our Pro plan ($14/month) includes unlimited optimizations, advanced AI suggestions, application tracking, and priority support. No credit card required to start!",
    },
    {
      question: "How accurate is the match score?",
      answer:
        "Our match scores are based on industry-standard ATS algorithms and have been validated against real hiring data. While no tool can guarantee job success, our users report 85% higher interview rates after optimization. The score reflects keyword matching, skill alignment, and ATS compatibility.",
    },
    {
      question: "Can I use this for different industries?",
      answer:
        "Absolutely! Our AI is trained on job postings across all major industries including tech, healthcare, finance, marketing, education, and more. The system adapts its suggestions based on industry-specific keywords and requirements.",
    },
    {
      question: "How long does the optimization process take?",
      answer:
        "The AI analysis typically takes 30-60 seconds. You'll get instant feedback on your match score, missing keywords, and improvement suggestions. The entire optimization process can be completed in under 5 minutes.",
    },
    {
      question: "Does this work with ATS systems?",
      answer:
        "Yes! Our optimization specifically targets ATS (Applicant Tracking System) compatibility. We ensure proper formatting, keyword placement, and structure that major ATS platforms like Workday, Greenhouse, and Lever can parse correctly.",
    },
  ];

  return (
    <section id='faq' className='py-20 bg-gray-50 dark:bg-gray-900'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section header */}
        <div className='text-center mb-16'>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6'>
            Frequently Asked Questions
          </h2>
          <p className='text-xl text-gray-600 dark:text-gray-300'>
            Have more questions?{" "}
            <a
              href='mailto:support@applyboost.ai'
              className='text-blue-600 hover:text-blue-700 font-medium'
            >
              Contact us
            </a>
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className='space-y-4'>
          {faqs.map((faq, index) => {
            const IconComponent = faq.icon;
            const isOpen = openIndex === index;

            return (
              <Card
                key={index}
                className='bg-white dark:bg-gray-800 border-0 shadow-lg overflow-hidden'
              >
                <button
                  className='w-full text-left'
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <CardContent className='p-6'>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center space-x-4'>
                        {IconComponent && (
                          <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0'>
                            <IconComponent className='w-5 h-5 text-white' />
                          </div>
                        )}
                        <h3 className='text-lg font-semibold text-gray-900 dark:text-white pr-4'>
                          {faq.question}
                        </h3>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 flex-shrink-0 ${
                          isOpen ? "transform rotate-180" : ""
                        }`}
                      />
                    </div>
                  </CardContent>
                </button>

                {isOpen && (
                  <div className='px-6 pb-6'>
                    <div
                      className={`${IconComponent ? "ml-14" : ""} text-gray-600 dark:text-gray-300 leading-relaxed`}
                    >
                      {faq.answer}
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className='mt-16 text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8'>
          <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
            Still have questions?
          </h3>
          <p className='text-gray-600 dark:text-gray-300 mb-6'>
            Our support team is here to help you succeed in your job search.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <a
              href='mailto:support@applyboost.ai'
              className='inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105'
            >
              Contact Support
            </a>
            <a
              href='#how-it-works'
              className='inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300'
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
