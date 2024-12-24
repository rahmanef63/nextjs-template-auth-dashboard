import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { ROUTES } from '../constants/routes';

export async function withAuth(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuthPage = request.nextUrl.pathname.startsWith(ROUTES.auth.login) || 
                    request.nextUrl.pathname.startsWith(ROUTES.auth.register);

  if (isAuthPage) {
    if (token) {
      return NextResponse.redirect(new URL(ROUTES.dashboard.root, request.url));
    }
    return NextResponse.next();
  }

  if (!token && request.nextUrl.pathname.startsWith(ROUTES.dashboard.root)) {
    return NextResponse.redirect(new URL(ROUTES.auth.login, request.url));
  }

  return NextResponse.next();
}