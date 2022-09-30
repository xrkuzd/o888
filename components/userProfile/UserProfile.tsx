import { useEffect } from 'react'
import { useMoralis } from 'react-moralis'

const getEllipsisTxt = (str: string, n = 4) => {
  if (str) {
    return `${str.slice(0, n)}...${str.slice(str.length - n)}`
  }
  return ''
}

// Change to more specific type later
type UserProp = {
  user: any | null
}

// Not using any props here just saving this here as an example for later
const UserProfile = (props: UserProp) => {
  const { isAuthenticated, logout, user, account } = useMoralis()

  useEffect(() => {
    if (isAuthenticated) {
      //console.log(user)
    }
  }, [])

  return (
    <div>
      <div className="group relative max-w-xs animate-[fadeInRight_0.25s_ease-in-out] rounded border border-slate-500">
        <div className="flex h-full items-start justify-start space-x-3 py-[0.3rem] px-4">
          <span className="flex w-full items-start justify-start text-ellipsis whitespace-nowrap text-[14px] font-bold text-slate-300">
            {user ? user?.attributes.profileName : 'Refresh Page'}{' '}
          </span>
          <div className="flex w-full items-start justify-start text-[#60e5c6]">
            {user ? (
              <span className="flex w-full items-start justify-start text-sm font-medium">
                {user
                  ? getEllipsisTxt(user?.get('ethAddress'))
                  : 'Refresh Page'}{' '}
              </span>
            ) : (
              'Refresh Page'
            )}
          </div>
        </div>

        <div className="absolute top-0 left-0 hidden h-full w-full cursor-pointer items-center justify-center bg-gradient-to-tl from-[#60e5c6] to-[#30c5d2] hover:bg-gradient-to-br group-hover:flex">
          <span
            className="flex h-full w-full items-center justify-center px-2 py-1 text-[16px] font-normal  text-slate-900"
            onClick={() => {
              logout()
            }}
          >
            Logout
          </span>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
