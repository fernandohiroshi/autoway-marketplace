"use client";

import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { SearchInput } from "@/components/ui/search-input";

const carImages = [
  "/hero/1.jpg",
  "/hero/2.jpg",
  "/hero/3.jpg",
  "/hero/4.jpg",
];

export function HeroSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000 }),
  ]);

  useEffect(() => {
    
  }, [emblaApi]);

  return (
    <section className="relative min-h-screen h-screen overflow-hidden" aria-label="Destaque e busca do marketplace">
      
      <div className="absolute inset-0 -z-10 embla" ref={emblaRef}>
        <div className="embla__container">
          {carImages.map((image, idx) => (
            <div
              key={idx}
              className="embla__slide relative min-h-full overflow-hidden"
            >
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/80" />
            </div>
          ))}
        </div>
      </div>

      
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 max-w-7xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
          <span className="text-xs font-medium uppercase tracking-wider text-white/90">
            AutoWay Lifestyle
          </span>
        </div>

        <h1 className="text-white dark:text-gray-200 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-5xl mb-6">
          Dirija seu estilo <br /> com atitude
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl font-light text-gray-200 dark:text-gray-300 max-w-2xl mb-12">
          O marketplace de carros mais{" "}
          <span className="font-medium text-white dark:text-gray-200">EASY</span> do Brasil
        </p>

        <div className="w-full max-w-2xl">
          <SearchInput placeholder="Busque por marca, modelo ou ano..." />
        </div>
      </div>
    </section>
  );
}
