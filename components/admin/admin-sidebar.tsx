"use client"

import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Users, Plus, Crown, User } from "lucide-react"

export function AdminSidebar() {
  const { data: session } = useSession()
  const pathname = usePathname()

  const menuItems = [
    {
      href: "/admin",
      label: "Estatísticas",
      icon: BarChart3,
    },
    {
      href: "/admin/companies",
      label: "Empresas",
      icon: Users,
    },
    {
      href: "/admin/companies/create",
      label: "Criar Empresa",
      icon: Plus,
    },
  ]

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin"
    }
    return pathname.startsWith(href)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="h-5 w-5" />
          Administração
          <Badge className="bg-red-500">Admin</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                isActive(item.href) ? "bg-red-100 text-red-700" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {item.icon && <item.icon className="h-4 w-4" />}
              <span className="truncate max-w-[120px] inline-block align-middle">{item.label}</span>
            </Link>
          ))}
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-semibold bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors mt-4"
          >
            <User className="h-4 w-4" />
            Ir para Dashboard
          </Link>
        </nav>
      </CardContent>
    </Card>
  )
}
