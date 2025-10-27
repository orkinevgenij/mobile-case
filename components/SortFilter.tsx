'use client';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter, useSearchParams } from 'next/navigation';

const filterSort = [
  { value: 'desc', label: 'За датою ↑' },
  { value: 'asc', label: 'За датою ↓' },
];

const SortFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filterOrders = (value: 'asc' | 'desc') => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('filter', value);
    router.push(`?${params.toString()}`);
  };
  return (
    <Select
      defaultValue={searchParams.get('filter') || filterSort[0].value}
      onValueChange={(value) => filterOrders(value as 'asc' | 'desc')}
    >
      <SelectTrigger className='w-[180px]'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {filterSort.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
export default SortFilter;
