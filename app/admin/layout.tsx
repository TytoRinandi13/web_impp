import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
const menu = [
    { 
      name: 'Dashboard', 
      href: '/admin', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg> 
    },
    { 
      name: 'Departemen', 
      href: '/admin/departments', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg> 
    },
    { 
      name: 'Jabatan', 
      href: '/admin/positions', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg> 
    },
    { 
      name: 'Anggota', 
      href: '/admin/members', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg> 
    },
    { 
      name: 'Program Kerja', 
      href: '/admin/programs', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg> 
    },
    { 
      name: 'Agenda', 
      href: '/admin/agendas', 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> 
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F4F4F5] font-sans text-zinc-900">
      
      {/* SIDEBAR (Ultra Modern Dark) */}
      <aside className="w-[280px] bg-[#09090B] fixed h-screen flex flex-col z-50 border-r border-zinc-800">
        {/* Logo Area */}
        <div className="h-20 flex items-center px-8 border-b border-zinc-800/50">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center mr-3 shadow-lg shadow-indigo-500/20">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
          <h1 className="text-white font-bold text-xl tracking-tight">IMPP<span className="text-zinc-500 font-normal"> Panel</span></h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <p className="px-4 text-[0.65rem] font-bold tracking-widest text-zinc-500 uppercase mb-3">Menu Utama</p>
          {menu.map((m) => (
            <Link key={m.href} href={m.href} className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all duration-200 font-medium text-sm group">
              <span className="text-zinc-500 group-hover:text-indigo-400 transition-colors">{m.icon}</span>
              {m.name}
            </Link>
          ))}
        </nav>

        {/* Bottom Profile */}
        <div className="p-4 m-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex items-center gap-3">
          <img src="https://ui-avatars.com/api/?name=Admin&background=6366f1&color=fff" alt="Admin" className="w-10 h-10 rounded-full border-2 border-zinc-800" />
          <div className="overflow-hidden">
            <p className="text-white text-sm font-semibold truncate">Administrator</p>
            <p className="text-zinc-500 text-xs truncate">admin@impp.org</p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 ml-[280px] flex flex-col min-h-screen">
        
        {/* TOP NAVBAR (Glassmorphism Effect) */}
        <header className="h-20 bg-white/70 backdrop-blur-md border-b border-zinc-200 sticky top-0 z-40 flex items-center justify-between px-10">
          <div className="flex items-center gap-2 text-sm font-medium text-zinc-500">
            <span>Admin</span>
            <span className="text-zinc-300">/</span>
            <span className="text-zinc-900">Dashboard</span>
          </div>
          <button className="flex items-center gap-2 text-sm font-semibold text-zinc-600 hover:text-indigo-600 transition-colors bg-white border border-zinc-200 px-4 py-2 rounded-full shadow-sm">
            Lihat Website &rarr;
          </button>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-10">
          {children}
        </main>
      </div>

    </div>
  );
}