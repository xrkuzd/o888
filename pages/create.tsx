import { Footer, MainLayout } from '@components/layout'
import { NextPageWithLayout } from './page'
import ConnectModal from '@components/modals/ConnectModal'
import { useMoralis } from 'react-moralis'
import ConnectPage from '@components/buttons/ConnectPage'
import CreateRoom from '@components/containers/CreateRoom'
import useStore from '@store/store'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { HeroImage, itemMotion, motionContainer, springMotion } from 'pages'

const createMotion = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 0.3,
    },
  },
  out: {
    opacity: 0,
    y: 40,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 0.3,
    },
  },
}

const create: NextPageWithLayout = () => {
  const isConnectModalOpen = useStore((state) => state.isConnectModalOpen)
  const { isAuthenticated } = useMoralis()
  const router = useRouter()
  return (
    <>
      {isConnectModalOpen ? (
        <div className="flex min-h-screen w-full select-none flex-col items-center justify-center py-12 text-slate-300">
          <div className="mt-10 flex w-full items-center justify-center p-1 text-center lg:mt-0 lg:p-0">
            <ConnectModal />
          </div>
        </div>
      ) : !isAuthenticated ? (
        <ConnectPage />
      ) : (
        <motion.div
          key={router.pathname}
          variants={motionContainer}
          initial="hidden"
          animate="enter"
          exit="exit"
          className="flex min-h-[90vh] w-full select-none flex-col items-center justify-center py-10 text-slate-300 lg:py-0"
        >
          <motion.div
            variants={HeroImage}
            initial="hidden"
            animate="in"
            exit="out"
            transition={springMotion}
            className="mt-10 flex w-full items-center justify-center p-1 text-center lg:mt-0 lg:p-0"
          >
            <CreateRoom />
          </motion.div>
        </motion.div>
      )}
    </>
  )
}

export default create

create.getLayout = (page) => {
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
