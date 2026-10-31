import { z } from "zod";

export const ServicePillarSchema = z.object({
  id: z.string(),
  badge: z.string(),
  title: z.string(),
  description: z.string(),
  painPoint: z.string(),
  capabilities: z.array(z.string()),
  stack: z.array(z.string()),
  metricLabel: z.string(),
  metricValue: z.string(),
  ctaLabel: z.string(),
});

export type ServicePillar = z.infer<typeof ServicePillarSchema>;

export const ContactLeadSchema = z.object({
  firstName: z.string().min(2, "Ingresa tu nombre"),
  lastName: z.string().min(2, "Ingresa tu apellido"),
  company: z.string().min(2, "Ingresa el nombre de tu empresa"),
  email: z.string().email("Ingresa un email corporativo válido"),
  countryCode: z.string().default("+56 🇨🇱"),
  phone: z
    .string()
    .regex(/^[0-9\s]{7,12}$/, "Ingresa un número telefónico válido (solo dígitos)"),
  challenge: z
    .string()
    .min(10, "Describe brevemente el desafío operativo que buscas resolver"),
});

export type ContactLeadInput = z.infer<typeof ContactLeadSchema>;

export const DemoExtractionSchema = z.object({
  ticketId: z.string(),
  solicitante: z.string(),
  empresa: z.string(),
  rutValidado: z.string(),
  tipologia: z.enum([
    "FACTURACION_NC",
    "SOPORTE_OPERATIVO",
    "EVALUACION_COMERCIAL",
    "MESA_DE_ENTRADA",
  ]),
  urgencia: z.enum(["ALTA", "MEDIA", "BAJA"]),
  slaObjetivoHoras: z.number(),
  responsableAsignado: z.string(),
  resumenEjecutivo: z.string(),
});

export type DemoExtraction = z.infer<typeof DemoExtractionSchema>;

export const ChatActionTypeSchema = z.enum([
  "none",
  "demo_extraction",
  "lead_capture",
  "booking_link",
]);

export type ChatActionType = z.infer<typeof ChatActionTypeSchema>;

export const ChatMessageInputSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1),
});

export const ChatRequestSchema = z.object({
  messages: z.array(ChatMessageInputSchema).min(1),
});

export type ChatRequestPayload = z.infer<typeof ChatRequestSchema>;

export const ChatResponseSchema = z.object({
  reply: z.string(),
  actionType: ChatActionTypeSchema,
  structuredDemo: DemoExtractionSchema.optional(),
  bookingUrl: z.string().optional(),
});

export type ChatResponsePayload = z.infer<typeof ChatResponseSchema>;
