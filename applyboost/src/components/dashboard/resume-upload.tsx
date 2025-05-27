"use client";

import { useState, useCallback } from "react";
import { Upload, FileText, CheckCircle, AlertCircle, X } from "lucide-react";
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
import { useDropzone } from "react-dropzone";
import { supabase } from "@/lib/supabase";

interface UploadedResume {
  id: string;
  filename: string;
  fileUrl: string;
  uploadedAt: string;
  contentPreview: string;
}

interface ResumeUploadProps {
  onUploadSuccess?: (resume: UploadedResume) => void;
  onUploadError?: (error: string) => void;
}

export function ResumeUpload({
  onUploadSuccess,
  onUploadError,
}: ResumeUploadProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedResume, setUploadedResume] = useState<UploadedResume | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const uploadResume = async (file: File) => {
    setIsUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      // Get the current user session
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error("Please sign in to upload your resume");
      }

      // Create form data
      const formData = new FormData();
      formData.append("file", file);

      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Upload to API
      const response = await fetch("/api/resume/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Upload failed");
      }

      const result = await response.json();

      if (result.success) {
        setUploadedResume(result.data);
        onUploadSuccess?.(result.data);
      } else {
        throw new Error(result.error || "Upload failed");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Upload failed";
      setError(errorMessage);
      onUploadError?.(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setUploadedFile(file);
      uploadResume(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
    disabled: isUploading,
  });

  const resetUpload = () => {
    setUploadedFile(null);
    setUploadedResume(null);
    setError(null);
    setUploadProgress(0);
  };

  const getFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <Card className='h-fit'>
      <CardHeader>
        <CardTitle className='flex items-center space-x-2'>
          <Upload className='h-5 w-5' />
          <span>Upload Your Resume</span>
        </CardTitle>
        <CardDescription>
          Upload your resume in PDF or Word format to get started with AI
          optimization
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        {!uploadedResume && !isUploading && (
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
              isDragActive
                ? "border-primary bg-primary/5"
                : error
                  ? "border-red-300 bg-red-50"
                  : "border-muted-foreground/25 hover:border-primary/50"
            }`}
          >
            <input {...getInputProps()} />
            <Upload className='h-12 w-12 mx-auto mb-4 text-muted-foreground' />

            {uploadedFile && !error ? (
              <div className='space-y-2'>
                <p className='text-sm font-medium'>{uploadedFile.name}</p>
                <p className='text-xs text-muted-foreground'>
                  {getFileSize(uploadedFile.size)}
                </p>
              </div>
            ) : (
              <div className='space-y-2'>
                <p className='text-lg font-medium'>
                  {isDragActive
                    ? "Drop your resume here"
                    : "Drag & drop your resume here"}
                </p>
                <p className='text-sm text-muted-foreground'>
                  or click to browse files
                </p>
                <div className='flex justify-center gap-2 mt-4'>
                  <Badge variant='outline'>PDF</Badge>
                  <Badge variant='outline'>DOCX</Badge>
                  <Badge variant='outline'>Max 10MB</Badge>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Upload Progress */}
        {isUploading && (
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-2'>
                <FileText className='h-5 w-5 text-blue-600' />
                <span className='text-sm font-medium'>
                  {uploadedFile?.name}
                </span>
              </div>
              <span className='text-sm text-muted-foreground'>
                {uploadProgress}%
              </span>
            </div>
            <Progress value={uploadProgress} className='w-full' />
            <p className='text-sm text-muted-foreground text-center'>
              {uploadProgress < 30 && "Uploading file..."}
              {uploadProgress >= 30 &&
                uploadProgress < 60 &&
                "Processing document..."}
              {uploadProgress >= 60 &&
                uploadProgress < 90 &&
                "Extracting text content..."}
              {uploadProgress >= 90 && "Finalizing upload..."}
            </p>
          </div>
        )}

        {/* Upload Success */}
        {uploadedResume && (
          <div className='space-y-4'>
            <div className='flex items-center justify-center space-x-2 text-green-600'>
              <CheckCircle className='h-6 w-6' />
              <span className='font-medium'>Resume uploaded successfully!</span>
            </div>

            <div className='bg-green-50 border border-green-200 rounded-lg p-4 space-y-3'>
              <div className='flex items-center justify-between'>
                <h4 className='font-medium text-green-800'>
                  {uploadedResume.filename}
                </h4>
                <Badge className='bg-green-100 text-green-800'>
                  Ready for optimization
                </Badge>
              </div>

              <p className='text-sm text-green-700'>
                {uploadedResume.contentPreview}
              </p>

              <div className='flex items-center justify-between pt-2'>
                <span className='text-xs text-green-600'>
                  Uploaded{" "}
                  {new Date(uploadedResume.uploadedAt).toLocaleString()}
                </span>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={resetUpload}
                  className='text-green-700 border-green-300 hover:bg-green-100'
                >
                  <X className='h-4 w-4 mr-2' />
                  Upload Different Resume
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Upload Error */}
        {error && (
          <div className='space-y-4'>
            <div className='flex items-center justify-center space-x-2 text-red-600'>
              <AlertCircle className='h-6 w-6' />
              <span className='font-medium'>Upload failed</span>
            </div>

            <div className='bg-red-50 border border-red-200 rounded-lg p-4 space-y-3'>
              <p className='text-sm text-red-700'>{error}</p>
              <Button
                variant='outline'
                size='sm'
                onClick={resetUpload}
                className='w-full text-red-700 border-red-300 hover:bg-red-100'
              >
                Try Again
              </Button>
            </div>
          </div>
        )}

        {/* Help Text */}
        {!uploadedResume && !isUploading && (
          <div className='text-center space-y-2'>
            <p className='text-sm text-muted-foreground'>
              Your resume will be analyzed and optimized using AI
            </p>
            <div className='flex justify-center space-x-4 text-xs text-muted-foreground'>
              <div className='flex items-center space-x-1'>
                <div className='w-2 h-2 bg-green-500 rounded-full' />
                <span>Secure & Private</span>
              </div>
              <div className='flex items-center space-x-1'>
                <div className='w-2 h-2 bg-blue-500 rounded-full' />
                <span>ATS Compatible</span>
              </div>
              <div className='flex items-center space-x-1'>
                <div className='w-2 h-2 bg-purple-500 rounded-full' />
                <span>AI Powered</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
