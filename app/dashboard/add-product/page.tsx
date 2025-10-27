import { getBrands, getModels, getSeries } from '@/actions/smartphones';
import AddFormProduct from '@/components/dashboard/AddProduct';
import Container from '@/components/Container';

export default async function AddProduct() {
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
