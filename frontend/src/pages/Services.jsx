import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight, CheckCircle2, Compass, PenTool, Code2, Rocket } from "lucide-react";
import { Reveal, SectionTag } from "@/components/Reveal";
import { SERVICES, IMAGES } from "@/data/content";

const PROCESS = [
  { icon: Compass, step: "01", title: "Discover", desc: "Workshops, goals and requirement mapping." },
  { icon: PenTool, step: "02", title: "Design", desc: "Wireframes, prototypes and visual systems." },
  { icon: Code2, step: "03", title: "Develop", desc: "Agile sprints with weekly demo builds." },
  { icon: Rocket, step: "04", title: "Deploy", desc: "Testing, launch, handover and support." },
];

function PageHeader() {
  return (
    <section className="noise relative overflow-hidden pb-12 sm:pb-16 pt-32 sm:pt-36 lg:pb-20 lg:pt-44" data-testid="services-hero">
      <div className="hero-grid absolute inset-0" />
      <div className="absolute -top-32 right-1/4 h-[350px] w-[350px] sm:h-[420px] sm:w-[420px] rounded-full bg-brand/15 blur-[120px] sm:blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <SectionTag>Our Services</SectionTag>
        <h1 className="mt-4 sm:mt-5 max-w-3xl font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900">
          Enterprise engineering &{" "}
          <span className="text-gradient-red">creative digital solutions.</span>
        </h1>
        <p className="mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed text-slate-600">
          Seven deeply-integrated capabilities covering the full digital product lifecycle so you
          can move from idea to launch to scale without ever changing partners.
        </p>
      </div>
    </section>
  );
}

function ServiceRow({ service, index }) {
  const Icon = service.icon;
  const reversed = index % 2 === 1;
  return (
    <Reveal>
      <article
        data-testid={`service-detail-${service.id}`}
        className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_2px_12px_-4px_rgba(15,23,42,0.08)] transition-all duration-300 hover:border-red-300 hover:shadow-[0_30px_80px_-24px_rgba(220,38,38,0.3)]"
      >
        <div className="grid lg:grid-cols-12">
          <div className={`relative p-6 sm:p-8 lg:col-span-5 lg:p-10 ${reversed ? "lg:order-2" : ""}`}>
            <div className="absolute right-6 top-6 font-display text-6xl sm:text-7xl lg:text-8xl font-extrabold text-slate-900/[0.05]">
              {String(index + 1).padStart(2, "0")}
            </div>
            <span className="inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-dark text-white shadow-[0_10px_30px_rgba(220,38,38,0.4)]">
              <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
            </span>
            <h2 className="mt-5 sm:mt-6 font-display text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">
              {service.title}
            </h2>
            <p className="mt-2 text-xs sm:text-sm font-medium text-brand">{service.tagline}</p>
            <div className="mt-5 sm:mt-6 rounded-2xl border border-red-200 bg-red-50 p-4">
              <p className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed text-slate-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span>
                  <span className="font-semibold text-slate-900">Real-world impact: </span>
                  {service.impact}
                </span>
              </p>
            </div>
          </div>

          <div className={`border-t border-slate-100 p-6 sm:p-8 lg:col-span-7 lg:border-l lg:border-t-0 lg:p-10 ${reversed ? "lg:order-1" : ""}`}>
            <p className="text-sm sm:text-[15px] leading-relaxed text-slate-600">{service.description}</p>
            <div className="mt-6 sm:mt-7 grid gap-3 sm:grid-cols-2">
              {service.features.map((f) => (
                <div key={f} className="flex items-start gap-2.5 rounded-xl bg-slate-50 px-3.5 sm:px-4 py-2.5 sm:py-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <span className="text-xs sm:text-sm text-slate-700">{f}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {service.stack.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-slate-200 bg-white px-3 sm:px-3.5 py-1.5 font-mono text-[11px] font-medium text-slate-600"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <Link
                to="/contact"
                data-testid={`service-cta-${service.id}`}
                className="group/link inline-flex items-center justify-center sm:justify-start gap-2 rounded-full border border-red-300 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-600 transition-all duration-300 hover:bg-red-100"
              >
                Discuss this service
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function Services() {
  return (
    <div data-testid="services-page" className="overflow-hidden">
      <PageHeader />

      <section className="mx-auto max-w-7xl space-y-6 sm:space-y-8 px-4 pb-16 sm:px-6 lg:px-12 lg:pb-28" data-testid="services-detail-list">
        {SERVICES.map((s, i) => (
          <ServiceRow key={s.id} service={s} index={i} />
        ))}
      </section>

      <section className="border-y border-slate-900/[0.07] bg-white py-16 sm:py-20 lg:py-28" data-testid="services-process">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <Reveal className="max-w-2xl">
            <SectionTag>How We Work</SectionTag>
            <h2 className="mt-3 sm:mt-4 font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              A process refined over 250+ launches.
            </h2>
          </Reveal>
          <div className="mt-10 sm:mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.08}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-7 transition-all duration-300 hover:-translate-y-2 hover:border-red-300 hover:bg-white hover:shadow-[0_20px_50px_-20px_rgba(220,38,38,0.3)]">
                  <span className="font-mono text-xs font-semibold tracking-[0.2em] text-brand">
                    STEP {p.step}
                  </span>
                  <p.icon className="mt-5 sm:mt-6 h-7 w-7 sm:h-8 sm:w-8 text-slate-900 transition-colors duration-300 group-hover:text-brand" />
                  <h3 className="mt-3 sm:mt-4 font-display text-lg sm:text-xl font-bold text-slate-900">{p.title}</h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">{p.desc}</p>
                  <span className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-brand to-brand-bright transition-all duration-500 group-hover:w-full" />
                </div>
              </Reveal>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="mt-12 sm:mt-16 overflow-hidden rounded-[2rem] border border-slate-200 shadow-[0_30px_70px_-30px_rgba(15,23,42,0.4)]"
            data-testid="services-cta-banner"
          >
            <div className="grid lg:grid-cols-2">
              <div className="relative flex flex-col justify-center bg-gradient-to-br from-brand to-brand-dark p-8 sm:p-10 lg:p-14">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full border-[18px] border-white/10 hidden sm:block" />
                <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-extrabold text-white">
                  Not sure which service fits? That's what the free call is for.
                </h3>
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-red-100/90">
                  Bring your problem we'll bring an honest recommendation, even if it's a smaller
                  project than you expected.
                </p>
                <Link
                  to="/contact"
                  data-testid="services-cta-button"
                  className="group mt-7 sm:mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-brand-dark transition-all duration-300 hover:scale-[1.04]"
                >
                  Book a Free Consultation
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
              <div className="relative min-h-[220px] sm:min-h-[260px]">
                <img
                  src={IMAGES.deskMockup}
                  alt="Digital product design workspace"
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-slate-900/20" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}