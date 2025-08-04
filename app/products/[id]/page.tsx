import Container from '@/components/layout/Container';
import ProductCard from '@/components/ProductCard';
import { prisma } from '@/lib/prisma';
const Products = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const products = await prisma.caseVariation.findMany({
    where: { case: { modelId: id } },
    include: { case: true },
  });
  if (products.length === 0)
    return <div className='text-center text-red-500'>Чохли не знайдено</div>;

  return (
    <Container>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Container>
  );
};

export default Products;
