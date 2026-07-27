"use client";

import dynamic from "next/dynamic";

const IndiaMap = dynamic(
  () => import("./globe").then((m) => m.Globe),
  {
    ssr: false,
    loading: () => (
      <div className="h-[500px] w-full rounded-sm border border-white/10 bg-near-black animate-pulse" />
    ),
  }
);

export default IndiaMap;