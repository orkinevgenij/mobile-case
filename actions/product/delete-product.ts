'use server';

import { auth } from '@/auth';
import { getErrorMessage } from '@/lib/error-message';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const removeProduct = async (id: string) => {
  const isAuth = await auth();
  const isAdmin = isAuth?.user?.role === 'ADMIN';
  if (!isAdmin) {
    return {
      error: 'Access denied',
    };
  }
  try {
    await prisma.case.delete({
      where: {
        id,
      },
    });
    revalidatePath('/dashboard/all-products/[id]');
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }
};
