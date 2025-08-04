'use server';

import { getErrorMessage } from '@/lib/error-message';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const removeProduct = async (id: string) => {
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
