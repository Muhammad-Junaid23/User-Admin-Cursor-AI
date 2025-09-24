'use client';
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronDown } from 'lucide-react';
import { INITIAL_DATA } from '../inventory/dummyData';

// Define types for the sales data
interface SalesItem {
  name: string;
  value: number;
  price: number;
}

type SalesDataType = {
  [key: string]: SalesItem[];
};

// Transform dummy data into sales data format
const transformDataToSales = (): SalesDataType => {
  const salesData: SalesDataType = {};

  const allProducts: SalesItem[] = [];
  const seenNames = new Set<string>();

  Object.entries(INITIAL_DATA).forEach(([category, subCategories]) => {
    Object.entries(subCategories).forEach(([_, products]) => {
      products.forEach((product) => {
        if (!seenNames.has(product.name)) {
          seenNames.add(product.name);
          allProducts.push({
            name: product.name,
            value: product.quantity,
            price: product.price,
          });
        }
      });
    });
  });

  salesData.monthly = allProducts.sort((a, b) => b.value - a.value).slice(0, 10);

  salesData.daily = [
    { name: 'Mon', value: 200, price: 2340 },
    { name: 'Tue', value: 500, price: 4230 },
    { name: 'Wed', value: 400, price: 4230 },
    { name: 'Thu', value: 1000, price: 5230 },
    { name: 'Fri', value: 800, price: 320 },
    { name: 'Sat', value: 1200, price: 210 },
    { name: 'Sun', value: 1500, price: 1230 },
  ];

  salesData.topProducts = allProducts.sort((a, b) => b.value - a.value).slice(0, 5);

  salesData.pharmacy = Object.values(INITIAL_DATA.Pharmacy)
    .flat()
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5)
    .map((product) => ({
      name: product.name,
      value: product.quantity,
      price: product.price,
    }));

  salesData.grocery = Object.values(INITIAL_DATA.Grocery)
    .flat()
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5)
    .map((product) => ({
      name: product.name,
      value: product.quantity,
      price: product.price,
    }));

  salesData.electronics = Object.values(INITIAL_DATA.Electronics)
    .flat()
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5)
    .map((product) => ({
      name: product.name,
      value: product.quantity,
      price: product.price,
    }));

  salesData.clothing = Object.values(INITIAL_DATA.Clothing)
    .flat()
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5)
    .map((product) => ({
      name: product.name,
      value: product.quantity,
      price: product.price,
    }));

  return salesData;
};

const salesData = transformDataToSales();

const filterButtons = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'daily', label: 'Daily' },
  { value: 'topProducts', label: 'Top Products' },
];

const categoryOptions = [
  { value: 'pharmacy', label: 'Pharmacy' },
  { value: 'grocery', label: 'Grocery' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'clothing', label: 'Clothing' },
];

export default function SalesChart() {
  const [filter, setFilter] = useState('monthly');
  const [category, setCategory] = useState<string | null>(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  let currentData: SalesItem[];
  if (filter === 'topProducts') {
    if (category) {
      currentData = salesData[category] || salesData.topProducts;
    } else {
      currentData = salesData.topProducts;
    }
  } else {
    currentData = salesData[filter] || salesData.monthly;
  }

  return (
    <div className='w-full p-4 rounded-xl bg-white shadow-md'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-lg font-semibold text-gray-800'>Sales Analytics</h2>

        <div className='flex items-center gap-3'>
          {/* Filter Buttons */}
          {filterButtons.map((btn) => (
            <button
              key={btn.value}
              onClick={() => {
                setFilter(btn.value);
                if (btn.value !== 'topProducts') {
                  setCategory(null);
                }
              }}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === btn.value ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {btn.label}
            </button>
          ))}

          {/* Category Dropdown (only for Top Products) */}
          {filter === 'topProducts' && (
            <div className='relative'>
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className='flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors'
              >
                <span>{category ? categoryOptions.find((c) => c.value === category)?.label : 'All Categories'}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCategoryOpen && (
                <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10'>
                  <button
                    onClick={() => {
                      setCategory(null);
                      setIsCategoryOpen(false);
                    }}
                    className='w-full text-left px-4 py-2 hover:bg-gray-100 first:rounded-t-lg text-gray-900'
                  >
                    All Categories
                  </button>
                  {categoryOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setCategory(option.value);
                        setIsCategoryOpen(false);
                      }}
                      className='w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-900'
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <ResponsiveContainer width='100%' height={280}>
        <BarChart data={currentData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
          <YAxis label={{ value: 'Quantity Sold', angle: -90, position: 'insideLeft' }} tick={{ fontSize: 12 }} />
          <Tooltip
            formatter={(value: number, name: string) => [`${value} units`, name === 'value' ? 'Quantity' : name]}
            labelFormatter={(label) => `${label}`}
          />
          <Bar dataKey='value' fill='#00BE38' radius={[4, 4, 0, 0]} name='Quantity' barSize={45} />
        </BarChart>
      </ResponsiveContainer>

      {/* Product prices aligned with chart bars */}
      <div className='mt-2 ml-16 text-sm text-gray-600'>
        <div
          className='relative'
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${currentData.length}, 1fr)`,
            gap: '0',
          }}
        >
          {currentData.map((item: SalesItem) => (
            <div key={item.name} className='text-center px-1'>
              <div className='font-medium text-xs leading-tight break-words'>{item.name}</div>
              <div className='text-green-600 font-semibold'>Rs {item.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
