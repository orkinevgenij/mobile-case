'use client';
import { useCartStore } from '@/store/store';
import { Prisma } from '@prisma/client';
import { Heart, ShoppingBasket } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Container from './Container';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';

type PopularProductTabsProps = {
  popularProducts: Prisma.CaseGetPayload<{ include: { caseVariations: true } }>[];
};
const PopularProduct = ({ popularProducts }: PopularProductTabsProps) => {
  const { cartItems, addToCart } = useCartStore();

  return (
    <Container>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {popularProducts?.map((product) => (
          <Card
            key={product.id}
            className='group flex flex-col border-slate-200 bg-white origin-top transition-transform duration-300 hover:scale-y-[1.07] hover:z-10 hover:shadow-green-200'
          >
            <CardHeader>
              <CardTitle className='text-center text-slate-800'>{product.name} </CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col items-center gap-2 pt-2 cursor-pointer'>
              <Link
                className='flex flex-col items-center gap-2 pt-2'
                href={`/product-details/${product.id}?color=${product.caseVariations[0].color}`}
              >
                <div className='relative h-[200px] w-[200px]'>
                  <Image
                    src={product.caseVariations[0]?.imgUrl || ''}
                    alt={product.caseVariations[0]?.color}
                    fill
                    className='object-contain transition-transform duration-300 group-hover:scale-110'
                  />
                </div>
                <p className='line-clamp-3 text-center text-sm text-slate-500 transition-colors duration-200 group-hover:text-slate-900'>
                  {product.description}
                </p>
              </Link>
            </CardContent>

            <CardFooter className='flex flex-col items-center gap-3 pt-4'>
              <p className='text-lg font-semibold text-red-500'>
                {product.caseVariations[0]?.price} ₴
              </p>
              <p className='rounded-md bg-green-500/90 px-1.5 py-0.5 text-xs font-medium text-white'>
                В наявності
              </p>
              <div className='flex w-full flex-col items-center gap-2 '>
                {cartItems.some((item) => item.id === product.caseVariations[0].id) ? (
                  <Link href={'/cart'}>
                    <ShoppingBasket className='text-green-600 cursor-pointer hover:opacity-80' />
                  </Link>
                ) : (
                  <Button
                    className='w-1/2 bg-green-600 hover:bg-green-600/90 cursor-pointer'
                    onClick={() =>
                      addToCart({
                        id: product.caseVariations[0].id,
                        caseId: product.id,
                        name: product.name,
                        price: product.caseVariations[0]?.price || 0,
                        imgUrl: product.caseVariations[0]?.imgUrl || '',
                        color: product.caseVariations[0]?.color || '',
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
                  <Heart size={14} /> У вибране
                </Link>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Container>
  );
};
export default PopularProduct;
