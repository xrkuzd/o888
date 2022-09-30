import { BsPiggyBank } from 'react-icons/bs'
import { MdReplyAll } from 'react-icons/md'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { FunctionComponent, useEffect, useState } from 'react'
// prettier-ignore
import { useMoralis, useWeb3ExecuteFunction, useNativeBalance } from 'react-moralis'

import { Moralis } from 'moralis'
import ABI from '@utils/ABI/ABI'
import { DeployedContract } from '@utils/constants/Values'
import useStore from '@store/store'
import { useForm, Controller } from 'react-hook-form'
import { formatErrorMessage } from './ChallengerNav'
import { divisorConstant } from '@components/containers/GameRoom'

interface IReturnedData
{
  owner?: string
  challenger?: string
  name?: string //this is room name
  betSize?: string
  ownerBalance?: string

  setRefetchRoomData?: ((toggle: boolean) => void) | undefined
  refetchRoomData?: boolean

  setIsBalanceEmpty?: (toggle: boolean) => void
  isBalanceEmpty?: boolean

  setOwnerShowDown?: (toggle: boolean) => void
  ownerShowDown?: boolean

  setOwnerCard?: (card: number[]) => void
  ownerCard?: number[]
}

// prettier-ignore

const OwnerNav: FunctionComponent<IReturnedData> = ({ ...props }) =>
{
  const [depositPressed, setDepositPressed] = useState(false)
  const [withdrawPressed, setWithdrawPressed] = useState(false)
  const [isDepositSubmitSuccessful, setIsDepositSubmitSuccessful] = useState(false)
  const [ethBalance, setEthBalance] = useState<number>(0)

  const { isAuthenticated, isWeb3Enabled, user, enableWeb3, } = useMoralis()

  const { getBalances, data: balance, nativeToken, error, isLoading } = useNativeBalance({ chain: "rinkeby" });

  const roomID = useStore((state) => state.roomID)

  const { handleSubmit: handleDepositSubmit, reset: resetDeposit, control: controlDeposit, } = useForm()
  const { handleSubmit: handleWithdrawSubmit, reset: resetWithdraw, control: controlWithdraw, } = useForm()

  const { data: withdrawData, error: withdrawError, fetch: OwnerWithdraw, isFetching: withdrawFetching, } = useWeb3ExecuteFunction()

  const { data: depositData, error: depositError, fetch: OwnerDeposit, isFetching: depositFetching, } = useWeb3ExecuteFunction()

  useEffect(() =>
  {

    if (isAuthenticated && !isWeb3Enabled) 
    {
      enableWeb3()
    }

  }, [isAuthenticated])


  useEffect(() =>
  {

    if (balance && balance.balance !== undefined && balance.balance !== null)
    {
      //console.log(balance.balance)

      let gas = BigInt(balance.balance) - BigInt(10000000000000000)
      let amt = parseFloat(Moralis.Units.FromWei(gas.toString())).toFixed(5)
      //console.log("amt: " + Number(amt))
      setEthBalance(Number(amt))
      //console.log(ethBalance)
    }

    if (error)
    {
      console.log("error is: " + error)
    }

  }, [balance])



  let withdrawingAmount = 0; // this is the value we submitted to withdraw.  FYI it may get set even before we get back 1 confirmation.

  const onSubmitWithdraw = handleWithdrawSubmit(async (data) =>
  {

    const sendOptions = {
      contractAddress: DeployedContract,
      functionName: 'withdrawPot',
      abi: ABI,
      chain: 'rinkeby',
      params: {
        roomId: roomID,
        amount: Moralis.Units.ETH(data.withdrawValue)
      },
    }

    withdrawingAmount = data.withdrawValue

    await OwnerWithdraw({
      params: sendOptions,
      onSuccess: tagWithdraw,
      onError: (error) =>
      {
        toast.error(formatErrorMessage(error), {
          position: toast.POSITION.BOTTOM_CENTER,
        })
      },
    })
    if (withdrawError)
    {
      console.log('Error: ' + withdrawError)
    }
  })

  // Callback that fires after withdraw function call gets 1 confirmation
  const tagWithdraw = async (tx: any) =>
  {
    await tx.wait(1) // wait for 1 tx confirmation
    toast.success('Successfully Withdrawn Funds', {
      position: toast.POSITION.BOTTOM_CENTER,
    })

    if (props.setRefetchRoomData)
    {
      props.setRefetchRoomData(!props.refetchRoomData)
    }
  }

  const onSubmitDeposit = handleDepositSubmit(async (data) =>
  {

    const sendOptions = {
      msgValue: Moralis.Units.ETH(data.depositValue),
      contractAddress: DeployedContract,
      functionName: 'depositPot',
      abi: ABI,
      chain: 'rinkeby',
      params: {
        roomId: roomID,
      },
    }

    await OwnerDeposit({
      params: sendOptions,
      onSuccess: TagDeposit,
      onError: (error) =>
      {
        toast.error(formatErrorMessage(error), {
          position: toast.POSITION.BOTTOM_CENTER,
          //theme: 'colored',
        })
      },
    })
    if (depositError)
    {
      console.log('Error: ' + depositError)
    }

    setIsDepositSubmitSuccessful(!isDepositSubmitSuccessful)
  })

  // Callback that fires after Deposit is successful
  const TagDeposit = async (tx: any) =>
  {
    await tx.wait(1) // wait for 1 tx confirmation
    toast.success('Successfully deposited', {
      position: toast.POSITION.BOTTOM_CENTER,
    })

    if (props.setRefetchRoomData)
    {
      props.setRefetchRoomData(!props.refetchRoomData)
    }
  }

  const determineWithdrawAmount = () =>
  {

    if (props.challenger)
    {
      if (props.challenger === divisorConstant)
      {
        // room is empty so owner can withdraw all of the room's balance
        return parseInt(props.ownerBalance as string) / 10 ** 18
      } else
      {
        // room is full and owner can only withdraw his balance minus the bet size of the room
        const difference = (parseInt(props.ownerBalance as string) / 10 ** 18) - (parseInt(props.betSize as string) / 10 ** 18)
        return difference
      }
    } else
    {
      return 0
    }

  }

  return (
    <>
      {/* // Nav System Container */}
      <div className='mt-24'>

        {/* Deposit */}
        <div className={(depositPressed ? 'animate-[fadeIn_0.333s_ease-in-out] flex' : 'hidden') + "  rounded-lg shadow shadow-slate-800 text-slate-200 text-2xl justify-center items-center px-8 py-6 bg-[#00031235] z-50"}>

          <form onSubmit={onSubmitDeposit} className="w-full space-y-3">
            <div className="flex h-full w-full flex-col items-center justify-center space-y-4 lg:flex-row lg:space-y-0 lg:space-x-16">
              <Controller
                control={controlDeposit}
                name="depositValue"
                defaultValue={0}
                render={({ field: { value, onChange } }) => (
                  <>
                    <label className="w-full text-[16px] text-slate-300 lg:w-1/6 whitespace-nowrap">
                      {value} eth
                    </label>
                    <input
                      type="range"
                      min={props.betSize ? (parseInt(props.betSize as string) / 10 ** 18) : 0}
                      max={ethBalance && ethBalance > 0 ? ethBalance : 2}
                      step={0.001}
                      onChange={onChange}
                      value={value}
                      className="slider-thumb h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-600"
                    />
                  </>
                )}
              />
            </div>
            <div className="flex flex-col items-center justify-center py-1 lg:py-2">
              <button
                onClick={() =>
                {
                  setDepositPressed(false);
                }}
                type="submit"
                className=" flex items-center justify-center rounded-md bg-gradient-to-tl from-[#60e5c6] to-[#30c5d2] w-3/4 py-1 text-center text-sm font-medium text-slate-900 hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-800"
              >
                Deposit
              </button>
            </div>
          </form>
        </div>




        {/* Withdraw */}
        <div className={(withdrawPressed ? 'animate-[fadeIn_0.333s_ease-in-out] flex' : 'hidden') + "  rounded-lg shadow shadow-slate-800 text-slate-200 text-2xl justify-center items-center px-8 py-6 bg-[#00031235] z-50"}>

          <form onSubmit={onSubmitWithdraw} className="w-full space-y-3">
            <div className="flex h-full w-full flex-col items-center justify-center space-y-4 lg:flex-row lg:space-y-0 lg:space-x-16">
              <Controller
                control={controlWithdraw}
                name="withdrawValue"
                defaultValue={0}
                render={({ field: { value, onChange } }) => (
                  <>
                    <label className="w-full text-[16px] text-slate-300 lg:w-1/6 whitespace-nowrap">
                      {value} eth
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={determineWithdrawAmount()}
                      step={0.001}
                      onChange={onChange}
                      value={value}
                      className="slider-thumb-red h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-600"
                    />
                  </>
                )}
              />
            </div>
            <div className="flex flex-col items-center justify-center py-1 lg:py-2">
              <button
                onClick={() =>
                {
                  setWithdrawPressed(false);
                }}
                type="submit"
                className=" flex items-center justify-center rounded-md bg-gradient-to-tl from-[#ed6856] to-[#f19b54] w-3/4 py-1 text-center text-sm font-medium text-slate-900 hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                Withdraw
              </button>
            </div>
          </form>
        </div>
      </div>


      {/* // Nav */}
      <div className="absolute inset-x-0 bottom-8 flex items-center justify-evenly space-x-8 text-[36px]">

        {/* // Withdraw Button */}
        <div
          onClick={() =>
          {
            if (user?.attributes.ethAddress && props.owner)
            {
              if (user?.attributes.ethAddress.toLowerCase() == props.owner?.toLowerCase() && !props.isBalanceEmpty && !props.ownerShowDown)
              {
                setWithdrawPressed(!withdrawPressed);
                setDepositPressed(false);
                resetWithdraw();
              }
            }
          }}
          className="cursor-pointer relative z-40 flex flex-col items-center justify-center py-2 child:hover:flex"
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

          <div className="cursor-pointer text-[32px] text-slate-400 transition duration-300 hover:scale-90 group-hover:text-slate-300">
            <MdReplyAll />
          </div>
        </div>

        {/* // Deposit Button */}
        <div
          onClick={() =>
          {
            if (user?.attributes.ethAddress && props.owner)
            {
              if (user?.attributes.ethAddress.toLowerCase() == props.owner?.toLowerCase() && !props.ownerShowDown)
              {
                getBalances()
                setDepositPressed(!depositPressed);
                setWithdrawPressed(false);
                resetDeposit();
              }
            }
          }}
          className="cursor-pointer relative z-40 flex flex-col items-center justify-center py-2 child:hover:flex"
        >
          <div className="whitespace-no-wrap absolute -top-4 z-50 hidden text-white">
            <a
              className="whitespace-no-wrap flex rounded bg-gradient-to-tl from-[#60e5c6] to-[#30c5d2] px-2 text-center text-sm text-slate-800"
              href="#"
            >
              <span className="whitespace-no-wrap flex text-center font-medium">
                Deposit
              </span>
            </a>
          </div>

          <div className="cursor-pointer text-slate-400 transition duration-300 hover:scale-90 group-hover:text-slate-300">
            <BsPiggyBank />
          </div>
        </div>
      </div>

    </>
  )
}

export default OwnerNav
