import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { calculateMatchScore } from "@/lib/openai";
import {
  createSuccessResponse,
  handleApiError,
  parseRequestBody,
  extractSearchParams,
  calculatePagination,
} from "@/lib/api-utils";
import { applicationSchema, paginationSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const user = await requireAuth(request);

    // Parse and validate request body
    const body = await parseRequestBody<{
      jobTitle: string;
      company: string;
      resumeId: string;
      jobPostId?: string;
      status?: string;
      notes?: string;
    }>(request);

    const validatedData = applicationSchema.parse(body);

    // Verify resume belongs to user
    const resume = await prisma.resume.findFirst({
      where: {
        id: validatedData.resumeId,
        userId: user.id,
      },
    });

    if (!resume) {
      throw new Error("Resume not found");
    }

    // Calculate match score if job post is provided
    let matchScore: number | undefined;
    if (validatedData.jobPostId) {
      const jobPost = await prisma.jobPost.findFirst({
        where: {
          id: validatedData.jobPostId,
          userId: user.id,
        },
      });

      if (jobPost) {
        matchScore = await calculateMatchScore(
          resume.content,
          jobPost.keywords
        );
      }
    }

    // Create application
    const application = await prisma.application.create({
      data: {
        userId: user.id,
        jobTitle: validatedData.jobTitle,
        company: validatedData.company,
        resumeId: validatedData.resumeId,
        jobPostId: validatedData.jobPostId,
        status: validatedData.status,
        notes: validatedData.notes,
        matchScore,
      },
      include: {
        resume: {
          select: {
            id: true,
            filename: true,
          },
        },
        jobPost: {
          select: {
            id: true,
            title: true,
            keywords: true,
          },
        },
      },
    });

    return createSuccessResponse(application, 201);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const user = await requireAuth(request);

    // Parse query parameters
    const params = extractSearchParams(request.url);
    const { page, limit } = paginationSchema.parse(params);
    const { status, search } = params;

    // Build where clause
    const where: any = { userId: user.id };

    if (status && status !== "all") {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { jobTitle: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } },
      ];
    }

    // Get total count for pagination
    const total = await prisma.application.count({ where });

    // Get applications with pagination
    const applications = await prisma.application.findMany({
      where,
      include: {
        resume: {
          select: {
            id: true,
            filename: true,
          },
        },
        jobPost: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: { appliedDate: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    });

    // Calculate summary statistics
    const statusCounts = await prisma.application.groupBy({
      by: ["status"],
      where: { userId: user.id },
      _count: { status: true },
    });

    const summary = statusCounts.reduce(
      (acc, item) => {
        acc[item.status] = item._count.status;
        return acc;
      },
      {} as Record<string, number>
    );

    const pagination = calculatePagination(page, limit, total);

    return createSuccessResponse(
      {
        applications,
        summary,
      },
      200,
      pagination
    );
  } catch (error) {
    return handleApiError(error);
  }
}
