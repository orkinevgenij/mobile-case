import Image from 'next/image';

const OrdersEmpty = () => {
  return (
    <div className='flex flex-col items-center justify-center h-[100vh]'>
      <p className='text-xl text-orange-500 mb-4'>У вас щє немає замовлень 🙁</p>
      <Image src={'/box.png'} alt='' width={300} height={400} />
    </div>
  );
};
export default OrdersEmpty;
