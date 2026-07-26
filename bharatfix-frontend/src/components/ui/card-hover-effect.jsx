"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export function HoverEffect({ items, className }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className={cn("grid grid-cols-1 gap-4 sm:grid-cols-3", className)}>
      {items.map((item, idx) => (
        <div
          key={item.title}
          className="group relative block h-full w-full p-1"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 block h-full w-full rounded-sm bg-ink/[0.05]"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.1 } }}
              />
            )}
          </AnimatePresence>

          <div className="relative z-20 h-full rounded-sm border border-line bg-paper-raised p-6 transition-colors group-hover:border-brass">
            <p className="font-mono text-xs text-brass">
              {String(idx + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-2 font-display text-lg font-semibold text-ink">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
