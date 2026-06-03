import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import {
  IconBolt,
  IconCheck,
  IconStar,
  IconSearch,
  IconPalette,
  IconKeyboard,
  IconFolder,
  IconRocket,
} from "@tabler/icons-react";

const FEATURES = [
  {
    icon: IconBolt,
    title: "Instant Save",
    description: "Floating action button to save prompts in one click.",
    gradient: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-500 dark:text-amber-400",
  },
  {
    icon: IconCheck,
    title: "One-Click Copy",
    description: "Copy any prompt to your clipboard instantly.",
    gradient: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: IconStar,
    title: "Favorites",
    description: "Star your most-used prompts for quick access.",
    gradient: "from-yellow-500/20 to-amber-500/20",
    iconColor: "text-yellow-500 dark:text-yellow-400",
  },
  {
    icon: IconSearch,
    title: "Full-Text Search",
    description: "Find any prompt across all your tags and content.",
    gradient: "from-sky-500/20 to-blue-500/20",
    iconColor: "text-sky-600 dark:text-sky-400",
  },
  {
    icon: IconPalette,
    title: "Themes",
    description: "Light, Dark, Forest, Ocean — pick what fits your style.",
    gradient: "from-violet-500/20 to-purple-500/20",
    iconColor: "text-violet-600 dark:text-violet-400",
  },
  {
    icon: IconKeyboard,
    title: "Keyboard-First",
    description: "Navigate and manage everything without touching the mouse.",
    gradient: "from-pink-500/20 to-rose-500/20",
    iconColor: "text-pink-600 dark:text-pink-400",
  },
  {
    icon: IconFolder,
    title: "Smart Tags",
    description: "Organize prompts with tags and autocomplete.",
    gradient: "from-teal-500/20 to-cyan-500/20",
    iconColor: "text-teal-600 dark:text-teal-400",
  },
  {
    icon: IconRocket,
    title: "Blazing Fast",
    description: "Built on Electron with SQLite — launches instantly.",
    gradient: "from-red-500/20 to-orange-500/20",
    iconColor: "text-red-500 dark:text-red-400",
  },
];

export function Features() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { reduceMotion } = context.conditions;

          gsap.from(".features-label", {
            autoAlpha: 0,
            y: 20,
            duration: reduceMotion ? 0 : 0.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".features-label",
              start: "top 88%",
              toggleActions: "play none none none",
            },
          });

          gsap.from(".features-title", {
            autoAlpha: 0,
            y: 30,
            duration: reduceMotion ? 0 : 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".features-title",
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });

          gsap.from(".features-subtitle", {
            autoAlpha: 0,
            y: 20,
            duration: reduceMotion ? 0 : 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".features-subtitle",
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });

          gsap.from(".feature-card", {
            autoAlpha: 0,
            y: 40,
            duration: reduceMotion ? 0 : 0.6,
            ease: "power3.out",
            stagger: 0.07,
            scrollTrigger: {
              trigger: ".features-grid",
              start: "top 82%",
              toggleActions: "play none none none",
            },
          });
        }
      );

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="features"
      className="relative overflow-hidden py-28"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,var(--color-primary)/[0.04],transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="features-label text-sm font-semibold uppercase tracking-widest text-primary">
            Features
          </p>
          <h2 className="features-title mt-4 text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
            Everything you need,{" "}
            <span className="text-muted-foreground/60">nothing you don&apos;t.</span>
          </h2>
          <p className="features-subtitle mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
            QuickPrompt strips away the bloat. Eight focused features that make
            managing prompts actually enjoyable.
          </p>
        </div>

        {/* Grid */}
        <div className="features-grid mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="feature-card group relative rounded-2xl border border-border/50 bg-card/40 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-border hover:bg-card/70 hover:shadow-xl hover:shadow-black/[0.04] dark:hover:shadow-black/20"
            >
              {/* Hover glow */}
              <div
                className={`pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br ${f.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
              />

              <div className="relative">
                <div
                  className={`mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-gradient-to-br ${f.gradient} transition-transform duration-300 group-hover:scale-110`}
                >
                  <f.icon className={`size-5 ${f.iconColor}`} stroke={2} />
                </div>

                <h3 className="text-base font-semibold text-foreground">
                  {f.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {f.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
