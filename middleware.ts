import NextAuth from 'next-auth';
import { getToken } from 'next-auth/jwt';
import authConfig from './auth.config';
import { privateRoutes } from './routes';

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  console.log('req', req);
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  console.log('token', token);
  const role = token?.role;
  console.log('role', role);
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;
  const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);
  const isApiRoute = nextUrl.pathname.includes('/api');
  const isAuthRoute = nextUrl.pathname.includes('/auth');
  const isAdminRoute = nextUrl.pathname.startsWith('/dashboard');
  console.log('isAdmin', isAdminRoute);

  if (isApiRoute) {
    return;
  }

  if (isLoggedIn && isAuthRoute) {
    return Response.redirect(`${NEXT_PUBLIC_BASE_URL}`);
  }

  if (isAuthRoute && !isLoggedIn) {
    return;
  }

  if (isPrivateRoute && !isLoggedIn) {
    return Response.redirect(`${NEXT_PUBLIC_BASE_URL}/auth/login`);
  }

  if (isAdminRoute) {
    if (role !== 'ADMIN') {
      return Response.redirect(`${NEXT_PUBLIC_BASE_URL}`);
    }
  }
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
