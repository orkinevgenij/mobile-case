import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Prisma } from '@prisma/client';
import NewProduct from './NewProduct';
import PopularProduct from './PopularProduct';

type CategoryTabsProps = {
  newProducts: Prisma.CaseGetPayload<{ include: { caseVariations: true } }>[];
  popularProducts: Prisma.CaseGetPayload<{ include: { caseVariations: true } }>[];
};
const CategoryTabs = ({ newProducts, popularProducts }: CategoryTabsProps) => {
  return (
    <Tabs defaultValue='new' className='flex items-center'>
      <TabsList className='flex bg-white'>
        <TabsTrigger
          value='new'
          className='data-[state=active]:bg-orange-500 data-[state=active]:text-white px-4 py-2 rounded-md transition cursor-pointer font-normal '
        >
          Новинки
        </TabsTrigger>
        <TabsTrigger
          value='popular'
          className='data-[state=active]:bg-orange-500 data-[state=active]:text-white px-4 py-2 rounded-md transition cursor-pointer '
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
};
export default CategoryTabs;
