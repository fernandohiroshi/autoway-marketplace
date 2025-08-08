import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import UserCarsListClientWrapper from "@/components/dashboard/user-cars-list-client-wrapper";

export default async function DashboardCarsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/")
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto w-full px-4 py-10">
        <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-8 text-left">Meus Carros</h1>
        <UserCarsListClientWrapper />
      </div>
    </DashboardLayout>
  )
}
