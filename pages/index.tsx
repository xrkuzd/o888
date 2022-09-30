import { NextPageWithLayout } from './page'
import Image from 'next/image'
import { Footer, MainLayout } from '@components/layout'

import { Saturn, HPortalFixed, HeartOfAce, SpadeOfAce, } from '@utils/imageHelper'

import { FaTwitter, FaTelegramPlane, FaChartLine } from 'react-icons/fa'
import ConnectModal from '@components/modals/ConnectModal'
import useStore from '@store/store'
import { useEffect } from 'react'
import { init, clear } from 'perspective-movement'
import 'perspective-movement/MovementListener'
import FeatureSection from '@components/home/FeatureSection'

import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import Link from 'next/link'
import TitleSection from '@components/home/TitleSection'

import { Gods1, HandEye1 } from '@utils/imageHelper'

export const motionContainer = {
  hidden: { opacity: 0 },
  enter: {
    transition: {
      staggerChildren: 0.1,
    },
    opacity: 1,
  },
  exit: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
    opacity: 0,
  },
}

const transition = { duration: 0.333, ease: [0.43, 0.13, 0.23, 0.96] }

export const itemMotion = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  enter: (i: number) => ({
    opacity: 1,
    y: 0,
    transition,
  }),
  exit: (i: number) => ({
    opacity: 0,
    y: 60,
    transition,
  }),
}

export const HeroImage = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
  out: {
    opacity: 0,
    y: 30,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 0.3,
    },
  },
}

// Use like this: transition={spring}
export const springMotion = {
  type: 'spring',
  damping: 10,
  stiffness: 500,
}

const Home: NextPageWithLayout = () => {
  const isConnectModalOpen = useStore((state) => state.isConnectModalOpen)
  const router = useRouter()

  useEffect(() => {
    init({
      // Transform degree for global settings:
      pmRotatex: 1,
      pmRotatey: 1,
      pmTranslatex: 1,
      pmTranslatey: 1,
    })

    return () => {
      clear()
    }
  }, [])

  return (
    <>
      {isConnectModalOpen ? <ConnectModal /> : ''}

      <motion.main
        key={router.pathname}
        variants={motionContainer}
        initial="hidden"
        animate="enter"
        exit="exit"
        className="flex min-h-screen w-full flex-col items-center space-y-10 text-center lg:overflow-hidden"
      >
        <div className="mt-20 flex h-full w-full flex-col space-y-48 lg:mt-0 xl:flex-row xl:space-y-0 xl:p-8">
          {/* HEADLINE  */}
          <div className="flex w-full flex-col items-center justify-center space-y-8 xl:mt-24 xl:ml-24 xl:w-2/5 xl:items-start xl:justify-start 2xl:items-center 2xl:justify-center">
            <motion.div
              custom={1}
              variants={itemMotion}
              transition={springMotion}
              className="flex flex-col items-center justify-center xl:items-start"
            >
              <span className="3xl:text-[100px] 3xl:ml-12 flex text-7xl font-bold text-slate-300 xl:text-slate-300 2xl:text-yellow-200 3xl:text-[#fff39b]">
                BATTLE
              </span>
              <span className="3xl:text-[100px] 3xl:ml-12 flex text-7xl font-bold text-slate-300 xl:text-slate-300">
                HI-CARD
              </span>
            </motion.div>

            <motion.div
              custom={1.25}
              variants={itemMotion}
              transition={springMotion}
              className="flex flex-col text-xl font-normal text-slate-400 xl:items-start xl:justify-start "
            >
              <p className="">Tempt the gods and defeat your enemy</p>

              <p className="">Will Osiris grant you victory or is your</p>
              <p className="">fate already sealed?</p>
            </motion.div>

            <motion.div
              custom={1.5}
              variants={itemMotion}
              transition={springMotion}
              className="group relative flex cursor-pointer overflow-hidden rounded border border-slate-700 bg-slate-200 from-[#8febe0] to-[#36dbb5] px-12 py-2 shadow-md  shadow-white/30 [transform:translateZ(0)] before:absolute before:bottom-0 before:left-0 before:h-full before:w-full before:origin-[100%_100%] before:scale-x-0 before:bg-gradient-to-r before:transition before:duration-500 before:ease-in-out hover:border-white hover:bg-gradient-to-r hover:before:origin-[0_0] hover:before:scale-x-100"
            >
              <span className="relative z-0 text-3xl font-light text-slate-800 transition duration-500 ease-in-out group-hover:text-slate-50">
                Buy Osiris Token
              </span>
            </motion.div>

            {/* SOCIALS */}

            <motion.div
              custom={1.5}
              variants={itemMotion}
              transition={springMotion}
              className="flex w-full items-center justify-center space-x-12 tracking-wide text-slate-50 xl:ml-6 xl:justify-start 2xl:justify-center"
            >
              <div className="group relative py-2 before:absolute before:bottom-0 before:left-0 before:h-[33px] before:w-[33px] before:origin-bottom before:scale-y-[0.1] before:rounded-sm  before:bg-[#36dbb5] before:transition-transform before:duration-300 before:ease-in-out hover:before:scale-y-150 hover:before:scale-x-150">
                <a
                  rel="noreferrer"
                  href="#"
                  className="relative group-hover:text-slate-50 "
                >
                  <FaTwitter
                    size="36"
                    className="flex cursor-pointer text-slate-200 group-hover:text-slate-50"
                  />
                </a>
              </div>

              <div className="group relative py-2 before:absolute before:bottom-0 before:left-0 before:h-[33px] before:w-[33px] before:origin-bottom before:scale-y-[0.1] before:rounded-sm  before:bg-[#36dbb5] before:transition-transform before:duration-300 before:ease-in-out hover:before:scale-y-150 hover:before:scale-x-150">
                <a
                  rel="noreferrer"
                  href="#"
                  className="relative group-hover:text-white dark:group-hover:text-slate-600 "
                >
                  <FaTelegramPlane
                    size="36"
                    className="flex cursor-pointer text-slate-200 group-hover:text-slate-50"
                  />
                </a>
              </div>

              <div className="group relative py-2 before:absolute before:bottom-0 before:left-0 before:h-[33px] before:w-[33px] before:origin-bottom before:scale-y-[0.1] before:rounded-sm  before:bg-[#36dbb5] before:transition-transform before:duration-300 before:ease-in-out hover:before:scale-y-150 hover:before:scale-x-150">
                <a
                  rel="noreferrer"
                  href="#"
                  className="relative group-hover:text-white dark:group-hover:text-slate-600 "
                >
                  <FaChartLine
                    size="36"
                    className="flex cursor-pointer text-slate-200 group-hover:text-slate-50"
                  />
                </a>
              </div>
              <div className="flex cursor-pointer">
                <div className="flex w-16 -rotate-45 bg-[#60e5c6] blur-2xl contrast-125 invert transition duration-500 hover:bg-transparent hover:blur-none">
                  <Image
                    src={Saturn.image.src}
                    alt=""
                    width={Saturn.width}
                    height={Saturn.height}
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* HERO IMAGE */}
          <motion.div
            variants={HeroImage}
            initial="hidden"
            animate="in"
            exit="out"
            transition={springMotion}
            className="flex h-full w-full flex-col items-center justify-center overflow-x-hidden overflow-y-hidden p-16 xl:mr-12 xl:w-4/6"
          >
            <div className="absolute z-50 mx-auto mb-auto flex h-1/6 w-1/6 rounded-full bg-emerald-300/30 blur-[70px] xl:h-2/6 xl:w-2/5 "></div>

            <div className="z-40 flex h-full w-full items-center justify-center p-4 xl:mt-12 xl:p-0">
              <Image
                alt=""
                src={HPortalFixed.image.src}
                width={HPortalFixed.width}
                height={HPortalFixed.height}
              />
            </div>
            <div className="absolute z-30 -mt-72 ml-4 flex justify-between space-x-40">
              <div
                data-pm
                data-pm-rotatex="-3"
                data-pm-rotatey="-3"
                data-pm-translatey="-30"
                data-pm-translatex="-15"
                className="absolute z-20"
              >
                <Image
                  alt=""
                  src={SpadeOfAce.image.src}
                  width={SpadeOfAce.width / 2}
                  height={SpadeOfAce.height / 2}
                />
              </div>
              <div
                data-pm
                data-pm-rotatey="3"
                data-pm-rotatex="3"
                data-pm-translatey="30"
                data-pm-translatex="15"
              >
                <Image
                  alt=""
                  src={HeartOfAce.image.src}
                  width={HeartOfAce.width / 2}
                  height={HeartOfAce.height / 2}
                />
              </div>
            </div>
          </motion.div>
        </div>
        <FeatureSection />

        <div className="">
          <TitleSection />
        </div>
      </motion.main>
    </>
  )
}

export default Home

Home.getLayout = (page) => {
  return (
    <>
      <MainLayout>
        <AnimatePresence mode='wait' initial={true}>
          {page}
        </AnimatePresence>
        <Footer />
      </MainLayout>
    </>
  )
}
