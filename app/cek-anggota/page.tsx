import { prisma } from "@/lib/prisma"
import MemberCheckClient from "./MemberCheckClient"

export const metadata = {
  title: "Cek Anggota | IMPP",
  description: "Direktori pengurus dan anggota organisasi IMPP",
}

export default async function CekAnggotaPage() {
  // Ambil data anggota beserta relasinya
  const members = await prisma.member.findMany({
    include: {
      department: true,
      position: true
    },
    orderBy: { name: 'asc' }
  })

  // Ambil data departemen untuk menu filter
  const departments = await prisma.department.findMany({
    orderBy: { name: 'asc' }
  })

  return <MemberCheckClient members={members} departments={departments} />
}