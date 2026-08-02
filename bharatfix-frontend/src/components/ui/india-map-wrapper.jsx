"use client";

import dynamic from "next/dynamic";

const IndiaMap = dynamic(
  () => import("./globe").then((m) => m.Globe),
  {
    ssr: false,
    loading: () => (
      <div className="map-frame h-[500px] w-full animate-pulse rounded-3xl bg-near-black p-px" />
    ),
  }
);

export default IndiaMap;
