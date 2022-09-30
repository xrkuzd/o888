import { useEffect, useState } from 'react'
import
{
  useMoralis,
  useMoralisQuery,
  useApiContract,
  useMoralisSubscription,
} from 'react-moralis'
import { DeployedContract } from '@utils/constants/Values'
import ABI from '@utils/ABI/ABI'
import useStore from '@store/store'
import Moralis from 'moralis'
//import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import ChallengerSection from './ChallengerSection'
import OsirisSection from './OsirisSection'
import OwnerSection from './OwnerSection'
// prettier-ignore

type RoomNumber = {
  roomNumber: string | string[] | undefined
}

interface IReturnedData
{
  owner?: string
  challenger?: string
  name?: string //this is room name
  betSize?: string
  ownerBalance?: string

  setRefetchRoomData?: (toggle: boolean) => void
  refetchRoomData?: boolean

  setOwnerShowDown?: (toggle: boolean) => void
  ownerShowDown?: boolean

  setOwnerCard?: (card: number[]) => void
  ownerCard?: number[]

  setChallengerShowDown?: (toggle: boolean) => void
  challengerShowDown?: boolean

  setChallengerCard?: (card: number[]) => void
  challengerCard?: number[]

  setWinner?: (winner: number) => void
  winner?: number
}

export const divisorConstant: string =
  '0x0000000000000000000000000000000000000000'

// prettier-ignore
const GameRoom = ({ roomNumber }: RoomNumber) =>
{
  const { isAuthenticated, isWeb3Enabled, isInitialized } = useMoralis()
  const [refetchRoomData, setRefetchRoomData] = useState(false)
  const [isBalanceEmpty, setIsBalanceEmpty] = useState(false)

  const [ownerShowDown, setOwnerShowDown] = useState(false)
  const [ownerCard, setOwnerCard] = useState<number[]>()

  const [challengerShowDown, setChallengerShowDown] = useState(false)
  const [challengerCard, setChallengerCard] = useState<number[]>()

  const [winner, setWinner] = useState()

  const [gameStarted, setGameStarted] = useState<boolean>(false)
  const [drawCards, setDrawCards] = useState<boolean>(false)

  const [showEndModal, setShowEndModal] = useState<boolean>(false)

  const [winnerAddress, setWinnerAddress] = useState<string>()

  const [netWinnings, setNetWinnings] = useState<string>()
  const [fee, setFee] = useState<string>()
  const [txHash, setTxHash] = useState<string>()

  const setRoomID = useStore((state) => state.setRoomID) // from our store
  const { runContractFunction: getGameRoom, data, error: returnedError, } = useApiContract({
    address: DeployedContract, functionName: 'gameRooms',
    abi: ABI,
    chain: 'rinkeby',
    params: {
      roomId: roomNumber,
    },
  })

  useEffect(() =>
  {
    if (isAuthenticated)
    {
      //console.log('This is the room passed as props: ' + parseInt(roomNumber as string))
      setRoomID(parseInt(roomNumber as string))
    }

    if (isInitialized)
    {
      getGameRoom()
    }

  }, [isInitialized, refetchRoomData, isBalanceEmpty, gameStarted])






  // EVENT LISTENERS


  // For when a game starts and room is full

  const { fetch: fetchStarted } = useMoralisQuery(
    'GameStarted',
    (query) => query.descending('createdAt').limit(1),
    [],
    {
      live: true,
    },
  );

  useMoralisSubscription('GameStarted', (q) => q.limit(1), [], {
    onUpdate: (data) =>
    {

      if (data.attributes.roomId == roomNumber?.toString() && !data.attributes.confirmed)
      {
        setGameStarted(true)
      }
    },
  });

  // For when challenger Emergency Withdraws from room

  const { fetch: fetchEmergency } = useMoralisQuery(
    'EmergencyWithdraw',
    (query) => query.descending('createdAt').limit(1),
    [],
    {
      live: true,
    },
  );

  useMoralisSubscription('EmergencyWithdraw', (q) => q.limit(1), [], {
    onUpdate: (data) =>
    {

      if (data.attributes.roomId == roomNumber?.toString() && !data.attributes.confirmed)
      {
        setRefetchRoomData(!refetchRoomData)
      }
    },
  });

  // For when Owner Withdraws from room

  const { fetch: fetchOwnerWithdraw, data: WithDrawData } = useMoralisQuery(
    'WithdrawPot',
    (query) => query.descending('createdAt').limit(10),
    [],
    {
      live: true,
    },
  );

  useEffect(() =>
  {

    if (WithDrawData)
    {
      console.log(WithDrawData)
    }
  }, [WithDrawData])



  useMoralisSubscription('WithdrawPot', (q) => q, [], {

    onUpdate: (data) =>
    {
      fetchOwnerWithdraw()

      if (data.attributes.roomId == roomNumber?.toString() && !data.attributes.confirmed)
      {
        setRefetchRoomData(!refetchRoomData)
      }
    },
  });

  // For when Draw events are created

  const { fetch: fetchDraws, data: drawData } = useMoralisQuery(
    'Draws',
    (query) => query.descending('createdAt').limit(1),
    [],
    {
      live: true,
    },
  );

  useMoralisSubscription('Draws', (q) => q.limit(1), [], {
    onUpdate: (data) =>
    {

      if (data.attributes.roomId == roomNumber?.toString() && !data.attributes.confirmed)
      {
        setDrawCards(true)

        setOwnerCard([parseInt(data.attributes.playerASuit), data.attributes.playerACard])

        setChallengerCard([parseInt(data.attributes.playerBSuit), data.attributes.playerBCard])

        //console.log("PlayerA Suit: " + data.attributes.playerASuit + " typeOf: " + typeof data.attributes.playerASuit)
        //console.log("PlayerA Card: " + data.attributes.playerACard + " typeOf: " + typeof data.attributes.playerACard)
        //console.log("PlayerB Suit: " + data.attributes.playerBSuit + " typeOf: " + typeof data.attributes.playerBSuit)
        //console.log("PlayerB Card: " + data.attributes.playerBCard + " typeOf: " + typeof data.attributes.playerBCard)

        setChallengerShowDown(true)
        setOwnerShowDown(true)
      }
    },
  });


  const { fetch: fetchGameResults } = useMoralisQuery(
    'GameResults',
    (query) => query.descending('createdAt').limit(1),
    [],
    {
      live: true,
    },
  );

  useMoralisSubscription('GameResults', (q) => q.limit(20), [], {
    onUpdate: (data) =>
    {

      if (data.attributes.roomId == roomNumber?.toString() && !data.attributes.confirmed)
      {
        setWinner(data.attributes.winnerIdx)
        setWinnerAddress(data.attributes.winner)
        setNetWinnings(Moralis.Units.FromWei(data.attributes.netWinnings))
        setFee(Moralis.Units.FromWei(data.attributes.fee))
        setShowEndModal(true)
        setTxHash(data.attributes.transaction_hash)

        // Osiris Section is auto setting this to false after 15 seconds of game ending anyways so no need to set this false again here
        // This will be used to toggle the Challenger address name 
        //setGameStarted(false)

      }
    },
  });







  return (
    <>
      <div className='flex flex-col lg:flex-row w-full h-full -mt-16'>
        <OwnerSection
          {...(data as IReturnedData)}
          setRefetchRoomData={setRefetchRoomData}
          refetchRoomData={refetchRoomData}
          setIsBalanceEmpty={setIsBalanceEmpty}
          isBalanceEmpty={isBalanceEmpty}
          ownerShowDown={ownerShowDown}
          setOwnerShowDown={setOwnerShowDown}
          ownerCard={ownerCard}

          winner={winner}

        />

        <OsirisSection
          {...(data as IReturnedData)}
          setRefetchRoomData={setRefetchRoomData}
          refetchRoomData={refetchRoomData}
          setIsBalanceEmpty={setIsBalanceEmpty}
          isBalanceEmpty={isBalanceEmpty}

          ownerShowDown={ownerShowDown}
          setOwnerShowDown={setOwnerShowDown}
          ownerCard={ownerCard}
          setOwnerCard={setOwnerCard}

          challengerShowDown={challengerShowDown}
          setChallengerShowDown={setChallengerShowDown}
          challengerCard={challengerCard}
          setChallengerCard={setChallengerCard}

          winner={winner}
          drawCards={drawCards}
          showEndModal={showEndModal}
          setShowEndModal={setShowEndModal}
          winnerAddress={winnerAddress}
          netWinnings={netWinnings}
          fee={fee}
          txHash={txHash}
          gameStarted={gameStarted}
          setGameStarted={setGameStarted}
          setDrawCards={setDrawCards}

        />

        <ChallengerSection
          {...(data as IReturnedData)}
          setRefetchRoomData={setRefetchRoomData}
          refetchRoomData={refetchRoomData}
          setIsBalanceEmpty={setIsBalanceEmpty}
          isBalanceEmpty={isBalanceEmpty}
          challengerShowDown={challengerShowDown}
          setChallengerShowDown={setChallengerShowDown}
          challengerCard={challengerCard}
          gameStarted={gameStarted}
          winner={winner}
        />

      </div>
    </>
  )
}

export default GameRoom
