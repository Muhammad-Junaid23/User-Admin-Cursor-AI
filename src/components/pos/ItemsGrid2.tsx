import React from 'react';
import Image from 'next/image';

const ItemsGrid2 = ({ items, onAddToCart }: any) => {
  return (
    <div className='w-full h-fit p-2 grid grid-cols-6 gap-2'>
      {items.map((item: any) => (
        <div
          key={item.id}
          className='bg-white rounded-md shadow hover:shadow-lg transition-transform hover:scale-[1.03] cursor-pointer flex flex-col items-center justify-start overflow-hidden'
          onClick={() => onAddToCart(item)}
        >
          {/* Product Image */}
          <div className='w-full h-14 relative'>
            <Image src={item.image} alt={item.name} fill className='object-cover transition-transform duration-300 group-hover:scale-105' />
            <div className='absolute inset-0 bg-black/20 hover:bg-black/10 transition-all duration-300'></div>
          </div>

          {/* Details */}
          <div className='w-full px-1 py-1 flex flex-col items-center text-center'>
            <h3 className='font-medium text-sm text-gray-800 truncate w-full'>{item.name}</h3>
            <p className='text-gray-700 text-sm font-bold'>Rs. {item.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemsGrid2;
