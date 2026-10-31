# PROMPT MAESTRO — SERVICIO B2B DE ASISTENTES DE IA PARA ATENCIÓN COMERCIAL

## 1. Problema operativo y dolor financiero
- Escenarios: Pymes de servicios perdiendo leads fuera de horario, colegios en admisión, empresas B2B respondiendo precios y cobertura.
- Métricas de fricción: Tiempos de primera respuesta lentos, consultas repetitivas consumiendo horas humanas, falta de seguimiento comercial.

## 2. Perfil del Cliente Objetivo (ICP)
- Foco inicial: Colegios particulares o Pymes de servicios B2B con alto volumen de consultas y bajo riesgo regulatorio de datos sensibles.

## 3. Alcance y Entregables (MVP)
- Chat web integrado en sitio institucional.
- Base de conocimiento aprobada por el cliente (RAG acotado).
- Captura estructurada de datos (Nombre, Empresa, Contacto, Requerimiento).
- Calificación de leads y derivación a ejecutivo humano / agenda.
- Notificaciones vía webhook (Slack / Correo / CRM).

## 4. Stack Técnico
- Frontend: Next.js + Tailwind CSS.
- Motor IA: Vercel AI SDK con salidas estructuradas JSON.
- Base de datos: Supabase (PostgreSQL para persistencia de leads).

## 5. Reglas de Negocio y Límites
- IA Interpretativa: Comprensión lingüística, extracción de necesidades, tono corporativo.
- Lógica Determinística: Validación de campos, consentimiento, reglas de calificación BANT y enrutamiento.
- Prohibición estricta: Inventar precios no autorizados, prometer condiciones contractuales o simular acciones no ejecutadas.

## 6. Métricas y ROI
- Reducción del tiempo de primera respuesta a < 5 segundos.
- Tasa de calificación y captura de leads fuera de horario de oficina.
