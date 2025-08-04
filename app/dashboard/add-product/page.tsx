import { getBrands, getModels, getSeries } from '@/actions/smartphones';
import AddFormProduct from '@/components/dashboard/AddProduct';
import Container from '@/components/layout/Container';

const AddProduct = async () => {
  const brands = await getBrands();
  const series = await getSeries();
  const models = await getModels();
  return (
    <Container>
      <AddFormProduct brands={brands} series={series} models={models} />
    </Container>
  );
};
export default AddProduct;
