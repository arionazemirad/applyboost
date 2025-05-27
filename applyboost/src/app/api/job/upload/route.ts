import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { extractKeywordsFromJobPost } from "@/lib/openai";
import { extractTextFromFile, validateFileType } from "@/lib/file-processing";
import {
  createSuccessResponse,
  handleApiError,
  parseRequestBody,
} from "@/lib/api-utils";
import { jobPostSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const user = await requireAuth(request);

    const contentType = request.headers.get("content-type");
    let jobData: { title: string; company?: string; content: string };

    if (contentType?.includes("multipart/form-data")) {
      // Handle file upload
      const formData = await request.formData();
      const file = formData.get("file") as File;
      const title = formData.get("title") as string;
      const company = formData.get("company") as string;

      if (!file) {
        throw new Error("No file provided");
      }

      if (!validateFileType(file.type)) {
        throw new Error(
          "Invalid file type. Only PDF and DOCX files are allowed."
        );
      }

      // Extract text from file
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const content = await extractTextFromFile(buffer, file.type);

      jobData = {
        title: title || file.name.replace(/\.[^/.]+$/, ""), // Remove extension
        company: company || undefined,
        content,
      };
    } else {
      // Handle JSON payload
      jobData = await parseRequestBody<{
        title: string;
        company?: string;
        content: string;
      }>(request);
    }

    // Validate input
    const validatedData = jobPostSchema.parse(jobData);

    // Extract keywords using OpenAI
    const keywordResult = await extractKeywordsFromJobPost(
      validatedData.content
    );

    // Save to database
    const jobPost = await prisma.jobPost.create({
      data: {
        userId: user.id,
        title: validatedData.title,
        company: validatedData.company,
        content: validatedData.content,
        keywords: keywordResult.keywords,
      },
    });

    return createSuccessResponse(
      {
        id: jobPost.id,
        title: jobPost.title,
        company: jobPost.company,
        keywords: jobPost.keywords,
        keywordCategories: keywordResult.categories,
        createdAt: jobPost.createdAt,
        contentPreview: validatedData.content.substring(0, 200) + "...",
      },
      201
    );
  } catch (error) {
    return handleApiError(error);
  }
}

export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const user = await requireAuth(request);

    // Get user's job posts
    const jobPosts = await prisma.jobPost.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        company: true,
        keywords: true,
        createdAt: true,
      },
    });

    return createSuccessResponse(jobPosts);
  } catch (error) {
    return handleApiError(error);
  }
}
