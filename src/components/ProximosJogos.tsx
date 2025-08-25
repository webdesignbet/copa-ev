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

  // Autoplay
  useEffect(() => {
    if (isHovered || !scrollRef.current) return;

    const interval = setInterval(() => {
      scrollBy(320);

      const el = scrollRef.current
      if (el) {
        const maxScroll = el.scrollWidth / 2
        if (el.scrollLeft >= maxScroll) {
          el.scrollLeft = el.scrollLeft - 2 * maxScroll
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered]);

  const duplicated = [...data, ...data];

  return (
    <div className="mt-10 max-w-6xl">
      <h2 className="text-lg sm:text-xl font-bold text-center mb-4">
        📅 Próximos Jogos
      </h2>

      <div className="relative w-full">
        {/* Botão esquerdo (oculto no mobile) */}
        <button
          onClick={() => scrollBy(-320)}
          className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
        >
          <ChevronLeft />
        </button>

        {/* Slider */}
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex overflow-x-auto no-scrollbar gap-3 sm:gap-4 px-4 sm:px-10 py-4 scroll-smooth"
        >
          {duplicated.map((jogo, i) => (
            <div
              key={`${jogo.id}-${i}`}
              className="min-w-[240px] sm:min-w-[270px] md:min-w-[300px] bg-black/10 dark:bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-4 text-black dark:text-white"
            >
              <div className="text-xs mb-1">{jogo.local}</div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    src={jogo.mandanteBrasao || "/brasoes/escudobase.svg"}
                    alt={jogo.mandante}
                    width={28}
                    height={28}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/brasoes/escudobase.svg";
                    }}
                  />
                  <span
                    className="text-base font-semibold cursor-default"
                    title={jogo.mandante}
                  >
                    {jogo.siglaMandante}
                  </span>
                </div>

                <div className="text-center">
                  <div className="text-base sm:text-lg font-bold">{jogo.horario}</div>
                  <div className="text-xs text-gray-700 dark:text-gray-200">
                    {new Date(jogo.data).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className="text-base font-semibold cursor-default"
                    title={jogo.visitante}
                  >
                    {jogo.siglaVisitante}
                  </span>
                  <Image
                    src={jogo.visitanteBrasao || "/brasoes/escudobase.svg"}
                    alt={jogo.visitante}
                    width={28}
                    height={28}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/brasoes/escudobase.svg";
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botão direito (oculto no mobile) */}
        <button
          onClick={() => scrollBy(320)}
          className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
