"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

function initials(name) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function AnimatedTestimonials({ testimonials, autoplay = true, className }) {
  const [active, setActive] = useState(0);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index) => index === active;

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [autoplay, handleNext]);

  const randomRotate = (i) => {
    const seed = [-6, 4, -3, 7, -8, 2][i % 6];
    return seed;
  };

  return (
    <div className={cn("mx-auto max-w-4xl", className)}>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* Stacked avatar cards */}
        <div className="relative mx-auto h-64 w-64 sm:h-72 sm:w-72">
          <AnimatePresence>
            {testimonials.map((t, index) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, scale: 0.9, rotate: randomRotate(index) }}
                animate={{
                  opacity: isActive(index) ? 1 : 0.6,
                  scale: isActive(index) ? 1 : 0.94,
                  z: isActive(index) ? 0 : -100,
                  rotate: isActive(index) ? 0 : randomRotate(index),
                  zIndex: isActive(index) ? 30 : testimonials.length + 2 - index,
                  y: isActive(index) ? [0, -20, 0] : 0,
                }}
                exit={{ opacity: 0, scale: 0.9, rotate: randomRotate(index) }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center rounded-sm border border-line-strong bg-paper-raised"
              >
                <span className="font-display text-4xl font-semibold text-brass">
                  {initials(t.name)}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Quote content */}
        <div className="flex flex-col justify-between py-2">
          <motion.div
            key={active}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <p className="font-mono text-xs text-brass">
              {testimonials[active].ticket}
            </p>
            <h3 className="mt-1 font-display text-xl font-semibold text-ink">
              {testimonials[active].name}
            </h3>
            <p className="text-sm text-ink-soft">{testimonials[active].designation}</p>
            <motion.p className="mt-4 text-base leading-relaxed text-ink-soft">
              {testimonials[active].quote.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ filter: "blur(6px)", opacity: 0, y: 4 }}
                  animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut", delay: 0.015 * i }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

          <div className="mt-8 flex gap-3">
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line-strong text-ink transition hover:border-ink"
            >
              ←
            </button>
            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line-strong text-ink transition hover:border-ink"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
