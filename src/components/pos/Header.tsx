import React from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  categories: string[];
  setSelectedSubCategory: (sub: string) => void;
  INITIAL_DATA: any;
}

const Header = ({ selectedCategory, setSelectedCategory, categories, setSelectedSubCategory, INITIAL_DATA }: HeaderProps) => {
  const handleCategoryChange = (direction: 'prev' | 'next') => {
    const currentIndex = categories.indexOf(selectedCategory);
    const newIndex =
      direction === 'next' ? (currentIndex + 1) % categories.length : (currentIndex - 1 + categories.length) % categories.length;

    const newCat = categories[newIndex];
    setSelectedCategory(newCat);
    setSelectedSubCategory(Object.keys(INITIAL_DATA[newCat])[0]);
  };

  return (
    <header className='w-full bg-white shadow-sm rounded-xl p-4 flex flex-col gap-3'>
      {/* --- Top Row --- */}
      <div className='flex items-center justify-between'>
        {/* Logo */}
        <div className='flex items-center gap-2'>
          <Image src='/images/logo.jpg' alt='Trust Nexus' width={40} height={40} className='rounded-md' />
          <span className='font-semibold text-gray-800 text-lg'>Trust Nexus</span>
        </div>

        {/* Center Title */}
        <h1 className='text-3xl font-bold text-gray-900 text-center flex-1'>Pharmacy</h1>

        {/* Admin Login */}
        <Link
          href='/admin/analytics'
          className='font-medium px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-900 cursor-pointer'
        >
          Admin Login
        </Link>
      </div>

      {/* --- Bottom Row --- */}
      <div className='flex items-center justify-between'>
        {/* QR Scanner Button */}
        <button className='px-4 py-2 bg-[#00BE38] font-medium text-white rounded-lg hover:bg-[#00a32f] transition cursor-pointer'>
          QR Scanner
        </button>

        {/* Category Navigation */}
        <div className='flex items-center gap-2'>
          <button onClick={() => handleCategoryChange('prev')} className='p-2 bg-gray-200 rounded-full hover:bg-gray-300 cursor-pointer'>
            <ChevronLeft className='w-5 h-5 text-gray-700' />
          </button>

          <span className='px-6 py-2 bg-[#00BE38] rounded-lg font-medium text-white shadow-sm cursor-pointer'>{selectedCategory}</span>

          <button onClick={() => handleCategoryChange('next')} className='p-2 bg-gray-200 rounded-full hover:bg-gray-300 cursor-pointer'>
            <ChevronRight className='w-5 h-5 text-gray-700' />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
