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

    // Get resume
    const resume = await prisma.resume.findFirst({
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
          },
        },
        optimizations: {
          select: {
            id: true,
            scoreBefore: true,
            scoreAfter: true,
            addedKeywords: true,
            createdAt: true,
          },
          orderBy: { createdAt: "desc" },
          take: 5,
        },
      },
    });

    if (!resume) {
      throw new Error("Resume not found");
    }

    return createSuccessResponse(resume);
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

    // Check if resume exists and belongs to user
    const resume = await prisma.resume.findFirst({
      where: {
        id: validatedParams.id,
        userId: user.id,
      },
    });

    if (!resume) {
      throw new Error("Resume not found");
    }

    // Delete from database (this will cascade delete related records)
    await prisma.resume.delete({
      where: { id: validatedParams.id },
    });

    // TODO: Delete from Supabase Storage
    // Extract filename from fileUrl and delete from storage
    // const filename = resume.fileUrl.split('/').pop()
    // await supabaseAdmin.storage.from('resumes').remove([filename])

    return createSuccessResponse({ message: "Resume deleted successfully" });
  } catch (error) {
    return handleApiError(error);
  }
}
