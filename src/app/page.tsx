import { getTabela, getProximosJogos } from "@/utils/getGoogleSheetData";
import TabelaTimes from "@/components/TabelaTimes";
import ProximosJogos from "@/components/ProximosJogos";
import ThemeToggle from "@/components/ThemeToggle";
import GaleriaTimes from "@/components/GaleriaTimes";

export default async function Home() {
  const tabela = await getTabela();
  const proximosJogos = await getProximosJogos();

  // Extrair times únicos de proximosJogos
  const timesMap = new Map<
    string,
    { nome: string; sigla: string; brasao: string }
  >();

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

  const times = Array.from(timesMap.values()).sort((a, b) =>
    a.nome.localeCompare(b.nome)
  );

  return (
    <main className="max-w-4xl mx-auto p-2 justify-items-center">
      {/* Botão de Tema */}
      <ThemeToggle />

      {/* Título Principal */}
      <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-center pb-4 mt-4 text-red-600 dark:text-red-400">
          COPA AMADOR 2025
      </h1>

      {/* Galeria de Times */}
      <div className="flex flex-col items-center">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-1 text-red-600 dark:text-red-400 relative inline-block">
          Times Participantes
          <span className="block w-10 h-[2px] bg-red-600 dark:bg-red-400 mx-auto mt-1 rounded-full"></span>
        </h2>
        <GaleriaTimes times={times} />
      </div>

      {/* Tabela de Classificação */}
      <div className="flex flex-col items-center mt-8 sm:mt-10 max-w-6xl">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-1 text-red-600 dark:text-red-400 relative inline-block">
          Classificação
          <span className="block w-10 h-[2px] bg-red-600 dark:bg-red-400 mx-auto mt-1 rounded-full"></span>
        </h2>
      </div>
      <TabelaTimes data={tabela} />

      {/* Próximos Jogos */}
      <section className="flex flex-col items-center mt-8 sm:mt-10 max-w-6xl">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-1 text-red-600 dark:text-red-400 relative inline-block">
          Próximos Jogos
          <span className="block w-10 h-[2px] bg-red-600 dark:bg-red-400 mx-auto mt-1 rounded-full"></span>
        </h2>
        <ProximosJogos data={proximosJogos} />
      </section>
    </main>
  );
}
