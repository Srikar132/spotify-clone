import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function middleware(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    console.log("In middleware : " , session);

    // If no session, allow access to public routes
    if (!session) {
        return NextResponse.next();
    }

    const role = session?.user.role;
    const { pathname } = request.nextUrl;

    // Admin role - redirect to dashboard if not already there
    if (role === "admin" && !pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // User role - redirect to home if trying to access admin routes
    if (role === "user" && pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // Allow the request to continue
    return NextResponse.next();
}

// Apply to all routes except static files, API routes, and public assets
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public assets (songs, images, etc.)
         */
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)",
    ],
};