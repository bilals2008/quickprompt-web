// File: src/components/Features.jsx
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import {
  IconFolder,
  IconCopy,
  IconLayoutGrid,
  IconSearch,
  IconPalette,
  IconBolt,
  IconCheck,
  IconDownload,
} from "@tabler/icons-react";

const FEATURES = [
  {
    icon: IconFolder,
    pill: "Workspaces",
    title: "Organize prompts into folders",
    description:
      "Group prompts by project, client, or topic. Nest folders, drag to reorganize, and keep your library structured without breaking workflows.",
    screenshot: "/screenshots/workspace.avif",
    bullets: [
      "Nested folder hierarchy",
      "Drag & drop reordering",
      "Project-based grouping",
    ],
  },
  {
    icon: IconCopy,
    pill: "Copy Actions",
    title: "One-click copy to clipboard",
    description:
      "Copy any prompt to your clipboard with a single click. A clean notification toast confirms every successful action instantly.",
    screenshot: "/screenshots/instantcopy.avif",
    bullets: [
      "Instant copy shortcuts",
      "Visual toast confirmations",
      "Zero-latency execution",
    ],
  },
  {
    icon: IconSearch,
    pill: "Instant Search",
    title: "Find any prompt in milliseconds",
    description:
      "Full-text search scans across titles, tags, and prompt contents. Results update instantly as you type.",
    screenshot: "/screenshots/instantSearch.avif",
    bullets: [
      "Real-time keystroke filtering",
      "Deep search query matching",
      "Tag and title search",
    ],
  },
  {
    icon: IconLayoutGrid,
    pill: "Flexible Views",
    title: "Switch layout views on the fly",
    description:
      "Choose between list and grid view layouts. Use a dense list for quick browsing or a visual grid for scanning prompts.",
    screenshots: ["/screenshots/listview.avif", "/screenshots/gridview.avif"],
    bullets: [
      "Dense list layout",
      "Visual grid showcase",
      "Responsive card alignment",
    ],
  },
  {
    icon: IconPalette,
    pill: "Theming",
    title: "Personalize your workspace themes",
    description:
      "Switch between light, dark, and custom accent colors to match your preferences and make QuickPrompt feel like home.",
    screenshots: [
      "/screenshots/theming-1.avif",
      "/screenshots/theming-2.avif",
      "/screenshots/theming-3.avif",
    ],
    bullets: [
      "Light and dark mode themes",
      "Accent color customization",
      "Consistent UI styling",
    ],
  },
  {
    icon: IconDownload,
    pill: "Import & Export",
    title: "Move your library between machines",
    description:
      "Back up your entire prompt library or merge it from another tool. Supports JSON, CSV, and Markdown with drag-and-drop import and one-click JSON export.",
    screenshot: "/screenshots/ImportExport.avif",
    bullets: [
      "Drag-and-drop file import",
      "JSON, CSV & Markdown support",
      "Safe merge without overwriting",
    ],
  },
];

export function Features() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { reduceMotion } = context.conditions;

          gsap.from(".features-eyebrow", {
            autoAlpha: 0,
            y: 16,
            duration: reduceMotion ? 0 : 0.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".features-eyebrow",
              start: "top 88%",
              toggleActions: "play none none none",
            },
          });

          gsap.from(".features-title", {
            autoAlpha: 0,
            y: 24,
            duration: reduceMotion ? 0 : 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".features-title",
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });

          gsap.from(".features-subtitle", {
            autoAlpha: 0,
            y: 16,
            duration: reduceMotion ? 0 : 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".features-subtitle",
              start: "top 85%",
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
    <section
      ref={containerRef}
      id="features"
      className="relative overflow-hidden py-20 sm:py-28 scroll-mt-20"
    >
      {/* Background radial glow */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-20 md:mb-28">
          <div className="features-eyebrow mb-5 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm">
            <IconBolt className="size-3.5 text-primary" stroke={2.5} />
            Features
          </div>

          <h2 className="features-title text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Built for the way you work.
          </h2>

          <p className="features-subtitle mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            Six focused capabilities designed to make your prompt management
            fast, intuitive, and zero-bloat.
          </p>
        </div>

        {/* Feature Rows */}
        <div className="flex flex-col gap-28 md:gap-36">
          {FEATURES.map((feature, i) => {
            const isEven = i % 2 === 0;
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center"
              >
                {/* Text column with entrance animation */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -25 : 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={`md:col-span-5 flex flex-col justify-center ${
                    isEven ? "md:order-1" : "md:order-2"
                  }`}
                >
                  {/* Step Number & Category Pill */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex size-9 items-center justify-center rounded-full border border-primary/30 font-mono text-sm font-semibold text-primary transition-all duration-300 group-hover:border-primary group-hover:bg-primary/5">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/30 px-3 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      <Icon className="size-3.5 text-primary/80" stroke={2} />
                      <span>{feature.pill}</span>
                    </div>
                  </div>

                  {/* Title Heading in Serif Italic */}
                  <h3 className="text-balance text-2xl font-serif italic tracking-tight text-foreground sm:text-3xl leading-tight">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>

                  {/* Checkmark Bullets with micro-hover effect */}
                  <ul className="mt-6 flex flex-col gap-3">
                    {feature.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2.5 text-sm text-muted-foreground transition-all duration-300 hover:text-foreground hover:translate-x-1 group/bullet"
                      >
                        <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary mt-0.5 transition-transform duration-300 group-hover/bullet:scale-110">
                          <IconCheck className="size-3" stroke={3} />
                        </div>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Mockup Column with slide-in & scale animation */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 25 : -25, scale: 0.98 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className={`md:col-span-7 w-full relative ${
                    isEven ? "md:order-2" : "md:order-1"
                  }`}
                >
                  {/* Ambient glow behind the mockup — expands & intensifies on hover */}
                  <div
                    className="absolute -inset-4 rounded-3xl pointer-events-none blur-3xl"
                    style={{
                      background: `radial-gradient(ellipse at 50% 60%, hsl(var(--primary) / 0.12), transparent 70%)`,
                      transition: "opacity 0.7s cubic-bezier(0.25,1,0.5,1), transform 0.7s cubic-bezier(0.25,1,0.5,1)",
                    }}
                  />
                  <div
                    className="absolute -inset-4 rounded-3xl pointer-events-none blur-3xl opacity-0 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(ellipse at 50% 60%, hsl(var(--primary) / 0.22), transparent 65%)`,
                      transition: "opacity 0.6s cubic-bezier(0.25,1,0.5,1)",
                    }}
                  />

                  {/* Mockup Card Container */}
                  <div
                    className="relative overflow-hidden rounded-2xl bg-background pt-1.5"
                    style={{
                      border: "1px solid hsl(var(--border) / 0.8)",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
                      transition: "transform 0.65s cubic-bezier(0.25,1,0.5,1), box-shadow 0.65s cubic-bezier(0.25,1,0.5,1), border-color 0.65s cubic-bezier(0.25,1,0.5,1)",
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget;
                      el.style.transform = "translateY(-6px) scale(1.012)";
                      el.style.boxShadow = "0 20px 48px rgba(0,0,0,0.10), 0 8px 20px hsl(var(--primary) / 0.08), 0 0 0 1.5px hsl(var(--primary) / 0.30)";
                      el.style.borderColor = "hsl(var(--primary) / 0.35)";
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget;
                      el.style.transform = "translateY(0) scale(1)";
                      el.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)";
                      el.style.borderColor = "hsl(var(--border) / 0.8)";
                    }}
                  >
                    {/* Window title bar */}
                    <div className="flex items-center gap-1.5 border-b border-border/40 bg-muted/40 px-4 py-2">
                      <div className="flex gap-1.5">
                        <div className="size-2 rounded-full bg-[#ff5f56]" />
                        <div className="size-2 rounded-full bg-[#ffbd2e]" />
                        <div className="size-2 rounded-full bg-[#27c93f]" />
                      </div>
                      <div className="mx-auto font-sans text-[11px] font-medium text-muted-foreground/50">
                        {feature.pill} Preview
                      </div>
                    </div>

                    {/* App viewport */}
                    <div className="relative h-[220px] sm:h-[320px] w-full overflow-hidden bg-muted/5 flex items-center justify-center p-3">
                      {/* Glow overlay on hover */}
                      <div
                        className="absolute inset-0 pointer-events-none z-10 opacity-0 group-hover:opacity-100"
                        style={{
                          background: "radial-gradient(ellipse at 50% 50%, hsl(var(--primary) / 0.15), transparent 60%)",
                          transition: "opacity 0.5s ease",
                        }}
                      />
                      {/* Gradient border ring on hover */}
                      <div
                        className="absolute inset-0 rounded-2xl pointer-events-none z-10 opacity-0 group-hover:opacity-100"
                        style={{
                          boxShadow: "inset 0 0 0 1.5px hsl(var(--primary) / 0.4)",
                          transition: "opacity 0.4s ease",
                        }}
                      />
                      {feature.screenshots ? (
                        <div className="flex gap-2 h-full w-full items-center justify-center">
                              {feature.screenshots.map((src, idx) => (
                            <img
                              key={idx}
                              src={src}
                              alt={`${feature.title} preview ${idx + 1}`}
                              className="max-h-full object-contain rounded-lg"
                              style={{
                                transition: "transform 0.75s cubic-bezier(0.25,1,0.5,1), filter 0.75s cubic-bezier(0.25,1,0.5,1)",
                              }}
                              onMouseEnter={e => {
                                e.currentTarget.style.transform = "scale(1.06) translateY(-3px)";
                                e.currentTarget.style.filter = "brightness(1.04) contrast(1.01)";
                              }}
                              onMouseLeave={e => {
                                e.currentTarget.style.transform = "scale(1) translateY(0)";
                                e.currentTarget.style.filter = "brightness(1) contrast(1)";
                              }}
                              loading="lazy"
                            />
                          ))}
                        </div>
                      ) : feature.screenshot ? (
                        <img
                          src={feature.screenshot}
                          alt={`${feature.title} preview`}
                          className="max-w-full max-h-full object-contain"
                          style={{
                            transition: "transform 0.75s cubic-bezier(0.25,1,0.5,1), filter 0.75s cubic-bezier(0.25,1,0.5,1)",
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.transform = "scale(1.06) translateY(-3px)";
                            e.currentTarget.style.filter = "brightness(1.04) contrast(1.01)";
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.transform = "scale(1) translateY(0)";
                            e.currentTarget.style.filter = "brightness(1) contrast(1)";
                          }}
                          loading="lazy"
                        />
                      ) : null}
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* More Features CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-20 md:mt-28 text-center"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-border/40 bg-card/30 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm mb-5">
            <span className="flex size-2 rounded-full bg-primary/60" />
            And more
          </div>
          <h3 className="text-balance text-2xl font-serif italic tracking-tight text-foreground sm:text-3xl">
            ...and&nbsp;much&nbsp;more
          </h3>
          <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground">
            And we&rsquo;re just getting started &mdash; more is on the way.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
