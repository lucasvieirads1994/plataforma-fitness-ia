import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/jwt'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Rotas públicas
  const publicRoutes = ['/', '/auth/login', '/auth/register']
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }
  
  // Rotas protegidas
  const protectedRoutes = ['/dashboard', '/quiz', '/workouts', '/nutrition', '/profile']
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  
  if (isProtectedRoute) {
    const token = request.cookies.get('auth-token')?.value
    
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
    
    try {
      await verifyToken(token)
      return NextResponse.next()
    } catch (error) {
      // Token inválido
      const response = NextResponse.redirect(new URL('/auth/login', request.url))
      response.cookies.delete('auth-token')
      return response
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|lasy-bridge.js).*)',
  ],
}

