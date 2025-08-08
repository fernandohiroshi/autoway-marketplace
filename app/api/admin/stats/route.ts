import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    
    const [totalUsers, totalCars, totalCompanies, vipCompanies] = await Promise.all([
      prisma.user.count(),
      prisma.car.count(),
      prisma.user.count({ where: { role: "COMPANY" } }),
      prisma.user.count({ where: { role: "COMPANY", isVIP: true } }),
    ])

    
    const carsByBrand = await prisma.car.groupBy({
      by: ["brand"],
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: "desc",
        },
      },
      take: 10,
    })

    
    const carsByFuel = await prisma.car.groupBy({
      by: ["fuelType"],
      _count: {
        id: true,
      },
    })

    
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const monthlyUsers = await prisma.user.groupBy({
      by: ["createdAt"],
      where: {
        createdAt: {
          gte: sixMonthsAgo,
        },
      },
      _count: {
        id: true,
      },
    })

    const monthlyCars = await prisma.car.groupBy({
      by: ["createdAt"],
      where: {
        createdAt: {
          gte: sixMonthsAgo,
        },
      },
      _count: {
        id: true,
      },
    })

    
    const monthlyData = new Map()
    const months = []

    for (let i = 5; i >= 0; i--) {
      const date = new Date()
      date.setMonth(date.getMonth() - i)
      const monthKey = date.toISOString().slice(0, 7) // YYYY-MM
      const monthName = date.toLocaleDateString("pt-BR", { month: "short", year: "numeric" })
      months.push(monthName)
      monthlyData.set(monthKey, { month: monthName, users: 0, cars: 0 })
    }

    
    monthlyUsers.forEach((item) => {
      const monthKey = item.createdAt.toISOString().slice(0, 7)
      if (monthlyData.has(monthKey)) {
        monthlyData.get(monthKey).users += item._count.id
      }
    })

    
    monthlyCars.forEach((item) => {
      const monthKey = item.createdAt.toISOString().slice(0, 7)
      if (monthlyData.has(monthKey)) {
        monthlyData.get(monthKey).cars += item._count.id
      }
    })

    const userGrowth = Array.from(monthlyData.values())

    // Contar total de fotos no sistema (soma dos arrays de images dos carros)
    const allCars = await prisma.car.findMany({ select: { images: true, createdAt: true } })
    const totalPhotos = allCars.reduce((acc, car) => acc + (car.images?.length || 0), 0)

    // Evolução de fotos por mês (últimos 6 meses)
    const photoGrowthMap = new Map<string, { month: string; photos: number }>()
    for (let i = 5; i >= 0; i--) {
      const date = new Date()
      date.setMonth(date.getMonth() - i)
      const monthKey = date.toISOString().slice(0, 7)
      const monthName = date.toLocaleDateString("pt-BR", { month: "short", year: "numeric" })
      photoGrowthMap.set(monthKey, { month: monthName, photos: 0 })
    }
    allCars.forEach(car => {
      const monthKey = car.createdAt.toISOString().slice(0, 7)
      if (photoGrowthMap.has(monthKey)) {
        photoGrowthMap.get(monthKey)!.photos += car.images?.length || 0
      }
    })
    const photosGrowth = Array.from(photoGrowthMap.values())

    const stats = {
      totalUsers,
      totalCars,
      totalCompanies,
      vipCompanies,
      carsByBrand: carsByBrand.map((item) => ({
        brand: item.brand,
        count: item._count.id,
      })),
      carsByFuel: carsByFuel.map((item) => ({
        fuelType: item.fuelType,
        count: item._count.id,
      })),
      userGrowth,
      totalPhotos,
      photosGrowth,
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching admin stats:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
