'use client';
import { removeOrder, updateStatusOrder } from '@/actions/order/orders';
import { Prisma } from '@prisma/client';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import { Trash } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card } from './ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { toast } from 'react-toastify';
const statuses = [
  {
    status: 'PROCESSING',
    label: 'Очікує відправлення',
  },
  {
    status: 'DELIVERED',
    label: 'Доставлено',
  },
  {
    status: 'COMPLETED',
    label: 'Завершено',
  },
  {
    status: 'CANCELLED',
    label: 'Скасовано',
  },
];
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
  const session = useSession();
  const router = useRouter();

  const changeUpdate = async (id: string, status: string) => {
    const order = await updateStatusOrder(id, status);
    if (order.success) {
      toast.success('Замовлення оновлено');
      router.refresh();
    }
    if (!order.success) {
      toast.error('Помилка під час оновлення замовлення');
    }
  };

  const handleDeleteOrder = async (id: string) => {
    const isConfirmed = confirm('Ви впевнені, що хочете видалити це замовлення?');
    if (!isConfirmed) return;
    const order = await removeOrder(id);
    if (order.success) {
      toast.success('Замовлення видалено');
      router.refresh();
    }
    if (!order.success) {
      toast.error('Помилка під час оновлення замовлення');
    }
  };
  return (
    <Card className='p-4 text-gray-700 space-y-4 rounded-sm'>
      <div className='flex gap-2 flex-wrap justify-between items-center'>
        <div>
          <p className='text-xl font-semibold'>Замовлення № {orders.number}</p>
          <p className='text-sm'>
            від{' '}
            {format(orders.createdAt, 'dd MMMM yyyy', {
              locale: uk,
            })}
          </p>
        </div>

        <p className='bg-green-500 text-sm px-2 py-1 text-white rounded-md'>
          {statuses.find((status) => status.status === orders.status)?.label}
        </p>
        {session.data?.user.role === 'ADMIN' && (
          <Select
            defaultValue={orders.status}
            onValueChange={(value) => changeUpdate(orders.id, value)}
          >
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Виберіть статус' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Статус</SelectLabel>
                {statuses.map((status) => (
                  <SelectItem key={status.label} value={status.status}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
        {session.data?.user.role === 'ADMIN' && (
          <Trash
            size={30}
            onClick={() => handleDeleteOrder(orders.id)}
            className='cursor-pointer opacity-70 hover:opacity-100'
          />
        )}
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
