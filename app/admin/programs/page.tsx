import { prisma } from "@/lib/prisma"
import ProgramClient from "./ProgramClient"

export default async function ProgramsPage() {
  const programs = await prisma.workProgram.findMany({
    include: { department: true },
    orderBy: { execution_date: 'asc' }
  })

  const departments = await prisma.department.findMany({ orderBy: { name: 'asc' } })

  return <ProgramClient programs={programs} departments={departments} />
}