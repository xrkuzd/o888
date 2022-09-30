import '../styles/globals.css'
import '../styles/background.css'
import type { AppProps } from 'next/app'
import { NextPageWithLayout } from './page'

import { MoralisProvider } from 'react-moralis'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import { createClient, configureChains, WagmiConfig, Chain, chain } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { SessionProvider } from 'next-auth/react'
import { getDefaultWallets, RainbowKitProvider, darkTheme, wallet, connectorsForWallets } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import Head from 'next/head'



const defaultChains: Chain[] = [
  {
    ...chain.goerli,
  },
  {
    ...chain.mainnet,
  },
];

const { provider, webSocketProvider, chains } = configureChains(defaultChains, [publicProvider()])

const connectors = connectorsForWallets([
  {
    groupName: 'Most Popular',
    wallets: [
      wallet.metaMask({ chains }),
      wallet.coinbase({ appName: '🌟 OSIRIS 🌟', chains }),
      wallet.walletConnect({ chains }),
    ],
  },
]);

/* const { connectors } = getDefaultWallets ({
  appName: "🌟 OSIRIS 🌟",
  chains,
}) */

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
  // added connectors from rainbowkit
  connectors,
})

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Crucial to get Moralis Provider to work is wrapping this object with the Provider
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <WagmiConfig client={client} >
      <SessionProvider session={pageProps.session} refetchInterval={0} >
        <RainbowKitProvider chains={chains} theme={darkTheme()} modalSize="compact" appInfo={ {appName: "🌟 OSIRIS 🌟"} }>

          <MoralisProvider appId={process.env.NEXT_PUBLIC_APPLICATION_ID ?? 'AppId Undefined Fallback'} serverUrl={process.env.NEXT_PUBLIC_SERVER_URL ?? 'ServerUrl Undefined Fallback'} >
            <Head>
              <title>OSIRIS DEATHCULT</title>
            </Head>
            {getLayout(<Component {...pageProps} />)}

            <ToastContainer
              style={{ width: '600px', }}
              toastClassName={() => 'bg-slate-800 shadow-lg shadow-slate-500 text-slate-200 relative flex p-1 min-h-10 max-h-20 rounded-md justify-between overflow-hidden cursor-pointer'}
              position="bottom-center"
              autoClose={5000}
              bodyClassName={() => 'text-[16px] break-all flex w-full h-full text-slate-50 flex justify-center items-center text-center overflow-hidden '} />

          </MoralisProvider>

        </RainbowKitProvider>
      </SessionProvider>
    </WagmiConfig>
  )

  /* return (
    <MoralisProvider
      appId={process.env.NEXT_PUBLIC_APP_ID ?? 'AppId Undefined Fallback'}
      serverUrl={process.env.NEXT_PUBLIC_SERVER_URL ?? 'ServerUrl Undefined Fallback'} >

      {getLayout(<Component {...pageProps} />)}

      <ToastContainer
        style={{width: '600px',}}
        toastClassName={() => 'bg-slate-800 shadow-lg shadow-slate-500 text-slate-200 relative flex p-1 min-h-10 max-h-20 rounded-md justify-between overflow-hidden cursor-pointer'}
        position="bottom-center"
        autoClose={5000}
        bodyClassName={() => 'text-[16px] break-all flex w-full h-full text-slate-50 flex justify-center items-center text-center overflow-hidden '} />

    </MoralisProvider>
  ) */
}

export default MyApp
