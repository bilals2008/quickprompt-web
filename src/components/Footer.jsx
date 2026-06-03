import { IconBrandGithub } from "@tabler/icons-react";

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          Built by <span className="font-medium text-foreground">Muhammad Bilal Hassan</span>
        </p>
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
    </footer>
  );
}
