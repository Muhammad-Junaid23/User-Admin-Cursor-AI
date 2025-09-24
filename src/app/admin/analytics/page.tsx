'use client';
import { SummaryCards } from '@/components/analytics/SummaryCards';
import SalesChart from '@/components/analytics/SalesChart';

export default function AnalyticsPage() {
  return (
    <div className='px-6 py-2 space-y-2'>
      <SummaryCards />
      <SalesChart />
    </div>
  );
}
