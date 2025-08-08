import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import React from "react";
const UserProfile = React.lazy(() => import("@/components/user/user-profile").then(mod => ({ default: mod.UserProfile })));
const UserCars = React.lazy(() => import("@/components/user/user-cars").then(mod => ({ default: mod.UserCars })));
import { Skeleton } from "@/components/ui/skeleton";

async function getUser(slug: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { slug },
      select: {
        id: true,
        name: true,
        phone: true,
        isVIP: true,
        createdAt: true,
        profile: {
          select: {
            bio: true,
            avatar: true,
            website: true,
            address: true,
          },
        },
        cars: {
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            slug: true,
            brand: true,
            model: true,
            year: true,
            price: true,
            transmission: true,
            fuelType: true,
            condition: true,
            mileage: true,
            images: true,
            user: {
              select: {
                id: true,
                slug: true,
                name: true,
                isVIP: true,
                phone: true,
                profile: {
                  select: {
                    bio: true,
                    avatar: true,
                    website: true,
                    address: true,
                  },
                },
              },
            },
          },
        },
      },
    })
    if (!user) return null
    
    return {
      ...user,
      name: user.name ?? '',
      phone: user.phone === null ? undefined : user.phone,
      profile: user.profile
        ? {
            ...user.profile,
            bio: user.profile.bio === null ? undefined : user.profile.bio,
            avatar: user.profile.avatar === null ? undefined : user.profile.avatar,
            website: user.profile.website === null ? undefined : user.profile.website,
            address: user.profile.address === null ? undefined : user.profile.address,
          }
        : undefined,
      cars: user.cars.map(car => ({
        ...car,
        mileage: car.mileage === null ? undefined : car.mileage,
        price: (typeof car.price === "object" && typeof car.price.toNumber === "function") ? car.price.toNumber() : Number(car.price),
        user: {
          ...car.user,
          name: car.user?.name ?? '',
          phone: car.user?.phone === null ? undefined : car.user?.phone,
          profile: car.user && car.user.profile
            ? {
                ...car.user.profile,
                bio: car.user.profile.bio === null ? undefined : car.user.profile.bio,
                avatar: car.user.profile.avatar === null ? undefined : car.user.profile.avatar,
                website: car.user.profile.website === null ? undefined : car.user.profile.website,
                address: car.user.profile.address === null ? undefined : car.user.profile.address,
              }
            : undefined,
        },
      })),
    }
  } catch (error) {
    return null
  }
}

export const revalidate = 300;

export default async function UserProfilePage({ params }: { params: { slug: string } | URLSearchParams | any }) {
  const resolvedParams = typeof params?.then === "function" ? await params : params;
  const slug = typeof resolvedParams.get === "function" ? resolvedParams.get("slug") : resolvedParams.slug;
  const user = await getUser(slug);

  if (!user) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-black">
      <Header />

      <main className="max-w-7xl mx-auto w-full px-4 py-10 min-h-[100vh] flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <React.Suspense fallback={<Skeleton className="h-64 w-full mb-6" />}>
              <UserProfile user={user} />
            </React.Suspense>
          </div>
          <div className="lg:col-span-2">
            <React.Suspense fallback={<Skeleton className="h-64 w-full mb-6" />}>
              <UserCars cars={user.cars} userName={user.name || ""} />
            </React.Suspense>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
