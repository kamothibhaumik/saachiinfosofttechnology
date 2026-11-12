import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { ArrowUpRight, X } from "lucide-react";
import { Reveal, SectionTag } from "@/components/Reveal";
import { PROJECTS, PROJECT_FILTERS } from "@/data/content";

function CaseStudyDialog({ project, onClose }) {
  return (
    <Dialog open={!!project} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-2xl gap-0 overflow-hidden rounded-3xl border-slate-200 bg-white p-0 text-slate-700 [&>button]:rounded-full [&>button]:bg-white/90 [&>button]:p-2 [&>button]:text-slate-900 [&>button]:shadow-md [&>button]:hover:bg-white"
        data-testid="case-study-dialog"
      >
        {project && (
          <div>
            <div className="relative">
              <img src={project.image} alt={project.title} className="h-56 w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent" />
              <span className="absolute left-5 top-5 rounded-full border border-white/25 bg-slate-900/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                {project.categoryLabel} · {project.year}
              </span>
            </div>
            <div className="p-7">
              <DialogHeader className="text-left">
                <DialogTitle className="font-display text-2xl font-bold text-slate-900">
                  {project.title}
                </DialogTitle>
                <DialogDescription className="mt-3 text-sm leading-relaxed text-slate-600">
                  {project.description}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((t) => (
                  <span key={t} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-mono text-[11px] text-slate-600">
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-end gap-3">
                {project.link && project.link !== "#" ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="case-study-view-site"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand-dark px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.03]"
                  >
                    View Site <ArrowUpRight className="h-4 w-4" />
                  </a>
                ) : (
                  <Link
                    to="/contact"
                    data-testid="case-study-cta"
                    onClick={onClose}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand-dark px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.03]"
                  >
                    Start a similar project <ArrowUpRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  const visible = PROJECTS.filter((p) => filter === "all" || p.category === filter);

  return (
    <div data-testid="projects-page">
      <section className="noise relative overflow-hidden pb-14 pt-36 lg:pb-16 lg:pt-44" data-testid="projects-hero">
        <div className="hero-grid absolute inset-0" />
        <div className="absolute -top-32 left-1/3 h-[420px] w-[420px] rounded-full bg-brand/15 blur-[140px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <SectionTag>Our Work</SectionTag>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Featured engineering &{" "}
            <span className="text-gradient-red">design case studies.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            A selection of platforms, stores and brands we've shipped with direct access to live builds.
          </p>

          <div className="mt-10 flex flex-wrap gap-2.5" data-testid="project-filters">
            {PROJECT_FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                data-testid={`project-filter-${f.key}`}
                className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  filter === f.key
                    ? "border-transparent bg-gradient-to-r from-brand to-brand-dark text-white shadow-[0_10px_30px_-8px_rgba(220,38,38,0.5)]"
                    : "border-slate-300 bg-white text-slate-600 shadow-sm hover:border-red-400 hover:text-red-600"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-12 lg:pb-28" data-testid="projects-grid-section">
        <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" data-testid="projects-grid">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <motion.article
                layout
                key={p.id}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                data-testid={`project-card-${p.id}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_2px_12px_-4px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-2 hover:border-red-300 hover:shadow-[0_24px_60px_-16px_rgba(220,38,38,0.28)]"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-slate-900/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                    {p.categoryLabel}
                  </span>
                  <span className="absolute bottom-3 right-4 rounded-full bg-white/85 px-2.5 py-0.5 font-mono text-xs text-slate-700 backdrop-blur">
                    {p.year}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-bold text-slate-900">{p.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">{p.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.stack.slice(0, 3).map((t) => (
                      <span key={t} className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-[10.5px] text-slate-600">
                        {t}
                      </span>
                    ))}
                    {p.stack.length > 3 && (
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-[10.5px] text-slate-500">
                        +{p.stack.length - 3}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setSelected(p)}
                    data-testid={`project-view-case-study-${p.id}`}
                    className="mt-5 inline-flex w-fit items-center gap-2 border-b border-transparent pb-0.5 text-sm font-semibold text-brand transition-all duration-300 hover:gap-3 hover:border-brand"
                  >
                    View Project Details
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {visible.length === 0 && (
          <p className="py-20 text-center text-slate-500">No projects in this category yet.</p>
        )}

        <Reveal className="mt-16">
          <div className="flex flex-col items-center justify-between gap-6 rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-[0_2px_12px_-4px_rgba(15,23,42,0.08)] sm:flex-row sm:text-left lg:p-10" data-testid="projects-cta">
            <div>
              <h3 className="font-display text-xl font-bold text-slate-900 sm:text-2xl">
                Your project could be next.
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Every project above started with one free conversation.
              </p>
            </div>
            <Link
              to="/contact"
              data-testid="projects-cta-button"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand-dark px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_-8px_rgba(220,38,38,0.5)] transition-all duration-300 hover:scale-[1.04]"
            >
              Start Your Project <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>

      <CaseStudyDialog project={selected} onClose={() => setSelected(null)} />
    </div>
  );
}