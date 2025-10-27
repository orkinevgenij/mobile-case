'use client';
import { FilterSchema, FilterSchemaType } from '@/schemas/FilterSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Brand, Model, Series } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
type FilterFormProps = {
  brands: Brand[];
  series: Series[];
  models: Model[];
};
const FilterForm = ({ brands, series, models }: FilterFormProps) => {
  const router = useRouter();

  const form = useForm<FilterSchemaType>({
    resolver: zodResolver(FilterSchema),
    defaultValues: {
      brand: '',
      series: '',
      model: '',
    },
  });
  const onSubmit = async (values: FilterSchemaType) => {
    router.push(
      `/filtered-products/?brand=${values.brand}&series=${values.series}&model=${values.model}`,
    );
  };

  const filteredSeries = series && series.filter((s) => s.brandId === form.watch('brand'));
  const filteredModels = models && models.filter((m) => m.seriesId === form.watch('series'));
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex items-center justify-center '>
        <div className='flex flex-col items-center p-4 rounded-xl space-y-6 bg-gray-50'>
          <p className='text-xl font-semibold text-gray-700'>Знайдіть чохли для Вашого пристрою</p>
          <FormField
            control={form.control}
            name='brand'
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className='w-[250px]'>
                      <SelectValue placeholder='Оберіть бренд' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {brands &&
                      brands.map((brand) => (
                        <SelectItem value={brand.id} key={brand.id}>
                          {brand.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='series'
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={!form.watch('brand')}
                >
                  <FormControl>
                    <SelectTrigger className='w-[250px]'>
                      <SelectValue placeholder='Оберіть серію' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {filteredSeries &&
                      filteredSeries.map((s) => (
                        <SelectItem value={s.id} key={s.id}>
                          {s.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='model'
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={!form.watch('series')}
                >
                  <FormControl>
                    <SelectTrigger className='w-[250px]'>
                      <SelectValue placeholder='Оберіть модель' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {filteredModels &&
                      filteredModels.map((m) => (
                        <SelectItem key={m.id} value={m.id}>
                          {m.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            className='w-full bg-green-500 hover:bg-green-400 cursor-pointer font-bold text-xl '
          >
            Пошук
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default FilterForm;
