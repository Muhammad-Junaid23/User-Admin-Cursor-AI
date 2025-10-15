import React from 'react';
import { Trash2, CirclePlus, CircleMinus, Save, Printer } from 'lucide-react';

const Cart = ({ cart, setCart, total }: any) => {
  const handleRemove = (id: number) => {
    setCart((prev: any[]) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className='w-lg h-full bg-white shadow-lg p-4 flex flex-col rounded-l-xl mt-1'>
      {/* Header Buttons */}
      <div className='flex gap-3 mb-3'>
        <button className='px-3 py-1 bg-gray-200 rounded hover:bg-gray-300'>Items: {cart.length}</button>
        <button className='px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer'>Return</button>
        {/* <button className='px-3 py-1 bg-yellow-500 text-white rounded'>QR Scan</button> */}
        <button className='px-3 py-1 bg-red-500 text-white rounded ml-auto hover:bg-red-600 cursor-pointer' onClick={() => setCart([])}>
          Clear
        </button>
      </div>

      {/* Cart Table */}
      <div className='flex-1 overflow-y-auto border-t border-b py-2'>
        <div className='grid grid-cols-4 font-semibold text-gray-600 text-sm pb-2 border-b border-b-gray-400'>
          <span className='col-span-2'>Name</span>
          <span className='text-center'>Qty</span>
          <span className='text-right'>Price</span>
        </div>

        {cart.length === 0 ? (
          <p className='text-gray-500 text-sm mt-3'>No items in cart</p>
        ) : (
          cart.map((item: any) => (
            <div key={item.id} className='grid grid-cols-4 items-center text-sm py-2 border-b border-b-gray-400'>
              <div className='col-span-2'>
                <span className='truncate'>{item.name}</span>
              </div>

              <div className='flex justify-center items-center bg-gray-100 rounded-full'>
                <button
                  onClick={() =>
                    setCart((prev: any[]) => prev.map((c) => (c.id === item.id && c.quantity > 1 ? { ...c, quantity: c.quantity - 1 } : c)))
                  }
                  className=' text-red-500 cursor-pointer'
                >
                  <CircleMinus size={18} />
                </button>
                <span className='py-1 px-2 '>{item.quantity}</span>
                <button
                  onClick={() => setCart((prev: any[]) => prev.map((c) => (c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c)))}
                  className=' text-green-500 cursor-pointer'
                >
                  <CirclePlus size={18} />
                </button>
              </div>

              <span className='text-right flex flex-col items-end gap-0.5 font-bold'>
                Rs. {item.price * item.quantity}{' '}
                <button onClick={() => handleRemove(item.id)} className='text-red-600 cursor-pointer ' title='Remove item'>
                  <Trash2 size={15} />
                </button>
              </span>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className='mt-3'>
        <p className='font-bold text-right text-gray-800'>Total: Rs {total}</p>

        <div className='flex gap-2 mt-3'>
          {/* Save Bill Button */}
          <button className='flex-1 flex items-center justify-center gap-2 bg-[#00BE38] text-white py-2 rounded-lg hover:bg-[#00a732] transition cursor-pointer'>
            <Save className='w-4 h-4' />
            <span>Save Bill</span>
          </button>

          {/* Print Bill Button */}
          <button className='flex-1 flex items-center justify-center gap-2 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition cursor-pointer'>
            <Printer className='w-4 h-4' />
            <span>Print Bill</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
