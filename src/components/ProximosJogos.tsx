"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Jogo {
  id: number;
  data: string;
  horario: string;
  local: string;
  mandante: string;
  siglaMandante: string;
  mandanteBrasao: string;
  visitante: string;
  siglaVisitante: string;
  visitanteBrasao: string;
}

export default function ProximosJogos({ data }: { data: Jogo[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const scrollBy = (offset: number) => {
    scrollRef.current?.scrollBy({ left: offset, behavior: "smooth" });
  };

  useEffect(() => {
    if (isHovered || !scrollRef.current) return;
    const interval = setInterval(() => {
      scrollBy(320);
      const el = scrollRef.current;
      if (el) {
        const maxScroll = el.scrollWidth / 2;
        if (el.scrollLeft >= maxScroll) {
          el.scrollLeft = el.scrollLeft - 2 * maxScroll;
        }
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const duplicated = [...data, ...data];

  return (
    <div className="mt-10 max-w-screen">
      <div className="relative max-w-4xl">
        <button
          onClick={() => scrollBy(-320)}
          className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full shadow-lg"
        >
          <ChevronLeft />
        </button>

        <div
          ref={scrollRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex overflow-x-auto no-scrollbar gap-4 px-4 py-4 scroll-smooth"
        >
          {duplicated.map((jogo, i) => (
            <div
              key={`${jogo.id}-${i}`}
              className="min-w-[260px] sm:min-w-[290px] md:min-w-[320px] rounded-2xl p-4 shadow-lg bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-red-200 dark:border-red-700 p-3 flex flex-col items-center transition hover:border-red-400 dark:hover:border-red-500"
            >
              <div className="text-xs text-gray-600 dark:text-gray-300 mb-1">
                {jogo.local}
              </div>

              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <Image
                    src={
                      `/api/brasoes/${jogo.mandanteBrasao}` ||
                      "/brasoes/escudobase.svg"
                    }
                    alt={jogo.mandante}
                    width={32}
                    height={32}
                    className="object-contain"
                    unoptimized
                  />
                  <span
                    className="text-xs sm:text-xs md:text-xs font-semibold cursor-default"
                    title={jogo.mandante}
                  >
                    {jogo.siglaMandante}
                  </span>
                </div>

                <div className="text-center">
                  <div className="text-base sm:text-lg font-bold">
                    {jogo.horario}
                  </div>
                  <div className="text-xs text-gray-700 dark:text-gray-200">
                    {new Date(jogo.data + "T00:00:00").toLocaleDateString(
                      "pt-BR",
                      {
                        timeZone: "America/Sao_Paulo",
                      }
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className="text-xs sm:text-xs md:text-xs font-semibold cursor-default"
                    title={jogo.visitante}
                  >
                    {jogo.siglaVisitante}
                  </span>
                  <Image
                    src={
                      `/api/brasoes/${jogo.visitanteBrasao}` ||
                      "/brasoes/escudobase.svg"
                    }
                    alt={jogo.visitante}
                    width={32}
                    height={32}
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => scrollBy(320)}
          className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full shadow-lg"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
