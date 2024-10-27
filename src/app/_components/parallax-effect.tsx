import React from "react";
import { Parallax } from "react-parallax";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ParallaxEffectProps {
  children: React.ReactNode;
  bgImage: string;
}

const ParallaxEffect = ({ children, bgImage }: ParallaxEffectProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <Parallax
      strength={200}
      bgImage={bgImage}
      bgImageStyle={{
        objectFit: "cover",
        height: "100%",
        width: "100%",
        objectPosition: "center",
      }}
      className="flex h-screen items-center justify-center object-cover p-10"
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="rounded bg-[#273617] bg-opacity-50 p-5 text-center text-white"
      >
        {children}
      </motion.div>
    </Parallax>
  );
};

export default ParallaxEffect;
