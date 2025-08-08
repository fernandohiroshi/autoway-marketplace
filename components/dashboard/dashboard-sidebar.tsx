"use client"

import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Car, Plus, BarChart3, Users, Crown } from "lucide-react"

export function DashboardSidebar() {
  const { data: session } = useSession()
  const pathname = usePathname()

  const userMenuItems = [
    {
      href: "/dashboard",
      label: "Perfil",
      icon: User,
    },
    {
      href: "/dashboard/cars",
      label: "Meus Carros",
      icon: Car,
    },
    {
      href: "/dashboard/cars/add",
      label: "Adicionar Carro",
      icon: Plus,
    },
  ]

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard"
    }
    return pathname.startsWith(href)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Meu Painel
          <Badge className="bg-blue-500">User</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <nav className="space-y-1">
          {userMenuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                isActive(item.href) ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {item.icon && <item.icon className="h-4 w-4" />}
              <span className="truncate max-w-[120px] inline-block align-middle">{item.label}</span>
            </Link>
          ))}
          {session?.user?.slug && (
            <Link
              href={`/user/${session.user.slug}`}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition-colors mt-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Car className="h-4 w-4" />
              Ver Minha Página
            </Link>
          )}
          {session?.user?.role === "ADMIN" && (
            <Link
              href="/admin"
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-semibold bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300 dark:hover:bg-yellow-800 transition-colors mt-4"
            >
              <Crown className="h-4 w-4" />
              Ir para Admin
            </Link>
          )}
        </nav>
      </CardContent>
    </Card>
  )
}
