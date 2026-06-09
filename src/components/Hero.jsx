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
  IconFolder,
  IconDots,
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
              ".hero-preview",
              {
                autoAlpha: 0,
                y: 40,
                scale: 0.95,
                duration: reduceMotion ? 0 : 1,
                ease: "power3.out",
              },
              "-=0.2"
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

        {/* App Preview Mockup — macOS window */}
        <div className="hero-preview mt-14 sm:mt-18 w-full max-w-4xl mx-auto">
          <div
            className="relative overflow-hidden rounded-2xl bg-background/90 backdrop-blur-sm pt-1.5 shadow-2xl shadow-primary/5"
            style={{ border: "1px solid hsl(var(--border))" }}
          >
            {/* Title bar */}
            <div className="flex items-center gap-2 border-b border-border/30 bg-muted/30 px-4 py-2.5">
              <div className="flex gap-1.5">
                <div className="size-2.5 rounded-full bg-[#ff5f56]" />
                <div className="size-2.5 rounded-full bg-[#ffbd2e]" />
                <div className="size-2.5 rounded-full bg-[#27c93f]" />
              </div>
              <div className="flex-1 flex items-center justify-center max-w-sm mx-auto">
                <div className="flex w-full items-center gap-2 rounded-lg border border-border/15 bg-muted/20 px-3 py-1.5">
                  <IconSearch className="size-3 text-muted-foreground/40" stroke={1.5} />
                  <span className="text-[11px] text-muted-foreground/40">Search prompts...</span>
                </div>
              </div>
            </div>

            {/* App interface */}
            <div className="flex h-[280px] sm:h-[380px]">
              {/* Sidebar */}
              <div className="w-44 shrink-0 border-r border-border/15 bg-muted/5 p-3 hidden sm:flex sm:flex-col gap-0.5">
                <div className="text-[10px] font-medium text-muted-foreground/40 uppercase tracking-widest px-2 py-1.5 mb-1">
                  Workspaces
                </div>
                {["All Prompts", "Client Work", "Personal", "Writing", "Templates"].map((name, i) => (
                  <div
                    key={name}
                    className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs transition-all duration-200 ${
                      i === 0
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground/60 hover:text-foreground hover:bg-muted/20"
                    }`}
                  >
                    <IconFolder className="size-3.5" stroke={1.5} />
                    {name}
                  </div>
                ))}
                <div className="mt-auto pt-3 border-t border-border/10">
                  <div className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-muted-foreground/40 cursor-default">
                    <IconDots className="size-3.5" stroke={1.5} />
                    <span>Import prompts</span>
                  </div>
                </div>
              </div>

              {/* Main content */}
              <div className="flex-1 p-4 flex flex-col gap-1.5">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-semibold text-foreground">All Prompts</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-muted-foreground/40">12 prompts</span>
                  </div>
                </div>
                {[
                  { title: "Design System Audit", preview: "Review all components for visual consistency..." },
                  { title: "API Documentation v2", preview: "Generate OpenAPI-compliant docs..." },
                  { title: "User Research Script", preview: "Semi-structured interview questions..." },
                  { title: "Release Notes — v2.1", preview: "Summarize all changes since last patch..." },
                  { title: "Brand Voice Guidelines", preview: "Tone, vocabulary, and messaging rules..." },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="group/row flex items-center justify-between rounded-lg border border-transparent px-3 py-2 transition-all duration-200 hover:border-border/20 hover:bg-muted/10"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">{item.title}</p>
                      <p className="text-[10px] text-muted-foreground/50 truncate mt-0.5">{item.preview}</p>
                    </div>
                    <IconCopy className="size-3.5 shrink-0 text-muted-foreground/30 opacity-0 transition-all duration-200 group-hover/row:opacity-100 group-hover/row:text-muted-foreground/60" stroke={1.5} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
