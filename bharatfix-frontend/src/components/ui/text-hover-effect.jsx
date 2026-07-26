"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

export function TextHoverEffect({ text, duration }) {
  const svgRef = useRef(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({ cx: `${cxPercentage}%`, cy: `${cyPercentage}%` });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 400 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="select-none"
    >
      <defs>
        <linearGradient id="bf-text-gradient" gradientUnits="userSpaceOnUse" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C99A47" />
          <stop offset="35%" stopColor="#B0431C" />
          <stop offset="65%" stopColor="#2F6E51" />
          <stop offset="100%" stopColor="#A0721F" />
        </linearGradient>

        <motion.radialGradient
          id="bf-reveal-mask"
          gradientUnits="userSpaceOnUse"
          r="22%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="bf-text-mask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#bf-reveal-mask)" />
        </mask>
      </defs>

      {/* base outline, always faintly visible */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.4"
        className="fill-transparent font-display text-6xl font-bold"
        style={{ stroke: "#3A4652", opacity: hovered ? 0.55 : 0.28 }}
      >
        {text}
      </text>

      {/* animated draw-in outline */}
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.4"
        stroke="#C99A47"
        className="fill-transparent font-display text-6xl font-bold"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 3, ease: "easeInOut" }}
      >
        {text}
      </motion.text>

      {/* gradient fill revealed only under the cursor mask */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#bf-text-gradient)"
        strokeWidth="0.4"
        mask="url(#bf-text-mask)"
        className="fill-transparent font-display text-6xl font-bold"
      >
        {text}
      </text>
    </svg>
  );
}
