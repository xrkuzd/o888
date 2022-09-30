import Head from 'next/head'
import { Header } from '@components/layout'
import { useState, useEffect, FunctionComponent } from 'react'
import { useMoralis } from 'react-moralis'
import useStore from '@store/store'

import { useRouter } from 'next/router'

export interface IMainLayout {
  children: any
 }

const MainLayout: FunctionComponent<IMainLayout> = ({ children }) =>
{
  const { isAuthenticated, user } = useMoralis()
  const setConnectModalOpen = useStore((state) => state.setConnectModalOpen)
  const isAsked = useStore((state) => state.isAsked)

  const [changeBG, setChangeBG] = useState<boolean>(false)

  const router = useRouter()

  // prettier-ignore
  useEffect(() =>
  {
    if (isAuthenticated)
    {
      if (!user?.attributes.askedAlready && !user?.attributes.hasProfileName && router.pathname == '/' && !isAsked) 
      {
        setConnectModalOpen(true)
      }
    }

    if (router.pathname != '/' && router.pathname != '/create' && router.pathname != '/join' && router.pathname != '/active') 
    {
      setChangeBG(true)
    } else
    {
      setChangeBG(false)
    }
  }, [isAuthenticated, router.pathname, changeBG, isAsked])

  return (
    <>

      <div
        className={
          (changeBG ? 'bgPattern08BLACK' : 'bgPattern08') +
          ' flex min-h-screen w-full select-none flex-col items-center justify-center overflow-x-hidden'
        }
      >
        <Header />

        {children}
      </div>
    </>
  )
}

export default MainLayout
