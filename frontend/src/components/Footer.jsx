import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Github, Linkedin, Twitter, Instagram, Send, MapPin, Mail, Phone } from "lucide-react";
import Logo from "./Logo";
import { SERVICES, CONTACT } from "../data/content";

const SOCIALS = [
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const subscribe = async (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
      const res = await fetch(`${API}/newsletter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      toast.success("You're in! Insights land in your inbox every month.");
      setEmail("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="relative border-t border-white/[0.06] bg-[#090D16]" data-testid="site-footer">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
              We design, build and scale digital products for ambitious businesses from custom
              software and mobile apps to brands that refuse to be ignored.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  data-testid={`footer-social-${s.label.toLowerCase()}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Quick Links
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                ["Home", "/"],
                ["Services", "/services"],
                ["Projects", "/projects"],
                ["Blog", "/blog"],
                ["Contact", "/contact"],
              ].map(([label, to]) => (
                <li key={to}>
                  <Link
                    to={to}
                    data-testid={`footer-quick-link-${to.replace("/", "") || "home"}`}
                    className="text-slate-400 transition-colors hover:text-red-400"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Services
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              {SERVICES.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <Link
                    to="/services"
                    data-testid={`footer-service-link-${s.id}`}
                    className="text-slate-400 transition-colors hover:text-red-400"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Newsletter
            </h4>
            <p className="mt-5 text-sm leading-relaxed text-slate-400">
              Monthly insights on tech, design and growth. No spam, ever.
            </p>
            <form onSubmit={subscribe} className="mt-4" data-testid="footer-newsletter-form">
              <div className="flex overflow-hidden rounded-full border border-white/10 bg-white/[0.04] focus-within:border-red-500/50">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  data-testid="footer-newsletter-email-input"
                  className="w-full bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
                />
                <button
                  type="submit"
                  disabled={loading}
                  data-testid="footer-newsletter-submit-button"
                  className="flex items-center gap-2 bg-gradient-to-r from-brand to-brand-dark px-4 text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
            <div className="mt-6 space-y-2.5 text-sm text-slate-400">
              <p className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-red-500" /> {CONTACT.email}
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-red-500" /> {CONTACT.phone}
              </p>
              <p className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-red-500" /> {CONTACT.location}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 text-sm text-slate-500 sm:flex-row">
          <p data-testid="footer-copyright">
            © {new Date().getFullYear()} Saachi Infosoft Technologies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}