import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"
import { carSchema } from "@/lib/validations/car"

function generateSlug(brand: string, model: string, year: number): string {
  return `${brand}-${model}-${year}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "12")
    const search = searchParams.get("search") || ""
    const brand = searchParams.get("brand") || ""
    const fuelType = searchParams.get("fuelType") || ""
    const transmission = searchParams.get("transmission") || ""
    const condition = searchParams.get("condition") || ""
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const minYear = searchParams.get("minYear")
    const maxYear = searchParams.get("maxYear")

    const skip = (page - 1) * limit

    const where: any = {}

    if (search) {
      where.OR = [
        { brand: { contains: search, mode: "insensitive" } },
        { model: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ]
    }

    if (brand) where.brand = { contains: brand, mode: "insensitive" }
    if (fuelType) where.fuelType = fuelType
    if (transmission) where.transmission = transmission
    if (condition) where.condition = condition

    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) where.price.gte = Number.parseFloat(minPrice)
      if (maxPrice) where.price.lte = Number.parseFloat(maxPrice)
    }

    if (minYear || maxYear) {
      where.year = {}
      if (minYear) where.year.gte = Number.parseInt(minYear)
      if (maxYear) where.year.lte = Number.parseInt(maxYear)
    }

    const [cars, total] = await Promise.all([
      prisma.car.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              slug: true,
              isVIP: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.car.count({ where }),
    ])

    return NextResponse.json({
      cars,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching cars:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const body = await request.json()
    const data = carSchema.parse(body)

    
    const baseSlug = generateSlug(data.brand, data.model, data.year)
    let slug = baseSlug
    let counter = 1

    while (await prisma.car.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`
      counter++
    }

    const car = await prisma.car.create({
      data: {
        ...data,
        slug,
        userId: session.user.id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            slug: true,
            isVIP: true,
          },
        },
      },
    })

    return NextResponse.json(car)
  } catch (error) {
    console.error("Error creating car:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
