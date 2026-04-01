import Link from "next/link"
import { prisma } from "@/lib/prisma"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default async function HomePage() {
  const memberCount = await prisma.member.count()
  const deptCount = await prisma.department.count()
  const prokerCount = await prisma.workProgram.count()

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans selection:bg-blue-950 selection:text-white scroll-smooth">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-40 pb-28 px-6 overflow-hidden flex items-center min-h-[90vh]">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[450px] bg-blue-100/60 blur-[130px] rounded-full pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-700 animate-pulse"></span>
            IMPP UNNES 2025/2026
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-slate-900 tracking-tighter mb-4 leading-[1.05]">
            Kabinet Ruang<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-950 via-blue-800 to-cyan-600">
              Kebhinnekaan
            </span>
          </h1>

          {/* TAGLINE GRAND DESIGN */}
          <h2 className="text-xl md:text-2xl font-black text-blue-900 tracking-widest uppercase mb-10">
            #Bersinergi<span className="text-cyan-600">Ciptakan</span>Harmonisasi
          </h2>
          
          <p className="text-lg md:text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            Wadah yang menghargai perbedaan dan keberagaman untuk mewujudkan pemberdayaan sumber daya manusia organisasi yang berkualitas.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/tentang" className="bg-blue-950 text-white font-bold text-base px-8 py-4 rounded-full hover:bg-blue-900 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/20 transition-all flex items-center justify-center gap-2">
              Pelajari Filosofi Kami
            </Link>
            <Link href="/kepengurusan" className="bg-white text-slate-700 font-bold text-base px-8 py-4 rounded-full hover:bg-slate-50 border border-slate-200 hover:-translate-y-1 hover:shadow-sm transition-all flex items-center justify-center gap-2">
              Lihat Struktur Kabinet
            </Link>
          </div>
        </div>
      </section>

      {/* STATISTIK SECTION */}
      <section className="py-24 px-6 bg-[#091024] text-white relative border-y border-blue-950">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-blue-900/50">
            <div className="text-center py-6 md:py-0">
              <div className="text-6xl md:text-7xl font-black text-blue-200 tracking-tighter mb-2">{memberCount}</div>
              <div className="text-sm font-bold text-white/70 uppercase tracking-widest">Keluarga Aktif</div>
            </div>
            <div className="text-center py-6 md:py-0">
              <div className="text-6xl md:text-7xl font-black text-blue-200 tracking-tighter mb-2">{deptCount}</div>
              <div className="text-sm font-bold text-white/70 uppercase tracking-widest">Departemen</div>
            </div>
            <div className="text-center py-6 md:py-0">
              <div className="text-6xl md:text-7xl font-black text-blue-200 tracking-tighter mb-2">{prokerCount}</div>
              <div className="text-sm font-bold text-white/70 uppercase tracking-widest">Program Kerja</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}