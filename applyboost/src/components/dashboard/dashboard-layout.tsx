"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Target,
  History,
  Settings,
  Moon,
  Sun,
  Bell,
  Menu,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ResumeUpload } from "./resume-upload";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const sidebarItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/dashboard",
    active: true,
  },
  { icon: FileText, label: "Resume Builder", href: "/resume-builder" },
  { icon: Target, label: "Job Matcher", href: "/job-matcher" },
  { icon: History, label: "Applications", href: "/applications" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleUploadSuccess = () => {
    setIsUploadModalOpen(false);
    // Refresh the page to show the updated dashboard
    window.location.reload();
  };

  const SidebarContent = () => (
    <div className='flex flex-col h-full'>
      {/* Logo */}
      <div className='p-6 border-b'>
        <div className='flex items-center space-x-2'>
          <div className='w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center'>
            <span className='text-white font-bold text-sm'>AB</span>
          </div>
          <span className='font-bold text-xl'>ApplyBoost.ai</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className='flex-1 p-4 space-y-2'>
        {sidebarItems.map((item) => (
          <Button
            key={item.href}
            variant={item.active ? "default" : "ghost"}
            className='w-full justify-start space-x-3'
            size='lg'
          >
            <item.icon className='h-5 w-5' />
            <span>{item.label}</span>
          </Button>
        ))}
      </nav>

      {/* User Profile */}
      <div className='p-4 border-t'>
        <div className='flex items-center space-x-3'>
          <Avatar>
            <AvatarImage src='/placeholder-avatar.jpg' />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className='flex-1 min-w-0'>
            <p className='text-sm font-medium truncate'>John Doe</p>
            <p className='text-xs text-muted-foreground truncate'>
              john@example.com
            </p>
          </div>
        </div>
        <div className='mt-3 flex items-center justify-between'>
          <Badge variant='secondary' className='text-xs'>
            Pro Plan
          </Badge>
          <Button variant='ghost' size='sm' onClick={toggleDarkMode}>
            {isDarkMode ? (
              <Sun className='h-4 w-4' />
            ) : (
              <Moon className='h-4 w-4' />
            )}
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className='min-h-screen bg-background'>
      {/* Desktop Sidebar */}
      <div className='hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col'>
        <div className='flex grow flex-col gap-y-5 overflow-y-auto border-r bg-card'>
          <SidebarContent />
        </div>
      </div>

      {/* Mobile Header */}
      <div className='lg:hidden'>
        <div className='flex items-center justify-between p-4 border-b bg-card'>
          <div className='flex items-center space-x-2'>
            <div className='w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center'>
              <span className='text-white font-bold text-sm'>AB</span>
            </div>
            <span className='font-bold text-lg'>ApplyBoost.ai</span>
          </div>
          <div className='flex items-center space-x-2'>
            <Button variant='ghost' size='sm' onClick={toggleDarkMode}>
              {isDarkMode ? (
                <Sun className='h-4 w-4' />
              ) : (
                <Moon className='h-4 w-4' />
              )}
            </Button>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant='ghost' size='sm'>
                  <Menu className='h-5 w-5' />
                </Button>
              </SheetTrigger>
              <SheetContent side='left' className='w-72 p-0'>
                <SidebarContent />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='lg:pl-72'>
        <div className='px-4 py-6 lg:px-8'>
          {/* Header */}
          <div className='mb-8'>
            <div className='flex items-center justify-between'>
              <div>
                <h1 className='text-3xl font-bold tracking-tight'>Dashboard</h1>
                <p className='text-muted-foreground mt-1'>
                  Optimize your resume and track your job applications
                </p>
              </div>
              <div className='flex items-center space-x-4'>
                <Button variant='outline' size='sm'>
                  <Bell className='h-4 w-4 mr-2' />
                  Notifications
                  <Badge
                    variant='destructive'
                    className='ml-2 h-5 w-5 p-0 text-xs'
                  >
                    3
                  </Badge>
                </Button>

                {/* Upload Resume Dialog */}
                <Dialog
                  open={isUploadModalOpen}
                  onOpenChange={setIsUploadModalOpen}
                >
                  <DialogTrigger asChild>
                    <Button>
                      <Upload className='h-4 w-4 mr-2' />
                      Upload Resume
                    </Button>
                  </DialogTrigger>
                  <DialogContent className='max-w-2xl'>
                    <DialogHeader>
                      <DialogTitle>Upload Your Resume</DialogTitle>
                      <DialogDescription>
                        Upload your resume to get started with AI-powered
                        optimization
                      </DialogDescription>
                    </DialogHeader>
                    <div className='mt-4'>
                      <ResumeUpload
                        onUploadSuccess={handleUploadSuccess}
                        onUploadError={(error) =>
                          console.error("Upload error:", error)
                        }
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          {children}
        </div>
      </div>
    </div>
  );
}
