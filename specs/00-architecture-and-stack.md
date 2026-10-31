# 00 - Architecture and Stack Specification

## 1. Project Overview
- **Project Name:** Harnex
- **Domain:** harnex.cl
- **Goal:** Corporate website and portfolio showcase for AI development services (Sales SDR, Document Automation, and Natural Language Analytics).

## 2. Technical Stack
- **Framework:** Next.js (App Router, TypeScript)
- **Styling:** Tailwind CSS + UI components library (shadcn/ui style, Radix UI primitives)
- **Icons:** Lucide React
- **AI Integration:** Vercel AI SDK (`ai` and `@ai-sdk/openai` or equivalent provider)
- **Database & Storage:** Supabase (PostgreSQL, Supabase Auth, Supabase Storage)
- **Validation:** Zod
- **Package Manager:** pnpm (or npm)

## 3. Repository Structure Rules
- `/app`: Next.js App Router (pages, layout, route handlers)
- `/components`:
  - `/components/ui`: Primitive and reusable UI components (buttons, dialogs, inputs)
  - `/components/marketing`: Hero, features, pricing, testimonials
  - `/components/ai`: Chat widget, document dropzone, chart widgets
- `/lib`: Utility functions (db client, AI config, helpers)
- `/types`: Shared TypeScript definitions
- `/specs`: Product and technical specifications (Do not modify during code generation unless instructed)

## 4. Engineering Principles & Guardrails
- **Strict TypeScript:** No `any`. All schemas and payloads must be strictly typed.
- **Modularity:** Server Components by default; Client Components (`"use client"`) only where state, interactivity, or browser APIs are required.
- **Deterministic AI Outputs:** All structured extractions or forms must use Zod schemas.
- **Safety:** Read-only operations for dynamic analytical queries; no direct destructive DB access.

## 5. Acceptance Criteria for Phase 0 (Baseline Setup)
1. Next.js App Router initialized with TypeScript and Tailwind CSS.
2. Clean `app/page.tsx` with a minimal, dark/modern corporate placeholder for Harnex ("Harnex - Soluciones de IA Aplicada").
3. Lucide React installed and working.
4. `npm run build` (or `pnpm build`) passes with 0 errors and 0 lint warnings.
5. Absolute paths configured via `@/*` in `tsconfig.json`.
