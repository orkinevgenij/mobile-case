'use client';
import { TCategoryMenu } from '@/types/types';
import { LogIn, ShoppingBasket, Smartphone } from 'lucide-react';
import { useSession } from 'next-auth/react';
import UserButton from './UserButton';
import SearchInput from './UserSearch';
import { Menu } from './Menu';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/store/store';

const NavBar = ({ brands, series, models }: TCategoryMenu) => {
  const { cartItems } = useCartStore();
  const session = useSession();
  const isLoggedIn = session.status === 'authenticated';
  return (
    <div className='shadow-sm px-4 py-3'>
      <div className='w-full max-w-[1600px] mx-auto flex justify-between'>
        <div className='flex items-center gap-2'>
          <Menu brands={brands} series={series} models={models} />
          <Link
            href={'/'}
            className='flex items-center gap-2 bg-gray-50 rounded-full text-green-500 font-bold text-xl py-3 px-3 cursor-pointer hover:text-green-400'
          >
            <Smartphone /> CaseForYou
          </Link>
        </div>
        <div className='flex items-center gap-2  text-green-500 text-xs'>
          <div className='hidden sm:flex md:flex xl:flex'>
            {isLoggedIn ? (
              <UserButton />
            ) : (
              <Link
                href={'/auth/login'}
                className='flex flex-col items-center text-green-500 hover:text-green-400'
              >
                <LogIn size={25} />
                Увійти
              </Link>
            )}
          </div>
          <SearchInput />
          <Link
            href={'/cart'}
            className='flex flex-col items-center text-green-500 hover:text-green-400'
          >
            <ShoppingBasket size={25} className='relative' />
            <Badge className='absolute bg-green-400 right-4 h-4 min-w-4 rounded-full px-1 font-mono tabular-nums'>
              {cartItems.length}
            </Badge>
            <span>Кошик</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default NavBar;
