import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { AdminLayout } from "@/components/admin/admin-layout"
import { CompanyList } from "@/components/admin/company-list"

export default async function AdminCompaniesPage() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "ADMIN") {
    redirect("/")
  }

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold mb-6">Gerenciar Empresas</h1>
        <CompanyList />
      </div>
    </AdminLayout>
  )
}
