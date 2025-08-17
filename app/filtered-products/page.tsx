import { filteredProduct } from '@/actions/product/filtered-product';
import Container from '@/components/layout/Container';
import ProductCard from '@/components/ProductCard';

const FilteredPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ brand: string; series: string; model: string }>;
}) => {
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
          <ProductCard product={product} />
        ))}
      </div>
    </Container>
  );
};
export default FilteredPage;
