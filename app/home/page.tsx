import { getBrands, getModels, getSeries } from '@/actions/smartphones';
import FilterForm from '@/components/common/FilterForm';
import Container from '@/components/layout/Container';

export default async function Home() {
  const dataBrands = await getBrands();
  const dataSeries = await getSeries();
  const dataModels = await getModels();
  const [brands, series, models] = await Promise.all([dataBrands, dataSeries, dataModels])

  return (
    <Container>
      <div className='mb-4'>
        <p className='text-xl font-semibold mb-4'>Знайдіть свій чохол</p>
        <FilterForm brands={brands} series={series} models={models} />
      </div>
    </Container>
  );
};
