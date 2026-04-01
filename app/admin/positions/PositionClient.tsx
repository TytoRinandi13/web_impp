'use client'

import { useState } from "react"
import { addPosition, updatePosition, deletePosition } from "@/app/actions"
import Toast from "@/components/Toast" // 1. Import komponen Toast

export default function PositionClient({ positions }: { positions: any[] }) {
  const [showForm, setShowForm] = useState(false)
  const [editData, setEditData] = useState<any>(null)
  const [toastMsg, setToastMsg] = useState("") // 2. State untuk pesan notifikasi

  const handleAdd = () => {
    setEditData(null)
    setShowForm(true)
  }

  const handleEdit = (pos: any) => {
    setEditData(pos)
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setEditData(null)
  }

  // 3. Fungsi Submit untuk memunculkan Toast
  const handleSubmit = async (formData: FormData) => {
    if (editData) {
      await updatePosition(formData)
      setToastMsg("Data jabatan berhasil diperbarui!")
    } else {
      await addPosition(formData)
      setToastMsg("Jabatan baru berhasil ditambahkan!")
    }
    setTimeout(closeForm, 500)
  }

  // 3. Fungsi Delete untuk memunculkan Toast
  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus jabatan ini?")) {
      await deletePosition(id)
      setToastMsg("Jabatan berhasil dihapus!")
    }
  }

  return (
    <div className="max-w-5xl mx-auto relative animate-fade-in">
      
      {/* 4. Letakkan komponen Toast di sini */}
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg("")} />}
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-zinc-900 tracking-tight mb-1">Data Jabatan</h2>
          <p className="text-zinc-500 text-sm">Kelola hierarki dan nama jabatan pengurus organisasi.</p>
        </div>
        <button onClick={handleAdd} className="bg-zinc-900 text-white font-medium px-5 py-2.5 rounded-xl hover:bg-zinc-800 transition-all flex items-center gap-2 text-sm shadow-sm hover:shadow-md">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
          Tambah Jabatan
        </button>
      </div>

      {/* POP-UP MODAL (Glassmorphism effect) */}
      {showForm && (
        <>
          {/* Overlay Background */}
          <div className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-[100] animate-fade-in" onClick={closeForm}></div>
          
          {/* Modal Card */}
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-white p-8 rounded-3xl shadow-2xl border border-zinc-100 w-full max-w-md pointer-events-auto animate-pop-in relative">
              
              {/* Close Button */}
              <button onClick={closeForm} className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-zinc-50 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
              
              {/* Modal Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-900">
                    {editData ? "Edit Jabatan" : "Jabatan Baru"}
                  </h3>
                  <p className="text-zinc-500 text-xs">Isi detail jabatan di bawah ini.</p>
                </div>
              </div>
              
              {/* Form Input - Action diubah ke handleSubmit */}
              <form action={handleSubmit} className="space-y-5">
                {editData && <input type="hidden" name="id" value={editData.id} />}

                <div>
                  <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase tracking-wider">Nama Jabatan</label>
                  <input type="text" name="name" defaultValue={editData?.name} required placeholder="Contoh: Ketua Departemen" className="w-full border border-zinc-200 rounded-xl p-3 text-sm text-zinc-800 bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all" />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase tracking-wider">Level Hierarki</label>
                  <input type="number" name="level" defaultValue={editData?.level} required placeholder="1 = Tertinggi" className="w-full border border-zinc-200 rounded-xl p-3 text-sm text-zinc-800 bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all" />
                  <p className="text-zinc-400 text-[11px] mt-2 leading-relaxed">Level digunakan untuk mengurutkan struktur (contoh: Ketua = 1, Sekretaris = 2, Staff = 3).</p>
                </div>
                
                <div className="pt-4 mt-6 border-t border-zinc-100 flex gap-3">
                  <button type="button" onClick={closeForm} className="flex-1 bg-white border border-zinc-200 text-zinc-600 font-semibold px-4 py-2.5 rounded-xl hover:bg-zinc-50 transition-colors text-sm">Batal</button>
                  <button type="submit" className="flex-1 bg-amber-500 text-white font-semibold px-4 py-2.5 rounded-xl hover:bg-amber-600 shadow-sm shadow-amber-500/30 transition-all text-sm">
                    {editData ? "Simpan Perubahan" : "Simpan Data"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {/* MODERN DATA TABLE */}
      <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-zinc-50/50 border-b border-zinc-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-zinc-500 uppercase tracking-wider text-xs">Nama Jabatan</th>
                <th className="px-6 py-4 font-semibold text-zinc-500 uppercase tracking-wider text-xs">Level</th>
                <th className="px-6 py-4 font-semibold text-zinc-500 uppercase tracking-wider text-xs text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {positions.map((pos) => (
                <tr key={pos.id} className="hover:bg-zinc-50/80 transition-colors group">
                  <td className="px-6 py-4 font-medium text-zinc-900">
                    {pos.name}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-amber-50 text-amber-600 font-semibold text-xs border border-amber-100/50">
                      Level {pos.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEdit(pos)} className="p-2 text-zinc-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Edit">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                      </button>
                      <button onClick={() => handleDelete(pos.id)} className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Hapus">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {/* Jika data kosong */}
              {positions.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-zinc-500">
                    <div className="flex flex-col items-center justify-center">
                      <svg className="w-12 h-12 text-zinc-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                      <p>Belum ada data jabatan.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}