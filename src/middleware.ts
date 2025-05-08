import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';

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
  '/attendance',
];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('at_session')?.value;
  const refreshToken = request.cookies.get('backend_rt')?.value;

  const { pathname } = request.nextUrl;
  const cleanPathname = pathname.split('?')[0];
  const requestHeaders = new Headers();

  requestHeaders.set('new-token', 'false');
  requestHeaders.set('disable-nav', 'false');

  // Redirect /home to /
  if (pathname === '/home') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (token) {
    try {
      const decodedToken = jwtDecode<JWTType>(token);
      const isAdmin = decodedToken.Role === 'Admin';

      requestHeaders.set('is-admin', isAdmin ? 'Admin' : 'Employee');
      requestHeaders.set('authenticated', 'true');

      if (isAdmin && roleBasedRedirects[cleanPathname]) {
        if (cleanPathname !== '/usersettings') {
          return NextResponse.redirect(new URL(roleBasedRedirects[cleanPathname], request.url));
        }
      }

      if (!isAdmin && cleanPathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/404', request.url));
      }

      if (['/signin', '/signup', '/register'].includes(cleanPathname)) {
        return NextResponse.redirect(new URL(isAdmin ? '/admin/dashboard' : '/dashboard', request.url));
      }

      if (cleanPathname === '/404') {
        requestHeaders.set('disable-nav', 'true');
      }

    } catch (error) {
      console.error('Invalid token:', error);
    }
  } else {
    // Only attempt refresh if refresh token exists
    if (refreshToken) {
      try {
        const response = await fetch('http://localhost:5075/api/auth/refresh-token', {
          method: 'POST',
          headers: {
            Cookie: `backend_rt=${refreshToken}`,
          },
        });

        if (response.ok) {
          const newAccessCookie = response.headers.get('set-cookie');
          if (newAccessCookie) {
            requestHeaders.append('set-cookie', newAccessCookie);
          }
          requestHeaders.set('new-token', 'true');
        }
      } catch (error) {
        console.error('Refresh token fetch failed:', error);
      }
    } else {
      console.warn('Refresh token is undefined');
    }

    requestHeaders.set('disable-nav', 'true');
    requestHeaders.delete('is-admin');

    // Redirect unauthenticated access to protected pages
    if (validPaths.some(path => pathname.startsWith(path))) {
      return NextResponse.redirect(new URL('/signin', request.url));
    }
  }

  return NextResponse.next({
    headers: requestHeaders,
  });
}
