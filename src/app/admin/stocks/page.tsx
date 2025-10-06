'use client';
import { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { INITIAL_DATA } from '@/components/inventory/dummyData';

interface StockItem {
  name: string;
  quantity: number;
  fill?: string;
}

const COLORS = [
  '#4F46E5', // Indigo
  '#10B981', // Green
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#3B82F6', // Blue
  '#8B5CF6', // Purple
  '#14B8A6', // Teal
  '#D946EF', // Pink
];

const StocksPage = () => {
  const categories = Object.keys(INITIAL_DATA);

  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('All');
  const [chartType, setChartType] = useState<'bar' | 'pie'>('bar');

  const subCategories = useMemo(() => {
    const subs = Object.keys(INITIAL_DATA[selectedCategory] ?? {});
    return ['All', ...subs];
  }, [selectedCategory]);

  const chartData: StockItem[] = useMemo(() => {
    if (!selectedCategory) return [];

    // Case 1: "All" → aggregate subcategories
    if (selectedSubCategory === 'All') {
      return Object.entries(INITIAL_DATA[selectedCategory]).map(([subCat, products], i) => ({
        name: subCat,
        quantity: products.reduce((sum, p) => sum + p.quantity, 0),
        fill: COLORS[i % COLORS.length],
      }));
    }

    // Case 2: Specific subcategory → product-level
    if (selectedSubCategory && INITIAL_DATA[selectedCategory][selectedSubCategory]) {
      return INITIAL_DATA[selectedCategory][selectedSubCategory].map((product, i) => ({
        name: product.name,
        quantity: product.quantity,
        fill: COLORS[i % COLORS.length],
      }));
    }

    return [];
  }, [selectedCategory, selectedSubCategory]);

  return (
    <div className='p-6 space-y-6'>
      {/* Header + Toggle Button */}
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold text-gray-800'>Stocks Overview</h1>
        <button
          onClick={() => setChartType(chartType === 'bar' ? 'pie' : 'bar')}
          className='px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition'
        >
          {chartType === 'bar' ? 'Switch to Pie Chart' : 'Switch to Bar Chart'}
        </button>
      </div>

      {/* Filters */}
      <div className='flex flex-col sm:flex-row gap-3 mb-6'>
        <div className='flex-1 sm:flex-none'>
          <label className='block text-xs font-medium text-gray-600 mb-1'>Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectedSubCategory('All');
            }}
            className='w-full sm:w-64 px-2 py-2 border border-gray-300 rounded-md bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
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
            className='w-full sm:w-64 px-2 py-2 border border-gray-300 rounded-md bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            {subCategories.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Chart Section */}
      <div className='h-[420px] w-full bg-white p-4 rounded-xl shadow flex items-center justify-center'>
        {chartData.length > 0 ? (
          chartType === 'bar' ? (
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey='quantity' radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill || COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className='flex justify-center items-center gap-8 w-full h-full'>
              {/* Pie Chart Left */}
              <ResponsiveContainer width='60%' height='100%'>
                <PieChart>
                  <Tooltip />
                  <Pie data={chartData} dataKey='quantity' nameKey='name' outerRadius={140} label>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill || COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              {/* Legend Right */}
              <div className='flex flex-col gap-2'>
                {chartData.map((entry, index) => (
                  <div key={index} className='flex items-center gap-2'>
                    <div className='w-3 h-3 rounded-full' style={{ backgroundColor: entry.fill || COLORS[index % COLORS.length] }}></div>
                    <span className='text-sm text-gray-700'>{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        ) : (
          <p className='text-gray-500 text-center mt-16'>No stock data available for this selection</p>
        )}
      </div>
    </div>
  );
};

export default StocksPage;
