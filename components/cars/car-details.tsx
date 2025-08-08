"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Fuel, Settings, MapPin, Star } from "lucide-react";
import { useState } from "react";

interface CarDetailsProps {
  car: {
    id: string;
    brand: string;
    model: string;
    year: number;
    price: number;
    transmission: string;
    fuelType: string;
    condition: string;
    mileage?: number;
    description?: string;
    features: string[];
    createdAt: Date;
    images: string[];
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

export function CarDetails({ car }: CarDetailsProps) {
  const formatPrice = (price: number) => {
    return `R$ ${new Intl.NumberFormat("pt-BR", {
      maximumFractionDigits: 0,
    }).format(price)}`;
  };

  const formatMileage = (mileage?: number) => {
    if (!mileage) return "Não informado";
    return new Intl.NumberFormat("pt-BR").format(mileage) + " km";
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR").format(new Date(date));
  };

  const [zoomOpen, setZoomOpen] = useState(false);
  const [zoomIndex, setZoomIndex] = useState(0);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informações Básicas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-200" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-200">Ano</p>
                <p className="font-semibold">{car.year}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Fuel className="h-5 w-5 text-gray-500 dark:text-gray-200" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-200">
                  Combustível
                </p>
                <p className="font-semibold">
                  {fuelTypeLabels[car.fuelType as keyof typeof fuelTypeLabels]}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-gray-500 dark:text-gray-200" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-200">
                  Transmissão
                </p>
                <p className="font-semibold">
                  {
                    transmissionLabels[
                      car.transmission as keyof typeof transmissionLabels
                    ]
                  }
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-gray-500 dark:text-gray-200" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-200">
                  Quilometragem
                </p>
                <p className="font-semibold">{formatMileage(car.mileage)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {car.description && (
        <Card>
          <CardHeader>
            <CardTitle>Descrição</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 whitespace-pre-wrap dark:text-gray-200">
              {car.description}
            </p>
          </CardContent>
        </Card>
      )}

      {car.features.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Características</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {car.features.map((feature, index) => (
                <Badge
                  key={index}
                  className="flex items-center gap-1 badge-theme-light dark:badge-theme-dark neon-glow-hover transition-colors"
                >
                  <Star className="h-3 w-3" />
                  {feature}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Informações Adicionais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600 dark:text-gray-200">
            <p>Anúncio publicado em: {formatDate(car.createdAt)}</p>
            <p>ID do anúncio: {car.id}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
