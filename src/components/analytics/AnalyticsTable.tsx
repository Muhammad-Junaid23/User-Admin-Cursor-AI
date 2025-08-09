'use client';

import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import GenericTable from '@/components/ui/GenericTable';

const dummyAnalytics = [
  {
    email: 'user1@example.com',
    status: 'Paid',
    startDate: '2024-06-01',
    expiryDate: '2025-06-01',
    duration: '13 months',
    modules: 3,
    usageDuration: '11 months',
    isActive: true,
  },
  {
    email: 'user2@example.com',
    status: 'Unpaid',
    startDate: '2024-01-15',
    expiryDate: '2024-12-15',
    duration: '7 months',
    modules: 2,
    usageDuration: '6 months',
    isActive: false,
  },
  {
    email: 'farah@example.com',
    status: 'Paid',
    startDate: '2023-09-01',
    expiryDate: '2024-09-01',
    duration: '12 months',
    modules: 4,
    usageDuration: '12 months',
    isActive: true,
  },
  {
    email: 'omer@example.com',
    status: 'Unpaid',
    startDate: '2023-05-10',
    expiryDate: '2024-05-10',
    duration: '12 months',
    modules: 1,
    usageDuration: '10 months',
    isActive: false,
  },
  {
    email: 'zara@example.com',
    status: 'Paid',
    startDate: '2024-03-01',
    expiryDate: '2025-03-01',
    duration: '12 months',
    modules: 5,
    usageDuration: '4 months',
    isActive: true,
  },
  {
    email: 'faisal@example.com',
    status: 'Paid',
    startDate: '2023-10-15',
    expiryDate: '2024-10-15',
    duration: '12 months',
    modules: 3,
    usageDuration: '9 months',
    isActive: true,
  },
  {
    email: 'hina@example.com',
    status: 'Unpaid',
    startDate: '2024-02-01',
    expiryDate: '2024-08-01',
    duration: '6 months',
    modules: 2,
    usageDuration: '5 months',
    isActive: false,
  },
  {
    email: 'mehwish@example.com',
    status: 'Unpaid',
    startDate: '2023-11-20',
    expiryDate: '2024-11-20',
    duration: '12 months',
    modules: 2,
    usageDuration: '8 months',
    isActive: false,
  },
  {
    email: 'talha@example.com',
    status: 'Paid',
    startDate: '2024-07-01',
    expiryDate: '2025-07-01',
    duration: '12 months',
    modules: 5,
    usageDuration: '1 month',
    isActive: true,
  },
  {
    email: 'tailor@example.com',
    status: 'Paid',
    startDate: '2024-07-01',
    expiryDate: '2025-07-01',
    duration: '14 months',
    modules: 2,
    usageDuration: '1 month',
    isActive: true,
  },
];

export function AnalyticsTable() {
  const columns = [
    { header: 'Email', accessor: (item: any) => item.email },
    {
      header: 'Status',
      accessor: (item: any) => (
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${
            item.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {item.status}
        </span>
      ),
    },
    { header: 'Start Date', accessor: (item: any) => item.startDate },
    { header: 'Expiry', accessor: (item: any) => item.expiryDate },
    { header: 'Duration', accessor: (item: any) => item.duration },
    { header: 'Modules', accessor: (item: any) => item.modules },
    { header: 'Used For', accessor: (item: any) => item.usageDuration },
    {
      header: 'Active',
      accessor: (item: any) =>
        item.isActive ? <CheckCircle className='w-5 h-5 text-green-500' /> : <XCircle className='w-5 h-5 text-red-500' />,
    },
  ];

  return <GenericTable data={dummyAnalytics} columns={columns} />;
}
