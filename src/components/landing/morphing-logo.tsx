"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import teambotoLogo from "@/assets/teamboto.png";

const MORPH_END = 500;
const SOURCE_PX = 288;                      // intrinsic rendered height (h-72)
const HALF = SOURCE_PX / 2;                 // 144 — used for centering math
const FINAL_PX = 56;                        // target height after morph (h-14)
const END_SCALE = FINAL_PX / SOURCE_PX;     // ≈ 0.194

// Mirrors the hero/navbar container: max-w-7xl mx-auto px-4 md:px-6
const MAX_CONTENT = 1280;                   // max-w-7xl
const PADDING_MOBILE = 16;                  // px-4
const PADDING_DESKTOP = 24;                 // md:px-6
const MD_BREAKPOINT = 768;

export function MorphingLogo() {
  const { scrollY } = useScroll();
  const [viewport, setViewport] = useState({ w: 1024, h: 768 });

  useEffect(() => {
    const update = () =>
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const isMobile = viewport.w < MD_BREAKPOINT;
  const padding = isMobile ? PADDING_MOBILE : PADDING_DESKTOP;
  const contentLeft = Math.max(
    padding,
    (viewport.w - MAX_CONTENT) / 2 + padding
  );

  // Mobile: center horizontally, scale around the center → no perceived horizontal motion.
  // Desktop: align with content's left edge, scale around top-left.
  // Both keep the SAME x for big and small states, so scroll motion is purely vertical.
  const xPosition = isMobile ? viewport.w / 2 - HALF : contentLeft;
  const originValue = isMobile ? "top center" : "top left";

  const startY = viewport.h * 0.14;
  const endY = 6;

  const y = useTransform(scrollY, [0, MORPH_END], [startY, endY]);
  const scale = useTransform(scrollY, [0, MORPH_END], [1, END_SCALE]);

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: xPosition,
        y,
        scale,
        transformOrigin: originValue,
        zIndex: 60,
        pointerEvents: "none",
        willChange: "transform",
      }}
    >
      <Image
        src={teambotoLogo}
        alt="Botosoares Personal Training"
        priority
        style={{
          height: `${SOURCE_PX}px`,
          width: "auto",
          filter: "invert(1) hue-rotate(180deg)",
        }}
      />
    </motion.div>
  );
}
