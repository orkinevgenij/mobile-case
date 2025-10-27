import { useDebounceValue } from '@/hooks/useDebounceValue';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Input } from '../ui/input';

const DashboardSearch = () => {
  const [search, setSearch] = useState<string>('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const debounceValue = useDebounceValue<string>(search);
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debounceValue) {
      params.set('name', debounceValue);
    } else {
      params.delete('name');
    }
    router.replace(`/dashboard/all-products?${params.toString()}`);
  }, [debounceValue, router, searchParams]);
  return <Input placeholder='Пошук товару' onChange={(e) => setSearch(e.target.value)} />;
};
export default DashboardSearch;
