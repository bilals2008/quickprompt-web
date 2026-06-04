import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import {
  IconDownload,
  IconBrandGithub,
  IconShieldCheck,
  IconSparkles,
  IconTag,
  IconExternalLink,
} from "@tabler/icons-react";
import { Link } from "@/components/ui/link";

const WINDOWS_LOGO =
  "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/windows/default.svg";
const APPLE_LOGO =
  "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/apple/default.svg";
const LINUX_LOGO =
  "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/linux/default.svg";

const PLATFORMS = [
  {
    name: "Windows",
    logo: WINDOWS_LOGO,
    href: "https://github.com/bilals2008/QuickPrompt/releases/latest",
    architectures: ["x64", "ARM64"],
    recommended: true,
  },
  {
    name: "macOS",
    logo: APPLE_LOGO,
    architectures: ["Intel", "Apple Silicon"],
    comingSoon: true,
  },
  {
    name: "Linux",
    logo: LINUX_LOGO,
    architectures: ["x64", "ARM64"],
    comingSoon: true,
  },
];

const TRUST_ITEMS = [
  { icon: IconShieldCheck, text: "No accounts, no tracking" },
  { icon: IconBrandGithub, text: "100% open source" },
];

export function Download() {
  const containerRef = useRef(null);
  const [latestVersion, setLatestVersion] = useState(null);

  useEffect(() => {
    fetch(
      "https://api.github.com/repos/bilals2008/QuickPrompt/releases/latest"
    )
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.tag_name) setLatestVersion(data.tag_name);
      })
      .catch(() => {});
  }, []);

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

          {latestVersion && (
            <div className="dl-subtitle mt-4 inline-flex items-center gap-1.5 rounded-lg border border-border/40 bg-card/30 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur-sm">
              <IconTag className="size-3.5 text-primary/70" stroke={2} />
              <span>
                Latest release:{" "}
                <a
                  href="https://github.com/bilals2008/QuickPrompt/releases/latest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-foreground underline underline-offset-2 decoration-border hover:decoration-primary transition-colors"
                >
                  {latestVersion}
                </a>
              </span>
            </div>
          )}
        </div>

        <div className="dl-grid mt-14 grid gap-4 sm:grid-cols-3">
          {PLATFORMS.map((p) => {
            const Tag = p.comingSoon ? "div" : Link;
            const linkProps = p.comingSoon
              ? {}
              : { href: p.href, target: "_blank", rel: "noopener noreferrer" };
            return (
              <Tag
                key={p.name}
                {...linkProps}
                className={`dl-card group relative flex flex-col gap-4 rounded-2xl border border-border/60 bg-card/40 p-6 text-left backdrop-blur-sm transition-all duration-300 ${
                  p.comingSoon
                    ? "opacity-60"
                    : "hover:-translate-y-1 hover:border-primary/30 hover:bg-card/70 hover:shadow-xl hover:shadow-primary/[0.06]"
                }`}
              >
                <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/[0.06] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {p.recommended && (
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground shadow-sm">
                    <IconSparkles className="size-2.5" stroke={2.5} />
                    Recommended
                  </div>
                )}

                {p.comingSoon && (
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 inline-flex items-center rounded-full border border-border/50 bg-card/80 px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground backdrop-blur-sm">
                    Coming Soon
                  </div>
                )}

                <div className="relative flex items-center gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-border/50 bg-background/60 transition-all duration-300 group-hover:border-primary/20 group-hover:shadow-lg group-hover:shadow-primary/[0.06]">
                    <img src={p.logo} alt={p.name} className="size-6" />
                  </div>

                  <div className="flex-1">
                    <p className="text-base font-semibold text-foreground">
                      {p.name}
                    </p>
                  </div>

                  {!p.comingSoon && (
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/20">
                      <IconDownload
                        className="size-5 text-primary transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-primary-foreground"
                        stroke={2}
                      />
                    </div>
                  )}
                </div>

                <div className="relative flex flex-wrap gap-1.5">
                  {p.architectures.map((arch) => (
                    <span
                      key={arch}
                      className="inline-flex items-center rounded-md border border-border/40 bg-background/40 px-2 py-0.5 text-[11px] font-medium text-muted-foreground/80 transition-colors group-hover:border-primary/20 group-hover:text-foreground/80"
                    >
                      {arch}
                    </span>
                  ))}
                </div>
              </Tag>
            );
          })}
        </div>

        <div className="dl-trust mt-5">
          <Link
            href="https://github.com/bilals2008/QuickPrompt/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border/40 bg-card/30 px-4 py-2 text-sm text-muted-foreground transition-all duration-300 hover:border-border hover:bg-card/60 hover:text-foreground"
          >
            <IconExternalLink className="size-3.5" stroke={2} />
            View all releases &amp; changelog
          </Link>
        </div>

        <div className="dl-trust mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {TRUST_ITEMS.map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-2 text-sm text-muted-foreground/70"
            >
              <item.icon className="size-4 text-primary/60" stroke={2} />
              <span>{item.text}</span>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}
