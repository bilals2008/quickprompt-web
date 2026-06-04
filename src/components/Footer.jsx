import { useEffect, useState } from "react";
import { IconArrowUp, IconBrandGithub } from "@tabler/icons-react";
import { useTheme } from "@/hooks/useTheme";
import SOCIALS from "@/data/socials.json";

const SOCIAL_ORDER = ["github", "x", "linkedin", "youtube", "discord"];

export function Footer() {
  const [showTop, setShowTop] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 520);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="border-t border-border bg-background">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 py-8 sm:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground sm:justify-start">
            <img
              src="/logo.avif"
              alt="QuickPrompt"
              className="size-5 rounded object-cover"
            />
            <span>Built by</span>
            <a
              href="https://github.com/bilals2008"
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer font-medium text-foreground transition-all duration-300 hover:text-primary hover:underline-offset-2 active:scale-95"
            >
              Muhammad Bilal Hassan
            </a>
          </div>

          <div className="flex items-center gap-3">
            {SOCIAL_ORDER.map((key) => {
              const s = SOCIALS[key];
              return (
                <a
                  key={key}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="group flex size-9 items-center justify-center rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/10 hover:shadow-lg hover:shadow-primary/[0.08] active:scale-90"
                >
                  <img
                    src={isDark ? s.icon.dark : s.icon.light}
                    alt={s.label}
                    className="size-5 opacity-60 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100"
                  />
                </a>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <a
              href="https://github.com/bilals2008/QuickPrompt"
              target="_blank"
              rel="noreferrer"
              className="flex cursor-pointer items-center gap-1.5 transition-all duration-300 hover:text-foreground active:scale-95"
            >
              <IconBrandGithub className="size-4" stroke={1.75} />
              Source
            </a>
            <a
              href="https://github.com/bilals2008/QuickPrompt/issues"
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer transition-all duration-300 hover:text-foreground active:scale-95"
            >
              Issues
            </a>
            <a
              href="https://github.com/bilals2008/QuickPrompt/releases"
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer transition-all duration-300 hover:text-foreground active:scale-95"
            >
              Releases
            </a>
          </div>
        </div>
      </footer>

      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed bottom-5 right-5 z-50 grid size-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_12px_34px_var(--color-primary)/0.22] transition-all duration-300 hover:-translate-y-1 hover:bg-primary/90 ${
          showTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <IconArrowUp className="size-5" stroke={2} />
      </button>
    </>
  );
}
