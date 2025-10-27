'use client';
import Container from '@/components/Container';
import { useEffect } from 'react';

export default function ErrorPage({ error }: { error: Error }) {
  useEffect(() => {
    console.error(`${error}`);
  }, [error]);
  return (
    <Container>
      <div className='max-h-64 overflow-y-auto p-2 bg-gray-900 text-orange-400 rounded'>
        <pre className='whitespace-pre-wrap break-words'>{error.message}</pre>
      </div>
    </Container>
  );
}
