import NextAuth, { NextAuthRequest } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import authConfig from './auth.config';
import { privateRoutes } from './routes';

const { auth } = NextAuth(authConfig);

export default auth(async (req: NextAuthRequest) => {
  console.log('req URL', req.url);
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  console.log('token', token);
  const role = token?.role;
  console.log('role', role);
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const baseUrl = process.env.BASE_URL;
  const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);
  const isApiRoute = nextUrl.pathname.includes('/api');
  const isAuthRoute = nextUrl.pathname.includes('/auth');
  const isAdminRoute = nextUrl.pathname.startsWith('/dashboard');
  console.log('isAdmin', isAdminRoute);

  if (isApiRoute) {
    return;
  }

  if (isLoggedIn && isAuthRoute) {
    return Response.redirect(`${baseUrl}`);
  }

  if (isAuthRoute && !isLoggedIn) {
    return;
  }

  if (isPrivateRoute && !isLoggedIn) {
    return Response.redirect(`${baseUrl}/auth/login`);
  }

  if (isAdminRoute) {
    if (role !== 'ADMIN') {
      return Response.redirect(`${baseUrl}`);
    }
  }
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
