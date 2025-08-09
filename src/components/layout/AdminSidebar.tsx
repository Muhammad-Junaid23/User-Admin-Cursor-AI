'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { Home, Users, BarChart2 } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/admin', icon: Home },
  { name: 'Users', href: '/admin/access-control', icon: Users },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart2 },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className='w-64 bg-white shadow-md p-6 flex flex-col justify-between'>
      <div>
        <h2 className='text-xl font-bold text-blue-600 mb-8'>Nexus Desktop</h2>
        <nav className='space-y-2'>
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                'flex items-center gap-2 px-4 py-2 rounded-md hover:bg-blue-50 transition',
                pathname === item.href ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700'
              )}
            >
              <item.icon className='w-5 h-5' />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
