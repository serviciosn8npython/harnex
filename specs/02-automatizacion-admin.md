# PROMPT MAESTRO — SERVICIO B2B DE AUTOMATIZACIÓN ADMINISTRATIVA

## 1. Problema operativo y dolor financiero
- Caso base: Recepción de 100+ solicitudes semanales por correo, WhatsApp o formularios.
- Fricción: Clasificación manual, registro en planillas, demoras en asignación y falta de trazabilidad de vencimientos.

## 2. Perfil del Cliente Objetivo (ICP)
- Pymes de servicios profesionales, administradoras de propiedades y empresas de soporte operativo (10-50 colaboradores).

## 3. Alcance y Entregables (MVP)
- Pipeline de ingesta (Formularios / Correos).
- Extracción estructurada: Solicitante, contacto, asunto, tipología, urgencia, identificador.
- Motor de enrutamiento por reglas deterministas y cálculo de plazos SLA.
- Notificaciones automáticas de acuse de recibo y alertas a responsables.
- Trazabilidad y panel de control operativo.

## 4. Stack Técnico
- n8n / Python para orquestación de flujos.
- Supabase (PostgreSQL) o Google Sheets / SharePoint Lists según infraestructura del cliente.
- Modelos LLM multimodales para extracción JSON determinista.

## 5. Reglas de Negocio y Límites
- IA Interpretativa: Clasificación de texto desestructurado, extracción de datos y resumen del requerimiento.
- Lógica Determinística: Reglas de enrutamiento, validación de RUT, cálculo de vencimientos y disparadores de alerta.
- Prohibiciones: La IA no autoriza pagos, no inventa datos faltantes ni modifica registros sin control de auditoría.
