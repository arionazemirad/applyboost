import { z } from "zod";

// Resume upload validation
export const resumeUploadSchema = z.object({
  filename: z.string().min(1, "Filename is required"),
  fileType: z.enum([
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ]),
});

// Job post validation
export const jobPostSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  company: z.string().optional(),
  content: z.string().min(10, "Job description must be at least 10 characters"),
});

// Optimization request validation
export const optimizeSchema = z.object({
  resumeId: z.string().cuid("Invalid resume ID"),
  jobPostId: z.string().cuid("Invalid job post ID"),
});

// Application tracking validation
export const applicationSchema = z.object({
  jobTitle: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company name is required"),
  resumeId: z.string().cuid("Invalid resume ID"),
  jobPostId: z.string().cuid("Invalid job post ID").optional(),
  status: z
    .enum(["Saved", "Applied", "Interview", "Offer", "Rejected"])
    .default("Saved"),
  notes: z.string().optional(),
});

// Application update validation
export const applicationUpdateSchema = z.object({
  status: z
    .enum(["Saved", "Applied", "Interview", "Offer", "Rejected"])
    .optional(),
  notes: z.string().optional(),
});

// Query parameter validation
export const idParamSchema = z.object({
  id: z.string().cuid("Invalid ID format"),
});

// Pagination validation
export const paginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
});
