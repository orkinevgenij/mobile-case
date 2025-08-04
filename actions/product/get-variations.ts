'use server';
import { prisma } from '@/lib/prisma';
import { updateViews } from './update-count';

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
