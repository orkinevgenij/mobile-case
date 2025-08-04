'use client';
import { Prisma } from '@prisma/client';
import Image from 'next/image';
import { Card } from '../ui/card';

type OrderCardProps = {
  orders: Prisma.OrderGetPayload<{
    include: {
      items: {
        include: {
          caseVariation: {
            include: {
              case: true;
            };
          };
        };
      };
    };
  }>;
};

const OrderCard = ({ orders }: OrderCardProps) => {
  return (
    <Card className='p-4 text-gray-700 space-y-4 rounded-sm'>
      <div className='flex justify-between items-center'>
        <p className='text-xl font-semibold'>Замовлення № {orders.number}</p>
        <p className='bg-green-500 text-sm px-2 py-1 text-white rounded-md'>Очікує відправлення</p>
      </div>

      {orders.items.map((item) => (
        <div key={item.id} className='flex items-center justify-between border-t pt-4'>
          <div className='flex items-center gap-4'>
            <Image
              src={item.caseVariation.imgUrl || ''}
              alt='Товар'
              width={70}
              height={70}
              className='object-cover rounded'
            />
            <div>
              <p className='text-sm text-gray-800 font-medium'>{item.caseVariation.case.name}</p>
              <p className='text-sm text-gray-500'>
                <span className='text-gray-800'>{item.caseVariation.price} ₴</span> x
                <span className='text-gray-800'>{item.quantity} од.</span>
              </p>
            </div>
          </div>
          <p className='font-bold text-gray-800'>{item.caseVariation.price * item.quantity} ₴</p>
        </div>
      ))}
      <div className='flex justify-between'>
        <p>Разом</p>
        <p className='font-bold text-gray-800'>{orders.totalAmount} ₴</p>
      </div>
    </Card>
  );
};

export default OrderCard;
