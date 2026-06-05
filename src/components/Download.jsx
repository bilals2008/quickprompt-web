import { useRef } from "react";
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
import { useLatestRelease } from "@/hooks/use-latest-release";

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
    architectures: ["x64"],
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

function formatSize(bytes) {
  if (!bytes) return "";
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
}

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function Download() {
  const containerRef = useRef(null);
  const { version, windows, mac, releaseUrl, publishedAt, loading } = useLatestRelease();

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

  useGSAP(() => {
    const cards = containerRef.current?.querySelectorAll(".dl-card");
    if (!cards) return;

    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          y: -6,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto",
        });
        card.style.setProperty("--mouse-x", "50%");
        card.style.setProperty("--mouse-y", "50%");
      });
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty("--mouse-x", `${x}%`);
        card.style.setProperty("--mouse-y", `${y}%`);
      });
    });
  }, { scope: containerRef });

  const getDownloadUrl = (platform) => {
    if (platform === "Windows") return windows;
    if (platform === "macOS") return mac;
    return null;
  };

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

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <div className="download-header">
          <div className="dl-label mb-4 inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/40 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm">
            <IconSparkles className="size-3.5 text-primary" stroke={2.5} />
            Free &amp; open source
          </div>

          <h2 className="dl-title text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
            Get QuickPrompt on your machine.
          </h2>

          <p className="dl-subtitle mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
            Lightweight, fast, and private. Auto-updates keep you on the latest
            version — no account required.
          </p>

          <div className="dl-subtitle mt-4 flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-1.5 rounded-lg border border-border/40 bg-card/30 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur-sm">
              <IconTag className="size-3.5 text-primary/70" stroke={2} />
              <span>
                Latest:{" "}
                <span className="font-medium text-foreground">v{version}</span>
              </span>
            </div>
            {publishedAt && (
              <div className="inline-flex items-center gap-1.5 rounded-lg border border-border/40 bg-card/30 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur-sm">
                <span>Released {formatDate(publishedAt)}</span>
              </div>
            )}
          </div>
        </div>

        <div className="dl-grid mt-14 grid gap-5 sm:grid-cols-3">
          {PLATFORMS.map((p) => {
            const downloadUrl = getDownloadUrl(p.name);
            const isReady = !p.comingSoon && downloadUrl;

            return (
              <div
                key={p.name}
                className={`dl-card group relative flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center transition-all duration-300 will-change-transform ${
                  p.comingSoon
                    ? "opacity-60"
                    : "hover:border-transparent"
                }`}
              >
                {!p.comingSoon && (
                  <div
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), var(--color-primary)/[0.08], transparent 40%)`,
                    }}
                  />
                )}

                {!p.comingSoon && (
                  <div className="absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(135deg, var(--color-primary)/[0.15], transparent 50%, var(--color-primary)/[0.08])`,
                    }}
                  />
                )}

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

                <div className="relative grid size-20 place-items-center rounded-full">
                  <div className="absolute inset-0 rounded-full opacity-20 blur-xl transition-opacity duration-500 group-hover:opacity-40"
                    style={{
                      background: `var(--color-primary)`,
                    }}
                  />
                  <div className="absolute inset-0 rounded-full border transition-all duration-500"
                    style={{
                      borderColor: `color-mix(in srgb, var(--color-primary) 25%, transparent)`,
                    }}
                  />
                  <div className="absolute -inset-2 rounded-full border border-dashed transition-all duration-500 group-hover:rotate-90"
                    style={{
                      borderColor: `color-mix(in srgb, var(--color-primary) 18%, transparent)`,
                    }}
                  />
                  <img src={p.logo} alt={p.name} className="relative z-10 size-9" />
                </div>

                <div className="relative mt-6 flex flex-col items-center gap-3">
                  <p className="text-lg font-semibold text-foreground">{p.name}</p>

                  <div className="flex flex-wrap justify-center gap-1.5">
                    {p.architectures.map((arch) => (
                      <span
                        key={arch}
                        className="inline-flex items-center rounded-md border border-border/40 bg-background/40 px-2 py-0.5 text-[11px] font-medium text-muted-foreground/80"
                      >
                        {arch}
                      </span>
                    ))}
                  </div>

                  {!p.comingSoon && (
                    <div className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      <span className="inline-block size-1.5 rounded-full bg-primary" />
                      Ready to download
                    </div>
                  )}

                  {p.comingSoon && (
                    <div className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                      <IconSparkles className="size-3" stroke={2} />
                      Coming soon
                    </div>
                  )}
                </div>

                <div className="relative mt-6 w-full">
                  {isReady && (
                    <a
                      href={downloadUrl}
                      download
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:brightness-110 active:scale-[0.97]"
                    >
                      <IconDownload className="size-4" stroke={2} />
                      Download for {p.name}
                    </a>
                  )}
                  {!isReady && !p.comingSoon && (
                    <div className="flex w-full items-center justify-center gap-2 rounded-xl border border-border/60 bg-card/50 py-2.5 text-sm font-medium text-muted-foreground">
                      <IconDownload className="size-4" stroke={2} />
                      {loading ? "Loading..." : "Not available yet"}
                    </div>
                  )}
                  {p.comingSoon && (
                    <div className="flex w-full items-center justify-center gap-2 rounded-xl border border-border/60 bg-card/50 py-2.5 text-sm font-medium text-muted-foreground">
                      <IconSparkles className="size-4" stroke={2} />
                      Notify me
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="dl-trust mt-5">
          <a
            href={releaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border/40 bg-card/30 px-4 py-2 text-sm text-muted-foreground transition-all duration-300 hover:border-border hover:bg-card/60 hover:text-foreground"
          >
            <IconExternalLink className="size-3.5" stroke={2} />
            View all releases &amp; changelog
          </a>
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
