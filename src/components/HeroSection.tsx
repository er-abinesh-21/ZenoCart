import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

export const HeroSection = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={targetRef}
      className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1664455340023-214c33a9d0bd?q=80&w=1200&auto=format&fit=crop)`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          y,
        }}
      />
      <div className="absolute inset-0 z-10 bg-black/20" />
      <motion.div
        style={{ opacity }}
        className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-shadow-lg">
          Discover Your Next Favorite Thing
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto text-shadow">
          Browse our curated collection of high-quality products designed to
          elevate your lifestyle.
        </p>
      </motion.div>
    </section>
  );
};
