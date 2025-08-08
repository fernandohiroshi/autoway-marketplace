"use client";

import Image from "next/image";
import { Star, Quote, Heart } from "lucide-react";

const testimonials = [
  {
    name: "Lucas Almeida",
    avatar:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&w=80&h=80&fit=crop",
    text: "Encontrei o carro perfeito para minha família! O AutoWay facilitou todo o processo, recomendo demais.",
    role: "Comprador em São Paulo",
    rating: 5,
    location: "São Paulo",
  },
  {
    name: "Juliana Souza",
    avatar:
      "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&w=80&h=80&fit=crop",
    text: "Vendi meu carro em poucos dias e sem burocracia. Plataforma simples e segura!",
    role: "Vendedora em Belo Horizonte",
    rating: 5,
    location: "Belo Horizonte",
  },
  {
    name: "Carlos Pereira",
    avatar:
      "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&w=80&h=80&fit=crop",
    text: "O atendimento foi excelente e consegui negociar direto com o vendedor. Voltarei a usar!",
    role: "Comprador em Curitiba",
    rating: 5,
    location: "Curitiba",
  },
  {
    name: "Fernanda Dias",
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&w=80&h=80&fit=crop",
    text: "Gostei muito do sistema de avaliação dos carros e das opções de busca.",
    role: "Compradora em Recife",
    rating: 5,
    location: "Recife",
  },
];

export function TestimonialsSection() {
  return (
    <section className="min-h-screen flex items-center py-0 px-0 bg-background">
      <div className="max-w-7xl mx-auto w-full px-4 flex flex-col justify-center h-full">
        
        <div className="text-left mb-12 space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-md bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
            <Heart className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Depoimentos
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white">
            O que nossos clientes dizem
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Milhares de pessoas já encontraram o carro dos sonhos através do AutoWay. <span className="font-semibold text-neutral-700 dark:text-neutral-300">Veja alguns depoimentos reais</span>
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative"
              style={{
                animationDelay: `${index * 200}ms`,
              }}
            >
              
              <div className="h-full bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02] group-hover:-translate-y-1">
                
                <div className="absolute top-4 right-4 opacity-10">
                  <Quote className="h-8 w-8 text-purple-600" />
                </div>
                
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                
                <blockquote className="text-base text-gray-600 dark:text-gray-400 italic leading-relaxed mb-6">
                  "{testimonial.text}"
                </blockquote>
                
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gradient-to-r from-purple-500 to-blue-500 p-[2px]">
                      <div className="w-full h-full rounded-full overflow-hidden bg-background">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="object-cover w-full h-full badge-theme-light dark:badge-theme-dark neon-glow-hover transition-colors"
                        />
                      </div>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-950"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        
        <div className="mt-20 text-center space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                4.9/5
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Avaliação média
              </div>
              <div className="flex justify-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-3 w-3 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                15.000+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Clientes satisfeitos
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                98%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Recomendariam</div>
            </div>
          </div>

          <div className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Junte-se a milhares de clientes satisfeitos
            </span>
            <div className="flex space-x-1">
              <div
                className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <div
                className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <div
                className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
