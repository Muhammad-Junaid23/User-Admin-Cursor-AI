'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (email === 'admin@gmail.com' && password === 'admin123') {
      localStorage.setItem('role', 'admin');
      localStorage.setItem('admin-email', email);
      router.push('/admin');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-6 rounded shadow-md w-full max-w-sm space-y-4'>
        <h2 className='text-xl font-semibold text-center'>Admin Login</h2>
        {error && <p className='text-sm text-red-600'>{error}</p>}
        <Input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={handleLogin} className='w-full'>
          Login
        </Button>
      </div>
    </div>
  );
}
