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

function FeatureCard({ icon: Icon, title }) {
  return (
    <div className="group w-full overflow-hidden rounded-2xl border border-border/50 bg-card shadow-2xl shadow-black/15 backdrop-blur-sm sm:w-[400px]">
      <div className="flex items-center gap-2 border-b border-border/40 bg-card/60 px-4 py-2.5">
        <div className="flex gap-1.5">
          <div className="size-2.5 rounded-full bg-red-400/80" />
          <div className="size-2.5 rounded-full bg-yellow-400/80" />
          <div className="size-2.5 rounded-full bg-green-400/80" />
        </div>
        <span className="ml-1 text-[11px] font-medium text-muted-foreground">
          quickprompt
        </span>
      </div>
      <div className="relative flex h-[400px] items-center justify-center overflow-hidden sm:h-[560px]">
        <div className="relative flex flex-col items-center gap-5">
          <div className="flex size-24 items-center justify-center rounded-2xl bg-primary shadow-2xl transition-transform duration-300 ease-out will-change-transform max-sm:group-active:scale-90 sm:size-20">
            <Icon className="size-10 text-primary-foreground sm:size-9" stroke={1.5} />
          </div>
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="size-1.5 rounded-full bg-foreground/15"
              />
            ))}
          </div>
          <span className="text-xs font-medium text-muted-foreground/60">
            {title}
          </span>
        </div>
      </div>
    </div>
  );
}

const FEATURES = [
  {
    icon: IconBolt,
    title: "Instant Save",
    description: "Floating action button to save prompts in one click.",
  },
  {
    icon: IconCheck,
    title: "One-Click Copy",
    description: "Copy any prompt to your clipboard instantly.",
  },
  {
    icon: IconSearch,
    title: "Full-Text Search",
    description: "Find any prompt across all your tags and content.",
  },
  {
    icon: IconPalette,
    title: "Themes",
    description: "Light, Dark, Forest, Ocean — pick your style.",
  },
  {
    icon: IconKeyboard,
    title: "Keyboard-First",
    description: "Navigate everything without touching the mouse.",
  },
  {
    icon: IconStar,
    title: "Favorites",
    description: "Star your most-used prompts for quick access.",
  },
  {
    icon: IconFolder,
    title: "Smart Tags",
    description: "Organize prompts with tags and autocomplete.",
  },
  {
    icon: IconRocket,
    title: "Blazing Fast",
    description: "Electron + SQLite — launches instantly.",
  },
];

const FAN_ANGLES = [-6, 0, 6];

export function Features() {
  const [active, setActive] = useState(0);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const focusedRef = useRef(null);
  const animatingRef = useRef(false);

  const current = FEATURES[active];

  const focusCard = (idx) => {
    if (animatingRef.current) return;
    animatingRef.current = true;

    const wasFocused = focusedRef.current === idx;
    focusedRef.current = wasFocused ? null : idx;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.killTweensOf(card);
      const isFocused = !wasFocused && i === idx;

      gsap.to(card, {
        xPercent: i === 1 ? -50 : 0,
        zIndex: isFocused ? 30 : i === 1 ? 10 : 0,
        y: isFocused ? -20 : 0,
        scale: isFocused ? 1.05 : 1,
        rotation: isFocused ? 0 : FAN_ANGLES[i],
        opacity: isFocused ? 1 : wasFocused ? 1 : 0.5,
        duration: 0.35,
        ease: "power2.out",
        onComplete: () => {
          animatingRef.current = false;
        },
      });
    });
  };

  const switchTab = (i) => {
    if (i === active || animatingRef.current) return;
    animatingRef.current = true;
    focusedRef.current = null;

    const cards = cardsRef.current.filter(Boolean);
    cards.forEach((card) => gsap.killTweensOf(card));

    const tl = gsap.timeline({
      onComplete: () => {
        animatingRef.current = false;
      },
    });

    tl.to(cards, {
      xPercent: (j) => (j === 1 ? -50 : 0),
      opacity: 0,
      y: 30,
      scale: 0.92,
      rotation: (j) => FAN_ANGLES[j] * 1.5,
      duration: 0.3,
      ease: "power2.in",
      stagger: 0.03,
    });

    tl.call(() => setActive(i));

    tl.set(cards, {
      y: 40,
      scale: 0.92,
      rotation: (j) => FAN_ANGLES[j],
    });

    tl.to(cards, {
      xPercent: (j) => (j === 1 ? -50 : 0),
      opacity: 1,
      y: 0,
      scale: 1,
      rotation: (j) => FAN_ANGLES[j],
      duration: 0.5,
      ease: "power3.out",
      stagger: 0.06,
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

  useGSAP(() => {
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.set(card, {
        xPercent: i === 1 ? -50 : 0,
        y: 0,
        scale: 1,
        rotation: FAN_ANGLES[i],
        opacity: 1,
        zIndex: i === 1 ? 10 : 0,
      });
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="features"
      className="relative overflow-hidden py-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,var(--color-primary)/[0.04],transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
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
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-card/50 text-muted-foreground hover:scale-105 hover:bg-card hover:text-foreground"
                }`}
              >
                <Icon className="size-4" stroke={2} />
                <span className="hidden sm:inline">{f.title}</span>
              </button>
            );
          })}
        </div>

        <div className="feature-showcase mx-auto mt-16 flex items-center justify-center">
          <div className="w-full px-4 sm:hidden">
            <FeatureCard icon={current.icon} title={current.title} />
          </div>

          <div className="relative hidden h-[640px] w-full max-w-4xl sm:block">
            <div
              ref={(el) => (cardsRef.current[0] = el)}
              className="absolute left-0 top-8 cursor-pointer max-sm:active:scale-95"
              style={{ transformOrigin: "bottom center" }}
              onClick={() => focusCard(0)}
            >
              <FeatureCard icon={current.icon} title={current.title} />
            </div>

            <div
              ref={(el) => (cardsRef.current[1] = el)}
              className="absolute left-1/2 top-0 z-10 cursor-pointer max-sm:active:scale-95"
              style={{ transformOrigin: "bottom center" }}
              onClick={() => focusCard(1)}
            >
              <FeatureCard icon={current.icon} title={current.title} />
            </div>

            <div
              ref={(el) => (cardsRef.current[2] = el)}
              className="absolute right-0 top-8 cursor-pointer max-sm:active:scale-95"
              style={{ transformOrigin: "bottom center" }}
              onClick={() => focusCard(2)}
            >
              <FeatureCard icon={current.icon} title={current.title} />
            </div>
          </div>
        </div>

        <div className="feature-showcase mx-auto mt-8 flex flex-col items-center gap-3">
          <div className="inline-flex size-10 items-center justify-center rounded-xl bg-primary shadow-lg">
            <current.icon className="size-5 text-primary-foreground" stroke={2} />
          </div>
          <p className="max-w-md text-center text-sm leading-relaxed text-muted-foreground">
            {current.description}
          </p>
          <div className="mt-1 flex gap-2">
            {FEATURES.map((_, i) => (
              <button
                key={i}
                onClick={() => switchTab(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === active
                    ? "w-6 bg-primary"
                    : "w-1.5 bg-foreground/20 hover:bg-foreground/30"
                }`}
                aria-label={`Switch to ${FEATURES[i].title}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
