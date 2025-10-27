import Container from '@/components/Container';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function Series({ params }: { params: Promise<{ id: string }> }) {
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
    return notFound();
  }
  return (
    <Container>
      <>
        <h1 className='text-xl font-semibold mb-4'>Чохли для {series[0].name}</h1>
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
}
