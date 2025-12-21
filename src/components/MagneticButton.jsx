"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function DotExpandButton({ text = "Hover this link" }) {
  return (
    <motion.button
      initial="initial"
      whileHover="hover"
      className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-zinc-900 px-6 py-3 text-white transition-colors duration-300 hover:text-black"
    >
      {/* The Background Dot */}
      <motion.span
        variants={{
          initial: { scale: 0, x: "-50%", y: "-50%" },
          hover: { scale: 1, x: "-50%", y: "-50%" },
        }}
        transition={{ type: "spring", stiffness: 100, damping: 15, mass: 0.5 }}
        className="absolute top-1/2 left-4 z-0 h-[150%] w-[120%] origin-center rounded-full bg-white"
        style={{ width: "300%", height: "300%", left: "0%" }}
      />

      {/* Button Content */}
      <span className="relative z-10 flex items-center gap-2 font-medium">
        {text}
        <motion.span
          variants={{
            initial: { x: 0 },
            hover: { x: 4 },
          }}
        >
          <ArrowRight className="h-4 w-4" />
        </motion.span>
      </span>
    </motion.button>
  );
}