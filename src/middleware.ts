import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';
// Removed unused import
import { cookies } from 'next/headers';
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
  const token = request.cookies.get('at_session')?.value;
  const refreshToken = (await cookies()).get('backend_rt');
  
  // console.log("token", token);

  const { pathname } = request.nextUrl; // Removed unused 'searchParams'
  const cleanPathname = pathname.split('?')[0];
  const requestHeaders = new Headers();

  requestHeaders.set("new-token", "false");

  requestHeaders.set('disable-nav', 'false');

  if (pathname === "/home") {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (token) {
    const decodedToken = jwtDecode<JWTType>(token);

    const isAdmin = decodedToken.Role === 'Admin';
    requestHeaders.set('is-admin', isAdmin ? 'Admin' : 'Employee');
    requestHeaders.set('disable-nav', 'false');
    requestHeaders.set('authenticated', 'true');

    if (isAdmin && roleBasedRedirects[cleanPathname]) {
      if (cleanPathname !== '/usersettings') {
        return NextResponse.redirect(new URL(roleBasedRedirects[cleanPathname], request.url));
      }
    }

    // Removed unused 'AdminRoutes'
    

    if (!isAdmin && cleanPathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/404', request.url));
    }

    if (cleanPathname === '/signin' || cleanPathname === '/signup') {
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
    console.log("refreshToken", refreshToken);

    const requestToken = await fetch("http://localhost:5075/api/auth/refresh-token", {
      method: "POST",
      credentials: "include",
      headers: {
        "Cookie": `backend_rt=${refreshToken?.value}; HttpOnly; Path=/; SameSite=None; Secure`,
      }
    })
   
    // const token = tokenResponse.data?.accessToken;
    
    requestHeaders.set('disable-nav', 'true');
    requestHeaders.delete('is-admin');
    
    if (requestToken.ok){
      const accessRawCookies = requestToken.headers.get('set-cookie');
      
      console.log("accessRawCookies", accessRawCookies);
      if (accessRawCookies) {
        requestHeaders.append('set-cookie', accessRawCookies);
      }
      requestHeaders.set('new-token', 'true');
    }

   

    if (validPaths.some(path => pathname.startsWith(path))) {
      return NextResponse.redirect(new URL('/signin', request.url));
    }
  }


  return NextResponse.next({
    headers: requestHeaders,
  });
}
