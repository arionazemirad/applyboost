import { createSuccessResponse } from "@/lib/api-utils";

export async function GET() {
  return createSuccessResponse({
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    services: {
      database: "connected",
      storage: "connected",
      ai: "connected",
    },
  });
}
