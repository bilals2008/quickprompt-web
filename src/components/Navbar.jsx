import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  IconSun,
  IconMoon,
  IconMenu2,
  IconX,
  IconBrandGithub,
  IconDownload,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { useLatestRelease } from "@/hooks/use-latest-release";

const LINKS = [
  { label: "Features", href: "/#features" },
  { label: "Changelog", href: "/changelog" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const headerRef = useRef(null);
  const { pathname } = useLocation();
  const release = useLatestRelease();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/";

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full transition-all duration-300"
      style={{
        borderColor: scrolled ? "var(--color-border)" : "transparent",
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
        backgroundColor: scrolled
          ? "color-mix(in srgb, var(--color-background) 72%, transparent)"
          : "transparent",
        backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "blur(0px)",
        WebkitBackdropFilter: scrolled
          ? "blur(24px) saturate(180%)"
          : "blur(0px)",
      }}
    >
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link to="/" className="group flex items-center gap-2.5">
          <div className="relative">
            <img
              src="/logo.avif"
              alt="QuickPrompt"
              className="size-8 rounded-lg object-cover shadow-[0_0_0_1px_var(--color-border)] transition-all duration-300 group-hover:shadow-[0_0_16px_var(--color-primary)/0.3]"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-sm font-bold tracking-tight text-foreground sm:text-[15px]">
              QuickPrompt
            </span>
            {release.version && (
              <span className="mt-1 hidden w-fit rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary sm:inline-flex">
                v{release.version}
              </span>
            )}
          </div>
        </Link>

        {/* Desktop Nav — pill bar */}
        <div className="hidden items-center gap-0.5 rounded-full border border-border/50 bg-card/50 p-1 shadow-[0_2px_24px_rgba(0,0,0,0.06)] backdrop-blur-xl transition-all duration-300 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className="relative rounded-full px-4 py-2 text-[13px] font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
          <div className="mx-1 h-4 w-px bg-border/60" />
          <a
            href="https://github.com/bilals2008/QuickPrompt"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full px-3 py-2 text-[13px] font-medium text-muted-foreground transition-all duration-200 hover:bg-accent hover:text-foreground active:scale-95"
            aria-label="GitHub"
          >
            <IconBrandGithub className="size-3.5" stroke={2} />
            <span className="hidden lg:inline">GitHub</span>
          </a>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            className="size-9 rounded-full transition-all duration-200 hover:bg-accent hover:scale-110 active:scale-95"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <IconSun className="size-4" stroke={2} />
            ) : (
              <IconMoon className="size-4" stroke={2} />
            )}
          </Button>

          <Button
            asChild
            size="sm"
            className="hidden rounded-full px-4 py-2 text-[13px] shadow-[0_0_20px_var(--color-primary)/0.12] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_28px_var(--color-primary)/0.25] hover:brightness-110 active:scale-95 active:translate-y-0 sm:inline-flex"
          >
            <Link to="/#download">
              <IconDownload className="size-3.5" stroke={2.5} />
              Download
            </Link>
          </Button>

          {/* Mobile Hamburger */}
          <Button
            variant="ghost"
            size="icon"
            className="size-9 rounded-full transition-all duration-200 hover:bg-accent hover:scale-105 active:scale-95 md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? (
              <IconX className="size-4" stroke={2} />
            ) : (
              <IconMenu2 className="size-4" stroke={2} />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className="overflow-hidden border-t border-border/60 md:hidden"
        style={{
          maxHeight: open ? "400px" : "0px",
          opacity: open ? 1 : 0,
          transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease",
        }}
      >
        <div className="bg-background/95 px-4 py-4 backdrop-blur-xl">
          <div className="rounded-2xl border border-border/40 bg-card/60 p-2 shadow-lg">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-accent hover:text-foreground active:scale-[0.98]"
              >
                {l.label}
              </Link>
            ))}
            <a
              href="https://github.com/bilals2008/QuickPrompt"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-accent hover:text-foreground active:scale-[0.98]"
            >
              <IconBrandGithub className="size-4" stroke={1.75} />
              GitHub
            </a>
            <div className="mt-2 border-t border-border/50 pt-2">
              <Button asChild size="sm" className="h-10 w-full rounded-xl transition-all duration-200 hover:brightness-110 active:scale-[0.98]">
                <Link to="/#download" onClick={() => setOpen(false)}>
                  <IconDownload className="size-3.5" stroke={2.5} />
                  Download
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
