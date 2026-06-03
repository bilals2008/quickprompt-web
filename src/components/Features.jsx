import { useRef, useState } from "react";
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
import { Link } from "@/components/ui/link";

const FEATURES = [
  {
    icon: IconBolt,
    title: "Instant Save",
    description: "Floating action button to save prompts in one click.",
    img: "https://placehold.co/1200x750/0a0a0f/f59e0b?text=Instant+Save",
    gradient: "from-amber-500 to-orange-500",
    glow: "rgba(245,158,11,0.15)",
  },
  {
    icon: IconCheck,
    title: "One-Click Copy",
    description: "Copy any prompt to your clipboard instantly.",
    img: "https://placehold.co/1200x750/0a0a0f/10b981?text=One-Click+Copy",
    gradient: "from-emerald-500 to-teal-500",
    glow: "rgba(16,185,129,0.15)",
  },
  {
    icon: IconSearch,
    title: "Full-Text Search",
    description: "Find any prompt across all your tags and content.",
    img: "https://placehold.co/1200x750/0a0a0f/0ea5e9?text=Search",
    gradient: "from-sky-500 to-blue-500",
    glow: "rgba(14,165,233,0.15)",
  },
  {
    icon: IconPalette,
    title: "Themes",
    description: "Light, Dark, Forest, Ocean — pick your style.",
    img: "https://placehold.co/1200x750/0a0a0f/8b5cf6?text=Themes",
    gradient: "from-violet-500 to-purple-500",
    glow: "rgba(139,92,246,0.15)",
  },
  {
    icon: IconKeyboard,
    title: "Keyboard-First",
    description: "Navigate everything without touching the mouse.",
    img: "https://placehold.co/1200x750/0a0a0f/ec4899?text=Keyboard+First",
    gradient: "from-pink-500 to-rose-500",
    glow: "rgba(236,72,153,0.15)",
  },
  {
    icon: IconStar,
    title: "Favorites",
    description: "Star your most-used prompts for quick access.",
    img: "https://placehold.co/1200x750/0a0a0f/eab308?text=Favorites",
    gradient: "from-yellow-500 to-amber-500",
    glow: "rgba(234,179,8,0.15)",
  },
  {
    icon: IconFolder,
    title: "Smart Tags",
    description: "Organize prompts with tags and autocomplete.",
    img: "https://placehold.co/1200x750/0a0a0f/14b8a6?text=Smart+Tags",
    gradient: "from-teal-500 to-cyan-500",
    glow: "rgba(20,184,166,0.15)",
  },
  {
    icon: IconRocket,
    title: "Blazing Fast",
    description: "Electron + SQLite — launches instantly.",
    img: "https://placehold.co/1200x750/0a0a0f/ef4444?text=Blazing+Fast",
    gradient: "from-red-500 to-orange-500",
    glow: "rgba(239,68,68,0.15)",
  },
];

export function Features() {
  const [active, setActive] = useState(0);
  const containerRef = useRef(null);
  const imgRef = useRef(null);

  const switchTab = (i) => {
    if (i === active) return;
    const direction = i > active ? 1 : -1;

    gsap.to(imgRef.current, {
      opacity: 0,
      x: -20 * direction,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        setActive(i);
        gsap.fromTo(
          imgRef.current,
          { opacity: 0, x: 20 * direction },
          { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" }
        );
      },
    });
  };

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

          gsap.from(".features-header > *", {
            autoAlpha: 0,
            y: 24,
            stagger: 0.1,
            duration: reduceMotion ? 0 : 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".features-header",
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });

          gsap.from(".feature-tabs", {
            autoAlpha: 0,
            y: 20,
            duration: reduceMotion ? 0 : 0.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".feature-tabs",
              start: "top 88%",
              toggleActions: "play none none none",
            },
          });

          gsap.from(".feature-showcase", {
            autoAlpha: 0,
            y: 40,
            scale: 0.97,
            duration: reduceMotion ? 0 : 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".feature-showcase",
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        }
      );

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  const current = FEATURES[active];

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
        <div className="features-header mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Features
          </p>
          <h2 className="mt-4 text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
            Everything you need,
            <br />
            <span className="bg-gradient-to-r from-primary via-primary/70 to-primary/40 bg-clip-text text-transparent">
              nothing you don&apos;t.
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
            Eight focused features that make managing prompts actually
            enjoyable.
          </p>
        </div>

        {/* Tabs */}
        <div className="feature-tabs mx-auto mt-14 flex max-w-3xl flex-wrap items-center justify-center gap-2">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            const isActive = i === active;
            return (
              <button
                key={f.title}
                onClick={() => switchTab(i)}
                className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300 active:scale-95 ${
                  isActive
                    ? `bg-gradient-to-r ${f.gradient} text-white shadow-lg`
                    : "bg-card/50 text-muted-foreground hover:bg-card hover:text-foreground hover:scale-105"
                }`}
                style={
                  isActive ? { boxShadow: `0 4px 20px ${current.glow}` } : {}
                }
              >
                <Icon className="size-4" stroke={2} />
                <span className="hidden sm:inline">{f.title}</span>
              </button>
            );
          })}
        </div>

        {/* Showcase */}
        <div className="feature-showcase mx-auto mt-10 max-w-4xl">
          <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/30 shadow-2xl shadow-black/10 backdrop-blur-sm dark:shadow-black/30">
            {/* Top bar */}
            <div className="flex items-center gap-2 border-b border-border/40 bg-card/50 px-5 py-3.5">
              <div className="flex gap-1.5">
                <div className="size-3 rounded-full bg-red-400/80" />
                <div className="size-3 rounded-full bg-yellow-400/80" />
                <div className="size-3 rounded-full bg-green-400/80" />
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <current.icon className="size-4" stroke={2} />
                <span className="font-medium">{current.title}</span>
              </div>
            </div>

            {/* Screenshot */}
            <div className="relative aspect-[16/10]">
              <img
                ref={imgRef}
                src={current.img}
                alt={current.title}
                className="h-full w-full object-cover"
              />
              {/* Gradient overlay at bottom */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-card/80 to-transparent" />
            </div>
          </div>

          {/* Feature description below */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <div
              className={`inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-br ${current.gradient} shadow-md`}
              style={{ boxShadow: `0 4px 16px ${current.glow}` }}
            >
              <current.icon className="size-4.5 text-white" stroke={2} />
            </div>
            <p className="text-base text-muted-foreground">
              {current.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
