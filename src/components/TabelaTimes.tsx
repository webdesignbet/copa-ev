"use client";

import Image from "next/image";
import { useState } from "react";

interface Time {
  classificacao: number;
  classGrp?: number;
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
  grupo?: string;
}

interface Column {
  label: string;
  key: keyof Time;
  tooltip: string;
}

interface TabelaTimesProps {
  data: Time[];
  tipo: "geral" | "grupo";
}

export default function TabelaTimes({ data, tipo }: TabelaTimesProps) {
  const colunaClassificacao: keyof Time =
    tipo === "geral" ? "classificacao" : "classGrp";

  const [sortKey] = useState<keyof Time>(colunaClassificacao);
  const [sortAsc] = useState(true);

  const columns: Column[] = [
    {
      label: "Classificação",
      key: colunaClassificacao,
      tooltip: "Classificação",
    },
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

  return (
    <div className="overflow-x-auto mt-6 w-full rounded-2xl shadow-lg backdrop-blur-md bg-white/30 dark:bg-gray-800/30 mx-1">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-gray-900 dark:text-gray-100">
        <thead className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md">
          <tr className="sm:text-sm md:text-md lg:text-lg xl:text-lg">
            {columns.map((col) => (
              <th
                key={col.key as string}
                className="p-2 font-bold select-none relative min-w-[40px] transition"
                title={col.tooltip}
              >
                <span
                  className={`flex items-center ${
                    col.label === "Classificação"
                      ? "classificacao"
                      : "justify-center"
                  }`}
                >
                  {col.label}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 sm:text-sm md:text-md lg:text-lg xl:text-lg">
          {sortedData.map((time) => (
            <tr
              key={time.classificacao}
              className="hover:bg-red-50 dark:hover:bg-red-900/20 transition"
            >
              <td className="p-2 flex items-center gap-2 font-semibold">
                <span className="w-6 text-center text-red-600 dark:text-red-400">
                  {tipo === "geral" ? time.classificacao : time.classGrp}
                </span>

                <span className="ml-1 block sm:hidden md:hidden text-sm">
                  {time.sigla}
                </span>

                <span className="hidden sm:flex md:flex items-center gap-2">
                  <Image
                    src={
                      `https://raw.githubusercontent.com/webdesignbet/brasoes/main/${time.brasao}.webp` ||
                      "/brasoes/escudobase.svg"
                    }
                    alt={time.nome}
                    width={26}
                    height={26}
                    className="object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/brasoes/escudobase.svg";
                    }}
                    unoptimized
                  />
                  <span className="ml-1">{time.nome}</span>
                </span>
              </td>
              <td className="p-2 py-2 text-center">{time.pontos}</td>
              <td className="p-2 py-2 text-center">{time.jogos}</td>
              <td className="p-2 py-2 text-center">{time.vitorias}</td>
              <td className="p-2 py-2 text-center">{time.empates}</td>
              <td className="p-2 py-2 text-center">{time.derrotas}</td>
              <td className="p-2 py-2 text-center">{time.golsPro}</td>
              <td className="p-2 py-2 text-center">{time.golsContra}</td>
              <td className="p-2 py-2 text-center">{time.saldoGols}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
