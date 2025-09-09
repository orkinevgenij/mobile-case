'use client';
import { TCategoryMenu } from '@/types/types';
import { LogIn, ShoppingBasket } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import UserButton from './UserButton';
import SearchInput from './UserSearch';
import { Menu } from '../Menu';

const NavBar = ({ brands, series, models }: TCategoryMenu) => {
  const router = useRouter();
  const session = useSession();
  const isLoggedIn = session.status === 'authenticated';
  return (
    <div className='bg-orange-500 px-1 py-1 '>
      <div className='w-full max-w-[1600px] mx-auto flex justify-between'>
        <div className='flex items-center gap-2'>
          <Menu brands={brands} series={series} models={models} />
          <button
            className='bg-white rounded-md text-orange-500 font-bold text-xl py-1 px-1 cursor-pointer hover:bg-orange-100'
            onClick={() => router.push('/')}
          >
            NewCase
          </button>
        </div>
        <div className='flex items-center gap-2 text-white text-xs'>
          <SearchInput />
          {!isLoggedIn && (
            <div
              className='hidden sm:flex md:flex xl:flex flex-col items-center cursor-pointer'
              onClick={() => router.push('/auth/login')}
            >
              <LogIn size={25} />
              Увійти
            </div>

          )}
          {isLoggedIn && <div className='hidden sm:flex md:flex xl:flex'><UserButton /></div>}
          <div
            className='flex flex-col items-center cursor-pointer'
            onClick={() => router.push('/cart')}
          >
            <ShoppingBasket size={25} />
            <span>Кошик</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NavBar;
