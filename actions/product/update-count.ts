'use server';

import { prisma } from '@/lib/prisma';

export const updateViews = async (id: string) => {
  await prisma.case.updateMany({
    where: {
      id,
    },
    data: {
      views: {
        increment: 1,
      },
    },
  });
};
