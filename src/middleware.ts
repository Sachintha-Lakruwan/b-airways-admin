// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    // Define the admin path prefix to protect
    const adminPath = "/admin";

    // Check if the request path starts with the admin path
    if (request.nextUrl.pathname.startsWith(adminPath)) {
        // Check if the 'admin_token' cookie is present
        const token = request.cookies.get("admin_token");

        // If the token is missing, redirect to the admin login page
        if (!token) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
    }

    // Allow the request to proceed if the token is present or if it's not an admin route
    return NextResponse.next();
}

// Apply the middleware only to specific routes that start with /admin
export const config = {
    matcher: ["/admin/:path*"],
};
