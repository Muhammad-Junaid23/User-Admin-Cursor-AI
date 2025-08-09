import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const user = {
    isAuthenticated: true,
    role: 'admin',
  };

  if (pathname.startsWith('/admin')) {
    if (!user.isAuthenticated || user.role !== 'admin') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
