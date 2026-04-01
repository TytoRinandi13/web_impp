import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { prisma } from "@/lib/prisma"
import Link from "next/link"

export const metadata = {
  title: "Program Kerja | IMPP UNNES",
  description: "Daftar Program Kerja Kabinet Ruang Kebhinnekaan",
}

// Fungsi untuk memberikan ikon dan warna otomatis berdasarkan nama departemen
const getDeptStyle = (name: string) => {
  const lowName = name.toLowerCase();
  if (lowName.includes('harian') || lowName.includes('bph') || lowName.includes('ph')) return { icon: "🏛️", color: "border-blue-900", bg: "bg-blue-50" };
  if (lowName.includes('harmonisasi') || lowName.includes('bidang')) return { icon: "⚖️", color: "border-cyan-600", bg: "bg-cyan-50" };
  if (lowName.includes('dalam negeri')) return { icon: "🏠", color: "border-emerald-600", bg: "bg-emerald-50" };
  if (lowName.includes('luar negeri')) return { icon: "🤝", color: "border-amber-500", bg: "bg-amber-50" };
  if (lowName.includes('sosial')) return { icon: "❤️", color: "border-rose-500", bg: "bg-rose-50" };
  if (lowName.includes('minat')) return { icon: "🎨", color: "border-purple-500", bg: "bg-purple-50" };
  if (lowName.includes('literasi')) return { icon: "📖", color: "border-indigo-500", bg: "bg-indigo-50" };
  if (lowName.includes('komunikasi') || lowName.includes('kominfo')) return { icon: "📢", color: "border-blue-700", bg: "bg-blue-100" };
  return { icon: "✨", color: "border-slate-500", bg: "bg-slate-50" };
}

export default async function ProgramKerjaPage() {
  // 1. Ambil data Departemen dan Program Kerja dari Database
  const departments = await prisma.department.findMany({
    orderBy: { name: 'asc' }
  })
  const programs = await prisma.workProgram.findMany({
    orderBy: { execution_date: 'asc' }
  })

  // 2. Kelompokkan program kerja ke dalam departemen masing-masing
  const groupedPrograms = departments.map(dept => {
    return {
      ...dept,
      programs: programs.filter(p => p.department_id === dept.id)
    }
  }).filter(dept => dept.programs.length > 0) // Hanya tampilkan departemen yang punya proker

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] font-sans selection:bg-blue-900 selection:text-white">
      <Navbar />

      <main className="flex-1 w-full pt-40 pb-24 animate-fade-in">
        
        {/* Header Section */}
        <div className="max-w-4xl mx-auto px-6 text-center mb-24 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-200/40 blur-[100px] rounded-full pointer-events-none"></div>
          <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.3em] text-blue-700 mb-4 block">Manifesto Aksi</span>
          <h1 className="relative z-10 text-5xl md:text-6xl font-black text-slate-900 tracking-tighter mb-6 leading-tight">
            Program Kerja & <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-950 to-blue-600">Agenda Kabinet</span>
          </h1>
          <p className="relative z-10 text-lg text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
            Daftar rencana strategis setiap departemen untuk mewujudkan sinergi dan harmonisasi secara nyata.
          </p>
        </div>

        {/* Programs Container (Masonry Layout) */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            
            {groupedPrograms.map((dept, idx) => {
              const style = getDeptStyle(dept.name);
              
              return (
                <div 
                  key={dept.id} 
                  className={`break-inside-avoid bg-white rounded-[2.5rem] border-l-[12px] ${style.color} p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 relative overflow-hidden`}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 ${style.bg} rounded-2xl flex items-center justify-center text-2xl shadow-sm`}>
                      {style.icon}
                    </div>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight leading-tight">
                      {dept.name}
                    </h2>
                  </div>

                  {/* Daftar Proker (Bisa Diklik) */}
                  <ul className="space-y-3">
                    {dept.programs.map((proker) => (
                      <li key={proker.id}>
                        <Link 
                          href={`/program-kerja/${proker.id}`}
                          className="group flex items-start justify-between gap-3 p-3 -mx-3 rounded-2xl hover:bg-slate-50 transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 flex-shrink-0 group-hover:bg-blue-600 transition-colors"></div>
                            <div>
                              <span className="text-sm font-bold text-slate-700 group-hover:text-blue-900 transition-colors leading-relaxed block">
                                {proker.title}
                              </span>
                              {/* Indikator Status Kecil */}
                              <span className={`text-[9px] font-black uppercase tracking-widest mt-1 inline-block ${
                                proker.status === 'SELESAI' ? 'text-emerald-600' : 
                                proker.status === 'BELUM' ? 'text-amber-500' : 'text-rose-500'
                              }`}>
                                {proker.status === 'SELESAI' ? '✅ Terlaksana' : proker.status === 'BELUM' ? '⏳ Mendatang' : '❌ Batal'}
                              </span>
                            </div>
                          </div>
                          <span className="text-slate-300 group-hover:text-blue-500 transition-colors mt-0.5">&rarr;</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}

            {/* Jika belum ada data sama sekali */}
            {groupedPrograms.length === 0 && (
              <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                <p className="text-slate-400 font-medium">Belum ada program kerja yang diinput di database.</p>
              </div>
            )}

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}