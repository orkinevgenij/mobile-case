import { auth } from '@/auth';
import Container from '@/components/Container';
import { Plus, Smartphone } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  return (
    <Container>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10'>
        <Link href='/dashboard/add-product'>
          <div className='group flex flex-col items-center justify-center p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-green-500 transition bg-white text-center cursor-pointer'>
            <Plus size={50} className='text-green-500 group-hover:text-green-600 transition' />
            <h2 className='mt-4 text-lg font-semibold text-gray-700 group-hover:text-green-600'>
              Додати товар
            </h2>
          </div>
        </Link>

        <Link href='/dashboard/all-products'>
          <div className='group flex flex-col items-center justify-center p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-green-500 transition bg-white text-center cursor-pointer'>
            <Smartphone
              size={50}
              className='text-green-500 group-hover:text-green-600 transition'
            />
            <h2 className='mt-4 text-lg font-semibold text-gray-700 group-hover:text-green-600'>
              Список товарів
            </h2>
          </div>
        </Link>
        <Link href='/dashboard/orders'>
          <div className='group flex flex-col items-center justify-center p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-green-500 transition bg-white text-center cursor-pointer'>
            <Smartphone
              size={50}
              className='text-green-500 group-hover:text-green-600 transition'
            />
            <h2 className='mt-4 text-lg font-semibold text-gray-700 group-hover:text-green-600'>
              Замовлення
            </h2>
          </div>
        </Link>
      </div>
    </Container>
  );
}
