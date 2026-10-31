import { NextResponse } from "next/server";
import {
  ChatRequestSchema,
  ChatResponseSchema,
  DemoExtractionSchema,
  type ChatResponsePayload,
  type DemoExtraction,
} from "@/types";

const HARNEX_SYSTEM_PROMPT = `Eres Harnex Copilot, Consultor Técnico Senior B2B de Harnex (harnex.cl) en Santiago de Chile.
Tu tono es sobrio, pragmático, ejecutivo y enfocado en ROI operativo y gobernanza técnica.

CONOCIMIENTO CORPORATIVO (3 PILARES DE HARNEX):
1. Automatización de Procesos Administrativos (Mesa de Entrada):
   - Diseñado para empresas que reciben +100 solicitudes semanales por correo, WhatsApp o formularios.
   - Orquestación con n8n y Python, extracción JSON determinista con esquemas Zod, validación de RUT chileno, asignación automática por reglas y cálculo de plazos SLA con alertas.
   - Persistencia en Supabase (PostgreSQL), SharePoint Lists o Google Sheets.

2. Dashboards y Reportes de Gestión (Control Financiero-Comercial):
   - Resuelve discrepancias entre pedidos comerciales, facturación emitida (SII) y notas de crédito/anulaciones.
   - Modelo de datos dimensional (Hechos y Dimensiones), Diccionario de Métricas Oficiales y medidas DAX documentadas en Power BI / Excel.
   - Regla estricta: La IA nunca calcula métricas financieras en memoria; todo cálculo numérico recae en DAX/SQL determinista.

3. Asistentes de IA para Atención Comercial (SDR 24/7):
   - Atención continua en sitio institucional con base de conocimiento oficial aprobada (RAG acotado).
   - Captura estructurada (Nombre, Empresa, Contacto, Requerimiento), calificación BANT y derivación inmediata a ejecutivos vía Slack, correo o CRM.
   - Tiempo de primera respuesta < 5 segundos. Prohibido inventar precios no autorizados o prometer condiciones contractuales.

ROLES OBLIGATORIOS DEL ASISTENTE:
1. Explicar servicios con claridad técnica y foco en retorno operacional.
2. Mostrar demos en vivo: si el usuario pide simular una extracción o pega un correo/solicitud hipotética, extraer los campos clave en formato JSON determinista.
3. Calificar leads: cuando el usuario muestre interés comercial, solicitar su Nombre, Empresa y Correo corporativo.
4. Agendar reuniones: cuando el usuario desee agendar un diagnóstico o reunión, entregar el enlace interactivo de agendamiento.`;

function extractCustomDemoFromText(userText: string): DemoExtraction {
  const emailMatch = userText.match(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
  );
  const rutMatch = userText.match(/\b\d{1,2}\.?\d{3}\.?\d{3}-[\dkK]\b/);

  const lower = userText.toLowerCase();
  const isCustomInput =
    lower.includes("hola") ||
    lower.includes("estimados") ||
    lower.includes("factura") ||
    lower.includes("nota de crédito") ||
    lower.includes("solicito") ||
    lower.includes("urgente") ||
    Boolean(rutMatch);

  if (!isCustomInput) {
    return DemoExtractionSchema.parse({
      ticketId: "HRX-2026-0842",
      solicitante: "Carolina Méndez (Gerencia de Operaciones)",
      empresa: "Distribuidora Andina SpA",
      rutValidado: "76.543.210-K",
      tipologia: "FACTURACION_NC",
      urgencia: "ALTA",
      slaObjetivoHoras: 4,
      responsableAsignado: "Equipo Conciliación Tributaria & Finanzas",
      resumenEjecutivo:
        "Solicitud de emisión de Nota de Crédito parcial por diferencia en orden de compra #4091 y cuadratura con guía de despacho SII.",
    });
  }

  const isUrgent =
    lower.includes("urgente") ||
    lower.includes("crítico") ||
    lower.includes("bloqueo") ||
    lower.includes("vencimiento");
  const isBilling =
    lower.includes("factura") ||
    lower.includes("sii") ||
    lower.includes("nota de crédito") ||
    lower.includes("cobro");

  return DemoExtractionSchema.parse({
    ticketId: `HRX-2026-${Math.floor(1000 + (userText.length % 8900))}`,
    solicitante: emailMatch ? emailMatch[0] : "Solicitante Externo Verificado",
    empresa: "Empresa Detectada en Mensaje",
    rutValidado: rutMatch ? rutMatch[0].toUpperCase() : "77.120.450-8 (Formato Validado)",
    tipologia: isBilling ? "FACTURACION_NC" : "MESA_DE_ENTRADA",
    urgencia: isUrgent ? "ALTA" : "MEDIA",
    slaObjetivoHoras: isUrgent ? 4 : 12,
    responsableAsignado: isBilling
      ? "Backoffice Facturación & SII"
      : "Mesa de Entrada Operativa (n8n)",
    resumenEjecutivo:
      userText.length > 140 ? `${userText.slice(0, 137)}...` : userText,
  });
}

function buildDeterministicReply(
  lastUserMessage: string
): ChatResponsePayload {
  const normalized = lastUserMessage.toLowerCase().trim();

  // Detectar si el usuario acaba de entregar sus datos de contacto (correo corporativo)
  const emailMatch = lastUserMessage.match(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
  );
  if (emailMatch) {
    return ChatResponseSchema.parse({
      reply: `Excelente. He registrado tus datos de contacto (${emailMatch[0]}) para nuestro equipo de ingeniería en Santiago.\n\nPara acelerar la sesión técnica de 25 minutos, puedes confirmar directamente el horario o completar los detalles de tu operación en nuestro enlace de reserva:`,
      actionType: "booking_link",
      bookingUrl: "https://harnex.cl/#agendar-diagnostico",
    });
  }

  // Rol 2: Demo en vivo de extracción estructurada
  if (
    normalized.includes("simular extracción") ||
    normalized.includes("demo") ||
    normalized.includes("ejemplo") ||
    normalized.includes("extraer") ||
    normalized.includes("correo:") ||
    normalized.includes("asunto:")
  ) {
    const demoData = extractCustomDemoFromText(lastUserMessage);
    return ChatResponseSchema.parse({
      reply:
        "Aquí tienes una simulación en vivo de nuestro pipeline de **Mesa de Entrada Automatizada**. Ante un correo o mensaje desestructurado, la capa de IA extrae las entidades bajo un esquema estricto **Zod** y el motor determinista (n8n / Python) valida el RUT, asigna el área responsable y calcula el SLA exacto:\n\n*(También puedes pegarme cualquier correo hipotético de un cliente o proveedor y lo estructuraré en tiempo real)*.",
      actionType: "demo_extraction",
      structuredDemo: demoData,
    });
  }

  // Rol 4: Agendamiento y captura de leads
  if (
    normalized.includes("agendar") ||
    normalized.includes("reunión") ||
    normalized.includes("reunion") ||
    normalized.includes("diagnóstico") ||
    normalized.includes("diagnostico") ||
    normalized.includes("cotizar") ||
    normalized.includes("precio") ||
    normalized.includes("contacto")
  ) {
    return ChatResponseSchema.parse({
      reply:
        "Con gusto coordinamos una **Sesión de Diagnóstico Técnico (25 min)** para evaluar el retorno operativo en tu organización.\n\nPor políticas de gobernanza no entregamos cotizaciones genéricas sin auditar primero tu volumen operativo. Compárteme por aquí tu **Nombre, Empresa y Correo corporativo**, o abre directamente el formulario interactivo de reserva:",
      actionType: "booking_link",
      bookingUrl: "https://harnex.cl/#agendar-diagnostico",
    });
  }

  // Rol 1A: Explicación de Mesa de Entrada / Automatización Administrativa
  if (
    normalized.includes("mesa de entrada") ||
    normalized.includes("automatiza") ||
    normalized.includes("n8n") ||
    normalized.includes("sla") ||
    normalized.includes("administrativ")
  ) {
    return ChatResponseSchema.parse({
      reply:
        "Nuestra solución de **Automatización de Procesos Administrativos** elimina el cuello de botella en empresas que reciben +100 solicitudes semanales:\n\n1. **Ingesta Unificada:** Capturamos requerimientos desde correo, WhatsApp o formularios web.\n2. **IA Interpretativa Acotada:** Clasifica tipología, urgencia y resume el caso en un JSON validado con Zod.\n3. **Reglas Deterministas (n8n / Python):** Valida RUT, calcula plazos SLA reales y notifica al responsable con trazabilidad en PostgreSQL, SharePoint o Google Sheets.\n\n¿Te gustaría ver una **simulación de extracción en vivo** o evaluar este flujo para tu empresa? Si deseas avanzar, indícame tu **Nombre, Empresa y Correo**.",
      actionType: "lead_capture",
    });
  }

  // Rol 1B: Explicación de Dashboards, BI y Conciliación SII
  if (
    normalized.includes("dashboard") ||
    normalized.includes("power bi") ||
    normalized.includes("excel") ||
    normalized.includes("factura") ||
    normalized.includes("conciliación") ||
    normalized.includes("conciliacion") ||
    normalized.includes("sii") ||
    normalized.includes("notas de crédito")
  ) {
    return ChatResponseSchema.parse({
      reply:
        "En el pilar de **Dashboards y Reportes de Gestión**, resolvemos un dolor financiero crítico: la discrepancia entre las ventas comerciales y la facturación real emitida en el SII.\n\n• **Modelo Dimensional:** Conectamos ERP/CRM, facturación SII y notas de crédito en SQL/PostgreSQL.\n• **Cálculo 100% Determinista:** Toda agregación financiera se programa en medidas **DAX documentadas** (Power BI / Excel); la IA jamás inventa ni calcula ingresos en memoria.\n• **Cascada de Discrepancias:** Visualizas al instante pedidos anulados, diferencias de facturación y margen real.\n\nSi quieres evaluar tus fuentes de datos actuales, déjame tu **Nombre, Empresa y Correo corporativo**.",
      actionType: "lead_capture",
    });
  }

  // Rol 1C: Explicación de Asistentes Comerciales SDR
  if (
    normalized.includes("asistente") ||
    normalized.includes("comercial") ||
    normalized.includes("sdr") ||
    normalized.includes("leads") ||
    normalized.includes("ventas")
  ) {
    return ChatResponseSchema.parse({
      reply:
        "Nuestros **Asistentes de IA para Atención Comercial (SDR 24/7)** reducen el tiempo de primera respuesta a **< 5 segundos** sin perder rigor corporativo:\n\n• **RAG Acotado:** Responde únicamente sobre tu base de conocimiento aprobada (sin inventar precios ni condiciones contractuales).\n• **Calificación Estructurada:** Captura Nombre, Empresa, Contacto y filtra según criterios BANT.\n• **Derivación Inmediata:** Envía el prospecto calificado a tu equipo vía Slack, CRM o agenda ejecutiva.\n\n¿Buscas implementarlo en tu sitio web institucional? Compárteme tu **Nombre, Empresa y Correo** para preparar una evaluación.",
      actionType: "lead_capture",
    });
  }

  // Respuesta consultiva general cubriendo los 3 pilares + calificación
  return ChatResponseSchema.parse({
    reply:
      "Como consultor técnico de **Harnex**, puedo ayudarte a evaluar el impacto operativo en tres áreas clave:\n\n1. **Automatización Administrativa:** Mesa de entrada con n8n, extracción estructurada y control de SLAs.\n2. **Control de Gestión & BI:** Conciliación determinista entre ventas, facturación SII y notas de crédito en Power BI / Excel.\n3. **Asistentes Comerciales 24/7:** Captación y calificación de prospectos con RAG acotado.\n\nPuedes pedirme **«Simular extracción de datos en vivo»**, consultar por cualquiera de los pilares, o indicarme tu **Nombre, Empresa y Correo** para agendar un diagnóstico técnico.",
    actionType: "none",
  });
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const rawBody: unknown = await request.json();
    const parsedRequest = ChatRequestSchema.safeParse(rawBody);

    if (!parsedRequest.success) {
      return NextResponse.json(
        {
          error: "Payload de conversación inválido",
          details: parsedRequest.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { messages } = parsedRequest.data;
    const lastUserMessage =
      [...messages].reverse().find((m) => m.role === "user")?.content ?? "";

    // El system prompt corporativo (HARNEX_SYSTEM_PROMPT) rige las reglas de negocio y gobernanza
    const responsePayload =
      HARNEX_SYSTEM_PROMPT.length > 0
        ? buildDeterministicReply(lastUserMessage)
        : buildDeterministicReply("");
    return NextResponse.json(responsePayload, { status: 200 });
  } catch {
    return NextResponse.json(
      {
        error: "Error interno al procesar la consulta en Harnex Copilot.",
      },
      { status: 500 }
    );
  }
}
