import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export const metadata = {
  title: "Tentang Kami | IMPP UNNES",
  description: "Filosofi dan Nilai Organisasi IMPP UNNES",
}

export default function TentangPage() {
  const pancaAsa = [
    {
      title: "Harmonis",
      desc: "Hubungan yang seimbang dan saling menghargai antar individu guna menciptakan suasana organisasi yang selaras dan utuh.",
      icon: "🤝"
    },
    {
      title: "Sinergis",
      desc: "Bekerja sama secara efektif dengan menggabungkan kekuatan dan potensi setiap individu untuk mencapai hasil yang lebih besar.",
      icon: "⚡"
    },
    {
      title: "Inklusif",
      desc: "Menghargai keberagaman dan memberikan ruang yang setara bagi semua orang tanpa adanya diskriminasi.",
      icon: "🌍"
    },
    {
      title: "Progresif",
      desc: "Terbuka terhadap perubahan dan terus berinovasi untuk mencapai kemajuan yang berkelanjutan.",
      icon: "🚀"
    },
    {
      title: "Apresiatif",
      desc: "Memberikan penghargaan terhadap kontribusi, ide, dan pencapaian sebagai bentuk penghargaan dan motivasi.",
      icon: "⭐"
    }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] font-sans selection:bg-blue-900 selection:text-white">
      <Navbar />

      <main className="flex-1 w-full pt-32 pb-24 animate-fade-in">
        
        {/* HEADER */}
        <div className="max-w-4xl mx-auto px-6 text-center mb-20 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-200/40 blur-[100px] rounded-full pointer-events-none"></div>
          <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.3em] text-blue-700 mb-4 block">Profil Organisasi</span>
          <h1 className="relative z-10 text-5xl md:text-6xl font-black text-slate-900 tracking-tighter mb-6">
            Mengenal Lebih Dekat<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-950 to-blue-600">IMPP UNNES</span>
          </h1>
        </div>

        {/* FILOSOFI KABINET */}
        <section className="max-w-6xl mx-auto px-6 mb-32">
          <div className="bg-white rounded-[3rem] p-10 md:p-16 border border-slate-100 shadow-2xl shadow-blue-900/5 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-600 mb-3 block">Filosofi Kabinet 2025/2026</span>
              <h2 className="text-4xl font-black text-blue-950 tracking-tight mb-6">Ruang Kebhinnekaan</h2>
              <div className="space-y-4 text-slate-500 font-medium leading-relaxed">
                <p>
                  <strong className="text-slate-800">Ruang</strong> memiliki arti sebagai tempat atau wadah. Sedangkan <strong className="text-slate-800">Kebhinnekaan</strong> adalah kesadaran akan perbedaan dan keberagaman.
                </p>
                <p>
                  Secara utuh, <strong>"Ruang Kebhinnekaan"</strong> dapat diartikan sebagai tempat yang menghargai akan adanya perbedaan dan keberagaman, serta dapat mewujudkan nilai-nilainya guna pemberdayaan SDM Organisasi.
                </p>
                <p>
                  Kabinet ini menjunjung tinggi nilai-nilai yang tertuang dalam Panca Asa, yang nantinya menjadi pedoman untuk arah gerak selama satu periode ke depan.
                </p>
              </div>
            </div>
            <div className="flex-1 w-full relative">
              <div className="aspect-square rounded-[2rem] bg-gradient-to-tr from-blue-900 to-cyan-500 p-1 flex items-center justify-center rotate-3 hover:rotate-0 transition-all duration-500 shadow-xl">
                <div className="w-full h-full bg-[#0a1128] rounded-[1.8rem] flex flex-col items-center justify-center p-8 text-center border-4 border-blue-900/50">
                  <div className="text-6xl mb-4">🏛️</div>
                  <h3 className="text-2xl font-black text-white mb-2 tracking-tight">#Bersinergi</h3>
                  <h3 className="text-2xl font-black text-cyan-400 tracking-tight">Ciptakan Harmonisasi</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PANCA ASA */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-700 mb-3 block">Nilai Organisasi</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">Panca Asa</h2>
            <div className="h-1.5 w-16 bg-blue-900 mt-6 rounded-full mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pancaAsa.map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-900 flex items-center justify-center text-3xl mb-6 shadow-sm">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}