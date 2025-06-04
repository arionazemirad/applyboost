import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { optimizeResume } from "@/lib/openai";
import {
  createSuccessResponse,
  handleApiError,
  parseRequestBody,
} from "@/lib/api-utils";
import { optimizeSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const user = await requireAuth(request);

    // Parse and validate request body
    const body = await parseRequestBody<{
      resumeId: string;
      jobPostId: string;
    }>(request);

    const validatedData = optimizeSchema.parse(body);

    // Get resume and job post
    const [resume, jobPost] = await Promise.all([
      prisma.resume.findFirst({
        where: {
          id: validatedData.resumeId,
          userId: user.id,
        },
      }),
      prisma.jobPost.findFirst({
        where: {
          id: validatedData.jobPostId,
          userId: user.id,
        },
      }),
    ]);

    if (!resume) {
      throw new Error("Resume not found");
    }

    if (!jobPost) {
      throw new Error("Job post not found");
    }

    // Calculate initial match score
    // const initialScore = await calculateMatchScore(
    //   resume.content,
    //   jobPost.keywords
    // );

    // Optimize resume using OpenAI
    const optimizationResult = await optimizeResume(
      resume.content,
      jobPost.keywords,
      jobPost.content
    );

    // Create optimization record
    const optimization = await prisma.optimization.create({
      data: {
        userId: user.id,
        resumeId: validatedData.resumeId,
        jobPostId: validatedData.jobPostId,
        scoreBefore: optimizationResult.scoreBefore,
        scoreAfter: optimizationResult.scoreAfter,
        addedKeywords: optimizationResult.addedKeywords,
        optimizedText: optimizationResult.optimizedText,
      },
    });

    // Update resume with optimization scores
    await prisma.resume.update({
      where: { id: validatedData.resumeId },
      data: {
        optimized: true,
        scoreBefore: optimizationResult.scoreBefore,
        scoreAfter: optimizationResult.scoreAfter,
      },
    });

    return createSuccessResponse(
      {
        optimizationId: optimization.id,
        scoreBefore: optimizationResult.scoreBefore,
        scoreAfter: optimizationResult.scoreAfter,
        improvement:
          optimizationResult.scoreAfter - optimizationResult.scoreBefore,
        addedKeywords: optimizationResult.addedKeywords,
        optimizedText: optimizationResult.optimizedText,
        suggestions: optimizationResult.suggestions,
        createdAt: optimization.createdAt,
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

    // Get user's optimization history
    const optimizations = await prisma.optimization.findMany({
      where: { userId: user.id },
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
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    // Calculate summary statistics
    const totalOptimizations = optimizations.length;
    const averageImprovement =
      totalOptimizations > 0
        ? optimizations.reduce(
            (sum: number, opt: { scoreAfter: number; scoreBefore: number }) => sum + (opt.scoreAfter - opt.scoreBefore),
            0
          ) / totalOptimizations
        : 0;
    const totalKeywordsAdded = optimizations.reduce(
      (sum: number, opt: { addedKeywords: string[] }) => sum + opt.addedKeywords.length,
      0
    );

    return createSuccessResponse({
      optimizations,
      summary: {
        totalOptimizations,
        averageImprovement: Math.round(averageImprovement),
        totalKeywordsAdded,
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}
