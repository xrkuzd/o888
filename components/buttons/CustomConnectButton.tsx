


import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { useBalance } from 'wagmi';
import {useAccount } from 'wagmi'


export const CustomConnectButton = () => {

  const [dABalance, setDABalance] = useState<string>("")

  const { address } = useAccount()
  const { data, isError, isLoading } = useBalance({
    addressOrName: address ? address : "",
    token: "0xc9c2861ed453bc983bac39490f378f3001b00e01" // TODO replace with dogeArcade's actual contract address
  })

  useEffect(() => {
    
    let ignore = false

    if (!ignore)
    {
      if (data)
      {
          setDABalance(data.formatted)
      } 
    }
  
    return () => {
      ignore = true
    }
  }, [data])
  

  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted, }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected = ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {

                
              if (!connected) {
                return (
                  <button onClick={openConnectModal} type="button" className="inline-flex font-bold text-[#191c2c] hover:text-slate-800 bg-[#7affba] hover:bg-[#5afeaa] border border-[#4e588a] hover:border-slate-300 px-4 focus:outline-none rounded text-[16px]">
                    Connect Wallet
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network Switch to Goerli
                  </button>
                );
              }
              return (
                <div style={{ display: 'flex', gap: 24 }}>

                  <button onClick={openChainModal} style={{ display: 'flex', alignItems: 'center' }} type="button" >
                    {chain.hasIcon && (
                      <div style={{background: chain.iconBackground, width: 24, height: 24, borderRadius: 999, overflow: 'hidden', marginRight: 12,}}>
                        {chain.iconUrl && ( <Image alt={chain.name ?? 'Chain icon'} src={chain.iconUrl} height={24} width={24} />)}
                      </div>
                    )}
                    <span className="text-sm 3xl:text-[16px] text-yellow-200"> {chain.name} </span>
                  </button>

                  <button onClick={openAccountModal} type="button">
                    <div className='flex space-x-6 justify-center items-center'>
                        <div className='flex space-x-4'>
                          <span className='text-sm 3xl:text-[16px] font-light 3xl:font-normal text-slate-200 3xl:text-slate-300'> {account.displayBalance ? ` ( ${account.displayBalance} )` : 'wDoge: 0'} </span>
                          <span className='text-sm 3xl:text-[16px] font-light 3xl:font-normal text-slate-200 3xl:text-slate-300'> {dABalance ? ` ( ${dABalance} $DA )` : '( 0 $DA )'} </span>
                        </div>
                        <span className='text-[15px] 3xl:text-[17px] text-emerald-300 3xl:text-emerald-200 font-bold'> {account.displayName} </span>
                    </div>
                    
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};