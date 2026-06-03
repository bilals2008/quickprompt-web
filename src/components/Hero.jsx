import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { IconBolt, IconDownload, IconBrandGithub } from "@tabler/icons-react";

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
            y: 20,
            duration: reduceMotion ? 0 : 0.5,
          })
            .from(
              ".hero-title",
              {
                autoAlpha: 0,
                y: 40,
                duration: reduceMotion ? 0 : 1,
              },
              "-=0.3"
            )
            .from(
              ".hero-subtitle",
              {
                autoAlpha: 0,
                y: 30,
              },
              "-=0.6"
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
              ".hero-glow",
              {
                autoAlpha: 0,
                scale: 0.8,
                duration: reduceMotion ? 0 : 1.2,
                ease: "power2.out",
              },
              0
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
      className="relative flex min-h-[85vh] flex-col items-center justify-center px-6 text-center"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="hero-glow absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl">
        <div className="hero-badge mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
          <IconBolt className="size-4 text-primary" stroke={2.5} />
          <span>Now available for Windows & macOS</span>
        </div>

        <h1 className="hero-title text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Save prompts.
          <br />
          <span className="text-primary">Copy instantly.</span>
        </h1>

        <p className="hero-subtitle mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
          A fast, offline-first prompt manager. No accounts, no cloud — just your prompts, ready to copy.
        </p>

        <div className="hero-actions mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#download"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98]"
          >
            <IconDownload className="size-4" stroke={2.5} />
            Download Free
          </a>
          <a
            href="https://github.com/bilals2008/QuickPrompt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-muted active:scale-[0.98]"
          >
            <IconBrandGithub className="size-4" stroke={2} />
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
