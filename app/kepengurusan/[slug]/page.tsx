import { prisma } from "@/lib/prisma"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { notFound } from "next/navigation"
import DetailClient from "./DetailClient"

export default async function DetailDepartemenPage({ params }: { params: Promise<{ slug: string }> }) {
  
  // Tunggu parameter URL
  const { slug } = await params;

  // Cari departemen berdasarkan slug
  const dept = await prisma.department.findUnique({
    where: { slug: slug }
  })

  // Lempar ke 404 jika tidak ketemu
  if (!dept) {
    notFound()
  }

  // Cari anggota di departemen tersebut
  const members = await prisma.member.findMany({
    where: { department_id: dept.id },
    include: { position: true },
    orderBy: { position: { level: 'asc' } }
  })

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] font-sans selection:bg-blue-900 selection:text-white">
      <Navbar />
      
      {/* Panggil komponen Client dan berikan datanya */}
      <DetailClient dept={dept} members={members} />

      <Footer />
    </div>
  )
}