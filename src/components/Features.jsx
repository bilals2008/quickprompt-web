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

function ScreenshotCard({ icon: Icon, title, src }) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-border/50 bg-card/30 shadow-xl shadow-black/10 backdrop-blur-sm dark:shadow-black/30 sm:w-[400px]">
      <div className="flex items-center gap-1.5 border-b border-border/40 bg-card/50 px-3 py-2">
        <div className="flex gap-1">
          <div className="size-2 rounded-full bg-red-400/80" />
          <div className="size-2 rounded-full bg-yellow-400/80" />
          <div className="size-2 rounded-full bg-green-400/80" />
        </div>
        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
          <Icon className="size-3" stroke={2} />
          <span className="font-medium">{title}</span>
        </div>
      </div>
      <img src={src} alt={title} className="h-[400px] w-full object-cover sm:h-[600px]" />
    </div>
  );
}

const FEATURES = [
  {
    icon: IconBolt,
    title: "Instant Save",
    description: "Floating action button to save prompts in one click.",
    imgs: [
      "https://placehold.co/400x600/0a0a0f/f59e0b?text=Save+Panel",
      "https://placehold.co/400x600/0a0a0f/f59e0b?text=Quick+Action",
      "https://placehold.co/400x600/0a0a0f/f59e0b?text=Instant+Save",
    ],
    gradient: "from-amber-500 to-orange-500",
    glow: "rgba(245,158,11,0.15)",
  },
  {
    icon: IconCheck,
    title: "One-Click Copy",
    description: "Copy any prompt to your clipboard instantly.",
    imgs: [
      "https://placehold.co/400x600/0a0a0f/10b981?text=Copy+Button",
      "https://placehold.co/400x600/0a0a0f/10b981?text=Clipboard",
      "https://placehold.co/400x600/0a0a0f/10b981?text=One+Click+Done",
    ],
    gradient: "from-emerald-500 to-teal-500",
    glow: "rgba(16,185,129,0.15)",
  },
  {
    icon: IconSearch,
    title: "Full-Text Search",
    description: "Find any prompt across all your tags and content.",
    imgs: [
      "https://placehold.co/400x600/0a0a0f/0ea5e9?text=Search+Bar",
      "https://placehold.co/400x600/0a0a0f/0ea5e9?text=Results",
      "https://placehold.co/400x600/0a0a0f/0ea5e9?text=Filter+Tags",
    ],
    gradient: "from-sky-500 to-blue-500",
    glow: "rgba(14,165,233,0.15)",
  },
  {
    icon: IconPalette,
    title: "Themes",
    description: "Light, Dark, Forest, Ocean — pick your style.",
    imgs: [
      "https://placehold.co/400x600/0a0a0f/8b5cf6?text=Dark+Theme",
      "https://placehold.co/400x600/0a0a0f/8b5cf6?text=Light+Theme",
      "https://placehold.co/400x600/0a0a0f/8b5cf6?text=Forest+Theme",
    ],
    gradient: "from-violet-500 to-purple-500",
    glow: "rgba(139,92,246,0.15)",
  },
  {
    icon: IconKeyboard,
    title: "Keyboard-First",
    description: "Navigate everything without touching the mouse.",
    imgs: [
      "https://placehold.co/400x600/0a0a0f/ec4899?text=Shortcuts",
      "https://placehold.co/400x600/0a0a0f/ec4899?text=Command+Palette",
      "https://placehold.co/400x600/0a0a0f/ec4899?text=Hotkeys",
    ],
    gradient: "from-pink-500 to-rose-500",
    glow: "rgba(236,72,153,0.15)",
  },
  {
    icon: IconStar,
    title: "Favorites",
    description: "Star your most-used prompts for quick access.",
    imgs: [
      "https://placehold.co/400x600/0a0a0f/eab308?text=Star+Button",
      "https://placehold.co/400x600/0a0a0f/eab308?text=Favorites+List",
      "https://placehold.co/400x600/0a0a0f/eab308?text=Quick+Access",
    ],
    gradient: "from-yellow-500 to-amber-500",
    glow: "rgba(234,179,8,0.15)",
  },
  {
    icon: IconFolder,
    title: "Smart Tags",
    description: "Organize prompts with tags and autocomplete.",
    imgs: [
      "https://placehold.co/400x600/0a0a0f/14b8a6?text=Tag+Input",
      "https://placehold.co/400x600/0a0a0f/14b8a6?text=Autocomplete",
      "https://placehold.co/400x600/0a0a0f/14b8a6?text=Tag+Filter",
    ],
    gradient: "from-teal-500 to-cyan-500",
    glow: "rgba(20,184,166,0.15)",
  },
  {
    icon: IconRocket,
    title: "Blazing Fast",
    description: "Electron + SQLite — launches instantly.",
    imgs: [
      "https://placehold.co/400x600/0a0a0f/ef4444?text=Launch+Screen",
      "https://placehold.co/400x600/0a0a0f/ef4444?text=Instant+Load",
      "https://placehold.co/400x600/0a0a0f/ef4444?text=No+Loading",
    ],
    gradient: "from-red-500 to-orange-500",
    glow: "rgba(239,68,68,0.15)",
  },
];

export function Features() {
  const [active, setActive] = useState(0);
  const [focusedCard, setFocusedCard] = useState(null);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  const current = FEATURES[active];

  const focusCard = (idx) => {
    if (focusedCard === idx) {
      setFocusedCard(null);
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.to(card, {
          zIndex: i === 1 ? 10 : 0,
          y: 0,
          scale: 1,
          rotateZ: i === 0 ? -8 : i === 2 ? 8 : 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      });
    } else {
      setFocusedCard(idx);
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const isFocused = i === idx;
        gsap.to(card, {
          zIndex: isFocused ? 30 : 5,
          y: isFocused ? -24 : 0,
          scale: isFocused ? 1.08 : 0.95,
          rotateZ: isFocused ? 0 : i === 0 ? -8 : i === 2 ? 8 : 0,
          opacity: isFocused ? 1 : 0.5,
          duration: 0.4,
          ease: "power2.out",
        });
      });
    }
  };

  const switchTab = (i) => {
    if (i === active) return;
    setFocusedCard(null);
    const direction = i > active ? 1 : -1;
    const cards = cardsRef.current.filter(Boolean);

    gsap.to(cards, {
      opacity: 0,
      y: 30,
      rotateZ: (idx) => (idx === 0 ? -15 : idx === 2 ? 15 : 0),
      scale: 0.9,
      duration: 0.25,
      ease: "power2.in",
      stagger: 0.03,
      onComplete: () => {
        setActive(i);
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateZ: (idx) => (idx === 0 ? -8 : idx === 2 ? 8 : 0),
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.06,
          }
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
            autoAutoAlpha: 0,
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
            y: 50,
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

        {/* 3-card fan — desktop only, single card on mobile */}
        <div className="feature-showcase mx-auto mt-16 flex items-center justify-center">
          {/* Mobile: single center card */}
          <div className="sm:hidden">
            <ScreenshotCard
              icon={current.icon}
              title={current.title}
              src={current.imgs[1]}
            />
          </div>

          {/* Desktop: 3-card fan */}
          <div className="relative hidden h-[640px] w-full max-w-4xl sm:block">
            {/* Left card */}
            <div
              ref={(el) => (cardsRef.current[0] = el)}
              className="absolute left-[0%] top-8 cursor-pointer"
              style={{ transformOrigin: "bottom center" }}
              onClick={() => focusCard(0)}
            >
              <ScreenshotCard
                icon={current.icon}
                title={current.title}
                src={current.imgs[0]}
              />
            </div>

            {/* Center card */}
            <div
              ref={(el) => (cardsRef.current[1] = el)}
              className="absolute left-1/2 top-0 z-10 -translate-x-1/2 cursor-pointer"
              style={{ transformOrigin: "bottom center" }}
              onClick={() => focusCard(1)}
            >
              <ScreenshotCard
                icon={current.icon}
                title={current.title}
                src={current.imgs[1]}
              />
            </div>

            {/* Right card */}
            <div
              ref={(el) => (cardsRef.current[2] = el)}
              className="absolute right-[0%] top-8 cursor-pointer"
              style={{ transformOrigin: "bottom center" }}
              onClick={() => focusCard(2)}
            >
              <ScreenshotCard
                icon={current.icon}
                title={current.title}
                src={current.imgs[2]}
              />
            </div>
          </div>
        </div>

        {/* Feature description */}
        <div className="feature-showcase mx-auto mt-6 flex items-center justify-center gap-3">
          <div
            className={`inline-flex size-8 items-center justify-center rounded-lg bg-gradient-to-br ${current.gradient} shadow-md`}
            style={{ boxShadow: `0 4px 16px ${current.glow}` }}
          >
            <current.icon className="size-4 text-white" stroke={2} />
          </div>
          <p className="text-sm text-muted-foreground">
            {current.description}
          </p>
        </div>
      </div>
    </section>
  );
}
