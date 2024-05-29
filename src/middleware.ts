import NextAuth from 'next-auth';
import { authConfig } from '../auth.config';
import type { NextRequest } from 'next/server'

export default NextAuth(authConfig).auth;
 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('currentUser')?.value
 
  if (currentUser && !request.nextUrl.pathname.startsWith('/dashboard')) {
    return Response.redirect(new URL('/dashboard', request.url))
  }
 
  // if (!currentUser && !request.nextUrl.pathname.startsWith('/hero')) {
  //   return Response.redirect(new URL('/hero', request.url))
  // }
}