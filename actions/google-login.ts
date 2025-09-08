import { AuthError } from 'next-auth';
import { signIn } from 'next-auth/react';

export async function googleAuthenticate() {
  try {
    await signIn('google', {
      prompt: 'select_account',
      callbackUrl: '/',
    });
  } catch (error) {
    if (error) {
      if (error instanceof AuthError) {
        return 'google log in failed';
      }
    }
    throw error;
  }
}
