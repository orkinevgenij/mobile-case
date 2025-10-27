import { getSearchVariations } from '@/actions/product/get-variations';
import Container from '@/components/Container';
import ProductCard from '@/components/ProductCard';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ name: string }>;
}) {
  const { name } = await searchParams;
  const products = await getSearchVariations(name);
  return (
    <Container>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </Container>
  );
}
