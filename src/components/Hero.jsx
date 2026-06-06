// File: src/components/Hero.jsx
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import {
  IconDownload,
  IconBrandGithub,
  IconArrowRight,
  IconShieldCheck,
  IconWifi,
  IconClock,
  IconClipboard,
  IconCopy,
  IconBookmark,
  IconFileText,
  IconSearch,
} from "@tabler/icons-react";
import { Link } from "@/components/ui/link";

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

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (!prefersReduced) {
        gsap.utils.toArray(".floating-icon").forEach((el, i) => {
          gsap.to(el, {
            y: `${15 + i * 5}`,
            x: `${(i % 2 === 0 ? 1 : -1) * (8 + i * 3)}`,
            rotation: (i % 2 === 0 ? 1 : -1) * 5,
            duration: 4 + i * 0.8,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        });
      }

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

        {/* Floating icons — app-relevant */}
        <div className="floating-icon absolute left-[8%] top-[18%] text-primary opacity-[0.08] dark:opacity-[0.12]">
          <IconClipboard className="size-16 sm:size-20" stroke={1.5} />
        </div>
        <div className="floating-icon absolute right-[10%] top-[15%] text-primary opacity-[0.08] dark:opacity-[0.12]">
          <IconCopy className="size-14 sm:size-18" stroke={1.5} />
        </div>
        <div className="floating-icon absolute bottom-[22%] left-[15%] text-primary opacity-[0.06] dark:opacity-[0.1]">
          <IconBookmark className="size-14 sm:size-16" stroke={1.5} />
        </div>
        <div className="floating-icon absolute bottom-[28%] right-[12%] text-primary opacity-[0.06] dark:opacity-[0.1]">
          <IconFileText className="size-12 sm:size-14" stroke={1.5} />
        </div>
        <div className="floating-icon absolute left-[25%] bottom-[15%] text-primary opacity-[0.05] dark:opacity-[0.08]">
          <IconSearch className="size-10 sm:size-12" stroke={1.5} />
        </div>
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
        <h1 className="mb-6 flex flex-col gap-2 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="hero-title-line">Save prompts.</span>
          <span className="hero-title-line text-primary">
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
          <Link
            href="#download"
            className="group inline-flex items-center gap-2.5 rounded-2xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/35 hover:brightness-110 active:scale-[0.97] active:translate-y-0"
          >
            <IconDownload className="size-4 transition-transform group-hover:-translate-y-0.5" stroke={2.5} />
            Download Free
            <IconArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" stroke={2.5} />
          </Link>
          <Link
            href="https://github.com/bilals2008/QuickPrompt"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-2xl border border-border/80 bg-card/40 px-7 py-3.5 text-sm font-semibold text-foreground backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-border hover:bg-card/70 hover:shadow-lg active:scale-[0.97] active:translate-y-0"
          >
            <IconBrandGithub
              className="size-4 transition-transform group-hover:rotate-6"
              stroke={2}
            />
            GitHub
          </Link>
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

      </div>
    </section>
  );
}
