'use server';
import { prisma } from '@/lib/prisma';

export const getProductById = async (id: string) => {
  const product = await prisma.case.findUnique({
    where: {
      id,
    },
    include: {
      modelSmartphone: {
        include: {
          series: {
            include: {
              brand: true,
            },
          },
        },
      },
    },
  });
  return product;
};
