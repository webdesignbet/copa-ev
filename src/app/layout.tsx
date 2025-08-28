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
        <meta name="apple-mobile-web-app-capable" content="yes" />
        {/* Mantive as configs dos splash screens */}
      </head>
      <body
        className="
          antialiased pb-8
          bg-gradient-to-br from-gray-50 via-white to-gray-100 
          dark:from-gray-900 dark:via-gray-950 dark:to-black
          min-h-screen transition-colors duration-500
        "
      >
        {/* Overlay de textura sutil */}
        <div className="fixed inset-0 w-full h-full pointer-events-none bg-[url('/textures/fundo.png')] dark:opacity-30 z-0"></div>

        {/* Conteúdo principal */}
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
