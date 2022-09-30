import { Footer, MainLayout } from '@components/layout'
import { NextPageWithLayout } from '../page'
import ConnectModal from '@components/modals/ConnectModal'
import { useMoralis, useMoralisQuery, useApiContract } from 'react-moralis'
import ConnectPage from '@components/buttons/ConnectPage'
import useStore from '@store/store'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { DeployedContract } from '@utils/constants/Values'
import ABI from '@utils/ABI/ABI'
import GameRoom from '@components/containers/GameRoom'
import { AnimatePresence, motion } from 'framer-motion'
import { motionContainer } from 'pages'

// prettier-ignore
const roomPage: NextPageWithLayout = () => {
  const isConnectModalOpen = useStore((state) => state.isConnectModalOpen)
  const { isAuthenticated, isWeb3Enabled } = useMoralis()
  const setRoomID = useStore((state) => state.setRoomID)
  const [numberOfRooms, setNumberOfRooms] = useState<number | null>(null)
  const [routerID, setRouterID] = useState<number | undefined>(undefined)
  const router = useRouter()

  
  
  const { runContractFunction: getNextRoomID, data: nextRoomID } = useApiContract({ address: DeployedContract,
			functionName: 'nextRoomId',
			abi: ABI,
			chain: 'rinkeby',
		});

  useEffect(() => {
    if(isAuthenticated){
      getNextRoomID()
      setNumberOfRooms(parseInt(nextRoomID as string, 10))
      
      setRouterID(parseInt(router.query.id as string, 10))
      
      setRoomID(parseInt(router.query.id as string, 10))
    }


  }, [isAuthenticated, getNextRoomID, nextRoomID, router.query.id, setRoomID],)


  return (
    <>
      {isConnectModalOpen ? (
        <div className="flex min-h-screen w-full select-none flex-col items-center justify-center py-12 text-slate-300">
          <div className="mt-10 flex w-full items-center justify-center p-1 text-center lg:mt-0 lg:p-0">
            <ConnectModal />
          </div>
        </div>
      ) : (
        <>
          {numberOfRooms && routerID && routerID >= 0 && numberOfRooms > routerID || routerID == 0 ? (
            <motion.div
              key={router.pathname}
              variants={motionContainer}
              initial="hidden"
              animate="enter"
              exit="exit" 
              className='flex min-h-screen h-full w-full select-none flex-col items-center justify-center px-2 py-20 text-slate-200 lg:px-2 lg:py-0 '
            >
              <div className="flex h-full w-full flex-col items-center justify-center space-y-8 px-4 text-center text-lg lg:flex-row lg:space-y-0 lg:space-x-2 lg:px-16 lg:text-3xl">
                <GameRoom roomNumber={router.query.id}/>
              </div>
            </motion.div>
          ) : (
            <div className="flex min-h-screen w-full select-none flex-col items-center justify-center text-slate-300">
              <div className="flex w-full items-center justify-center text-center text-5xl font-bold">
                <svg className="animate-twSpin animate-infinite h-48 w-48 text-[#4dac96]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle><path className="opacity-95" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              </div>
            </div>
          )}
        </>
      )
    }
    </>
  )
}

export default roomPage

roomPage.getLayout = (page) => {
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
