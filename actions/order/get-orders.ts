'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export const getOrders = async () => {
  const session = await auth();
  const userId = session?.user?.userId;
  const orders = await prisma.order.findMany({
    where: {
      userId,
    },
    include: {
      items: {
        include: {
          caseVariation: {
            include: {
              case: true,
            },
          },
        },
      },
    },
  });
  return orders;
};
