import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar } from '@radix-ui/react-avatar';
import { LogOut, Settings, Smartphone, UserRound } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AvatarFallback, AvatarImage } from '../ui/avatar';
const UserButton = () => {
  const session = useSession();
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            className='rounded-full w-10 h-10 cursor-pointer'
            src={session?.data?.user?.image || ''}
          />
          <AvatarFallback>
            <UserRound size={40} />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='start'>
        <DropdownMenuGroup>
          {session.data?.user?.role === 'ADMIN' && (
            <DropdownMenuItem onClick={() => router.push('/dashboard')}>
              <Settings size={18} /> Управління
            </DropdownMenuItem>
          )}
          {session.data?.user?.role === 'USER' && (
            <DropdownMenuItem onClick={() => router.push('/orders')}>
              <Smartphone size={18} /> Замовлення
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOut size={18} /> Вийти
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserButton;
