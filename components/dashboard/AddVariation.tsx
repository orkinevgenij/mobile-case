'use client';
import { createVariation } from '@/actions/product/create-variation';
import { colors } from '@/lib/colors';
import { uploadImage } from '@/lib/upload-image';
import { VariationSchema, VariationSchemaType } from '@/schemas/VariationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import CardWrapper from '../auth/card-wrapper';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const VariationAddForm = ({ caseId }: { caseId: string }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const imgInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imgUrl] = useState<string>('');
  console.log('selectedFile', selectedFile);
  const handleButtonClick = () => {
    imgInputRef.current?.click();
  };

  const form = useForm<VariationSchemaType>({
    resolver: zodResolver(VariationSchema),
    defaultValues: {
      color: '',
      price: 0,
      imgUrl: '',
    },
  });
  async function onSubmit(values: VariationSchemaType) {
    setIsLoading(true);
    try {
      if (!selectedFile) {
        toast.error('Будь ласка, виберіть зображення');
        return;
      }

      const imageUrl = await uploadImage(selectedFile);

      values.imgUrl = imageUrl;
      const result = await createVariation(values, caseId);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success('Варіація успішно додано');
        router.push(`/dashboard/product-variations/${caseId}`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || 'Помилка під час збереження');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CardWrapper
      title='Додайте варіацію'
      headerLabel=''
      backButtonHref=''
      backButtonLabel=''
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='space-y-4 mb-4'>
            <button
              className='flex justify-center items-center gap-2 cursor-pointer mx-auto'
              type='button'
              onClick={handleButtonClick}
            >
              <Upload size={20} />
              <span>{isLoading ? 'Завантаження...' : 'Завантажити зображення'}</span>
            </button>
            <FormField
              control={form.control}
              name='imgUrl'
              render={({}) => (
                <FormItem>
                  <FormControl>
                    <Input
                      ref={imgInputRef}
                      className='hidden'
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                      placeholder='Завантажити зображення'
                      type='file'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {selectedFile && (
              <div className='relative w-[150px] h-[150px] mx-auto'>
                <Image
                  className='object-contain'
                  src={URL.createObjectURL(selectedFile)}
                  fill
                  alt='preview'
                />
              </div>
            )}
            {imgUrl && (
              <div className='relative w-[150px] h-[150px] mx-auto'>
                <Image className='object-contain' src={imgUrl || ''} fill alt='preview' />
              </div>
            )}
            <FormField
              control={form.control}
              name='color'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Колір</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Оберіть колір' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {colors.map((color) => (
                        <SelectItem key={color.value} value={color.value}>
                          <div className='flex items-center gap-2'>
                            <span
                              className='w-4 h-4 rounded-full border'
                              style={{
                                background:
                                  color.value === 'multicolor'
                                    ? 'linear-gradient(to right, red, orange, yellow, green, blue, violet)'
                                    : color.value,
                              }}
                            />
                            <span>{color.name}</span>
                          </div>
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
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ціна</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => field.onChange(+e.target.value)}
                      placeholder='Вкажіть ціну'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type='submit' className='w-full bg-green-500 cursor-pointer'>
            {'Додати'}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
export default VariationAddForm;
