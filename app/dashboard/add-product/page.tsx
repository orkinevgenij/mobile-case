import { getBrands, getModels, getSeries } from '@/actions/smartphones';
import AddFormProduct from '@/components/dashboard/AddProduct';
import Container from '@/components/Container';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function AddProduct() {
  const session = await auth();
  const user = session?.user.role;

  if (user !== 'ADMIN') {
    redirect('/');
  }

  const fetchBrands = await getBrands();
  const fetchSeries = await getSeries();
  const fetchModels = await getModels();

  const [brands, series, models] = await Promise.all([fetchBrands, fetchSeries, fetchModels]);

  return (
    <Container>
      <AddFormProduct brands={brands} series={series} models={models} />
    </Container>
  );
}
