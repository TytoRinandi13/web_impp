import { prisma } from "@/lib/prisma"
import AgendaClient from "./AgendaClient"

export default async function AgendasPage() {
  // Ambil semua agenda beserta nama departemennya
  const agendas = await prisma.agenda.findMany({
    include: { department: true },
    orderBy: { title: 'asc' }
  })

  // Ambil daftar departemen untuk dropdown di form
  const departments = await prisma.department.findMany({
    orderBy: { name: 'asc' }
  })

  return <AgendaClient agendas={agendas} departments={departments} />
}