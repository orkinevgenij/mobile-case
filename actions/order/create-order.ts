'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

type CartItemsType = {
  id: string;
  quantity: number;
};

export const createOrder = async (cartItems: CartItemsType[]) => {
  const number = Date.now() + Math.floor(Math.random() * 1000);
  const session = await auth();
  const userId = session?.user?.userId;
  if (!userId) {
    return {
      error: 'User not authenticated',
    };
  }
  const variationId = cartItems.map((item) => item.id);

  const variations = await prisma.caseVariation.findMany({
    where: { id: { in: variationId } },
  });
  if (variations.length !== cartItems.length) {
    return {
      error: 'Some products not found',
    };
  }

  const totalAmount = cartItems.reduce((sum, item) => {
    const variation = variations.find((v) => v.id === item.id);
    if (!variation) {
      throw new Error(`Product with ID ${item.id} not found`);
    }
    return sum + variation.price * item.quantity;
  }, 0);

  const order = await prisma.order.create({
    data: {
      totalAmount,
      number,
      userId,
      items: {
        create: cartItems.map((item) => {
          const variation = variations.find((v) => v.id === item.id);
          if (!variation) {
            throw new Error(`Product with ID ${item.id} not found`);
          }
          return {
            quantity: item.quantity,
            caseVariation: {
              connect: { id: variation.id },
            },
          };
        }),
      },
    },
  });
  return order;
};
