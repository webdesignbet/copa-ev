"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

interface Time {
  classificacao: number;
  nome: string;
  sigla: string;
  brasao: string;
  pontos: number;
  jogos: number;
  vitorias: number;
  empates: number;
  derrotas: number;
  golsPro: number;
  golsContra: number;
  saldoGols: number;
}

interface Column {
  label: string;
  key: keyof Time;
  tooltip: string;
}

export default function TabelaTimes({ data }: { data: Time[] }) {
  const [sortKey, setSortKey] = useState<keyof Time>("classificacao");
  const [sortAsc, setSortAsc] = useState(true);

  const columns: Column[] = [
    { label: "#", key: "classificacao", tooltip: "Classificação" },
    { label: "Times", key: "nome", tooltip: "Nome do Time" },
    { label: "P", key: "pontos", tooltip: "Pontos" },
    { label: "J", key: "jogos", tooltip: "Jogos" },
    { label: "V", key: "vitorias", tooltip: "Vitórias" },
    { label: "E", key: "empates", tooltip: "Empates" },
    { label: "D", key: "derrotas", tooltip: "Derrotas" },
    { label: "GP", key: "golsPro", tooltip: "Gols Pró" },
    { label: "GC", key: "golsContra", tooltip: "Gols Contra" },
    { label: "SG", key: "saldoGols", tooltip: "Saldo de Gols" },
  ];

  const sortedData = [...data].sort((a, b) => {
    if (typeof a[sortKey] === "string" && typeof b[sortKey] === "string") {
      return sortAsc
        ? (a[sortKey] as string).localeCompare(b[sortKey] as string)
        : (b[sortKey] as string).localeCompare(a[sortKey] as string);
    }
    return sortAsc
      ? (a[sortKey] as number) - (b[sortKey] as number)
      : (b[sortKey] as number) - (a[sortKey] as number);
  });

  const handleSort = (key: keyof Time) => {
    if (key === sortKey) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(false);
    }
  };

  const getSortIcon = (key: keyof Time) => {
    if (key !== sortKey) return null;
    return sortAsc ? (
      <ArrowUp className="inline w-4 h-4 ml-1 text-red-600" />
    ) : (
      <ArrowDown className="inline w-4 h-4 ml-1 text-red-600" />
    );
  };

  return (
    <div className="overflow-x-auto mt-6 w-full rounded-2xl shadow-lg backdrop-blur-md bg-white/30 dark:bg-gray-800/30">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-gray-900 dark:text-gray-100">
        <thead className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md">
          <tr className="text-lg text-right">
            {columns.map((col) => (
              <th
                key={col.key as string}
                onClick={() => handleSort(col.key)}
                className={`p-2 font-semibold cursor-pointer select-none relative transition ${
                  sortKey === col.key
                    ? "text-red-600 dark:text-red-400"
                    : "hover:text-red-500 dark:hover:text-red-300"
                }`}
                title={col.tooltip}
              >
                <span className="flex items-center">
                  {col.label}
                  {getSortIcon(col.key)}
                </span>

                {/* Red underline for active column */}
                {sortKey === col.key && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black dark:bg-white rounded-full"></span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {sortedData.map((time) => (
            <tr
              key={time.classificacao}
              className="hover:bg-red-50 dark:hover:bg-red-900/20 transition"
            >
              <td className="p-2 pr-4 pl-4 font-bold">{time.classificacao}</td>
              <td className="p-2 pr-14 pl-2 flex items-center gap-2">
                <Image
                  src={time.brasao || "/brasoes/escudobase.svg"}
                  alt={time.nome}
                  width={26}
                  height={26}
                  className="object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/brasoes/escudobase.svg";
                  }}
                />
                <span className="min-w-[200px]">{time.nome}</span>
              </td>
              <td className="p-2 pr-4 py-2 text-center">{time.pontos}</td>
              <td className="p-2 pr-4 py-2 text-center">{time.jogos}</td>
              <td className="p-2 pr-4 py-2 text-center">{time.vitorias}</td>
              <td className="p-2 pr-4 py-2 text-center">{time.empates}</td>
              <td className="p-2 pr-4 py-2 text-center">{time.derrotas}</td>
              <td className="p-2 pr-4 py-2 text-center">{time.golsPro}</td>
              <td className="p-2 pr-4 py-2 text-center">{time.golsContra}</td>
              <td className="p-2 pr-4 py-2 text-center">{time.saldoGols}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
