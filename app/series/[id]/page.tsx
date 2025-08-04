import Container from '@/components/layout/Container';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

const Series = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const series = await prisma.series.findMany({
    where: {
      brandId: id,
    },
    include: {
      brand: true,
    },
  });
  if (series.length === 0) {
    return <div className='text-center text-red-500'>Серію не знайдено</div>;
  }
  return (
    <Container>
      <>
        <h1 className='text-xl font-semibold mb-4'>Чохли для {series[0].brand.name}</h1>
        <div className='grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2'>
          {series.map((s) => (
            <Link
              href={`/models/${s.id}`}
              key={s.id}
              className='p-6 shadow-sm shadow-neutral-300 hover:shadow-yellow-300'
            >
              {s.name}
            </Link>
          ))}
        </div>
      </>
    </Container>
  );
};
export default Series;
