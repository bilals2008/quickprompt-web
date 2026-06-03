import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import {
  IconDownload,
  IconBrandGithub,
  IconShieldCheck,
  IconSparkles,
} from "@tabler/icons-react";
import { Link } from "@/components/ui/link";

const WINDOWS_LOGO =
  "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/windows/default.svg";
const APPLE_LOGO =
  "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/apple/default.svg";

const PLATFORMS = [
  {
    name: "Windows",
    logo: WINDOWS_LOGO,
    href: "https://github.com/bilals2008/QuickPrompt/releases/latest",
  },
  {
    name: "macOS",
    logo: APPLE_LOGO,
    href: "https://github.com/bilals2008/QuickPrompt/releases/latest",
  },
];

export function Download() {
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

          gsap.from(".dl-label", {
            autoAlpha: 0,
            y: 20,
            duration: reduceMotion ? 0 : 0.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".dl-label",
              start: "top 88%",
              toggleActions: "play none none none",
            },
          });

          gsap.from(".dl-title", {
            autoAlpha: 0,
            y: 30,
            duration: reduceMotion ? 0 : 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".dl-title",
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });

          gsap.from(".dl-subtitle", {
            autoAlpha: 0,
            y: 20,
            duration: reduceMotion ? 0 : 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".dl-subtitle",
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });

          gsap.from(".dl-card", {
            autoAlpha: 0,
            y: 40,
            scale: 0.96,
            duration: reduceMotion ? 0 : 0.7,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: ".dl-grid",
              start: "top 82%",
              toggleActions: "play none none none",
            },
          });

          gsap.from(".dl-trust", {
            autoAlpha: 0,
            y: 16,
            duration: reduceMotion ? 0 : 0.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".dl-trust",
              start: "top 90%",
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
      id="download"
      className="relative overflow-hidden py-28"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_100%,var(--color-primary)/[0.05],transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        {/* Header */}
        <div className="download-header">
          <div className="dl-label mb-4 inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/40 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm">
            <IconSparkles className="size-3.5 text-primary" stroke={2.5} />
            Free &amp; open source
          </div>

          <h2 className="dl-title text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:whitespace-nowrap lg:text-5xl">
            Get QuickPrompt on your machine.
          </h2>

          <p className="dl-subtitle mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
            Lightweight, fast, and private. Auto-updates keep you on the latest
            version — no account required.
          </p>
        </div>

        {/* Cards */}
        <div className="dl-grid mt-14 grid gap-4 sm:grid-cols-2">
          {PLATFORMS.map((p) => (
            <Link
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="dl-card group relative flex items-center gap-5 rounded-2xl border border-border/60 bg-card/40 p-6 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-card/70 hover:shadow-xl hover:shadow-primary/[0.06]"
            >
              {/* Hover glow */}
              <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/[0.06] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative flex size-14 shrink-0 items-center justify-center rounded-xl border border-border/50 bg-background/60 transition-all duration-300 group-hover:border-primary/20 group-hover:shadow-lg group-hover:shadow-primary/[0.06]">
                <img src={p.logo} alt={p.name} className="size-7" />
              </div>

              <div className="relative flex-1">
                <p className="text-base font-semibold text-foreground">
                  {p.name}
                </p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  Download for {p.name}
                </p>
              </div>

              <div className="relative flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/20">
                <IconDownload
                  className="size-5 text-primary transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-primary-foreground"
                  stroke={2}
                />
              </div>
            </Link>
          ))}
        </div>

        {/* Trust strip */}
        <div className="dl-trust mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground/70">
            <IconShieldCheck className="size-4 text-primary/60" stroke={2} />
            <span>No accounts, no tracking</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground/70">
            <IconBrandGithub className="size-4 text-primary/60" stroke={2} />
            <span>100% open source</span>
          </div>
        </div>
      </div>
    </section>
  );
}
