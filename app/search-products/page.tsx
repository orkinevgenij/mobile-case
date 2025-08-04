import { getSearchVariations } from '@/actions/product/get-variations';
import SearchList from '@/components/SearchList';

const SearchPage = async ({ searchParams }: { searchParams: Promise<{ name: string }> }) => {
  const { name } = await searchParams;
  const products = await getSearchVariations(name);

  return <SearchList products={products} />;
};
export default SearchPage;
