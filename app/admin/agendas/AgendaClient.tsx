'use client'

import { useState } from "react"
import { addAgenda, updateAgenda, deleteAgenda } from "@/app/actions"
import Toast from "@/components/Toast"

export default function AgendaClient({ agendas, departments }: { agendas: any[], departments: any[] }) {
  const [showForm, setShowForm] = useState(false)
  const [editData, setEditData] = useState<any>(null)
  const [toastMsg, setToastMsg] = useState("")

  const handleAdd = () => {
    setEditData(null)
    setShowForm(true)
  }

  const handleEdit = (a: any) => {
    setEditData(a)
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setEditData(null)
  }

  const handleSubmit = async (formData: FormData) => {
    if (editData) {
      await updateAgenda(formData)
      setToastMsg("Agenda rutin berhasil diperbarui!")
    } else {
      await addAgenda(formData)
      setToastMsg("Agenda baru berhasil ditambahkan!")
    }
    setTimeout(closeForm, 500)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Hapus agenda rutin ini?")) {
      await deleteAgenda(id)
      setToastMsg("Agenda telah dihapus!")
    }
  }

  return (
    <div className="max-w-5xl mx-auto relative animate-fade-in">
      
      {/* NOTIFIKASI TOAST */}
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg("")} />}

      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-zinc-900 tracking-tight mb-1">Agenda Rutin</h2>
          <p className="text-zinc-500 text-sm">Kelola jadwal kegiatan berulang organisasi.</p>
        </div>
        <button onClick={handleAdd} className="bg-zinc-900 text-white font-medium px-5 py-2.5 rounded-xl hover:bg-zinc-800 transition-all flex items-center gap-2 text-sm shadow-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
          Tambah Agenda
        </button>
      </div>

      {/* MODAL FORM AGENDA */}
      {showForm && (
        <>
          <div className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-[100] animate-fade-in" onClick={closeForm}></div>
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-white p-8 rounded-3xl shadow-2xl border border-zinc-100 w-full max-w-md pointer-events-auto animate-pop-in relative">
              
              <button onClick={closeForm} className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-zinc-50 text-zinc-400 hover:text-zinc-900 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center text-xl">📅</div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-900">{editData ? "Edit Agenda" : "Agenda Baru"}</h3>
                  <p className="text-zinc-500 text-xs">Atur kegiatan rutin departemen.</p>
                </div>
              </div>
              
              <form action={handleSubmit} className="space-y-5">
                {editData && <input type="hidden" name="id" value={editData.id} />}

                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 mb-1.5 uppercase tracking-widest">Judul Agenda</label>
                  <input type="text" name="title" defaultValue={editData?.title} required placeholder="Contoh: Rapat Koordinasi Mingguan" className="w-full border border-zinc-200 rounded-xl p-3 text-sm bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all" />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 mb-1.5 uppercase tracking-widest">Frekuensi</label>
                  <select name="frequency" defaultValue={editData?.frequency || "WEEKLY"} required className="w-full border border-zinc-200 rounded-xl p-3 text-sm bg-zinc-50 outline-none transition-all">
                    <option value="WEEKLY">Mingguan</option>
                    <option value="MONTHLY">Bulanan</option>
                    <option value="YEARLY">Tahunan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 mb-1.5 uppercase tracking-widest">Departemen Pelaksana</label>
                  <select name="department_id" defaultValue={editData?.department_id} required className="w-full border border-zinc-200 rounded-xl p-3 text-sm bg-zinc-50 outline-none transition-all">
                    <option value="">Pilih Departemen</option>
                    {departments.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="pt-4 mt-6 border-t border-zinc-100 flex gap-3">
                  <button type="button" onClick={closeForm} className="flex-1 bg-white border border-zinc-200 text-zinc-600 font-semibold px-4 py-2.5 rounded-xl hover:bg-zinc-50 transition-colors text-sm">Batal</button>
                  <button type="submit" className="flex-1 bg-rose-600 text-white font-semibold px-4 py-2.5 rounded-xl hover:bg-rose-700 shadow-sm shadow-rose-500/30 transition-all text-sm">
                    {editData ? "Simpan Perubahan" : "Simpan Agenda"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {/* TABLE AGENDA */}
      <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-zinc-50/50 border-b border-zinc-200 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4">Nama Agenda</th>
                <th className="px-6 py-4">Frekuensi</th>
                <th className="px-6 py-4">Pelaksana</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {agendas.map((a) => (
                <tr key={a.id} className="hover:bg-zinc-50/80 transition-all group">
                  <td className="px-6 py-4 font-bold text-zinc-900">{a.title}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-600 border border-rose-100/50 text-[10px] font-bold uppercase tracking-wider">
                      {a.frequency === 'WEEKLY' ? 'Mingguan' : a.frequency === 'MONTHLY' ? 'Bulanan' : 'Tahunan'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-zinc-600 font-medium italic">
                    {a.department?.name || "-"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                      <button onClick={() => handleEdit(a)} className="p-2 text-zinc-400 hover:text-amber-500 transition-colors" title="Edit">✏️</button>
                      <button onClick={() => handleDelete(a.id)} className="p-2 text-zinc-400 hover:text-red-600 transition-colors" title="Hapus">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {agendas.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-zinc-400 italic">Belum ada agenda rutin yang dibuat.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}