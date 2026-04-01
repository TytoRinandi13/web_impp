'use client'

import Link from "next/link"

export default function DetailClient({ dept, members }: { dept: any, members: any[] }) {
  return (
    <main className="flex-1 w-full pt-32 pb-24 animate-fade-in">
      
      {/* Tombol Back */}
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <Link 
          href="/kepengurusan"
          className="group inline-flex items-center gap-3 text-slate-400 hover:text-blue-950 font-bold transition-all"
        >
          <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-blue-950 group-hover:bg-blue-950 group-hover:text-white transition-all shadow-sm">
            &larr;
          </div>
          <span className="text-sm uppercase tracking-widest">Kembali ke Struktur</span>
        </Link>
      </div>

      {/* Header Departemen */}
      <div className="max-w-6xl mx-auto px-6 mb-20 text-center md:text-left">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-700 mb-2 block">Detail Kepengurusan</span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter">
          {dept.name}
        </h2>
        <div className="h-1.5 w-20 bg-blue-900 mt-6 rounded-full mx-auto md:mx-0"></div>
      </div>

      {/* Grid Anggota */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {members.map((m) => (
          <div key={m.id} className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col items-center text-center group">
            
            <div className="w-32 h-32 mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900 to-cyan-400 rounded-full opacity-0 group-hover:opacity-10 scale-110 transition-all"></div>
              {m.image_url ? (
                <img 
                  src={m.image_url} 
                  alt={m.name} 
                  className="w-full h-full object-cover rounded-full border-4 border-white shadow-md relative z-10 bg-slate-50" 
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=1e3a8a&color=fff&size=256&bold=true`;
                  }}
                />
              ) : (
                <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-3xl border-4 border-white shadow-md relative z-10">
                  {m.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            <h3 className="font-black text-slate-900 text-lg mb-1 leading-tight">{m.name}</h3>
            <div className="px-3 py-1 bg-blue-50 rounded-lg mb-4">
              <p className="text-[10px] font-black text-blue-900 uppercase tracking-widest">
                {m.position?.name || 'Fungsionaris'}
              </p>
            </div>
            
            <div className="mt-auto w-full pt-5 border-t border-slate-50">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
                {m.prodi} <span className="mx-1">•</span> {m.batch}
              </p>
            </div>
          </div>
        ))}

        {/* Kosong Info */}
        {members.length === 0 && (
          <div className="col-span-full text-center py-16 border-2 border-dashed border-slate-200 rounded-[2rem]">
            <p className="text-slate-400 font-medium">Belum ada fungsionaris yang diinput ke dalam bagian ini.</p>
          </div>
        )}
      </div>

    </main>
  )
}