import { getBrands, getModels, getSeries } from '@/actions/smartphones';
import FilterForm from '@/components/FilterForm';
import Container from '@/components/Container';
import CategoryTabs from '@/components/CategoryTabs';

export default async function Home() {
  const dataBrands = await getBrands();
  const dataSeries = await getSeries();
  const dataModels = await getModels();
  const [brands, series, models] = await Promise.all([dataBrands, dataSeries, dataModels]);

  return (
    <Container>
      <div className='mb-4'>
        <FilterForm brands={brands} series={series} models={models} />
        <CategoryTabs />
      </div>
    </Container>
  );
}
