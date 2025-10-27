'use server';

import { auth } from '@/auth';
import { getErrorMessage } from '@/lib/error-message';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const deleteVariation = async (variationId: string) => {
  const isAuth = await auth();
  const isAdmin = isAuth?.user?.role === 'ADMIN';
  if (!isAdmin) {
    return {
      error: 'Access denied',
    };
  }
  try {
    await prisma.caseVariation.delete({
      where: {
        id: variationId,
      },
    });
    revalidatePath('/dashboard/product-variations/[id]');
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }
};
