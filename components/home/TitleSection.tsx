import Image from 'next/image';
import { Gods2, HandsCard3 } from '@utils/imageHelper'

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';

import Link from 'next/link';

// prettier-ignore
const TitleSection = () =>
{
    const [ref1, inView1] = useInView({ threshold: 0.2 });
    const [ref2, inView2] = useInView({ threshold: 0.2 });
    const [ref3, inView3] = useInView({ threshold: 0.2 });
    const [ref4, inView4] = useInView({ threshold: 0.2 });

    const animation1 = useAnimation()
    const animation2 = useAnimation()
    const animation3 = useAnimation()
    const animation4 = useAnimation()

    useEffect(() =>
    {
        if (inView1)
        {
            animation1.start({
                y: 0,
                opacity: 100,
                transition: {
                    type: 'spring', duration: 1.5, bounce: 0.4
                }
            })
        } else 
        {
            animation1.start({ opacity: 0, y: 50 })
        }


    }, [inView1])

    useEffect(() =>
    {
        if (inView2)
        {
            animation2.start({
                y: 0,
                opacity: 100,
                transition: {
                    type: 'spring', duration: 1, bounce: 0.2
                }
            })
        } else 
        {
            animation2.start({ opacity: 0, y: 30 })
        }

    }, [inView2])

    useEffect(() =>
    {
        if (inView3)
        {
            animation3.start({
                y: 0,
                opacity: 100,
                transition: {
                    type: 'spring', duration: 1, bounce: 0.2
                }
            })
        } else 
        {
            animation3.start({ opacity: 0, y: 30 })
        }

    }, [inView3])

    useEffect(() =>
    {
        if (inView4)
        {
            animation4.start({
                y: 0,
                opacity: 100,
                transition: {
                    type: 'spring', duration: 1, bounce: 0.2
                }
            })
        } else 
        {
            animation4.start({ opacity: 0, y: 30 })
        }

    }, [inView4])


    return (
        <>
            <motion.section animate={animation1} ref={ref1} className="h-auto">
                <div className="px-4 py-24 mx-auto max-w-7xl">
                    <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
                        <h1 className="mb-6 text-4xl font-extrabold leading-none tracking-normal text-slate-200 md:text-7xl md:tracking-tight"> The <span className="block w-full text-transparent bg-clip-text hover:bg-gradient-to-l bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 lg:inline">Number One Source</span> for your gambling needs. </h1>
                        <p className="px-0 mb-6 text-lg text-slate-400 md:text-xl lg:px-24"> Osiris is a peer-to-peer online gambling platform that allows users to compete with each other where one winner takes it all. </p>
                    </div>
                </div>
            </motion.section>

            <motion.section animate={animation2} ref={ref2} className="px-2 py-32 md:px-0">
                <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
                    <div className="flex flex-wrap items-center sm:-mx-3">
                        <div className="w-full md:w-1/2 md:px-3">
                            <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
                                <h1 className="text-4xl font-extrabold tracking-tight text-slate-200 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
                                    <span className="block xl:inline">Not just any other </span>
                                    <span className="block text-indigo-500 xl:inline">ERC20 token</span>
                                </h1>
                                <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Osiris </h2>
                                <p className="max-w-3xl mt-5 mx-auto text-xl text-slate-400">Investors who purchase Osiris tokens will get gifted the supreme ability to participate in the Osiris ecosystem. We are not <span className='text-indigo-500 font-extrabold'>JUST</span> a gambling platform!</p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <div className="w-full h-auto overflow-hidden rounded-md shadow-xl sm:rounded-xl">
                                <Image
                                    alt=''
                                    src={Gods2.image.src}
                                    height={Gods2.image.height}
                                    width={Gods2.image.width}
                                    style={{ borderRadius: "15px" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>



            <motion.section animate={animation3} ref={ref3} className="px-2 pt-32 md:px-0">
                <div className="container items-center max-w-6xl px-5 mx-auto space-y-6 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-left text-slate-200 sm:text-5xl md:text-6xl md:text-center">
                        <span className="block">What are you <span className="block mt-1 text-transparent bg-clip-text hover:bg-gradient-to-r bg-gradient-to-l from-green-400 via-blue-500 to-purple-500 lg:inline lg:mt-0 uppercase">waiting for?</span></span>
                    </h1>
                    <p className="w-full mx-auto text-base text-left text-slate-400 md:max-w-md sm:text-lg lg:text-2xl md:max-w-3xl md:text-center">
                        Create your own game room that others can join or join one of the numerous rooms already created!
                    </p>
                    <div className="relative flex flex-col justify-center md:flex-row md:space-x-4">
                        <Link href="/create">
                            <a href="#_" className="flex items-center w-full px-6 py-3 mb-3 text-lg text-white hover:bg-gradient-to-l bg-gradient-to-tr from-green-400 to-blue-500 rounded-md md:mb-0 hover:bg-purple-700 md:w-auto">
                                Create Room
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </a>
                        </Link>
                        <Link href="/join">
                            <a href="#_" className="flex items-center px-6 py-3 text-slate-200 bg-slate-800 rounded-md hover:bg-gray-200 hover:text-gray-600">
                                Join a Room
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </a>
                        </Link>
                    </div>
                </div>
                <motion.div animate={animation4} ref={ref4} className="container items-center max-w-4xl px-5 mx-auto mt-32 -mb-32 text-center opacity-70">
                    <div className=''>
                        <Image
                            alt=''
                            src={HandsCard3.image.src}
                            height={HandsCard3.image.height}
                            width={HandsCard3.image.width}
                        />
                    </div>
                </motion.div>
            </motion.section>
        </>
    );
}

export default TitleSection;