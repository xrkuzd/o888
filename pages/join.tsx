import { Footer, MainLayout } from '@components/layout'
import { NextPageWithLayout } from './page'
import ConnectModal from '@components/modals/ConnectModal'
import { useMoralis } from 'react-moralis'
import ConnectPage from '@components/buttons/ConnectPage'
import JoinRoom from '@components/containers/JoinRoom'
import useStore from '@store/store'

import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { HeroImage, motionContainer, springMotion } from 'pages'

const joinMotion = {
  hidden: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
}

const join: NextPageWithLayout = () => {
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
        <div className="flex min-h-screen w-full select-none flex-col items-center justify-center text-slate-300">
          <ConnectPage />
        </div>
      ) : (
        <motion.div
          key={router.pathname}
          variants={motionContainer}
          initial="hidden"
          animate="enter"
          exit="exit"
          className="flex min-h-screen w-full select-none flex-col items-center justify-center py-10 text-slate-300"
        >
          <motion.div
            variants={HeroImage}
            initial="hidden"
            animate="in"
            exit="out"
            transition={springMotion}
          >
            <JoinRoom />
          </motion.div>
        </motion.div>
      )}
    </>
  )
}

export default join

join.getLayout = (page) => {
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
