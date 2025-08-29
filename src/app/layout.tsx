import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Copa EsportivaVip",
  description:
    "Aplicativo para acompanhar a tabela e os jogos da Copa EsportivaVip",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta name="viewport" content="initial-scale=1.0, user-scalable=1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        {/* Mantive as configs dos splash screens */}
      </head>
      <body className="antialiased pb-8 max-w-6xl">
        {/* Overlay de textura sutil */}
        <div className="fixed inset-0 h-full w-screen pointer-events-none bg-[url('/textures/fundo.png')] dark:opacity-30 z-0"></div>

        {/* Conteúdo principal */}
        <div className="relative z-10 max-w-6xl">{children}</div>
      </body>
    </html>
  );
}
