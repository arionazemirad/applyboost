import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Use the same environment variable fallback logic
  const supabaseUrl =
    process.env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://itxgmaagcghlwbxlnjoq.supabase.co";
  const supabaseAnonKey =
    process.env.SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0eGdtYWFnY2dobHdieGxuam9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MzY3NTMsImV4cCI6MjA2MzUxMjc1M30.JW662lq-KRuPsW9wSqT7BaQcP1ej1v6wP5IWign9Qpw";

  let supabaseResponse = NextResponse.next({
    request,
  });

  try {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    });

    // Refresh session if expired - required for Server Components
    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log(
      "Middleware - Path:",
      request.nextUrl.pathname,
      "User:",
      user ? `authenticated (${user.id})` : "not authenticated"
    );

    // Protect dashboard routes
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
      if (!user) {
        // Check if this might be a recent sign-in by looking for auth-related cookies
        const authCookies = request.cookies
          .getAll()
          .filter(
            (cookie) =>
              cookie.name.includes("supabase") || cookie.name.includes("auth")
          );

        console.log("🍪 Auth cookies found:", authCookies.length);

        if (authCookies.length > 0) {
          console.log("🔄 Auth cookies present, allowing dashboard access");
          // Allow access if auth cookies are present (recent sign-in)
          return supabaseResponse;
        }

        console.log("🚫 No user and no auth cookies, redirecting to sign-in");
        // Redirect to sign-in page if not authenticated
        const redirectUrl = new URL("/signin", request.url);
        return NextResponse.redirect(redirectUrl);
      }
    }

    // Temporarily disable this redirect to fix sign-in flow
    // TODO: Re-enable with proper timing handling
    // if (
    //   user &&
    //   (request.nextUrl.pathname === "/signin" ||
    //     request.nextUrl.pathname === "/signup")
    // ) {
    //   console.log("Middleware - Redirecting authenticated user to dashboard");
    //   const redirectUrl = new URL("/dashboard", request.url);
    //   return NextResponse.redirect(redirectUrl);
    // }
  } catch (error) {
    console.error("Supabase middleware error:", error);

    // For API routes, return error response
    if (request.nextUrl.pathname.startsWith("/api/")) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Authentication service error",
            code: "AUTH_SERVICE_ERROR",
          },
        },
        { status: 500 }
      );
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
