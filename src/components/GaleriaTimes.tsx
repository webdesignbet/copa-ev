"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

interface Time {
  nome: string;
  sigla: string;
  brasao: string;
}

export default function GaleriaTimes({ times }: { times: Time[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Função para iniciar o autoplay
  const startAutoplay = () => {
    const container = containerRef.current;
    if (!container) return;
    if (intervalRef.current) return; // já está rodando

    intervalRef.current = setInterval(() => {
      if (!container) return;
      if (
        container.scrollLeft + container.offsetWidth >=
        container.scrollWidth
      ) {
        container.scrollLeft = 0;
      } else {
        container.scrollLeft += 1;
      }
    }, 20);
  };

  // Função para pausar o autoplay
  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full overflow-x-auto no-scrollbar mt-4 mb-4 max-w-6xl rounded-2xl shadow-lg backdrop-blur-md bg-white/30 dark:bg-gray-800/30 py-2"
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
    >
      <div className="w-full flex gap-1 px-2 sm:px-4 md:px-8">
        {times.map((time) => (
          <div
            key={time.sigla}
            className="flex-shrink-0 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition content-center"
            title={time.nome}
          >
            <Image
              src={time.brasao || "/brasoes/escudobase.svg"}
              alt={time.nome}
              width={50}
              height={50}
              className="object-contain justify-self-center"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/brasoes/escudobase.svg";
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
