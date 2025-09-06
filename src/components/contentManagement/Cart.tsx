import React from 'react';

const Cart = ({cart,setCart,total}:any) => {
  return (
    <div className='w-auto bg-white shadow-lg p-4 flex flex-col rounded-l-xl mt-1'>
      <div className='flex gap-2 mb-3'>
        <button className='px-3 py-1 bg-gray-200 rounded hover:bg-gray-300'>QR</button>
        <button className='px-3 py-1 bg-gray-200 rounded hover:bg-gray-300'>Return</button>
        <button className='px-3 py-1 bg-gray-200 rounded hover:bg-gray-300'>Items: {cart.length}</button>
        <button className='px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 ml-auto' onClick={() => setCart([])}>
          Clear
        </button>
      </div>

      <div className='flex-1 overflow-y-auto'>
        <div className='grid grid-cols-3 font-semibold text-gray-600 text-sm border-b pb-2 mb-2'>
          <span>Name</span>
          <span className='text-center'>Qty</span>
          <span className='text-right'>Price</span>
        </div>

        {cart.length === 0 ? (
          <p className='text-gray-500 text-sm'>No items in cart</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className='grid grid-cols-3 items-center text-sm py-2 border-b'>
              <span>{item.name}</span>

              <div className='flex justify-center items-center gap-2'>
                <button
                  onClick={() =>
                    setCart((prev) => prev.map((c) => (c.id === item.id && c.quantity > 1 ? { ...c, quantity: c.quantity - 1 } : c)))
                  }
                  className='px-2 bg-gray-200 rounded hover:bg-gray-300'
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => setCart((prev) => prev.map((c) => (c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c)))}
                  className='px-2 bg-gray-200 rounded hover:bg-gray-300'
                >
                  +
                </button>
              </div>

              <span className='text-right'>Rs. {item.price * item.quantity}</span>
            </div>
          ))
        )}
      </div>

      <div className='mt-4 border-t pt-3'>
        <p className='font-bold text-right text-gray-800'>Total: Rs. {total}</p>
        <div className='flex gap-2 mt-3'>
          <button className='flex-1 bg-[#00BE38] text-white py-2 rounded-lg '>Save Bill</button>
          <button className='flex-1 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700'>Print Bill</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
