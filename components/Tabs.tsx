'use client';
import { useState } from 'react';

const tabs = [
  {
    name: 'Доставка',
  },
  {
    name: 'Оплата',
  },
];

const Tabs = () => {
  const [index, setIndex] = useState<number>(0);
  return (
    <div className='flex flex-col gap-3'>
      <div className='flex gap-2'>
        {tabs.map((tab, idx) => (
          <p
            key={idx}
            className={`cursor-pointer text-md font-bold ${
              index === idx ? `text-blue-400 ` : ` text-neutral-800`
            }`}
            onClick={() => setIndex(idx)}
          >
            {tab.name}
          </p>
        ))}
      </div>
      {index === 0 && (
        <div className='text-neutral-500'>
          <div>
            <span className='font-bold'>Новою Поштою у відділення / поштомат: </span>
            <span className='line-through text-sm'>80 грн</span>{' '}
            <span className='text-red-500'> 39 грн</span>
          </div>
          <div>
            <span className='font-bold'>Новою Поштою за адресою:</span>
            <span className='text-sm'> 89 грн</span>
          </div>

          <div></div>
        </div>
      )}
      {index === 1 && (
        <div className='text-neutral-500'>
          <p> - Оплата готівкою в магазині/кур&apos;єру</p>
          <p> - Оплата на картку ПриватБанку</p>
          <p> - Онлайн-оплата LiqPay</p>
        </div>
      )}
    </div>
  );
};
export default Tabs;
