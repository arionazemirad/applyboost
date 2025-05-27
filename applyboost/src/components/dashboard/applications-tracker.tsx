"use client";

import { useState } from "react";
import { Plus, Search, MoreHorizontal, Calendar, Building } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockApplications = [
  {
    id: 1,
    jobTitle: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    dateApplied: "2024-01-15",
    resumeVersion: "v2.3 - React Optimized",
    matchScore: 92,
    status: "Interview",
    notes: "Technical interview scheduled for next week",
  },
  {
    id: 2,
    jobTitle: "Full Stack Engineer",
    company: "StartupXYZ",
    dateApplied: "2024-01-12",
    resumeVersion: "v2.2 - Full Stack",
    matchScore: 85,
    status: "Applied",
    notes: "Waiting for response",
  },
  {
    id: 3,
    jobTitle: "React Developer",
    company: "Digital Agency",
    dateApplied: "2024-01-10",
    resumeVersion: "v2.3 - React Optimized",
    matchScore: 88,
    status: "Rejected",
    notes: "Position filled internally",
  },
  {
    id: 4,
    jobTitle: "Software Engineer",
    company: "BigTech Corp",
    dateApplied: "2024-01-08",
    resumeVersion: "v2.1 - General",
    matchScore: 78,
    status: "Offer",
    notes: "Salary negotiation in progress",
  },
  {
    id: 5,
    jobTitle: "Frontend Lead",
    company: "FinTech Solutions",
    dateApplied: "2024-01-05",
    resumeVersion: "v2.3 - React Optimized",
    matchScore: 95,
    status: "Saved",
    notes: "Planning to apply this week",
  },
];

const statusColors = {
  Saved: "bg-gray-100 text-gray-800",
  Applied: "bg-blue-100 text-blue-800",
  Interview: "bg-yellow-100 text-yellow-800",
  Offer: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
};

export function ApplicationsTracker() {
  const [applications, setApplications] = useState(mockApplications);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateStatus = (id: number, newStatus: string) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='flex items-center space-x-2'>
              <Building className='h-5 w-5' />
              <span>Applications Tracker</span>
            </CardTitle>
            <CardDescription>
              Track your job applications and their progress
            </CardDescription>
          </div>
          <Button>
            <Plus className='h-4 w-4 mr-2' />
            Add Application
          </Button>
        </div>
      </CardHeader>
      <CardContent className='space-y-4'>
        {/* Filters */}
        <div className='flex flex-col sm:flex-row gap-4'>
          <div className='relative flex-1'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
            <Input
              placeholder='Search jobs or companies...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='pl-10'
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className='w-full sm:w-48'>
              <SelectValue placeholder='Filter by status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Status</SelectItem>
              <SelectItem value='Saved'>Saved</SelectItem>
              <SelectItem value='Applied'>Applied</SelectItem>
              <SelectItem value='Interview'>Interview</SelectItem>
              <SelectItem value='Offer'>Offer</SelectItem>
              <SelectItem value='Rejected'>Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Applications Table */}
        <div className='border rounded-lg'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Title</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Date Applied</TableHead>
                <TableHead>Match Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Resume Version</TableHead>
                <TableHead className='w-12'></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className='font-medium'>{app.jobTitle}</TableCell>
                  <TableCell>{app.company}</TableCell>
                  <TableCell>
                    <div className='flex items-center space-x-2'>
                      <Calendar className='h-4 w-4 text-muted-foreground' />
                      <span className='text-sm'>{app.dateApplied}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`font-medium ${getScoreColor(app.matchScore)}`}
                    >
                      {app.matchScore}%
                    </span>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={app.status}
                      onValueChange={(value) => updateStatus(app.id, value)}
                    >
                      <SelectTrigger className='w-32'>
                        <Badge
                          variant='secondary'
                          className={
                            statusColors[
                              app.status as keyof typeof statusColors
                            ]
                          }
                        >
                          {app.status}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='Saved'>Saved</SelectItem>
                        <SelectItem value='Applied'>Applied</SelectItem>
                        <SelectItem value='Interview'>Interview</SelectItem>
                        <SelectItem value='Offer'>Offer</SelectItem>
                        <SelectItem value='Rejected'>Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <span className='text-sm text-muted-foreground'>
                      {app.resumeVersion}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant='ghost' size='sm'>
                          <MoreHorizontal className='h-4 w-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Notes</DropdownMenuItem>
                        <DropdownMenuItem>Download Resume</DropdownMenuItem>
                        <DropdownMenuItem className='text-red-600'>
                          Delete Application
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Summary Stats */}
        <div className='grid grid-cols-2 sm:grid-cols-5 gap-4 pt-4 border-t'>
          <div className='text-center'>
            <div className='text-2xl font-bold text-gray-600'>
              {applications.filter((app) => app.status === "Saved").length}
            </div>
            <div className='text-xs text-muted-foreground'>Saved</div>
          </div>
          <div className='text-center'>
            <div className='text-2xl font-bold text-blue-600'>
              {applications.filter((app) => app.status === "Applied").length}
            </div>
            <div className='text-xs text-muted-foreground'>Applied</div>
          </div>
          <div className='text-center'>
            <div className='text-2xl font-bold text-yellow-600'>
              {applications.filter((app) => app.status === "Interview").length}
            </div>
            <div className='text-xs text-muted-foreground'>Interviews</div>
          </div>
          <div className='text-center'>
            <div className='text-2xl font-bold text-green-600'>
              {applications.filter((app) => app.status === "Offer").length}
            </div>
            <div className='text-xs text-muted-foreground'>Offers</div>
          </div>
          <div className='text-center'>
            <div className='text-2xl font-bold text-red-600'>
              {applications.filter((app) => app.status === "Rejected").length}
            </div>
            <div className='text-xs text-muted-foreground'>Rejected</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
