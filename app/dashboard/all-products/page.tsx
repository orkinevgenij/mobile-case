import { getAllProducts } from '@/actions/product/get-products';
import AllProductList from '@/components/dashboard/AllProductList';
import Container from '@/components/Container';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
export default async function AllProducts({
  searchParams,
}: {
  searchParams: Promise<{
    name: string;
  }>;
}) {
  const session = await auth();
  const user = session?.user.role;

  if (user !== 'ADMIN') {
    redirect('/');
  }
  const { name } = await searchParams;
  const products = await getAllProducts(name);
  return (
    <Container>
      <AllProductList products={products} />
    </Container>
  );
}
