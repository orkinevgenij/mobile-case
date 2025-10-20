import NextAuth from 'next-auth';
import { getToken } from 'next-auth/jwt';
import authConfig from './auth.config';
import { privateRoutes } from './routes';

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const { nextUrl } = req;

  const isLoggedIn = !!req.auth;
  const role = token?.role;
  const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;
  const pathname = nextUrl.pathname;

  const isPrivateRoute = privateRoutes.includes(pathname);
  const isApiRoute = pathname.startsWith('/api');
  const isAuthRoute = pathname.startsWith('/auth');
  const isAdminRoute = pathname.startsWith('/dashboard');

  if (isApiRoute) return;

  if (isLoggedIn && isAuthRoute) {
    return Response.redirect(`${NEXT_PUBLIC_BASE_URL}`);
  }

  if (isPrivateRoute && !isLoggedIn) {
    return Response.redirect(`${NEXT_PUBLIC_BASE_URL}/auth/login`);
  }

  if (isAdminRoute) {
    if (isLoggedIn && !role && token?.email) {
      return;
    }

    if (role !== 'ADMIN') {
      return Response.redirect(`${NEXT_PUBLIC_BASE_URL}`);
    }
  }
});
