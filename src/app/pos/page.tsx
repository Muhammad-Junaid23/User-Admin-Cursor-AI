'use client';
import { useState } from 'react';
import { INITIAL_DATA } from '@/components/inventory/dummyData';
import Header from '@/components/contentManagement/Header';
import SubcategoriesSidebar from '@/components/contentManagement/SubcategoriesSidebar';
import ItemsGrid from '@/components/pos/ItemsGrid';
import Cart from '@/components/pos/Cart';

type CategoryMap = typeof INITIAL_DATA;
type Category = keyof CategoryMap;
type SubCategory = string;

export default function POSUserPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('Pharmacy');
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory>(Object.keys(INITIAL_DATA[selectedCategory])[0]);
  const [cart, setCart] = useState<any[]>([]);

  const categories = Object.keys(INITIAL_DATA) as Category[];
  const subCategories = Object.keys(INITIAL_DATA[selectedCategory]);
  const items = INITIAL_DATA[selectedCategory][selectedSubCategory];
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleRemove = (id: number) => {
    setCart((prev: any[]) => prev.filter((item) => item.id !== id));
  };

  const handleAddToCart = (item: any) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) => (c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c));
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  return (
    <div className='flex flex-col h-screen'>
      {/* Header */}
      <Header
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        setSelectedSubCategory={setSelectedSubCategory}
        INITIAL_DATA={INITIAL_DATA}
      />

      {/* Body */}
      <div className='flex flex-1'>
        <SubcategoriesSidebar
          subCategories={subCategories}
          selectedSubCategory={selectedSubCategory}
          setSelectedSubCategory={setSelectedSubCategory}
        />

        {/* Product Grid */}
        <ItemsGrid items={items} onAddToCart={handleAddToCart} />

        {/* Cart Section */}
        <Cart cart={cart} setCart={setCart} total={total} handleRemove={handleRemove} />
      </div>
    </div>
  );
}
