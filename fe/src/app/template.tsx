"use client";

import { usePathname } from "next/navigation";
import { motion } from "motion/react";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 10, scale: 0.995 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="flex-1 flex flex-col min-h-0 w-full"
    >
      {children}
    </motion.div>
  );
}
