'use client'

import { useState } from "react"
import { addMember, updateMember, deleteMember } from "@/app/actions"
import Toast from "@/components/Toast"

export default function MemberClient({ members, departments, positions }: { 
  members: any[], 
  departments: any[], 
  positions: any[] 
}) {
  const [showForm, setShowForm] = useState(false)
  const [editData, setEditData] = useState<any>(null)
  const [toastMsg, setToastMsg] = useState("")

  const handleAdd = () => {
    setEditData(null)
    setShowForm(true)
  }

  const handleEdit = (m: any) => {
    const formattedDate = m.birth_date ? new Date(m.birth_date).toISOString().split('T')[0] : ""
    setEditData({ ...m, birth_date: formattedDate })
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setEditData(null)
  }

  // MESIN PENGUBAH LINK GOOGLE DRIVE
  const convertDriveLink = (url: string) => {
    if (!url) return "";
    if (url.includes("drive.google.com/file/d/")) {
      const match = url.match(/\/d\/(.+?)\//);
      if (match && match[1]) {
        return `https://drive.google.com/uc?export=view&id=${match[1]}`;
      }
    }
    return url; 
  }

  const handleSubmit = async (formData: FormData) => {
    // Ubah nama penangkap form menjadi image_url
    const rawUrl = formData.get("image_url") as string;
    const fixedUrl = convertDriveLink(rawUrl);
    formData.set("image_url", fixedUrl); 

    if (editData) {
      await updateMember(formData)
      setToastMsg("Biodata anggota diperbarui!")
    } else {
      await addMember(formData)
      setToastMsg("Anggota baru berhasil ditambahkan!")
    }
    setTimeout(closeForm, 500)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus data anggota ini?")) {
      await deleteMember(id)
      setToastMsg("Data anggota dihapus!")
    }
  }

  return (
    <div className="max-w-6xl mx-auto relative animate-fade-in">
      
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg("")} />}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-zinc-900 tracking-tight mb-1">Data Anggota</h2>
          <p className="text-zinc-500 text-sm">Manajemen seluruh pengurus dan anggota organisasi IMPP.</p>
        </div>
        <button onClick={handleAdd} className="bg-zinc-900 text-white font-medium px-5 py-2.5 rounded-xl hover:bg-zinc-800 transition-all flex items-center gap-2 text-sm shadow-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
          Tambah Anggota
        </button>
      </div>

      {showForm && (
        <>
          <div className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-[100] animate-fade-in" onClick={closeForm}></div>
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-white p-8 rounded-3xl shadow-2xl border border-zinc-100 w-full max-w-2xl pointer-events-auto animate-pop-in relative max-h-[90vh] overflow-y-auto">
              
              <button onClick={closeForm} className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-zinc-50 text-zinc-400 hover:text-zinc-900 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
              
              <div className="flex items-center gap-4 mb-8">
                {/* Preview Foto (Ubah ke image_url) */}
                {editData?.image_url ? (
                  <img src={editData.image_url} alt="Preview" className="w-12 h-12 rounded-2xl object-cover border border-zinc-200 shadow-sm" />
                ) : (
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl">👤</div>
                )}
                <div>
                  <h3 className="text-xl font-bold text-zinc-900">{editData ? "Edit Anggota" : "Anggota Baru"}</h3>
                  <p className="text-zinc-500 text-xs">Isi form di bawah. Bisa pakai link Google Drive lho!</p>
                </div>
              </div>
              
              <form action={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {editData && <input type="hidden" name="id" value={editData.id} />}

                <div className="md:col-span-2">
                  <label className="block text-[10px] font-bold text-zinc-400 mb-1.5 uppercase tracking-widest">Nama Lengkap</label>
                  <input type="text" name="name" defaultValue={editData?.name} required className="w-full border border-zinc-200 rounded-xl p-3 text-sm bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all" />
                </div>

                {/* INPUT URL GAMBAR (name diubah jadi image_url) */}
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-bold text-zinc-400 mb-1.5 uppercase tracking-widest">Link Foto Profil (Opsional)</label>
                  <input type="url" name="image_url" defaultValue={editData?.image_url} placeholder="Paste link Google Drive atau link gambar lain di sini..." className="w-full border border-zinc-200 rounded-xl p-3 text-sm bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all" />
                  <p className="text-[10px] text-emerald-600 font-medium mt-1.5">💡 Sistem akan otomatis mengubah link Google Drive menjadi foto yang bisa dilihat.</p>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 mb-1.5 uppercase tracking-widest">Program Studi</label>
                  <input type="text" name="prodi" defaultValue={editData?.prodi} required className="w-full border border-zinc-200 rounded-xl p-3 text-sm bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all" />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 mb-1.5 uppercase tracking-widest">Angkatan</label>
                  <input type="number" name="batch" defaultValue={editData?.batch} required className="w-full border border-zinc-200 rounded-xl p-3 text-sm bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all" />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 mb-1.5 uppercase tracking-widest">Tanggal Lahir</label>
                  <input type="date" name="birth_date" defaultValue={editData?.birth_date} required className="w-full border border-zinc-200 rounded-xl p-3 text-sm bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all" />
                </div>

                <div className="md:col-span-1">
                  <label className="block text-[10px] font-bold text-zinc-400 mb-1.5 uppercase tracking-widest">Departemen</label>
                  <select name="department_id" defaultValue={editData?.department_id} required className="w-full border border-zinc-200 rounded-xl p-3 text-sm bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all">
                    <option value="">Pilih Departemen</option>
                    {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                  </select>
                </div>

                <div className="md:col-span-1">
                  <label className="block text-[10px] font-bold text-zinc-400 mb-1.5 uppercase tracking-widest">Jabatan</label>
                  <select name="position_id" defaultValue={editData?.position_id} required className="w-full border border-zinc-200 rounded-xl p-3 text-sm bg-zinc-50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all">
                    <option value="">Pilih Jabatan</option>
                    {positions.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
                
                <div className="md:col-span-2 pt-4 mt-4 border-t border-zinc-100 flex gap-3">
                  <button type="button" onClick={closeForm} className="flex-1 bg-white border border-zinc-200 text-zinc-600 font-semibold px-4 py-3 rounded-xl hover:bg-zinc-50 transition-colors text-sm">Batal</button>
                  <button type="submit" className="flex-1 bg-emerald-600 text-white font-semibold px-4 py-3 rounded-xl hover:bg-emerald-700 shadow-sm shadow-emerald-500/30 transition-all text-sm">
                    {editData ? "Update Data" : "Simpan Anggota"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {/* TABLE DENGAN FOTO PROFIL */}
      <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-zinc-50/50 border-b border-zinc-200">
              <tr>
                <th className="px-6 py-4 font-bold text-zinc-400 uppercase tracking-widest text-[10px]">Profil Anggota</th>
                <th className="px-6 py-4 font-bold text-zinc-400 uppercase tracking-widest text-[10px]">Departemen</th>
                <th className="px-6 py-4 font-bold text-zinc-400 uppercase tracking-widest text-[10px]">Jabatan</th>
                <th className="px-6 py-4 font-bold text-zinc-400 uppercase tracking-widest text-[10px] text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {members.map((m) => (
                <tr key={m.id} className="hover:bg-zinc-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {/* Avatar / Foto (Ubah ke image_url) */}
                      {m.image_url ? (
                        <img src={m.image_url} alt={m.name} className="w-10 h-10 rounded-full object-cover border border-zinc-200 shadow-sm" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 font-bold text-xs border border-zinc-200 shadow-sm">
                          {m.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      
                      {/* Nama & Prodi */}
                      <div>
                        <div className="font-bold text-zinc-900">{m.name}</div>
                        <div className="text-zinc-500 text-xs">{m.prodi} • Angkatan {m.batch}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-600 text-[11px] font-bold uppercase tracking-wider">{m.department?.name}</span>
                  </td>
                  <td className="px-6 py-4 text-zinc-600 font-medium">
                    {m.position?.name}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                      <button onClick={() => handleEdit(m)} className="p-2 text-zinc-400 hover:text-amber-600 transition-colors" title="Edit">✏️</button>
                      <button onClick={() => handleDelete(m.id)} className="p-2 text-zinc-400 hover:text-red-600 transition-colors" title="Hapus">🗑️</button>
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