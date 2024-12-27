import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { ROUTES } from 'shared/constants/routes'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || 
                    request.nextUrl.pathname.startsWith('/register');
  const isApiAuthRoute = request.nextUrl.pathname.startsWith('/api/auth');
  const isPublicRoute = request.nextUrl.pathname === '/';

  // Allow public routes and auth API routes
  if (isPublicRoute || isApiAuthRoute) {
    return NextResponse.next();
  }

  // Redirect authenticated users away from auth pages
  if (isAuthPage) {
    if (token) {
      return NextResponse.redirect(new URL(ROUTES.dashboard.root, request.url));
    }
    return NextResponse.next();
  }

  // Protect all other routes
  if (!token) {
    const redirectUrl = new URL(ROUTES.auth.login, request.url);
    redirectUrl.searchParams.set('callbackUrl', request.url);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
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