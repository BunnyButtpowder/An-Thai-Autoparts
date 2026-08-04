import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface CarouselProps {
  items: React.ReactElement[];
}

type Card = {
  src: string;
  title: string;
  category: string;
  content?: React.ReactNode;
};

export const Carousel = ({ items }: CarouselProps) => {
  const scrollerRef = React.useRef<HTMLDivElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const pausedRef = React.useRef(false);

  // Continuous, seamless auto-scroll. The card set is duplicated so the reset at
  // the loop boundary is invisible — a constant-velocity drift instead of the
  // stop-start jumps of a stepped interval, which reads as far more premium.
  useEffect(() => {
    const scroller = scrollerRef.current;
    const track = trackRef.current;
    if (!scroller || !track) return;

    // Respect users who prefer reduced motion — leave the cards static.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const SPEED = 70; // px / second — slow, unhurried glide
    let raf = 0;
    let last = 0;

    // Exact width of one card set = the offset of the first duplicated card.
    const loopWidthOf = () => {
      const start = track.children[0] as HTMLElement | undefined;
      const dupe = track.children[items.length] as HTMLElement | undefined;
      return start && dupe ? dupe.offsetLeft - start.offsetLeft : 0;
    };
    let loopWidth = loopWidthOf();
    const measure = () => {
      loopWidth = loopWidthOf();
    };

    const tick = (now: number) => {
      if (last === 0) last = now;
      const dt = (now - last) / 1000;
      last = now;
      if (!pausedRef.current && loopWidth > 0) {
        let next = scroller.scrollLeft + SPEED * dt;
        if (next >= loopWidth) next -= loopWidth;
        scroller.scrollLeft = next;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
    };
  }, [items.length]);

  const loop = [...items, ...items];

  return (
    <div className="relative w-full">
      <div
        ref={scrollerRef}
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
        className="flex w-full overflow-x-hidden py-10 [scrollbar-width:none] md:py-20"
      >
        <div ref={trackRef} className="flex flex-row justify-start gap-4">
          {loop.map((item, index) => (
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  delay: 0.12 * (index % items.length),
                  ease: "easeOut",
                },
              }}
              key={"card" + index}
              className="rounded-3xl"
              aria-hidden={index >= items.length ? true : undefined}
            >
              {item}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Display-only card — no dialog. The `category` (a number) is rendered large and
// dimmed in the bottom-right corner; the title sits top-left over the image.
export const Card = ({ card }: { card: Card }) => {
  return (
    <div className="relative z-10 flex h-80 w-56 flex-col items-start justify-start overflow-hidden rounded-3xl bg-gray-100 md:h-[40rem] md:w-96 dark:bg-neutral-900">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-black/50 via-transparent to-transparent" />
      <div className="relative z-40 p-8">
        <p className="max-w-xs text-left font-sans text-xl font-semibold [text-wrap:balance] text-white md:text-3xl">
          {card.title}
        </p>
      </div>
      {/* <span className="brake-card-number pointer-events-none absolute bottom-2 right-5 z-40 select-none font-sans font-extrabold leading-[0.8] text-primary/15 text-[6rem] md:text-[11rem]">
        {card.category}
      </span> */}
      <BlurImage
        src={card.src}
        alt={card.title}
        className="absolute inset-0 z-10 object-cover"
      />
    </div>
  );
};

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <img
      className={cn(
        "h-full w-full transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        className,
      )}
      onLoad={() => setLoading(false)}
      src={src as string}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      alt={alt ? alt : "Background of a beautiful view"}
      {...rest}
    />
  );
};