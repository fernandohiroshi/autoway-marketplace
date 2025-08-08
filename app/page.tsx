import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BrandsSection } from "@/components/home/brands-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { HeroSection } from "@/components/home/hero-section";
import { LatestCarsSection } from "@/components/home/latest-cars-section";
import { HowItWorksSection } from "@/components/home/how-it-works-section";
import { FAQSection } from "@/components/home/faq-section";
import { prisma } from "@/lib/prisma";


export const revalidate = 60;

async function getLatestCars() {
  try {
    const cars = await prisma.car.findMany({
      take: 27,
      orderBy: { createdAt: "desc" },
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
    });
    return cars.map((car) => ({
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
    }));
  } catch (error) {
    console.error("Error fetching cars:", error);
    return [];
  }
}

export default async function HomePage() {
  const latestCars = await getLatestCars();
  // VIPs primeiro, depois não VIPs, limitado a 8
  const vips = latestCars.filter((car) => car.user.isVIP);
  const naoVips = latestCars.filter((car) => !car.user.isVIP);
  const orderedCars = [...vips, ...naoVips].slice(0, 9);

  return (
    <div>
      <Header />
      <HeroSection />
      <div className="max-w-screen-xl mx-auto px-4">
        <BrandsSection />
        <LatestCarsSection cars={orderedCars} />
        <HowItWorksSection />
        <FAQSection />
        <TestimonialsSection />
      </div>
      <Footer />
    </div>
  );
}
