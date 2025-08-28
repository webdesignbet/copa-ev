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
      className="w-full overflow-x-auto no-scrollbar mt-6 mb-6 max-w-6xl rounded-2xl shadow-lg backdrop-blur-md bg-white/30 dark:bg-gray-800/30 py-3 px-4"
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
    >
      <div className="w-full flex gap-3">
        {times.map((time) => (
          <div
            key={time.sigla}
            className="flex-shrink-0 p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition"
            title={time.nome}
          >
            <Image
              src={time.brasao || "/brasoes/escudobase.svg"}
              alt={time.nome}
              width={56}
              height={56}
              className="object-contain w-14 h-14"
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
