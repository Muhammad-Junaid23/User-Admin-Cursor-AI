'use client';

import { useState } from 'react';
import { INITIAL_DATA } from '@/components/inventory/dummyData';
import EditItemModal from '@/components/contentManagement/EditItemModal';
import Header from '@/components/contentManagement/Header';
import SubcategoriesSidebar from '@/components/contentManagement/SubcategoriesSidebar';
import ItemsGrid from '@/components/contentManagement/ItemsGrid';
import Cart from '@/components/contentManagement/Cart';

type CategoryMap = typeof INITIAL_DATA;
type Category = keyof CategoryMap;
type SubCategory = string;

export default function ContentManagementPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('Pharmacy');
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory>(Object.keys(INITIAL_DATA[selectedCategory])[0]);
  const [cart, setCart] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  const categories = Object.keys(INITIAL_DATA) as Category[];
  const subCategories = Object.keys(INITIAL_DATA[selectedCategory]);

  const items = INITIAL_DATA[selectedCategory][selectedSubCategory];

  // const addToCart = (item: any) => {
  //   setCart((prev) => {
  //     const existing = prev.find((c) => c.id === item.id);
  //     if (existing) {
  //       return prev.map((c) => (c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c));
  //     }
  //     return [...prev, { ...item, quantity: 1 }];
  //   });
  // };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className='flex flex-col h-full'>
      {/* Header */}
      <Header
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        setSelectedSubCategory={setSelectedSubCategory}
        INITIAL_DATA={INITIAL_DATA}
      />

      <div className='flex flex-1'>
        {/* Subcategories Sidebar */}
        <SubcategoriesSidebar
          subCategories={subCategories}
          selectedSubCategory={selectedSubCategory}
          setSelectedSubCategory={setSelectedSubCategory}
        />

        {/* Items Grid */}
        <ItemsGrid items={items} setEditingItem={setEditingItem} />

        {/* Cart */}
        <Cart cart={cart} setCart={setCart} total={total} />
      </div>

      {/* Edit Modal */}
      {editingItem && <EditItemModal item={editingItem} onClose={() => setEditingItem(null)} />}
    </div>
  );
}
