"use client";

import * as React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { HelpCircle, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const faqList = [
  {
    question: "Como faço para anunciar meu carro?",
    answer:
      "Basta criar uma conta gratuita, acessar seu painel e clicar em 'Anunciar Carro'. Preencha os dados e envie as fotos do veículo.",
    category: "Vendedor",
  },
  {
    question: "Preciso pagar para usar o AutoWay?",
    answer:
      "Não! Tanto para buscar quanto para anunciar carros, o AutoWay é totalmente gratuito.",
    category: "Geral",
  },
  {
    question: "Como entro em contato com o vendedor?",
    answer:
      "Cada anúncio possui um botão de WhatsApp para contato direto com o vendedor do veículo.",
    category: "Comprador",
  },
  {
    question: "O AutoWay garante a negociação?",
    answer:
      "O AutoWay é um marketplace que conecta compradores e vendedores, mas não intermedia pagamentos ou garante transações. Sempre negocie com segurança!",
    category: "Segurança",
  },
  {
    question: "Como saber se um vendedor é confiável?",
    answer:
      "Verifique avaliações, histórico e, se possível, marque encontros em locais públicos. Nunca faça pagamentos antecipados sem garantias.",
    category: "Segurança",
  },
];

export function FAQSection() {
  const [openItem, setOpenItem] = React.useState<string | undefined>(undefined);

  return (
    <section className="min-h-screen flex items-center py-0 px-0 bg-background" aria-label="Perguntas frequentes e respostas">
      <div className="max-w-7xl mx-auto w-full px-4 flex flex-col justify-center h-full">
        <div className="text-left mb-12 space-y-4 max-w-3xl">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-6" id="faq-heading">Perguntas frequentes</h2>
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-md bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
            <HelpCircle className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              FAQ
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white">
            Dúvidas Frequentes
          </h2>

          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Encontre respostas rápidas para as perguntas mais comuns sobre o AutoWay
          </p>
        </div>

        <div className="space-y-4 mb-16">
          <Accordion
            type="single"
            collapsible
            value={openItem}
            onValueChange={setOpenItem}
            className="space-y-4"
          >
            {faqList.map((item, index) => (
              <AccordionItem
                value={`faq-${index}`}
                key={index}
                className="border-0"
              >
                <div className="group bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 hover:shadow-sm overflow-hidden">
                  <AccordionTrigger className="text-left font-semibold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50 px-6 py-5 transition-all duration-200 hover:no-underline [&[data-state=open]]:bg-gray-100 dark:[&[data-state=open]]:bg-gray-800/50">
                    <div className="flex items-start space-x-4 w-full">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-900 dark:text-white text-sm font-bold mt-0.5 border border-gray-300 dark:border-gray-700">
                        {index + 1}
                      </div>
                      <div className="flex-1 text-base md:text-lg">
                        {item.question}
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400 bg-gray-100/50 dark:bg-gray-800/30 px-6 py-5 border-t border-gray-200 dark:border-gray-800">
                    <div className="pl-12 space-y-3">
                      <p className="leading-relaxed">{item.answer}</p>
                      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-800 text-xs font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700">
                        <span>{item.category}</span>
                      </div>
                    </div>
                  </AccordionContent>
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="dark:bg-gray-900 rounded-2xl p-8 md:p-12 text-start space-y-8 border border-gray-200 dark:border-gray-800">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-800 rounded-xl flex items-center justify-center border border-gray-300 dark:border-gray-700">
              <MessageCircle className="h-8 w-8 text-gray-600 dark:text-gray-400" />
            </div>
            <div className="space-y-3 flex-1">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Ainda tem dúvidas?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Nossa equipe de suporte está sempre pronta para ajudar você.
                Entre em contato e tire todas as suas dúvidas.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 border-0 px-8 py-3 h-auto font-medium"
            >
              <Link href="/#contato" className="flex items-center">
                Fale Conosco
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50 px-8 py-3 h-auto"
            >
              Central de Ajuda
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                &lt; 2h
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Tempo de resposta
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                24/7
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Suporte disponível
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                95%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Problemas resolvidos
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
