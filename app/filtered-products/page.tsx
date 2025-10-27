import { filteredProduct } from '@/actions/product/filtered-product';
import Container from '@/components/Container';
import ProductCard from '@/components/ProductCard';

export default async function FilteredPage({
  searchParams,
}: {
  searchParams: Promise<{ brand: string; series: string; model: string }>;
}) {
  const { brand, series, model } = await searchParams;
  const products = await filteredProduct({
    brand: brand,
    series: series,
    model: model,
  });
  return (
    <Container>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Container>
  );
}
