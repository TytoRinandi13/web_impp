export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-10 px-6 relative z-20 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-950 rounded-md flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <span className="font-bold text-slate-900 tracking-tight">IMPP UNNES</span>
        </div>
        <p className="text-slate-500 text-sm font-medium">
          © {new Date().getFullYear()} Ikatan Mahasiswa Pelajar Pemalang. Dibuat dengan 💙 untuk Pemalang.
        </p>
      </div>
    </footer>
  )
}