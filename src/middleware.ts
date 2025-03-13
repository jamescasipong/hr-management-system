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
  '/main/dashboard': '/main/admin/dashboard',
  '/main/profile': '/main/admin/profile',
  '/main/attendance': '/main/admin/attendance',
  '/main/employees': '/main/admin/employees',
  '/main/payroll': '/main/admin/payroll',
  '/main/department': '/main/admin/department',
};

const validPaths = [
  '/main/dashboard',
  '/main/profile',
  '/main/employees',
  '/main/payroll',
  '/main/usersettings',
  '/main/admin',
  '/main/attendance'
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
      return NextResponse.redirect(new URL(roleBasedRedirects[cleanPathname], request.url));
    }

    const AdminRoutes = Object.values(roleBasedRedirects);

    if (isAdmin && cleanPathname.startsWith('/main/admin') && !AdminRoutes.includes(cleanPathname)) {
      return NextResponse.redirect(new URL('/404', request.url));
    }

    if (cleanPathname === '/') {
      return NextResponse.redirect(new URL(isAdmin ? '/main/admin/dashboard' : '/main/dashboard', request.url));
    }

    if (cleanPathname.startsWith('/main/admin') && !isAdmin) {
      return NextResponse.redirect(new URL('/404', request.url));
    }

    if (cleanPathname.startsWith('/main/employees') && !isAdmin) {
      return NextResponse.redirect(new URL('/main/dashboard', request.url));
    }

    if (cleanPathname.startsWith('/login') || cleanPathname.startsWith('/register')) {
      return NextResponse.redirect(new URL(isAdmin ? '/admin/dashboard' : '/main/dashboard', request.url));
    }

    if (cleanPathname === '/404'){
      requestHeaders.set('disable-nav', 'true');
    }
  } else {
    

    requestHeaders.set('disable-nav', 'true');
    requestHeaders.delete('is-admin');
    if (cleanPathname == '/' || cleanPathname.startsWith('/main')) {
      requestHeaders.set('disable-nav', 'true');
      return NextResponse.redirect(new URL('/home', request.url));
    }

    if (validPaths.some(path => pathname.startsWith(path))) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next({
    headers: requestHeaders,
  });
}
