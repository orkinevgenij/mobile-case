import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { privateRoutes } from './routes';

export async function middleware(req: any) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!token;
  const role = token?.role;
  const baseUrl = process.env.BASE_URL!;

  const isPrivateRoute = privateRoutes.includes(pathname);
  const isAdminRoute = pathname.startsWith('/dashboard');

  if (isPrivateRoute && !isLoggedIn) {
    return NextResponse.redirect(`${baseUrl}/auth/login`);
  }

  if (isAdminRoute && role !== 'ADMIN') {
    return NextResponse.redirect(`${baseUrl}`);
  }

  if (isLoggedIn && pathname.startsWith('/auth')) {
    return NextResponse.redirect(`${baseUrl}`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
