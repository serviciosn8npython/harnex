"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Calendar,
  CheckCircle2,
  Code2,
  Loader2,
  Minimize2,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { HarnexLogo } from "@/components/ui/HarnexLogo";
import { cn } from "@/lib/utils";
import {
  ChatResponseSchema,
  type ChatActionType,
  type DemoExtraction,
} from "@/types";

interface ChatEntry {
  id: string;
  role: "user" | "assistant";
  content: string;
  actionType?: ChatActionType;
  structuredDemo?: DemoExtraction;
  bookingUrl?: string;
}

const QUICK_PROMPTS: readonly string[] = [
  "¿Cómo automatizan la mesa de entrada?",
  "Simular extracción de datos en vivo",
  "Agendar reunión de diagnóstico",
] as const;

const INITIAL_ASSISTANT_MESSAGE: ChatEntry = {
  id: "welcome-msg",
  role: "assistant",
  content:
    "Hola. Soy **Harnex Copilot**, consultor técnico de IA y automatización B2B.\n\nPuedo explicarte nuestros 3 pilares operativos, ejecutar una **demo de extracción estructurada en vivo** o coordinar un diagnóstico para tu empresa.",
  actionType: "none",
};

export function HarnexChatWidget() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(true);
  const [messages, setMessages] = useState<ChatEntry[]>([
    INITIAL_ASSISTANT_MESSAGE,
  ]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isLoading]);

  const sendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) {
      return;
    }

    const userEntry: ChatEntry = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmed,
    };

    const updatedHistory = [...messages, userEntry];
    setMessages(updatedHistory);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedHistory.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const rawData: unknown = await response.json();
      const parsed = ChatResponseSchema.safeParse(rawData);

      if (parsed.success) {
        const assistantEntry: ChatEntry = {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: parsed.data.reply,
          actionType: parsed.data.actionType,
          structuredDemo: parsed.data.structuredDemo,
          bookingUrl: parsed.data.bookingUrl,
        };
        setMessages((prev) => [...prev, assistantEntry]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `assistant-fallback-${Date.now()}`,
            role: "assistant",
            content:
              "Recibí tu consulta. Para darte una respuesta técnica precisa o agendar un diagnóstico, compárteme tu Nombre, Empresa y Correo corporativo.",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-err-${Date.now()}`,
          role: "assistant",
          content:
            "Hubo una interrupción temporal de conexión. Puedes intentar nuevamente o agendar directamente desde el botón «Agendar diagnóstico».",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage(inputValue);
  };

  const handleOpenBookingModal = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("harnex:open-contact-modal", {
          detail: {
            challenge:
              "Solicito agendar una reunión de diagnóstico técnico iniciada desde Harnex Copilot.",
          },
        })
      );
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Ventana de Chat Desplegable */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Asistente Comercial Inteligente Harnex Copilot"
          className="mb-3 w-96 h-[540px] max-w-[calc(100vw-2rem)] rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
        >
          {/* Header del Chat */}
          <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/90 px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <HarnexLogo className="h-8 w-8" />
                <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full border border-slate-950 bg-emerald-500" />
                </span>
              </div>
              <div>
                <h3 className="text-sm font-semibold tracking-tight text-white">
                  Harnex Copilot
                </h3>
                <p className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-400">
                  <span>En línea | Demo Activa</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Minimizar ventana de chat"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
              >
                <Minimize2 className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar ventana de chat"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Cuerpo de Mensajes */}
          <div className="flex-1 space-y-3.5 overflow-y-auto p-4 text-xs leading-relaxed">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex flex-col",
                  msg.role === "user" ? "items-end" : "items-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[88%] rounded-2xl px-3.5 py-2.5 whitespace-pre-line",
                    msg.role === "user"
                      ? "rounded-br-sm bg-blue-600 text-white shadow-md shadow-blue-950/30"
                      : "rounded-bl-sm border border-slate-800 bg-slate-950/90 text-slate-200"
                  )}
                >
                  {msg.content}

                  {/* Salida estructurada JSON para la Demo en Vivo */}
                  {msg.structuredDemo && (
                    <div className="mt-3 rounded-xl border border-cyan-500/30 bg-slate-900/95 p-3 font-mono text-[10px] text-slate-200">
                      <div className="mb-2 flex items-center justify-between border-b border-slate-800 pb-1.5 text-[10px] text-cyan-400">
                        <span className="flex items-center gap-1 font-semibold">
                          <Code2 className="h-3.5 w-3.5" />
                          JSON Determinista (Zod)
                        </span>
                        <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 text-[9px] text-emerald-300">
                          SLA: {msg.structuredDemo.slaObjetivoHoras}h
                        </span>
                      </div>
                      <dl className="space-y-1 text-[10px]">
                        <div className="flex justify-between gap-2">
                          <dt className="text-slate-400">ticket_id:</dt>
                          <dd className="text-cyan-300">
                            {msg.structuredDemo.ticketId}
                          </dd>
                        </div>
                        <div className="flex justify-between gap-2">
                          <dt className="text-slate-400">rut_validado:</dt>
                          <dd className="text-emerald-300">
                            {msg.structuredDemo.rutValidado}
                          </dd>
                        </div>
                        <div className="flex justify-between gap-2">
                          <dt className="text-slate-400">tipologia:</dt>
                          <dd className="text-amber-300">
                            {msg.structuredDemo.tipologia}
                          </dd>
                        </div>
                        <div className="flex justify-between gap-2">
                          <dt className="text-slate-400">urgencia:</dt>
                          <dd className="font-semibold text-rose-400">
                            {msg.structuredDemo.urgencia}
                          </dd>
                        </div>
                        <div className="pt-1 border-t border-slate-800/80">
                          <dt className="text-slate-400">area_destino:</dt>
                          <dd className="text-slate-200">
                            {msg.structuredDemo.responsableAsignado}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  )}

                  {/* Acción interactiva de agendamiento */}
                  {msg.actionType === "booking_link" && (
                    <div className="mt-3 pt-2 border-t border-slate-800">
                      <button
                        type="button"
                        onClick={handleOpenBookingModal}
                        className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-3 py-2 text-xs font-semibold text-slate-950 shadow-md transition hover:opacity-95"
                      >
                        <Calendar className="h-3.5 w-3.5" />
                        <span>Abrir Reserva de Diagnóstico</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <div className="flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-950/80 px-3.5 py-2">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-cyan-400" />
                  <span>Procesando con guardrails deterministas...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chips de inicio rápido (Quick Prompts) */}
          <div className="border-t border-slate-800/80 bg-slate-950/60 px-3 py-2">
            <p className="mb-1.5 flex items-center gap-1 text-[10px] font-medium text-slate-400">
              <Sparkles className="h-3 w-3 text-cyan-400" />
              <span>Consultas rápidas:</span>
            </p>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  disabled={isLoading}
                  onClick={() => void sendMessage(prompt)}
                  className="rounded-full border border-slate-700/80 bg-slate-900 px-2.5 py-1 text-[11px] text-slate-300 transition-colors hover:border-cyan-500/50 hover:bg-slate-800 hover:text-white disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input de Mensaje */}
          <form
            onSubmit={handleFormSubmit}
            className="flex items-center gap-2 border-t border-slate-800 bg-slate-950 px-3 py-2.5"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Escribe tu consulta o pega un correo de prueba..."
              className="flex-1 rounded-xl border border-slate-800 bg-slate-900/90 px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              aria-label="Enviar mensaje"
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white transition-colors hover:bg-blue-500 disabled:opacity-40"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Botón Flotante y Tooltip Emergente */}
      <div className="flex items-center gap-3">
        {!isOpen && showTooltip && (
          <div className="group relative flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/95 px-3.5 py-2 text-xs font-medium text-slate-200 shadow-xl backdrop-blur-md">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="text-left hover:text-white transition-colors"
            >
              ¿Conversamos sobre tu operación?
            </button>
            <button
              type="button"
              onClick={() => setShowTooltip(false)}
              aria-label="Ocultar sugerencia"
              className="ml-1 text-slate-500 hover:text-slate-300"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Abrir asistente inteligente Harnex Copilot"
          aria-expanded={isOpen}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-cyan-500/40 bg-slate-900 shadow-2xl shadow-cyan-950/60 transition-transform duration-200 hover:scale-105"
        >
          {/* Pulso de actividad sutil */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full bg-cyan-500/20 animate-ping"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5"
          >
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-slate-950 bg-emerald-400" />
          </span>
          <HarnexLogo className="relative z-10 h-9 w-9" />
        </button>
      </div>
    </div>
  );
}
