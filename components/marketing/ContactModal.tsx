"use client";

import React, { useEffect, useId, useState } from "react";
import {
  Building,
  CheckCircle2,
  Mail,
  MessageSquare,
  Send,
  User,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ContactLeadSchema, type ContactLeadInput } from "@/types";

export interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialChallenge?: string;
}

type FieldErrors = Partial<Record<keyof ContactLeadInput, string>>;

const COUNTRY_PREFIXES = [
  { value: "+56 🇨🇱", label: "+56 🇨🇱" },
  { value: "+52 🇲🇽", label: "+52 🇲🇽" },
  { value: "+57 🇨🇴", label: "+57 🇨🇴" },
  { value: "+51 🇵🇪", label: "+51 🇵🇪" },
  { value: "+54 🇦🇷", label: "+54 🇦🇷" },
  { value: "+1 🇺🇸", label: "+1 🇺🇸" },
] as const;

export function ContactModal({
  isOpen,
  onClose,
  initialChallenge = "",
}: ContactModalProps) {
  const titleId = useId();
  const descriptionId = useId();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("+56 🇨🇱");
  const [phone, setPhone] = useState<string>("");
  const [challenge, setChallenge] = useState<string>(initialChallenge);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (initialChallenge) {
      setChallenge(initialChallenge);
    }
  }, [initialChallenge]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numericOnly = event.target.value.replace(/[^0-9\s]/g, "");
    setPhone(numericOnly);
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: undefined }));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = ContactLeadSchema.safeParse({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      company: company.trim(),
      email: email.trim(),
      countryCode,
      phone: phone.trim(),
      challenge: challenge.trim(),
    });

    if (!result.success) {
      const nextErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof ContactLeadInput | undefined;
        if (field && !nextErrors[field]) {
          nextErrors[field] = issue.message;
        }
      }
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setErrors({});
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          handleResetAndClose();
        }
      }}
    >
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl my-auto">
        {/* Botón cerrar */}
        <button
          type="button"
          onClick={handleResetAndClose}
          aria-label="Cerrar modal de contacto"
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-800 bg-slate-950/70 text-slate-400 transition-colors hover:border-slate-700 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        {isSubmitted ? (
          <div className="py-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-semibold text-white">
              Solicitud recibida correctamente
            </h3>
            <p className=" mx-auto mt-2 max-w-sm text-sm text-slate-400">
              Gracias, <span className="text-slate-200 font-medium">{firstName}</span>. Nuestro equipo de ingeniería analizará el requerimiento de{" "}
              <span className="text-slate-200 font-medium">{company}</span> y te contactará en menos de 24 horas hábiles.
            </p>
            <button
              type="button"
              onClick={handleResetAndClose}
              className="mt-6 bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-all w-full"
            >
              <span>Volver al sitio</span>
            </button>
          </div>
        ) : (
          <>
            {/* Header del modal */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 shadow-inner">
                <MessageSquare className="h-5 w-5" />
              </div>
              <h2
                id={titleId}
                className="text-xl sm:text-2xl font-semibold tracking-tight text-white"
              >
                Antes de eso, presentémonos
              </h2>
              <p
                id={descriptionId}
                className="mt-1.5 text-sm text-slate-400"
              >
                Cuéntanos un poco sobre ti y lo que estás buscando.
              </p>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
              {/* Fila 1 (2 cols): Tu nombre y Tu apellido */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-first-name"
                    className="mb-1.5 block text-xs font-medium text-slate-300"
                  >
                    Tu nombre
                  </label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <input
                      id="contact-first-name"
                      type="text"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        if (errors.firstName) {
                          setErrors((prev) => ({ ...prev, firstName: undefined }));
                        }
                      }}
                      placeholder="Ej. Andrés"
                      className={cn(
                        "w-full rounded-xl border bg-slate-950/90 py-2.5 pl-10 pr-3.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2",
                        errors.firstName
                          ? "border-rose-500/70 focus:ring-rose-500/40"
                          : "border-slate-800 focus:border-blue-500 focus:ring-blue-500/20"
                      )}
                    />
                  </div>
                  {errors.firstName && (
                    <p className="mt-1 text-xs text-rose-400">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-last-name"
                    className="mb-1.5 block text-xs font-medium text-slate-300"
                  >
                    Tu apellido
                  </label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <input
                      id="contact-last-name"
                      type="text"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                        if (errors.lastName) {
                          setErrors((prev) => ({ ...prev, lastName: undefined }));
                        }
                      }}
                      placeholder="Ej. Valdés"
                      className={cn(
                        "w-full rounded-xl border bg-slate-950/90 py-2.5 pl-10 pr-3.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2",
                        errors.lastName
                          ? "border-rose-500/70 focus:ring-rose-500/40"
                          : "border-slate-800 focus:border-blue-500 focus:ring-blue-500/20"
                      )}
                    />
                  </div>
                  {errors.lastName && (
                    <p className="mt-1 text-xs text-rose-400">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Fila 2: Nombre de la empresa */}
              <div>
                <label
                  htmlFor="contact-company"
                  className="mb-1.5 block text-xs font-medium text-slate-300"
                >
                  Nombre de la empresa
                </label>
                <div className="relative">
                  <Building className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    id="contact-company"
                    type="text"
                    value={company}
                    onChange={(e) => {
                      setCompany(e.target.value);
                      if (errors.company) {
                        setErrors((prev) => ({ ...prev, company: undefined }));
                      }
                    }}
                    placeholder="Ej. Inversiones Cordillera SpA"
                    className={cn(
                      "w-full rounded-xl border bg-slate-950/90 py-2.5 pl-10 pr-3.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2",
                      errors.company
                        ? "border-rose-500/70 focus:ring-rose-500/40"
                        : "border-slate-800 focus:border-blue-500 focus:ring-blue-500/20"
                    )}
                  />
                </div>
                {errors.company && (
                  <p className="mt-1 text-xs text-rose-400">{errors.company}</p>
                )}
              </div>

              {/* Fila 3: Tu email corporativo */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-1.5 block text-xs font-medium text-slate-300"
                >
                  Tu email corporativo
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) {
                        setErrors((prev) => ({ ...prev, email: undefined }));
                      }
                    }}
                    placeholder="nombre@empresa.cl"
                    className={cn(
                      "w-full rounded-xl border bg-slate-950/90 py-2.5 pl-10 pr-3.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2",
                      errors.email
                        ? "border-rose-500/70 focus:ring-rose-500/40"
                        : "border-slate-800 focus:border-blue-500 focus:ring-blue-500/20"
                    )}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-rose-400">{errors.email}</p>
                )}
              </div>

              {/* Fila 4: Teléfono con prefijo +56 🇨🇱 e input numérico */}
              <div>
                <label
                  htmlFor="contact-phone"
                  className="mb-1.5 block text-xs font-medium text-slate-300"
                >
                  Teléfono
                </label>
                <div className="flex gap-2">
                  <select
                    aria-label="Prefijo telefónico de país"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="w-28 shrink-0 rounded-xl border border-slate-800 bg-slate-950/90 px-3 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    {COUNTRY_PREFIXES.map((prefix) => (
                      <option key={prefix.value} value={prefix.value}>
                        {prefix.label}
                      </option>
                    ))}
                  </select>
                  <input
                    id="contact-phone"
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9\s]*"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="9 8765 4321"
                    className={cn(
                      "w-full rounded-xl border bg-slate-950/90 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2",
                      errors.phone
                        ? "border-rose-500/70 focus:ring-rose-500/40"
                        : "border-slate-800 focus:border-blue-500 focus:ring-blue-500/20"
                    )}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-xs text-rose-400">{errors.phone}</p>
                )}
              </div>

              {/* Fila 5: ¿Qué desafío operativo buscas resolver con Harnex? */}
              <div>
                <label
                  htmlFor="contact-challenge"
                  className="mb-1.5 block text-xs font-medium text-slate-300"
                >
                  ¿Qué desafío operativo buscas resolver con Harnex?
                </label>
                <textarea
                  id="contact-challenge"
                  rows={3}
                  value={challenge}
                  onChange={(e) => {
                    setChallenge(e.target.value);
                    if (errors.challenge) {
                      setErrors((prev) => ({ ...prev, challenge: undefined }));
                    }
                  }}
                  placeholder="Ej. Recibimos +150 solicitudes semanales por correo y necesitamos automatizar su clasificación y control de SLA..."
                  className={cn(
                    "w-full resize-none rounded-xl border bg-slate-950/90 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2",
                    errors.challenge
                      ? "border-rose-500/70 focus:ring-rose-500/40"
                      : "border-slate-800 focus:border-blue-500 focus:ring-blue-500/20"
                  )}
                />
                {errors.challenge && (
                  <p className="mt-1 text-xs text-rose-400">
                    {errors.challenge}
                  </p>
                )}
              </div>

              {/* Botón Enviar */}
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-all w-full shadow-lg shadow-blue-600/20"
              >
                <Send className="h-4 w-4" />
                <span>Enviar solicitud de diagnóstico</span>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
