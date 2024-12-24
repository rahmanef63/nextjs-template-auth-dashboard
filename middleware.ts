import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  // Get the token from the cookies
  const token = request.cookies.get('auth-token')?.value;

  // Check if the current path is a public route
  const isPublicRoute = request.nextUrl.pathname.startsWith('/login') || 
                       request.nextUrl.pathname.startsWith('/register') ||
                       request.nextUrl.pathname.startsWith('/api/auth');

  // If it's a public route and user is authenticated, redirect to appropriate dashboard
  if (isPublicRoute && token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      
      // Redirect based on user role
      switch (payload.role) {
        case 'ADMIN':
          return NextResponse.redirect(new URL('/admin', request.url));
        case 'MANAGER':
          return NextResponse.redirect(new URL('/manager', request.url));
        case 'STAFF':
          return NextResponse.redirect(new URL('/staff', request.url));
        default:
          return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    } catch {
      // If token is invalid, continue to public route
      return NextResponse.next();
    }
  }

  // If it's a public route and user is not authenticated, allow access
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // For protected routes, check if user is authenticated
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    // Check role-based access
    const pathname = request.nextUrl.pathname;
    if (pathname.startsWith('/admin') && payload.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    if (pathname.startsWith('/manager') && payload.role !== 'MANAGER') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    if (pathname.startsWith('/staff') && payload.role !== 'STAFF') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    // If token is invalid, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (authentication API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|public).*)',
  ],
};