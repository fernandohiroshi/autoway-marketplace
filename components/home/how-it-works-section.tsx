"use client";

import { Badge } from "../ui/badge";

export function HowItWorksSection() {
  return (
    <section
      id="como-funciona"
      className="min-h-screen flex items-center py-0 px-0 bg-background"
    >
      <div className="max-w-7xl mx-auto w-full px-4 flex flex-col justify-center h-full">
        <div className="text-left mb-12 space-y-3 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white">
            Como Funciona
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Simples, rápido e seguro
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-6">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-800">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                1
              </span>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Cadastre-se
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Crie sua conta gratuitamente e tenha acesso a todas as
                funcionalidades
                <Badge className="badge-theme-light dark:badge-theme-dark neon-glow-hover transition-colors" />
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-800">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                2
              </span>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Busque ou Anuncie
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Encontre o carro ideal ou anuncie o seu veículo
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-800">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                3
              </span>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Negocie
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Entre em contato diretamente com o vendedor
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
