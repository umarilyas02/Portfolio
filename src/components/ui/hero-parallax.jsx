"use client";
import React from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { ChevronsDown } from "lucide-react";
import Image from "next/image";

export const HeroParallax = ({ products }) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = {
    stiffness: 180,
    damping: 26,
    bounce: 0,
    restDelta: 0.001,
  };

  const [isMobile, setIsMobile] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [scrollDirection, setScrollDirection] = React.useState("down");
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const [hasAutoScrolled, setHasAutoScrolled] = React.useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = React.useState(false);
  const [showScrollPrompt, setShowScrollPrompt] = React.useState(true);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      if (isAutoScrolling) return;

      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setScrollDirection("down");
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection("up");
      }
      setLastScrollY(currentScrollY);

      if (
        currentScrollY > 10 &&
        !hasAutoScrolled &&
        isMobile &&
        scrollDirection === "down"
      ) {
        setHasAutoScrolled(true);
        setIsAutoScrolling(true);
        document.documentElement.style.overflow = "hidden";
        const targetScroll = window.innerHeight * 0.5;
        window.scrollTo({ top: targetScroll, behavior: "smooth" });

        setTimeout(() => {
          document.documentElement.style.overflow = "";
          setIsAutoScrolling(false);
        }, 1000);
      }

      const pastTop = currentScrollY > 10;
      setScrolled(pastTop);
      if (!pastTop) {
        setHasAutoScrolled(false);
        setShowScrollPrompt(true);
      } else if (showScrollPrompt) {
        setShowScrollPrompt(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [
    lastScrollY,
    hasAutoScrolled,
    isMobile,
    scrollDirection,
    isAutoScrolling,
    showScrollPrompt,
  ]);

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig,
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig,
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig,
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig,
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig,
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], isMobile ? [-240, 0] : [-700, 500]),
    springConfig,
  );

  return (
    <>
      {showScrollPrompt && (
        <motion.div
          className="fixed bottom-10 right-10 md:bottom-15 md:right-15 z-50 rounded-full p-0.5"
          style={{
            backgroundImage: 'linear-gradient(90deg, #6366f1, #a855f7, #6366f1)',
            backgroundSize: '200% 100%',
          }}
          animate={{ 
            y: [0, -6, 0],
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{ 
            y: { duration: 1.4, repeat: Infinity, ease: "easeInOut" },
            backgroundPosition: { duration: 2, repeat: Infinity, ease: "linear" }
          }}
        >
          <button
            type="button"
            onClick={() => {
              setShowScrollPrompt(false);
              const targetScroll = window.innerHeight * 0.65;
              window.scrollTo({ top: targetScroll, behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 rounded-full bg-black/95 px-4 py-2 text-base font-medium text-white shadow-lg shadow-black/30 backdrop-blur-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black hover:bg-black/80"
            style={{
              boxShadow: 'inset 0 0.2px 0 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            <span>Scroll</span>
            <ChevronsDown className="h-4 w-4" />
          </button>
        </motion.div>
      )}

      <div
        ref={ref}
        className={`${isMobile ? "min-h-[80vh]" : "h-[300vh]"} py-20 md:py-40 overflow-hidden antialiased relative flex flex-col self-auto perspective-[1000px] transform-3d`}
      >
        <Header scrolled={scrolled} isMobile={isMobile} />
        <motion.div
          style={{ rotateX, rotateZ, translateY, opacity }}
          className={`${isMobile ? (scrolled ? "mt-100" : "mt-48") : "-mt-20"}`}
        >
          <motion.div className="flex flex-row-reverse space-x-reverse space-x-8 md:space-x-20 mb-10 md:mb-20">
            {firstRow.map((product) => (
              <ProductCard
                product={product}
                translate={translateX}
                key={product.title}
              />
            ))}
          </motion.div>
          <motion.div className="flex flex-row mb-10 md:mb-20 space-x-8 md:space-x-20">
            {secondRow.map((product) => (
              <ProductCard
                product={product}
                translate={translateXReverse}
                key={product.title}
              />
            ))}
          </motion.div>
          <motion.div className="flex flex-row-reverse space-x-reverse space-x-8 md:space-x-20">
            {thirdRow.map((product) => (
              <ProductCard
                product={product}
                translate={translateX}
                key={product.title}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export const Header = ({ scrolled, isMobile }) => {
  const titles = [
    "NextJS Developer",
    "ReactJs Developer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Wordpress Developer",
  ];
  return (
    <div
      className={`${isMobile ? "absolute" : "relative"} max-w-7xl mx-auto px-4 w-full left-0 top-30 ${isMobile ? (scrolled ? "pt-24 pb-8" : "pt-32 pb-2") : "pt-10 md:py-20 pb-0"}`}
    >
      <h1 className="text-4xl md:text-7xl font-bold dark:text-white flex items-center min-h-[1.2em]">
        <TypingText
          phrases={titles}
          typingSpeed={75}
          deletingSpeed={40}
          pauseDuration={900}
        />
      </h1>
      <p className="max-w-2xl text-lg md:text-xl mt-8 dark:text-neutral-200">
        Full Stack Developer with specialization in React.js, Next.js, and
        modern web technologies. Crafting engaging and responsive user
        interfaces.
      </p>
    </div>
  );
};

const TypingText = ({
  phrases,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 1000,
}) => {
  const [text, setText] = React.useState("");
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [phraseIndex, setPhraseIndex] = React.useState(0);
  const [charIndex, setCharIndex] = React.useState(0);

  const maxChars = React.useMemo(
    () => (phrases?.length ? Math.max(...phrases.map((p) => p.length)) : 0),
    [phrases],
  );

  React.useEffect(() => {
    if (!phrases || phrases.length === 0) return;
    const currentPhrase = phrases[phraseIndex % phrases.length];

    if (!isDeleting && charIndex === currentPhrase.length) {
      const pause = setTimeout(() => setIsDeleting(true), pauseDuration);
      return () => clearTimeout(pause);
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setPhraseIndex((idx) => (idx + 1) % phrases.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        const nextIndex = isDeleting ? charIndex - 1 : charIndex + 1;
        setCharIndex(nextIndex);
        setText(currentPhrase.slice(0, nextIndex));
      },
      isDeleting ? deletingSpeed : typingSpeed,
    );

    return () => clearTimeout(timeout);
  }, [
    phrases,
    phraseIndex,
    charIndex,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
  ]);

  return (
    <span
      className="inline-grid grid-cols-1 grid-rows-1 items-center font-mono leading-none"
      style={{ minWidth: `${maxChars}ch` }}
    >
      <span className="col-start-1 row-start-1 flex items-center whitespace-pre">
        {text}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="inline-block h-[0.9em] w-[4px] md:w-[8px] bg-indigo-500 ml-1 shrink-0"
        />
      </span>
    </span>
  );
};

export const ProductCard = ({ product, translate }) => {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -20 }}
      className="group/product h-48 w-64 md:h-96 md:w-120 relative shrink-0"
    >
      <a href={product.link} className="block group-hover/product:shadow-2xl">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 60vw, 20vw"
          className="object-cover object-top-left absolute inset-0"
          loading="lazy"
          quality={75}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
        />
      </a>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none transition-opacity" />
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white transition-opacity">
        {product.title}
      </h2>
    </motion.div>
  );
};
