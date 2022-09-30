import { addressFormatter } from '@utils/addressFormat'
import { useState, useEffect } from 'react'
import Link from 'next/link'
//prettier-ignore
import { useApiContract, useMoralis, useMoralisQuery, useMoralisSubscription } from 'react-moralis'
import TableDummy from '@components/layout/TableDummy'
import { GiEgyptianBird, GiHieroglyphY } from 'react-icons/gi'
import { DeployedContract } from '@utils/constants/Values'
import ABI from '@utils/ABI/ABI'

import { divisorConstant } from './GameRoom'

export const decipherStatus = (statusCode: number) => {
  if (statusCode === 1) {
    return 'Playing'
  } else if (statusCode === 2) {
    return 'Empty'
  } else {
    return 'Join Now' // This works for now but it's lazy
  }
}

export const tokensNeeded = (betSize: number) => {
  if (0.001 <= betSize && betSize < 0.005) {
    return '15K'
  } else if (0.005 <= betSize && betSize < 0.01) {
    return '30K'
  } else if (0.01 <= betSize && betSize < 0.05) {
    return '50K'
  } else if (0.05 <= betSize && betSize < 0.1) {
    return '100K'
  } else {
    return '200K' // This works for now but it's lazy
  }
}

interface IRoomObj {
  roomName: string
  roomID: string
  owner: string
  betSize: string
}

type roomObjectArray = {
  room?: string
  challenger?: string
  betSize?: string
  ownerBalance?: string
  name?: string
}

export const randomAddressForComparison =
  '0x3e4C8384958eF045085BF801AEd08918AD98aeAF'

// prettier-ignore

const JoinRoom = () => {
  const { isAuthenticated, isInitialized } = useMoralis()

  // PAGINATION RELATED
  const [roomsArray, setRoomsArray] = useState<IRoomObj[] | undefined | any>([])
  const [rooms, setRooms] = useState<number>()
  const [currentPage, setCurrentPage] = useState(1)
  const [roomsPerPage] = useState(50)

  // Get current rooms
  const indexOfLastPost = currentPage * roomsPerPage
  const indexOfFirstPost = indexOfLastPost - roomsPerPage
  const currentRooms = roomsArray.slice(indexOfFirstPost, indexOfLastPost)

  // Change page
  const paginate = (pageNumber: number) => 
  {
    setCurrentPage(pageNumber)
  }

  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(roomsArray.length / roomsPerPage); i++) {
    pageNumbers.push(i)
  }
  
  // FETCHING DATA RELATED

  const [gameStartedArray, setGameStartedArray] = useState<Array<{ key: number, value: Date }>>([])
  const [gameResultsArray, setGameResultsArray] = useState<Array<{ key: number, value: Date }>>([])

  const [roomObjectArray, setRoomObjectArray] = useState<Array<roomObjectArray>>([])
  
  const [counter, setCounter] = useState<number>(0)

  const { runContractFunction: getGameRoom, data: gameRoomData, error: returnedError, isLoading} = useApiContract({ 
    address: DeployedContract, 
    functionName: 'gameRooms',
    abi: ABI,
    chain: 'rinkeby',
    params: {
      roomId: "0",
    },
  })


  useEffect(() => {

    if (isAuthenticated)
    {
      getAllRooms()
    }
    
    // CleanUp
    return () => {
      setRoomsArray([])
      setRooms(0)
    };

  }, [isAuthenticated])


  useEffect(() => {

    if (isInitialized)
    {
      if (rooms)
      {
        callGetGameRooms(rooms)
      }
    }

  }, [isInitialized, rooms])


  useEffect(() => 
  {
    if (gameRoomData)
    {
      if (rooms && counter <= rooms)
      {
        if (roomObjectArray[counter])
        {
          console.log("Sorry, room " + counter + " already exists in our array")
        } else 
        {
          let obj = gameRoomData as roomObjectArray
          let num = (rooms - 1) - counter
          let roomItem = { room: num.toString(), challenger: obj.challenger, betSize: obj.betSize, ownerBalance: obj.ownerBalance, name: obj.name}
          setRoomObjectArray(prev => [...prev, roomItem])
    
          //console.log("counter: " + counter)
          setCounter(counter + 1)
        }
      }
    }

      
  }, [gameRoomData])


  useEffect(() => 
  {
    if (roomObjectArray)
    {
      //console.log(roomObjectArray)
    }
      
  }, [roomObjectArray, rooms])
  


  const callGetGameRooms = async (rooms: number) => {

    for (let index = rooms; index > 0; index--) {
        
      let roomNum = index - 1

      const options = {
        address: DeployedContract, 
        functionName: 'gameRooms',
        abi: ABI,
        chain: 'rinkeby',
        params: {
          roomId: roomNum.toString(),
        },
      }

      await getGameRoom({params: options } as any)
      //console.log("How many times will this run initially")
    }
     /* else {
      const options = {
        address: DeployedContract, 
        functionName: 'gameRooms',
        abi: ABI,
        chain: 'rinkeby',
        params: {
          roomId: rooms.toString(),
        },
      }

      await getGameRoom({params: options } as any)
      console.log("How many times will this run update")
    } */
  }



  // FETCH ALL ROOMS CREATED
  const { fetch: fetchQuery } = useMoralisQuery(
    'Rooms',
    (query) => query.descending('createdAt'), // descending (createdAt) will return 0 --> nth rooms, ascending (createdAt) will return nth --> 0 rooms
    [],
    {
      autoFetch: false,
    }
  )

  const getAllRooms = async () => {
    const results = await fetchQuery()
    if (results != undefined) {
      setRoomsArray(results) // This is what gets displayed in chart table
      setRooms(results.length)
    }
  }



  // LIVE QUERY EVENTS

  const { fetch, } = useMoralisQuery(
		'Rooms',
		(query) => query.descending('updatedAt').limit(1),
		[],
		{
			live: true,
		},
	);

	useMoralisSubscription('Rooms', (q) => q.limit(1), [], {
		onUpdate: (data) => {
  
      if (data.attributes.roomId && data.attributes.confirmed === false)
      {
        // push newest created room into our roomobjectarray
        let newRoom = { room: data.attributes.roomId, challenger: divisorConstant, betSize: data.attributes.betSize, ownerBalance: (data.attributes.betSize), name: data.attributes.roomName}
        let tempArray = roomObjectArray.concat(newRoom)
        setRoomObjectArray(tempArray)

        getAllRooms()
      }
		},
	});


  const { fetch: fetchGameStarted } = useMoralisQuery(
		'GameStarted',
		(query) => query.descending('updatedAt').limit(1),
		[],
		{
			live: true,
		},
	);

  useMoralisSubscription('GameStarted', (q) => q.limit(1), [], {
		onUpdate: async (data) => 
    {

      if (data.attributes.roomId && data.attributes.confirmed === false)
      {

        const newState = roomObjectArray.map((room) => {
          if (room.room === data.attributes.roomId) 
          {
            return {...room, challenger: randomAddressForComparison}
          }
          return room
        });
        
        //console.log("Below is gameStarted Update with updated State")
        //console.log(newState)
        setRoomObjectArray(newState);

      }
		},
	});



  const { fetch: fetchGameResults } = useMoralisQuery(
		'GameResults',
		(query) => query.descending('updatedAt').limit(1),
		[],
		{
			live: true,
		},
	);

  useMoralisSubscription('GameResults', (q) => q.limit(1), [], {
		onUpdate: async (data) => 
    {

      if (data.attributes.roomId)
      {
        if (data.attributes.roomId && data.attributes.confirmed === false)
        {
          const newState = roomObjectArray.map((room) => {
            if (room.room === data.attributes.roomId) 
            {
              return {...room, challenger: divisorConstant}
            }
            return room
          });
          
          //console.log("Below is gameStarted Update with updated State")
          //console.log(newState)
          setRoomObjectArray(newState);
        }
      }
		},
	});



  return (
    <div className="antialiased ">
      <div className="container mx-auto sm:px-8">
        <div className="">
          <div className="">
            <span className="flex items-center justify-center py-12 text-sm font-extralight uppercase text-slate-200 lg:text-5xl">
              {' '}
              game rooms
            </span>
            <div className="inline-block min-w-full items-center justify-center overflow-hidden rounded-lg bg-[#1f1d2c]/80 shadow-xl shadow-white/40">
              <table className="min-w-full table-fixed">
                <thead className="bg-[#1f1d2c]/80 text-xs font-semibold uppercase tracking-wider text-slate-400 ">
                  <tr>
                    <th className="border-b border-gray-200/10 px-5 py-3 text-center">
                      Room
                    </th>
                    <th className="border-b border-gray-200/10  px-5 py-3 text-center">
                      Owner
                    </th>
                    <th className="border-b border-gray-200/10  px-5 py-3 text-center">
                      Bet Size
                    </th>
                    <th className="border-b border-gray-200/10  px-5 py-3 text-center">
                      Tokens Needed
                    </th>
                    <th className="border-b border-gray-200/10 px-5 py-3 text-center">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {roomsArray[0] ? (
                    currentRooms.map((room: any) => (
                      <Link
                        key={room.attributes.roomId}
                        href={`/room/${room.attributes.roomId}`}
                      >
                        <tr className="cursor-pointer items-center justify-center border-b border-gray-200/20 bg-[#2f3140] text-slate-200 hover:bg-[#4c476a]/80">
                          <td className="px-2 py-5 text-[10px] lg:px-10 lg:text-sm">
                            <div className="flex items-center justify-center">
                              <div className="ml-3">
                                <p className="whitespace-no-wrap">
                                  {room.attributes.roomName}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-2 text-[10px] lg:px-10 lg:text-sm">
                            <p className="whitespace-no-wrap flex items-center justify-center">
                              {addressFormatter(room.attributes.owner, 6)}
                            </p>
                          </td>
                          <td className="text-[10px] lg:px-10 lg:text-sm">
                            <p className="whitespace-no-wrap flex items-center justify-center">
                              {room.attributes.betSize / 1000000000000000000 +
                                ' ETH'}
                            </p>
                          </td>
                          <td className="px-2 text-xs lg:px-10 lg:text-sm">
                            <p className="whitespace-no-wrap flex items-center justify-center">
                              {tokensNeeded(
                                room.attributes.betSize / 1000000000000000000
                              )}
                            </p>
                          </td>
                          <td className="my-[12.5%] flex items-center justify-center px-2 text-[10px] lg:px-10 lg:text-sm">
                            <span className="relative inline-block items-center justify-center py-1 px-3 font-semibold leading-tight text-green-100">
                              <span
                                aria-hidden
                                className={
                                  roomObjectArray && rooms && roomObjectArray[(rooms - 1) - room.attributes.roomId] && (roomObjectArray[(rooms - 1) - room.attributes.roomId].betSize as any) / 10**18 > (roomObjectArray[(rooms - 1) - room.attributes.roomId].ownerBalance as any) / 10**18 
                                  ? 'absolute inset-0 flex items-center justify-center rounded-full bg-pink-400 opacity-80 px-4'
                                  : roomObjectArray && rooms && roomObjectArray[(rooms - 1) - room.attributes.roomId] && roomObjectArray[(rooms - 1) - room.attributes.roomId].challenger === divisorConstant
                                    ? 'absolute inset-0 flex items-center justify-center rounded-full bg-green-400 opacity-50'
                                    : roomObjectArray && rooms && roomObjectArray[(rooms - 1) - room.attributes.roomId] && roomObjectArray[(rooms - 1) - room.attributes.roomId].challenger !== divisorConstant
                                    ? 'absolute inset-0 flex items-center justify-center rounded-full bg-sky-400 opacity-80 px-4'
                                    : ''
                                }
                              ></span>
                                {
                                  roomObjectArray && rooms && roomObjectArray[(rooms - 1) - room.attributes.roomId] &&  (roomObjectArray[(rooms - 1) - room.attributes.roomId].betSize as any) / 10**18 > (roomObjectArray[(rooms - 1) - room.attributes.roomId].ownerBalance as any) / 10**18 
                                  ? (<span className="whitespace-no-wrap relative">Empty</span>)
                                  : roomObjectArray && rooms && roomObjectArray[(rooms - 1) - room.attributes.roomId] && roomObjectArray[(rooms - 1) - room.attributes.roomId].challenger === divisorConstant ? (<span className="whitespace-no-wrap relative">Join Now</span>)
                                  : roomObjectArray && rooms && roomObjectArray[(rooms - 1) - room.attributes.roomId] && roomObjectArray[(rooms - 1) - room.attributes.roomId].challenger !== divisorConstant ? (<span className="whitespace-no-wrap relative">Playing</span>)
                                  : (
                                    <svg
                                      className="w-8 h-8 mr-2 text-slate-400 animate-twSpin animate-infinite fill-slate-700 p-1" 
                                      viewBox="0 0 100 101" fill="none" 
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                    </svg>
                                  )
                                }
                            </span>
                          </td>
                        </tr>
                      </Link>
                    ))
                  ) : (
                    <>
                      <TableDummy />
                    </>
                  )}
                </tbody>
              </table>
              <div className="xs:flex-row xs:justify-between flex flex-col items-center border-t bg-[#1f1d2c]/80 px-5 py-5">
                <ul className="inline-flex -space-x-px ">
                  <li className="flex items-center justify-center rounded-l-lg border border-gray-700 bg-gray-800 py-2 px-6 leading-tight">
                    <GiHieroglyphY />
                  </li>
                  {pageNumbers.map((number) => (
                    <li
                      key={number}
                      className="flex items-center justify-center"
                    >
                      <div
                        onClick={() => paginate(number)}
                        className="cursor-pointer border border-gray-700 bg-gray-800 py-2 px-6 leading-tight text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {number}
                      </div>
                    </li>
                  ))}
                  <li className="flex items-center justify-center rounded-r-lg border border-gray-700 bg-gray-800 py-2 px-6 leading-tight">
                    <GiEgyptianBird />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JoinRoom
