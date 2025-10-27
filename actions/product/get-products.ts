'use server';
import { prisma } from '@/lib/prisma';

export const getAllProducts = async (name?: string) => {
  const products = await prisma.case.findMany({
    include: {
      caseVariations: true,
    },
    where: {
      name: {
        contains: name,
        mode: 'insensitive',
      },
    },
  });
  return products;
};
