'use client';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { BadgeCheckIcon, LogOut, MenuIcon, Smartphone, User, UserRound } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { usePathname } from 'next/navigation';
import { Badge } from './ui/badge';

export default function MobileMenu() {
  const pathname = usePathname();
  const session = useSession();
  const isLoggedIn = session.status === 'authenticated';
  return (
    <Drawer direction='left'>
      <DrawerTrigger>
        <MenuIcon className='text-green-500 text-3xl block sm:hidden md:hidden xl:hidden' />
      </DrawerTrigger>
      <DrawerContent className='flex flex-col h-full'>
        <DrawerHeader className='bg-green-500'>
          <DrawerTitle className='flex gap-2 text-white font-bold text-lg'>
            {' '}
            <Smartphone /> NewCase
          </DrawerTitle>
        </DrawerHeader>
        <div className='h-[1px] bg-white w-full' />
        <div className='px-3 py-3 bg-green-500'>
          {isLoggedIn ? (
            <DrawerClose>
              <Link href={'/profile'} className='flex relative items-center gap-2 cursor-pointer'>
                <Avatar>
                  <AvatarImage
                    className='rounded-full w-10 h-10 cursor-pointer'
                    src={session?.data?.user?.image || ''}
                  />
                  <AvatarFallback>
                    <UserRound size={40} />
                  </AvatarFallback>
                </Avatar>
                {session.data?.user?.role === 'ADMIN' && (
                  <Badge className='absolute left-5 top-[-10]'>
                    <BadgeCheckIcon size={18} />
                  </Badge>
                )}
                <span className='text-white font-medium'>Мій аккаунт</span>
              </Link>
            </DrawerClose>
          ) : (
            <DrawerClose asChild>
              <Link href={'/auth/login'} className='flex items-center gap-2 cursor-pointer'>
                <User className='w-5 h-5 text-white' />
                <span className='text-white font-medium'>Увійти</span>
              </Link>
            </DrawerClose>
          )}
        </div>
        <div className='flex-1 overflow-y-auto py-6 space-y-4 px-2'>
          <DrawerClose asChild>
            <Link
              href={'/brands'}
              className={`${pathname === '/brands' ? 'text-green-500' : 'text-gray-700'} `}
            >
              Чохли
            </Link>
          </DrawerClose>
          <div className='h-[0.5px] bg-green-300 w-full' />
          <div className='flex flex-col gap-2'>
            {session.data?.user?.role === 'USER' && (
              <DrawerClose asChild>
                <Link
                  href={'/orders'}
                  className={`${pathname === '/orders' ? 'text-green-500' : 'text-gray-700'} `}
                >
                  Замовлення
                </Link>
              </DrawerClose>
            )}
            {session.data?.user?.role === 'ADMIN' && (
              <DrawerClose asChild>
                <Link
                  href={'/dashboard'}
                  className={`${pathname === '/dashboard' ? 'text-green-500' : 'text-gray-700'} `}
                >
                  Управління
                </Link>
              </DrawerClose>
            )}
            <DrawerClose asChild>
              <Link
                href={'/contacts'}
                className={`${pathname === '/contacts' ? 'text-green-500' : 'text-gray-700'} `}
              >
                Контакти
              </Link>
            </DrawerClose>
            <DrawerClose asChild>
              <Link
                href={'/about'}
                className={`${pathname === '/about' ? 'text-green-500' : 'text-gray-700'} `}
              >
                Про магазин
              </Link>
            </DrawerClose>
            {isLoggedIn && (
              <DrawerClose asChild>
                <Button
                  variant='orange'
                  className=' bg-green-500 hover:bg-green-400'
                  onClick={() => signOut()}
                >
                  <LogOut size={18} /> Вийти
                </Button>
              </DrawerClose>
            )}
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant='outline'>Закрити</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
