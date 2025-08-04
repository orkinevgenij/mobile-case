'use client';
import { useDebounceValue } from '@/hooks/useDebounceValue';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Input } from '../ui/input';

const DashboardSearch = () => {
  const [search, setSearch] = useState<string>('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const debounceValue = useDebounceValue<string>(search);
  useEffect(() => {
    if (debounceValue) {
      params.set('name', debounceValue);
    } else {
      params.delete('name');
    }
    router.replace(`/dashboard/all-products?${params.toString()}`);
  }, [debounceValue]);
  return <Input placeholder='Пошук товару' onChange={(e) => setSearch(e.target.value)} />;
};
export default DashboardSearch;
