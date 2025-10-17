'use client';
import { cn } from '@/lib/utils';
import { TCategoryMenu } from '@/types/types';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from './ui/button';

const DesktopMenu = ({ brands, series }: TCategoryMenu) => {
  const [brandId, setBrandId] = useState<string | null>();
  const [isOpenCatalog, setIsOpenCatalog] = useState(false);
  const filteredSeries = series.filter((s) => s.brandId === brandId);

  return (
    <div
      className='relative hidden sm:flex md:flex xl:flex'
      onMouseLeave={() => setIsOpenCatalog(false)}
    >
      <Button
        className='bg-green-500 hover:bg-green-400 text-white text-md flex items-center rounded-md shadow-md cursor-pointer'
        onMouseEnter={() => setIsOpenCatalog(true)}
      >
        <MenuIcon className='mr-2' />
        <p>Каталог</p>
      </Button>
      {isOpenCatalog && (
        <div
          className={cn(
            'absolute top-full left-0  max-h-[450px] bg-white border rounded-lg shadow-xl z-30 overflow-hidden flex  text-gray-600',
            brandId ? 'w-[650px]' : 'w-[180px]',
          )}
          onMouseLeave={() => {
            setIsOpenCatalog(false);
            setBrandId(null);
          }}
        >
          <div className='w-[180px] border-r overflow-y-auto max-h-[450px]'>
            {brands?.map((brand) => (
              <button
                key={brand.id}
                onMouseEnter={() => setBrandId(brand.id)}
                className={`w-full text-left px-4 py-2 text-sm  transition-colors cursor-pointer ${
                  brand.id === brandId ? 'bg-green-100 font-semibold' : ''
                }`}
              >
                <Link key={brand.id} href={`/series/${brand.id}`}>
                  {brand.name}
                </Link>
              </button>
            ))}
          </div>

          {brandId && filteredSeries.length > 0 && (
            <div className='flex-1 grid grid-cols-2 p-2 overflow-y-auto max-h-[450px]'>
              {filteredSeries.map((series) => (
                <div key={series.id}>
                  <Link
                    href={`/models/${series.id}`}
                    key={series.id}
                    className='text-md font-semibold border-b cursor-pointer hover:text-gray-900'
                  >
                    {series.name}
                  </Link>
                  <div className='space-y-1'>
                    {series.modelSmartphone?.map((model) => (
                      <p
                        key={model.id}
                        className='text-sm  hover:text-green-600 transition-colors cursor-pointer my-2'
                      >
                        <Link href={`/products/${model.id}`}>{model.name}</Link>
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DesktopMenu;
