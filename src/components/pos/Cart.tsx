import React from 'react';
import { X } from 'lucide-react';

const Cart = ({ cart, setCart, total }: any) => {
  const handleRemove = (id: number) => {
    setCart((prev: any[]) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className='w-md h-full bg-white shadow-lg p-4 flex flex-col rounded-l-xl mt-1'>
      {/* Header Buttons */}
      <div className='flex gap-2 mb-3'>
        <button className='px-3 py-1 bg-gray-200 rounded hover:bg-gray-300'>Items: {cart.length}</button>
        <button className='px-3 py-1 bg-gray-200 rounded hover:bg-gray-300'>Return</button>
        <button className='px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 ml-auto' onClick={() => setCart([])}>
          Clear
        </button>
      </div>

      {/* Cart Table */}
      <div className='flex-1 overflow-y-auto border-t border-b py-2'>
        <div className='grid grid-cols-4 font-semibold text-gray-600 text-sm pb-2'>
          <span className='col-span-2'>Name</span>
          <span className='text-center'>Qty</span>
          <span className='text-right'>Price</span>
        </div>

        {cart.length === 0 ? (
          <p className='text-gray-500 text-sm mt-3'>No items in cart</p>
        ) : (
          cart.map((item: any) => (
            <div key={item.id} className='grid grid-cols-4 items-center text-sm py-3 border-b'>
              <div className='col-span-2 flex items-center justify-between gap-1'>
                <span className='truncate'>{item.name}</span>
                <button onClick={() => handleRemove(item.id)} className='text-gray-500 hover:text-red-500' title='Remove item'>
                  <X size={14} />
                </button>
              </div>

              <div className='flex justify-center items-center gap-1'>
                <button
                  onClick={() =>
                    setCart((prev: any[]) => prev.map((c) => (c.id === item.id && c.quantity > 1 ? { ...c, quantity: c.quantity - 1 } : c)))
                  }
                  className='px-2 bg-gray-200 rounded-full hover:bg-gray-300'
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => setCart((prev: any[]) => prev.map((c) => (c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c)))}
                  className='px-2 bg-gray-200 rounded-full hover:bg-gray-300'
                >
                  +
                </button>
              </div>

              <span className='text-right'>Rs. {item.price * item.quantity}</span>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className='mt-3'>
        <p className='font-bold text-right text-gray-800'>Total: Rs. {total}</p>
        <div className='flex gap-2 mt-3'>
          <button className='flex-1 bg-[#00BE38] text-white py-2 rounded-lg'>Save Bill</button>
          <button className='flex-1 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700'>Print Bill</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
