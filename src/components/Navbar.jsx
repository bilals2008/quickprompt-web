import { useState, useEffect, useRef } from "react";
import { IconSun, IconMoon, IconMenu2, IconX, IconBrandGithub, IconDownload } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";

const LINKS = [
  { label: "Features", href: "#features" },
  { label: "Download", href: "#download" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const headerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full border-b transition-all duration-300"
      style={{
        borderColor: scrolled ? "var(--color-border)" : "transparent",
        backgroundColor: scrolled
          ? "color-mix(in srgb, var(--color-background) 80%, transparent)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "blur(0px)",
      }}
    >
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <a href="#" className="group flex items-center gap-2.5">
          <div className="relative">
            <img
              src="/logo.avif"
              alt="QuickPrompt"
              className="size-8 rounded-lg object-cover shadow-[0_0_0_1px_var(--color-border)] transition-all group-hover:shadow-[0_0_12px_var(--color-primary)/0.3]"
            />
          </div>
          <span className="text-sm font-bold tracking-tight text-foreground sm:text-[15px]">
            QuickPrompt
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 rounded-full bg-card/65 p-1 shadow-[inset_0_0_0_1px_var(--color-border),0_2px_20px_rgba(0,0,0,0.08)] backdrop-blur-xl md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative rounded-full px-3.5 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://github.com/bilals2008/QuickPrompt"
            target="_blank"
            rel="noopener noreferrer"
            className="grid size-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label="GitHub"
          >
            <IconBrandGithub className="size-4" stroke={1.75} />
          </a>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="size-9 rounded-full"
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
            className="hidden rounded-full px-4 shadow-[0_0_20px_var(--color-primary)/0.16] sm:inline-flex"
          >
            <a href="#download">
              <IconDownload className="size-3.5" stroke={2} />
              Download
            </a>
          </Button>

          {/* Mobile Hamburger */}
          <Button
            variant="ghost"
            size="icon"
            className="size-9 rounded-full bg-card/70 md:hidden"
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
        className="overflow-hidden border-t border-border transition-all duration-300 md:hidden"
        style={{
          maxHeight: open ? "400px" : "0px",
          opacity: open ? 1 : 0,
        }}
      >
        <div className="bg-background/95 px-4 py-4 backdrop-blur-xl">
          <div className="rounded-2xl bg-card/70 p-2 shadow-[inset_0_0_0_1px_var(--color-border)]">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://github.com/bilals2008/QuickPrompt"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <IconBrandGithub className="size-4" stroke={1.75} />
              GitHub
            </a>
            <div className="mt-2 border-t border-border pt-2">
              <Button asChild size="sm" className="h-10 w-full rounded-xl">
                <a href="#download" onClick={() => setOpen(false)}>
                  <IconDownload className="size-3.5" stroke={2} />
                  Download
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
