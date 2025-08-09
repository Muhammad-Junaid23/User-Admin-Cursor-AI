'use client';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowRight, BarChart3, Users, Settings, UserPlus } from 'lucide-react';
import Button from '@/components/ui/Button';

const stats = [
  { title: 'Total Users', value: '50', icon: Users },
  { title: 'Pending Requests', value: '6', icon: UserPlus },
  { title: 'Revenue This Month', value: '$4,300', icon: BarChart3 },
  { title: 'Active Subscriptions', value: '44' },
  { title: 'Expired Subscriptions', value: '12' },
  { title: 'Modules Used', value: '17' },
];

const activity = [
  'Ahmed subscribed to Retail POS',
  'Sara renewed subscription',
  'Usman deactivated Pharmacy module',
  'Ali updated billing settings',
  'Zahra added new admin',
];

const salesData = [
  { day: 'Mon', sales: 300 },
  { day: 'Tue', sales: 450 },
  { day: 'Wed', sales: 380 },
  { day: 'Thu', sales: 500 },
  { day: 'Fri', sales: 420 },
  { day: 'Sat', sales: 600 },
  { day: 'Sun', sales: 550 },
];

export default function AdminRootRedirect() {
  return (
    <div className='space-y-10'>
      <div>
        <h2 className='text-2xl font-bold'>Dashboard Overview</h2>
        <p className='text-gray-500 text-sm'>Welcome back, Admin. Here’s what’s happening.</p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {stats.map((stat, i) => (
          <div key={i} className='p-5 bg-white rounded-2xl shadow flex items-center justify-between hover:shadow-md transition'>
            <div>
              <p className='text-sm text-gray-500'>{stat.title}</p>
              <p className='text-2xl font-bold mt-1'>{stat.value}</p>
            </div>
            {stat.icon && <stat.icon className='w-8 h-8 text-gray-400' />}
          </div>
        ))}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div className='bg-white rounded-2xl shadow p-6'>
          <h3 className='font-semibold mb-4'>Weekly Sales Overview</h3>
          <ResponsiveContainer width='100%' height={200}>
            <LineChart data={salesData}>
              <XAxis dataKey='day' />
              <YAxis />
              <Tooltip />
              <Line type='monotone' dataKey='sales' stroke='#4f46e5' strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className='bg-white rounded-2xl shadow p-6'>
          <h3 className='font-semibold mb-4'>Recent Activity</h3>
          <ul className='space-y-3 text-sm text-gray-700'>
            {activity.map((event, i) => (
              <li key={i} className='flex items-start gap-2'>
                <span className='w-2 h-2 mt-2 rounded-full bg-blue-500' />
                <span>{event}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        <Button variant='default' className='w-full  flex items-center justify-center gap-2'>
          View All Users <ArrowRight className='w-4 h-4 ml-2' />
        </Button>
        <Button variant='outline' className='w-full  flex items-center justify-center gap-2'>
          Review Requests <ArrowRight className='w-4 h-4 ml-2' />
        </Button>
        <Button variant='outline' className='w-full  flex items-center justify-center gap-2'>
          Go to Analytics <BarChart3 className='w-4 h-4 ml-2' />
        </Button>
        <Button variant='default' className='w-full  flex items-center justify-center gap-2'>
          System Settings <Settings className='w-4 h-4 ml-2' />
        </Button>
      </div>
    </div>
  );
}
