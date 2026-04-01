import { loginAction } from "./actions"
import Link from "next/link"

export const metadata = { title: "Login Admin | IMPP UNNES" }

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  // Tunggu parameter URL (Aturan Next.js terbaru)
  const { error } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-6 selection:bg-blue-900 selection:text-white relative">
      
      {/* Dekorasi Background */}
      <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-blue-950 to-[#F8FAFC] -z-10"></div>
      
      <div className="w-full max-w-md bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-[0_20px_60px_rgb(0,0,0,0.08)] text-center relative overflow-hidden mt-10">
        
        {/* Dekorasi Estetik di Dalam Kartu */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-50 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>

        {/* Logo/Icon */}
        <div className="w-16 h-16 bg-blue-950 text-white rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 shadow-lg shadow-blue-900/20">
          🔒
        </div>

        <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Portal Admin</h1>
        <p className="text-slate-500 text-sm font-medium mb-8 leading-relaxed">
          Masukkan kata sandi untuk mengakses Dashboard Kabinet Ruang Kebhinnekaan.
        </p>

        {/* Pesan Error jika Password Salah */}
        {error === '1' && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 text-sm font-bold rounded-2xl animate-fade-in flex items-center justify-center gap-2">
            <span>❌</span> Password salah! Coba lagi.
          </div>
        )}

        {/* Form Login (Memanggil Server Action) */}
        <form action={loginAction} className="flex flex-col gap-5 relative z-10">
          <input 
            type="password" 
            name="password"
            placeholder="Masukkan Password..." 
            required
            className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all font-medium placeholder:text-slate-400"
          />
          <button 
            type="submit"
            className="w-full bg-blue-950 text-white font-bold text-base px-8 py-4 rounded-xl hover:bg-blue-900 transition-all shadow-md shadow-blue-900/10 hover:-translate-y-0.5"
          >
            Masuk Dashboard &rarr;
          </button>
        </form>

        <div className="mt-10 pt-6 border-t border-slate-100">
          <Link href="/" className="text-xs font-bold text-slate-400 hover:text-blue-900 transition-colors uppercase tracking-widest">
            &larr; Kembali ke Beranda
          </Link>
        </div>

      </div>
    </div>
  )
}