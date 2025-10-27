'use client';
import { useCartStore } from '@/store/store';
import { Prisma } from '@prisma/client';
import { Heart, ShoppingBasket } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import removeMarkdown from 'remove-markdown';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';

type ProductCardProps = {
  product: Prisma.CaseVariationGetPayload<{ include: { case: true } }>;
};
const ProductCard = ({ product }: ProductCardProps) => {
  const { cartItems, addToCart } = useCartStore();
  const isProductInCart = cartItems.some((item) => item.id === product.id);

  return (
    <Card className='group flex flex-col border-slate-200 bg-white origin-top transition-transform duration-300 hover:scale-y-[1.07] hover:z-10 hover:shadow-green-200'>
      <CardHeader>
        <CardTitle className='text-center text-slate-800'>{product.case.name} </CardTitle>
      </CardHeader>
      <CardContent>
        <Link
          className='flex flex-col items-center gap-2 pt-2 '
          href={`/product-details/${product.case.id}?color=${product.color}`}
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
            {removeMarkdown(product.case.description)}
          </p>
        </Link>
      </CardContent>

      <CardFooter className='flex flex-col items-center gap-3 pt-4'>
        <p className='text-lg font-semibold text-red-500'>{product.price} ₴</p>
        <p className='rounded-md bg-green-500/90 px-1.5 py-0.5 text-xs font-medium text-white'>
          В наявності
        </p>
        <div className='flex w-full flex-col items-center gap-2 '>
          {isProductInCart ? (
            <Link href={'/cart'}>
              <ShoppingBasket className='text-green-600 cursor-pointer hover:opacity-80' />
            </Link>
          ) : (
            <Button
              className='w-1/2 bg-green-600 hover:bg-green-600/90 cursor-pointer'
              onClick={() =>
                addToCart({
                  id: product.id,
                  caseId: product.caseId,
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
            <Heart size={20} className='text-green-600 cursor-pointer hover:opacity-80' />
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};
export default ProductCard;
