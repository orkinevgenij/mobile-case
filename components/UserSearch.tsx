import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const UserSearch = () => {
  const [showInput, setShowInput] = useState(false);
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('name') || '');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (search) {
      params.set('name', search);
    } else {
      params.delete('name');
    }
    router.replace(`/search-products?${params}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowInput(false);
      }
    };

    if (showInput) {
      document.addEventListener('mousedown', handleClickOutside);
      inputRef.current?.focus();
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showInput]);

  return (
    <>
      <div
        className='flex flex-col items-center cursor-pointer hover:text-green-400'
        onClick={() => setShowInput((prev) => !prev)}
      >
        <Search size={25} />
        <span>Пошук</span>
      </div>

      {showInput && (
        <form
          ref={containerRef}
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className='flex absolute left-1/2 -translate-x-1/2 top-2 w-full z-10'
        >
          <Input
            ref={inputRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Пошук'
            className='bg-white text-slate-800 w-full text-center py-10 mx-2'
          />
          <Button
            type='submit'
            size='lg'
            className='absolute right-4 top-6 bg-green-500 hover:bg-green-400 cursor-pointer'
          >
            Пошук
          </Button>
        </form>
      )}
    </>
  );
};

export default UserSearch;
