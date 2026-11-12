import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Reveal, SectionTag } from "@/components/Reveal";
import { SERVICES, CONTACT, IMAGES } from "@/data/content";

const schema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(7, "Please enter a valid phone number."),
  service: z.string().min(1, "Please select a service."),
  message: z.string().min(10, "Tell us a little more about your project (10+ characters)."),
});

const inputCls =
  "w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/20";

const INFO_CARDS = [
  { icon: Mail, label: "Email Us", value: CONTACT.email, href: `mailto:${CONTACT.email}`, id: "email" },
  { icon: Phone, label: "Call Us", value: CONTACT.phone, href: `tel:${CONTACT.phone.replace(/[^+\d]/g, "")}`, id: "phone" },
  { icon: MessageCircle, label: "WhatsApp", value: "Chat with us instantly", href: CONTACT.whatsapp, id: "whatsapp" },
  { icon: MapPin, label: "Operational Base", value: CONTACT.location, href: null, id: "location" },
  { icon: Clock, label: "Business Hours", value: CONTACT.hours, href: null, id: "hours" },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", service: "", message: "" },
  });

  const onSubmit = async (values) => {
    try {
      // Use environment variable for production backend URL, fallback to localhost for development
      const API = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000/api";

      const res = await fetch(`${API}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || "Request failed");
      }
      setSubmitted(true);
      toast.success("Message sent! We'll get back to you within one business day.");
    } catch (e) {
      console.error("Submission Error:", e);
      toast.error(e.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div data-testid="contact-page">
      <section className="noise relative overflow-hidden pb-14 pt-36 lg:pb-16 lg:pt-44" data-testid="contact-hero">
        <div className="hero-grid absolute inset-0" />
        <div className="absolute -top-32 left-1/4 h-[420px] w-[420px] rounded-full bg-brand/15 blur-[140px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <SectionTag>Contact Us</SectionTag>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Let's build something{" "}
            <span className="text-gradient-red">exceptional together.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Tell us about your project we reply within one business day with honest, actionable
            next steps.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-12" data-testid="contact-section">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* FORM */}
          <Reveal className="lg:col-span-7">
            <div
              className="h-full rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_2px_12px_-4px_rgba(15,23,42,0.08)] lg:p-10"
              data-testid="contact-form-container"
            >
              {submitted ? (
                <div className="flex h-full min-h-[420px] flex-col items-center justify-center text-center" data-testid="contact-success-state">
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-dark shadow-[0_16px_40px_-10px_rgba(220,38,38,0.6)]">
                    <CheckCircle2 className="h-10 w-10 text-white" />
                  </span>
                  <h2 className="mt-7 font-display text-2xl font-bold text-slate-900">Message received!</h2>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600">
                    Thanks for reaching out — a strategist from our team will get back to you within
                    one business day.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); reset(); }}
                    data-testid="contact-send-another-button"
                    className="mt-8 inline-flex items-center gap-2 rounded-full border border-red-300 bg-red-50 px-6 py-3 text-sm font-semibold text-red-600 transition-all hover:bg-red-100"
                  >
                    Send another message <Send className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <h2 className="font-display text-xl font-bold text-slate-900">Start your project</h2>
                  <p className="mt-1.5 text-sm text-slate-500">Fields marked * are required.</p>

                  <div className="mt-8 grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">Name *</label>
                      <input id="name" {...register("name")} data-testid="contact-form-name-input" placeholder="Jane Cooper" className={inputCls} />
                      {errors.name && <p className="mt-1.5 text-xs text-red-600" data-testid="contact-form-name-error">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">Email *</label>
                      <input id="email" type="email" {...register("email")} data-testid="contact-form-email-input" placeholder="jane@company.com" className={inputCls} />
                      {errors.email && <p className="mt-1.5 text-xs text-red-600" data-testid="contact-form-email-error">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label htmlFor="phone" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">Phone *</label>
                      <input id="phone" type="tel" {...register("phone")} data-testid="contact-form-phone-input" placeholder="+1 800 555 7222" className={inputCls} />
                      {errors.phone && <p className="mt-1.5 text-xs text-red-600" data-testid="contact-form-phone-error">{errors.phone.message}</p>}
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">Service Interested In *</label>
                      <Controller
                        name="service"
                        control={control}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger data-testid="contact-form-service-select" className="h-[46px] w-full rounded-xl border-slate-300 bg-slate-50 px-4 text-sm text-slate-900 focus:ring-2 focus:ring-red-500/20">
                              <SelectValue placeholder="Select a service" className="text-slate-400" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl border-slate-200 bg-white text-slate-700">
                              {[...SERVICES.map((s) => s.title), "Something else"].map((t) => (
                                <SelectItem key={t} value={t} data-testid={`contact-service-option-${t.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                                  {t}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.service && <p className="mt-1.5 text-xs text-red-600" data-testid="contact-form-service-error">{errors.service.message}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="message" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">Project Details *</label>
                      <textarea id="message" rows={5} {...register("message")} data-testid="contact-form-message-textarea" placeholder="What are you building? What does success look like? Any timeline in mind?" className={`${inputCls} resize-none`} />
                      {errors.message && <p className="mt-1.5 text-xs text-red-600" data-testid="contact-form-message-error">{errors.message.message}</p>}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    data-testid="contact-form-submit-button"
                    className="group mt-8 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-brand via-brand-bright to-brand-dark px-8 py-4 text-sm font-bold text-white animate-pulse-glow transition-transform duration-300 hover:scale-[1.02] disabled:opacity-60 sm:w-auto"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
                    ) : (
                      <>Send Message <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /></>
                    )}
                  </button>
                  <p className="mt-4 text-xs text-slate-400">
                    By submitting, you agree to be contacted about your project. We never share your data.
                  </p>
                </form>
              )}
            </div>
          </Reveal>

          {/* INFO CARDS */}
          <div className="space-y-5 lg:col-span-5">
            {INFO_CARDS.map((c, i) => {
              const Wrapper = c.href ? "a" : "div";
              return (
                <Reveal key={c.id} delay={i * 0.07}>
                  <Wrapper
                    {...(c.href ? { href: c.href, target: c.href.startsWith("http") ? "_blank" : undefined, rel: "noopener noreferrer" } : {})}
                    data-testid={`contact-info-card-${c.id}`}
                    className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_12px_-4px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-red-300 hover:shadow-[0_16px_40px_-16px_rgba(220,38,38,0.3)]"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-dark text-white shadow-[0_8px_24px_rgba(220,38,38,0.3)]">
                      <c.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">{c.label}</p>
                      <p className="mt-1 text-[15px] font-semibold text-slate-900">{c.value}</p>
                    </div>
                  </Wrapper>
                </Reveal>
              );
            })}

            <Reveal delay={0.35}>
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_2px_12px_-4px_rgba(15,23,42,0.08)]">
                <img src={IMAGES.team} alt="Saachi Infosoft office" className="h-44 w-full rounded-[1.2rem] object-cover" loading="lazy" />
                <p className="py-3 pl-3 text-sm font-medium text-slate-900">
                  Remote-first studio · Clients across 3 continents
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-slate-900/[0.07] bg-white py-20 lg:py-28" data-testid="faq-section">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-12">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionTag>FAQ</SectionTag>
              <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                Questions, answered honestly.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Everything clients usually ask before their first call. Something missing? Email us at{" "}
                <a href={`mailto:${CONTACT.email}`} className="font-medium text-brand hover:underline">
                  {CONTACT.email}
                </a>
                .
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Accordion type="single" collapsible className="w-full" data-testid="faq-accordion">
              {[
                { q: "How long does a typical project take?", a: "A marketing website typically ships in 3–6 weeks, a custom web application in 8–12 weeks, and a mobile app in 10–16 weeks depending on scope. After a free consultation we give you a fixed timeline with weekly milestones — and we hit them." },
                { q: "How do you price projects?", a: "We quote fixed-scope packages after a discovery call, so you know the full investment before committing. Larger builds are billed in milestones tied to deliverables — design sign-off, beta, launch — with no surprise invoices." },
                { q: "What does your development workflow look like?", a: "Four phases: Discover (workshops and requirement mapping), Design (wireframes and interactive prototypes), Develop (agile sprints with weekly demo builds), and Deploy (testing, launch and handover). You see real progress every single week." },
                { q: "Do you provide support after launch?", a: "Every project includes 30 days of free post-launch support. After that, our maintenance retainers cover updates, security patches, performance monitoring and small feature requests with guaranteed response times." },
                { q: "Can you take over an existing project or website?", a: "Yes. We start with a technical audit of your existing codebase or CMS, report our findings honestly, and then either incrementally improve it or propose a migration path — whichever protects your budget and timeline better." },
                { q: "Do you work with clients remotely?", a: "We're a remote-first studio and currently serve clients across multiple time zones. Every project gets a dedicated point of contact, shared chat channels and scheduled overlap hours for calls." },
              ].map((f, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <AccordionItem value={`item-${i}`} className="border-slate-200" data-testid={`faq-item-${i}`}>
                    <AccordionTrigger className="py-5 text-left font-display text-base font-semibold text-slate-900 hover:no-underline hover:text-brand">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-sm leading-relaxed text-slate-600">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                </Reveal>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
}