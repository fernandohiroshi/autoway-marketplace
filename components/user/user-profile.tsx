import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Phone, Globe, MapPin, Crown, Calendar } from "lucide-react"

interface UserProfileProps {
  user: {
    id: string
    name: string
    phone?: string
    isVIP: boolean
    createdAt: Date
    profile?: {
      bio?: string
      avatar?: string
      website?: string
      address?: string
    }
  }
}

export function UserProfile({ user }: UserProfileProps) {
  const formatPhone = (phone?: string) => {
    if (!phone) return null
    const cleaned = phone.replace(/\D/g, "")
    if (cleaned.length === 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`
    }
    return phone
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric" }).format(new Date(date))
  }

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Perfil
          {user.isVIP && (
            <Badge className="badge-theme-light dark:badge-theme-dark neon-glow-hover animate-glow transition-colors">
              <Crown className="h-3 w-3 mr-1" />
              VIP
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <Image
              src={user.profile?.avatar || "/placeholder.svg?height=96&width=96"}
              alt={user.name || ""}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <h2 className="text-xl font-semibold">{user.name}</h2>
        </div>

        {user.profile?.bio && (
          <div>
            <h3 className="font-medium mb-2">Sobre</h3>
            <p className="text-sm text-gray-600">{user.profile.bio}</p>
          </div>
        )}

        <div className="space-y-2">
          {user.profile?.address && (
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span>{user.profile.address}</span>
            </div>
          )}
          {user.phone && (
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-gray-500" />
              <span>{formatPhone(user.phone)}</span>
            </div>
          )}
          {user.profile?.website && (
            <div className="flex items-center gap-2 text-sm">
              <Globe className="h-4 w-4 text-gray-500" />
              <a
                href={user.profile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline neon-glow-hover transition-colors"
              >
                Website
              </a>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-200" />
            <span>Membro desde {formatDate(user.createdAt)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
