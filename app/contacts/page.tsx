import Link from 'next/link';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function ContactsPage() {
  return (
    <div className='min-h-screen bg-gray-50 py-10 px-5'>
      <div className='max-w-5xl mx-auto'>
        <h1 className='text-3xl font-bold text-center mb-10'>Контакти</h1>
        <div className='grid md:grid-cols-2 gap-8 mb-12'>
          <div className='space-y-4 bg-white shadow rounded-2xl p-6'>
            <h2 className='text-xl font-semibold mb-4'>Наші дані</h2>
            <p className='flex items-center gap-2'>
              <MapPin className='text-blue-500' /> м. Дніпро, вул. Менахема Мендла Шнеєрсона
            </p>
            <p className='flex items-center gap-2'>
              <Phone className='text-green-500' /> +38 (050) 858-57-00
            </p>
            <p className='flex items-center gap-2'>
              <Mail className='text-red-500' /> mobilecase@gmail.com
            </p>
            <p className='flex items-center gap-2'>
              <Clock className='text-green-500' /> Пн–Пт: 09:00 – 18:00
            </p>
            <div className='flex gap-4 mt-4'>
              <Link href='#' className='text-blue-600 hover:opacity-70'>
                <FaFacebookF />
              </Link>
              <Link href='#' className='text-pink-600 hover:opacity-70'>
                <FaInstagram />
              </Link>
              <Link href='#' className='text-blue-800 hover:opacity-70'>
                <FaLinkedinIn />
              </Link>
            </div>
          </div>
          <form className='bg-white shadow rounded-2xl p-6 space-y-4'>
            <h2 className='text-xl font-semibold mb-4'>Напишіть нам</h2>
            <input
              type='text'
              placeholder='Ваше ім’я'
              className='w-full border p-2 rounded-lg'
              required
            />
            <input
              type='email'
              placeholder='Ваш Email'
              className='w-full border p-2 rounded-lg'
              required
            />
            <textarea
              placeholder='Ваше повідомлення'
              className='w-full border p-2 rounded-lg'
              rows={4}
              required
            />
            <button
              type='submit'
              className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition'
            >
              Відправити
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
