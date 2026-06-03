import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { IconBrandGithub, IconPackage, IconBug } from "@tabler/icons-react";
import { Link } from "@/components/ui/link";

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
            y: 16,
            duration: reduceMotion ? 0 : 0.5,
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
    <footer ref={containerRef} className="relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="footer-content mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <Link href="#" className="group flex items-center gap-2.5">
          <img
            src="/logo.avif"
            alt="QuickPrompt"
            className="size-5.5 rounded-md object-cover shadow-[0_0_0_1px_var(--color-border)] transition-shadow duration-300 group-hover:shadow-[0_0_12px_var(--color-primary)/0.25]"
          />
          <span className="text-[13px] font-semibold tracking-tight text-foreground">
            QuickPrompt
          </span>
        </Link>

        <p className="text-[13px] text-muted-foreground">
          Built by{" "}
          <span className="font-medium text-foreground/80">Muhammad Bilal Hassan</span>
        </p>

        <div className="flex items-center gap-1">
          {[
            {
              href: "https://github.com/bilals2008/QuickPrompt/releases",
              icon: IconPackage,
              label: "Releases",
            },
            {
              href: "https://github.com/bilals2008/QuickPrompt/issues",
              icon: IconBug,
              label: "Issues",
            },
            {
              href: "https://github.com/bilals2008/QuickPrompt",
              icon: IconBrandGithub,
              label: "Source",
            },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[13px] text-muted-foreground hover:bg-accent/60 hover:text-foreground"
            >
              <link.icon
                className="size-3.5 transition-transform duration-200 group-hover/link:scale-110"
                stroke={2}
              />
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
