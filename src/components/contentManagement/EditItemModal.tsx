'use client';
import { useState } from 'react';

export default function EditItemModal({ item, onClose }: { item: any; onClose: () => void }) {
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.price);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(item.image || null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    console.log('Updated Item:', { id: item.id, name, price, imageFile });
    onClose();
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/40 z-50'>
      <div className='bg-white p-6 rounded-2xl w-96 shadow-lg animate-fadeIn'>
        <h2 className='text-xl font-bold mb-4 text-gray-800'>Edit Item</h2>

        {/* Image Upload */}
        <div className='mb-4'>
          <label className='block font-medium text-gray-700 mb-2'>Picture</label>
          <div className='flex flex-col items-center'>
            {preview ? (
              <img src={preview} alt='Preview' className='w-24 h-24 object-cover rounded-lg shadow-md mb-2' />
            ) : (
              <div className='w-24 h-24 bg-gray-200 flex items-center justify-center rounded-lg mb-2'>
                <span className='text-gray-500 text-sm'>No Image</span>
              </div>
            )}
            <input type='file' accept='image/*' onChange={handleFileChange} className='block text-sm text-gray-600' />
          </div>
        </div>

        {/* Name */}
        <label className='block mb-3'>
          <span className='text-gray-700 font-medium'>Name</span>
          <input
            className='w-full border p-2 rounded-lg mt-1 focus:ring-2 focus:ring-blue-400 outline-none'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        {/* Price */}
        <label className='block mb-4'>
          <span className='text-gray-700 font-medium'>Price</span>
          <input
            type='number'
            className='w-full border p-2 rounded-lg mt-1 focus:ring-2 focus:ring-blue-400 outline-none'
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </label>

        {/* Actions */}
        <div className='flex justify-end gap-3'>
          <button className='px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition' onClick={onClose}>
            Cancel
          </button>
          <button className='px-4 py-2 bg-[#00BE38] text-white rounded-lg  transition' onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
