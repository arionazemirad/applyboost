"use client";

import { useState } from "react";
import { TrendingUp, Download, RefreshCw } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const matchData = [
  { name: "Match", value: 78, color: "#10b981" },
  { name: "Missing", value: 22, color: "#e5e7eb" },
];

const optimizedMatchData = [
  { name: "Match", value: 92, color: "#10b981" },
  { name: "Missing", value: 8, color: "#e5e7eb" },
];

const categoryScores = [
  { category: "Technical Skills", before: 65, after: 95 },
  { category: "Experience", before: 80, after: 85 },
  { category: "Education", before: 90, after: 95 },
  { category: "Soft Skills", before: 70, after: 90 },
  { category: "Keywords", before: 60, after: 98 },
];

export function ResumeMatchAnalyzer() {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [showOptimized, setShowOptimized] = useState(false);

  const handleOptimize = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
      setShowOptimized(true);
    }, 3000);
  };

  const currentScore = showOptimized ? 92 : 78;
  const currentData = showOptimized ? optimizedMatchData : matchData;

  return (
    <Card className='h-fit'>
      <CardHeader>
        <CardTitle className='flex items-center space-x-2'>
          <TrendingUp className='h-5 w-5' />
          <span>Resume Match Score</span>
        </CardTitle>
        <CardDescription>
          AI-powered analysis of your resume against the job requirements
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        {/* Main Score Display */}
        <div className='flex items-center justify-center'>
          <div className='relative w-48 h-48'>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie
                  data={currentData}
                  cx='50%'
                  cy='50%'
                  innerRadius={60}
                  outerRadius={80}
                  startAngle={90}
                  endAngle={450}
                  dataKey='value'
                >
                  {currentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='text-center'>
                <div className='text-3xl font-bold'>{currentScore}%</div>
                <div className='text-sm text-muted-foreground'>Match Score</div>
              </div>
            </div>
          </div>
        </div>

        {/* Score Comparison */}
        {showOptimized && (
          <div className='bg-green-50 border border-green-200 rounded-lg p-4'>
            <div className='flex items-center justify-between mb-2'>
              <span className='text-sm font-medium text-green-800'>
                Optimization Results
              </span>
              <Badge
                variant='secondary'
                className='bg-green-100 text-green-800'
              >
                +{92 - 78}% improvement
              </Badge>
            </div>
            <div className='space-y-2'>
              <div className='flex justify-between text-sm'>
                <span className='text-gray-600'>Before:</span>
                <span className='font-medium'>78%</span>
              </div>
              <div className='flex justify-between text-sm'>
                <span className='text-gray-600'>After:</span>
                <span className='font-medium text-green-600'>92%</span>
              </div>
            </div>
          </div>
        )}

        {/* Category Breakdown */}
        <div className='space-y-4'>
          <h4 className='text-sm font-medium'>Category Breakdown</h4>
          <div className='space-y-3'>
            {categoryScores.map((item) => (
              <div key={item.category} className='space-y-2'>
                <div className='flex justify-between text-sm'>
                  <span>{item.category}</span>
                  <span className='font-medium'>
                    {showOptimized ? item.after : item.before}%
                  </span>
                </div>
                <Progress
                  value={showOptimized ? item.after : item.before}
                  className='h-2'
                />
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex space-x-3'>
          {!showOptimized ? (
            <Button
              onClick={handleOptimize}
              disabled={isOptimizing}
              className='flex-1'
            >
              {isOptimizing ? (
                <>
                  <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2' />
                  Optimizing...
                </>
              ) : (
                <>
                  <RefreshCw className='h-4 w-4 mr-2' />
                  Optimize Resume
                </>
              )}
            </Button>
          ) : (
            <>
              <Button variant='outline' className='flex-1'>
                <RefreshCw className='h-4 w-4 mr-2' />
                Re-analyze
              </Button>
              <Button className='flex-1'>
                <Download className='h-4 w-4 mr-2' />
                Download
              </Button>
            </>
          )}
        </div>

        {/* Detailed Chart */}
        {showOptimized && (
          <div className='space-y-4'>
            <h4 className='text-sm font-medium'>Before vs After Comparison</h4>
            <div className='h-64'>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart data={categoryScores}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis
                    dataKey='category'
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor='end'
                    height={80}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey='before' fill='#94a3b8' name='Before' />
                  <Bar dataKey='after' fill='#10b981' name='After' />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
