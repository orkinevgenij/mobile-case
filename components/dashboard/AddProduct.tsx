'use client';
import { createProduct } from '@/actions/product/create-product';
import { editProduct } from '@/actions/product/edit-product';
import { CaseSchema, CaseSchemaType } from '@/schemas/CaseSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Brand, Model, Prisma, Series } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import CardWrapper from '../auth/card-wrapper';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import MDEditor from '@uiw/react-md-editor';

type AddProductProps = {
  brands: Brand[];
  series: Series[];
  models: Model[];
  isEdit?: boolean;
  product?: Prisma.CaseGetPayload<{
    include: {
      modelSmartphone: {
        include: {
          series: {
            include: {
              brand: true;
            };
          };
        };
      };
    };
  }>;
};

const AddFormProduct = ({ brands, series, models, isEdit, product }: AddProductProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CaseSchemaType>({
    resolver: zodResolver(CaseSchema),
    defaultValues: isEdit
      ? {
          name: product?.name,
          description: product?.description,
          brand: product?.modelSmartphone?.series?.brandId || '',
          series: product?.modelSmartphone?.series?.id || '',
          model: product?.modelSmartphone?.id || '',
          guarantee: product?.guarantee || 0,
          material: product?.material || '',
        }
      : {
          name: '',
          description: '',
          brand: '',
          series: '',
          model: '',
          guarantee: 0,
          material: '',
        },
  });

  const onSubmit = async (values: CaseSchemaType) => {
    setIsLoading(true);
    try {
      if (isEdit) {
        const result = await editProduct(values, product?.id || '');
        if (result?.error) {
          toast.error(result.error);
        } else {
          toast.success('Товар оновлено');
          router.push('/dashboard/all-products');
        }
      } else {
        const result = await createProduct(values);
        if (result?.error) {
          toast.error(result.error);
        } else {
          toast.success('Товар успішно додано');
          router.push('/dashboard/all-products');
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || 'Помилка під час збереження');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const filteredSeries = series && series.filter((s) => s.brandId === form.watch('brand'));
  const filteredModels = models && models.filter((m) => m.seriesId === form.watch('series'));

  return (
    <CardWrapper
      title={isEdit ? 'Редагування товару' : 'Додавання товару'}
      headerLabel=''
      backButtonHref=''
      backButtonLabel=''
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='space-y-4 mb-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Назва</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Введіть назву' type='text' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              rules={{
                required: 'Описание обязательно',
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Опис</FormLabel>
                  <MDEditor
                    data-color-mode='light'
                    className='p-4 bg-gray-50 rounded-xl'
                    textareaProps={{
                      placeholder: 'Введіть опис',
                    }}
                    {...field}
                    value={field.value}
                    onChange={(val) => field.onChange(val || '')}
                    height={200}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='brand'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Бренд</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Вкажіть бренд' />
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
                  <FormLabel>Серія</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!form.watch('brand')}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Вкажіть серію' />
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
                  <FormLabel>Модель</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!form.watch('series')}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Вкажіть модель' />
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

            <FormField
              control={form.control}
              name='material'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Матеріал</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Вкажіть матеріал' type='text' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='guarantee'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Гарантія (місяці)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='number'
                      onChange={(e) => field.onChange(+e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={isLoading} type='submit' className='w-full bg-green-500 cursor-pointer'>
            {isEdit ? 'Редагувати' : 'Додати'}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default AddFormProduct;
