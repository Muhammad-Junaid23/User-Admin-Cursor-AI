'use client';

import { useMemo, useState } from 'react';
import { InventoryItem, CategoryMap } from './types';
import InventoryTable from './InventoryTable';
import EditItemModal from './EditItemModal';
import CategoryFilters from './CategoryFilters';
import { INITIAL_DATA } from './dummyData';

export default function InventoryView() {
  const [dataByCategory, setDataByCategory] = useState<CategoryMap>(INITIAL_DATA);
  const [selectedCategory, setSelectedCategory] = useState<string>('Pharmacy');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('All');
  const [modalState, setModalState] = useState<{ item: InventoryItem } | null>(null);

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

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 py-5'>
        <div className='flex items-center justify-between mb-6'>
          <h1 className='text-2xl font-bold text-gray-800'>Inventory</h1>
        </div>

        <CategoryFilters
          selectedCategory={selectedCategory}
          selectedSubCategory={selectedSubCategory}
          categories={categories}
          subCategories={subCategories}
          onCategoryChange={(value) => {
            setSelectedCategory(value);
            setSelectedSubCategory('All');
          }}
          onSubCategoryChange={setSelectedSubCategory}
        />

        <InventoryTable items={items} onEditItem={(item) => setModalState({ item })} />
      </div>

      {modalState && <EditItemModal item={modalState?.item} onClose={() => setModalState(null)} onSave={handleSaveItem} />}
    </div>
  );
}
