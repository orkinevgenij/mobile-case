'use server';

import { prisma } from '@/lib/prisma';

export const getPopularProduct = async () => {
  const products = await prisma.case.findMany({
    take: 10,
    orderBy: {
      views: 'desc',
    },
    include: {
      caseVariations: true,
    },
  });
  return products;
};
