import { createSupabaseServerClient } from "./supabase-server";
import { NextRequest } from "next/server";
import { prisma } from "./prisma";
import { createClient } from "@supabase/supabase-js";

export interface AuthUser {
  id: string;
  email: string;
}

export async function getAuthUser(
  request: NextRequest
): Promise<AuthUser | null> {
  try {
    // Check for Authorization header first (for API calls)
    const authHeader = request.headers.get("authorization");

    if (authHeader && authHeader.startsWith("Bearer ")) {
      // Create a Supabase client with the token
      const supabaseUrl =
        process.env.SUPABASE_URL ||
        process.env.NEXT_PUBLIC_SUPABASE_URL ||
        "https://itxgmaagcghlwbxlnjoq.supabase.co";
      const supabaseAnonKey =
        process.env.SUPABASE_ANON_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0eGdtYWFnY2dobHdieGxuam9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MzY3NTMsImV4cCI6MjA2MzUxMjc1M30.JW662lq-KRuPsW9wSqT7BaQcP1ej1v6wP5IWign9Qpw";

      const supabase = createClient(supabaseUrl, supabaseAnonKey, {
        global: {
          headers: {
            Authorization: authHeader,
          },
        },
      });

      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        console.log("Bearer token authentication failed:", error);
        return null;
      }

      // Ensure user exists in our database
      await ensureUserExists(user.id, user.email!);

      return {
        id: user.id,
        email: user.email!,
      };
    }

    // Fall back to cookie-based authentication (for server components)
    const supabase = await createSupabaseServerClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return null;
    }

    // Ensure user exists in our database
    await ensureUserExists(user.id, user.email!);

    return {
      id: user.id,
      email: user.email!,
    };
  } catch (error) {
    console.error("Error getting auth user:", error);
    return null;
  }
}

export async function requireAuth(request: NextRequest): Promise<AuthUser> {
  const user = await getAuthUser(request);

  if (!user) {
    throw new Error("Authentication required");
  }

  return user;
}

async function ensureUserExists(userId: string, email: string): Promise<void> {
  try {
    await prisma.user.upsert({
      where: { id: userId },
      update: { email },
      create: {
        id: userId,
        email,
      },
    });
  } catch (error) {
    console.error("Error ensuring user exists:", error);
    // Don't throw here, as this is not critical for auth
  }
}

export function createAuthResponse(message: string, status: number = 401) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
