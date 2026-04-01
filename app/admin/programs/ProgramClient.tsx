'use client'

import { useState } from "react"
import { addWorkProgram, updateWorkProgram, deleteWorkProgram } from "@/app/actions"
import Toast from "@/components/Toast"

export default function ProgramClient({ programs, departments }: { programs: any[], departments: any[] }) {
  const [showForm, setShowForm] = useState(false)
  const [editData, setEditData] = useState<any>(null)
  const [toastMsg, setToastMsg] = useState("")

  const handleEdit = (p: any) => {
    const date = p.execution_date ? new Date(p.execution_date).toISOString().split('T')[0] : ""
    setEditData({ ...p, execution_date: date })
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setEditData(null)
  }

  const handleSubmit = async (formData: FormData) => {
    if (editData) {
      await updateWorkProgram(formData)
      setToastMsg("Program kerja berhasil diperbarui!")
    } else {
      await addWorkProgram(formData)
      setToastMsg("Program kerja baru ditambahkan!")
    }
    setTimeout(closeForm, 500)
  }

  return (
    <div className="max-w-6xl mx-auto relative animate-fade-in">
      
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg("")} />}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-zinc-900 tracking-tight mb-1">Program Kerja</h2>
          <p className="text-zinc-500 text-sm">Rencana dan realisasi kegiatan strategis IMPP.</p>
        </div>
        <button onClick={() => { setEditData(null); setShowForm(true); }} className="bg-zinc-900 text-white font-medium px-5 py-2.5 rounded-xl hover:bg-zinc-800 transition-all flex items-center gap-2 text-sm shadow-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Tambah Proker
        </button>
      </div>

      {showForm && (
        <>
          <div className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-[100] animate-fade-in" onClick={closeForm}></div>
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-white p-8 rounded-3xl shadow-2xl border border-zinc-100 w-full max-w-2xl pointer-events-auto animate-pop-in relative">
              
              <button onClick={closeForm} className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-zinc-50 text-zinc-400 hover:text-zinc-900 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>

              <h3 className="text-xl font-bold text-zinc-900 mb-6">{editData ? "Edit Proker" : "Proker Baru"}</h3>
              
              <form action={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {editData && <input type="hidden" name="id" value={editData.id} />}
                
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-bold text-zinc-400 mb-1.5 uppercase tracking-widest">Judul Program</label>
                  <input type="text" name="title" defaultValue={editData?.title} required className="w-full border border-zinc-200 rounded-xl p-3 text-sm bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all" />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 mb-1.5 uppercase tracking-widest">Tanggal Pelaksanaan</label>
                  <input type="date" name="execution_date" defaultValue={editData?.execution_date} required className="w-full border border-zinc-200 rounded-xl p-3 text-sm bg-zinc-50 focus:bg-white outline-none" />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 mb-1.5 uppercase tracking-widest">Departemen</label>
                  <select name="department_id" defaultValue={editData?.department_id} required className="w-full border border-zinc-200 rounded-xl p-3 text-sm bg-zinc-50 outline-none">
                    <option value="">Pilih Dept</option>
                    {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[10px] font-bold text-zinc-400 mb-1.5 uppercase tracking-widest">Status Pelaksanaan</label>
                  <select name="status" defaultValue={editData?.status || "BELUM"} required className="w-full border border-zinc-200 rounded-xl p-3 text-sm bg-zinc-50 outline-none">
                    <option value="BELUM">⏳ Belum Terlaksana</option>
                    <option value="SELESAI">✅ Sudah Terlaksana</option>
                    <option value="BATAL">❌ Dibatalkan</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[10px] font-bold text-zinc-400 mb-1.5 uppercase tracking-widest">Deskripsi Singkat</label>
                  <textarea name="description" defaultValue={editData?.description} rows={3} className="w-full border border-zinc-200 rounded-xl p-3 text-sm bg-zinc-50 focus:bg-white outline-none transition-all"></textarea>
                </div>

                <div className="md:col-span-2 flex gap-3 pt-4 border-t border-zinc-100">
                  <button type="button" onClick={closeForm} className="flex-1 bg-white border border-zinc-200 text-zinc-600 font-semibold px-4 py-3 rounded-xl hover:bg-zinc-50 transition-all text-sm">Batal</button>
                  <button type="submit" className="flex-1 bg-purple-600 text-white font-semibold px-4 py-3 rounded-xl hover:bg-purple-700 shadow-sm shadow-purple-500/30 transition-all text-sm">Simpan Proker</button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {/* LIST TABLE */}
      <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-zinc-50/50 border-b border-zinc-200 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4">Program & Deskripsi</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Pelaksanaan</th>
                <th className="px-6 py-4">Dept</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {programs.map((p) => (
                <tr key={p.id} className="hover:bg-zinc-50/80 transition-all group">
                  <td className="px-6 py-4 max-w-[200px]">
                    <div className="font-bold text-zinc-900 truncate">{p.title}</div>
                    <div className="text-zinc-500 text-[11px] truncate">{p.description || "-"}</div>
                  </td>
                  
                  {/* BADGE STATUS */}
                  <td className="px-6 py-4">
                    {p.status === "SELESAI" && <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-100/50 text-[10px] font-bold uppercase tracking-wider">Terlaksana</span>}
                    {p.status === "BELUM" && <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-600 border border-amber-100/50 text-[10px] font-bold uppercase tracking-wider">Belum</span>}
                    {p.status === "BATAL" && <span className="px-2.5 py-1 rounded-md bg-rose-50 text-rose-600 border border-rose-100/50 text-[10px] font-bold uppercase tracking-wider">Batal</span>}
                    {!p.status && <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-600 border border-amber-100/50 text-[10px] font-bold uppercase tracking-wider">Belum</span>} {/* Fallback untuk data lama */}
                  </td>

                  <td className="px-6 py-4 text-zinc-600 font-medium">
                    {new Date(p.execution_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-zinc-500 font-semibold">{p.department?.slug}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                      <button onClick={() => handleEdit(p)} className="p-2 text-zinc-400 hover:text-purple-600 transition-colors">✏️</button>
                      <button onClick={() => { if(confirm("Hapus proker ini?")) { deleteWorkProgram(p.id); setToastMsg("Program dihapus!"); } }} className="p-2 text-zinc-400 hover:text-red-600 transition-colors">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}