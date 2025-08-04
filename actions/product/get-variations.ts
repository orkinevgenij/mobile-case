'use server';
import { prisma } from '@/lib/prisma';

export const getVariationsByProductId = async (productId: string) => {
  const variations = await prisma.caseVariation.findMany({
    where: {
      caseId: productId,
    },
    include: {
      case: true,
    },
  });
  return variations;
};

export const getSearchVariations = async (name?: string) => {
  const products = await prisma.caseVariation.findMany({
    include: {
      case: true,
    },
    where: {
      case: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    },
  });
  return products;
};
