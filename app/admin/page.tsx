import { prisma } from "@/lib/prisma"

export default async function AdminDashboard() {
  // Mengambil semua statistik secara paralel biar ngebut!
  const [countDept, countPosition, countMember, countProgram, countAgenda] = await Promise.all([
    prisma.department.count(),
    prisma.position.count(),
    prisma.member.count(),
    prisma.workProgram.count(),
    prisma.agenda.count(),
  ])

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      
      {/* Header Halaman */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-zinc-900 tracking-tight mb-2">Selamat Datang, Admin! 👋</h2>
        <p className="text-zinc-500">Berikut adalah ringkasan data Master Organisasi IMPP saat ini.</p>
      </div>

      {/* Grid Stats Cards Modern (5 Kartu) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        
        {/* Card 1: Departemen */}
        <div className="bg-white p-7 rounded-3xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-zinc-100 hover:shadow-lg transition-shadow duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform duration-500">
             <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
          </div>
          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5"></path></svg>
            </div>
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Total Departemen</h3>
          </div>
          <div className="text-4xl font-black text-zinc-900 relative z-10">{countDept}</div>
        </div>

        {/* Card 2: Jabatan */}
        <div className="bg-white p-7 rounded-3xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-zinc-100 hover:shadow-lg transition-shadow duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform duration-500">
             <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
          </div>
          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            </div>
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Total Jabatan</h3>
          </div>
          <div className="text-4xl font-black text-zinc-900 relative z-10">{countPosition}</div>
        </div>

        {/* Card 3: Anggota */}
        <div className="bg-white p-7 rounded-3xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-zinc-100 hover:shadow-lg transition-shadow duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform duration-500">
             <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          </div>
          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            </div>
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Total Anggota</h3>
          </div>
          <div className="text-4xl font-black text-zinc-900 relative z-10">{countMember}</div>
        </div>

        {/* Card 4: Program Kerja */}
        <div className="bg-white p-7 rounded-3xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-zinc-100 hover:shadow-lg transition-shadow duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform duration-500">
             <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Program Kerja</h3>
          </div>
          <div className="text-4xl font-black text-zinc-900 relative z-10">{countProgram}</div>
        </div>

        {/* Card 5: Agenda */}
        <div className="bg-white p-7 rounded-3xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-zinc-100 hover:shadow-lg transition-shadow duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform duration-500">
             <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          </div>
          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            </div>
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Total Agenda</h3>
          </div>
          <div className="text-4xl font-black text-zinc-900 relative z-10">{countAgenda}</div>
        </div>

      </div>
    </div>
  )
}