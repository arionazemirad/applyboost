"use client";

import { useState } from "react";
import {
  Lightbulb,
  AlertTriangle,
  TrendingUp,
  Target,
  Plus,
  X,
} from "lucide-react";
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

const actionVerbs = [
  "Spearheaded",
  "Orchestrated",
  "Streamlined",
  "Optimized",
  "Pioneered",
  "Accelerated",
  "Transformed",
  "Architected",
  "Collaborated",
  "Delivered",
  "Enhanced",
  "Implemented",
  "Managed",
  "Developed",
  "Led",
];

const metricsRecommendations = [
  {
    area: "Performance",
    suggestion: "Add specific performance improvements",
    example: "Improved page load time by 40%",
    priority: "high",
  },
  {
    area: "Team Size",
    suggestion: "Quantify team leadership experience",
    example: "Led a team of 8 developers",
    priority: "medium",
  },
  {
    area: "Revenue Impact",
    suggestion: "Include business impact metrics",
    example: "Increased conversion rate by 25%",
    priority: "high",
  },
  {
    area: "Code Quality",
    suggestion: "Add technical achievement metrics",
    example: "Reduced bug reports by 60%",
    priority: "medium",
  },
];

const weakAreas = [
  {
    area: "Technical Skills",
    issue: "Missing modern frameworks",
    suggestion: "Add React, Vue.js, or Angular experience",
    severity: "high",
  },
  {
    area: "Soft Skills",
    issue: "Limited leadership keywords",
    suggestion: "Include team collaboration and mentoring",
    severity: "medium",
  },
  {
    area: "Industry Keywords",
    issue: "Outdated technology stack",
    suggestion: "Update with current tech trends",
    severity: "high",
  },
];

const keywordSuggestions = [
  { keyword: "Microservices", category: "Architecture", relevance: 95 },
  { keyword: "CI/CD", category: "DevOps", relevance: 90 },
  { keyword: "Cloud Computing", category: "Infrastructure", relevance: 88 },
  { keyword: "API Design", category: "Development", relevance: 85 },
  { keyword: "Agile/Scrum", category: "Methodology", relevance: 82 },
  { keyword: "Test-Driven Development", category: "Quality", relevance: 80 },
];

export function SmartSuggestionsPanel() {
  const [activeTab, setActiveTab] = useState("verbs");
  const [appliedSuggestions, setAppliedSuggestions] = useState<string[]>([]);

  const applySuggestion = (suggestion: string) => {
    setAppliedSuggestions((prev) => [...prev, suggestion]);
  };

  const removeSuggestion = (suggestion: string) => {
    setAppliedSuggestions((prev) => prev.filter((s) => s !== suggestion));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center space-x-2'>
          <Lightbulb className='h-5 w-5' />
          <span>Smart Suggestions</span>
        </CardTitle>
        <CardDescription>
          AI-powered recommendations to enhance your resume
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
          <TabsList className='grid w-full grid-cols-4'>
            <TabsTrigger value='verbs'>Action Verbs</TabsTrigger>
            <TabsTrigger value='metrics'>Metrics</TabsTrigger>
            <TabsTrigger value='weak'>Weak Areas</TabsTrigger>
            <TabsTrigger value='keywords'>Keywords</TabsTrigger>
          </TabsList>

          <TabsContent value='verbs' className='space-y-4'>
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <h4 className='text-sm font-medium'>Powerful Action Verbs</h4>
                <Badge variant='outline'>
                  {actionVerbs.length} suggestions
                </Badge>
              </div>
              <p className='text-sm text-muted-foreground'>
                Replace weak verbs with impactful action words to strengthen
                your resume
              </p>
              <div className='flex flex-wrap gap-2'>
                {actionVerbs.map((verb) => (
                  <Button
                    key={verb}
                    variant='outline'
                    size='sm'
                    className='h-8 text-xs'
                    onClick={() => applySuggestion(verb)}
                    disabled={appliedSuggestions.includes(verb)}
                  >
                    {appliedSuggestions.includes(verb) ? (
                      <>
                        <X className='h-3 w-3 mr-1' />
                        {verb}
                      </>
                    ) : (
                      <>
                        <Plus className='h-3 w-3 mr-1' />
                        {verb}
                      </>
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value='metrics' className='space-y-4'>
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <h4 className='text-sm font-medium'>Metrics Recommendations</h4>
                <Badge variant='outline'>
                  {metricsRecommendations.length} areas
                </Badge>
              </div>
              <p className='text-sm text-muted-foreground'>
                Add quantifiable achievements to make your impact measurable
              </p>
              <div className='space-y-3'>
                {metricsRecommendations.map((metric, index) => (
                  <div key={index} className='border rounded-lg p-4 space-y-3'>
                    <div className='flex items-center justify-between'>
                      <h5 className='font-medium'>{metric.area}</h5>
                      <Badge
                        variant='outline'
                        className={getPriorityColor(metric.priority)}
                      >
                        {metric.priority} priority
                      </Badge>
                    </div>
                    <p className='text-sm text-muted-foreground'>
                      {metric.suggestion}
                    </p>
                    <div className='bg-blue-50 border border-blue-200 rounded p-3'>
                      <p className='text-sm text-blue-800'>
                        <strong>Example:</strong> {metric.example}
                      </p>
                    </div>
                    <Button size='sm' variant='outline' className='w-full'>
                      <Plus className='h-4 w-4 mr-2' />
                      Apply Suggestion
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value='weak' className='space-y-4'>
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <h4 className='text-sm font-medium'>Areas for Improvement</h4>
                <Badge variant='outline'>{weakAreas.length} issues found</Badge>
              </div>
              <p className='text-sm text-muted-foreground'>
                Address these weak areas to strengthen your resume
              </p>
              <div className='space-y-3'>
                {weakAreas.map((area, index) => (
                  <div key={index} className='border rounded-lg p-4 space-y-3'>
                    <div className='flex items-start justify-between'>
                      <div className='space-y-1'>
                        <div className='flex items-center space-x-2'>
                          <AlertTriangle
                            className={`h-4 w-4 ${getSeverityColor(area.severity)}`}
                          />
                          <h5 className='font-medium'>{area.area}</h5>
                        </div>
                        <p className='text-sm text-muted-foreground'>
                          {area.issue}
                        </p>
                      </div>
                      <Badge
                        variant='outline'
                        className={getPriorityColor(area.severity)}
                      >
                        {area.severity}
                      </Badge>
                    </div>
                    <div className='bg-yellow-50 border border-yellow-200 rounded p-3'>
                      <p className='text-sm text-yellow-800'>
                        <strong>Suggestion:</strong> {area.suggestion}
                      </p>
                    </div>
                    <Button size='sm' variant='outline' className='w-full'>
                      <Target className='h-4 w-4 mr-2' />
                      Fix This Issue
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value='keywords' className='space-y-4'>
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <h4 className='text-sm font-medium'>Trending Keywords</h4>
                <Badge variant='outline'>
                  {keywordSuggestions.length} suggestions
                </Badge>
              </div>
              <p className='text-sm text-muted-foreground'>
                Add these relevant keywords to improve ATS compatibility
              </p>
              <div className='space-y-3'>
                {keywordSuggestions.map((item, index) => (
                  <div
                    key={index}
                    className='flex items-center justify-between p-3 border rounded-lg'
                  >
                    <div className='space-y-1'>
                      <div className='flex items-center space-x-2'>
                        <span className='font-medium'>{item.keyword}</span>
                        <Badge variant='secondary' className='text-xs'>
                          {item.category}
                        </Badge>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <TrendingUp className='h-3 w-3 text-green-600' />
                        <span className='text-xs text-muted-foreground'>
                          {item.relevance}% relevance
                        </span>
                      </div>
                    </div>
                    <Button size='sm' variant='outline'>
                      <Plus className='h-4 w-4 mr-2' />
                      Add
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
