import { getTabela, getProximosJogos } from "@/utils/getGoogleSheetData";
import TabelaTimes from "@/components/TabelaTimes";
import ProximosJogos from "@/components/ProximosJogos";
import ThemeToggle from "@/components/ThemeToggle";
import GaleriaTimes from "@/components/GaleriaTimes";

export default async function Home() {
  const tabela = await getTabela();
  const proximosJogos = await getProximosJogos();

  // Extrair times únicos de proximosJogos
  const timesMap = new Map<string, { nome: string; sigla: string; brasao: string }>();

  proximosJogos.forEach((jogo) => {
    timesMap.set(jogo.siglaMandante, {
      nome: jogo.mandante,
      sigla: jogo.siglaMandante,
      brasao: jogo.mandanteBrasao,
    });
    timesMap.set(jogo.siglaVisitante, {
      nome: jogo.visitante,
      sigla: jogo.siglaVisitante,
      brasao: jogo.visitanteBrasao,
    });
  });

  const times = Array.from(timesMap.values()).sort((a, b) => a.nome.localeCompare(b.nome));

  return (
    <main className="max-w-full mx-auto p-4 justify-items-center">
      <ThemeToggle />
      <h1 className="sm:text-2xl md:text-2xl lg:text-4xl xl:text-4xl font-bold text-center pb-6 mt-4">🏆 COPA AMADOR - 2025</h1>
      <GaleriaTimes times={times} />
      <TabelaTimes data={tabela} />
      <ProximosJogos data={proximosJogos} />
    </main>
  );
}
