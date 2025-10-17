'use client';
import { TCategoryMenu } from '@/types/types';
import { LogIn, ShoppingBasket, Smartphone } from 'lucide-react';
import { useSession } from 'next-auth/react';
import UserButton from './UserButton';
import SearchInput from './UserSearch';
import { Menu } from '../Menu';
import Link from 'next/link';

const NavBar = ({ brands, series, models }: TCategoryMenu) => {
  const session = useSession();
  const isLoggedIn = session.status === 'authenticated';
  return (
    <div className='shadow-sm px-4 py-3 '>
      <div className='w-full max-w-[1600px] mx-auto flex justify-between'>
        <div className='flex items-center gap-2'>
          <Menu brands={brands} series={series} models={models} />
          <Link
            href={'/'}
            className='flex items-center gap-2 bg-white rounded-md text-green-500 font-bold text-xl py-1 px-1 cursor-pointer hover:text-green-400'
          >
            <Smartphone /> NewCase
          </Link>
        </div>
        <div className='flex items-center gap-2  text-green-500 text-xs'>
          {isLoggedIn && <UserButton />}
          {!isLoggedIn && (
            <Link
              href={'/auth/login'}
              className='hidden sm:flex md:flex xl:flex flex-col items-center text-green-500 hover:text-green-400'
            >
              <LogIn size={25} />
              Увійти
            </Link>
          )}
          <SearchInput />
          <Link
            href={'/cart'}
            className='flex flex-col items-center  text-green-500 hover:text-green-400'
          >
            <ShoppingBasket size={25} />
            <span>Кошик</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default NavBar;
