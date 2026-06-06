import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  IconBolt,
  IconBrandGithub,
  IconExternalLink,
} from "@tabler/icons-react";

export function PromptNest() {
  return (
    <section
      id="prompt-nest"
      className="relative overflow-hidden py-14 sm:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 z-0 h-[500px] w-[700px] -translate-x-1/2 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,var(--color-primary)/[0.08],transparent_70%)] opacity-80"
      />
      <div className="relative z-10 mx-auto max-w-6xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-xl text-center"
        >
          <Badge variant="tint" className="mb-4">
            <IconBolt className="size-3" stroke={1.75} />
            Also Check Out
          </Badge>
          <h2 className="text-balance text-3xl font-serif italic tracking-tight text-foreground sm:text-4xl">
            Need something more powerful?
          </h2>
          <p className="mt-4 text-pretty text-base text-muted-foreground">
            Prompt Nest is a full prompt library — organize with folders, tag
            everything, search instantly, and keep your prompts ready to copy.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://promptnest-web.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
            >
              <IconExternalLink className="size-4" stroke={2} />
              Try Prompt Nest
            </a>
            <a
              href="https://github.com/Muhammad-Bilal-Hassan/prompt-nest-web"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:bg-accent active:scale-[0.97]"
            >
              <IconBrandGithub className="size-4" stroke={2} />
              GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
