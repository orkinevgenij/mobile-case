import { getNewProduct } from '@/actions/product/get-newproduct';
import { getPopularProduct } from '@/actions/product/get-popularproduct';
import { getBrands, getModels, getSeries } from '@/actions/smartphones';
import CategoryTabs from '@/components/CategoryTabs';
import FilterForm from '@/components/common/FilterForm';
import Container from '@/components/layout/Container';

const HomePage = async () => {
  const brands = await getBrands();
  const series = await getSeries();
  const models = await getModels();
  const newProducts = await getNewProduct();
  const popularProducts = await getPopularProduct();
  return (
    <Container>
      <div className='mb-4'>
        <p className='text-xl font-semibold mb-4'>Знайдіть свій чохол</p>
        <FilterForm brands={brands} series={series} models={models} />
      </div>
      <CategoryTabs newProducts={newProducts} popularProducts={popularProducts} />
    </Container>
  );
};
export default HomePage;
