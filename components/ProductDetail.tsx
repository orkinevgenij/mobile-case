'use client';
import { Case, Prisma } from '@prisma/client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/store';
import { ShoppingBasket } from 'lucide-react';
import Image from 'next/image';
import Container from './Container';
import Table from './TableComponent';
import Tabs from './Tabs';
import { Button } from './ui/button';
import MarkdownPreview from '@uiw/react-markdown-preview';

type DetailsProps = {
  product: Case;
  variation: Prisma.CaseVariationGetPayload<{ include: { case: true } }>;
  colors: string[];
};

const Detail = ({ product, variation, colors }: DetailsProps) => {
  const searchParams = useSearchParams();
  const activeColor = searchParams.get('color') ?? variation.color;
  const { cartItems, addToCart } = useCartStore();

  const isProductInCart = cartItems.find((item) => item.id === variation.id);
  return (
    <Container>
      <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
        <div className='flex flex-col gap-4'>
          <h1 className='text-3xl font-bold text-gray-800'>
            {product.name} - {variation.color}
          </h1>

          <span className='w-fit rounded-md bg-green-600 px-2 py-1 text-xs font-semibold text-white'>
            В наявності
          </span>
          <div className='relative flex justify-center object-contain'>
            <Image src={variation.imgUrl || ''} alt='image' width={200} height={250} />
          </div>
          <p className='text-2xl font-semibold text-rose-600'>{variation.price} ₴</p>
          <MarkdownPreview
            style={{
              background: 'white',
              color: 'black',
            }}
            source={variation.case.description}
          />
          <Table variation={variation} />
        </div>
        <div className='flex flex-col gap-6'>
          <div>
            <p className='mb-3 text-sm font-medium text-gray-900'>Виберіть колір</p>
            <div className='flex flex-wrap gap-3'>
              {colors.map((c) => (
                <Link
                  key={c}
                  href={{ query: { color: c } }}
                  scroll={false}
                  aria-label={c}
                  className={cn(
                    'h-9 w-9 rounded-full border border-gray-300 transition-transform',
                    activeColor === c ? 'ring-2 ring-offset-2 ring-gray-400' : 'hover:scale-110',
                  )}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
          {isProductInCart ? (
            <Link href={'/cart'}>
              <ShoppingBasket className='text-green-500 cursor-pointer hover:opacity-80' />
            </Link>
          ) : (
            <Button
              size='lg'
              className='w-full max-w-xs bg-green-600 hover:bg-green-500'
              onClick={() =>
                addToCart({
                  id: variation.id,
                  caseId: variation.caseId,
                  name: variation.case.name,
                  price: variation.price,
                  imgUrl: variation.imgUrl || '',
                  color: variation.color,
                  quantity: 1,
                })
              }
            >
              Купити
            </Button>
          )}
          <Tabs />
        </div>
      </div>
    </Container>
  );
};

export default Detail;
