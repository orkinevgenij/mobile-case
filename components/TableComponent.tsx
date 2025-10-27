import { Prisma } from '@prisma/client';

interface TableProps {
  variation: Prisma.CaseVariationGetPayload<{ include: { case: true } }>;
}

const Table = ({ variation }: TableProps) => {
  return (
    <div className='flex'>
      <div className='w-[40%] not-even:bg-gray-300'>
        <p className='odd:bg-gray-100 even:bg-white p-2'>Цвет</p>
        <p className='odd:bg-gray-100 even:bg-white p-2'>Материал</p>
        <p className='odd:bg-gray-100 even:bg-white p-2'>Гарантия:</p>
      </div>
      <div className='w-[60%]'>
        <p className='odd:bg-gray-100 even:bg-white p-2'>{variation?.color}</p>
        <p className='odd:bg-gray-100 even:bg-white p-2'>{variation?.case?.material}</p>
        <p className='odd:bg-gray-100 even:bg-white p-2'>{variation?.case?.guarantee}</p>
      </div>
    </div>
  );
};

export default Table;
