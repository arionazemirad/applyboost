import { NextRequest } from "next/server";
import { requireAuth, createAuthResponse } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase-server";
import { prisma } from "@/lib/prisma";
import {
  extractTextFromFile,
  validateFileType,
  getFileExtension,
} from "@/lib/file-processing";
import { createSuccessResponse, handleApiError } from "@/lib/api-utils";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const user = await requireAuth(request);

    // Parse form data
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return createAuthResponse("No file provided", 400);
    }

    // Validate file type
    if (!validateFileType(file.type)) {
      return createAuthResponse(
        "Invalid file type. Only PDF and DOCX files are allowed.",
        400
      );
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return createAuthResponse(
        "File size too large. Maximum size is 10MB.",
        400
      );
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Extract text content
    const textContent = await extractTextFromFile(buffer, file.type);

    // Generate unique filename
    const fileExtension = getFileExtension(file.type);
    const uniqueFilename = `${user.id}/${uuidv4()}${fileExtension}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabaseAdmin.storage
      .from("resumes")
      .upload(uniqueFilename, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Supabase upload error:", uploadError);
      throw new Error("Failed to upload file to storage");
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabaseAdmin.storage.from("resumes").getPublicUrl(uniqueFilename);

    // Save to database
    const resume = await prisma.resume.create({
      data: {
        userId: user.id,
        filename: file.name,
        fileUrl: publicUrl,
        content: textContent,
      },
    });

    return createSuccessResponse(
      {
        id: resume.id,
        filename: resume.filename,
        fileUrl: resume.fileUrl,
        uploadedAt: resume.uploadedAt,
        contentPreview: textContent.substring(0, 200) + "...",
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

    // Get user's resumes
    const resumes = await prisma.resume.findMany({
      where: { userId: user.id },
      orderBy: { uploadedAt: "desc" },
      select: {
        id: true,
        filename: true,
        fileUrl: true,
        uploadedAt: true,
        optimized: true,
        scoreBefore: true,
        scoreAfter: true,
      },
    });

    return createSuccessResponse(resumes);
  } catch (error) {
    return handleApiError(error);
  }
}
