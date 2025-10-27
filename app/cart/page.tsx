'use client';
import { createOrder } from '@/actions/order/create-order';
import CartEmpty from '@/components/CartEmpty';
import Container from '@/components/Container';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCartStore } from '@/store/store';
import { ArrowLeft, Minus, Plus, Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Cart() {
  const router = useRouter();
  const { cartItems, removeCartItem, minusCartItem, plusCartItem, clearCartItems } = useCartStore();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const addOrder = async () => {
    try {
      await createOrder(
        cartItems.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
      );
    } catch (error) {
      console.log(error);
    }

    clearCartItems();
    router.push('/orders');
  };
  return (
    <Container>
      {cartItems.length === 0 ? (
        <CartEmpty />
      ) : (
        <div className='flex flex-col gap-4'>
          {cartItems.map((item) => (
            <Card
              key={item.id}
              className='flex flex-row  items-center justify-between text-gray-600 px-4'
            >
              <div className='relative'>
                <Image
                  src={item.imgUrl || ''}
                  alt={item.name}
                  width={50}
                  height={50}
                  objectFit='contain'
                />
              </div>
              <div className='flex flex-col'>
                <Link href={`/product-details/${item.caseId}?color=${item.color}`} className='mb-2'>
                  {item.name}
                </Link>
                <div className='flex items-center gap-2 rounded-sm border-1 border-gray-500 px-4 py-1.5'>
                  <Minus
                    className='cursor-pointer text-black'
                    onClick={() => minusCartItem(item.id)}
                  />
                  <span>{item.quantity}</span>
                  <Plus
                    className='cursor-pointer text-black'
                    onClick={() => plusCartItem(item.id)}
                  />
                </div>
              </div>
              <p className='font-bold'>
                {item.price} ₴ * {item.quantity}
              </p>
              <Trash
                size={30}
                className='cursor-pointer opacity-70 hover:opacity-100'
                onClick={() => removeCartItem(item.id)}
              />
            </Card>
          ))}

          <div className='flex flex-col justify-between border-1 rounded-xl px-4 py-4 gap-4 shadow-sm text-gray-600'>
            <div className='flex items-center justify-end gap-2 '>
              <span className='text-sm'>Всього:</span>
              <span className='font-bold'>{total} грн</span>
            </div>
            <div className='flex flex-wrap justify-between'>
              <Link href='/' className='inline-flex text-xl items-center gap-2 hover:text-gray-900'>
                <ArrowLeft />
                Повернутися до покупок
              </Link>
              <Button
                onClick={addOrder}
                size='lg'
                className='w-fit text-xl bg-green-600 hover:bg-green-600/90 cursor-pointer my-2 md'
              >
                Оформити замовлення
              </Button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
