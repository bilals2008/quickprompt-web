import { useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconHistory,
  IconArrowLeft,
  IconSparkles,
  IconTag,
  IconDownload,
} from "@tabler/icons-react";
import { useLatestRelease } from "@/hooks/use-latest-release";
import changelogData from "@/data/changelog.json";

gsap.registerPlugin(ScrollTrigger);

const FILTERS = [
  { key: "all", label: "All releases" },
  { key: "stable", label: "Stable" },
  { key: "beta", label: "Beta" },
];

const TYPE_COLORS = {
  stable: { dot: "#34d399", bg: "#34d39912", border: "#34d39925" },
  beta: { dot: "#f59e0b", bg: "#f59e0b12", border: "#f59e0b25" },
  alpha: { dot: "#f43f5e", bg: "#f43f5e12", border: "#f43f5e25" },
};

function categorizeChange(change) {
  const lower = change.toLowerCase();
  if (lower.startsWith("fixed") || lower.startsWith("fix")) return { key: "fix", color: "#f43f5e" };
  if (lower.startsWith("new ") || lower.startsWith("added ") || lower.startsWith("implemented") || lower.startsWith("integrated") || lower.startsWith("created") || lower.startsWith("enabled") || lower.includes("support for") || lower.includes("functionality")) return { key: "feat", color: "#34d399" };
  if (lower.startsWith("refactored") || lower.startsWith("replaced") || lower.startsWith("migrated") || lower.startsWith("rewritten") || lower.startsWith("simplified") || lower.startsWith("removed") || lower.startsWith("cleaned") || lower.startsWith("updated") || lower.startsWith("improved")) return { key: "refactor", color: "#6366f1" };
  return { key: "other", color: "#7d7d9e" };
}

export function ChangelogPage() {
  const [filter, setFilter] = useState("all");
  const headerRef = useRef(null);
  const timelineRef = useRef(null);
  const cardsRef = useRef([]);
  const filterBarRef = useRef(null);
  const release = useLatestRelease();

  const releases = changelogData.releases;
  const filtered = filter === "all" ? releases : releases.filter((r) => r.type === filter);
  const totalStable = releases.filter((r) => r.type === "stable").length;
  const totalBeta = releases.filter((r) => r.type === "beta").length;

  useGSAP(() => {
    gsap.fromTo(
      headerRef.current?.querySelectorAll("[data-animate]"),
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      }
    );

    gsap.fromTo(
      filterBarRef.current,
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: 0.4,
        ease: "power2.out",
      }
    );

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { opacity: 0, y: 30, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          delay: 0.5 + i * 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, { scope: headerRef });

  const handleMouseMove = useCallback((e) => {
    const card = e.currentTarget;
    const inner = card.querySelector("[data-glow]");
    if (!inner) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    inner.style.setProperty("--mouse-x", `${x}%`);
    inner.style.setProperty("--mouse-y", `${y}%`);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div ref={headerRef} className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            opacity: 0.03,
          }}
        />
        <div className="pointer-events-none absolute left-[10%] top-[-10%] h-[400px] w-[400px] rounded-full bg-primary/[0.05] blur-[120px]" />
        <div className="pointer-events-none absolute right-[5%] top-[10%] h-[300px] w-[300px] rounded-full bg-primary/[0.03] blur-[100px]" />

        <div className="mx-auto max-w-4xl px-5 pt-10 pb-8 sm:pt-14 sm:pb-10">
          <div data-animate>
            <Link
              to="/"
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/50 px-3.5 py-1.5 text-sm text-muted-foreground backdrop-blur-sm transition-all duration-300 hover:border-border hover:bg-card/80 hover:text-foreground"
            >
              <IconArrowLeft className="size-4" stroke={2} />
              Back to home
            </Link>
          </div>

          <div data-animate className="flex flex-col items-center text-center">
            <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary shadow-[0_0_24px_var(--color-primary)/0.12]">
              <IconHistory className="size-6" stroke={1.75} />
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Changelog
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Every release, every improvement — tracked.
            </p>
          </div>

          <div data-animate className="mt-7 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10">
                <IconTag className="size-3.5 text-primary" stroke={2} />
              </span>
              <span className="font-semibold text-foreground">{releases.length}</span> releases
            </span>
            <span className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-lg bg-green-500/10">
                <IconSparkles className="size-3.5 text-green-500" stroke={2} />
              </span>
              <span className="font-semibold text-foreground">{totalStable}</span> stable
            </span>
            {totalBeta > 0 && (
              <span className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-lg bg-yellow-500/10">
                  <IconSparkles className="size-3.5 text-yellow-500" stroke={2} />
                </span>
                <span className="font-semibold text-foreground">{totalBeta}</span> beta
              </span>
            )}
            <span className="flex items-center gap-2">
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold tracking-wider text-primary shadow-[inset_0_0_0_1px_var(--color-primary)/0.2]">
                v{release.version}
              </span>
              latest
            </span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div ref={filterBarRef} className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center justify-center gap-1 px-5 py-3">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
                filter === f.key
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {filter === f.key && (
                <motion.span
                  layoutId="filter-active"
                  className="absolute inset-0 rounded-full bg-primary/10 shadow-[inset_0_0_0_1px_var(--color-primary)/0.18]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
              <span className="relative z-10">{f.label}</span>
            </button>
          ))}
          <span className="ml-auto text-xs text-muted-foreground">
            {filtered.length} release{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Timeline */}
      <div ref={timelineRef} className="mx-auto max-w-4xl px-5 py-12 sm:py-16">
        <div className="relative">
          {/* Glowing timeline line */}
          <div
            aria-hidden="true"
            className="absolute left-[19px] top-0 bottom-0 w-px sm:left-[23px]"
            style={{
              background: "linear-gradient(to bottom, transparent, var(--color-primary) 10%, var(--color-primary) 90%, transparent)",
              opacity: 0.15,
            }}
          />
          <div
            aria-hidden="true"
            className="absolute left-[19px] top-0 bottom-0 w-px blur-[3px] sm:left-[23px]"
            style={{
              background: "linear-gradient(to bottom, transparent, var(--color-primary) 10%, var(--color-primary) 90%, transparent)",
              opacity: 0.3,
            }}
          />

          <AnimatePresence mode="popLayout">
            {filtered.map((release, idx) => {
              const isLatest = releases.indexOf(release) === 0;
              const typeColor = TYPE_COLORS[release.type] || TYPE_COLORS.alpha;

              return (
                <motion.div
                  key={release.version}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10, scale: 0.97 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: idx * 0.03 }}
                  ref={(el) => (cardsRef.current[idx] = el)}
                  className="relative mb-6 pl-10 sm:pl-12 last:mb-0"
                >
                  {/* Timeline node */}
                  <div
                    className={`absolute left-0 top-5 z-10 flex items-center justify-center ${
                      isLatest ? "size-10 sm:size-11" : "size-9 sm:size-10"
                    }`}
                  >
                    {isLatest && (
                      <span className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
                    )}
                    <span
                      className={`relative flex items-center justify-center rounded-full border-2 shadow-lg ${
                        isLatest
                          ? "size-4 border-primary bg-primary shadow-[0_0_16px_var(--color-primary)/0.4]"
                          : "size-3 border-border bg-muted"
                      }`}
                    />
                  </div>

                  {/* Card */}
                  <div
                    className={`group relative overflow-hidden rounded-2xl border bg-card transition-all duration-500 ${
                      isLatest
                        ? "border-primary/20 shadow-[0_0_40px_var(--color-primary)/0.06]"
                        : "border-border hover:border-primary/15"
                    }`}
                    onMouseMove={handleMouseMove}
                  >
                    {/* Mouse-tracking glow */}
                    <div
                      data-glow
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background: `radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${typeColor.dot}06, transparent 50%)`,
                      }}
                    />
                    {/* Gradient border reveal */}
                    <div
                      className="absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background: `linear-gradient(135deg, ${typeColor.dot}15, transparent 40%, ${typeColor.dot}08)`,
                      }}
                    />

                    <div className="relative p-5 sm:p-6">
                      {/* Header */}
                      <div className="mb-4 flex flex-wrap items-center gap-2.5">
                        {isLatest && (
                          <span className="rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-primary-foreground shadow-[0_0_12px_var(--color-primary)/0.3]">
                            LATEST
                          </span>
                        )}
                        <span
                          className="rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider"
                          style={{
                            background: typeColor.bg,
                            color: typeColor.dot,
                            borderColor: typeColor.border,
                          }}
                        >
                          {release.type}
                        </span>
                        <span className="text-xs text-muted-foreground">{release.date}</span>
                      </div>

                      {/* Version */}
                      <h2
                        className={`tracking-tight text-foreground ${
                          isLatest
                            ? "text-2xl font-bold sm:text-3xl"
                            : "text-xl font-semibold sm:text-2xl"
                        }`}
                      >
                        v{release.version}
                      </h2>

                      {/* Changes */}
                      <div className="mt-4 space-y-1.5">
                        {release.changes.map((change, i) => {
                          const cat = categorizeChange(change);
                          return (
                            <div
                              key={i}
                              className="flex items-start gap-2.5 rounded-lg px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent/50"
                            >
                              <span
                                className="mt-1.5 size-1.5 shrink-0 rounded-full"
                                style={{ background: cat.color }}
                              />
                              <span>{change}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Bottom glow accent */}
                    <div
                      className="pointer-events-none absolute -bottom-16 -right-16 size-32 rounded-full opacity-[0.02] transition-opacity duration-500 group-hover:opacity-[0.06]"
                      style={{ background: typeColor.dot }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center text-muted-foreground"
            >
              <IconHistory className="mx-auto mb-3 size-8 opacity-30" stroke={1.5} />
              <p className="text-sm">No releases found for this filter.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
