import { AuthError } from 'next-auth';
import { signIn } from 'next-auth/react';

export async function googleAuthenticate() {
  try {
    await signIn('google');
  } catch (error) {
    if (error) {
      if (error instanceof AuthError) {
        return 'google log in failed';
      }
    }
    throw error;
  }
}
