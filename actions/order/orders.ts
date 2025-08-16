'use server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { OrderStatus } from '@prisma/client';

export const getOrders = async (filter?: 'asc' | 'desc') => {
  const session = await auth();
  const userId = session?.user?.userId;
  const orders = await prisma.order.findMany({
    where: {
      userId: session?.user.role === 'ADMIN' ? undefined : userId,
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
    orderBy: {
      createdAt: filter || 'desc',
    },
  });
  return orders;
};
export const updateStatusOrder = async (id: string, status: string) => {
  await prisma.order.update({
    where: {
      id,
    },
    data: {
      status: status as OrderStatus,
    },
  });
};
export const removeOrder = async (id: string) => {
  await prisma.order.delete({
    where: {
      id,
    },
  });
};
