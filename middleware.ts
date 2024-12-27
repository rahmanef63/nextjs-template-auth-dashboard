import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { ROUTES } from 'shared/constants/routes'

// Define role-based route access
const roleRoutes = {
  ADMIN: ['/admin', '/dashboard', '/manager', '/staff', '/client'], // Admin can access everything
  MANAGER: ['/manager', '/dashboard', '/staff', '/client'], // Manager can access manager, staff, and client areas
  STAFF: ['/staff', '/dashboard', '/client'], // Staff can access staff and client areas
  CLIENT: ['/client', '/dashboard'], // Client can only access their dashboard
}

const publicRoutes = ['/', '/login', '/register', '/api/auth']

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const path = request.nextUrl.pathname

  // Allow public routes and auth API routes
  if (publicRoutes.some(route => path.startsWith(route))) {
    // If user is authenticated and trying to access auth pages, redirect to dashboard
    if (token && (path.startsWith('/login') || path.startsWith('/register'))) {
      // Redirect to appropriate dashboard based on role
      const userRole = token.role?.name as keyof typeof roleRoutes
      const defaultRoute = roleRoutes[userRole][0]
      return NextResponse.redirect(new URL(defaultRoute, request.url))
    }
    return NextResponse.next()
  }

  // Protect all other routes
  if (!token) {
    const redirectUrl = new URL(ROUTES.auth.login, request.url)
    redirectUrl.searchParams.set('callbackUrl', request.url)
    return NextResponse.redirect(redirectUrl)
  }

  // Check role-based access
  const userRole = token.role?.name as keyof typeof roleRoutes
  const allowedRoutes = roleRoutes[userRole] || []

  // Check if user has access to the requested path
  const hasAccess = allowedRoutes.some(route => path.startsWith(route))
  if (!hasAccess) {
    // Redirect to the first allowed route for their role
    return NextResponse.redirect(new URL(allowedRoutes[0], request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api/auth (authentication API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|public).*)',
  ],
}