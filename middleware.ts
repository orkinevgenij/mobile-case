// middleware.ts
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { privateRoutes } from './routes';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!token;
  const role = token?.role;
  const baseUrl = process.env.BASE_URL || '';

  const isPrivateRoute = privateRoutes.includes(pathname);
  const isAdminRoute = pathname.startsWith('/dashboard');
  const isAuthRoute = pathname.startsWith('/auth');
  const isApiRoute = pathname.startsWith('/api');

  if (isApiRoute) {
    return NextResponse.next();
  }

  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(`${baseUrl}/`);
  }

  if (!isLoggedIn && (isPrivateRoute || isAdminRoute)) {
    return NextResponse.redirect(`${baseUrl}/auth/login`);
  }

  if (isAdminRoute && role !== 'ADMIN') {
    return NextResponse.redirect(`${baseUrl}/`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
