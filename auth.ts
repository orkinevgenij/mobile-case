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

    async jwt({ token, user }) {
      // 🔹 1️⃣
      if (user) {
        const u = user as any;
        token.email = u.email;
        token.role = u.role;
        token.userId = u.id;
        return token;
      }

      if (token.email) {
        const dbUser = await getUserByEmail(token.email);
        if (dbUser) {
          token.role = dbUser.role;
          token.userId = dbUser.id;
        }
      }

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
