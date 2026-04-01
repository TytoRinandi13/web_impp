'use client'

import Link from "next/link"

export default function KabinetClient({ members, departments }: { members: any[], departments: any[] }) {

  const getDeptRank = (name: string) => {
    const lowName = name.toLowerCase();
    if (lowName.includes('harian') || lowName.includes('bph') || lowName.includes('inti') || lowName.includes('ph')) return 1;
    if (lowName.includes('harmonisas') || lowName.includes('bidang')) return 2;
    return 3;
  }

  const coreManagement = departments.filter(d => getDeptRank(d.name) === 1);
  const bidang = departments.filter(d => getDeptRank(d.name) === 2);
  const departemenLain = departments.filter(d => getDeptRank(d.name) === 3).sort((a, b) => a.name.localeCompare(b.name));

  const renderDeptCard = (dept: any, rank: number, index: number) => {
    const count = members.filter(m => m.department_id === dept.id).length;
    return (
      <Link 
        href={`/kepengurusan/${dept.slug}`} 
        key={dept.id}
        className={`group relative bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-2 transition-all duration-500 text-left overflow-hidden flex flex-col justify-between animate-pop-in w-full ${rank === 3 ? 'md:w-[340px]' : 'md:w-[380px]'}`}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className={`absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full opacity-[0.03] group-hover:opacity-[0.08] transition-opacity ${rank === 1 ? 'bg-blue-900' : rank === 2 ? 'bg-cyan-600' : 'bg-slate-900'}`}></div>
        
        <div>
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors shadow-sm ${
            rank === 1 ? 'bg-blue-950 text-white' : rank === 2 ? 'bg-cyan-50 text-cyan-700' : 'bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-900'
          }`}>
            <span className="text-xl font-black">{dept.name.charAt(0)}</span>
          </div>

          <h3 className={`font-black mb-2 leading-tight transition-colors ${rank === 1 ? 'text-2xl text-blue-950 group-hover:text-blue-800' : 'text-xl text-slate-900 group-hover:text-blue-900'}`}>
            {dept.name}
          </h3>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            {count} Personel
          </p>
        </div>

        <div className="mt-8 flex items-center gap-2 text-blue-800 font-bold text-xs opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">
          Lihat Fungsionaris <span>&rarr;</span>
        </div>
      </Link>
    )
  }

  return (
    <div className="w-full pb-32">
      <div className="animate-fade-in relative z-10">
        
        {/* === TOMBOL KEMBALI KE BERANDA === */}
        <div className="max-w-7xl mx-auto px-6 pt-32 -mb-20 relative z-20">
          <Link 
            href="/"
            className="group inline-flex items-center gap-3 text-slate-400 hover:text-blue-950 font-bold transition-all"
          >
            <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-blue-950 group-hover:bg-blue-950 group-hover:text-white transition-all shadow-sm bg-white/50 backdrop-blur-sm">
              &larr;
            </div>
            <span className="text-sm uppercase tracking-widest">Kembali ke Beranda</span>
          </Link>
        </div>
        
        {/* HEADER HALAMAN */}
        <div className="pt-40 pb-12 px-6 text-center relative overflow-hidden">
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-blue-100/50 blur-[100px] rounded-full pointer-events-none"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-6 shadow-sm">
                Struktur Organisasi
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter mb-6">
                Kabinet <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-950 via-blue-800 to-cyan-600 font-black">Ruang Kebhinnekaan</span>
              </h1>
              <p className="text-lg text-slate-500 font-medium max-w-xl mx-auto">
                Pilih salah satu divisi untuk melihat daftar fungsionaris yang bertugas.
              </p>
            </div>
        </div>

        {/* BAGAN ORGANISASI */}
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          
          {coreManagement.length > 0 && (
            <div className="flex flex-wrap justify-center gap-6 w-full z-10">
              {coreManagement.map((dept, index) => renderDeptCard(dept, 1, index))}
            </div>
          )}

          {coreManagement.length > 0 && bidang.length > 0 && (
            <div className="flex justify-center my-2 relative z-0">
              <div className="w-1.5 h-12 md:h-16 bg-gradient-to-b from-blue-900 to-cyan-500 rounded-full opacity-80"></div>
            </div>
          )}

          {bidang.length > 0 && (
            <div className="flex flex-wrap justify-center gap-6 w-full z-10">
              {bidang.map((dept, index) => renderDeptCard(dept, 2, index))}
            </div>
          )}

          {bidang.length > 0 && departemenLain.length > 0 && (
            <div className="flex flex-col items-center my-2 relative z-0 w-full">
              <div className="w-1.5 h-12 md:h-16 bg-gradient-to-b from-cyan-500 to-slate-300 rounded-full opacity-80"></div>
            </div>
          )}

          {departemenLain.length > 0 && (
            <div className="flex flex-wrap justify-center gap-6 w-full z-10">
              {departemenLain.map((dept, index) => renderDeptCard(dept, 3, index))}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}