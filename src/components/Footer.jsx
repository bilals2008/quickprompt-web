import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { IconBrandGithub, IconPackage, IconBug } from "@tabler/icons-react";

export function Footer() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { reduceMotion } = context.conditions;

          gsap.from(".footer-content", {
            autoAlpha: 0,
            y: 20,
            duration: reduceMotion ? 0 : 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".footer-content",
              start: "top 95%",
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
    <footer ref={containerRef} className="border-t border-border py-8">
      <div className="footer-content mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <img src="/logo.avif" alt="QuickPrompt" className="size-6 rounded-md object-cover" />
          <span className="text-sm font-semibold text-foreground">QuickPrompt</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Built by <span className="font-medium text-foreground">Muhammad Bilal Hassan</span>
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/bilals2008/QuickPrompt/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <IconPackage className="size-4" stroke={2} />
            Releases
          </a>
          <a
            href="https://github.com/bilals2008/QuickPrompt/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <IconBug className="size-4" stroke={2} />
            Issues
          </a>
          <a
            href="https://github.com/bilals2008/QuickPrompt"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <IconBrandGithub className="size-4" stroke={2} />
            Source
          </a>
        </div>
      </div>
    </footer>
  );
}
