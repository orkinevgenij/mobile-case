import React from 'react';
import 'react-toastify/dist/ReactToastify.css';

export default async function HomeLayout({
  children,
  category,
}: Readonly<{
  children: React.ReactNode;
  category: React.ReactNode;
}>) {
  return (
    <div>
      {children}
      {category}
    </div>
  );
}
