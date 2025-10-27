import { getNewProduct } from '@/actions/product/get-newproduct';
import { getPopularProduct } from '@/actions/product/get-popularproduct';
import NewProduct from '@/components/NewProduct';
import PopularProduct from '@/components/PopularProduct';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default async function CategoryTabs() {
  const getNewProducts = await getNewProduct();
  const getPopularProducts = await getPopularProduct();
  const [newProducts, popularProducts] = await Promise.all([getNewProducts, getPopularProducts]);
  return (
    <Tabs defaultValue='new' className='flex items-center'>
      <TabsList className='flex bg-white'>
        <TabsTrigger
          value='new'
          className='data-[state=active]:bg-green-500 data-[state=active]:text-white px-4 py-2 rounded-md transition cursor-pointer font-normal '
        >
          Новинки
        </TabsTrigger>
        <TabsTrigger
          value='popular'
          className='data-[state=active]:bg-green-500 data-[state=active]:text-white px-4 py-2 rounded-md transition cursor-pointer '
        >
          Популярні категорії
        </TabsTrigger>
      </TabsList>
      <TabsContent value='new' className='flex gap-4'>
        <NewProduct newProducts={newProducts} />
      </TabsContent>
      <TabsContent value='popular' className='flex gap-4'>
        <PopularProduct popularProducts={popularProducts} />
      </TabsContent>
    </Tabs>
  );
}
