'use client';
import { register } from '@/actions/register';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RegisterSchema, RegisterSchemaType } from '@/schemas/RegisterSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import CardWrapper from './card-wrapper';
import { FormError } from './form-error';
import { FormSuccess } from './form-success';
import GoogleLogin from './google-button';

const RegisterForm = () => {
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      passwordConfirmation: '',
    },
  });

  const onSubmit = async (data: RegisterSchemaType) => {
    setLoading(true);
    register(data).then((res) => {
      if (res.error) {
        setLoading(false);
        setError(res.error);
        setSuccess('');
      }
      if (res.success) {
        setLoading(false);
        setError('');
        setSuccess(res.success);
      }
      setLoading(false);
    });
  };
  return (
    <CardWrapper
      headerLabel='Створіть акаунт'
      title='Реєстрація'
      backButtonHref='/auth/login'
      backButtonLabel='Вже маєте акаунт? Увійти'
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-green-500'>E-пошта</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='E-mail' type='email' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-green-500'>Ім&apos;я</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Ім'я" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-green-500'>Пароль</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='******' type='password' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='passwordConfirmation'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-green-500'>Підтвердіть пароль</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='******' type='password' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormSuccess message={success} />
          <FormError message={error} />
          <Button
            type='submit'
            className='w-full cursor-pointer bg-green-500 hover:bg-green-400'
            disabled={loading}
          >
            {loading ? 'Хвилинку...' : 'Реєстрація'}
          </Button>
        </form>
      </Form>
      <GoogleLogin />
    </CardWrapper>
  );
};
export default RegisterForm;
