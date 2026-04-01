'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

// ==========================================
// 1. DEPARTEMEN
// ==========================================
export async function addDepartment(fd: FormData) {
  await prisma.department.create({ 
    data: { name: fd.get("name") as string, slug: fd.get("slug") as string } 
  })
  revalidatePath('/admin/departments')
  revalidatePath('/')
}

export async function updateDepartment(fd: FormData) {
  await prisma.department.update({ 
    where: { id: fd.get("id") as string }, 
    data: { name: fd.get("name") as string, slug: fd.get("slug") as string } 
  })
  revalidatePath('/admin/departments')
  revalidatePath('/')
}

export async function deleteDepartment(id: string) {
  await prisma.department.delete({ where: { id } })
  revalidatePath('/admin/departments')
  revalidatePath('/')
}

// ==========================================
// 2. JABATAN (POSITION)
// ==========================================
export async function addPosition(fd: FormData) {
  await prisma.position.create({ 
    data: { name: fd.get("name") as string, level: Number(fd.get("level")) } 
  })
  revalidatePath('/admin/positions')
}

export async function updatePosition(fd: FormData) {
  await prisma.position.update({ 
    where: { id: fd.get("id") as string }, 
    data: { name: fd.get("name") as string, level: Number(fd.get("level")) } 
  })
  revalidatePath('/admin/positions')
}

export async function deletePosition(id: string) {
  await prisma.position.delete({ where: { id } })
  revalidatePath('/admin/positions')
}


// ==========================================
// 3. ANGGOTA (MEMBER)
// ==========================================
export async function addMember(fd: FormData) {
  await prisma.member.create({
    data: {
      name: fd.get("name") as string,
      prodi: fd.get("prodi") as string,
      batch: Number(fd.get("batch")),
      birth_date: new Date(fd.get("birth_date") as string),
      image_url: fd.get("image_url") as string, // <--- UBAH DI SINI
      department_id: fd.get("department_id") as string,
      position_id: fd.get("position_id") as string,
    }
  })
  revalidatePath('/admin/members')
  revalidatePath('/')
}

export async function updateMember(fd: FormData) {
  await prisma.member.update({
    where: { id: fd.get("id") as string },
    data: {
      name: fd.get("name") as string,
      prodi: fd.get("prodi") as string,
      batch: Number(fd.get("batch")),
      birth_date: new Date(fd.get("birth_date") as string),
      image_url: fd.get("image_url") as string, // <--- UBAH DI SINI
      department_id: fd.get("department_id") as string,
      position_id: fd.get("position_id") as string,
    }
  })
  revalidatePath('/admin/members')
  revalidatePath('/')
}

export async function deleteMember(id: string) {
  await prisma.member.delete({ where: { id } })
  revalidatePath('/admin/members')
  revalidatePath('/')
}

// ==========================================
// 4. PROGRAM KERJA (WORK PROGRAM)
// ==========================================
export async function addWorkProgram(fd: FormData) {
  await prisma.workProgram.create({
    data: {
      title: fd.get("title") as string,
      description: fd.get("description") as string,
      execution_date: new Date(fd.get("execution_date") as string),
      status: fd.get("status") as string, // Tangkap status
      department_id: fd.get("department_id") as string,
    }
  })
  revalidatePath('/admin/programs')
}

export async function updateWorkProgram(fd: FormData) {
  await prisma.workProgram.update({
    where: { id: fd.get("id") as string },
    data: {
      title: fd.get("title") as string,
      description: fd.get("description") as string,
      execution_date: new Date(fd.get("execution_date") as string),
      status: fd.get("status") as string, // Tangkap status
      department_id: fd.get("department_id") as string,
    }
  })
  revalidatePath('/admin/programs')
}

export async function deleteWorkProgram(id: string) {
  await prisma.workProgram.delete({ where: { id } })
  revalidatePath('/admin/programs')
}

// ==========================================
// 5. AGENDA
// ==========================================
export async function addAgenda(fd: FormData) {
  await prisma.agenda.create({
    data: {
      title: fd.get("title") as string,
      frequency: fd.get("frequency") as string,
      department_id: fd.get("department_id") as string,
    }
  })
  revalidatePath('/admin/agendas')
}

export async function updateAgenda(fd: FormData) {
  await prisma.agenda.update({
    where: { id: fd.get("id") as string },
    data: {
      title: fd.get("title") as string,
      frequency: fd.get("frequency") as string,
      department_id: fd.get("department_id") as string,
    }
  })
  revalidatePath('/admin/agendas')
}

export async function deleteAgenda(id: string) {
  await prisma.agenda.delete({ where: { id } })
  revalidatePath('/admin/agendas')
}