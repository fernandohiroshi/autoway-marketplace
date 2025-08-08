"use client";
import { CarCard } from "@/components/cars/car-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

interface LatestCarsSectionProps {
  cars: Array<{
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
  }>;
}

export function LatestCarsSection({ cars }: LatestCarsSectionProps) {
  return (
    <section className="min-h-screen flex items-center py-0 px-0 bg-background">
      <div className="max-w-7xl mx-auto w-full px-4 flex flex-col justify-center h-full">
        <div className="text-left mb-12 space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-md bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
            <Zap className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Recém Chegados
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white">
            Últimos Carros Adicionados
          </h2>

          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Confira os carros mais recentes em nossa plataforma e seja o
            primeiro a encontrar sua próxima oportunidade
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {cars.length > 0 ? (
            cars.map((car, index) => (
              <div
                key={car.id}
                className="group"
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
              >
                <div className="rounded-xl border bg-card p-6 shadow hover:shadow-lg neon-glow-hover transition-shadow duration-200 hover:scale-[1.02] hover:-translate-y-1">
                  <CarCard car={car} />
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <div className="space-y-6">
                <div className="w-24 h-24 mx-auto bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-800">
                  <Zap className="h-12 w-12 text-gray-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Nenhum carro encontrado
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Seja o primeiro a anunciar e destaque seu veículo!
                  </p>
                </div>
                <Button
                  asChild
                  className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 border-0"
                >
                  <Link href="/dashboard">
                    Anuncie Agora
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>

        {cars.length > 0 && (
          <div className="text-start space-y-8">
            <Button
              asChild
              size="lg"
              className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 border-0 px-8 py-3 h-auto font-medium"
            >
              <Link href="/cars" className="flex items-center">
                Ver Todos os Carros
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-gray-200 dark:border-gray-800">
              <div>
                <div className="text-2xl font-bold text-neutral-900 dark:text-white transition-colors mb-1">
                  {cars.length}+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Novos esta semana
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-neutral-900 dark:text-white transition-colors mb-1">
                  24h
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Atualizações diárias
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-neutral-900 dark:text-white transition-colors mb-1">
                  100%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Verificados
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
