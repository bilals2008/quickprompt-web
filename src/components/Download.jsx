import { IconDownload, IconBrandWindows, IconBrandApple } from "@tabler/icons-react";

export function Download() {
  return (
    <section id="download" className="border-t border-border py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Download
        </p>
        <h2 className="mt-3 font-[var(--font-heading)] text-3xl font-bold tracking-tight sm:text-4xl">
          Get QuickPrompt on your machine.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
          Free and open source. Auto-updates keep you on the latest version.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          <a
            href="https://github.com/bilals2008/QuickPrompt/releases/latest"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-6 text-left transition-all hover:border-primary/30 hover:bg-primary/5"
          >
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/15">
              <IconBrandWindows className="size-6 text-primary" stroke={1.5} />
            </div>
            <div>
              <p className="font-[var(--font-heading)] text-base font-semibold">Windows</p>
              <p className="text-sm text-muted-foreground">Download for Windows</p>
            </div>
            <IconDownload className="ml-auto size-5 text-muted-foreground transition-colors group-hover:text-primary" stroke={2} />
          </a>

          <a
            href="https://github.com/bilals2008/QuickPrompt/releases/latest"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-6 text-left transition-all hover:border-primary/30 hover:bg-primary/5"
          >
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/15">
              <IconBrandApple className="size-6 text-primary" stroke={1.5} />
            </div>
            <div>
              <p className="font-[var(--font-heading)] text-base font-semibold">macOS</p>
              <p className="text-sm text-muted-foreground">Download for macOS</p>
            </div>
            <IconDownload className="ml-auto size-5 text-muted-foreground transition-colors group-hover:text-primary" stroke={2} />
          </a>
        </div>
      </div>
    </section>
  );
}
