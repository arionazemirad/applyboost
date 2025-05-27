import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  createSuccessResponse,
  handleApiError,
  parseRequestBody,
} from "@/lib/api-utils";
import { idParamSchema, applicationUpdateSchema } from "@/lib/validations";

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

    // Get application
    const application = await prisma.application.findFirst({
      where: {
        id: validatedParams.id,
        userId: user.id,
      },
      include: {
        resume: {
          select: {
            id: true,
            filename: true,
            fileUrl: true,
            optimized: true,
            scoreBefore: true,
            scoreAfter: true,
          },
        },
        jobPost: {
          select: {
            id: true,
            title: true,
            company: true,
            keywords: true,
            content: true,
          },
        },
      },
    });

    if (!application) {
      throw new Error("Application not found");
    }

    return createSuccessResponse(application);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    // Authenticate user
    const user = await requireAuth(request);

    // Validate and extract ID
    const { id } = await params;
    const validatedParams = idParamSchema.parse({ id });

    // Parse and validate request body
    const body = await parseRequestBody<{
      status?: string;
      notes?: string;
    }>(request);

    const validatedData = applicationUpdateSchema.parse(body);

    // Check if application exists and belongs to user
    const existingApplication = await prisma.application.findFirst({
      where: {
        id: validatedParams.id,
        userId: user.id,
      },
    });

    if (!existingApplication) {
      throw new Error("Application not found");
    }

    // Update application
    const application = await prisma.application.update({
      where: { id: validatedParams.id },
      data: validatedData,
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
            company: true,
          },
        },
      },
    });

    return createSuccessResponse(application);
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

    // Check if application exists and belongs to user
    const application = await prisma.application.findFirst({
      where: {
        id: validatedParams.id,
        userId: user.id,
      },
    });

    if (!application) {
      throw new Error("Application not found");
    }

    // Delete application
    await prisma.application.delete({
      where: { id: validatedParams.id },
    });

    return createSuccessResponse({
      message: "Application deleted successfully",
    });
  } catch (error) {
    return handleApiError(error);
  }
}
