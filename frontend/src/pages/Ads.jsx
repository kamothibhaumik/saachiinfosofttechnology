import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Timer, CheckCircle2, Gift } from "lucide-react";
import { Reveal, SectionTag } from "@/components/Reveal";

const SPECIAL_OFFER = {
  title: "Exclusive November Launch Offer",
  badge: "First 2 Clients Only",
  discount: "100% Free Website Development",
  subDiscount: "Pay only for domain & hosting setup!",
  description: "We are giving away 2 completely free custom website design & development slots this month to help local businesses launch online. No development fees charged.",
  features: [
    "Custom responsive website design (React or WordPress)",
    "Mobile-first optimization & speed hardening",
    "Contact form & WhatsApp chat integration",
    "100% free development — pay only standard domain/hosting fees",
    "Full handover & admin access included",
  ],
  validUntil: "Valid until Nov 30, 2026",
  slotsLeft: "2 Slots Remaining",
};

export default function Ads() {
  return (
    <div data-testid="ads-page" className="overflow-hidden">
      <section className="noise relative overflow-hidden pb-12 sm:pb-14 pt-32 sm:pt-36 lg:pb-16 lg:pt-44" data-testid="ads-hero">
        <div className="hero-grid absolute inset-0" />
        <div className="absolute -top-32 left-1/3 h-[350px] w-[350px] sm:h-[420px] sm:w-[420px] rounded-full bg-brand/15 blur-[120px] sm:blur-[140px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <SectionTag>Limited Time Promotion</SectionTag>
          <h1 className="mt-4 sm:mt-5 max-w-3xl font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900">
            Get your website built for <span className="text-gradient-red">FREE.</span>
          </h1>
          <p className="mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed text-slate-600">
            Exclusive November special for ambitious businesses looking to launch their digital presence.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-16 sm:pb-20 sm:px-6 lg:px-12 lg:pb-28">
        <Reveal>
          <div className="group relative overflow-hidden rounded-3xl border border-red-200 bg-white p-6 sm:p-8 lg:p-12 shadow-[0_4px_24px_-4px_rgba(220,38,38,0.12)] transition-all duration-300 hover:border-red-300 hover:shadow-[0_24px_60px_-16px_rgba(220,38,38,0.25)]">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-red-100/50 blur-3xl pointer-events-none" />
            
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="flex items-center gap-2 rounded-full bg-red-100 px-3.5 sm:px-4 py-1.5 font-mono text-xs font-bold text-brand">
                <Gift className="h-4 w-4" />
                {SPECIAL_OFFER.badge}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <Timer className="h-4 w-4 text-brand" /> {SPECIAL_OFFER.validUntil}
              </span>
            </div>

            <div className="mt-6 sm:mt-8">
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">
                {SPECIAL_OFFER.title}
              </h2>
              <div className="mt-2.5 sm:mt-3">
                <p className="font-display text-xl sm:text-2xl lg:text-3xl font-extrabold text-gradient-red">
                  {SPECIAL_OFFER.discount}
                </p>
                <p className="mt-1 text-xs sm:text-sm font-semibold text-slate-700">
                  {SPECIAL_OFFER.subDiscount}
                </p>
              </div>

              <p className="mt-3.5 sm:mt-4 text-sm sm:text-base leading-relaxed text-slate-600">
                {SPECIAL_OFFER.description}
              </p>

              <div className="mt-6 sm:mt-8 rounded-2xl border border-slate-100 bg-slate-50/80 p-5 sm:p-6">
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-500">
                  What's included in this offer:
                </p>
                <ul className="mt-3.5 sm:mt-4 grid gap-3 sm:gap-3.5 sm:grid-cols-2">
                  {SPECIAL_OFFER.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-slate-800">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 pt-6 sm:pt-8">
              <span className="rounded-full bg-amber-50 px-4 py-1.5 font-mono text-xs font-bold text-amber-700 border border-amber-200">
                🔥 {SPECIAL_OFFER.slotsLeft}
              </span>
              <Link
                to="/contact"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand via-brand-bright to-brand-dark px-7 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-white shadow-[0_10px_30px_-8px_rgba(220,38,38,0.5)] transition-all duration-300 hover:scale-[1.03]"
              >
                Claim Free Website Slot <ArrowUpRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}