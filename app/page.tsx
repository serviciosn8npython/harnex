import {
  ArrowUpRight,
  Bot,
  CheckCircle2,
  Cpu,
  Database,
  FileSpreadsheet,
  Layers,
  LineChart,
  Lock,
  ShieldCheck,
  Sparkles,
  Terminal,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ServicePillarSchema, type ServicePillar } from "@/types";

interface PillarWithIcon extends ServicePillar {
  icon: LucideIcon;
}

const rawPillars: ServicePillar[] = [
  {
    id: "sales-sdr",
    badge: "Pilar 01 · Adquisición Autónoma",
    title: "Agentes SDR & Automatización Comercial",
    description:
      "Sistemas conversacionales multi-etapa que califican prospectos en tiempo real, enriquecen datos de CRM y agendan reuniones comerciales con precisión determinista.",
    capabilities: [
      "Calificación B2B contextual 24/7",
      "Integración bidireccional con CRM",
      "Enrutamiento inteligente y handoff ejecutivo",
    ],
    metricLabel: "Tiempo de respuesta comercial",
    metricValue: "< 15 seg",
  },
  {
    id: "document-automation",
    badge: "Pilar 02 · Operaciones & Backoffice",
    title: "Automatización e Inteligencia Documental",
    description:
      "Pipelines de extracción estructurada sobre contratos, órdenes de compra, facturas y pólizas mediante esquemas validados con Zod y trazabilidad completa.",
    capabilities: [
      "Extracción determinista con esquemas tipados",
      "Validación cruzada y detección de anomalías",
      "Ingesta directa hacia ERP y bases relacionales",
    ],
    metricLabel: "Precisión en extracción estructurada",
    metricValue: "99.4%",
  },
  {
    id: "nl-analytics",
    badge: "Pilar 03 · Inteligencia de Negocio",
    title: "Analítica en Lenguaje Natural (Text-to-SQL)",
    description:
      "Interfaces ejecutivas que transforman consultas en español en reportes analíticos seguros de solo lectura sobre PostgreSQL y data warehouses corporativos.",
    capabilities: [
      "Consultas seguras Read-Only con guardrails SQL",
      "Visualización dinámica de KPIs y series temporales",
      "Auditoría de consultas y control de acceso granular",
    ],
    metricLabel: "Reducción en ciclo de reportería",
    metricValue: "10x más rápido",
  },
];

const validatedPillars: ServicePillar[] = rawPillars.map((pillar) =>
  ServicePillarSchema.parse(pillar)
);

const pillarIcons: Record<string, LucideIcon> = {
  "sales-sdr": Bot,
  "document-automation": FileSpreadsheet,
  "nl-analytics": LineChart,
};

const servicePillars: PillarWithIcon[] = validatedPillars.map((pillar) => ({
  ...pillar,
  icon: pillarIcons[pillar.id] ?? Cpu,
}));

const architectureGuarantees = [
  {
    icon: ShieldCheck,
    title: "Salidas Deterministas",
    detail:
      "Cada flujo de extracción e inferencia está respaldado por validación estricta de esquemas para eliminar alucinaciones operativas.",
  },
  {
    icon: Lock,
    title: "Seguridad por Diseño",
    detail:
      "Consultas analíticas en modo de solo lectura, aislamiento de credenciales y trazabilidad completa en cada transacción.",
  },
  {
    icon: Database,
    title: "Infraestructura Moderna",
    detail:
      "Arquitectura modular sobre Next.js App Router, Vercel AI SDK y Supabase PostgreSQL lista para producción empresarial.",
  },
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#090a0f] text-slate-100">
      {/* Ambient Corporate Grid & Subtle Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-15%,rgba(14,165,233,0.14),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem]"
      />

      {/* Top Navigation / Corporate Header */}
      <header className="relative z-10 border-b border-slate-800/80 bg-[#090a0f]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 shadow-inner">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold tracking-tight text-white">
                  HARNEX
                </span>
                <span className="rounded border border-slate-700/80 bg-slate-900/90 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-slate-400">
                  harnex.cl
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Harnex - Soluciones de IA Aplicada
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a
              href="#pilares"
              className="transition-colors hover:text-cyan-400"
            >
              Pilares de Servicio
            </a>
            <a
              href="#arquitectura"
              className="transition-colors hover:text-cyan-400"
            >
              Arquitectura & Seguridad
            </a>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Sistemas Operativos · Fase 0
            </span>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-16 lg:px-8 lg:pt-24">
        {/* Hero Section */}
        <section className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-950/30 px-4 py-1.5 text-xs font-medium text-cyan-300">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>Harnex | Inteligencia Artificial Aplicada</span>
          </div>

          <h1 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Ingeniería de IA determinista para{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
              operaciones críticas de negocio
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-slate-300 sm:text-lg">
            Diseñamos e implementamos arquitecturas de Inteligencia Artificial
            orientadas a resultados medibles: automatización de prospección B2B,
            procesamiento documental estructurado y analítica conversacional
            sobre datos corporativos.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#pilares"
              className={cn(
                "inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950",
                "shadow-lg shadow-cyan-500/15 transition hover:bg-cyan-400"
              )}
            >
              <span>Explorar Pilares de Servicio</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="#arquitectura"
              className={cn(
                "inline-flex items-center gap-2 rounded-lg border border-slate-700/80 bg-slate-900/70 px-5 py-3 text-sm font-medium text-slate-200",
                "transition hover:border-slate-600 hover:bg-slate-800/80"
              )}
            >
              <Terminal className="h-4 w-4 text-cyan-400" />
              <span>Estándares de Ingeniería</span>
            </a>
          </div>
        </section>

        {/* Core Service Pillars Section */}
        <section id="pilares" className="mt-24 scroll-mt-20">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-800/80 pb-6 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-cyan-400">
                Portafolio de Soluciones
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Tres pilares de Inteligencia Artificial Aplicada
              </h2>
            </div>
            <p className="max-w-md text-sm text-slate-400">
              Soluciones modulares integradas directamente en el flujo de
              trabajo comercial, operativo y ejecutivo de tu organización.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {servicePillars.map((pillar) => {
              const IconComponent = pillar.icon;
              return (
                <article
                  key={pillar.id}
                  className={cn(
                    "group relative flex flex-col justify-between rounded-2xl border border-slate-800/90 bg-slate-900/40 p-7",
                    "backdrop-blur-sm transition duration-300 hover:border-cyan-500/40 hover:bg-slate-900/70"
                  )}
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-xs text-cyan-400">
                        {pillar.badge}
                      </span>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700/80 bg-slate-950 text-cyan-300 transition-colors group-hover:border-cyan-500/40">
                        <IconComponent className="h-5 w-5" />
                      </div>
                    </div>

                    <h3 className="mt-5 text-xl font-semibold text-white">
                      {pillar.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-slate-300">
                      {pillar.description}
                    </p>

                    <ul className="mt-6 space-y-2.5 border-t border-slate-800/80 pt-5">
                      {pillar.capabilities.map((capability) => (
                        <li
                          key={capability}
                          className="flex items-start gap-2.5 text-xs text-slate-300"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                          <span>{capability}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 flex items-center justify-between rounded-xl border border-slate-800/90 bg-slate-950/70 px-4 py-3">
                    <span className="text-xs text-slate-400">
                      {pillar.metricLabel}
                    </span>
                    <span className="font-mono text-sm font-semibold text-cyan-300">
                      {pillar.metricValue}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Engineering Principles & Guardrails Section */}
        <section id="arquitectura" className="mt-24 scroll-mt-20">
          <div className="rounded-2xl border border-slate-800/90 bg-gradient-to-b from-slate-900/70 to-slate-950/90 p-8 lg:p-10">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cyan-400">
                  <Layers className="h-4 w-4" />
                  <span>Arquitectura & Guardrails de Ingeniería</span>
                </div>
                <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
                  Construido bajo estándares empresariales estrictos
                </h2>
                <p className="mt-2 text-sm text-slate-300">
                  Nuestra plataforma combina tipado estricto de extremo a
                  extremo, validación determinista de esquemas y controles de
                  acceso granulares para entornos de producción.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 font-mono text-xs text-slate-300">
                <span className="rounded-md border border-slate-700/80 bg-slate-900 px-3 py-1.5">
                  Next.js App Router
                </span>
                <span className="rounded-md border border-slate-700/80 bg-slate-900 px-3 py-1.5">
                  TypeScript Strict
                </span>
                <span className="rounded-md border border-slate-700/80 bg-slate-900 px-3 py-1.5">
                  Zod Schemas
                </span>
                <span className="rounded-md border border-slate-700/80 bg-slate-900 px-3 py-1.5">
                  Supabase & Vercel AI
                </span>
              </div>
            </div>

            <div className="mt-8 grid gap-6 border-t border-slate-800/80 pt-8 md:grid-cols-3">
              {architectureGuarantees.map((item) => {
                const GuaranteeIcon = item.icon;
                return (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-cyan-400">
                      <GuaranteeIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-slate-400">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/80 bg-[#07080c] py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-xs text-slate-400 sm:flex-row lg:px-8">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-200">Harnex</span>
            <span>·</span>
            <span>Inteligencia Artificial Aplicada</span>
          </div>
          <p className="font-mono text-[11px] text-slate-500">
            © {new Date().getFullYear()} harnex.cl · Todos los derechos
            reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
