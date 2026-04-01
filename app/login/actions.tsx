'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function loginAction(formData: FormData) {
  const password = formData.get('password')
  
  // PASSWORD ADMIN (Bisa kamu ganti sesuka hati)
  const ADMIN_PASSWORD = 'kebhinnekaan2025'

  if (password === ADMIN_PASSWORD) {
    // Jika benar, berikan "Tiket" berupa Cookie
    const cookieStore = await cookies();
    cookieStore.set('impp_admin_session', 'loggedin', {
      httpOnly: true, // Super aman, tidak bisa dicuri hacker lewat JS
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // Sesi aktif selama 1 hari (24 jam)
      path: '/',
    })
    
    // Arahkan ke dashboard
    redirect('/admin')
  }
  
  // Jika salah, arahkan kembali ke halaman login sambil membawa pesan error
  return redirect('/login?error=1')
}