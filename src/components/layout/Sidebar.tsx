'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { Home, BarChart2, MonitorCog, ChartNoAxesCombined, ClipboardList } from 'lucide-react';

const navItems = [
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart2 },
  { name: 'Inventory', href: '/admin/inventory', icon: Home },
  { name: 'Stocks', href: '/admin/stocks', icon: ChartNoAxesCombined },
  { name: 'Reports', href: '/admin/reports', icon: ClipboardList },
  { name: 'Content Management', href: '/admin/contentManagement', icon: MonitorCog },
];

export default function Sidebar({ isOpen, isContentManagement }: { isOpen: boolean; isContentManagement: boolean }) {
  const pathname = usePathname();

  const showSidebar = isContentManagement ? isOpen : true;

  return (
    <aside
      className={clsx(
        'h-100vh z-40 bg-white shadow-lg px-4 py-6 flex flex-col justify-between transition-all duration-300 ease-in-out',
        showSidebar
          ? isContentManagement
            ? 'fixed inset-y-14 left-0 w-52 translate-x-0 h-full'
            : 'w-52 translate-x-0'
          : '-translate-x-full w-0 overflow-hidden absolute left-0'
      )}
    >
      <div>
        <nav className='space-y-2'>
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                'flex items-center gap-2 px-4 py-2 rounded-md transition',
                pathname === item.href ? 'bg-[#00BE38] text-white font-medium' : 'hover:bg-gray-100 text-gray-800'
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
