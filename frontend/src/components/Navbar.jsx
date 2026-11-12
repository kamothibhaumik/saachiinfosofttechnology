import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Logo from "./Logo";

const LINKS = [
  { to: "/", label: "Home", id: "home" },
  { to: "/services", label: "Services", id: "services" },
  { to: "/ads", label: "Ads & Offers", id: "ads" }, // Updated from Projects to Ads
  { to: "/blog", label: "Blog", id: "blog" },
  { to: "/contact", label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-900/[0.08] bg-white/85 backdrop-blur-xl shadow-[0_8px_30px_-18px_rgba(15,23,42,0.25)]"
          : "border-b border-transparent bg-white/60 backdrop-blur-md"
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-12">
        <Link to="/" data-testid="nav-link-home-logo" aria-label="Saachi Infosoft Technologies home">
          <Logo light={false} />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <NavLink
              key={l.id}
              to={l.to}
              data-testid={`nav-link-${l.id}`}
              className={({ isActive }) =>
                `relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive ? "text-red-600" : "text-slate-600 hover:text-slate-900"
                }`
              }
            >
              {({ isActive }) =>
                isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full border border-red-200 bg-red-50"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )
              }
              <span className="relative z-10">{l.label}</span>
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            data-testid="nav-cta-get-in-touch"
            className="group hidden items-center gap-2 rounded-full bg-gradient-to-r from-brand via-brand-bright to-brand-dark px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_30px_-8px_rgba(220,38,38,0.5)] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_14px_40px_-8px_rgba(220,38,38,0.6)] sm:inline-flex"
          >
            Get in Touch
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <button
            data-testid="nav-mobile-menu-toggle"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-sm lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-slate-100 bg-white/95 backdrop-blur-xl lg:hidden"
            data-testid="nav-mobile-menu"
          >
            <div className="space-y-1 px-4 py-4 sm:px-6">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <NavLink
                    to={l.to}
                    data-testid={`nav-mobile-link-${l.id}`}
                    className={({ isActive }) =>
                      `block rounded-xl px-4 py-3 font-display text-lg font-semibold ${
                        isActive
                          ? "bg-red-50 text-red-600"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
              <Link
                to="/contact"
                data-testid="nav-mobile-cta"
                className="mt-3 block rounded-xl bg-gradient-to-r from-brand to-brand-dark px-4 py-3.5 text-center font-display text-base font-semibold text-white"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}