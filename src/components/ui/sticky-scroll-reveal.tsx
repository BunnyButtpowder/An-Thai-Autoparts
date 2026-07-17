"use client";
import React, { useRef } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "@/lib/utils";
import ArrowRight from "../icons/ArrowRight";

export interface StickyScrollItem {
  title: string;
  description: string;
  cta?: { label: string; href: string };
  content?: React.ReactNode;
}

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: StickyScrollItem[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    // Track this block's progress through the *page* scroll — the sticky panel
    // swaps as each aspect passes the centre of the viewport.
    target: ref,
    offset: ["start center", "end center"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - (cardsBreakpoints[acc] ?? 0))) {
          return index;
        }
        return acc;
      },
      0,
    );
    setActiveCard(closestBreakpointIndex);
  });

  const activeContent = content[activeCard]?.content ?? null;

  return (
    <div ref={ref} className="sticky-scroll relative grid gap-10 lg:grid-cols-2 lg:gap-20">
      {/* Left — the aspects. Each gets ~a screen of scroll height so the sticky
          panel has room to cross-fade to the next image as it passes centre. */}
      <div className="sticky-scroll-copy">
        {content.map((item, index) => (
          <div
            key={item.title + index}
            className="sticky-scroll-item flex flex-col justify-center py-8 lg:min-h-[70vh] lg:py-0"
          >
            {/* Inline image for mobile, where the sticky panel is hidden. */}
            {item.content && (
              <div className="sticky-scroll-item-media mb-6 aspect-16/10 w-full overflow-hidden rounded-2xl bg-muted lg:hidden">
                {item.content}
              </div>
            )}
            <motion.h3
              initial={false}
              animate={{ opacity: activeCard === index ? 1 : 0.3 }}
              className="text-2xl lg:text-3xl font-bold text-white"
            >
              {item.title}
            </motion.h3>
            <motion.p
              initial={false}
              animate={{ opacity: activeCard === index ? 1 : 0.3 }}
              className="mt-5 max-w-md text-base lg:text-lg leading-relaxed text-white/70"
            >
              {item.description}
            </motion.p>
            {item.cta && (
              <motion.a
                href={item.cta.href}
                initial={false}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="group/cta mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary cursor-pointer"
              >
                {item.cta.label}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
              </motion.a>
            )}
          </div>
        ))}
      </div>

      {/* Right — sticky panel pinned to viewport centre, cross-fading images. */}
      <div className="sticky-scroll-panel-col hidden lg:block">
        <div
          className={cn(
            "sticky-scroll-panel sticky top-1/2 h-[26rem] w-full -translate-y-1/2 overflow-hidden rounded-2xl bg-muted",
            contentClassName,
          )}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCard}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="h-full w-full"
            >
              {activeContent}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
