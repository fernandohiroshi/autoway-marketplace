"use client";

import Image from "next/image";

const brands = [
  { name: "Audi", src: "/marcas/audi-logo.png" },
  { name: "BMW", src: "/marcas/bmw-logo.png" },
  { name: "Chevrolet", src: "/marcas/chevrolet-logo.png" },
  { name: "Ford", src: "/marcas/ford-logo.png" },
  { name: "Honda", src: "/marcas/honda-logo.png" },
  { name: "Hyundai", src: "/marcas/hyundai-logo.png" },
  { name: "Mercedes-Benz", src: "/marcas/mercedes-benz-logo.png" },
  { name: "Porsche", src: "/marcas/porsche-logo.png" },
  { name: "Toyota", src: "/marcas/toyota-logo.png" },
  { name: "Volkswagen", src: "/marcas/volkswagen-logo.png" },
];

export function BrandsSection() {
  return (
    <section
      id="marcas"
      className="min-h-screen flex items-center py-0 px-0 bg-background"
    >
      <div className="max-w-7xl mx-auto w-full px-4 flex flex-col justify-center h-full">
        <div className="text-left mb-12 space-y-3 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white">
            Marcas presentes
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Trabalhamos com as principais montadoras do mercado para oferecer a
            você a maior variedade de veículos
          </p>
        </div>

        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10 items-center justify-items-center mb-14"
          role="list"
          aria-label="Marcas de carros disponíveis"
        >
          {brands.map((brand, index) => (
            <div
              key={brand.name}
              className="group flex flex-col items-center"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Image
                src={brand.src}
                alt={`Logo da marca ${brand.name}`}
                width={124}
                height={124}
                className="object-contain h-32 w-28 hover:brightness-125 opacity-80"
                priority
              />
            </div>
          ))}
        </div>

        <div className="text-left">
          <div className="inline-flex items-center space-x-3 px-6 py-3 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
            <span className="text-sm font-medium text-neutral-900 dark:text-white">
              Estamos sempre adicionando novas marcas
            </span>
            <div className="flex space-x-1">
              <div
                className="w-2 h-2 bg-neutral-400 dark:bg-neutral-600 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <div
                className="w-2 h-2 bg-neutral-500 dark:bg-neutral-500 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <div
                className="w-2 h-2 bg-neutral-400 dark:bg-neutral-600 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
