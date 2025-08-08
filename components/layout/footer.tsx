"use client";

import Link from "next/link";
import {
  Car,
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contato"
      className="bg-gray-900 dark:bg-black text-white dark:text-gray-200"
      role="contentinfo"
      aria-label="Informações de contato e rodapé"
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1 space-y-6">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="p-2 rounded-xl bg-gray-800 group-hover:bg-gray-700 transition-all duration-200 border border-gray-700">
                <Car className="h-6 w-6 text-white dark:text-gray-200" />
              </div>
              <span className="font-bold text-2xl text-white dark:text-gray-200">
                AutoWay
              </span>
            </Link>

            <p className="text-neutral-200 dark:text-gray-200 leading-relaxed text-lg">
              O marketplace de carros mais{" "}
              <span className="font-semibold text-white dark:text-gray-200">
                confiável
              </span>{" "}
              do Brasil. Encontre o carro dos seus sonhos com segurança e
              praticidade.
            </p>

            <div className="space-y-4">
              <h4 className="font-semibold text-white dark:text-gray-200">
                Siga-nos
              </h4>
              <div className="flex space-x-4">
                <div className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-all duration-200 cursor-pointer group border border-gray-700">
                  <Facebook className="h-5 w-5 text-gray-400 group-hover:text-white dark:text-gray-200 transition-colors" />
                </div>
                <div className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-all duration-200 cursor-pointer group border border-gray-700">
                  <Instagram className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
                </div>
                <div className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-all duration-200 cursor-pointer group border border-gray-700">
                  <Twitter className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-bold text-xl text-white dark:text-gray-200 relative">
              Navegação
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gray-600"></div>
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Início", href: "/" },
                { label: "Carros", href: "/cars" },
                { label: "Como Funciona", href: "#como-funciona" },
                { label: "Contato", href: "#contato" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white dark:text-gray-200 transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-gray-600 transition-all duration-200 mr-0 group-hover:mr-3"></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="font-bold text-xl text-white dark:text-gray-200 relative">
              Suporte
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gray-600"></div>
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Central de Ajuda", href: "#" },
                { label: "Termos de Uso", href: "#" },
                { label: "Política de Privacidade", href: "#" },
                { label: "FAQ", href: "#" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-gray-600 transition-all duration-200 mr-0 group-hover:mr-3"></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="font-bold text-xl text-white dark:text-gray-200 relative">
              Contato
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gray-600"></div>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-neutral-200 dark:text-gray-200">
                <div className="p-2 rounded-lg bg-gray-800 border border-gray-700">
                  <Mail className="h-4 w-4 text-gray-400 dark:text-gray-300" />
                </div>
                <span>contato@autoway.com.br</span>
              </li>
              <li className="flex items-center space-x-3 text-neutral-200 dark:text-gray-200">
                <div className="p-2 rounded-lg bg-gray-800 border border-gray-700">
                  <Phone className="h-4 w-4 text-gray-400 dark:text-gray-300" />
                </div>
                <span>(11) 9999-9999</span>
              </li>
              <li className="flex items-center space-x-3 text-neutral-200 dark:text-gray-200">
                <div className="p-2 rounded-lg bg-gray-800 border border-gray-700">
                  <MapPin className="h-4 w-4 text-gray-400 dark:text-gray-300" />
                </div>
                <span>São Paulo, SP</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400 dark:text-gray-300">
              <span>&copy; 2024 AutoWay. Todos os direitos reservados.</span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={scrollToTop}
              className="border-gray-700 hover:border-gray-600 hover:bg-gray-800 text-gray-600 dark:text-gray-200 hover:text-white transition-all duration-200"
            >
              <ArrowUp className="h-4 w-4 mr-2" />
              Topo
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-8 border-t border-gray-800">
            <div className="text-center">
              <div className="text-2xl font-bold text-white dark:text-gray-200">
                10.000+
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">
                Carros
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white dark:text-gray-200">
                500+
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">
                Vendedores
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white dark:text-gray-200">
                15.000+
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">
                Clientes
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white dark:text-gray-200">
                98%
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">
                Satisfação
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
