'use client'

import { useState } from "react"

export default function MemberCheckClient({ members, departments }: { members: any[], departments: any[] }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDept, setSelectedDept] = useState("")

  // Logika Pencarian & Filter Otomatis
  const filteredMembers = members.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          m.prodi.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDept = selectedDept === "" || m.department_id === selectedDept

    return matchesSearch && matchesDept
  })

  return (
    <div className="min-h-screen bg-[#F4F4F5] font-sans pb-20">
      
      {/* HEADER HERO SECTION */}
      <div className="bg-[#09090B] pt-20 pb-32 px-6 relative overflow-hidden border-b border-zinc-800">
        {/* Dekorasi Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto relative z-10 text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-800/50 border border-zinc-700 text-zinc-300 text-xs font-semibold uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Direktori IMPP
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Cek Status <span className="text-emerald-400">Anggota</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Cari dan temukan profil pengurus organisasi IMPP berdasarkan nama, program studi, atau departemen secara real-time.
          </p>
        </div>
      </div>

      {/* SEARCH & FILTER BAR (Melayang di atas batas header) */}
      <div className="max-w-4xl mx-auto px-6 -mt-10 relative z-20 animate-pop-in">
        <div className="bg-white p-2 rounded-2xl md:rounded-full shadow-xl shadow-zinc-200/50 border border-zinc-200 flex flex-col md:flex-row gap-2">
          
          {/* Input Pencarian */}
          <div className="flex-1 flex items-center px-4 bg-zinc-50 rounded-xl md:rounded-full border border-transparent focus-within:bg-white focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10 transition-all">
            <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <input 
              type="text" 
              placeholder="Cari nama atau program studi..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none outline-none px-3 py-3.5 text-sm text-zinc-900 placeholder:text-zinc-400"
            />
          </div>

          {/* Dropdown Filter Departemen */}
          <div className="w-full md:w-64">
            <select 
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full h-full bg-zinc-50 border border-transparent rounded-xl md:rounded-full px-4 py-3.5 text-sm text-zinc-700 outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all cursor-pointer appearance-none"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23a1a1aa'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundPosition: `right 1rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.2em 1.2em` }}
            >
              <option value="">Semua Departemen</option>
              {departments.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* GRID MEMBER CARDS */}
      <div className="max-w-6xl mx-auto px-6 mt-16">
        
        {/* Info Jumlah Data */}
        <div className="mb-6 flex justify-between items-center text-sm font-medium text-zinc-500">
          <p>Menampilkan <span className="text-zinc-900 font-bold">{filteredMembers.length}</span> anggota</p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMembers.map((m) => (
            <div key={m.id} className="bg-white rounded-3xl p-6 border border-zinc-200/80 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center text-center relative overflow-hidden">
              
              {/* Efek Garis Atas Kartu */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

              {/* Foto Profil */}
              <div className="w-24 h-24 mb-4 relative">
                {m.image_url ? (
                  <img src={m.image_url} alt={m.name} className="w-full h-full object-cover rounded-full border-4 border-zinc-50 shadow-sm" />
                ) : (
                  <div className="w-full h-full rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 font-bold text-3xl border-4 border-white shadow-sm">
                    {m.name.charAt(0).toUpperCase()}
                  </div>
                )}
                {/* Badge Checklist Absolute */}
                <div className="absolute bottom-0 right-0 w-7 h-7 bg-emerald-500 text-white rounded-full flex items-center justify-center border-2 border-white shadow-sm" title="Anggota Terverifikasi">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
              </div>

              {/* Data Anggota */}
              <h3 className="text-lg font-extrabold text-zinc-900 mb-1 line-clamp-1">{m.name}</h3>
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">
                {m.prodi} • <span className="text-emerald-600">Angkatan {m.batch}</span>
              </p>

              <div className="w-full pt-4 border-t border-zinc-100 flex flex-col gap-2 mt-auto">
                <div className="bg-zinc-50 rounded-xl px-3 py-2 border border-zinc-100 flex flex-col">
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-0.5">Departemen</span>
                  <span className="text-xs font-bold text-zinc-800">{m.department?.name || "-"}</span>
                </div>
                <div className="bg-emerald-50/50 rounded-xl px-3 py-2 border border-emerald-100/50 flex flex-col">
                  <span className="text-[10px] text-emerald-600/70 font-bold uppercase tracking-widest mb-0.5">Jabatan</span>
                  <span className="text-xs font-bold text-emerald-700">{m.position?.name || "-"}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* State Kosong (Jika Pencarian Tidak Ditemukan) */}
        {filteredMembers.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-zinc-200 border-dashed">
            <div className="w-16 h-16 bg-zinc-100 text-zinc-400 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">🔍</div>
            <h3 className="text-lg font-bold text-zinc-900 mb-1">Anggota tidak ditemukan</h3>
            <p className="text-zinc-500 text-sm">Coba gunakan kata kunci pencarian yang lain.</p>
          </div>
        )}

      </div>
    </div>
  )
}