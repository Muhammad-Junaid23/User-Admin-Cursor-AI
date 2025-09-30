'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Detect if current route is content management
  const isContentManagement = pathname === '/admin/contentManagement';

  // Toggle sidebar only for content management
  const toggleSidebar = () => {
    if (isContentManagement) {
      setSidebarOpen((prev) => !prev);
    }
  };

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      router.push('/login');
    } else {
      setAuthorized(true);
    }
  }, [router]);

  // Close sidebar on route change if on content management
  useEffect(() => {
    if (!isContentManagement) {
      setSidebarOpen(true); // Always open for other pages
    }
  }, [pathname, isContentManagement]);

  if (!authorized) return null;

  return (
    <div className='flex flex-col min-h-screen bg-white'>
      <Navbar isContentManagement={isContentManagement} sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className='flex flex-1 overflow-hidden'>
        <Sidebar isOpen={sidebarOpen} isContentManagement={isContentManagement} />
        <main className='flex-1 overflow-y-auto'>{children}</main>
      </div>
    </div>
  );
}
