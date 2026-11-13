import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  Rocket,
  Lightbulb,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  Gift,
  Timer,
} from "lucide-react";
import { Reveal, MaskedLine, SectionTag, SectionHeading, Counter } from "@/components/Reveal";
import { SERVICES, STATS, MARQUEE_ITEMS, IMAGES } from "@/data/content";

const WHY_US = [
  {
    title: "Agile Delivery Process",
    desc: "Weekly demo builds, transparent roadmaps and zero black-box development. You always know exactly where your project stands.",
  },
  {
    title: "Enterprise-Grade Security",
    desc: "SSL everywhere, encrypted data flows and hardened infrastructure baked into every build from the first commit.",
  },
  {
    title: "Performance-First Engineering",
    desc: "Sub-2-second load targets, optimized assets and clean architecture speed is a feature we design for, not patch later.",
  },
  {
    title: "Dedicated 24/7 Support",
    desc: "A named point of contact, shared chat channels and guaranteed response times long after launch day.",
  },
];

function NovemberOfferBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-12" data-testid="november-offer-banner">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-red-200 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-6 shadow-2xl sm:p-10 text-white">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            {/* Left side: Poster Image */}
            <div className="lg:col-span-6 overflow-hidden rounded-2xl border border-white/10 shadow-xl">
              <img
                src="/images/November.png"
                alt="November Free Website Offer - First 2 Clients Only"
                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Right side: Offer Content & CTA */}
            <div className="lg:col-span-6 space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1.5 rounded-full bg-brand px-3.5 py-1 font-mono text-xs font-bold text-white shadow-md">
                  <Gift className="h-4 w-4" /> First 2 Clients Only
                </span>
                <span className="flex items-center gap-1 text-xs font-semibold text-slate-300">
                  <Timer className="h-4 w-4 text-brand" /> Valid Nov 1 – Nov 30
                </span>
              </div>

              <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Get Your Website Built <span className="text-gradient-red">100% Free</span>
              </h2>

              <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
                Exclusive November Special: Pay only for standard domain & hosting setup. Zero development fees and full handover included!
              </p>

              <div className="space-y-2.5 pt-2 text-xs font-medium text-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand shrink-0" />
                  <span>Custom React / WordPress development</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand shrink-0" />
                  <span>Mobile responsive & SEO-optimized</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand shrink-0" />
                  <span>WhatsApp chat integration & admin access</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/contact"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand via-brand-bright to-brand-dark px-8 py-4 text-base font-bold text-white shadow-[0_10px_30px_-8px_rgba(220,38,38,0.6)] transition-all duration-300 hover:scale-[1.03] sm:w-auto"
                >
                  Claim Your Free Website <ArrowUpRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Marquee() {
  return (
    <div className="marquee-mask overflow-hidden border-y border-slate-900/[0.07] bg-white py-7">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
            {MARQUEE_ITEMS.map((item, i) => (
              <span key={`${copy}-${i}`} className="flex items-center">
                <span className="whitespace-nowrap font-display text-3xl font-extrabold uppercase tracking-tight text-slate-900 lg:text-5xl">
                  {item}
                </span>
                <Sparkles className="mx-8 h-6 w-6 shrink-0 text-brand" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroVisual() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 120, damping: 18 });
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 18 });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-md lg:max-w-none"
      style={{ perspective: 1200 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }} className="relative">
        <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-tr from-brand/20 via-transparent to-blue-400/20 blur-2xl" />

        <div className="relative overflow-hidden rounded-[2rem] border border-slate-900/10 bg-white p-2 shadow-[0_30px_80px_-24px_rgba(15,23,42,0.35)]" style={{ transform: "translateZ(0)" }}>
          <img
            src={IMAGES.hero}
            alt="Saachi Infosoft engineering team at work"
            className="aspect-[4/4.6] w-full rounded-[1.6rem] object-cover lg:aspect-[4/4.2]"
            loading="eager"
          />
        </div>

        <div
          className="glass absolute -left-4 top-10 animate-float rounded-2xl p-4 sm:-left-8"
          style={{ transform: "translateZ(60px)" }}
          data-testid="hero-floating-stat-projects"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-dark text-white">
              <Rocket className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-lg font-bold leading-none text-slate-900">5+ Projects</p>
              <p className="mt-1 text-xs text-slate-500">Delivered worldwide</p>
            </div>
          </div>
        </div>

        <div
          className="glass absolute -right-3 bottom-14 animate-float-delayed rounded-2xl p-4 sm:-right-7"
          style={{ transform: "translateZ(80px)" }}
          data-testid="hero-floating-stat-satisfaction"
        >
          <p className="font-display text-2xl font-extrabold text-gradient-red">99%</p>
          <p className="mt-0.5 text-xs text-slate-500">Client satisfaction</p>
          <div className="mt-2 h-1.5 w-32 overflow-hidden rounded-full bg-slate-900/10">
            <div className="h-full w-[99%] rounded-full bg-gradient-to-r from-brand to-brand-bright" />
          </div>
        </div>

        <div
          className="absolute -bottom-8 -left-8 hidden h-28 w-28 sm:block"
          style={{ transform: "translateZ(40px)" }}
        >
          <svg viewBox="0 0 120 120" className="h-full w-full animate-spin-slow">
            <defs>
              <path id="circlePath" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
            </defs>
            <text className="fill-slate-600" style={{ fontSize: "10px", letterSpacing: "3.1px", fontFamily: "JetBrains Mono, monospace" }}>
              <textPath href="#circlePath">TECHNOLOGY • DESIGN • GROWTH •</textPath>
            </text>
          </svg>
          <span className="absolute inset-0 m-auto h-10 w-10 rounded-full bg-gradient-to-br from-brand to-brand-dark opacity-90 blur-[1px]" />
          <span className="absolute inset-0 m-auto flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-dark">
            <Sparkles className="h-4 w-4 text-white" />
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

const ROTATING_WORDS = [
  "Transformation",
  "Innovation",
  "Development",
  "Automation",
  "Creativity",
  "Technology",
  "Growth",
];

function RotatingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-grid overflow-hidden align-bottom">
      <motion.span
        key={index}
        initial={{ y: "-100%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="text-gradient-red"
        style={{ gridArea: "1 / 1" }}
      >
        {ROTATING_WORDS[index]}
      </motion.span>
    </span>
  );
}

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yVisual = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <div data-testid="home-page">
      {/* ============ HERO ============ */}
      <section ref={heroRef} className="noise relative overflow-hidden" data-testid="home-hero">
        <div className="hero-grid absolute inset-0" />
        <div className="absolute -top-40 left-1/4 h-[480px] w-[480px] rounded-full bg-brand/15 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-blue-400/15 blur-[140px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 pb-14 pt-32 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-12 lg:pb-16 lg:pt-40">
          <motion.div style={{ y: yText }} className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <SectionTag>IT Services · Software · Design</SectionTag>
            </motion.div>

            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl xl:text-7xl">
              <MaskedLine delay={0.2}>
                Empowering Digital
              </MaskedLine>

              <MaskedLine delay={0.32}>
                <RotatingWord />
              </MaskedLine>

              <MaskedLine delay={0.44}>
                for Modern Businesses
              </MaskedLine>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg"
            >
              Custom software, web platforms and mobile apps engineered end-to-end to help
              ambitious businesses launch faster, scale harder and lead their markets.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Link
                to="/services"
                data-testid="hero-cta-explore-services"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand via-brand-bright to-brand-dark px-7 py-3.5 text-sm font-semibold text-white animate-pulse-glow transition-transform duration-300 hover:scale-[1.04]"
              >
                Explore Services
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                data-testid="hero-cta-free-consultation"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-slate-900 shadow-sm transition-all duration-300 hover:border-red-400 hover:bg-red-50 hover:text-red-600"
              >
                Get a Free Consultation
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div style={{ y: yVisual }} className="lg:col-span-5">
            <HeroVisual />
          </motion.div>
        </div>
      </section>

      {/* ============ NOVEMBER OFFER BANNER ============ */}
      <NovemberOfferBanner />

      <Marquee />

      {/* ============ COMPANY OVERVIEW ============ */}
      <section className="relative py-20 lg:py-28" data-testid="home-overview">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:px-12">
          <div className="lg:col-span-7">
            <SectionHeading
              tag="Who We Are"
              title={
                <>
                  Innovation, reliability and scale —{" "}
                  <span className="text-gradient-red">built into everything we ship.</span>
                </>
              }
              description="Saachi Infosoft Technologies is a full-service IT studio partnering with startups and enterprises to design, build and scale digital products. One team across strategy, design, engineering and growth so nothing gets lost in translation."
            />
            <div className="mt-10 space-y-6">
              {[
                { icon: Lightbulb, title: "Innovation", desc: "Modern stacks and fresh thinking applied to real business problems never tech for tech's sake." },
                { icon: ShieldCheck, title: "Reliability", desc: "Fixed timelines, milestone billing and communication you can set your watch by." },
                { icon: TrendingUp, title: "Scale", desc: "Architecture that starts lean and grows to millions of users without a rewrite." },
              ].map((f, i) => (
                <Reveal key={f.title} delay={i * 0.08}>
                  <div className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-brand">
                      <f.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-slate-900">{f.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">{f.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="relative">
                <div className="overflow-hidden rounded-[2rem] border border-slate-900/10 bg-white p-2 shadow-[0_24px_60px_-24px_rgba(15,23,42,0.3)]">
                  <img src={IMAGES.team} alt="Team collaboration at Saachi Infosoft" className="aspect-[4/3] w-full rounded-[1.6rem] object-cover" loading="lazy" />
                </div>
                <div className="mt-5 grid grid-cols-2 gap-5">
                  <div className="overflow-hidden rounded-[1.5rem] border border-slate-900/10 bg-white p-2">
                    <img src={IMAGES.coding} alt="Developer writing code" className="aspect-square w-full rounded-[1.2rem] object-cover" loading="lazy" />
                  </div>
                  <div className="flex flex-col justify-center rounded-[1.5rem] border border-red-200 bg-red-50 p-6">
                    <p className="font-display text-4xl font-extrabold text-gradient-red">7+</p>
                    <p className="mt-2 text-sm leading-snug text-slate-700">Core services under one roof</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ STATS (dark anchor band) ============ */}
      <section className="border-y border-slate-900 bg-[#0F172A]" data-testid="home-stats">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-12 px-4 py-16 sm:px-6 lg:grid-cols-4 lg:px-12 lg:py-20">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="text-center">
              <p className="font-display text-4xl font-extrabold text-white lg:text-6xl" data-testid={`stat-counter-${i}`}>
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-3 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ SERVICES SNAPSHOT ============ */}
      <section className="py-20 lg:py-28" data-testid="home-services-snapshot">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              tag="What We Do"
              title="Seven capabilities. One accountable team."
              description="From your first wireframe to your millionth user every discipline you need to launch and grow, under one roof."
            />
            <Reveal delay={0.15}>
              <Link
                to="/services"
                data-testid="home-services-view-all"
                className="group inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-all duration-300 hover:border-red-400 hover:text-red-600"
              >
                View all services
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3" data-testid="services-snapshot-grid">
            {SERVICES.map((s, i) => (
              <Reveal key={s.id} delay={(i % 3) * 0.08} className={i === 0 ? "md:col-span-2" : ""}>
                <Link
                  to="/services"
                  data-testid={`service-card-${s.id}`}
                  className="group flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_2px_12px_-4px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-2 hover:border-red-300 hover:shadow-[0_24px_60px_-16px_rgba(220,38,38,0.28)]"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-dark text-white shadow-[0_8px_24px_rgba(220,38,38,0.35)]">
                        <s.icon className="h-5 w-5" />
                      </span>
                      <ArrowUpRight className="h-5 w-5 text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brand" />
                    </div>
                    <h3 className="mt-6 font-display text-xl font-bold text-slate-900">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {i === 0 ? s.description : s.tagline}
                    </p>
                  </div>
                  {i === 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {s.stack.slice(0, 3).map((t) => (
                        <span key={t} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-mono text-[11px] text-slate-600">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHY CHOOSE US ============ */}
      <section className="border-t border-slate-900/[0.07] bg-white py-20 lg:py-28" data-testid="home-why-us">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:px-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                tag="Why Choose Us"
                title="The partner that treats your product like our own."
                description="Plenty of agencies can write code. Fewer can own an outcome. We measure ourselves on your launch, your uptime and your growth not on hours billed."
              />
              <Reveal delay={0.15}>
                <Link
                  to="/contact"
                  data-testid="why-us-cta"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand-dark px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_-8px_rgba(220,38,38,0.5)] transition-all duration-300 hover:scale-[1.04]"
                >
                  Start the conversation
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Reveal>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="space-y-5">
              {WHY_US.map((w, i) => (
                <Reveal key={w.title} delay={i * 0.08}>
                  <div className="group flex gap-6 rounded-3xl border border-slate-200 bg-slate-50 p-7 transition-all duration-300 hover:border-l-2 hover:border-l-brand hover:bg-white hover:shadow-[0_16px_40px_-16px_rgba(220,38,38,0.25)]">
                    <span className="font-mono text-sm font-semibold text-brand">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-bold text-slate-900 sm:text-xl">{w.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{w.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ CTA BANNER ============ */}
      <section className="py-20 lg:py-28" data-testid="home-cta-banner">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <Reveal>
            <div className="noise relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-brand via-brand-bright to-brand-dark px-8 py-16 text-center shadow-[0_40px_90px_-30px_rgba(220,38,38,0.55)] lg:py-20">
              <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full border-[24px] border-white/10" />
              <div className="absolute -bottom-20 -right-10 h-64 w-64 rounded-full border-[28px] border-black/10" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.25)_100%)]" />
              <div className="relative">
                <h2 className="mx-auto max-w-3xl font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Ready to scale your business? Let's build together.
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-base text-red-100/90">
                  Tell us where you're headed we'll map the fastest route to get there.
                </p>
                <Link
                  to="/contact"
                  data-testid="home-cta-banner-button"
                  className="mt-9 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-brand-dark transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_16px_40px_rgba(0,0,0,0.3)]"
                >
                  Start Your Project
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <p className="mt-6 flex items-center justify-center gap-2 text-xs font-medium text-red-100/80">
                  <CheckCircle2 className="h-4 w-4" /> Free consultation · Fixed-scope quote · No obligation
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}