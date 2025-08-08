import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"

export async function PATCH(request: Request, { params }: any) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const { isVIP } = await request.json()

    const company = await prisma.user.update({
      where: { id: params.id },
      data: { isVIP },
    })

    return NextResponse.json(company)
  } catch (error) {
    console.error("Error updating VIP status:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
