import { getServerSession } from "next-auth"
import { redirect, notFound } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { CarForm } from "@/components/dashboard/car-form"

async function getCar(id: string, userId: string) {
  try {
    const car = await prisma.car.findFirst({
      where: {
        id,
        userId,
      },
    })
    return car
  } catch (error) {
    return null
  }
}

export default async function EditCarPage({ params }: any) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/")
  }

  const car = await getCar(params.id, session.user.id)

  if (!car) {
    notFound()
  }

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold mb-6">Editar Carro</h1>
        <CarForm
          carId={car.id}
          initialData={{
            brand: car.brand,
            model: car.model,
            year: car.year,
            price: Number(car.price),
            transmission: car.transmission as any,
            fuelType: car.fuelType as any,
            condition: car.condition as any,
            mileage: car.mileage || undefined,
            description: car.description || undefined,
            features: car.features,
            images: car.images,
          }}
        />
      </div>
    </DashboardLayout>
  )
}
