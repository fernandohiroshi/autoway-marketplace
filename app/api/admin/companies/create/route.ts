import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"
import { z } from "zod"

const createCompanySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().optional(),
  bio: z.string().optional(),
  address: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  isVIP: z.boolean().default(false),
})

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const body = await request.json()
    const { name, email, password, phone, bio, address, website, isVIP } = createCompanySchema.parse(body)

    
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ error: "Email já está em uso" }, { status: 400 })
    }

    
    const baseSlug = generateSlug(name)
    let slug = baseSlug
    let counter = 1

    while (await prisma.user.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`
      counter++
    }

    
    const hashedPassword = await bcrypt.hash(password, 12)

    
    const company = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        role: "COMPANY",
        slug,
        isVIP,
        profile: {
          create: {
            bio,
            address,
            website: website || null,
          },
        },
      },
      include: {
        profile: true,
      },
    })

    return NextResponse.json({
      message: "Empresa criada com sucesso",
      company: {
        id: company.id,
        name: company.name,
        email: company.email,
        slug: company.slug,
        isVIP: company.isVIP,
      },
    })
  } catch (error) {
    console.error("Error creating company:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
