'use server';

import { prisma } from '@/lib/prisma';

export const searchProducts = async (name: string) => {
  const product = await prisma.case.findMany({
    where: {
      name: {
        contains: name,
        mode: 'insensitive',
      },
    },
  });
  return product;
};
