"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

interface Time {
  id: number;
  nome: string;
  sigla: string;
  brasao: string;
  pontos: number;
  jogos: number;
  vitorias: number;
  empates: number;
  derrotas: number;
  saldoGols: number;
}

interface Column {
  label: string;
  key: keyof Time;
  tooltip: string;
}

export default function TabelaTimes({ data }: { data: Time[] }) {
  const [sortKey, setSortKey] = useState<keyof Time>("pontos");
  const [sortAsc, setSortAsc] = useState(false);

  const columns: Column[] = [
    { label: "#", key: "id", tooltip: "Posição" },
    { label: "TIMES", key: "nome", tooltip: "Nome do Time" },
    { label: "P", key: "pontos", tooltip: "Pontos" },
    { label: "J", key: "jogos", tooltip: "Jogos" },
    { label: "V", key: "vitorias", tooltip: "Vitórias" },
    { label: "E", key: "empates", tooltip: "Empates" },
    { label: "D", key: "derrotas", tooltip: "Derrotas" },
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
      <ArrowUp className="inline w-4 h-4 ml-1" />
    ) : (
      <ArrowDown className="inline w-4 h-4 ml-1" />
    );
  };

  return (
    <div className="overflow-x-auto mt-6 max-w-6xl">
      <table className="min-w-full md:min-w-2xl border-collapse">
        <thead>
          <tr className="bg-gray-500 dark:bg-gray-700 text-lg text-white text-left">
            {columns.map((col) => (
              <th
                key={col.key as string}
                onClick={() => handleSort(col.key)}
                className={`p-2 cursor-pointer select-none font-bold ${
                  sortKey === col.key ? (sortAsc ? 'asc' : 'desc') : ''
                }`}
                title={col.tooltip}
              >
                {col.label}
                {getSortIcon(col.key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((time) => (
            <tr
              key={time.id}
              className="border-b border-l border-r text-left dark:border-gray-700"
            >
              <td className="p-2 font-bold pr-4 pl-4">{time.id}</td>
              <td className="flex items-center p-2 gap-2 text-left pl-2 pr-14">
                <Image
                  src={time.brasao || "/brasoes/escudobase.svg"}
                  alt={time.nome}
                  width={26}
                  height={26}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/brasoes/escudobase.svg";
                  }}
                />
                <span className="min-w-[100px]">{time.nome}</span>
              </td>
              <td className="p-2 pr-4">{time.pontos}</td>
              <td className="p-2 pr-4">{time.jogos}</td>
              <td className="p-2 pr-4">{time.vitorias}</td>
              <td className="p-2 pr-4">{time.empates}</td>
              <td className="p-2 pr-4">{time.derrotas}</td>
              <td className="p-2 pr-4">{time.saldoGols}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
