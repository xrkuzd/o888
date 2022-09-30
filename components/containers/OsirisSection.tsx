import { useState, useEffect, FunctionComponent } from 'react'
import { addressFormatter } from '@utils/addressFormat'
import { divisorConstant } from './GameRoom'
import Image from 'next/image'
import { Eye } from '@utils/imageHelper'
import { motion } from 'framer-motion'
import { itemMotion, springMotion } from 'pages'
import { useMoralis } from 'react-moralis'
import useStore from '@store/store'
// prettier-ignore

interface IReturnedData
{
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

  setOwnerCard: (card: number[]) => void
  ownerCard?: number[]

  setChallengerShowDown?: (toggle: boolean) => void
  challengerShowDown?: boolean

  setChallengerCard: (card: number[]) => void
  challengerCard?: number[]

  setWinner?: (winner: number) => void
  winner?: number

  setGameStarted?: (toggle: boolean) => void
  gameStarted?: boolean

  setDrawCards?: (toggle: boolean) => void
  drawCards?: boolean

  setShowEndModal?: (toggle: boolean) => void
  showEndModal?: boolean

  winnerAddress?: string
  netWinnings?: string
  fee?: string
  txHash?: string
}

// prettier-ignore
const OsirisSection: FunctionComponent<IReturnedData> = ({ ...props }) =>
{
  const [empty, setEmpty] = useState<boolean>()
  const [eyeToggle, setEyeToggle] = useState<boolean>(false)
  const [reset, setReset] = useState(false);
  const { user, account } = useMoralis()
  const roomID = useStore((state) => state.roomID)
  const [showModal, setShowModal] = useState<boolean>(false)

  const [enableButton, setEnableButton] = useState<boolean>(true)

  useEffect(() =>
  {

    if ((props.ownerBalance as any / 1000000000000000000) >= (props.betSize as any / 1000000000000000000))
    {
      setEmpty(false)
      if (props.isBalanceEmpty == true && props.setIsBalanceEmpty)
      {
        props.setIsBalanceEmpty(false)
      }
    } else if ((props.ownerBalance as any / 1000000000000000000) < (props.betSize as any / 1000000000000000000))
    {
      setEmpty(true)
      if (props.isBalanceEmpty == false && props.setIsBalanceEmpty)
      {
        props.setIsBalanceEmpty(true)
      }
    }

    if (props.showEndModal)
    {
      delayModal()
    }

    if (props.owner && props.challenger)
    {
      if (account == props.owner.toLowerCase() || account == props.challenger.toLowerCase())
      {
        setEnableButton(false)
      }
    }

  }, [props.showEndModal, props.owner, props.challenger, setEnableButton, enableButton])




  const DrawCards = () =>
  {

    const OwnerCard = [Math.floor(Math.random() * (4 - 1 + 1) + 1), Math.floor(Math.random() * (13 - 2 + 1) + 2)]
    const ChallengerCard = [Math.floor(Math.random() * (4 - 1 + 1) + 1), Math.floor(Math.random() * (13 - 2 + 1) + 2)]
    let winner = 0

    if (OwnerCard[1] > ChallengerCard[1]) // Owner card value stronger than Challengers'
    {
      winner = 1 // Owner won
    } else if (OwnerCard[1] < ChallengerCard[1])
    {
      winner = 2
    } else
    { // Tie, look at suit
      if (OwnerCard[0] > ChallengerCard[0]) // Owner suit stronger than Challengers'
      {
        winner = 1
      } else
      {
        winner = 2
      }
    }

    console.log("Owner's Cards: " + OwnerCard + " " + "Challenger's Cards: " + ChallengerCard + " " + "The Winner: " + winner)

    if (props.setOwnerCard && props.setWinner)
    {
      props.setOwnerCard(OwnerCard)
      props.setChallengerCard(ChallengerCard)
      props.setWinner(winner) // 1 is owner, 2 is challenger
    }

  }

  const delayModal = () =>
  {
    setTimeout(() =>
    {
      setShowModal(true)
      resetModal()
    }, 7000)
  }

  const resetModal = () =>
  {
    setTimeout(() =>
    {
      if (props.setShowEndModal && props.setOwnerShowDown && props.setChallengerShowDown && props.setRefetchRoomData && props.setDrawCards && props.setGameStarted)
      {
        props.setShowEndModal(false)
        setShowModal(false)
        props.setOwnerShowDown(false)
        props.setChallengerShowDown(false)
        props.setDrawCards(false)
        props.setRefetchRoomData(!props.refetchRoomData)
        props.setGameStarted(false)
      }
    }, 20000);
  }

  return (
    <>
      <motion.div
        variants={itemMotion}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={springMotion}
        className="flex h-[80vh] min-h-[60vh] w-full flex-col space-y-2 p-2 lg:w-1/3 lg:space-y-12 lg:p-8 justify-center items-center"
      >

        <div className='text-slate-20 font-light antialiased'>OSIRIS</div>

        <div className='flex justify-center items-center p-16 lg:p-0'>
          <Image
            priority
            alt=''
            src={Eye.image.src}
            width={Eye.width / 2}
            height={Eye.height / 2}
            className={(eyeToggle ? 'transition-all duration-1000 sepia' : 'transition-all duration-1000 grayscale')}
          />
        </div>

        <div>
          {!showModal ? (!empty ? (
            <div className="flex flex-col space-y-8 text-lg text-slate-300">

              <div className='uppercase font-black text-[22px]'>{props.name && props.name}</div>

              <div>
                {' '}
                Bet Size - {props.betSize &&
                  props.betSize as any / 10 ** 18}{' '}
              </div>
              <div className='flex flex-col justify-center items-center space-y-5'>
                <div >
                  Owner Vault - {format(((props.ownerBalance as any) / 10 ** 18), 6)}
                </div>

                <div >
                  {
                    props.gameStarted && !props.drawCards ? (
                      <div className='font-light'>
                        <svg
                          className="w-8 h-8 mr-2 text-slate-400 animate-twSpin animate-infinite fill-slate-700"
                          viewBox="0 0 100 101" fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                      </div>
                    ) :
                      (
                        <div className='text-slate-50/0 font-light'>Waiting for challenger...</div>
                      )
                  }
                </div>

              </div>

            </div>

          ) : empty ? (
            <div className="flex flex-col space-y-8 text-lg text-slate-300">

              <div className='uppercase font-black text-[22px]'>{props.name && props.name}</div>

              <div>
                {' '}
                Bet Size - {props.betSize &&
                  props.betSize as any / 10 ** 18}{' '}
              </div>
              <div className='border border-slate-500 rounded-xs py-2.5 text-red-500 font-semibold text-lg'>
                OWNER'S BALANCE IS EMPTY! <br /> <span className='text-slate-200 text-xs font-bold uppercase'>deposit the minimum of bet size...</span>
              </div>
            </div>
          ) : "") :
            (
              <div className="flex flex-col space-y-8 text-lg text-slate-300 w-full">

                <div className='uppercase font-black text-[22px]'>{props.name && props.name}</div>

                <div className={(props.winner === 0 ? 'shadow shadow-[#60e5c6] border border-[#60e5c6]/50' : 'shadow shadow-[#e8ff82] border border-[#e8ff82]/50') + ' animate-[fadeIn_1s_ease-in-out] w-full h-full flex flex-col items-center justify-center bg-slate-900/50 rounded-md text-[15px] leading-normal py-4 px-16'}>
                  <div className='flex flex-col min-w-full justify-center items-center text-slate-200 font-black space-y-2'>
                    <div className='flex space-x-6 justify-center items-center'>
                      <span className='tracking-wide'>Winner: </span>
                      <span className={(props.winner === 0 ? 'font-medium text-[#60e5c6]' : 'font-medium text-[#e8ff82]')}>{addressFormatter(props.winnerAddress, 4)}</span>
                    </div>

                    <div className='flex space-x-6 justify-center items-center'>
                      <span className='tracking-wide'>Net Winnings: </span>
                      <span className='font-medium text-slate-300'>{props.netWinnings}</span>
                    </div>

                    <div className='flex space-x-6 justify-center items-center'>
                      <span className='tracking-wide'>Tx Receipt: </span>
                      <a target="_blank" rel="noopener noreferrer" href={props.txHash ? 'https://rinkeby.etherscan.io/tx/' + props.txHash : 'https://rinkeby.etherscan.io/'}>
                        <span className='font-medium text-cyan-400'>Tx hash</span>
                      </a>
                    </div>

                    <div className='flex space-x-6 justify-center items-center'>
                      <span className='tracking-wide'>Fee Taken: </span>
                      <span className='font-medium text-slate-300'>{props.fee}</span>
                    </div>

                    <button
                      disabled={enableButton}
                      onClick={() =>
                      {
                        if (props.setShowEndModal && props.setOwnerShowDown && props.setChallengerShowDown && props.setRefetchRoomData && props.setDrawCards && props.setGameStarted)
                        {
                          props.setShowEndModal(false)
                          setShowModal(false)
                          props.setOwnerShowDown(false)
                          props.setChallengerShowDown(false)
                          props.setDrawCards(false)
                          props.setGameStarted(false)
                          props.setRefetchRoomData(!props.refetchRoomData)
                        }
                      }}
                      className={(props.winner === 0 ? 'text-slate-800 hover:bg-slate-200 rounded px-8 bg-[#60e5c6]' : 'text-slate-800 hover:bg-slate-200 rounded px-8 bg-[#e8ff82]')}
                    >
                      close
                    </button>
                  </div>
                </div>
              </div>
            )

          }{' '}
        </div>
      </motion.div>
    </>
  )
}

export default OsirisSection

// Perfect precision rounder!
const format = (num: number, decimals: number) =>
  num.toLocaleString('en-US', {
    minimumFractionDigits: 6,
    maximumFractionDigits: 6,
  })

//console.log(format(0.0023365, 6)) // "2.01"
//console.log(format(0.0023, 6)) // "1.35"

{
  /* <button
              type="button"
              disabled={disabled}
              className="border focus:ring-1 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center focus:ring-gray-600 bg-gray-800 border-gray-700 text-white hover:bg-gray-900 mb-2 disabled:bg-slate-100 disabled:text-slate-500"
              onClick={() => {
                if (props.setOwnerShowDown && props.setChallengerShowDown)
                {
                  // Draw Cards for both & determine winner but only if reset is false
                  if (props.ownerShowDown === false) 
                  {
                    DrawCards()
                    DisableButtonHandler()
                  }

                  // Toggle Appearance
                  props.setOwnerShowDown(!props.ownerShowDown)
                  props.setChallengerShowDown(!props.challengerShowDown)

                  setEyeToggle(!eyeToggle)
                }
                
              }}
            > 
              <div className='flex space-x-3 justify-center items-center w-full'>
                <FaArrowLeft />
                <span>Draw</span>
                <FaArrowRight />
              </div>
            </button> */
}
