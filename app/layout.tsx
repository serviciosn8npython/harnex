import type { Metadata } from "next";
import { HarnexChatWidget } from "@/components/ai/HarnexChatWidget";
import "./globals.css";

export const metadata: Metadata = {
  title: "Harnex | Inteligencia Artificial Aplicada — Soluciones de IA Aplicada",
  description:
    "Ingeniería de Inteligencia Artificial aplicada para empresas: Agentes SDR de Ventas, Automatización Documental Inteligente y Analítica en Lenguaje Natural.",
  metadataBase: new URL("https://harnex.cl"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className="min-h-screen bg-[#090a0f] text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-200">
        {children}
        <HarnexChatWidget />
      </body>
    </html>
  );
}
