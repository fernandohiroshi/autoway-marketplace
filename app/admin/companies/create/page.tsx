import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { AdminLayout } from "@/components/admin/admin-layout"
import { CreateCompanyForm } from "@/components/admin/create-company-form"

export default async function CreateCompanyPage() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "ADMIN") {
    redirect("/")
  }

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold mb-6">Criar Nova Empresa</h1>
        <CreateCompanyForm />
      </div>
    </AdminLayout>
  )
}
