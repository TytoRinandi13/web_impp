import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 1. Cek apakah pengunjung mencoba membuka halaman di dalam folder /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    
    // 2. Periksa saku pengunjung, apakah mereka punya tiket (cookie) login?
    const hasTicket = request.cookies.get('impp_admin_session')?.value
    
    // 3. Kalau tidak punya tiket, usir (redirect) ke halaman login
    if (!hasTicket) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
  
  // Kalau punya tiket, atau halamannya bukan admin, silakan lewat
  return NextResponse.next()
}

// Pengaturan Middleware agar tidak berjalan di file gambar/CSS (Biar website tetap cepat)
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}