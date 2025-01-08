import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// Define role-based route access

const publicRoutes = [
  '/',
  '/login',
  '/register',
  '/api/auth',
  '/api/trpc',
  '/_next',
  '/favicon.ico',
]

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const { pathname } = request.nextUrl

  // Check if it's a public route
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    // If user is authenticated and trying to access auth pages, redirect to dashboard
    if (token && (pathname === '/login' || pathname === '/register')) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    return NextResponse.next()
  }

  // No token, redirect to login
  if (!token) {
    const searchParams = new URLSearchParams({
      callbackUrl: request.url,
    })
    return NextResponse.redirect(
      new URL(`/login?${searchParams.toString()}`, request.url)
    )
  }

  // Get user role and allowed routes


  // Check if user has access to the requested path


  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}