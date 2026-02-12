'use client';

import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Button({ 
  href, 
  children, 
  onClick, 
  icon = ArrowUpRight,
  className = '',
  ...props 
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const Icon = icon;

  const buttonContent = (
    <motion.div
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative inline-flex overflow-hidden rounded-xl bg-transparent border border-white/20 py-4 px-8 font-bold text-white transition-all duration-300 md:bg-transparent md:border-white/20 max-md:bg-linear-to-r max-md:from-indigo-600 max-md:to-indigo-500 max-md:border-indigo-500 ${className}`}
    >
      <motion.span
        variants={{
          initial: isMobile ? { scale: 1, x: "-50%", y: "-50%" } : { scale: 0, x: "-50%", y: "-50%" },
          hover: { scale: 1, x: "-50%", y: "-50%" },
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="absolute left-1/2 top-1/2 z-0 h-[350%] w-[110%] origin-center rounded-full bg-linear-to-r from-indigo-600 to-indigo-500 md:block max-md:hidden"
      />

      <span className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 group-hover:text-white">
        {children}
        <motion.div
          animate={isMobile || isHovered ? { opacity: 1, x: 5 } : { opacity: 0, x: -10 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="flex items-center"
        >
          <Icon className="h-5 w-5" />
        </motion.div>
      </span>
    </motion.div>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {buttonContent}
      </motion.a>
    );
  }

  return (
    <button onClick={onClick} {...props}>
      {buttonContent}
    </button>
  );
}
