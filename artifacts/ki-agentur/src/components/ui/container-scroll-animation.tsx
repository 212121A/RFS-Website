"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, type MotionValue } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 1, 0]);

  return (
    <div
      className="h-[48rem] md:h-[68rem] flex items-center justify-center relative p-2 md:p-10"
      ref={containerRef}
    >
      <div
        className="py-4 md:py-10 w-full relative"
        style={{ perspective: "1000px" }}
      >
        <Header titleComponent={titleComponent} opacity={headerOpacity} />
        <Card rotate={rotate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({
  titleComponent,
  opacity,
}: {
  titleComponent: React.ReactNode;
  opacity: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{ opacity }}
      className="max-w-5xl mx-auto text-center relative z-10 mb-6"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-6xl mx-auto h-[36rem] md:h-[50rem] w-full border-2 border-[rgba(193,255,114,0.2)] p-2 md:p-4 bg-[#111] rounded-[30px] shadow-2xl overflow-visible"
    >
      <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#0a0a0a] md:rounded-2xl">
        {children}
      </div>
    </motion.div>
  );
};

export default ContainerScroll;
