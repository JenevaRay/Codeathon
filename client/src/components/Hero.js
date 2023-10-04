import { useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

import Button from './ui/Button';

const Hero = () => {
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start((i) => ({
      y: [-10, 10],
      x: [Math.floor(Math.random() * 5), Math.floor(Math.random() * 5)],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatDelay: 0.1,
        repeatType: 'reverse',
        delay: i * 0.5,
      },
    }));
  });

  return (
    <div className="h-[90vh] cursor-default px-6 pb-56 lg:pt-48">
      <div className="container mx-auto flex flex-col flex-wrap items-center px-3 md:flex-row">
        <div className="flex w-full flex-row items-center justify-center p-6 lg:hidden">
          <motion.img
            alt="Codeathon Image"
            src="/img1.png"
            className="z-0"
            height={200}
            width={200}
            custom={1}
            animate={controls}
          />
          <motion.img
            alt="Codeathon Image"
            src="/img2.png"
            className="z-20 mx-[-150px]"
            height={300}
            width={300}
            custom={0}
            animate={controls}
          />
          <motion.img
            alt="Codeathon Image"
            src="/img3.png"
            className="z-0"
            height={200}
            width={200}
            custom={2}
            animate={controls}
          />
        </div>
        <div className="flex w-full items-center justify-center text-center lg:w-4/6 lg:flex-col lg:text-left">
          <div className="max-w-[600px]">
            <h1 className="my-4 text-5xl font-extrabold leading-tight text-zinc-900 lg:text-7xl">
              Create your <br /> own&nbsp;
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text font-extrabold text-transparent">
                hackathon
              </span>
            </h1>
            <p className="mb-8 text-2xl font-normal leading-normal text-zinc-400">
              Codeathon makes it easy to find, host, or register for
              hackathons. Sign up and try it for free today!
            </p>
            <a href="/signup">
              <Button
                margin="mt-8"
                padding="px-6 py-3"
                bgColor="bg-zinc-900"
                hoverColor="hover:bg-zinc-900/90">
                Sign Up
              </Button>
            </a>
          </div>
        </div>
        <div className="hidden lg:flex lg:w-2/6 lg:flex-row lg:items-center lg:justify-around">
          <motion.img
            alt="Codeathon Image"
            src="/img1.png"
            className="z-0"
            height={200}
            width={200}
            custom={1}
            animate={controls}
          />
          <motion.img
            alt="Codeathon Image"
            src="/img2.png"
            className="z-20 mx-[-100px]"
            height={300}
            width={300}
            custom={0}
            animate={controls}
          />
          <motion.img
            alt="Codeathon Image"
            src="/img3.png"
            className="z-0"
            height={200}
            width={200}
            custom={2}
            animate={controls}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
