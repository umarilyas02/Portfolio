"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "motion/react";
import Image from "next/image";



export const HeroParallax = ({
  products,
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const [isMobile, setIsMobile] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [scrollDirection, setScrollDirection] = React.useState('down');
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const [hasAutoScrolled, setHasAutoScrolled] = React.useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = React.useState(false);
  
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      if (isAutoScrolling) return; // Ignore scroll events during auto-scroll
      
      const currentScrollY = window.scrollY;
      
      // Determine scroll direction
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up');
      }
      
      setLastScrollY(currentScrollY);
      
      if (currentScrollY > 10 && !hasAutoScrolled && isMobile && scrollDirection === 'down') {
        setHasAutoScrolled(true);
        setIsAutoScrolling(true);
        
        // Disable scroll during auto-scroll
        document.documentElement.style.overflow = 'hidden';
        
        // Auto scroll to hero images view
        const targetScroll = window.innerHeight * 0.5;
        window.scrollTo({
          top: targetScroll,
          behavior: 'smooth'
        });
        
        // Re-enable scroll after animation completes
        setTimeout(() => {
          document.documentElement.style.overflow = '';
          setIsAutoScrolling(false);
        }, 1000);
      }
      
      if (currentScrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
        setHasAutoScrolled(false); // Reset when back at top
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, hasAutoScrolled, isMobile, scrollDirection, isAutoScrolling]);

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], isMobile ? [-500, 0] : [-700, 500]),
    springConfig
  );
  return (
    <div
      ref={ref}
      className={`${isMobile ? (scrolled ? 'h-[120vh]' : 'h-[60vh]') : 'h-[350vh]'} py-20 md:py-40 overflow-hidden  antialiased relative flex flex-col self-auto perspective-[1000px] transform-3d`}
    >
      <Header scrolled={scrolled} isMobile={isMobile} />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className={`${isMobile ? (scrolled ? (scrollDirection === 'down' ? 'mt-32' : 'mt-12') : 'mt-4') : 'mt-0'}`}
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
  );
};

export const Header = ({ scrolled, isMobile }) => {
  const titles = [
    "NextJS Developer",
    "ReactJs Developer",
    "Frontend Developer",
    "Backend Developer",
    "Web Developer",
    "Wordpress Developer",
  ];
  return (
    <div className={`max-w-7xl relative mx-auto pt-20 md:py-40 px-4 w-full left-0 top-0 ${isMobile ? (scrolled ? 'pb-8' : 'pb-2') : 'pb-0'}`}>
      <h1 className="text-2xl md:text-7xl font-bold dark:text-white flex items-center gap-2">
        <span className="typing-text-minimal">
          <TypingText phrases={titles} typingSpeed={75} deletingSpeed={40} pauseDuration={900} />
        </span>
        <span className="h-[1em] w-0.5 bg-indigo-300 caret-grow" aria-hidden="true"></span>
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200">
        Frontend Developer with sepecialization in React.js, Next.js, and modern
        web technologies. Crafting engaging and responsive user interfaces that
        deliver exceptional user experiences.
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
    }

    const interval = setInterval(() => {
      const nextIndex = isDeleting ? charIndex - 1 : charIndex + 1;
      setCharIndex(nextIndex);
      setText(currentPhrase.slice(0, nextIndex));
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearInterval(interval);
  }, [phrases, phraseIndex, charIndex, isDeleting, typingSpeed, deletingSpeed, pauseDuration]);

  return <span aria-live="polite">{text}</span>;
};

export const ProductCard = ({
  product,
  translate,
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-48 w-64 md:h-96 md:w-120 relative shrink-0"
    >
      <a
        href={product.link}
        className="block group-hover/product:shadow-2xl "
      >
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(min-width:768px) 20vw, 60vw"
          quality={90}
          className="object-cover object-top-left absolute inset-0"
          priority={false}
        />
      </a>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.title}
      </h2>
    </motion.div>
  );
};
