'use client';

import { useMemo, useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Edit2, Plus, X } from 'lucide-react';

export type InventoryItem = {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  price: number;
  quantity: number;
  imageUrl?: string;
};

type CategoryMap = Record<string, Record<string, InventoryItem[]>>;

const INITIAL_DATA: CategoryMap = {
  Pharmacy: {
    'Pain Relief': [
      { id: 'P-001', name: 'Paracetamol 500mg', category: 'Pharmacy', subCategory: 'Pain Relief', price: 2.5, quantity: 120 },
      { id: 'P-002', name: 'Ibuprofen 200mg', category: 'Pharmacy', subCategory: 'Pain Relief', price: 3.2, quantity: 80 },
    ],
    Antibiotics: [{ id: 'P-101', name: 'Amoxicillin 500mg', category: 'Pharmacy', subCategory: 'Antibiotics', price: 8.4, quantity: 40 }],
    Vitamins: [{ id: 'P-201', name: 'Vitamin C 1000mg', category: 'Pharmacy', subCategory: 'Vitamins', price: 5.9, quantity: 65 }],
  },
  Grocery: {
    Beverages: [
      { id: 'G-001', name: 'Orange Juice 1L', category: 'Grocery', subCategory: 'Beverages', price: 2.1, quantity: 30 },
      { id: 'G-002', name: 'Green Tea 50pcs', category: 'Grocery', subCategory: 'Beverages', price: 1.8, quantity: 55 },
    ],
    Snacks: [{ id: 'G-101', name: 'Potato Chips 150g', category: 'Grocery', subCategory: 'Snacks', price: 1.2, quantity: 200 }],
    Dairy: [{ id: 'G-201', name: 'Whole Milk 1L', category: 'Grocery', subCategory: 'Dairy', price: 1.5, quantity: 90 }],
  },
};

export default function InventoryView() {
  const [dataByCategory, setDataByCategory] = useState<CategoryMap>(INITIAL_DATA);
  const [selectedCategory, setSelectedCategory] = useState<string>('Pharmacy');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('All');
  const [modalState, setModalState] = useState<{ mode: 'edit'; item: InventoryItem } | { mode: 'add' } | null>(null);

  const categories = useMemo(() => Object.keys(dataByCategory), [dataByCategory]);
  const subCategories = useMemo(() => {
    const subs = Object.keys(dataByCategory[selectedCategory] ?? {});
    return ['All', ...subs];
  }, [dataByCategory, selectedCategory]);

  const items: InventoryItem[] = useMemo(() => {
    const categoryBucket = dataByCategory[selectedCategory] ?? {};
    const allItems = Object.values(categoryBucket).flat();
    if (selectedSubCategory === 'All') return allItems;
    return categoryBucket[selectedSubCategory] ?? [];
  }, [dataByCategory, selectedCategory, selectedSubCategory]);

  function handleSaveItem(updated: InventoryItem) {
    setDataByCategory((prev) => {
      const next = structuredClone(prev) as CategoryMap;
      const catBucket = next[updated.category] ?? {};
      const list = (catBucket[updated.subCategory] ?? []).map((it) => (it.id === updated.id ? updated : it));
      catBucket[updated.subCategory] = list;
      next[updated.category] = catBucket;
      return next;
    });
    setModalState(null);
  }

  function handleAddItem(newItem: Omit<InventoryItem, 'id'>) {
    const idPrefix = selectedCategory === 'Pharmacy' ? 'P' : 'G';
    const newId = `${idPrefix}-${Math.floor(Math.random() * 900 + 100)}`;
    const item: InventoryItem = { id: newId, ...newItem };
    setDataByCategory((prev) => {
      const next = structuredClone(prev) as CategoryMap;
      if (!next[item.category]) next[item.category] = {} as Record<string, InventoryItem[]>;
      if (!next[item.category][item.subCategory]) next[item.category][item.subCategory] = [];
      next[item.category][item.subCategory].push(item);
      return next;
    });
    setModalState(null);
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-6xl mx-auto px-4 py-8'>
        <div className='flex items-center justify-between mb-6'>
          <h1 className='text-2xl font-bold text-gray-800'>Inventory</h1>
          <Button className='flex items-center gap-2' onClick={() => setModalState({ mode: 'add' })}>
            <Plus className='w-4 h-4' /> Add Item
          </Button>
        </div>

        <div className='flex flex-col sm:flex-row gap-3 mb-6'>
          <div className='flex-1 sm:flex-none'>
            <label className='block text-xs font-medium text-gray-600 mb-1'>Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedCategory(value);
                setSelectedSubCategory('All');
              }}
              className='w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className='flex-1 sm:flex-none'>
            <label className='block text-xs font-medium text-gray-600 mb-1'>Sub-category</label>
            <select
              value={selectedSubCategory}
              onChange={(e) => setSelectedSubCategory(e.target.value)}
              className='w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              {subCategories.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        </div>

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
                  <td className='px-4 py-3 text-sm text-gray-700 text-right'>${item.price.toFixed(2)}</td>
                  <td className='px-4 py-3 text-sm text-gray-700 text-center'>
                    <button
                      onClick={() => setModalState({ mode: 'edit', item })}
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
      </div>

      {modalState && (
        <EditAddItemModal
          mode={modalState.mode}
          item={modalState.mode === 'edit' ? modalState.item : undefined}
          defaultCategory={selectedCategory}
          subCategories={subCategories.filter((s) => s !== 'All')}
          onClose={() => setModalState(null)}
          onSave={handleSaveItem}
          onAdd={handleAddItem}
        />
      )}
    </div>
  );
}

function EditAddItemModal({
  mode,
  item,
  defaultCategory,
  subCategories,
  onClose,
  onSave,
  onAdd,
}: {
  mode: 'edit' | 'add';
  item?: InventoryItem;
  defaultCategory: string;
  subCategories: string[];
  onClose: () => void;
  onSave: (item: InventoryItem) => void;
  onAdd: (item: Omit<InventoryItem, 'id'>) => void;
}) {
  const [form, setForm] = useState({
    name: item?.name ?? '',
    category: item?.category ?? defaultCategory,
    subCategory: item?.subCategory ?? subCategories[0] ?? '',
    quantity: item?.quantity ?? 0,
    price: item?.price ?? 0,
    imageFile: null as File | null,
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (mode === 'edit' && item) {
      onSave({
        id: item.id,
        name: form.name,
        category: form.category,
        subCategory: form.subCategory,
        quantity: Number(form.quantity),
        price: Number(form.price),
        imageUrl: item.imageUrl,
      });
    } else {
      onAdd({
        name: form.name,
        category: form.category,
        subCategory: form.subCategory,
        quantity: Number(form.quantity),
        price: Number(form.price),
      });
    }
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4'>
      <div className='w-full max-w-lg bg-white rounded-lg shadow-lg'>
        <div className='flex items-center justify-between px-5 py-3 border-b'>
          <h3 className='font-semibold text-gray-800'>{mode === 'edit' ? 'Edit Item' : 'Add Item'}</h3>
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
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm((s) => ({ ...s, category: e.target.value }))}
                className='w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                <option value='Pharmacy'>Pharmacy</option>
                <option value='Grocery'>Grocery</option>
              </select>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Sub-category</label>
              <select
                value={form.subCategory}
                onChange={(e) => setForm((s) => ({ ...s, subCategory: e.target.value }))}
                className='w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                {subCategories.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 items-center'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Choose Image</label>
              <input
                type='file'
                accept='image/*'
                onChange={(e) => setForm((s) => ({ ...s, imageFile: e.target.files?.[0] ?? null }))}
                className='block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200'
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
