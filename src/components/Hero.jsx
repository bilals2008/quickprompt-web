import { IconBolt, IconDownload, IconBrandGithub } from "@tabler/icons-react";

export function Hero() {
  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center px-6 text-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
          <IconBolt className="size-4 text-primary" stroke={2.5} />
          <span>Now available for Windows & macOS</span>
        </div>

        <h1 className="font-[var(--font-heading)] text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
          Save prompts.
          <br />
          <span className="text-primary">Copy instantly.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          A fast, offline-first prompt manager. No accounts, no cloud — just your prompts, organized and ready to copy with one click.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
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
