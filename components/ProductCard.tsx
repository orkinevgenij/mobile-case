'use client';
import { useCartStore } from '@/store/store';
import { Prisma } from '@prisma/client';
import { Heart, ShoppingBasket } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';

type ProductCardProps = {
  product: Prisma.CaseVariationGetPayload<{ include: { case: true } }>;
};
const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();
  const { cartItems, addToCart } = useCartStore();

  const isProductInCart = cartItems.some((item) => item.id === product.id);

  return (
    <Card className='group flex flex-col border-slate-200 bg-white origin-top transition-transform duration-300 hover:scale-y-[1.07] hover:z-10 hover:shadow-orange-200'>
      <CardHeader>
        <CardTitle className='text-center text-slate-800'>{product.case.name} </CardTitle>
      </CardHeader>
      <CardContent
        className='flex flex-col items-center gap-2 pt-2 cursor-pointer'
        onClick={() => router.push(`/product-details/${product.case.id}?color=${product.color}`)}
      >
        <div className='relative h-[200px] w-[200px]'>
          <Image
            src={product.imgUrl || ''}
            alt={product.case.name}
            fill
            className='object-contain transition-transform duration-300 group-hover:scale-110'
          />
        </div>
        <p className='line-clamp-3 text-center text-sm text-slate-500 transition-colors duration-200 group-hover:text-slate-900'>
          {product.case.description}
        </p>
      </CardContent>

      <CardFooter className='flex flex-col items-center gap-3 pt-4'>
        <p className='text-lg font-semibold text-red-500'>{product.price} ₴</p>
        <p className='rounded-md bg-green-500/90 px-1.5 py-0.5 text-xs font-medium text-white'>
          В наявності
        </p>
        <div className='flex w-full flex-col items-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
          {isProductInCart ? (
            <ShoppingBasket
              className='text-orange-600 cursor-pointer hover:opacity-80'
              onClick={() => router.push('/cart')}
            />
          ) : (
            <Button
              className='w-1/2 bg-green-600 hover:bg-green-600/90 cursor-pointer'
              onClick={() =>
                addToCart({
                  id: product.id,
                  name: product.case.name,
                  price: product.price,
                  imgUrl: product.imgUrl || '',
                  color: product.color,
                  quantity: 1,
                })
              }
            >
              Купити
            </Button>
          )}

          <Link
            href='#'
            className='flex items-center gap-1 text-xs text-slate-500 transition-colors  hover:text-slate-800'
          >
            <Heart size={20} className='text-orange-600 cursor-pointer hover:opacity-80' />
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};
export default ProductCard;
