"use client";

import { motion } from "motion/react";

// Remounts on every route change — a quick opacity-only crossfade so page
// swaps don't cut hard. No transform, so sticky/pinned sections are unaffected.
export default function Template({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
