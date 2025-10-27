import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar } from '@radix-ui/react-avatar';
import {
  BadgeCheckIcon,
  Contact,
  LogOut,
  Settings,
  Smartphone,
  Store,
  UserRound,
} from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { AvatarFallback, AvatarImage } from './ui/avatar';
import Link from 'next/link';
import { Badge } from './ui/badge';
const UserButton = () => {
  const session = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className='flex flex-col items-center relative'>
          <AvatarImage
            className='rounded-full w-10 h-10 cursor-pointer'
            src={session?.data?.user?.image || ''}
          />
          <AvatarFallback>
            <UserRound size={40} />
          </AvatarFallback>
          {session.data?.user?.role === 'ADMIN' && (
            <Badge className='absolute left-6 top-[-4] '>
              <BadgeCheckIcon size={18} />
            </Badge>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='start'>
        <DropdownMenuGroup>
          {session.data?.user?.role === 'ADMIN' && (
            <DropdownMenuItem asChild>
              <Link href={'/dashboard'}>
                <Settings size={18} /> Управління
              </Link>
            </DropdownMenuItem>
          )}
          {session.data?.user?.role === 'USER' && (
            <DropdownMenuItem asChild>
              <Link href={'/orders'}>
                <Smartphone size={18} /> Замовлення
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem asChild>
            <Link href={'/contacts'}>
              <Contact size={18} /> Контакти
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={'/about'}>
              <Store size={18} /> Про магазин
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOut size={18} /> Вийти
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserButton;
