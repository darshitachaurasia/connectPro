import React from 'react';
import Hero from './phone.png';
import { motion } from 'framer-motion';

const textVariants = {
  animate: {
    y: [0, -10, 0],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

const imageVariants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.95, 1],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

function LandingPage() {
  return (
    <div className="bg-[#2d0727] text-white min-h-screen flex items-center pl-20">

      {/* Left Side - Repeating animated text */}
      <main className=" px-30 flex flex-col justify-center mt-10">
        <motion.h1
          className="text-7xl"
          variants={textVariants}
          animate="animate"
        >
          Find the Right Mentor
        </motion.h1>

        <motion.h1
          className="text-8xl font-semibold text-[#ff00e6]"
          variants={textVariants}
          animate="animate"
        >
          One session
        </motion.h1>

        <motion.h1
          className="text-8xl font-semibold text-[#ff00e6]"
          variants={textVariants}
          animate="animate"
        >
          at a Time
        </motion.h1>
      </main>

      {/* Right Side - Image with repeating soft scale */}
      <motion.div
        className="w-1/3 flex pr-20"
        variants={imageVariants}
        animate="animate"
      >
        <img
          src={Hero}
          alt="hero"
          className="w-[500px] max-w-full drop-shadow-[0_4px_25px_rgba(255,0,230,0.4)]"
        />
      </motion.div>
    </div>
  );
}

export default LandingPage;
