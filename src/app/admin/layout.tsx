'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  // const [sidebarOpen, setSidebarOpen] = useState(false);

  // const toggleSidebar = () => {
  //   setSidebarOpen((prev) => !prev);
  // };

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      router.push('/login');
    } else {
      setAuthorized(true);
    }
  }, [router]);

  // Keep sidebar state independent of screen size

  // useEffect(() => {
  //   const handleClickOutside = (e: MouseEvent) => {
  //     if (!sidebarOpen) return;
  //     const target = e.target as HTMLElement;
  //     if (!target.closest('aside') && !target.closest('button[aria-label="Toggle sidebar"]')) {
  //       setSidebarOpen(false);
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => document.removeEventListener('mousedown', handleClickOutside);
  // }, [sidebarOpen]);

  if (!authorized) return null;

  return (
    <div className='flex flex-col min-h-screen bg-white'>
      <Navbar />

      <div className='flex flex-1 overflow-hidden'>
        <Sidebar />
        <main className='flex-1 overflow-y-auto'>{children}</main>
      </div>
    </div>
  );
}
