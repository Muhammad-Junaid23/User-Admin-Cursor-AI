import Link from 'next/link';
import { Store, ShieldCheck, Signal } from 'lucide-react';

export default function HomePage() {
  return (
    <div className='bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen px-6 py-16 flex items-center justify-center'>
      <div className='max-w-5xl text-center space-y-8'>
        <h1 className='text-4xl sm:text-5xl font-extrabold text-gray-800'>
          Nexus Desktop <span className='text-blue-600'>POS</span> Platform
        </h1>
        <p className='text-gray-600 text-lg max-w-2xl mx-auto'>
          A modular, offline-first Point of Sale solution for shopkeepers. Works on any device — even without internet.
        </p>

        <div className='flex flex-col sm:flex-row justify-center gap-4'>
          <Link href='/admin' className='px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition'>
            Get Started
          </Link>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 text-left'>
          <FeatureCard
            icon={<Store className='w-6 h-6 text-blue-600' />}
            title='Modular POS'
            desc='Select POS layout for Pharmacy, Grocery, Garments, and more.'
          />
          <FeatureCard
            icon={<ShieldCheck className='w-6 h-6 text-green-600' />}
            title='Offline Support'
            desc='Progressive Web App with offline sync & local database.'
          />
          <FeatureCard
            icon={<Signal className='w-6 h-6 text-purple-600' />}
            title='FBR Integration'
            desc='Optional GST invoice sync with FBR (paid upgrade).'
          />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className='bg-white rounded-xl p-6 shadow hover:shadow-md transition'>
      <div className='flex items-center gap-3 mb-2'>
        {icon}
        <h3 className='text-lg font-semibold text-gray-800'>{title}</h3>
      </div>
      <p className='text-gray-600 text-sm'>{desc}</p>
    </div>
  );
}
