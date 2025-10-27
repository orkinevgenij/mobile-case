import { getProductById } from '@/actions/product/get-productbyid';
import { getBrands, getModels, getSeries } from '@/actions/smartphones';
import AddFormProduct from '@/components/dashboard/AddProduct';
import Container from '@/components/Container';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function EditProduct({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  const user = session?.user.role;

  if (user !== 'ADMIN') {
    redirect('/');
  }
  const { id } = await params;
  const brands = await getBrands();
  const series = await getSeries();
  const models = await getModels();
  const product = await getProductById(id);
  if (!product) {
    return <div className='text-center text-red-500 '>Товар не знайдено або сталася помилка</div>;
  }
  return (
    <Container>
      <AddFormProduct
        product={product}
        isEdit={true}
        brands={brands}
        series={series}
        models={models}
      />
    </Container>
  );
}
