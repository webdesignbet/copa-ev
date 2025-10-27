/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import TabelaTimes from "@/components/TabelaTimes";
import ProximosJogos from "@/components/ProximosJogos";
import Artilheiros from "@/components/Artilheiros";

interface TabsContentProps {
  tabela: any[];
  grupoA: any[];
  grupoB: any[];
  proximosJogos: any[];
  artilheiros: any[];
}

export default function TabsContent({
  tabela,
  grupoA,
  grupoB,
  proximosJogos,
  artilheiros,
}: TabsContentProps) {
  const [tab, setTab] = useState<"classificacao" | "artilheiros">(
    "classificacao"
  );

  return (
    <>
      {/* Botões das Abas */}
      <div className="relative flex justify-center mt-8">
        <div className="flex bg-gray-200 dark:bg-gray-800 rounded-full p-1 shadow-inner w-[100%] sm:w-auto">
          {["classificacao", "artilheiros"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t as "classificacao" | "artilheiros")}
              className={`relative px-4 sm:px-6 py-2 text-sm sm:text-base font-semibold transition-colors duration-300 rounded-full flex-1 overflow-hidden ${
                tab === t
                  ? "text-white"
                  : "text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
              }`}
            >
              {tab === t && (
                <motion.span
                  layoutId="active-tab"
                  className="absolute inset-0 bg-red-600 dark:bg-red-500 rounded-full z-0"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
              <span className="relative z-10 capitalize">
                {t === "classificacao" ? "Classificação" : "Artilheiros"}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Conteúdo com Transição */}
      <motion.div
        key={tab}
        initial={{ opacity: 0, x: tab === "classificacao" ? -20 : 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-8"
      >
        {tab === "classificacao" ? (
          <div className="sm:max-w-2xl md:max-w-2xl lg:max-w-3xl xl:max-w-3xl mx-auto px-1 py-2 justify-items-center">
            {/* Grupo A */}
            <div className="flex flex-col items-center mt-8 sm:mt-10 max-w-2xl">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-1 text-red-600 dark:text-red-400 relative inline-block">
                Grupo A
                <span className="block w-10 h-[2px] bg-red-600 dark:bg-red-400 mx-auto mt-1 rounded-full"></span>
              </h2>
            </div>
            <TabelaTimes data={grupoA} tipo="grupo" />

            {/* Grupo B */}
            <div className="flex flex-col items-center mt-8 sm:mt-10 max-w-2xl">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-1 text-red-600 dark:text-red-400 relative inline-block">
                Grupo B
                <span className="block w-10 h-[2px] bg-red-600 dark:bg-red-400 mx-auto mt-1 rounded-full"></span>
              </h2>
            </div>
            <TabelaTimes data={grupoB} tipo="grupo" />

            {/* Classificação Geral */}
            <div className="flex flex-col items-center mt-8 sm:mt-10 max-2-4xl">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-1 text-red-600 dark:text-red-400 relative inline-block">
                Classificação Geral
                <span className="block w-10 h-[2px] bg-red-600 dark:bg-red-400 mx-auto mt-1 rounded-full"></span>
              </h2>
            </div>
            <TabelaTimes data={tabela} tipo="geral" />

            {/* Próximos Jogos */}
            <section className="flex flex-col items-center mt-8 sm:mt-10 max-w-2xl">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-1 text-red-600 dark:text-red-400 relative inline-block">
                Próximos Jogos
                <span className="block w-10 h-[2px] bg-red-600 dark:bg-red-400 mx-auto mt-1 rounded-full"></span>
              </h2>
            </section>
            <ProximosJogos data={proximosJogos} />
          </div>
        ) : (
          <Artilheiros data={artilheiros} />
        )}
      </motion.div>
    </>
  );
}
