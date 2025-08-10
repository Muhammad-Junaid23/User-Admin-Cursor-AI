'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { X } from 'lucide-react';
import { InventoryItem } from './types';

interface EditItemModalProps {
  item: InventoryItem;
  onClose: () => void;
  onSave: (item: InventoryItem) => void;
}

export default function EditItemModal({ item, onClose, onSave }: EditItemModalProps) {
  const [form, setForm] = useState({
    name: item.name,
    quantity: item.quantity,
    price: item.price,
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({
      ...item,
      name: form.name,
      quantity: Number(form.quantity),
      price: Number(form.price),
    });
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4'>
      <div className='w-full max-w-md bg-white rounded-lg shadow-lg'>
        <div className='flex items-center justify-between px-5 py-3 shadow-sm shadow-green-300'>
          <h3 className='font-semibold text-gray-800'>Edit Item</h3>
          <button onClick={onClose} className='p-1 rounded hover:bg-gray-100 text-gray-500' aria-label='Close'>
            <X className='w-5 h-5' />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='px-5 py-4 space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Item name</label>
            <Input
              value={form.name}
              onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
              placeholder='Enter item name'
              required
            />
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Quantity</label>
              <Input
                type='number'
                min='0'
                value={form.quantity}
                onChange={(e) => setForm((s) => ({ ...s, quantity: e.target.valueAsNumber }))}
                placeholder='0'
                required
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Price</label>
              <Input
                type='number'
                min='0'
                step='0.01'
                value={form.price}
                onChange={(e) => setForm((s) => ({ ...s, price: e.target.valueAsNumber }))}
                placeholder='0.00'
                required
              />
            </div>
          </div>

          <div className='flex justify-end gap-3 pt-2'>
            <Button variant='outline' type='button' onClick={onClose} className='min-w-[96px]'>
              Cancel
            </Button>
            <Button type='submit' className='min-w-[96px]'>
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
