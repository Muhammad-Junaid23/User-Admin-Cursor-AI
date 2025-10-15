import React from 'react';

const ItemsGrid = ({ items, onAddToCart }: any) => {
  return (
    <div className='w-full h-1/3 p-2 grid grid-cols-5 gap-2'>
      {items.map((item: any) => (
        <div
          key={item.id}
          onClick={() => onAddToCart(item)}
          className='relative bg-gray-200 rounded-md shadow-sm hover:shadow-md transition cursor-pointer hover:scale-[1.01] group'
          style={{
            backgroundImage: `url(${item.image || ''})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Overlay with fade effect */}
          <div className='absolute inset-0 bg-black/45 group-hover:bg-black/25 transition-all duration-300 flex flex-col items-center justify-center text-white text-center rounded-md px-1'>
            <span className='text-sm font-semibold truncate w-full leading-tight'>{item.name}</span>
            <span className='text-md font-bold leading-tight'>Rs. {item.price}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemsGrid;
