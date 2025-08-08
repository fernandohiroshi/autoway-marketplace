import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"
import { carSchema } from "@/lib/validations/car"

export async function GET(request: Request, { params }: any) {
  try {
    const car = await prisma.car.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            slug: true,
            phone: true,
            isVIP: true,
            profile: {
              select: {
                bio: true,
                avatar: true,
                website: true,
              },
            },
          },
        },
      },
    })

    if (!car) {
      return NextResponse.json({ error: "Carro não encontrado" }, { status: 404 })
    }

    return NextResponse.json(car)
  } catch (error) {
    console.error("Error fetching car:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: any) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const car = await prisma.car.findUnique({
      where: { id: params.id },
    })

    if (!car) {
      return NextResponse.json({ error: "Carro não encontrado" }, { status: 404 })
    }

    if (car.userId !== session.user.id && session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Não autorizado" }, { status: 403 })
    }

    const body = await request.json()
    const data = carSchema.parse(body)

    const updatedCar = await prisma.car.update({
      where: { id: params.id },
      data,
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

    return NextResponse.json(updatedCar)
  } catch (error) {
    console.error("Error updating car:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: any) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const car = await prisma.car.findUnique({
      where: { id: params.id },
    })

    if (!car) {
      return NextResponse.json({ error: "Carro não encontrado" }, { status: 404 })
    }

    if (car.userId !== session.user.id && session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Não autorizado" }, { status: 403 })
    }

    await prisma.car.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Carro excluído com sucesso" })
  } catch (error) {
    console.error("Error deleting car:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
