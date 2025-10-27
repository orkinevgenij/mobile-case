'use client';
import { removeProduct } from '@/actions/product/delete-product';
import { Prisma } from '@prisma/client';
import { Ban, DollarSign, Palette, Pencil, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import DashboardSearch from './DashboardSearch';
import MarkdownPreview from '@uiw/react-markdown-preview';

type AllProductListProps = {
  products: Prisma.CaseGetPayload<{ include: { caseVariations: true } }>[];
};

const AllProductList = ({ products }: AllProductListProps) => {
  const router = useRouter();

  return (
    <div className='flex flex-col gap-2'>
      <DashboardSearch />
      {products.map((product) => (
        <Card
          key={product.id}
          className='cursor-pointer transition-shadow hover:shadow-lg hover:shadow-green-200'
          onClick={() => router.push(`/dashboard/product-variations/${product.id}`)}
        >
          <CardHeader>
            <CardTitle className='text-xl font-semibold'>{product.name}</CardTitle>
            <p className='text-sm text-gray-500'>ID: {product.id}</p>
          </CardHeader>
          <CardContent className='flex flex-col gap-4'>
            <CardDescription className='text-sm text-gray-500 line-clamp-2'>
              <MarkdownPreview
                style={{
                  background: 'white',
                  color: 'black',
                }}
                source={product.description}
              />{' '}
            </CardDescription>

            <div className='space-y-2'>
              <p className='font-medium text-gray-700'>Варіації:</p>
              {product.caseVariations.length === 0 ? (
                <Ban className='text-red-500' />
              ) : (
                product.caseVariations.map((variation) => (
                  <div
                    key={variation.id}
                    className='flex justify-between text-sm border p-2 rounded-md bg-gray-50'
                  >
                    <p className='flex items-center gap-1'>
                      <Palette size={16} />
                      Колір: {variation.color}
                    </p>
                    <p className='flex items-center gap-1'>
                      <DollarSign size={16} />
                      Ціна: {variation.price} ₴
                    </p>
                  </div>
                ))
              )}
            </div>
            <div className='flex justify-end gap-2'>
              <Button
                size='sm'
                variant='destructive'
                className='cursor-pointer hover:bg-red-400'
                onClick={(e) => {
                  e.stopPropagation();
                  removeProduct(product.id);
                }}
              >
                <Trash2 size={16} />
                Видалити
              </Button>
              <Button
                size='sm'
                className='cursor-pointer'
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/dashboard/edit-product/${product.id}`);
                }}
              >
                <Pencil size={16} />
                Редагувати
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AllProductList;
