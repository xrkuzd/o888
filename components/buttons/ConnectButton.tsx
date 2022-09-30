import { useEffect, useContext } from 'react'
import { useMoralis } from 'react-moralis'

const ConnectButton = () => {
  const { isAuthenticated, authenticate, logout, user, account } = useMoralis()

  const ConnectButtonCallback = async () => {
    //console.log('isAuthenticated from HandleSignIn: ' + isAuthenticated)
  }

  useEffect(() => {
    /* if (isAuthenticated) {
      logout()
    } */
  }, [])

  return (
    <div className="justify-end xl:px-16">
      <div className="group relative flex items-center justify-center">
        <div className="animate-tilt absolute -inset-0.5 flex items-center justify-center rounded-md bg-gradient-to-br from-[#bef1eb] to-[#36dbb5] opacity-75 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>
        <div
          className="relative flex cursor-pointer items-center justify-center rounded-md border border-slate-500 bg-gray-100 from-[#bef1eb] to-[#36dbb5] px-3 py-1 text-sm font-light text-slate-600 hover:border-white/50 hover:bg-gradient-to-tl hover:text-white xl:px-6 xl:py-0.5 xl:text-lg"
          onClick={() => {
            {
              !isAuthenticated
                ? authenticate({
                    signingMessage: '🗻 SIGN-IN TO PLAY 🪐 OSIRIS 🗻',
                    onSuccess: ConnectButtonCallback,
                  })
                : logout()
            }
          }}
        >
          {isAuthenticated ? 'Connecting...' : 'Connect'}
        </div>
      </div>
    </div>
  )
}

export default ConnectButton
