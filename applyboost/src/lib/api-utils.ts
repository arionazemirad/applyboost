import { NextResponse } from "next/server";
import { ZodError } from "zod";

export interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiError;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export function createSuccessResponse<T>(
  data: T,
  status: number = 200,
  pagination?: ApiResponse<T>["pagination"]
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      ...(pagination && { pagination }),
    },
    { status }
  );
}

export function createErrorResponse(
  message: string,
  status: number = 400,
  code?: string,
  details?: unknown
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: {
        message,
        code,
        details,
      },
    },
    { status }
  );
}

export function handleApiError(error: unknown): NextResponse<ApiResponse> {
  console.error("API Error:", error);

  if (error instanceof ZodError) {
    return createErrorResponse(
      "Validation error",
      400,
      "VALIDATION_ERROR",
      error.errors
    );
  }

  if (error instanceof Error) {
    // Handle specific error types
    if (error.message === "Authentication required") {
      return createErrorResponse(
        "Authentication required",
        401,
        "AUTH_REQUIRED"
      );
    }

    if (error.message.includes("not found")) {
      return createErrorResponse("Resource not found", 404, "NOT_FOUND");
    }

    if (error.message.includes("already exists")) {
      return createErrorResponse("Resource already exists", 409, "CONFLICT");
    }

    return createErrorResponse(error.message, 500, "INTERNAL_ERROR");
  }

  return createErrorResponse(
    "An unexpected error occurred",
    500,
    "UNKNOWN_ERROR"
  );
}

export async function parseRequestBody<T>(request: Request): Promise<T> {
  try {
    const body = await request.json();
    return body as T;
  } catch {
    throw new Error("Invalid JSON in request body");
  }
}

export function extractSearchParams(url: string) {
  const { searchParams } = new URL(url);
  const params: Record<string, string> = {};

  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  return params;
}

export function calculatePagination(
  page: number,
  limit: number,
  total: number
) {
  const totalPages = Math.ceil(total / limit);
  const offset = (page - 1) * limit;

  return {
    page,
    limit,
    total,
    totalPages,
    offset,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}
