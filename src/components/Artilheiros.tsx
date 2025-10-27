"use client";

import Image from "next/image";

interface Artilheiro {
  posicao: number;
  jogador: string;
  time: string;
  brasao: string;
  gols: number;
}

export default function Artilheiros({ data }: { data: Artilheiro[] }) {
  const sorted = [...data].sort((a, b) => a.posicao - b.posicao).slice(0, 10);

  return (
    <div className="overflow-x-auto mt-6 w-full rounded-2xl shadow-lg backdrop-blur-md bg-white/30 dark:bg-gray-800/30 mx-1">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-gray-900 dark:text-gray-100">
        <thead className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md">
          <tr className="sm:text-sm md:text-md lg:text-lg xl:text-lg">
            <th className="p-2 text-center font-bold">Classificação</th>
            <th className="p-2 text-left font-bold">Jogador</th>
            <th className="p-2 text-center font-bold">Gols</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 sm:text-sm md:text-md lg:text-lg xl:text-lg">
          {sorted.map((art) => (
            <tr
              key={art.posicao}
              className="hover:bg-red-50 dark:hover:bg-red-900/20 transition"
            >
              {/* Posição + Brasão */}
              <td className="p-2 w-30 text-center flex items-center justify-center gap-2 font-semibold">
                <span className="w-5 mr-1 text-red-600 dark:text-red-400 font-bold">
                  {art.posicao}
                </span>
                <Image
                  src={
                    `/api/brasoes/${art.brasao}` ||
                    "/brasoes/escudobase.svg"
                  }
                  alt={art.time}
                  width={26}
                  height={26}
                  className="object-contain rounded-full"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/brasoes/escudobase.svg";
                  }}
                  unoptimized
                />
              </td>

              {/* Nome do Jogador */}
              <td className="p-2 w-56 text-left font-medium">{art.jogador}</td>

              {/* Quantidade de Gols */}
              <td className="p-2 w-20 text-center font-semibold text-red-600 dark:text-red-400">
                {art.gols}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
