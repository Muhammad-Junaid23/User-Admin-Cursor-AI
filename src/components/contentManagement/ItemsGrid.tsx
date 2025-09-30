import React from 'react';

const ItemsGrid = ({ items, setEditingItem }: any) => {
  return (
    <div className='w-full h-40 p-4 grid grid-cols-4 gap-4'>
      {items.map((item) => (
        <div
          key={item.id}
          className='w-40 h-auto bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col items-center justify-center gap-2 p-3 cursor-pointer'
          onClick={() => setEditingItem(item)}
        >
          <div className='w-16 h-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg flex items-center justify-center'>
            <span className='text-xs text-gray-500'>Image</span>
          </div>
          <h3 className='font-semibold text-sm text-center text-gray-800 truncate w-full'>{item.name}</h3>
          <p className='text-gray-900 text-xs'>Rs. {item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ItemsGrid;
