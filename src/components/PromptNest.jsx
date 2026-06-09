import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  IconBolt,
  IconBrandGithub,
  IconExternalLink,
  IconFolder,
  IconTag,
  IconSearch,
  IconCopy,
  IconArrowUpRight,
} from "@tabler/icons-react";

const FEATURES = [
  { icon: IconFolder, text: "Folder organization" },
  { icon: IconTag, text: "Smart tagging" },
  { icon: IconSearch, text: "Full-text search" },
  { icon: IconCopy, text: "One-click copy" },
];

export function PromptNest() {
  return (
    <section
      id="prompt-nest"
      className="relative overflow-hidden py-16 sm:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,var(--color-primary)/[0.07],transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-2xl"
        >
          {/* Card container */}
          <div className="relative rounded-3xl border border-border/50 bg-card/30 p-8 sm:p-12 text-center overflow-hidden backdrop-blur-sm">
            {/* Decorative glow */}
            <div className="pointer-events-none absolute -inset-40">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-80 rounded-full bg-primary/[0.06] blur-[120px]" />
            </div>

            <div className="relative">
              <Badge variant="tint" className="mb-5">
                <IconBolt className="size-3" stroke={1.75} />
                Also Check Out
              </Badge>

              <h2 className="text-balance text-3xl font-serif italic tracking-tight text-foreground sm:text-4xl">
                Need something more powerful?
              </h2>

              <p className="mx-auto mt-4 max-w-md text-pretty text-base text-muted-foreground leading-relaxed">
                Prompt Nest is a full prompt library — organize with folders,
                tag everything, search instantly, and keep your prompts ready to
                copy.
              </p>

              {/* Feature mini-list */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                {FEATURES.map((f) => (
                  <span
                    key={f.text}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border/30 bg-card/40 px-3 py-1 text-[11px] font-medium text-muted-foreground/70"
                  >
                    <f.icon className="size-3 text-primary/60" stroke={1.5} />
                    {f.text}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="https://promptnest-web.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30 hover:brightness-110 active:scale-[0.97]"
                >
                  <IconExternalLink className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" stroke={2} />
                  Try Prompt Nest
                  <IconArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" stroke={2.5} />
                </a>
                <a
                  href="https://github.com/Muhammad-Bilal-Hassan/prompt-nest-web"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-xl border border-border/80 bg-card/40 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-border hover:bg-card/70 hover:shadow-lg active:scale-[0.97]"
                >
                  <IconBrandGithub className="size-4 transition-transform duration-300 group-hover:rotate-6" stroke={2} />
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
