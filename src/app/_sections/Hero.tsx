"use client"

import {motion, useAnimation, useInView} from "framer-motion";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useEffect, useRef} from "react";



function useScrollAnimation(threshold = 0.2) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: threshold });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [isInView, controls]);

    return { ref, controls, isInView };
}


const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.6,
        },
    },
};

export default function Hero(){
    const heroAnimation = useScrollAnimation(0.1);
    

    return <motion.section
        ref={heroAnimation.ref}
        initial="hidden"
        animate={heroAnimation.controls}
        variants={fadeIn}
        className="relative bg-white dark:bg-gray-800 overflow-hidden"
    >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                <motion.div
                    variants={fadeInUp}
                    className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left"
                >
                    <h1>
                        <motion.span
                            variants={fadeInUp}
                            className="block text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400"
                        >
                            Introducing HRConnect
                        </motion.span>
                        <motion.span
                            variants={fadeInUp}
                            className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl"
                        >
                  <span className="block text-gray-900 dark:text-white">
                    Simplify Your
                  </span>
                            <span className="block text-blue-600 dark:text-blue-400">
                    HR Management
                  </span>
                        </motion.span>
                    </h1>
                    <motion.p
                        variants={fadeInUp}
                        className="mt-3 text-base text-gray-500 dark:text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl"
                    >
                        Streamline your HR processes, boost employee productivity, and
                        make data-driven decisions with our comprehensive HR management
                        platform.
                    </motion.p>
                    <motion.div
                        variants={fadeInUp}
                        className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0"
                    >
                        <form className="mt-3 sm:flex">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="rounded-md px-5 py-3 w-full sm:max-w-xs border dark:border-gray-700"
                            />
                            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                                <Button className="w-full flex items-center justify-center px-5 py-3">
                                    Get Started
                                </Button>
                            </div>
                        </form>
                        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                            Start your 14-day free trial. No credit card required.
                        </p>
                    </motion.div>
                </motion.div>
                <motion.div
                    variants={scaleIn}
                    className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center"
                >
                    <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                        <div className="relative block w-full bg-white dark:bg-gray-700 rounded-lg overflow-hidden">
                            <Hero />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    </motion.section>
}