import { prisma } from "@/lib/prisma"
import DepartmentClient from "./DepartmentClient"

export default async function DepartmentsPage() {
  // Ambil data departemen, urutkan berdasarkan nama (A-Z)
  const departments = await prisma.department.findMany({
    orderBy: { name: 'asc' }
  })

  return <DepartmentClient departments={departments} />
}