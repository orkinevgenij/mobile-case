'use server';

import { prisma } from '@/lib/prisma';
import { FilterSchemaType } from '@/schemas/FilterSchema';

export const filteredProduct = async (filters: FilterSchemaType) => {
  const { brand, series, model } = filters;
  const product = await prisma.caseVariation.findMany({
    where: {
      case: {
        modelSmartphone: {
          id: model,
          series: {
            id: series,
            brandId: brand,
          },
        },
      },
    },
    include: {
      case: {
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
      },
    },
  });
  return product;
};
