import { FunctionComponent } from 'react'
import { addressFormatter } from '@utils/addressFormat'
import OwnerNav from '@components/navigation/OwnerNav'

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

  setRefetchRoomData?: (toggle: boolean) => void
  refetchRoomData?: boolean

  setIsBalanceEmpty?: (toggle: boolean) => void
  isBalanceEmpty?: boolean

  setOwnerShowDown?: (toggle: boolean) => void
  ownerShowDown?: boolean

  ownerCard?: number[]

  winner?: number
}

// prettier-ignore
const OwnerSection: FunctionComponent<IReturnedData> = ({...props}) => {

  return (
    <>
      <motion.div
        variants={itemMotion}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={springMotion}
        className="group relative h-[80vh] min-h-[60vh] w-full rounded-sm border-b-[2px] border-l-[2px] border-t-[2px] transition duration-1000 border-slate-400/20 hover:border-[#60e5c6]/70 p-2 lg:w-1/3 lg:p-8 text-slate-300"
      >

        <div className="absolute inset-x-0 top-8 font-light antialiased text-slate-400">Owner </div>

        <div className="flex w-full mt-12 mb-6 flex-col items-center justify-center truncate text-center text-sm font-normal text-[#60e5c6]/70">
          {props.owner && addressFormatter(props.owner, 8)}
        </div>

        <CardManager {...(props as CardProps)}/>

        <OwnerNav {...(props as IReturnedData)}/>
      </motion.div>
    </>
  )
}

export default OwnerSection
