import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Globe, User, Crown } from "lucide-react";

interface SellerInfoProps {
  seller: {
    id: string;
    name: string;
    slug: string;
    phone?: string;
    isVIP: boolean;
    profile?: {
      bio?: string;
      avatar?: string;
      website?: string;
    };
  };
}

export function SellerInfo({ seller }: SellerInfoProps) {
  const formatPhone = (phone?: string) => {
    if (!phone) return null;

    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length === 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(
        7
      )}`;
    }
    return phone;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Vendedor
          {seller.isVIP && (
            <Badge className="bg-yellow-500 text-black dark:bg-yellow-400 dark:text-gray-900">
              <Crown className="h-3 w-3 mr-1" />
              VIP
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12">
            <Image
              src={
                seller.profile?.avatar || "/placeholder.svg?height=48&width=48"
              }
              alt={seller.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold">{seller.name}</h3>
            <Link
              href={`/user/${seller.slug}`}
              className="text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              Ver perfil completo
            </Link>
          </div>
        </div>

        {seller.profile?.bio && (
          <div>
            <h4 className="font-medium mb-2">Sobre</h4>
            <p className="text-sm text-gray-600 dark:text-gray-200">{seller.profile.bio}</p>
          </div>
        )}

        <div className="space-y-2">
          {seller.phone && (
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-gray-500 dark:text-gray-200" />
              <span>{formatPhone(seller.phone)}</span>
            </div>
          )}
          {seller.profile?.website && (
            <div className="flex items-center gap-2 text-sm">
              <Globe className="h-4 w-4 text-gray-500 dark:text-gray-200" />
              <a
                href={seller.profile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                Website
              </a>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Button variant="outline" className="w-full bg-transparent" asChild>
            <a
              href={`https://wa.me/55${seller.phone?.replace(
                /\D/g,
                ""
              )}?text=Olá! Vi seu anúncio no AutoWay e tenho interesse no veículo.`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              WhatsApp
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
