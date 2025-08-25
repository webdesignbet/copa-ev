"use client";

import Image from "next/image";

interface Time {
  nome: string;
  sigla: string;
  brasao: string;
}

export default function GaleriaTimes({ times }: { times: Time[] }) {
  return (
    <div className="w-full overflow-x-auto no-scrollbar mt-4 mb-4 max-w-6xl border border-gray-900/20 dark:border-white/20 bg-gray-900/10 dark:bg-white/10 backdrop-blur py-2">
      <div className="w-full flex gap-1 px-2 sm:px-4 md:px-8">
        {times.map((time) => (
          <div key={time.sigla} className="flex-shrink-0" title={time.nome}>
            <Image
              src={time.brasao || "/brasoes/escudobase.svg"}
              alt={time.nome}
              width={50}
              height={50}
              className="object-contain"
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
