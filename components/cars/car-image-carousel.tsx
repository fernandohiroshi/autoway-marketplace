"use client";

import { useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

interface CarImageCarouselProps {
  images: string[];
  alt: string;
}

export function CarImageCarousel({ images, alt }: CarImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (images.length === 0) {
    return (
      <Card className="mb-6">
        <div className="aspect-video bg-gray-200 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-200">Nenhuma imagem disponível</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="mb-6 overflow-hidden">
      <div className="relative">
        <div className="aspect-[16/9] relative">
          <Image
            src={
              images[currentIndex] || "/placeholder.svg?height=400&width=600"
            }
            alt={alt}
            fill
            className="object-cover"
            quality={100}
            priority
          />
          {images.length > 1 && (
            <>
              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 text-black dark:text-gray-200 hover:opacity-80 transition-opacity"
                style={{ zIndex: 2 }}
                onClick={prevImage}
                aria-label="Imagem anterior"
              >
                <FaArrowAltCircleLeft className="h-10 w-10" />
              </button>
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 text-black dark:text-gray-200 hover:opacity-80 transition-opacity"
                style={{ zIndex: 2 }}
                onClick={nextImage}
                aria-label="Próxima imagem"
              >
                <FaArrowAltCircleRight className="h-10 w-10" />
              </button>
            </>
          )}
        </div>

        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentIndex ? "bg-white" : "bg-white/50"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="p-4">
          <div className="grid grid-cols-4 gap-2">
            {images.slice(0, 4).map((image, index) => (
              <button
                key={index}
                className={`relative aspect-[16/7] rounded overflow-hidden border-2 ${
                  index === currentIndex ? "border-blue-500" : "border-gray-200"
                }`}
                onClick={() => setCurrentIndex(index)}
              >
                <Image
                  src={image || "/placeholder.svg?height=100&width=150"}
                  alt={`${alt} ${index + 1}`}
                  fill
                  className="object-cover"
                  quality={100}
                  priority
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
