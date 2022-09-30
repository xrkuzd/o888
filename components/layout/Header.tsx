import Link from 'next/link'
import Image from 'next/image'
import { Logo } from '@utils/imageHelper'
import { NavBar } from '@components/navigation'
import { useMoralis } from 'react-moralis'

import { ConnectButton } from '@rainbow-me/rainbowkit'

import { signIn, useSession } from 'next-auth/react'
import { useAccount, useSignMessage, useNetwork } from 'wagmi'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

import { Moralis } from 'moralis-v1'


const Header = () => {
  const { isAuthenticated, user } = useMoralis()

  const { authenticate, enableWeb3 } = useMoralis();

  const { isConnected, address } = useAccount()
  const { chain } = useNetwork()
  const { status } = useSession()
  const { signMessageAsync } = useSignMessage()
  const { push } = useRouter()

  useEffect(() => {
    const handleAuth = async () => {
      const userData = { address, chain: chain?.id, network: 'evm' }

      const { data } = await axios.post('/api/auth/request-message', userData, {
        headers: {
          'content-type': 'application/json',
        },
      })

      const message = data.message

      const signature = await signMessageAsync({ message })

      // redirect user after sucess authentication to /user page
      const { url } = await signIn<'credentials'>('credentials', {
        message,
        signature,
        redirect: false,
        //callbackUrl: '/user',
      }) as any
      // instead of using signIn(..., redirect: '/user')
      // we get the url from callback and push it to the router to avoid page refreshing
      push(url)
    }

    if (status === 'unauthenticated' && isConnected) {
      //handleAuth()
      handleDiffAuth('metamask')
    }

  }, [status, isConnected])


  const handleDiffAuth = async (provider: any) => {
    try {
      //setAuthError(null);
      //setIsAuthenticating(true);

      // Enable web3 to get user address and chain
      await enableWeb3({ throwOnError: true, provider });
      const { account, chainId } = Moralis;

      if (!account) {
        throw new Error('Connecting to chain failed, as no connected account was found');
      }
      if (!chainId) {
        throw new Error('Connecting to chain failed, as no connected chain was found');
      }

      // Get message to sign from the auth api
      const { message } = await Moralis.Cloud.run('requestMessage', {
        address: account,
        chain: parseInt(chainId, 16),
        network: 'evm',
      });

      // Authenticate and login via parse
      await authenticate({
        signingMessage: message,
        throwOnError: true,
      });

      console.log("IN!")
      
    } catch (error) {
      console.log(error)
    } finally {
      //setIsAuthenticating(false);
    }
  }


  return (
    <header className="z-50 grid h-16 min-w-full grid-cols-4 items-center justify-between gap-4 px-6 text-white lg:top-0 lg:h-20 lg:grid-cols-6 xl:justify-center xl:px-0">
      {/* LOGO */}
      <div className="col-span-2 col-start-1 col-end-3 justify-start xl:col-span-1 xl:px-12">
        <div className="flex items-center justify-center">
          <div className="relative z-40 hidden w-20 cursor-pointer xl:mt-4 xl:flex xl:w-[72px]">
            <Link href="/">
              <a>
                <Image
                  alt=""
                  src={Logo.image.src}
                  width={Logo.width}
                  height={Logo.height}
                />
              </a>
            </Link>
          </div>
          {/* <div className="absolute top-0 z-50 ml-[177px] -mt-3"> */}
          <div className="absolute z-50 ml-[88px]">
            <Link href="/">
              <a>
                <span className="flex cursor-pointer whitespace-nowrap text-xl font-semibold uppercase tracking-widest text-slate-300 hover:text-[#60e5c6] xl:-ml-[40px] xl:mt-7 xl:text-[14px] ">
                  Osiris
                </span>
              </a>
            </Link>
          </div>
        </div>
      </div>

      <div className="col-span-4 col-start-2 hidden w-full items-center justify-center xl:grid">
        <NavBar />
      </div>

      {/* {isAuthenticated && !isConnectModalOpen ? (
        <div className="col-span-2 col-end-7 flex items-center justify-center xl:col-span-1">
          <UserProfile user={user} />
        </div>
      ) : (
        <div className="col-span-2 col-end-7 flex items-center justify-center xl:col-span-1">
          <ConnectButton />
        </div>
      )} */}

      <ConnectButton accountStatus="address" />

    </header>
  )
}

export default Header
