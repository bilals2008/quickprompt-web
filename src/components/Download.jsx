import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { IconDownload } from "@tabler/icons-react";

const WINDOWS_LOGO = "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/windows/default.svg";
const APPLE_LOGO = "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/apple/default.svg";

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

          gsap.from(".download-header", {
            autoAlpha: 0,
            y: 30,
            duration: reduceMotion ? 0 : 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".download-header",
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });

          gsap.from(".download-card", {
            autoAlpha: 0,
            x: (i) => (i === 0 ? -40 : 40),
            duration: reduceMotion ? 0 : 0.7,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: ".download-grid",
              start: "top 80%",
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
      className="border-t border-border py-24"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <div className="download-header">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Download
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Get QuickPrompt on your machine.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Free and open source. Auto-updates keep you on the latest version.
          </p>
        </div>

        <div className="download-grid mt-12 grid gap-4 sm:grid-cols-2">
          <a
            href="https://github.com/bilals2008/QuickPrompt/releases/latest"
            target="_blank"
            rel="noopener noreferrer"
            className="download-card group flex items-center gap-4 rounded-2xl border border-border bg-card p-6 text-left transition-all hover:border-primary/30 hover:bg-primary/5"
          >
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/15">
              <img src={WINDOWS_LOGO} alt="Windows" className="size-6" />
            </div>
            <div>
              <p className="text-base font-semibold text-foreground">Windows</p>
              <p className="text-sm text-muted-foreground">Download for Windows</p>
            </div>
            <IconDownload className="ml-auto size-5 text-muted-foreground transition-colors group-hover:text-primary" stroke={2} />
          </a>

          <a
            href="https://github.com/bilals2008/QuickPrompt/releases/latest"
            target="_blank"
            rel="noopener noreferrer"
            className="download-card group flex items-center gap-4 rounded-2xl border border-border bg-card p-6 text-left transition-all hover:border-primary/30 hover:bg-primary/5"
          >
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/15">
              <img src={APPLE_LOGO} alt="macOS" className="size-6" />
            </div>
            <div>
              <p className="text-base font-semibold text-foreground">macOS</p>
              <p className="text-sm text-muted-foreground">Download for macOS</p>
            </div>
            <IconDownload className="ml-auto size-5 text-muted-foreground transition-colors group-hover:text-primary" stroke={2} />
          </a>
        </div>
      </div>
    </section>
  );
}
