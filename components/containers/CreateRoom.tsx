import { useEffect, useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { useForm, Controller } from 'react-hook-form'
import ABI from '@utils/ABI/ABI'
import { DeployedContract, OsirisV2Contract } from '@utils/constants/Values'
import { Moralis } from 'moralis'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

// prettier-ignore
import { useMoralis, useMoralisQuery, useWeb3ExecuteFunction, useApiContract, } from 'react-moralis'
import { formatErrorMessage } from '@components/navigation/ChallengerNav'
import OsirisV2ABI from '@utils/ABI/OsirisV2ABI'

const ethSizes: { bet: number; stake: number }[] = [
  { bet: 0.001, stake: 0 },
  { bet: 0.005, stake: 1 },
  { bet: 0.01, stake: 2 },
  { bet: 0.05, stake: 3 },
  { bet: 0.1, stake: 4 },
]

const tokenSizes: number[] = [15000, 30000, 50000, 100000, 200000]

// prettier-ignore
const CreateRoom = () => {
  const [selectedETH, setSelectedETH] = useState(ethSizes[0])
  const [selectedStaking, setSelectedStaking] = useState(0)
  const { enableWeb3, isWeb3Enabled, user } = useMoralis()
  const { error: executeError, fetch: CreateRoom, } = useWeb3ExecuteFunction()

  const { runContractFunction: getBalanceX, data: tokenBalance } =
		useApiContract({
			address: OsirisV2Contract,
			functionName: 'balanceOf',
			abi: OsirisV2ABI,
			chain: 'rinkeby',
			params: {
				account: user?.attributes.ethAddress,
			},
		});

  useEffect(() => {
    if (!isWeb3Enabled) {
      enableWeb3()
    }

    if (user)
    {
      getBalanceX()
    }

    reset({ roomName: '' }) // resets the room input to empty
    ResetValues() // resets the radio button selections to default

    return () => {
      setSelectedETH(ethSizes[0])
      setSelectedStaking(0) // This worked for me
    };
    
  }, [user, getBalanceX, tokenBalance, ])

  const { register, handleSubmit, reset, formState: { errors }, control, } = useForm()

  const onSubmit = handleSubmit(async (data) => {
    const sendOptions = {
      msgValue: Moralis.Units.ETH(selectedETH.bet + Number(data.sliderValue)),
      contractAddress: DeployedContract,
      functionName: 'createRoom',
      abi: ABI,
      chain: 'rinkeby',
      params: {
        name: data.roomName,
        betSize: Moralis.Units.ETH(selectedETH.bet),
      },
    }

    await CreateRoom({
      params: sendOptions,
      onSuccess: tagUser,
      onError: (error) => {
        toast.error(formatErrorMessage(error), {
          position: toast.POSITION.BOTTOM_CENTER,
        })
      },
    })
    if (executeError) {
      console.log('Error: ' + executeError)
    }
  })

  
  const tagUser = async (tx: any) => {
    await tx.wait(1) // wait for 1 tx confirmation
    toast.success('Success! Your Room was Created', {
      position: toast.POSITION.BOTTOM_CENTER,
    })
  }

  const { fetch: fetchQuery } = useMoralisQuery(
    'Rooms',
    (query) => query.descending('roomId'),
    [],
    {
      autoFetch: false,
    }
  )

  const ResetValues = () => {
    setSelectedETH(ethSizes[0])
    setSelectedStaking(0)
  }

  return (
    <>
      <div className="flex flex-col py-10">
        <span className="mb-6 items-center justify-center text-2xl font-extralight uppercase text-slate-200 lg:mb-10 lg:text-5xl">
          {' '}
          create room
        </span>

        <div className="container h-full max-w-4xl items-center justify-center space-y-2 rounded-lg border border-slate-400/50 bg-[#1f1d2c]/80 p-4 py-12 shadow-2xl shadow-white/20 lg:space-y-0 lg:p-0 lg:py-12 lg:px-4">
          <form onSubmit={onSubmit} className="w-full space-y-4">
            
            <div className="flex w-full flex-col items-center justify-center space-y-8 lg:flex-row lg:space-y-0 lg:space-x-16 mb-8">
              {/* ETH SIZE INPUT */}
              <div className="flex w-full flex-col items-center justify-center space-y-2 lg:block lg:w-auto">
                <span className="text-sm lg:text-[15px]">
                  Eth bet size for your room
                </span>

                <div className="flex w-full items-center justify-center lg:w-auto">
                  <div className="flex items-center justify-center rounded-lg bg-[#1f1d2c]/30 px-3 py-3 shadow-md lg:w-auto lg:px-4 lg:py-4">
                    <div className="lg:min-w-sm flex w-full items-center justify-center lg:w-auto">
                      <div className="lg:min-w-sm flex w-full items-center justify-center lg:w-auto lg:max-w-md">
                        <RadioGroup
                          value={selectedETH}
                          onChange={setSelectedETH}
                        >
                          <div className="lg:min-w-sm flex w-full items-center justify-center space-x-4 lg:w-auto lg:space-x-6">
                            {ethSizes.map((ethSize) => (
                              <RadioGroup.Option
                                key={ethSize.bet}
                                value={ethSize}
                                onClick={() => {
                                  setSelectedStaking(ethSize.stake)
                                }}
                                className={({ active, checked }) =>
                                  `${
                                    active
                                      ? 'flex items-center justify-center ring-1 ring-white ring-opacity-20 ring-offset-1 ring-offset-sky-100'
                                      : 'flex items-center justify-center'
                                  }
                                    ${
                                      checked
                                        ? 'lg:min-w-24 flex w-12 items-center justify-center bg-indigo-500 text-white'
                                        : 'lg:min-w-24 flex w-12 items-center justify-center bg-white'
                                    }
                                      relative flex cursor-pointer items-center justify-center rounded-md shadow-md focus:outline-none`
                                }
                              >
                                {({ active, checked }) => (
                                  <>
                                    <div className="flex items-center justify-center">
                                      <div className="flex items-center justify-center">
                                        <div className="flex items-center justify-center text-[14px] lg:text-[14px]">
                                          <RadioGroup.Label
                                            as="p"
                                            className={`flex items-center justify-center font-medium  ${
                                              checked
                                                ? 'flex items-center justify-center px-8 py-2 text-white'
                                                : 'flex items-center justify-center px-8 py-2 text-slate-700'
                                            }`}
                                          >
                                            {ethSize.bet}
                                          </RadioGroup.Label>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </RadioGroup.Option>
                            ))}
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* TOKENSIZE INPUT */}
              <div className="flex w-full flex-col items-center justify-center space-y-2 lg:w-auto">
                <span className="text-sm lg:text-[15px]">
                  Osiris amount required to join room
                </span>
                <div className="flex w-full items-center justify-center lg:w-auto">
                  <div className="flex items-center justify-center rounded-lg bg-[#1f1d2c]/30 px-3 py-3 shadow-md lg:w-auto lg:px-4 lg:py-4">
                    <div className="lg:min-w-sm flex w-full items-center justify-center lg:w-auto">
                      <div className="lg:min-w-sm flex w-full items-center justify-center lg:w-auto lg:max-w-md">
                        <div className="lg:min-w-sm flex w-full items-center justify-center space-x-3 lg:w-auto lg:space-x-6">
                          {/* STAKING LEVEL 1 */}
                          <div
                            className={`${
                              selectedStaking == 0
                                ? 'lg:min-w-24 flex items-center justify-center bg-emerald-300 text-slate-900'
                                : 'lg:min-w-24 flex items-center justify-center bg-white text-slate-700'
                            }
                                  relative flex items-center justify-center rounded-md shadow-md focus:outline-none`}
                          >
                            <div className="flex items-center justify-center">
                              <div className="flex items-center justify-center">
                                <div className="flex items-center justify-center text-[12px] lg:text-[14px]">
                                  <p className="flex items-center justify-center px-2 py-2 font-medium">
                                    {tokenSizes[0] / 1000 + 'K'}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* STAKING LEVEL 2 */}
                          <div
                            className={`${
                              selectedStaking == 1
                                ? 'lg:min-w-24 flex items-center justify-center bg-emerald-300 text-slate-900'
                                : 'lg:min-w-24 flex items-center justify-center bg-white text-slate-700'
                            }
                                  relative flex items-center justify-center rounded-md shadow-md focus:outline-none`}
                          >
                            <div className="flex items-center justify-center">
                              <div className="flex items-center justify-center">
                                <div className="flex items-center justify-center text-[12px] lg:text-[14px]">
                                  <p className="flex items-center justify-center px-2 py-2 font-medium">
                                    {tokenSizes[1] / 1000 + 'K'}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* STAKING LEVEL 3 */}
                          <div
                            className={`${
                              selectedStaking == 2
                                ? 'lg:min-w-24 flex items-center justify-center bg-emerald-300 text-slate-900'
                                : 'lg:min-w-24 flex items-center justify-center bg-white text-slate-700'
                            }
                                  relative flex items-center justify-center rounded-md shadow-md focus:outline-none`}
                          >
                            <div className="flex items-center justify-center">
                              <div className="flex items-center justify-center">
                                <div className="flex items-center justify-center text-[12px] lg:text-[14px]">
                                  <p className="flex items-center justify-center px-2 py-2 font-medium">
                                    {tokenSizes[2] / 1000 + 'K'}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* STAKING LEVEL 4 */}
                          <div
                            className={`${
                              selectedStaking == 3
                                ? 'lg:min-w-24 flex items-center justify-center bg-emerald-300 text-slate-900'
                                : 'lg:min-w-24 flex items-center justify-center bg-white text-slate-700'
                            }
                                  relative flex items-center justify-center rounded-md shadow-md focus:outline-none`}
                          >
                            <div className="flex items-center justify-center">
                              <div className="flex items-center justify-center">
                                <div className="flex items-center justify-center text-[12px] lg:text-[14px]">
                                  <p className="flex items-center justify-center px-2 py-2 font-medium">
                                    {tokenSizes[3] / 1000 + 'K'}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* STAKING LEVEL 5 */}
                          <div
                            className={`${
                              selectedStaking == 4
                                ? 'lg:min-w-24 flex items-center justify-center bg-emerald-300 text-slate-900'
                                : 'lg:min-w-24 flex items-center justify-center bg-white text-slate-700'
                            }
                                  relative flex items-center justify-center rounded-md shadow-md focus:outline-none`}
                          >
                            <div className="flex items-center justify-center">
                              <div className="flex items-center justify-center">
                                <div className="flex items-center justify-center text-[12px] lg:text-[14px]">
                                  <p className="flex items-center justify-center px-2 py-2 font-medium">
                                    {tokenSizes[4] / 1000 + 'K'}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          
            {/* SLIDER INPUT */}
            <div className="flex h-full w-full flex-col items-center justify-center space-y-4 lg:flex-row lg:space-y-0 lg:space-x-16">
              <Controller
                control={control}
                name="sliderValue"
                defaultValue={0}
                render={({ field: { value, onChange } }) => (
                  <>
                    <label className="lg:min-w-1/4 block text-[16px] text-slate-300 lg:w-1/4">
                      Room Balance: <span className="font-bold">{value}</span>{' '}
                      eth
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={0.1}
                      step={0.01}
                      onChange={onChange}
                      value={value}
                      className="slider-thumb lg:min-w-1/2 h-2 w-2/3 cursor-pointer appearance-none rounded-lg bg-gray-600 lg:w-1/2"
                    />
                  </>
                )}
              />
            </div>


            {/* OSIRIS TOKEN BALANCE animate-[pulse_2s_ease-in-out_infinite] */}
            <div className='flex w-full flex-col items-center justify-center space-y-8 lg:flex-row lg:space-y-0 lg:space-x-16 pt-4'>
              <div className='flex justify-center items-center text-slate-300 uppercase font-extrabold'>
                Your Osiris v2 Token balance:
              </div>
              <div className={((parseInt(tokenBalance as string) / 10**18) >= tokenSizes[selectedStaking] ? 'flex justify-center items-center text-xl text-slate-300 font-bold' : 'flex justify-center items-center text-xl text-red-300 font-bold')}>
                {tokenBalance ? (Math.trunc(parseInt(tokenBalance as string) / 10**18)) : 0}
              </div>
            </div>

            {/* NAME & SUBMIT BUTTON INPUT */}
            <div className="flex h-full w-full flex-col items-center justify-center lg:flex-row lg:space-y-0 lg:space-x-16">
              {/* NAME ROOM INPUT */}
              <div className=" flex flex-col items-center justify-center py-8 lg:py-4">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="rounded-xl bg-slate-50 ">
                    <div className="relative rounded-xl bg-inherit">
                      <input
                        {...register('roomName', {
                          required: true,
                          minLength: 6,
                          maxLength: 16,
                        })}
                        type="text"
                        id="roomName"
                        className="peer flex items-center justify-center rounded-lg border-2 border-slate-400 bg-transparent px-2 py-2 text-slate-900 placeholder-transparent focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-60"
                        placeholder="Room Name"
                        maxLength={16}
                      />
                      <label className="absolute left-0 -top-3 mx-1 cursor-text rounded-sm border-indigo-500 bg-inherit px-1 text-sm text-slate-700 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-3 peer-focus:border-t-2 peer-focus:text-sm peer-focus:text-indigo-500">
                        Room Name
                      </label>
                    </div>
                  </div>

                  {errors.roomName && (
                    <div className="flex items-center justify-center text-xs text-red-400 lg:text-sm">
                      Enter a valid name between 6-16 characters
                    </div>
                  )}
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <div className="flex flex-col items-center justify-center py-1 lg:py-4">
                <button
                  type="submit"
                  disabled={tokenSizes[selectedStaking] >= (parseInt(tokenBalance as string) / 10**18)}
                  className="flex items-center justify-center rounded-lg bg-gradient-to-bl from-purple-600 to-[#30c5d2] px-16 py-2 text-center text-lg font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-800 disabled:bg-slate-300 disabled:hover:bg-slate-300 disabled:text-red-700 disabled:select-none"
                >
                  Create Room
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default CreateRoom
