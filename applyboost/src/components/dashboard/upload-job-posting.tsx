"use client";

import { useState } from "react";
import { Upload, FileText, Zap, X } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDropzone } from "react-dropzone";
import { supabase } from "@/lib/supabase";

interface ExtractedKeyword {
  text: string;
  category: string;
}

interface UploadedJobPost {
  id: string;
  title: string;
  company?: string;
  keywords: string[];
  keywordCategories: Record<string, string[]>;
  createdAt: string;
  contentPreview: string;
}

interface UploadJobPostingProps {
  onUploadSuccess?: (jobPost: UploadedJobPost) => void;
  onUploadError?: (error: string) => void;
}

export function UploadJobPosting({
  onUploadSuccess,
  onUploadError,
}: UploadJobPostingProps) {
  const [jobDescription, setJobDescription] = useState("");
  const [extractedKeywords, setExtractedKeywords] = useState<
    ExtractedKeyword[]
  >([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedJobPost, setUploadedJobPost] =
    useState<UploadedJobPost | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "text/plain": [".txt"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setUploadedFile(file);
        setError(null);
        await uploadJobPostingFile(file);
      }
    },
  });

  const uploadJobPostingFile = async (file: File) => {
    setIsAnalyzing(true);
    try {
      // Get the current user session
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error("Please sign in to upload job posting");
      }

      // Create form data
      const formData = new FormData();
      formData.append("file", file);

      // Upload to API
      const response = await fetch("/api/job/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Upload failed");
      }

      const result = await response.json();

      if (result.success) {
        const jobPost = result.data;
        setUploadedJobPost(jobPost);
        setJobDescription(jobPost.contentPreview);

        // Convert keywords to the format expected by the UI
        const keywordsWithCategories: ExtractedKeyword[] = [];

        // Add keywords from categories if available
        if (jobPost.keywordCategories) {
          Object.entries(jobPost.keywordCategories).forEach(
            ([category, keywords]) => {
              (keywords as string[]).forEach((keyword) => {
                keywordsWithCategories.push({
                  text: keyword,
                  category: category
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase()),
                });
              });
            }
          );
        } else {
          // Fallback: use keywords array with generic category
          jobPost.keywords.forEach((keyword: string) => {
            keywordsWithCategories.push({
              text: keyword,
              category: "General",
            });
          });
        }

        setExtractedKeywords(keywordsWithCategories);
        onUploadSuccess?.(jobPost);
      } else {
        throw new Error(result.error || "Upload failed");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Upload failed";
      setError(errorMessage);
      onUploadError?.(errorMessage);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const uploadJobPostingText = async () => {
    if (!jobDescription.trim()) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      // Get the current user session
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error("Please sign in to analyze job posting");
      }

      // Upload to API
      const response = await fetch("/api/job/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          title: "Job Posting",
          content: jobDescription,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Analysis failed");
      }

      const result = await response.json();

      if (result.success) {
        const jobPost = result.data;
        setUploadedJobPost(jobPost);

        // Convert keywords to the format expected by the UI
        const keywordsWithCategories: ExtractedKeyword[] = [];

        // Add keywords from categories if available
        if (jobPost.keywordCategories) {
          Object.entries(jobPost.keywordCategories).forEach(
            ([category, keywords]) => {
              (keywords as string[]).forEach((keyword) => {
                keywordsWithCategories.push({
                  text: keyword,
                  category: category
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase()),
                });
              });
            }
          );
        } else {
          // Fallback: use keywords array with generic category
          jobPost.keywords.forEach((keyword: string) => {
            keywordsWithCategories.push({
              text: keyword,
              category: "General",
            });
          });
        }

        setExtractedKeywords(keywordsWithCategories);
        onUploadSuccess?.(jobPost);
      } else {
        throw new Error(result.error || "Analysis failed");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Analysis failed";
      setError(errorMessage);
      onUploadError?.(errorMessage);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const removeKeyword = (index: number) => {
    setExtractedKeywords((prev) => prev.filter((_, i) => i !== index));
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "Technical Skills": "bg-blue-100 text-blue-800 border-blue-200",
      "Soft Skills": "bg-green-100 text-green-800 border-green-200",
      Methodologies: "bg-purple-100 text-purple-800 border-purple-200",
      Requirements: "bg-orange-100 text-orange-800 border-orange-200",
      Education: "bg-yellow-100 text-yellow-800 border-yellow-200",
      General: "bg-gray-100 text-gray-800 border-gray-200",
    };
    return (
      colors[category as keyof typeof colors] ||
      "bg-gray-100 text-gray-800 border-gray-200"
    );
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setUploadedJobPost(null);
    setExtractedKeywords([]);
    setJobDescription("");
    setError(null);
  };

  return (
    <Card className='h-fit'>
      <CardHeader>
        <CardTitle className='flex items-center space-x-2'>
          <Upload className='h-5 w-5' />
          <span>Upload Job Posting</span>
        </CardTitle>
        <CardDescription>
          Upload or paste a job description to extract relevant keywords
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        {!uploadedJobPost && (
          <>
            <Tabs defaultValue='text' className='w-full'>
              <TabsList className='grid w-full grid-cols-2'>
                <TabsTrigger value='text'>Paste Text</TabsTrigger>
                <TabsTrigger value='upload'>Upload File</TabsTrigger>
              </TabsList>

              <TabsContent value='text' className='space-y-4'>
                <Textarea
                  placeholder='Paste the job description here...'
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className='min-h-[200px]'
                  disabled={isAnalyzing}
                />
              </TabsContent>

              <TabsContent value='upload' className='space-y-4'>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    isDragActive
                      ? "border-primary bg-primary/5"
                      : error
                        ? "border-red-300 bg-red-50"
                        : "border-muted-foreground/25 hover:border-primary/50"
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className='h-10 w-10 mx-auto mb-4 text-muted-foreground' />
                  {uploadedFile ? (
                    <div className='space-y-2'>
                      <p className='text-sm font-medium'>{uploadedFile.name}</p>
                      <p className='text-xs text-muted-foreground'>
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <div className='space-y-2'>
                      <p className='text-sm font-medium'>
                        {isDragActive
                          ? "Drop the file here"
                          : "Drag & drop a file here"}
                      </p>
                      <p className='text-xs text-muted-foreground'>
                        Supports PDF, TXT, and DOCX files
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            {/* Error Display */}
            {error && (
              <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
                <p className='text-sm text-red-700'>{error}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className='flex space-x-3'>
              <Button
                onClick={uploadJobPostingText}
                disabled={!jobDescription.trim() || isAnalyzing}
                className='flex-1'
              >
                {isAnalyzing ? (
                  <>
                    <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2' />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Zap className='h-4 w-4 mr-2' />
                    Extract Keywords
                  </>
                )}
              </Button>
            </div>
          </>
        )}

        {/* Success State */}
        {uploadedJobPost && (
          <div className='space-y-4'>
            <div className='bg-green-50 border border-green-200 rounded-lg p-4 space-y-3'>
              <div className='flex items-center justify-between'>
                <h4 className='font-medium text-green-800'>
                  {uploadedJobPost.title}
                </h4>
                <Badge className='bg-green-100 text-green-800'>
                  {extractedKeywords.length} keywords extracted
                </Badge>
              </div>

              <p className='text-sm text-green-700'>
                {uploadedJobPost.contentPreview}
              </p>

              <div className='flex items-center justify-between pt-2'>
                <span className='text-xs text-green-600'>
                  Analyzed{" "}
                  {new Date(uploadedJobPost.createdAt).toLocaleString()}
                </span>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={resetUpload}
                  className='text-green-700 border-green-300 hover:bg-green-100'
                >
                  <X className='h-4 w-4 mr-2' />
                  Upload Different Job
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Extracted Keywords */}
        {extractedKeywords.length > 0 && (
          <div className='space-y-3'>
            <h4 className='text-sm font-medium'>Extracted Keywords</h4>
            <div className='flex flex-wrap gap-2'>
              {extractedKeywords.map((keyword, index) => (
                <Badge
                  key={index}
                  variant='outline'
                  className={`${getCategoryColor(keyword.category)} relative group`}
                >
                  <span className='text-xs'>{keyword.text}</span>
                  <button
                    onClick={() => removeKeyword(index)}
                    className='ml-2 opacity-0 group-hover:opacity-100 transition-opacity'
                  >
                    <X className='h-3 w-3' />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
