import Image from 'next/image';

const CartEmpty = () => {
  return (
    <div className='flex flex-col items-center justify-center h-[100vh]'>
      <p className='text-xl text-orange-500 mb-4'>Кошик порожній 🙁</p>
      <span className='text-sm text-slate-500'>Але це ніколи не пізно виправити {':)'}</span>
      <Image src={'/cart-empty.png'} alt='' width={300} height={400} />
    </div>
  );
};
export default CartEmpty;
