"use client";

import { useState } from "react";
import { Eye, Download, RotateCcw, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const addedKeywords = [
  { text: "React.js", category: "Technical Skills", added: true },
  { text: "TypeScript", category: "Technical Skills", added: true },
  { text: "Agile methodology", category: "Methodologies", added: true },
  {
    text: "Cross-functional collaboration",
    category: "Soft Skills",
    added: true,
  },
  {
    text: "Performance optimization",
    category: "Technical Skills",
    added: true,
  },
  { text: "Unit testing", category: "Technical Skills", added: true },
];

const originalResume = `JOHN DOE
Software Developer

EXPERIENCE
Frontend Developer at TechCorp (2020-2023)
• Developed web applications using JavaScript
• Worked with team members on various projects
• Implemented user interfaces
• Debugged and fixed issues

SKILLS
• JavaScript
• HTML/CSS
• Git
• Problem solving`;

const optimizedResume = `JOHN DOE
Software Developer

EXPERIENCE
Frontend Developer at TechCorp (2020-2023)
• Developed responsive web applications using JavaScript and React.js
• Collaborated with cross-functional teams using Agile methodology
• Implemented modern user interfaces with TypeScript for type safety
• Performed unit testing and performance optimization to ensure quality
• Debugged and resolved complex technical issues

SKILLS
• JavaScript, React.js, TypeScript
• HTML/CSS, Responsive Design
• Git, Version Control
• Problem solving, Cross-functional collaboration
• Unit testing, Performance optimization`;

export function KeywordEnhancementPreview() {
  const [activeTab, setActiveTab] = useState("preview");

  const getCategoryColor = (category: string) => {
    const colors = {
      "Technical Skills": "bg-blue-100 text-blue-800 border-blue-200",
      "Soft Skills": "bg-green-100 text-green-800 border-green-200",
      Methodologies: "bg-purple-100 text-purple-800 border-purple-200",
    };
    return (
      colors[category as keyof typeof colors] ||
      "bg-gray-100 text-gray-800 border-gray-200"
    );
  };

  const highlightKeywords = (text: string) => {
    let highlightedText = text;
    addedKeywords.forEach((keyword) => {
      const regex = new RegExp(`(${keyword.text})`, "gi");
      highlightedText = highlightedText.replace(
        regex,
        `<mark class="bg-yellow-200 px-1 rounded">$1</mark>`
      );
    });
    return highlightedText;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center space-x-2'>
          <Eye className='h-5 w-5' />
          <span>Keyword Enhancement Preview</span>
        </CardTitle>
        <CardDescription>
          See how your resume has been optimized with relevant keywords
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
          <TabsList className='grid w-full grid-cols-3'>
            <TabsTrigger value='preview'>Side-by-Side</TabsTrigger>
            <TabsTrigger value='keywords'>Added Keywords</TabsTrigger>
            <TabsTrigger value='download'>Download</TabsTrigger>
          </TabsList>

          <TabsContent value='preview' className='space-y-4'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              {/* Original Resume */}
              <div className='space-y-3'>
                <h4 className='text-sm font-medium text-muted-foreground'>
                  Original Resume
                </h4>
                <div className='border rounded-lg p-4 bg-gray-50 h-96 overflow-y-auto'>
                  <pre className='text-xs whitespace-pre-wrap font-mono'>
                    {originalResume}
                  </pre>
                </div>
              </div>

              {/* Optimized Resume */}
              <div className='space-y-3'>
                <h4 className='text-sm font-medium text-muted-foreground'>
                  Optimized Resume
                  <Badge variant='secondary' className='ml-2'>
                    +{addedKeywords.length} keywords
                  </Badge>
                </h4>
                <div className='border rounded-lg p-4 bg-green-50 h-96 overflow-y-auto'>
                  <pre
                    className='text-xs whitespace-pre-wrap font-mono'
                    dangerouslySetInnerHTML={{
                      __html: highlightKeywords(optimizedResume),
                    }}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value='keywords' className='space-y-4'>
            <div className='space-y-6'>
              <div className='flex items-center justify-between'>
                <h4 className='text-sm font-medium'>Keywords Added</h4>
                <Badge variant='outline'>{addedKeywords.length} total</Badge>
              </div>

              {/* Keywords by Category */}
              {["Technical Skills", "Soft Skills", "Methodologies"].map(
                (category) => {
                  const categoryKeywords = addedKeywords.filter(
                    (k) => k.category === category
                  );
                  if (categoryKeywords.length === 0) return null;

                  return (
                    <div key={category} className='space-y-3'>
                      <h5 className='text-sm font-medium text-muted-foreground'>
                        {category}
                      </h5>
                      <div className='flex flex-wrap gap-2'>
                        {categoryKeywords.map((keyword, index) => (
                          <Badge
                            key={index}
                            variant='outline'
                            className={`${getCategoryColor(keyword.category)} relative`}
                          >
                            <Plus className='h-3 w-3 mr-1' />
                            {keyword.text}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  );
                }
              )}

              <Separator />

              {/* Keyword Impact */}
              <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
                <h5 className='text-sm font-medium text-blue-800 mb-2'>
                  Keyword Impact
                </h5>
                <div className='space-y-2 text-sm text-blue-700'>
                  <div className='flex justify-between'>
                    <span>ATS Compatibility:</span>
                    <span className='font-medium'>+25%</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Keyword Density:</span>
                    <span className='font-medium'>Optimal</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Industry Relevance:</span>
                    <span className='font-medium'>High</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value='download' className='space-y-4'>
            <div className='space-y-6'>
              <div className='text-center space-y-4'>
                <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto'>
                  <Download className='h-8 w-8 text-green-600' />
                </div>
                <div>
                  <h4 className='text-lg font-medium'>
                    Your Optimized Resume is Ready!
                  </h4>
                  <p className='text-sm text-muted-foreground mt-1'>
                    Download your enhanced resume with {addedKeywords.length}{" "}
                    new keywords
                  </p>
                </div>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <Button className='w-full'>
                  <Download className='h-4 w-4 mr-2' />
                  Download PDF
                </Button>
                <Button variant='outline' className='w-full'>
                  <Download className='h-4 w-4 mr-2' />
                  Download DOCX
                </Button>
              </div>

              <Separator />

              <div className='space-y-3'>
                <h5 className='text-sm font-medium'>Quick Actions</h5>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                  <Button variant='outline' size='sm'>
                    <RotateCcw className='h-4 w-4 mr-2' />
                    Revert Changes
                  </Button>
                  <Button variant='outline' size='sm'>
                    <Plus className='h-4 w-4 mr-2' />
                    Add More Keywords
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
