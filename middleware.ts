import NextAuth from 'next-auth';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import authConfig from './auth.config';
import { privateRoutes } from './routes';

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const { nextUrl } = req;

  const isLoggedIn = !!token;
  const role = token?.role;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || nextUrl.origin;

  const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);
  const isAuthRoute = nextUrl.pathname.startsWith('/auth');
  const isAdminRoute = nextUrl.pathname.startsWith('/dashboard');

  // 🔹 Пропускаем API
  if (nextUrl.pathname.startsWith('/api')) return;

  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL('/', baseUrl));
  }

  if (isPrivateRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/auth/login', baseUrl));
  }

  if (isAdminRoute && role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/', baseUrl));
  }
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next|api).*)', '/'],
};
