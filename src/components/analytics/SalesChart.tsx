'use client';

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Button from '../ui/Button';

const salesData = {
  monthly: [
    { name: 'Week 1', value: 2000 },
    { name: 'Week 2', value: 5000 },
    { name: 'Week 3', value: 4000 },
    { name: 'Week 4', value: 15000 },
  ],
  daily: [
    { name: 'Mon', value: 200 },
    { name: 'Tue', value: 500 },
    { name: 'Wed', value: 400 },
    { name: 'Thu', value: 1000 },
    { name: 'Fri', value: 800 },
    { name: 'Sat', value: 1200 },
    { name: 'Sun', value: 1500 },
  ],
  topProducts: [
    { name: 'Product A', value: 5000 },
    { name: 'Product B', value: 3000 },
    { name: 'Product C', value: 7000 },
    { name: 'Product D', value: 6000 },
  ],
};

export default function SalesChart() {
  const [filter, setFilter] = useState<'monthly' | 'daily' | 'topProducts'>('monthly');

  return (
    <div className='w-full p-4 rounded-xl bg-white shadow-md'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-lg font-semibold'>
          Sales - {filter === 'monthly' ? 'Last Month' : filter === 'daily' ? 'Daily' : 'Top Products'}
        </h2>
        <div className='flex gap-2'>
          <Button variant={filter === 'monthly' ? 'active' : 'inactive'} onClick={() => setFilter('monthly')}>
            Last Month
          </Button>

          <Button variant={filter === 'daily' ? 'active' : 'inactive'} onClick={() => setFilter('daily')}>
            Daily Sales
          </Button>

          <Button variant={filter === 'topProducts' ? 'active' : 'inactive'} onClick={() => setFilter('topProducts')}>
            Top Products
          </Button>
        </div>
      </div>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={salesData[filter]}>
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Bar dataKey='value' fill='#00BE38' radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
