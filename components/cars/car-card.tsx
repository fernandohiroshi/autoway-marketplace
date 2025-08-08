import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, Fuel, Settings } from "lucide-react";

interface CarCardProps {
  car: {
    id: string;
    slug: string;
    brand: string;
    model: string;
    year: number;
    price: number;
    transmission: string;
    fuelType: string;
    condition: string;
    mileage?: number;
    images: string[];
    user: {
      name: string;
      slug: string;
      isVIP: boolean;
    };
  };
}

const fuelTypeLabels = {
  GASOLINE: "Gasolina",
  DIESEL: "Diesel",
  HYBRID: "Híbrido",
  ELECTRIC: "Elétrico",
  FLEX: "Flex",
};

const transmissionLabels = {
  AUTOMATIC: "Automático",
  MANUAL: "Manual",
};

const conditionLabels = {
  NEW: "Novo",
  USED: "Usado",
  SEMI_NEW: "Semi-novo",
};

export function CarCard({ car }: CarCardProps) {
  const formatPrice = (price: number) => {
    return `R$ ${new Intl.NumberFormat("pt-BR", {
      maximumFractionDigits: 0,
    }).format(price)}`;
  };

  const formatMileage = (mileage?: number) => {
    if (!mileage) return null;
    return new Intl.NumberFormat("pt-BR").format(mileage) + " km";
  };

  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-500 ease-in-out group">
      <Link href={`/detail/${car.id}`}>
        <div className="relative">
          <Image
            src={car.images[0] || "/placeholder.svg?height=200&width=300"}
            alt={`${car.brand} ${car.model}`}
            width={300}
            height={200}
            className="w-full h-48 object-cover transition-shadow duration-300 ease-in-out"
          />

          
          {car.user.isVIP && (
            <Badge className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 animate-pulse dark:bg-yellow-300 dark:text-yellow-900 border-yellow-300 shadow-md">
              VIP
            </Badge>
          )}

          
          <Badge
            className={`absolute top-2 left-2 ${
              car.condition === "NEW"
                ? "bg-emerald-500 text-white dark:bg-emerald-400/90 dark:text-black"
                : "badge-theme-light dark:badge-theme-dark"
            }`}
            variant="secondary"
          >
            {conditionLabels[car.condition as keyof typeof conditionLabels]}
          </Badge>
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/detail/${car.id}`}>
          <h3 className="font-semibold text-lg mb-2 truncate">
            <span className="text-blue-600 dark:text-blue-400 font-bold">
              {car.brand}
            </span>{" "}
            <span className="text-gray-900 dark:text-neutral-100">{car.model}</span>
          </h3>
        </Link>

        <div className="flex items-center gap-4 text-sm text-neutral-700 dark:text-neutral-300 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {car.year}
          </div>
          <div className="flex items-center gap-1">
            <Fuel className="h-4 w-4" />
            {fuelTypeLabels[car.fuelType as keyof typeof fuelTypeLabels]}
          </div>
          <div className="flex items-center gap-1">
            <Settings className="h-4 w-4" />
            {
              transmissionLabels[
                car.transmission as keyof typeof transmissionLabels
              ]
            }
          </div>
        </div>

        {car.mileage && (
          <div className="flex items-center gap-1 text-sm text-neutral-700 dark:text-neutral-300 mb-3">
            <MapPin className="h-4 w-4" />
            {formatMileage(car.mileage)}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-black dark:text-white transition-colors">
            {formatPrice(car.price)}
          </div>
          <Link
            href={`/user/${car.user.slug}`}
            className="text-sm text-neutral-500 dark:text-neutral-300 hover:text-blue-400 transition-colors"
          >
            {car.user.name}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
