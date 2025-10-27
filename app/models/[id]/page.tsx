import Container from '@/components/Container';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function Models({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;
  const models = await prisma.model.findMany({ where: { seriesId: id } });
  if (models.length === 0) return <p>Модель не знайдено</p>;
  return (
    <Container>
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
        {models.map((model) => (
          <Link
            href={`/products/${model.id}`}
            key={model.id}
            className='p-6 shadow-sm shadow-neutral-300 hover:shadow-yellow-300'
          >
            {model.name}
          </Link>
        ))}
      </div>
    </Container>
  );
}
