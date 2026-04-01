import { prisma } from "@/lib/prisma"
import KabinetClient from "./KabinetClient"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export const metadata = {
  title: "Struktur Kabinet | IMPP UNNES",
  description: "Susunan pengurus Ikatan Mahasiswa Pelajar Pemalang UNNES",
}

export default async function KepengurusanPage() {
  const members = await prisma.member.findMany({
    include: {
      department: true,
      position: true
    },
    orderBy: { position: { level: 'asc' } }
  })

  const departments = await prisma.department.findMany({
    orderBy: { name: 'asc' }
  })

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] font-sans selection:bg-blue-900 selection:text-white">
      <Navbar />
      
      {/* Konten Utama Kabinet (Client Component) */}
      <main className="flex-1 w-full">
        <KabinetClient members={members} departments={departments} />
      </main>

      <Footer />
    </div>
  )
}