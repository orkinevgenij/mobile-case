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
  const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || nextUrl.origin;
  console.log(NEXT_PUBLIC_BASE_URL);

  const isPrivateRoute = privateRoutes.some((r) => nextUrl.pathname.startsWith(r));
  console.log(isPrivateRoute);
  const isAuthLogin = nextUrl.pathname === '/auth/login' || nextUrl.pathname === '/auth/register';
  const isAdminRoute = nextUrl.pathname.startsWith('/dashboard');

  if (nextUrl.pathname.startsWith('/api')) return;

  if (isLoggedIn && isAuthLogin) {
    return NextResponse.redirect(new URL('/', NEXT_PUBLIC_BASE_URL));
  }

  if (isPrivateRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/auth/login', NEXT_PUBLIC_BASE_URL));
  }

  if (isAdminRoute && role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/', NEXT_PUBLIC_BASE_URL));
  }
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next|api).*)', '/'],
};
