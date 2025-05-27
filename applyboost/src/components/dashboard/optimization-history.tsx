"use client";

import { useState } from "react";
import { History, Download, RefreshCw, Clock, TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const mockOptimizations = [
  {
    id: 1,
    jobTitle: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    beforeScore: 78,
    afterScore: 92,
    timestamp: "2024-01-15 14:30",
    keywordsAdded: 8,
    resumeVersion: "v2.3",
  },
  {
    id: 2,
    jobTitle: "Full Stack Engineer",
    company: "StartupXYZ",
    beforeScore: 65,
    afterScore: 85,
    timestamp: "2024-01-12 09:15",
    keywordsAdded: 12,
    resumeVersion: "v2.2",
  },
  {
    id: 3,
    jobTitle: "React Developer",
    company: "Digital Agency",
    beforeScore: 70,
    afterScore: 88,
    timestamp: "2024-01-10 16:45",
    keywordsAdded: 6,
    resumeVersion: "v2.1",
  },
  {
    id: 4,
    jobTitle: "Software Engineer",
    company: "BigTech Corp",
    beforeScore: 60,
    afterScore: 78,
    timestamp: "2024-01-08 11:20",
    keywordsAdded: 10,
    resumeVersion: "v2.0",
  },
];

export function OptimizationHistory() {
  const [optimizations] = useState(mockOptimizations);

  const getImprovementColor = (improvement: number) => {
    if (improvement >= 20) return "text-green-600";
    if (improvement >= 10) return "text-yellow-600";
    return "text-blue-600";
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center space-x-2'>
          <History className='h-5 w-5' />
          <span>Optimization History</span>
        </CardTitle>
        <CardDescription>
          View your past resume optimizations and their results
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        {optimizations.map((opt) => {
          const improvement = opt.afterScore - opt.beforeScore;
          const { date, time } = formatDate(opt.timestamp);

          return (
            <div key={opt.id} className='border rounded-lg p-4 space-y-4'>
              {/* Header */}
              <div className='flex items-start justify-between'>
                <div className='space-y-1'>
                  <h4 className='font-medium'>{opt.jobTitle}</h4>
                  <p className='text-sm text-muted-foreground'>{opt.company}</p>
                  <div className='flex items-center space-x-2 text-xs text-muted-foreground'>
                    <Clock className='h-3 w-3' />
                    <span>
                      {date} at {time}
                    </span>
                  </div>
                </div>
                <Badge variant='outline' className='text-xs'>
                  {opt.resumeVersion}
                </Badge>
              </div>

              {/* Score Improvement */}
              <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm font-medium'>
                    Match Score Improvement
                  </span>
                  <div className='flex items-center space-x-2'>
                    <TrendingUp className='h-4 w-4 text-green-600' />
                    <span
                      className={`font-medium ${getImprovementColor(improvement)}`}
                    >
                      +{improvement}%
                    </span>
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <div className='flex justify-between text-sm'>
                      <span className='text-muted-foreground'>Before:</span>
                      <span className='font-medium'>{opt.beforeScore}%</span>
                    </div>
                    <Progress value={opt.beforeScore} className='h-2' />
                  </div>
                  <div className='space-y-2'>
                    <div className='flex justify-between text-sm'>
                      <span className='text-muted-foreground'>After:</span>
                      <span className='font-medium text-green-600'>
                        {opt.afterScore}%
                      </span>
                    </div>
                    <Progress value={opt.afterScore} className='h-2' />
                  </div>
                </div>
              </div>

              {/* Keywords Added */}
              <div className='flex items-center justify-between text-sm'>
                <span className='text-muted-foreground'>Keywords Added:</span>
                <Badge variant='secondary'>{opt.keywordsAdded} keywords</Badge>
              </div>

              {/* Actions */}
              <div className='flex space-x-2 pt-2'>
                <Button variant='outline' size='sm' className='flex-1'>
                  <Download className='h-4 w-4 mr-2' />
                  Re-Download
                </Button>
                <Button variant='outline' size='sm' className='flex-1'>
                  <RefreshCw className='h-4 w-4 mr-2' />
                  Retry Optimization
                </Button>
              </div>
            </div>
          );
        })}

        {/* Summary Stats */}
        <div className='border-t pt-4 mt-6'>
          <div className='grid grid-cols-3 gap-4 text-center'>
            <div>
              <div className='text-2xl font-bold text-blue-600'>
                {optimizations.length}
              </div>
              <div className='text-xs text-muted-foreground'>
                Total Optimizations
              </div>
            </div>
            <div>
              <div className='text-2xl font-bold text-green-600'>
                {Math.round(
                  optimizations.reduce(
                    (acc, opt) => acc + (opt.afterScore - opt.beforeScore),
                    0
                  ) / optimizations.length
                )}
                %
              </div>
              <div className='text-xs text-muted-foreground'>
                Avg. Improvement
              </div>
            </div>
            <div>
              <div className='text-2xl font-bold text-purple-600'>
                {optimizations.reduce((acc, opt) => acc + opt.keywordsAdded, 0)}
              </div>
              <div className='text-xs text-muted-foreground'>
                Keywords Added
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
