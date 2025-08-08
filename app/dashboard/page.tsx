import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import ProfileFormClientWrapper from "@/components/dashboard/profile-form-client-wrapper"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/")
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto w-full px-4 py-10">
        <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-8 text-left">Meu Perfil</h1>
        <ProfileFormClientWrapper />
      </div>
    </DashboardLayout>
  )
}
