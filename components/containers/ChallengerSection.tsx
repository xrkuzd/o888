import { FunctionComponent } from 'react'
import { addressFormatter } from '@utils/addressFormat'
import { divisorConstant } from './GameRoom'
import ChallengerNav from '@components/navigation/ChallengerNav'

import CardManager, { CardProps } from './CardManager'
import { itemMotion, springMotion } from 'pages'

import { motion } from 'framer-motion'

// prettier-ignore

interface IReturnedData {
  owner?: string
  challenger?: string
  name?: string //this is room name
  betSize?: string
  ownerBalance?: string

  setRefetchRoomData?: ((toggle: boolean) => void) | undefined
  refetchRoomData?: boolean

  setIsBalanceEmpty?: (toggle: boolean) => void
  isBalanceEmpty?: boolean

  setChallengerShowDown?: (toggle: boolean) => void
  challengerShowDown?: boolean

  challengerCard?: number[]

  winner?: number
  gameStarted?: boolean
}

// prettier-ignore
const ChallengerSection: FunctionComponent<IReturnedData> = ({...props}) => {






  return (
    <>
      <motion.div
        variants={itemMotion}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={springMotion}
        className="group relative h-[80vh] min-h-[60vh] w-full rounded-sm border-b-[2px] border-r-[2px] border-t-[2px] transition duration-1000 border-slate-500/50 hover:border-[#60e5c6]/70 p-2 lg:w-1/3 lg:p-8 text-slate-300"
      >
        <div className="absolute inset-x-0 top-8 transition duration-700 font-light antialiased">Challenger </div>
        <div className="flex w-full mt-12 mb-6 flex-col items-center justify-center truncate text-center text-sm font-normal group-hover:text-[#60e5c6]">
          {props.challenger === divisorConstant && !props.gameStarted ? (
            <div className='group-hover:text-[#60e5c6]'>Join Game Below</div>
          ) : (
            <div className='flex justify-center items-center animate-delay-[700ms] animate-fadeIn text-[#60e5c6]'>
              {addressFormatter(props.challenger, 8)}
            </div>
          )}
        </div>

        <CardManager {...(props as CardProps)}/>

        <ChallengerNav {...(props as IReturnedData)}/>
      </motion.div>
    </>
  )
}

export default ChallengerSection
