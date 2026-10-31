"use client";

import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bot,
  CheckCircle2,
  Cpu,
  Database,
  Lock,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ContactModal } from "@/components/marketing/ContactModal";
import { HarnexLogo } from "@/components/ui/HarnexLogo";
import { cn } from "@/lib/utils";
import { ServicePillarSchema, type ServicePillar } from "@/types";

interface PillarWithIcon extends ServicePillar {
  icon: LucideIcon;
  defaultChallengePrompt: string;
}

const rawPillars: ServicePillar[] = [
  {
    id: "automatizacion-admin",
    badge: "Pilar 01 · Backoffice & Orquestación",
    title: "Automatización de Procesos Administrativos",
    description:
      "Pipeline inteligente de mesa de entrada para organizaciones que reciben +100 solicitudes semanales por correo, WhatsApp o formularios web.",
    painPoint:
      "Elimina la clasificación manual en planillas, demoras en asignación y falta de trazabilidad en vencimientos operativos.",
    capabilities: [
      "Mesa de entrada unificada y clasificación con IA interpretativa",
      "Orquestación de flujos en n8n / Python y validación determinista de RUT",
      "Cálculo automático de plazos SLA, alertas y acuse de recibo",
      "Trazabilidad completa en PostgreSQL, SharePoint o Google Sheets",
    ],
    stack: ["n8n", "Python", "Supabase PostgreSQL", "JSON Determinista"],
    metricLabel: "Trazabilidad y control de SLA",
    metricValue: "100% Auditable",
    ctaLabel: "Evaluar Empresa",
  },
  {
    id: "dashboards-bi-gestion",
    badge: "Pilar 02 · Business Intelligence & Finanzas",
    title: "Dashboards y Reportes de Gestión",
    description:
      "Modelado dimensional y tableros ejecutivos para conciliar pedidos comerciales, facturación emitida (SII) y notas de crédito o anulaciones.",
    painPoint:
      "Evita horas perdidas cuadrando planillas Excel y decisiones tomadas sobre cifras de ventas desconectadas de la realidad contable.",
    capabilities: [
      "Conciliación ventas vs facturación (SII) vs notas de crédito en Power BI / Excel",
      "Modelo dimensional (Hechos y Dimensiones) y Diccionario de Métricas Oficiales",
      "Medidas DAX documentadas para ingresos reales vs brutos",
      "Visualización de cascada de discrepancias y auditoría SQL / Python",
    ],
    stack: ["Power BI", "Excel / DAX", "SQL Server / PostgreSQL", "Python / Pandas"],
    metricLabel: "Cuadratura comercial-contable",
    metricValue: "0 Discrepancias",
    ctaLabel: "Evaluar Empresa",
  },
  {
    id: "asistentes-ia-comercial",
    badge: "Pilar 03 · Adquisición & Conversión B2B",
    title: "Asistentes de IA para Atención Comercial",
    description:
      "Agentes conversacionales conectados a una base de conocimiento oficial (RAG acotado) que atienden, filtran y califican prospectos en tiempo real.",
    painPoint:
      "Resuelve la pérdida de leads fuera de horario hábil, tiempos lentos de primera respuesta y consultas repetitivas que saturan al equipo.",
    capabilities: [
      "Captación y atención comercial continua 24/7 en sitio institucional",
      "Captura estructurada (Nombre, Empresa, Contacto, Requerimiento) y filtro BANT",
      "Derivación inmediata a ejecutivos humanos, agenda y webhooks (Slack / CRM)",
      "Guardrails estrictos: sin inventar precios ni prometer condiciones no autorizadas",
    ],
    stack: ["Next.js", "Vercel AI SDK", "RAG Acotado", "Supabase"],
    metricLabel: "Tiempo de primera respuesta",
    metricValue: "< 5 segundos",
    ctaLabel: "Evaluar Empresa",
  },
];

const validatedPillars: ServicePillar[] = rawPillars.map((pillar) =>
  ServicePillarSchema.parse(pillar)
);

const pillarIcons: Record<string, LucideIcon> = {
  "automatizacion-admin": Workflow,
  "dashboards-bi-gestion": BarChart3,
  "asistentes-ia-comercial": Bot,
};

const pillarPrompts: Record<string, string> = {
  "automatizacion-admin":
    "Buscamos automatizar nuestra mesa de entrada, clasificación de solicitudes y control de SLAs administrativos con n8n.",
  "dashboards-bi-gestion":
    "Necesitamos conciliar ventas comerciales vs facturación emitida y notas de crédito en un dashboard de gestión (Power BI / Excel).",
  "asistentes-ia-comercial":
    "Queremos implementar un asistente de IA comercial 24/7 para calificar prospectos y derivarlos a nuestros ejecutivos.",
};

const servicePillars: PillarWithIcon[] = validatedPillars.map((pillar) => ({
  ...pillar,
  icon: pillarIcons[pillar.id] ?? Cpu,
  defaultChallengePrompt: pillarPrompts[pillar.id] ?? "",
}));

const methodologyPrinciples = [
  {
    icon: ShieldCheck,
    tag: "Arquitectura Híbrida",
    title: "IA Interpretativa + Lógica Determinística",
    description:
      "Acotamos los modelos de lenguaje a lo que hacen mejor (comprensión lingüística, clasificación y extracción JSON), delegando cada cálculo numérico, validación de RUT, SLA y regla de negocio a código determinista.",
  },
  {
    icon: Lock,
    tag: "Gobernanza & Control",
    title: "Cero Alucinaciones Operativas",
    description:
      "Nuestros sistemas tienen prohibido inventar precios, autorizar pagos o calcular métricas financieras en memoria. Cada acción queda registrada con control de auditoría.",
  },
  {
    icon: Database,
    tag: "Integración Pragmática",
    title: "Conectado a tu Infraestructura Actual",
    description:
      "Orquestamos soluciones sobre las herramientas que tu equipo ya domina: Power BI, Excel, SharePoint, Google Sheets, n8n, PostgreSQL y CRMs corporativos.",
  },
];

export default function HomePage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
  const [selectedChallenge, setSelectedChallenge] = useState<string>("");

  const openContactModal = (prefillChallenge = "") => {
    setSelectedChallenge(prefillChallenge);
    setIsContactModalOpen(true);
  };

  useEffect(() => {
    const handleExternalOpenModal = (event: Event) => {
      const customEvent = event as CustomEvent<{ challenge?: string }>;
      openContactModal(customEvent.detail?.challenge ?? "");
    };

    window.addEventListener("harnex:open-contact-modal", handleExternalOpenModal);
    return () => {
      window.removeEventListener(
        "harnex:open-contact-modal",
        handleExternalOpenModal
      );
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#090a0f] text-slate-100">
      {/* Ambient Corporate Grid & Subtle Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(37,99,235,0.16),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem]"
      />

      {/* 1. Navbar Flotante Glassmorphism (Fixed Floating Island) */}
      <div className="fixed top-5 inset-x-0 z-50 flex justify-center pointer-events-none px-4">
        <header className="pointer-events-auto flex items-center justify-between w-full max-w-4xl px-6 py-2.5 rounded-full border border-slate-700/60 bg-slate-900/60 backdrop-blur-xl shadow-2xl shadow-black/50 transition-all duration-300">
          {/* Izquierda: Logo + Texto HARNEX */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-white transition-opacity hover:opacity-90"
          >
            <HarnexLogo className="h-8 w-8" />
            <span className="font-bold tracking-tight text-white">HARNEX</span>
          </a>

          {/* Centro: Enlaces de navegación */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#servicios"
              className="text-sm text-slate-300 hover:text-white transition-colors"
            >
              Servicios
            </a>
            <a
              href="#metodologia"
              className="text-sm text-slate-300 hover:text-white transition-colors"
            >
              Metodología
            </a>
            <a
              href="#gobernanza"
              className="text-sm text-slate-300 hover:text-white transition-colors"
            >
              Gobernanza
            </a>
          </nav>

          {/* Derecha: Botón de conversión principal */}
          <button
            type="button"
            onClick={() => openContactModal()}
            className="bg-white text-slate-950 hover:bg-slate-200 font-semibold text-xs sm:text-sm px-4 py-2 rounded-full transition-all flex items-center gap-1.5 shadow-md"
          >
            <span>Agendar diagnóstico</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </header>
      </div>

      {/* Main Content */}
      <main className="relative z-10 mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        {/* Hero Section */}
        <section className="mx-auto max-w-4xl pt-36 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-950/30 px-4 py-1.5 text-xs font-medium text-blue-300">
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            <span>Harnex | Inteligencia Artificial Aplicada B2B</span>
          </div>

          <h1 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Soluciones de IA y Automatización para{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              Operaciones Críticas
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-slate-300 sm:text-lg">
            Eliminamos cuellos de botella administrativos, conciliamos tu
            información comercial-contable y automatizamos la captación de
            clientes mediante arquitecturas deterministas y gobernanza de datos.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => openContactModal()}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-medium text-white",
                "shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-500"
              )}
            >
              <span>Agendar diagnóstico</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() =>
                openContactModal(
                  "Deseo evaluar qué procesos de mi empresa tienen mayor retorno al automatizarse con Harnex."
                )
              }
              className={cn(
                "inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-6 py-3.5 text-sm font-medium text-slate-200",
                "transition-all hover:border-slate-700 hover:bg-slate-800/90 hover:text-white"
              )}
            >
              <span>Evaluar Empresa</span>
              <ArrowRight className="h-4 w-4 text-blue-400" />
            </button>
          </div>
        </section>

        {/* 3. Sección de los 3 Pilares de Servicio (#servicios) */}
        <section id="servicios" className="mt-24 scroll-mt-28">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-800/80 pb-6 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-blue-400">
                Arquitectura de Soluciones B2B
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Tres pilares diseñados para impacto operativo inmediato
              </h2>
            </div>
            <p className="max-w-md text-sm text-slate-400">
              Cada servicio combina extracción estructurada e inteligencia
              artificial con reglas de negocio deterministas y auditables.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {servicePillars.map((pillar) => {
              const IconComponent = pillar.icon;
              return (
                <article
                  key={pillar.id}
                  className={cn(
                    "group relative flex flex-col justify-between rounded-2xl border border-slate-800/90 bg-slate-900/50 p-7",
                    "backdrop-blur-sm transition duration-300 hover:border-blue-500/40 hover:bg-slate-900/80 shadow-xl"
                  )}
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-xs text-blue-400">
                        {pillar.badge}
                      </span>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-950 text-blue-400 transition-colors group-hover:border-blue-500/40">
                        <IconComponent className="h-5 w-5" />
                      </div>
                    </div>

                    <h3 className="mt-5 text-xl font-semibold text-white">
                      {pillar.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-slate-300">
                      {pillar.description}
                    </p>

                    <div className="mt-4 rounded-xl border border-slate-800/80 bg-slate-950/60 p-3.5">
                      <p className="text-xs leading-relaxed text-slate-400">
                        <span className="font-semibold text-slate-200">
                          Impacto directo:{" "}
                        </span>
                        {pillar.painPoint}
                      </p>
                    </div>

                    <ul className="mt-6 space-y-2.5 border-t border-slate-800/80 pt-5">
                      {pillar.capabilities.map((capability) => (
                        <li
                          key={capability}
                          className="flex items-start gap-2.5 text-xs text-slate-300"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                          <span>{capability}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Stack tags */}
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {pillar.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-slate-800 bg-slate-950/80 px-2.5 py-1 font-mono text-[11px] text-slate-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 space-y-3 border-t border-slate-800/80 pt-5">
                    <div className="flex items-center justify-between rounded-xl border border-slate-800/90 bg-slate-950/70 px-4 py-2.5">
                      <span className="text-xs text-slate-400">
                        {pillar.metricLabel}
                      </span>
                      <span className="font-mono text-xs font-semibold text-blue-300">
                        {pillar.metricValue}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        openContactModal(pillar.defaultChallengePrompt)
                      }
                      className="w-full rounded-xl border border-slate-700/80 bg-slate-800/60 hover:bg-blue-600 hover:border-blue-500 py-2.5 px-4 text-xs sm:text-sm font-medium text-slate-200 hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                      <span>{pillar.ctaLabel}</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Sección Metodología & Gobernanza (#metodologia) */}
        <section id="metodologia" className="mt-24 scroll-mt-28">
          <div className="rounded-2xl border border-slate-800/90 bg-gradient-to-b from-slate-900/75 to-slate-950/95 p-8 lg:p-10 shadow-2xl">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <p className="font-mono text-xs uppercase tracking-widest text-blue-400">
                  Metodología & Gobernanza Técnica
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
                  Rigurosidad de ingeniería donde la IA se encuentra con tus datos
                </h2>
                <p className="mt-2 text-sm text-slate-300">
                  Separamos estrictamente la capa de interpretación lingüística
                  de las reglas financieras, contables y operativas de tu
                  organización.
                </p>
              </div>

              <div className="flex shrink-0 flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => openContactModal()}
                  className="rounded-xl bg-blue-600 hover:bg-blue-500 px-5 py-3 text-sm font-medium text-white transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20"
                >
                  <span>Agendar diagnóstico</span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div
              id="gobernanza"
              className="mt-8 grid scroll-mt-28 gap-6 border-t border-slate-800/80 pt-8 md:grid-cols-3"
            >
              {methodologyPrinciples.map((item) => {
                const PrincipleIcon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-xl border border-slate-800/70 bg-slate-950/50 p-5"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-blue-400">
                        {item.tag}
                      </span>
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-blue-400">
                        <PrincipleIcon className="h-4 w-4" />
                      </div>
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-400">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* 4. Footer Corporativo Completo */}
      <footer className="relative z-10 border-t border-slate-800/90 bg-[#06070b] pt-14 pb-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 pb-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Columna 1: Identidad Corporativa */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <HarnexLogo className="h-8 w-8" />
                <span className="text-lg font-semibold tracking-tight text-white">
                  HARNEX
                </span>
              </div>
              <p className="text-sm font-medium text-slate-200">
                Harnex — Soluciones de IA y Automatización para Operaciones
                Críticas.
              </p>
              <p className="text-xs leading-relaxed text-slate-400">
                Ingeniería de software, automatización de flujos y analítica de
                gestión con resultados medibles para empresas en Chile y
                Latinoamérica.
              </p>
            </div>

            {/* Columna 2: Soluciones (Los 3 pilares) */}
            <div>
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-200">
                Soluciones
              </h3>
              <ul className="mt-4 space-y-2.5 text-xs text-slate-400">
                <li>
                  <button
                    type="button"
                    onClick={() =>
                      openContactModal(
                        pillarPrompts["automatizacion-admin"]
                      )
                    }
                    className="text-left transition-colors hover:text-blue-400"
                  >
                    Automatización de Procesos Administrativos
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() =>
                      openContactModal(pillarPrompts["dashboards-bi-gestion"])
                    }
                    className="text-left transition-colors hover:text-blue-400"
                  >
                    Dashboards y Reportes de Gestión
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() =>
                      openContactModal(
                        pillarPrompts["asistentes-ia-comercial"]
                      )
                    }
                    className="text-left transition-colors hover:text-blue-400"
                  >
                    Asistentes de IA para Atención Comercial
                  </button>
                </li>
              </ul>
            </div>

            {/* Columna 3: Enfoque Técnico */}
            <div>
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-200">
                Enfoque Técnico
              </h3>
              <ul className="mt-4 space-y-2.5 text-xs text-slate-400">
                <li>IA Determinista & Validación de Esquemas</li>
                <li>Gobernanza de Datos & Trazabilidad</li>
                <li>Conciliación Comercial-Contable (DAX / SQL)</li>
                <li>Orquestación de Flujos y Control de SLAs</li>
              </ul>
            </div>

            {/* Columna 4: Contacto */}
            <div>
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-200">
                Contacto
              </h3>
              <ul className="mt-4 space-y-3 text-xs text-slate-400">
                <li className="flex items-center gap-2.5">
                  <MapPin className="h-4 w-4 shrink-0 text-blue-400" />
                  <span>Santiago, Chile</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 shrink-0 text-blue-400" />
                  <a
                    href="mailto:contacto@harnex.cl"
                    className="transition-colors hover:text-white"
                  >
                    contacto@harnex.cl
                  </a>
                </li>
              </ul>
              <div className="mt-5">
                <button
                  type="button"
                  onClick={() => openContactModal()}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs font-medium text-slate-200 transition-colors hover:border-blue-500/50 hover:text-white"
                >
                  <span>Agendar diagnóstico</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-blue-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Barra de copyright */}
          <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-800/80 pt-6 text-xs text-slate-500 sm:flex-row">
            <p>© 2026 Harnex.cl. Todos los derechos reservados.</p>
            <p className="font-mono text-[11px] text-slate-500">
              Santiago, Chile · contacto@harnex.cl
            </p>
          </div>
        </div>
      </footer>

      {/* 2. Modal Interactivo de Contacto */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        initialChallenge={selectedChallenge}
      />
    </div>
  );
}
