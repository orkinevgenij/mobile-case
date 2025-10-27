import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth, { DefaultSession } from 'next-auth';
import authConfig from './auth.config';
import { prisma } from './lib/prisma';
import { getUserByEmail } from './lib/user';
declare module 'next-auth' {
  interface Session {
    user: {
      role: 'USER' | 'ADMIN';
      userId: string;
    } & DefaultSession['user'];
  }
}
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account }) {
      return true;
    },
    async jwt({ token }) {
      if (!token.email) return token;
      const user = await getUserByEmail(token.email);
      if (!user) return token;

      token.role = user.role;
      token.userId = user.id;
      return token;
    },
    async session({ token, session }) {
      if (token.role) {
        session.user.role = token.role as 'USER' | 'ADMIN';
      }
      if (token.userId) {
        session.user.userId = token.userId as string;
      }
      return session;
    },
  },
});
