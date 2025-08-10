'use client';

import { Edit2 } from 'lucide-react';
import { InventoryItem } from './types';

interface InventoryTableProps {
  items: InventoryItem[];
  onEditItem: (item: InventoryItem) => void;
}

export default function InventoryTable({ items, onEditItem }: InventoryTableProps) {
  return (
    <div className='overflow-x-auto bg-white rounded-lg shadow'>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-100'>
          <tr>
            <th className='px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>ID</th>
            <th className='px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>Name</th>
            <th className='px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>Category</th>
            <th className='px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>Sub-category</th>
            <th className='px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider'>Quantity</th>
            <th className='px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider'>Price</th>
            <th className='px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider'>Edit</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200'>
          {items.map((item) => (
            <tr key={item.id} className='hover:bg-gray-50'>
              <td className='px-4 py-3 text-sm text-gray-700'>{item.id}</td>
              <td className='px-4 py-3 text-sm text-gray-900 font-medium'>{item.name}</td>
              <td className='px-4 py-3 text-sm text-gray-700'>{item.category}</td>
              <td className='px-4 py-3 text-sm text-gray-700'>{item.subCategory}</td>
              <td className='px-4 py-3 text-sm text-gray-700 text-right'>{item.quantity}</td>
              <td className='px-4 py-3 text-sm text-gray-700 text-right'>Rs {item.price}</td>
              <td className='px-4 py-3 text-sm text-gray-700 text-center'>
                <button
                  onClick={() => onEditItem(item)}
                  className='inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100'
                >
                  <Edit2 className='w-4 h-4' /> Edit
                </button>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan={7} className='px-4 py-8 text-center text-sm text-gray-500'>
                No items in this sub-category.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
