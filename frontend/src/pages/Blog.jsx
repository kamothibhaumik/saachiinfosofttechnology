import { useState } from "react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ArrowUpRight, CalendarDays, Clock, Tag } from "lucide-react";
import { Reveal, SectionTag } from "@/components/Reveal";
import { BLOG_POSTS } from "@/data/content";

function PostMeta({ post }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
      <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1 font-semibold text-red-600">
        <Tag className="h-3 w-3" /> {post.category}
      </span>
      <span className="inline-flex items-center gap-1.5 text-slate-500">
        <CalendarDays className="h-3.5 w-3.5" /> {post.date}
      </span>
      <span className="inline-flex items-center gap-1.5 text-slate-500">
        <Clock className="h-3.5 w-3.5" /> {post.readTime}
      </span>
    </div>
  );
}

function ArticleDialog({ post, onClose }) {
  return (
    <Dialog open={!!post} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-h-[85vh] max-w-2xl gap-0 overflow-y-auto rounded-3xl border-slate-200 bg-white p-0 text-slate-700"
        data-testid="blog-article-dialog"
      >
        {post && (
          <article className="pb-8">
            <div className="relative">
              <img src={post.image} alt={post.title} className="h-56 w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
            </div>
            <div className="px-7">
              <DialogHeader className="space-y-4 text-left">
                <PostMeta post={post} />
                <DialogTitle className="font-display text-2xl font-bold leading-snug text-slate-900">
                  {post.title}
                </DialogTitle>
                <DialogDescription className="text-sm text-slate-500">
                  By the Saachi Infosoft editorial team
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 space-y-4" data-testid="blog-article-body">
                {post.body.map((para, i) => (
                  <p key={i} className="text-[15px] leading-relaxed text-slate-600">
                    {para}
                  </p>
                ))}
              </div>
              <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6">
                <p className="font-display text-lg font-bold text-slate-900">Want this working for you?</p>
                <p className="mt-1.5 text-sm text-slate-600">
                  Book a free consultation and we'll map the strategy to your business.
                </p>
                <Link
                  to="/contact"
                  onClick={onClose}
                  data-testid="blog-article-cta"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand-dark px-5 py-2.5 text-sm font-semibold text-white transition-all hover:scale-[1.03]"
                >
                  Talk to our team <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </article>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function Blog() {
  const [selected, setSelected] = useState(null);
  const [featured, ...rest] = BLOG_POSTS;

  return (
    <div data-testid="blog-page">
      <section className="noise relative overflow-hidden pb-14 pt-36 lg:pb-16 lg:pt-44" data-testid="blog-hero">
        <div className="hero-grid absolute inset-0" />
        <div className="absolute -top-32 right-1/3 h-[420px] w-[420px] rounded-full bg-brand/15 blur-[140px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <SectionTag>Insights</SectionTag>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Tech strategy &{" "}
            <span className="text-gradient-red">digital innovation.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Field notes from building software for a living practical, opinionated and written for
            founders and product teams.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-12 lg:pb-28" data-testid="blog-list">
        {/* Featured post */}
        <Reveal>
          <article
            data-testid={`blog-card-${featured.id}`}
            className="group grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_2px_12px_-4px_rgba(15,23,42,0.08)] transition-all duration-300 hover:border-red-300 hover:shadow-[0_24px_60px_-16px_rgba(220,38,38,0.28)] lg:grid-cols-2"
          >
            <div className="relative overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                loading="lazy"
                className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105 lg:h-full"
              />
              <span className="absolute left-5 top-5 rounded-full bg-gradient-to-r from-brand to-brand-dark px-3.5 py-1.5 text-xs font-bold text-white shadow-lg">
                Featured
              </span>
            </div>
            <div className="flex flex-col justify-center p-8 lg:p-10">
              <PostMeta post={featured} />
              <h2 className="mt-5 font-display text-2xl font-bold leading-snug text-slate-900 lg:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-slate-600">{featured.excerpt}</p>
              <button
                onClick={() => setSelected(featured)}
                data-testid={`blog-read-more-${featured.id}`}
                className="mt-7 inline-flex w-fit items-center gap-2 border-b border-brand pb-0.5 text-sm font-semibold text-brand transition-all duration-300 hover:gap-3.5"
              >
                Read More <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </article>
        </Reveal>

        {/* Remaining posts */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {rest.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.1}>
              <article
                data-testid={`blog-card-${post.id}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_2px_12px_-4px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-2 hover:border-red-300 hover:shadow-[0_24px_60px_-16px_rgba(220,38,38,0.28)]"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <PostMeta post={post} />
                  <h3 className="mt-4 font-display text-xl font-bold leading-snug text-slate-900">
                    {post.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">{post.excerpt}</p>
                  <button
                    onClick={() => setSelected(post)}
                    data-testid={`blog-read-more-${post.id}`}
                    className="mt-6 inline-flex w-fit items-center gap-2 border-b border-transparent pb-0.5 text-sm font-semibold text-brand transition-all duration-300 hover:gap-3.5 hover:border-brand"
                  >
                    Read More <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-[0_2px_12px_-4px_rgba(15,23,42,0.08)]" data-testid="blog-newsletter-cta">
            <p className="font-display text-lg font-bold text-slate-900">
              Every article, before anyone else.
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Subscribe to the newsletter in the footer below — one email a month, no noise.
            </p>
          </div>
        </Reveal>
      </section>

      <ArticleDialog post={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
