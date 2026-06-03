import {
  IconBolt,
  IconCheck,
  IconStar,
  IconSearch,
  IconPalette,
  IconKeyboard,
  IconFolder,
  IconRocket,
} from "@tabler/icons-react";

const FEATURES = [
  {
    icon: IconBolt,
    title: "Instant Save",
    description: "Floating action button to save prompts in one click.",
  },
  {
    icon: IconCheck,
    title: "One-Click Copy",
    description: "Copy any prompt to your clipboard instantly.",
  },
  {
    icon: IconStar,
    title: "Favorites",
    description: "Star your most-used prompts for quick access.",
  },
  {
    icon: IconSearch,
    title: "Full-Text Search",
    description: "Find any prompt across all your tags and content.",
  },
  {
    icon: IconPalette,
    title: "Themes",
    description: "Light, Dark, Forest, Ocean — pick what fits your style.",
  },
  {
    icon: IconKeyboard,
    title: "Keyboard-First",
    description: "Navigate and manage everything without touching the mouse.",
  },
  {
    icon: IconFolder,
    title: "Smart Tags",
    description: "Organize prompts with tags and autocomplete.",
  },
  {
    icon: IconRocket,
    title: "Blazing Fast",
    description: "Built on Electron with SQLite — launches instantly.",
  },
];

export function Features() {
  return (
    <section className="border-t border-border bg-card py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Features
          </p>
          <h2 className="mt-3 font-[var(--font-heading)] text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need, nothing you don&apos;t.
          </h2>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="group">
              <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/15">
                <f.icon className="size-5 text-primary" stroke={2} />
              </div>
              <h3 className="font-[var(--font-heading)] text-base font-semibold">
                {f.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
