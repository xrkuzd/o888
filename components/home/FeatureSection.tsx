import { FaDice, FaPray, FaPeopleArrows } from 'react-icons/fa'
import { GiQuicksand, GiSandsOfTime } from 'react-icons/gi'
import { IoCreateSharp } from 'react-icons/io5'

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';

//prettier-ignore

const FeatureSection = () =>
{

    const [ref, inView] = useInView({ threshold: 0.2 });


    const item = {
        hidden: {
            opacity: 0,
            y: 100,
        },
        show: (i: any) => ({
            opacity: 1,
            y: 0,
            transition: {
                ease: [0.6, 0.01, -0.05, 0.95],
                duration: i * 0.3,
            },
        }),
    };

    const motionContainer = {
        show: {
            transition: {
                type: 'spring', duration: 1,
                staggerChildren: 0.2,
                delayChildren: 0.2,
            },
        },
    };

    return (
        <>
            <section className="pt-20 pb-8 lg:pt-[0px] lg:pb-[70px]">
                <div className="container space-y-16">
                    <div className="-mx-4 flex flex-wrap">
                        <div className="w-full px-4 flex flex-col justify-center items-center">
                            <div className="mb-12 max-w-[820px] lg:mb-8 text-slate-300 space-y-12">
                                <span className="block text-lg font-semibold">
                                    Features
                                </span>
                                <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-[72px]" >
                                    OSIRIS HI-LOW GAME
                                </h2>
                                <p className="text-lg leading-relaxed text-body-color sm:text-xl sm:leading-relaxed">
                                    Hi-Low card game is simple.  Each player gets served 1 playing card from the God Osiris.  The higher card wins.  Highest card you can get is Ace of Spades and the lowest is a 2 of Diamonds.
                                </p>
                            </div>
                        </div>
                    </div>


                    <motion.div
                        ref={ref}
                        animate={inView ? "show" : "hidden"}
                        variants={motionContainer}
                        initial='hidden'

                        className=" flex flex-wrap p-8 justify-center items-center">

                        <motion.div custom={1} variants={item} className="w-full px-4 md:w-1/2 lg:w-1/5">
                            <div className="group mb-12 text-slate-100 flex flex-col justify-center items-center space-y-2">
                                <div className="relative z-10 mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-2xl bg-primary">
                                    <div className="relative group rounded-full">
                                        <div className="absolute -inset-1.5 bg-gradient-to-tl from-[#60e5c6] to-[#30c5d2] rounded-full blur opacity-75 group-hover:opacity-100 transition duration-700 group-hover:duration-200 animate-tilt"></div>
                                        <div className='relative bg-slate-900 text-8xl text-slate-100 rounded-full flex justify-center items-center'>
                                            <FaDice />
                                        </div>
                                    </div>
                                </div>
                                <h4 className="mb-3 text-xl font-black uppercase box-decoration-clone bg-gradient-to-br from-[#00C9FF] to-[#92FE9D] px-2 text-transparent bg-clip-text">
                                    Provably Fair RNG
                                </h4>
                                <p className="mb-8 text-body-color lg:mb-11">
                                    Our random number generator is 100% onchain and CANNOT be manipulated for anyone.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div custom={2} variants={item} className="w-full px-4 md:w-1/2 lg:w-1/5">
                            <div className="group mb-12 text-slate-100 flex flex-col justify-center items-center space-y-2">
                                <div className="relative z-10 mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-2xl bg-primary">
                                    <div className="relative group rounded-full">
                                        <div className="absolute -inset-1.5 bg-gradient-to-tl from-[#60e5c6] to-[#30c5d2] rounded-full blur opacity-75 group-hover:opacity-100 transition duration-700 group-hover:duration-200 animate-tilt"></div>
                                        <div className='relative bg-slate-900 text-8xl text-slate-100 rounded-full flex justify-center items-center'>
                                            <IoCreateSharp />
                                        </div>
                                    </div>
                                </div>
                                <h4 className="mb-3 text-xl font-black uppercase box-decoration-clone bg-gradient-to-br from-[#00C9FF] to-[#92FE9D] px-2 text-transparent bg-clip-text">
                                    Create a Game Room
                                </h4>
                                <p className="mb-8 text-body-color lg:mb-11">
                                    Start by making a new room with a set bet size. You will have to hold OSIRIS v2 tokens in order to play!
                                </p>
                            </div>
                        </motion.div>


                        <motion.div custom={3} variants={item} className="w-full px-4 md:w-1/2 lg:w-1/5">
                            <div className="group mb-12 text-slate-100 flex flex-col justify-center items-center space-y-2">
                                <div className="relative z-10 mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-2xl bg-primary">
                                    <div className="relative group rounded-full">
                                        <div className="absolute -inset-1.5 bg-gradient-to-tl from-[#60e5c6] to-[#30c5d2] rounded-full blur opacity-75 group-hover:opacity-100 transition duration-700 group-hover:duration-200 animate-tilt"></div>
                                        <div className='relative bg-slate-900 text-8xl text-slate-100 rounded-full p-1 flex justify-center items-center'>
                                            <GiQuicksand />
                                        </div>
                                    </div>
                                </div>
                                <h4 className="mb-3 text-xl font-black uppercase box-decoration-clone bg-gradient-to-br from-[#00C9FF] to-[#92FE9D] px-2 text-transparent bg-clip-text">
                                    Jump into any room
                                </h4>
                                <p className="mb-8 text-body-color lg:mb-11">
                                    Feel free to join any game room that isn't full. Just hold the required OSIRIS tokens in your wallet
                                </p>
                            </div>
                        </motion.div>


                        <motion.div custom={4} variants={item} className="w-full px-4 md:w-1/2 lg:w-1/5">
                            <div className="group mb-12 text-slate-100 flex flex-col justify-center items-center space-y-2">
                                <div className="relative z-10 mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-2xl bg-primary">
                                    <div className="relative group rounded-full">
                                        <div className="absolute -inset-1.5 bg-gradient-to-tl from-[#60e5c6] to-[#30c5d2] rounded-full blur opacity-75 group-hover:opacity-100 transition duration-700 group-hover:duration-200 animate-tilt"></div>
                                        <div className='relative bg-slate-900 text-8xl text-slate-100 rounded-full flex justify-center items-center'>
                                            <FaPray />
                                        </div>
                                    </div>
                                </div>
                                <h4 className="mb-3 text-xl font-black uppercase box-decoration-clone bg-gradient-to-br from-[#00C9FF] to-[#92FE9D] px-2 text-transparent bg-clip-text">
                                    Pray to the gods
                                </h4>
                                <p className="mb-8 text-body-color lg:mb-11">
                                    Once the game is set, pray to OSIRIS for the better hand. Good luck.
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}

export default FeatureSection
