import { Suspense } from "react";
import { CarFilters } from "@/components/cars/car-filters";
import { SearchInput } from "@/components/cars/search-input";
import { CarCard } from "@/components/cars/car-card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SearchParams {
  page?: string;
  limit?: string;
  search?: string;
  brand?: string;
  fuelType?: string;
  transmission?: string;
  condition?: string;
  minPrice?: string;
  maxPrice?: string;
  minYear?: string;
  maxYear?: string;
}

function urlSearchParamsToObject(searchParams: URLSearchParams): SearchParams {
  const obj: SearchParams = {};
  for (const [key, value] of searchParams.entries()) {
    obj[key as keyof SearchParams] = value;
  }
  return obj;
}

async function getCars(searchParams: SearchParams) {
  const page = Number.parseInt(searchParams.page || "1");
  const limit = Number.parseInt(searchParams.limit || "12");
  const skip = (page - 1) * limit;

  const where: any = {};

  if (searchParams.search) {
    where.OR = [
      { brand: { contains: searchParams.search, mode: "insensitive" } },
      { model: { contains: searchParams.search, mode: "insensitive" } },
      { description: { contains: searchParams.search, mode: "insensitive" } },
    ];
  }

  if (searchParams.brand)
    where.brand = { contains: searchParams.brand, mode: "insensitive" };
  if (searchParams.fuelType) where.fuelType = searchParams.fuelType;
  if (searchParams.transmission) where.transmission = searchParams.transmission;
  if (searchParams.condition) where.condition = searchParams.condition;

  if (searchParams.minPrice || searchParams.maxPrice) {
    where.price = {};
    if (searchParams.minPrice)
      where.price.gte = Number.parseFloat(searchParams.minPrice);
    if (searchParams.maxPrice)
      where.price.lte = Number.parseFloat(searchParams.maxPrice);
  }

  if (searchParams.minYear || searchParams.maxYear) {
    where.year = {};
    if (searchParams.minYear)
      where.year.gte = Number.parseInt(searchParams.minYear);
    if (searchParams.maxYear)
      where.year.lte = Number.parseInt(searchParams.maxYear);
  }

  try {
    const [cars, total] = await Promise.all([
      prisma.car.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              slug: true,
              isVIP: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.car.count({ where }),
    ]);

    return {
      cars: cars.map((car) => ({
        ...car,
        price:
          typeof car.price === "object" &&
          typeof car.price.toNumber === "function"
            ? car.price.toNumber()
            : Number(car.price),
        mileage: car.mileage === null ? undefined : car.mileage,
        user: {
          ...car.user,
          name: car.user?.name ?? "",
        },
      })),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    console.error("Error fetching cars:", error);
    return {
      cars: [],
      pagination: { page: 1, limit: 12, total: 0, pages: 0 },
    };
  }
}

function CarsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-6 w-1/3" />
        </div>
      ))}
    </div>
  );
}

function Pagination({
  pagination,
  searchParams,
}: {
  pagination: any;
  searchParams: SearchParams;
}) {
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams as any);
    params.set("page", page.toString());
    return `/cars?${params.toString()}`;
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      {pagination.page > 1 && (
        <Button variant="outline" asChild>
          <Link href={createPageUrl(pagination.page - 1)}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Anterior
          </Link>
        </Button>
      )}

      <span className="text-sm text-gray-600">
        Página {pagination.page} de {pagination.pages} ({pagination.total}{" "}
        carros)
      </span>

      {pagination.page < pagination.pages && (
        <Button variant="outline" asChild>
          <Link href={createPageUrl(pagination.page + 1)}>
            Próxima
            <ChevronRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
    </div>
  );
}

export const revalidate = 300;

export default async function CarsPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const resolvedParams =
    typeof searchParams?.then === "function"
      ? await searchParams
      : searchParams;

  let paramsObj: SearchParams;
  if (typeof resolvedParams?.entries === "function") {
    paramsObj = urlSearchParamsToObject(resolvedParams);
  } else if (typeof resolvedParams === "object" && resolvedParams !== null) {
    paramsObj = resolvedParams as SearchParams;
  } else {
    paramsObj = {};
  }

  const { cars, pagination } = await getCars(paramsObj);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-100 dark:bg-black">
        <div className="max-w-7xl mx-auto w-full px-4 py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-white text-left">
              Carros à venda
            </h1>
            <p className="text-gray-600">Encontre o carro perfeito para você</p>
          </div>

          <SearchInput />
          <CarFilters />

          <Suspense fallback={<CarsSkeleton />}>
            {cars.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {cars.map((car) => (
                    <CarCard key={car.id} car={car} />
                  ))}
                </div>
                <Pagination pagination={pagination} searchParams={paramsObj} />
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">
                  Nenhum carro encontrado com os filtros aplicados.
                </p>
                <Button asChild>
                  <Link href="/cars">Ver todos os carros</Link>
                </Button>
              </div>
            )}
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
