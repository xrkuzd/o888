import { IoGameControllerOutline } from 'react-icons/io5'
import { MdReplyAll } from 'react-icons/md'
import { useMoralis, useWeb3ExecuteFunction } from 'react-moralis'
import Moralis from 'moralis'
import { FunctionComponent, useEffect, useState } from 'react'
import ABI from '@utils/ABI/ABI'
import { DeployedContract, TokensNeeded } from '@utils/constants/Values'
import useStore from '@store/store'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { divisorConstant } from '@components/containers/GameRoom'

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

  setChallengerCard?: (card: number[]) => void
  challengerCard?: number[]
}

export const formatErrorMessage = (error: any) => {
  const errorMessage = error.message.replace(
    'cannot estimate gas; transaction may fail or may require manual gas limit [ See: https://links.ethers.org/v5-errors-UNPREDICTABLE_GAS_LIMIT ] ',
    ''
  )
  return errorMessage
}

// prettier-ignore

const ChallengerNav: FunctionComponent<IReturnedData> = ({...props}) => {

  const [withdrawPressed, setWithdrawPressed] = useState(false)
  const [joinPressed, setJoinPressed] = useState(false)

  const { isAuthenticated, isWeb3Enabled, user, enableWeb3,  } = useMoralis()
  const roomID = useStore((state) => state.roomID)

  const { fetch: challengerWithdraw,  } = useWeb3ExecuteFunction()

  const { fetch: joinGame, } = useWeb3ExecuteFunction()

  useEffect(() => {
    
    if (isAuthenticated && !isWeb3Enabled) {
      enableWeb3()
    }
    
  }, [isAuthenticated])
  

  const HandleJoinGame = async () => {

    const sendOptions = {
      msgValue: Moralis.Units.ETH(props.betSize as any / 10 ** 18),
      signingMessage: "JOIN GAME!",
      contractAddress: DeployedContract,
      functionName: 'joinRoom',
      abi: ABI,
      chain: 'rinkeby',
      params: {
        roomId:  roomID,
      },
    }

    await joinGame ({
      params: sendOptions,
      onSuccess: tagJoin,
      onError: () => {
          toast.error("You need to hold the required amount of OSIRIS tokens to play.", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        },
      })
  }

  const HandleWithdrawGame = async () => {

    const sendOptions = {
      signingMessage: "EMERGENCY WITHDRAW",
      contractAddress: DeployedContract,
      functionName: 'emergencyWithdraw',
      abi: ABI,
      chain: 'rinkeby',
      params: {
        roomId:  roomID,
      },
    }

    await challengerWithdraw ({
      params: sendOptions,
      onSuccess: tagWithdraw,
      onError: () => {
          toast.error("You cannot withdraw before 15 mins have elapsed.", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        },
      })
  }

  const tagJoin = async (tx: any) => {
    await tx.wait(1) // wait for 1 tx confirmation
    toast.success('Successfully Joined Room', {
      position: toast.POSITION.BOTTOM_CENTER,
    })

    if(props.setRefetchRoomData)
    {
      props.setRefetchRoomData(!props.refetchRoomData)
    }

  }

  const tagWithdraw = async (tx: any) => {
    await tx.wait(1) // wait for 1 tx confirmation
    toast.success('Successfully Withdrew', {
      position: toast.POSITION.BOTTOM_CENTER,
    })

    if(props.setRefetchRoomData)
    {
      props.setRefetchRoomData(!props.refetchRoomData)
    }
  }

  return (
    <>

      {/* // Nav System Container */}
      <div className='mt-24'>

        {/* Join */}
        <div className={(joinPressed ? 'animate-[fadeIn_0.333s_ease-in-out] flex' : 'hidden') + "  rounded-lg shadow shadow-slate-800 text-slate-200 text-2xl justify-center items-center px-8 py-6 bg-[#00031235] z-50"}>

          <div className='flex flex-col space-y-2'>
            <div className='text-lg'>
              <span className='text-emerald-300'>Osiris Tokens Required</span>: {props.betSize ? (TokensNeeded[props.betSize as any / 10 ** 18]) : "Refresh Page"} <br />
              Betting Amount: {props.betSize ? (props.betSize as any / 10 ** 18 + ' ETH') : "Refresh Page"} 
            </div>

            <div className="flex flex-col items-center justify-center py-1 lg:py-2">
              <button
                onClick={() => {
                  if (props.owner?.toLowerCase() !== user?.attributes.ethAddress.toLowerCase())
                  {
                    HandleJoinGame();
                  }
                  setJoinPressed(false);
                }}
                type="submit"
                className=" flex items-center justify-center rounded-md bg-gradient-to-tl from-[#60e5c6] to-[#30c5d2] w-3/4 py-1 text-center text-sm font-medium text-slate-900 hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Join Game
              </button>
            </div>
          </div>
        </div>

        {/* Withdraw */}
        <div className={(withdrawPressed ? 'animate-[fadeIn_0.333s_ease-in-out] flex' : 'hidden') + "  rounded-lg shadow shadow-slate-800 text-slate-200 text-2xl justify-center items-center px-8 py-6 bg-[#00031235] z-50"}>

          <div className='flex flex-col space-y-2'>
            <div className='text-lg'>
              You have to wait 15 mins before you can withdraw
            </div>

            <div className="flex flex-col items-center justify-center py-1 lg:py-2">
              <button
                onClick={() => {
                  HandleWithdrawGame();
                  setWithdrawPressed(false);
                }}
                type="submit"
                className=" flex items-center justify-center rounded-md bg-gradient-to-tl from-[#ed6856] to-[#f19b54] w-3/4 py-1 text-center text-sm font-medium text-slate-900 hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* // Nav */}
      <div className="absolute inset-x-0 bottom-8 flex items-center justify-evenly space-x-8 text-[36px]">

        <div
          onClick={() => {
            if(!props.isBalanceEmpty && props.challenger == divisorConstant && props.owner?.toLowerCase() !== user?.attributes.ethAddress.toLowerCase() && !props.challengerShowDown)
            {
              setJoinPressed(!joinPressed)
              setWithdrawPressed(false);
            }
          }}
          className="relative z-40 flex flex-col items-center justify-center py-2 child:hover:flex"
        >
          <div className="whitespace-no-wrap absolute -top-4 z-50 hidden text-white">
            <a
              className="whitespace-no-wrap flex rounded bg-gradient-to-tl from-[#60e5c6] to-[#30c5d2] px-2 text-center text-sm text-slate-700"
              href="#"
            >
              <span className="whitespace-no-wrap flex text-center font-medium">
                Join
              </span>
            </a>
          </div>

          <div className="cursor-pointer text-slate-400 transition duration-300 hover:scale-90 group-hover:text-slate-300">
            <IoGameControllerOutline />
          </div>
        </div>

        <div
          onClick={() => {
            if (props.owner?.toLowerCase() !== user?.attributes.ethAddress.toLowerCase())
            {
              if (props.challenger?.toLowerCase() == user?.attributes.ethAddress.toLowerCase() && !props.challengerShowDown)
              {
                setWithdrawPressed(!withdrawPressed);
                setJoinPressed(false)
              }
            }
          }}
          className="relative z-40 flex flex-col items-center justify-center py-2 child:hover:flex"
        >
          <div className="whitespace-no-wrap absolute -top-4 z-50 hidden text-white">
            <a
              className="whitespace-no-wrap flex rounded bg-gradient-to-br from-[#ed6856] to-[#f19b54] px-2 text-center text-sm text-slate-800"
              href="#"
            >
              <span className="whitespace-no-wrap flex text-center font-medium">
                Withdraw
              </span>
            </a>
          </div>

          <div className="rotate-180 cursor-pointer text-slate-400 transition duration-300 hover:scale-90 group-hover:text-slate-300">
            <MdReplyAll />
          </div>
        </div>
      </div>

      
    </>
  )
}

export default ChallengerNav
