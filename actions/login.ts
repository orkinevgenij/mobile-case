'use server';
import { signIn } from '@/auth';
import { prisma } from '@/lib/prisma';
import { LoginSchema, LoginSchemaType } from '@/schemas/LoginSchema';
import { AuthError } from 'next-auth';

export const login = async (data: LoginSchemaType) => {
  const validatedData = LoginSchema.parse(data);
  if (!validatedData) {
    return {
      error: 'Invalid input data',
    };
  }
  const { email, password } = validatedData;

  const userExists = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  if (!userExists || !userExists.password || !userExists.email) {
    return {
      error: 'User not found',
    };
  }
  try {
    await signIn('credentials', {
      email: userExists.email,
      password: password,
      redirectTo: 'http://localhost:3000/dashboard',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid Credentials' };
        default:
          return { error: 'Something went wrong' };
      }
    }
    throw error;
  }
  return {
    success: 'User logged in successfully',
  };
};
