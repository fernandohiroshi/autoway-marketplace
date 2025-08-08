import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import React, { Suspense } from "react";
const CarImageCarousel = React.lazy(() => import("@/components/cars/car-image-carousel").then(mod => ({ default: mod.CarImageCarousel })));
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
const CarDetails = React.lazy(() => import("@/components/cars/car-details").then(mod => ({ default: mod.CarDetails })));
const SellerInfo = React.lazy(() => import("@/components/cars/seller-info").then(mod => ({ default: mod.SellerInfo })));

import { generateSEO } from "@/lib/seo";
import { APP_CONFIG } from "@/lib/constants";

const conditionLabels = {
  NEW: "Novo",
  USED: "Usado",
  SEMI_NEW: "Semi-novo",
};

async function getCar(id: string) {
  try {
    const car = await prisma.car.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            slug: true,
            phone: true,
            isVIP: true,
            profile: {
              select: {
                bio: true,
                avatar: true,
                website: true,
              },
            },
          },
        },
      },
    });

    if (!car) return null;
    return {
      ...car,
      description: car.description === null ? undefined : car.description,
      price:
        typeof car.price === "object" &&
        typeof car.price.toNumber === "function"
          ? car.price.toNumber()
          : Number(car.price),
      mileage: car.mileage === null ? undefined : car.mileage,
      user: car.user
        ? {
            ...car.user,
            name: car.user?.name ?? "",
            phone: car.user?.phone === null ? undefined : car.user?.phone,
            profile: car.user?.profile
              ? {
                  ...car.user.profile,
                  bio:
                    car.user.profile.bio === null
                      ? undefined
                      : car.user.profile.bio,
                  avatar:
                    car.user.profile.avatar === null
                      ? undefined
                      : car.user.profile.avatar,
                  website:
                    car.user.profile.website === null
                      ? undefined
                      : car.user.profile.website,
                }
              : undefined,
          }
        : {
            id: "",
            name: "",
            slug: "",
            isVIP: false,
            phone: undefined,
            profile: undefined,
          },
    };
  } catch (error) {
    console.error("Error fetching car:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Record<string, string> | URLSearchParams | any;
}) {
  const resolvedParams =
    typeof params.then === "function" ? await params : params;
  const id =
    typeof resolvedParams.get === "function"
      ? resolvedParams.get("id")
      : resolvedParams.id;
  const car = await getCar(id);

  if (!car) {
    return generateSEO({
      title: "Carro não encontrado",
      description: "O carro que você está procurando não foi encontrado.",
    });
  }

  const title = `${car.brand} ${car.model} ${car.year}`;
  const description = `${title} por R$ ${new Intl.NumberFormat("pt-BR").format(
    Number(car.price)
  )}. ${
    car.description || "Veja mais detalhes e entre em contato com o vendedor."
  }`;
  const image = car.images[0] || `${APP_CONFIG.url}/og-image.png`;

  return generateSEO({
    title,
    description,
    image,
    url: `${APP_CONFIG.url}/detail/${car.id}`,
  });
}

export const revalidate = 300;

export default async function CarDetailPage({
  params,
}: {
  params: Record<string, string> | URLSearchParams | any;
}) {
  const resolvedParams =
    typeof params.then === "function" ? await params : params;
  const id =
    typeof resolvedParams.get === "function"
      ? resolvedParams.get("id")
      : resolvedParams.id;
  const car = await getCar(id);

  if (!car) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-100 dark:bg-black">
        <div className="max-w-7xl mx-auto w-full px-4 py-10 flex flex-col gap-8">
          {/* TÍTULO HERO */}
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl md:text-4xl font-bold text-left">
              {car.brand} {car.model}
            </h1>
            <span className="inline-block">
              <Badge className="badge-theme-light dark:badge-theme-dark neon-glow-hover transition-colors">
                {conditionLabels[car.condition as keyof typeof conditionLabels]}
              </Badge>
            </span>
          </div>
          {/* CAROUSEL HERO */}
          <div className="w-full">
            <Suspense fallback={<Skeleton className="aspect-[16/7] w-full h-72 mb-6" />}>
              <CarImageCarousel
                images={car.images}
                alt={`${car.brand} ${car.model}`}
              />
            </Suspense>
          </div>
          {/* INFOS E VENDEDOR */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Suspense fallback={<Skeleton className="h-64 w-full mb-6" />}>
                <CarDetails car={car} />
              </Suspense>
            </div>
            <div>
              <Suspense fallback={<Skeleton className="h-48 w-full mb-6" />}>
                <SellerInfo seller={car.user} />
              </Suspense>
              <div className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Preço</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold text-foreground transition-colors">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(car.price)}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </>
  );
}
