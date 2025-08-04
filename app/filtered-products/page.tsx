import { filteredProduct } from '@/actions/product/filtered-product';
import FilterList from '@/components/FilterList';

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
  return <FilterList products={products} />;
};
export default FilteredPage;
