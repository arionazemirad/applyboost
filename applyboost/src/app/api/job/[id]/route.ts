import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createSuccessResponse, handleApiError } from "@/lib/api-utils";
import { idParamSchema } from "@/lib/validations";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    // Authenticate user
    const user = await requireAuth(request);

    // Validate and extract ID
    const { id } = await params;
    const validatedParams = idParamSchema.parse({ id });

    // Get job post
    const jobPost = await prisma.jobPost.findFirst({
      where: {
        id: validatedParams.id,
        userId: user.id,
      },
      include: {
        applications: {
          select: {
            id: true,
            jobTitle: true,
            company: true,
            status: true,
            appliedDate: true,
            resume: {
              select: {
                id: true,
                filename: true,
              },
            },
          },
        },
        optimizations: {
          select: {
            id: true,
            scoreBefore: true,
            scoreAfter: true,
            addedKeywords: true,
            createdAt: true,
            resume: {
              select: {
                id: true,
                filename: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
          take: 5,
        },
      },
    });

    if (!jobPost) {
      throw new Error("Job post not found");
    }

    return createSuccessResponse(jobPost);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    // Authenticate user
    const user = await requireAuth(request);

    // Validate and extract ID
    const { id } = await params;
    const validatedParams = idParamSchema.parse({ id });

    // Check if job post exists and belongs to user
    const jobPost = await prisma.jobPost.findFirst({
      where: {
        id: validatedParams.id,
        userId: user.id,
      },
    });

    if (!jobPost) {
      throw new Error("Job post not found");
    }

    // Delete from database (this will cascade delete related records)
    await prisma.jobPost.delete({
      where: { id: validatedParams.id },
    });

    return createSuccessResponse({ message: "Job post deleted successfully" });
  } catch (error) {
    return handleApiError(error);
  }
}
