import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import React, { Suspense } from "react";
const CarForm = React.lazy(() => import("@/components/dashboard/car-form").then(mod => ({ default: mod.CarForm })));
import { Skeleton } from "@/components/ui/skeleton";

export default async function AddCarPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/")
  }

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold mb-6">Adicionar Carro</h1>
        <Suspense fallback={
          <div className="space-y-6">
            <Skeleton className="h-12 w-1/2" />
            <Skeleton className="h-96 w-full" />
            <Skeleton className="h-12 w-32" />
          </div>
        }>
          <CarForm />
        </Suspense>
      </div>
    </DashboardLayout>
  )
}
