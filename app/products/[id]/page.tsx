import Container from '@/components/Container';
import ProductCard from '@/components/ProductCard';
import { prisma } from '@/lib/prisma';
import NotFound from './not-found';

export default async function Products({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const products = await prisma.caseVariation.findMany({
    where: { case: { modelId: id } },
    include: { case: true },
  });

  if (products.length === 0) {
    return <NotFound />;
  }
  return (
    <Container>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Container>
  );
}
