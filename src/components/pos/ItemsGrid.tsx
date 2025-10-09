import React from 'react';

const ItemsGrid = ({ items, onAddToCart }: any) => {
  return (
    <div className='w-full h-full p-2 grid grid-cols-5 gap-1 overflow-y-auto'>
      {items.map((item: any) => (
        // <div
        //   key={item.id}
        //   className='bg-white rounded-lg shadow hover:shadow-md transition flex flex-col items-center justify-center p-2 cursor-pointer hover:scale-[1.01]'
        //   onClick={() => onAddToCart(item)}
        // >
        //   {/* Product Image Placeholder */}
        //   <div className='w-10 h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md flex items-center justify-center'>
        //     <span className='text-[10px] text-gray-500'>Img</span>
        //   </div>

        //   {/* Product Name */}
        //   <h3 className='font-medium text-[11px] text-center text-gray-800 truncate w-full mt-1'>{item.name}</h3>

        //   {/* Product Price */}
        //   <p className='text-gray-900 text-[10px] mt-0.5'>Rs. {item.price}</p>
        // </div>
        <div
          key={item.id}
          onClick={() => onAddToCart(item)}
          className='relative bg-gray-200 rounded-md shadow-sm hover:shadow-md transition cursor-pointer hover:scale-[1.01] h-full group'
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
