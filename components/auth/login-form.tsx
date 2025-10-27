'use client';
import { login } from '@/actions/login';
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
import { LoginSchema, LoginSchemaType } from '@/schemas/LoginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import CardWrapper from './card-wrapper';
import { FormError } from './form-error';
import { FormSuccess } from './form-success';
import GoogleLogin from './google-button';

const LoginForm = () => {
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setLoading(true);
    login(data).then((res) => {
      if (res?.error) {
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
      headerLabel='Увійдіть у свій акаунт'
      title='Вхід'
      backButtonHref='/auth/register'
      backButtonLabel='Немає акаунта? Реєстрація'
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
                  <FormLabel className='text-green-400'>Е-пошта</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Е-пошта' type='email' />
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
                  <FormLabel className='text-green-400'>Пароль</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='******' type='password' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Link href='#' className='text-green-400'>
              Забули пароль?
            </Link>
          </div>
          <FormSuccess message={success} />
          <FormError message={error} />
          <Button
            type='submit'
            className='w-full cursor-pointer text-green-500 hover:text-green-400 '
            variant={'outline'}
            disabled={loading}
          >
            {loading ? 'Хвилинку...' : 'Логін'}
          </Button>
        </form>
      </Form>
      <GoogleLogin />
    </CardWrapper>
  );
};
export default LoginForm;
