'use server';

import { prisma } from '@/lib/prisma';

export const getNewProduct = async () => {
  const products = await prisma.case.findMany({
    take: 10,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      caseVariations: true,
    },
  });
  return products;
};
