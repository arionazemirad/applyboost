"use client";

import { useState } from "react";
import { FileText, Wand2, Download, RefreshCw, Copy } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const toneOptions = [
  { value: "professional", label: "Professional" },
  { value: "enthusiastic", label: "Enthusiastic" },
  { value: "confident", label: "Confident" },
  { value: "friendly", label: "Friendly" },
];

const lengthOptions = [
  { value: "short", label: "Short (150-200 words)" },
  { value: "medium", label: "Medium (200-300 words)" },
  { value: "long", label: "Long (300-400 words)" },
];

const sampleCoverLetter = `Dear Hiring Manager,

I am writing to express my strong interest in the Senior Frontend Developer position at TechCorp Inc. With over 5 years of experience in React.js and TypeScript development, I am excited about the opportunity to contribute to your innovative team.

In my current role at Digital Solutions, I have successfully led the development of responsive web applications that serve over 100,000 users daily. My expertise in React.js, combined with my experience in performance optimization, has resulted in a 40% improvement in page load times and a 25% increase in user engagement. I am particularly drawn to TechCorp's commitment to cutting-edge technology and user-centric design.

Your job posting mentions the need for someone with strong collaboration skills and experience with Agile methodologies. I have consistently worked in cross-functional teams, mentoring junior developers and facilitating sprint planning sessions. My ability to translate complex technical concepts into clear, actionable plans has been instrumental in delivering projects on time and within budget.

I am excited about the possibility of bringing my passion for frontend development and my track record of delivering high-quality solutions to TechCorp Inc. I would welcome the opportunity to discuss how my skills and experience align with your team's needs.

Thank you for your consideration.

Best regards,
John Doe`;

export function CoverLetterGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState("");
  const [tone, setTone] = useState("professional");
  const [length, setLength] = useState("medium");
  const [customPrompt, setCustomPrompt] = useState("");

  const generateCoverLetter = () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedLetter(sampleCoverLetter);
      setIsGenerating(false);
    }, 3000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLetter);
  };

  const regenerate = () => {
    setGeneratedLetter("");
    generateCoverLetter();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center space-x-2'>
          <FileText className='h-5 w-5' />
          <span>AI Cover Letter Generator</span>
        </CardTitle>
        <CardDescription>
          Generate personalized cover letters using your resume and job posting
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        {!generatedLetter ? (
          <>
            {/* Configuration Options */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <label className='text-sm font-medium'>Tone</label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {toneOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className='space-y-2'>
                <label className='text-sm font-medium'>Length</label>
                <Select value={length} onValueChange={setLength}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {lengthOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Custom Instructions */}
            <div className='space-y-2'>
              <label className='text-sm font-medium'>
                Custom Instructions (Optional)
              </label>
              <Textarea
                placeholder='Add any specific points you want to highlight or mention...'
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                className='min-h-[80px]'
              />
            </div>

            {/* Data Sources */}
            <div className='space-y-3'>
              <h4 className='text-sm font-medium'>Using Data From:</h4>
              <div className='flex flex-wrap gap-2'>
                <Badge variant='outline' className='bg-blue-50 text-blue-700'>
                  Resume: v2.3 - React Optimized
                </Badge>
                <Badge variant='outline' className='bg-green-50 text-green-700'>
                  Job: Senior Frontend Developer
                </Badge>
                <Badge
                  variant='outline'
                  className='bg-purple-50 text-purple-700'
                >
                  Company: TechCorp Inc.
                </Badge>
              </div>
            </div>

            {/* Generate Button */}
            <Button
              onClick={generateCoverLetter}
              disabled={isGenerating}
              className='w-full'
              size='lg'
            >
              {isGenerating ? (
                <>
                  <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2' />
                  Generating Cover Letter...
                </>
              ) : (
                <>
                  <Wand2 className='h-4 w-4 mr-2' />
                  Generate Cover Letter
                </>
              )}
            </Button>
          </>
        ) : (
          <>
            {/* Generated Cover Letter */}
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <h4 className='text-sm font-medium'>Generated Cover Letter</h4>
                <div className='flex space-x-2'>
                  <Button variant='outline' size='sm' onClick={copyToClipboard}>
                    <Copy className='h-4 w-4 mr-2' />
                    Copy
                  </Button>
                  <Button variant='outline' size='sm' onClick={regenerate}>
                    <RefreshCw className='h-4 w-4 mr-2' />
                    Regenerate
                  </Button>
                </div>
              </div>

              <div className='border rounded-lg p-4 bg-gray-50 max-h-96 overflow-y-auto'>
                <pre className='text-sm whitespace-pre-wrap font-sans leading-relaxed'>
                  {generatedLetter}
                </pre>
              </div>

              {/* Letter Stats */}
              <div className='grid grid-cols-3 gap-4 text-center text-sm'>
                <div>
                  <div className='font-medium'>
                    {generatedLetter.split(" ").length}
                  </div>
                  <div className='text-muted-foreground'>Words</div>
                </div>
                <div>
                  <div className='font-medium'>
                    {generatedLetter.split("\n\n").length}
                  </div>
                  <div className='text-muted-foreground'>Paragraphs</div>
                </div>
                <div>
                  <div className='font-medium text-green-600'>Professional</div>
                  <div className='text-muted-foreground'>Tone</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                <Button variant='outline' className='w-full'>
                  <FileText className='h-4 w-4 mr-2' />
                  Edit Letter
                </Button>
                <Button className='w-full'>
                  <Download className='h-4 w-4 mr-2' />
                  Download PDF
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
