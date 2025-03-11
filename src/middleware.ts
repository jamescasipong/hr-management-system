import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';
import instanceApi from './api/auth';

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
};

const validPaths = [
  '/dashboard',
  '/profile',
  '/employees',
  '/payroll',
  '/admin',
  '/attendance'
];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const { pathname } = request.nextUrl;
  const requestHeaders = new Headers(request.headers);

  requestHeaders.set('disable-nav', 'false');


  if (token) {
    
    const decodedToken = jwtDecode<JWTType>(token.value);

    const isAdmin = decodedToken.Role === 'Admin';
    requestHeaders.set('is-admin', isAdmin ? 'Admin' : 'Employee');
    requestHeaders.set('disable-nav', 'false');
    requestHeaders.set('authenticated', 'true');

    if (isAdmin && roleBasedRedirects[pathname]) {
      return NextResponse.redirect(new URL(roleBasedRedirects[pathname], request.url));
    }

    const AdminRoutes = Object.values(roleBasedRedirects);

    if (isAdmin &&  pathname.startsWith('/admin') && !AdminRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL('/404', request.url));
    }

    if (pathname === '/') {
      return NextResponse.redirect(new URL(isAdmin ? '/admin/dashboard' : '/dashboard', request.url));
    }

    if (pathname.startsWith('/admin') && !isAdmin) {
      return NextResponse.redirect(new URL('/404', request.url));
    }

    if (pathname.startsWith('/employees') && !isAdmin) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (pathname === '/404'){
      requestHeaders.set('disable-nav', 'true');
    }


  } else {
    requestHeaders.set('disable-nav', 'true');
    requestHeaders.delete('is-admin');
    if (validPaths.some(path => pathname.startsWith(path))) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  
  return NextResponse.next({
    headers: requestHeaders,
  });

}
