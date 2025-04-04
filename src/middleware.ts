import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';
import { start } from 'repl';
// import instanceApi from './api/auth'; // Removed unused import

export interface JWTType {
  unique_name: string;
  Role: string;
  nameid: string;
  nbf: number;
  exp: number;
  iat: number;
}

const roleBasedRedirects: { [key: string]: string } = {
  '/dashboard': '/admin/dashboard',
  '/profile': '/admin/profile',
  '/attendance': '/admin/attendance',
  '/employees': '/admin/employees',
  '/payroll': '/admin/payroll',
  '/department': '/admin/department',
};

const validPaths = [
  '/dashboard',
  '/profile',
  '/employees',
  '/payroll',
  '/usersettings',
  '/admin',
  '/attendance'
];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const { pathname, searchParams } = request.nextUrl;
  const cleanPathname = pathname.split('?')[0];
  const requestHeaders = new Headers(request.headers);

  requestHeaders.set('disable-nav', 'false');

  if (token) {
    const decodedToken = jwtDecode<JWTType>(token.value);

    const isAdmin = decodedToken.Role === 'Admin';
    requestHeaders.set('is-admin', isAdmin ? 'Admin' : 'Employee');
    requestHeaders.set('disable-nav', 'false');
    requestHeaders.set('authenticated', 'true');

    if (isAdmin && roleBasedRedirects[cleanPathname]) {
      if (cleanPathname !== '/usersettings') {
        return NextResponse.redirect(new URL(roleBasedRedirects[cleanPathname], request.url));
      }
    }

    const AdminRoutes = Object.values(roleBasedRedirects);
    

    if (!isAdmin && cleanPathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/404', request.url));
    }

    if (cleanPathname === '/') {
      return NextResponse.redirect(new URL(isAdmin ? '/admin/dashboard' : '/dashboard', request.url));
    }

    if (cleanPathname.startsWith('/admin') && !isAdmin) {
      return NextResponse.redirect(new URL('/404', request.url));
    }

    if (cleanPathname.startsWith('/employees') && !isAdmin) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (cleanPathname.startsWith('/signin') || cleanPathname.startsWith('/register')) {
      return NextResponse.redirect(new URL(isAdmin ? '/admin/dashboard' : '/dashboard', request.url));
    }

    if (cleanPathname === '/404'){
      requestHeaders.set('disable-nav', 'true');
    }
  } else {
    

    requestHeaders.set('disable-nav', 'true');
    requestHeaders.delete('is-admin');
    if (cleanPathname == '/') {
      requestHeaders.set('disable-nav', 'true');
      return NextResponse.redirect(new URL('/home', request.url));
    }

    if (validPaths.some(path => pathname.startsWith(path))) {
      return NextResponse.redirect(new URL('/signin', request.url));
    }
  }

  return NextResponse.next({
    headers: requestHeaders,
  });
}
