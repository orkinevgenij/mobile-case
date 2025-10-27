'use client';
import { deleteVariation } from '@/actions/product/delete-variations';
import { Prisma } from '@prisma/client';
import { DollarSign, Palette, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Card, CardAction, CardContent, CardDescription, CardTitle } from '../ui/card';
import MarkdownPreview from '@uiw/react-markdown-preview';

type VariationsProps = {
  variations: Prisma.CaseVariationGetPayload<{ include: { case: true } }>[];
  caseId: string;
};
const Variations = ({ variations, caseId }: VariationsProps) => {
  const removeVariation = async (variationId: string) => {
    await deleteVariation(variationId);
  };
  return (
    <div className='space-y-6'>
      <div className='flex justify-center gap-2 items-center'>
        <div className='flex flex-col items-center mt-8 '>
          <Link href={`/dashboard/add-variation/${caseId}`}>
            <div className='group flex flex-col items-center justify-center p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-green-500 transition bg-white text-center cursor-pointer'>
              <Plus size={50} className='text-green-500 group-hover:text-green-500 transition' />
              <h2 className='mt-4 text-lg font-semibold text-gray-700 group-hover:text-green-500'>
                Додати колір
              </h2>
            </div>
          </Link>
        </div>
      </div>
      {variations.map((variation) => (
        <Card
          key={variation.id}
          className='flex flex-col md:flex-row items-center gap-4 p-4 border shadow-sm rounded-xl hover:shadow-md transition'
        >
          <div className='relative'>
            <Image
              src={variation.imgUrl || '/placeholder.jpg'}
              alt={variation.color}
              width={100}
              height={100}
              className='object-contain'
            />
          </div>
          <CardContent className='flex-1 space-y-1'>
            <Link
              href={`/product-details/${variation.case.id}?color=${variation.color}`}
              className='hover:opacity-70'
            >
              <CardTitle>{variation.case.name}</CardTitle>
            </Link>
            <p className='text-sm text-gray-500'>ID: {variation.id}</p>
            <CardDescription className='text-sm text-gray-500 line-clamp-2'>
              <MarkdownPreview
                style={{
                  background: 'white',
                  color: 'black',
                }}
                source={variation.case.description}
              />{' '}
            </CardDescription>
            <div
              key={variation.id}
              className='flex justify-between text-sm border p-2 rounded-md bg-gray-50'
            >
              <p className='flex items-center gap-1'>
                <Palette size={16} />
                <span className='font-semibold'>Колір:</span>
                <span> {variation.color}</span>
              </p>
              <p className='flex items-center gap-1'>
                <DollarSign size={16} color='green' />
                {variation.price} ₴
              </p>
            </div>
            <CardAction className='flex gap-2 items-end'>
              <Button
                variant='destructive'
                size='sm'
                onClick={() => removeVariation(variation.id)}
                className='flex items-center gap-1 hover:bg-red-400 cursor-pointer'
              >
                <Trash2 size={16} />
                Видалити
              </Button>
            </CardAction>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
export default Variations;
