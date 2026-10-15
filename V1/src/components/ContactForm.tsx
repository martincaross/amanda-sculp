"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowRight, Check, Loader2 } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { siteConfig } from "@/data/siteConfig";
import MagneticButton from "@/components/ui/MagneticButton";

const { contact, form, contactInfo } = siteConfig;
const ease = [0.22, 1, 0.36, 1] as const;

type Status = "idle" | "loading" | "success" | "error";

const initialValues = { name: "", email: "", social: "", message: "" };

/** ¿Está configurado el proveedor del formulario en siteConfig? */
function isConfigured() {
  if (form.provider === "formspree") return /formspree\.io\/f\/(?!YOUR)/i.test(form.endpoint);
  return Boolean(form.accessKey) && !form.accessKey.startsWith("YOUR_");
}

export default function ContactForm() {
  const [inquiry, setInquiry] = useState(contact.inquiryTypes[0].id);
  const [values, setValues] = useState(initialValues);
  const [status, setStatus] = useState<Status>("idle");

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    // Honeypot anti-spam: los bots rellenan este campo oculto
    if (fd.get("botcheck")) return setStatus("success");

    setStatus("loading");
    const inquiryLabel = contact.inquiryTypes.find((t) => t.id === inquiry)?.label ?? inquiry;

    try {
      if (!isConfigured()) {
        if (process.env.NODE_ENV !== "production") {
          // Modo demo (solo desarrollo): simula el envío para presentar el diseño
          console.warn("[ContactForm] Falta la clave del formulario en src/data/siteConfig.ts → envío simulado.");
          await new Promise((r) => setTimeout(r, 1400));
          setStatus("success");
          setValues(initialValues);
          return;
        }
        throw new Error("Formulario no configurado");
      }

      const payload =
        form.provider === "formspree"
          ? {
              name: values.name,
              email: values.email,
              _replyto: values.email,
              _subject: `${form.subject} — ${inquiryLabel}`,
              tipo_de_consulta: inquiryLabel,
              redes_sociales: values.social || "—",
              message: values.message,
            }
          : {
              access_key: form.accessKey,
              subject: `${form.subject} — ${inquiryLabel}`,
              from_name: form.fromName,
              name: values.name,
              email: values.email,
              replyto: values.email,
              tipo_de_consulta: inquiryLabel,
              redes_sociales: values.social || "—",
              message: values.message,
            };

      const res = await fetch(form.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      const ok = form.provider === "formspree" ? res.ok : res.ok && data?.success !== false;
      if (!ok) throw new Error(data?.message || "Error en el envío");

      setStatus("success");
      setValues(initialValues);
    } catch (err) {
      console.error("[ContactForm]", err);
      setStatus("error");
    }
  };

  const inputClass =
    "peer w-full border-0 border-b border-espresso/15 bg-transparent px-0 pb-3 pt-2 text-lg text-espresso placeholder:text-warmstone/50 transition-colors duration-500 focus:border-clay focus:outline-none focus:ring-0";
  const labelClass = "text-[0.65rem] font-medium uppercase tracking-[0.22em] text-warmstone";

  return (
    <div className="relative min-h-[36rem] rounded-[1.75rem] bg-alabaster p-6 sm:rounded-[2rem] sm:p-10">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease }}
            className="flex min-h-[32rem] flex-col items-center justify-center text-center"
            role="status"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.15 }}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-sage text-alabaster"
            >
              <Check className="h-9 w-9" strokeWidth={1.5} />
            </motion.span>
            <h3 className="mt-8 font-serif text-4xl italic text-espresso sm:text-5xl">{contact.successTitle}</h3>
            <p className="mt-4 max-w-sm leading-relaxed text-warmstone">{contact.successText}</p>
            <button
              id="contact-reset"
              onClick={() => setStatus("idle")}
              className="mt-10 text-xs font-medium uppercase tracking-[0.2em] text-espresso underline decoration-clay underline-offset-8 transition-colors hover:text-clay"
            >
              {contact.successReset}
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            id="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease }}
            className="space-y-9"
            noValidate={false}
          >
            {/* Tipo de consulta */}
            <fieldset>
              <legend className={labelClass}>{contact.inquiryLabel}</legend>
              <div className="mt-4 flex flex-wrap gap-2" role="radiogroup">
                {contact.inquiryTypes.map((t) => {
                  const selected = inquiry === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      id={`inquiry-${t.id}`}
                      onClick={() => setInquiry(t.id)}
                      className={`relative rounded-full border px-4 py-2.5 text-sm transition-colors duration-500 ${
                        selected
                          ? "border-espresso text-alabaster"
                          : "border-espresso/15 text-espresso/80 hover:border-espresso/40"
                      }`}
                    >
                      {selected && (
                        <motion.span
                          layoutId="inquiry-pill"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          className="absolute inset-0 rounded-full bg-espresso"
                        />
                      )}
                      <span className="relative">{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="grid gap-9 sm:grid-cols-2 sm:gap-6">
              <label className="block">
                <span className={labelClass}>{contact.fields.name.label} *</span>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={values.name}
                  onChange={onChange}
                  placeholder={contact.fields.name.placeholder}
                  className={inputClass}
                />
              </label>
              <label className="block">
                <span className={labelClass}>{contact.fields.email.label} *</span>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={values.email}
                  onChange={onChange}
                  placeholder={contact.fields.email.placeholder}
                  className={inputClass}
                />
              </label>
            </div>

            <label className="block">
              <span className={labelClass}>{contact.fields.social.label}</span>
              <input
                id="contact-social"
                name="social"
                type="text"
                value={values.social}
                onChange={onChange}
                placeholder={contact.fields.social.placeholder}
                className={inputClass}
              />
            </label>

            <label className="block">
              <span className={labelClass}>{contact.fields.message.label} *</span>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={4}
                value={values.message}
                onChange={onChange}
                placeholder={contact.fields.message.placeholder}
                className={`${inputClass} resize-none`}
              />
            </label>

            {/* Honeypot oculto */}
            <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

            <AnimatePresence>
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  role="alert"
                  className="flex items-start gap-2 overflow-hidden rounded-2xl bg-clay/10 p-4 text-sm text-espresso"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-clay" />
                  <span>
                    {contact.errorText}{" "}
                    <a href={`mailto:${contactInfo.email}`} className="font-semibold underline underline-offset-4">
                      {contactInfo.email}
                    </a>
                  </span>
                </motion.p>
              )}
            </AnimatePresence>

            <div className="flex flex-col-reverse items-start justify-between gap-6 sm:flex-row sm:items-center">
              <p className="text-xs text-warmstone">{contactInfo.responseTime}</p>
              <MagneticButton
                type="submit"
                id="contact-submit"
                disabled={status === "loading"}
                className="w-full sm:w-auto"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {contact.sendingLabel}
                  </>
                ) : (
                  <>
                    {contact.submitLabel}
                    <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                  </>
                )}
              </MagneticButton>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
