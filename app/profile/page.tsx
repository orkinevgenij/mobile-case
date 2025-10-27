import { auth } from '@/auth';
import SignoutButton from '@/components/auth/signout-button';

export default async function ProfilePage() {
  const session = await auth();
  if (!session) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p className='text-gray-700'>Ви не увійшли. Будь ласка, авторизуйтесь.</p>
      </div>
    );
  }
  const user = session.user;
  return (
    <div className='min-h-screen bg-gray-50 py-10 px-5 flex flex-col items-center'>
      <h1 className='text-3xl font-bold mb-6'>Ваш профіль</h1>
      <div className='bg-white shadow rounded-2xl p-6 w-full max-w-md flex flex-col items-center'>
        {user?.image && (
          <img src={user.image} alt={user.name || 'User'} className='w-24 h-24 rounded-full mb-4' />
        )}
        <h2 className='text-xl font-semibold mb-1'>{user?.name}</h2>
        <p className='text-gray-600 mb-2'>{user?.email}</p>
        <SignoutButton />
      </div>
    </div>
  );
}
