import NextAuth from 'next-auth';
import { getToken } from 'next-auth/jwt';
import authConfig from './auth.config';
import { privateRoutes } from './routes';

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const role = token?.role;
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;
  const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);
  const isApiRoute = nextUrl.pathname.includes('/api');
  const isAuthRoute = nextUrl.pathname.includes('/auth');
  const isAdminRoute = nextUrl.pathname.startsWith('/dashboard');
  if (isApiRoute) {
    return;
  }

  if (isLoggedIn && isAuthRoute) {
    return Response.redirect(`${NEXT_PUBLIC_BASE_URL}/`);
  }

  if (isAuthRoute && !isLoggedIn) {
    return;
  }

  if (isPrivateRoute && !isLoggedIn) {
    return Response.redirect(`${NEXT_PUBLIC_BASE_URL}/auth/login`);
  }

  if (isAdminRoute && token && role !== 'ADMIN') {
    return Response.redirect(`${NEXT_PUBLIC_BASE_URL}`);
  }
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
