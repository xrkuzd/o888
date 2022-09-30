import TableDummy from '@components/layout/TableDummy'
import { addressFormatter } from '@utils/addressFormat'
import Link from 'next/link'
import { useEffect } from 'react'
import { GiEgyptianBird, GiHieroglyphY } from 'react-icons/gi'
import { tokensNeeded } from './JoinRoom'
// prettier-ignore
import { useMoralis, useMoralisQuery, useMoralisSubscription, } from 'react-moralis'

// prettier-ignore
const ActiveRoom = () => {
  
  const { user, isAuthenticated, isInitialized } = useMoralis();

  const { fetch: fetchYourRooms, data: queriedData, error: queriedError, } = useMoralisQuery(
    'Rooms',
    (query) => query.equalTo("owner", user?.attributes.ethAddress).descending("createdAt"),
    [],
    {
      autoFetch: false,
    }
  )

  useEffect(() => {
    
    if (isInitialized && isAuthenticated) 
    {
      getYourRooms()
    }

  }, [isInitialized, isAuthenticated])
  

  const getYourRooms = async () => {
    await fetchYourRooms()
    if (queriedError)
    {
      console.log('queriedError: ' + queriedError)
    }
  }

  const { fetch} = useMoralisQuery(
		'Rooms',
		(query) => query.descending('updatedAt').limit(1),
		[],
		{
			live: true,
		},
	);

	useMoralisSubscription('Rooms', (q) => q.limit(1), [], {
		onUpdate: () => 
    {
      getYourRooms()
		},
	});


  return (
    <>
      <div className="antialiased">
        <div className="container mx-auto sm:px-8 py-24">
              <span className="flex items-center justify-center mb-12 text-sm font-extralight uppercase text-slate-200 lg:text-5xl">
                {' '}
                your created rooms
              </span>
              <div className="inline-block min-w-full overflow-hidden rounded-lg bg-[#1f1d2c]/80 shadow-xl shadow-white/40">
                <table className="min-w-full table-fixed leading-normal">
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
                        Created
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {queriedData ? (
                      queriedData.map((room: any) => (
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
                              {user?.attributes.ethAddress === room.attributes.owner ? "(You)" : addressFormatter(room.attributes.owner, 6)}
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
                          <td className="my-[12.5%] flex items-center justify-center px-2 text-[10px] lg:px-4 lg:text-sm">
                            <span className="relative inline-block items-center justify-center py-1 px-3 font-normal leading-tight text-[#60e5c6]">
                              <span className="whitespace-no-wrap">
                                {new Date(room.attributes.createdAt.toString()).toLocaleDateString()}
                              </span>
                            </span>
                          </td>
                        </tr>
                      </Link> )
                    )) : (
                      <>
                        <TableDummy />
                      </>
                    )}
                  </tbody>
                </table>
                <div className="xs:flex-row xs:justify-between flex flex-col items-center border-t bg-[#1f1d2c]/80 p-5">
                  <ul className="inline-flex -space-x-px text-sm">
                    <li className="flex items-center justify-center rounded-l-lg border border-gray-700 bg-gray-800 py-2 px-6 leading-tight">
                      <GiHieroglyphY />
                    </li>
                    <li className="flex items-center justify-center">
                      <div className="cursor-pointer border border-gray-700 bg-gray-800 py-2 px-6 leading-tight text-gray-400 hover:bg-gray-700 hover:text-white">
                        1
                      </div>
                    </li>
                    <li className="flex items-center justify-center rounded-r-lg border border-gray-700 bg-gray-800 py-2 px-6 leading-tight">
                      <GiEgyptianBird />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
    </>
  )
}

export default ActiveRoom
