import { ConnectButton } from '@rainbow-me/rainbowkit'
import { signIn, useSession } from 'next-auth/react'
import { useAccount, useSignMessage, useNetwork } from 'wagmi'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

import { NextPageWithLayout } from './page'

const signin: NextPageWithLayout = () => {
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
            callbackUrl: '/user',
        }) as any
        // instead of using signIn(..., redirect: '/user')
        // we get the url from callback and push it to the router to avoid page refreshing
        push(url)
      }

      if (status === 'unauthenticated' && isConnected)
      {
        handleAuth()
      }

    }, [status, isConnected])

    return (
        <div className="bgPattern08BLACK flex justify-center items-center min-h-screen w-full">
            <ConnectButton />
        </div>
    )
}

export default signin;


signin.getLayout = (page) => {
  return (
    <>
      {page}
    </>
  )
}