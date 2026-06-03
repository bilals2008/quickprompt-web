import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import {
  IconBolt,
  IconDownload,
  IconBrandGithub,
  IconSparkles,
  IconArrowRight,
  IconShieldCheck,
  IconWifi,
  IconClock,
} from "@tabler/icons-react";

const TRUST_ITEMS = [
  { icon: IconShieldCheck, text: "No accounts needed" },
  { icon: IconWifi, text: "100% offline" },
  { icon: IconClock, text: "Instant copy" },
];

export function Hero() {
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
          const tl = gsap.timeline({
            defaults: {
              duration: reduceMotion ? 0 : 0.8,
              ease: "power3.out",
            },
          });

          tl.from(".hero-badge", {
            autoAlpha: 0,
            y: 24,
            duration: reduceMotion ? 0 : 0.6,
          })
            .from(
              ".hero-title-line",
              {
                autoAlpha: 0,
                y: 50,
                rotateX: 15,
                stagger: 0.15,
                duration: reduceMotion ? 0 : 1,
              },
              "-=0.3"
            )
            .from(
              ".hero-subtitle",
              {
                autoAlpha: 0,
                y: 24,
              },
              "-=0.5"
            )
            .from(
              ".hero-actions",
              {
                autoAlpha: 0,
                y: 20,
                duration: reduceMotion ? 0 : 0.6,
              },
              "-=0.4"
            )
            .from(
              ".hero-trust-item",
              {
                autoAlpha: 0,
                y: 16,
                stagger: 0.1,
                duration: reduceMotion ? 0 : 0.5,
              },
              "-=0.3"
            )
            .from(
              ".hero-mockup",
              {
                autoAlpha: 0,
                y: 60,
                scale: 0.95,
                duration: reduceMotion ? 0 : 1.2,
                ease: "power2.out",
              },
              "-=0.6"
            )
            .from(
              ".hero-glow-1",
              {
                autoAlpha: 0,
                scale: 0.6,
                duration: reduceMotion ? 0 : 1.4,
                ease: "power2.out",
              },
              0
            )
            .from(
              ".hero-glow-2",
              {
                autoAlpha: 0,
                scale: 0.5,
                duration: reduceMotion ? 0 : 1.6,
                ease: "power2.out",
              },
              0.2
            );
        }
      );

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16 text-center"
    >
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0">
        {/* Gradient mesh */}
        <div className="hero-glow-1 absolute left-[10%] top-[-10%] h-[600px] w-[600px] rounded-full bg-primary/[0.07] blur-[140px]" />
        <div className="hero-glow-2 absolute right-[5%] top-[20%] h-[500px] w-[500px] rounded-full bg-primary/[0.04] blur-[120px]" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Radial fade from center */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,var(--color-primary)/[0.08],transparent)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Badge */}
        <div className="hero-badge mb-8 inline-flex items-center gap-2.5 rounded-full border border-border/60 bg-card/50 px-4 py-2 text-sm backdrop-blur-sm">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/60 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          <span className="text-muted-foreground">
            Now available for Windows & macOS
          </span>
        </div>

        {/* Title */}
        <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="hero-title-line block">Save prompts.</span>
          <span className="hero-title-line block text-primary">
            Copy instantly.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle mx-auto max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
          A fast, offline-first prompt manager. No accounts, no cloud — just
          your prompts, ready to copy.
        </p>

        {/* Actions */}
        <div className="hero-actions mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#download"
            className="group inline-flex items-center gap-2.5 rounded-2xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:brightness-110 active:scale-[0.97]"
          >
            <IconDownload className="size-4 transition-transform group-hover:-translate-y-0.5" stroke={2.5} />
            Download Free
            <IconArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" stroke={2.5} />
          </a>
          <a
            href="https://github.com/bilals2008/QuickPrompt"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-2xl border border-border/80 bg-card/40 px-7 py-3.5 text-sm font-semibold text-foreground backdrop-blur-sm transition-all duration-300 hover:bg-card/70 hover:shadow-lg active:scale-[0.97]"
          >
            <IconBrandGithub
              className="size-4 transition-transform group-hover:rotate-6"
              stroke={2}
            />
            GitHub
          </a>
        </div>

        {/* Trust strip */}
        <div className="hero-trust mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {TRUST_ITEMS.map((item) => (
            <div
              key={item.text}
              className="hero-trust-item flex items-center gap-2 text-sm text-muted-foreground/80"
            >
              <item.icon className="size-4 text-primary/70" stroke={2} />
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        {/* App Mockup — replace src with your own screenshot */}
        <div className="hero-mockup mx-auto mt-14 max-w-2xl">
          <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/30 shadow-2xl shadow-black/10 backdrop-blur-sm transition-all duration-500 hover:shadow-3xl hover:shadow-primary/[0.06] dark:shadow-black/30">
            {/* Title bar */}
            <div className="flex items-center gap-2 border-b border-border/40 bg-card/50 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="size-3 rounded-full bg-red-400/80" />
                <div className="size-3 rounded-full bg-yellow-400/80" />
                <div className="size-3 rounded-full bg-green-400/80" />
              </div>
              <div className="mx-auto flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-1 text-xs text-muted-foreground">
                <IconSparkles className="size-3" stroke={2} />
                QuickPrompt
              </div>
            </div>

            <img
              src="https://placehold.co/1200x700/f8fafc/94a3b8?text=Your+App+Screenshot+Here"
              alt="QuickPrompt app preview"
              className="w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
