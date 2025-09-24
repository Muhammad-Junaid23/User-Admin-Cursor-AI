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

  // Monthly data - top products by quantity across all categories
  const allProducts: SalesItem[] = [];
  const seenNames = new Set<string>();

  Object.entries(INITIAL_DATA).forEach(([category, subCategories]) => {
    Object.entries(subCategories).forEach(([subCategory, products]) => {
      products.forEach((product) => {
        // Only add if we haven't seen this name before
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

  // Sort by quantity and take top 10
  salesData.monthly = allProducts.sort((a, b) => b.value - a.value).slice(0, 10);

  // Daily data - sample daily sales
  salesData.daily = [
    { name: 'Mon', value: 200, price: 2340 },
    { name: 'Tue', value: 500, price: 4230 },
    { name: 'Wed', value: 400, price: 4230 },
    { name: 'Thu', value: 1000, price: 5230 },
    { name: 'Fri', value: 800, price: 320 },
    { name: 'Sat', value: 1200, price: 210 },
    { name: 'Sun', value: 1500, price: 1230 },
  ];

  // Top products - top 5 by quantity
  salesData.topProducts = allProducts.sort((a, b) => b.value - a.value).slice(0, 5);

  // Category-specific data
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

const filterOptions = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'daily', label: 'Daily' },
  { value: 'topProducts', label: 'Top Products' },
  { value: 'pharmacy', label: 'Pharmacy' },
  { value: 'grocery', label: 'Grocery' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'clothing', label: 'Clothing' },
];

export default function SalesChart() {
  const [filter, setFilter] = useState('monthly');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentData = salesData[filter] || salesData.monthly;
  const currentFilterLabel = filterOptions.find((option) => option.value === filter)?.label || 'Monthly';

  return (
    <div className='w-full p-4 rounded-xl bg-white shadow-md'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-lg font-semibold text-gray-800'>Sales Analytics</h2>

        {/* Single Dropdown Filter */}
        <div className='relative'>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className='flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors'
          >
            <span>{currentFilterLabel}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10'>
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setFilter(option.value);
                    setIsDropdownOpen(false);
                  }}
                  className='w-full text-left px-4 py-2 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg text-gray-900'
                >
                  {option.label}
                </button>
              ))}
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

      {/* Product prices display - aligned with chart bars */}
      <div className='mt-2 ml-16 text-sm text-gray-600'>
        <div
          className='relative'
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${currentData.length}, 1fr)`,
            gap: '0',
          }}
        >
          {currentData.map((item: SalesItem, index: number) => (
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
