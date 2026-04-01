import { prisma } from "@/lib/prisma"
import PositionClient from "./PositionClient"

export default async function PositionsPage() {
  // Ambil data jabatan, urutkan berdasarkan level (1 paling atas)
  const positions = await prisma.position.findMany({
    orderBy: { level: 'asc' }
  })

  return <PositionClient positions={positions} />
}