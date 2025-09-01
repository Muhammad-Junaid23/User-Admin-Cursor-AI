'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { Home, BarChart2, MonitorCog } from 'lucide-react';

const navItems = [
  { name: 'Inventory', href: '/admin', icon: Home },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart2 },
  { name: 'Content Management', href: '/admin/contentManagement', icon: MonitorCog },
];

interface AdminSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={clsx(
        'h-[calc(100vh-3.5rem)] z-40 bg-white shadow-lg px-4 py-6 flex flex-col justify-between transition-all duration-300 ease-in-out',
        isOpen ? 'fixed inset-y-14 left-0 w-64 translate-x-0' : 'fixed inset-y-14 -left-64'
      )}
    >
      <div>
        <nav className='space-y-2'>
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                'flex items-center gap-2 px-4 py-2 rounded-md hover:bg-[#00BE38] hover:text-white transition',
                pathname === item.href ? 'bg-[#00BE38] text-white font-medium' : 'text-gray-800'
              )}
              onClick={toggleSidebar}
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
