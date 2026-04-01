import { prisma } from "@/lib/prisma"
import MemberClient from "./MemberClient"

export default async function MembersPage() {
  // 1. Ambil semua anggota beserta relasinya
  const members = await prisma.member.findMany({
    include: {
      department: true,
      position: true
    },
    orderBy: { name: 'asc' }
  })

  // 2. Ambil data untuk dropdown di form
  const departments = await prisma.department.findMany({ orderBy: { name: 'asc' } })
  const positions = await prisma.position.findMany({ orderBy: { level: 'asc' } })

  return (
    <MemberClient 
      members={members} 
      departments={departments} 
      positions={positions} 
    />
  )
}