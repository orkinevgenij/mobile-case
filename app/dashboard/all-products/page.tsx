import { getAllProducts } from '@/actions/product/get-products';
import AllProductList from '@/components/dashboard/AllProductList';
import Container from '@/components/Container';
export default async function AllProducts({
  searchParams,
}: {
  searchParams: Promise<{
    name: string;
  }>;
}) {
  const { name } = await searchParams;
  const products = await getAllProducts(name);
  return (
    <Container>
      <AllProductList products={products} />
    </Container>
  );
}
