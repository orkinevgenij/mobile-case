'use client';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Input } from '../ui/input';

const SearchInput = () => {
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const [value, setValue] = useState<string>('');
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    router.replace(`/search-list/?name=${e.target.value}`);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowInput(false);
      }
    };

    if (showInput) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showInput]);

  return (
    <>
      <div
        className='flex flex-col items-center cursor-pointer'
        onClick={() => setShowInput((prev) => !prev)}
      >
        <Search size={25} />
        <span>Пошук</span>
      </div>
      {showInput && (
        <div ref={inputRef} className='flex absolute left-1/2 -translate-x-1/2 top-2 w-full'>
          <Input
            onChange={handleSearch}
            placeholder='Пошук'
            className='bg-white text-slate-800 w-full text-center py-10 mx-2'
          />
          <X
            className='text-slate-900 cursor-pointer absolute right-4 top-6'
            size={30}
            onClick={() => setShowInput(false)}
          />
        </div>
      )}
    </>
  );
};
export default SearchInput;
