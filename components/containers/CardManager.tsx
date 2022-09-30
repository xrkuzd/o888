// Card Manager will get the props from both sections (owner/challenger) props will be card value for each side.

// Winner related logic will be parsed and executed in the individual sections themselves

import {
  Cards,
  FaceCard,
  LightningG1Looped,
  LightningG2Looped,
  LightningY2Looped,
  LightningY1Looped,
} from '@utils/imageHelper'
import Image from 'next/image'

import { useEffect, useState, FunctionComponent } from 'react'

export interface CardProps {
  ownerCard: number[]
  challengerCard: number[]

  winner?: number
  ownerShowDown?: boolean
  challengerShowDown?: boolean
}

enum Suit {
  Diamonds = 1,
  Clubs,
  Hearts,
  Spades,
}

// prettier-ignore
const CardManager: FunctionComponent<CardProps> = ({ ...props }) => {

    const [oCard, setOCard] = useState<boolean>(false)
    const [cCard, setCCard] = useState<boolean>(false)

    const [ownerCard, setOwnerCard] = useState<string>()
    const [challengerCard, setChallengerCard] = useState<string>()

    useEffect(() => {
        if (props.ownerCard)
        {
            const ownerSuit = (props.ownerCard[0].toString( ))
            const ownerValue =  (props.ownerCard[1].toString(  ))

            setOwnerCard(ownerSuit + ownerValue)

        } else if (props.challengerCard) {
            const challengerSuit = (props.challengerCard[0].toString( ))
            const challengerValue =  (props.challengerCard[1].toString(  ))

            setChallengerCard(challengerSuit + challengerValue)

        }

        if (!props.ownerShowDown)
        {
            setOCard(false)
        }
        if (!props.challengerShowDown)
        {
            setCCard(false)
        }

    }, [props, ownerCard, challengerCard])
    

    useEffect(() => {
      
        if (props.ownerShowDown)
        {
            {setTimeout(() => 
                {   
                    setOCard(true)
                }, 2000)}
        } else if (props.challengerShowDown)
        {
            {setTimeout(() => 
                {   
                    setCCard(true)
                }, 3000)}
        }
    }, [props, oCard, cCard])
    

    return (
        <>
            {props.ownerCard && props.ownerShowDown ? 
            
            (
                <div className="flex flex-col justify-center items-center space-y-6 pt-4">
                    {props.winner == 0 ? 
                        (
                            <div className='animate-fadeIn animate-delay-[4000ms] animate-ease-[.25,.1,.25,1] flex flex-col justify-center items-center text-slate-200 tracking-wider text-[42px] font-extrabold uppercase box-decoration-clone bg-gradient-to-br from-[#00C9FF] to-[#92FE9D] px-2 text-transparent bg-clip-text'>winner</div>
                        ) : 
                        (
                            <div className='flex flex-col justify-center items-center text-white/0 text-3xl font-medium uppercase'>winner</div>
                        )
                    }

                    <div className="flex flex-col relative animate-[zoomInRight_0.25s_ease-in] justify-center items-center">
                        {
                            !oCard ? 
                            (
                                <>
                                    <div className='absolute flex justify-center items-center shadow-2xl rounded-xl px-[70px] py-[95px] shadow-[#60e5c6]'></div>
                                    <div className='z-40 w-full h-full flex flex-col justify-center items-center'>
                                        <Image 
                                            alt=''
                                            src={FaceCard.image.src}
                                            width={FaceCard.image.width / 4}
                                            height={FaceCard.image.height / 4}
                                        />
                                    </div>
                                </>
                            ) : (
                                ownerCard &&
                                <div className='flex flex-col justify-center items-center h-full w-full'>
                                    <div className='animate-fadeIn animate-delay-[888ms] absolute flex flex-col justify-center items-center shadow-2xl rounded-xl px-[70px] py-[95px] shadow-[#60e5c6]'></div>
                                    <div className='relative flex flex-col justify-center items-center h-full w-full'>
                                        <Image 
                                            alt=''
                                            src={Cards[ownerCard].image.src}
                                            width={Cards[ownerCard].image.width / 2}
                                            height={Cards[ownerCard].image.height / 2}
                                        />
                                    </div>
                                    <div className='absolute flex flex-col justify-center items-center h-72 w-72'>
                                        {
                                            props.winner == 1 ? 
                                            (
                                                <Image 
                                                    alt=''
                                                    src={LightningG2Looped.image.src}
                                                    width={LightningG2Looped.image.width}
                                                    height={LightningG2Looped.image.height}
                                                />
                                            ) : 
                                            (
                                                <Image 
                                                    alt=''
                                                    src={LightningG1Looped.image.src}
                                                    width={LightningG1Looped.image.width}
                                                    height={LightningG1Looped.image.height}
                                                />
                                            )
                                        }
                                    </div>
                                </div>
                            )
                        }
                    </div> 
                </div>
            )
                : props.challengerCard && props.challengerShowDown ? 
                
                (
                    <div className="flex flex-col justify-center items-center space-y-6 pt-4">
                        {props.winner == 1 ? 
                            (
                                <div className='animate-fadeIn animate-delay-[4000ms] animate-ease-[.25,.1,.25,1] flex flex-col justify-center items-center text-slate-200 tracking-wider text-[42px] font-extrabold uppercase box-decoration-clone bg-gradient-to-br from-[#ff68b8] to-[#e8ff82] px-2 text-transparent bg-clip-text'>winner</div>
                            ) : 
                            (
                                <div className='flex justify-center items-center text-white/0 text-3xl font-medium uppercase'>winner</div>
                            )
                        }   
    
                        <div className="flex flex-col  relative animate-delay-[500ms] animate-zoomInLeft animate-duration-[0.25s] animate-ease-in justify-center items-center">
                            {
                                !cCard ? 
                                (
                                    <>
                                        <div className='absolute flex flex-col justify-center items-center shadow-2xl rounded-xl px-[70px] py-[95px] shadow-[#e8ff82]'></div>
                                        <div className='z-40 w-full h-full flex flex-col justify-center items-center'>
                                            <Image 
                                                alt=''
                                                src={FaceCard.image.src}
                                                width={FaceCard.image.width / 4}
                                                height={FaceCard.image.height / 4}
                                            />
                                        </div>
                                    </>
                                ) : 
                                (
                                    challengerCard &&
                                    <div className='flex flex-col justify-center items-center h-full w-full'>
                                        <div className='animate-fadeIn animate-delay-[888ms] absolute flex flex-col justify-center items-center shadow-2xl rounded-xl px-[70px] py-[95px] shadow-[#e8ff82]'></div>
                                        <div className='relative flex flex-col justify-center items-center h-full w-full'>
                                            <Image 
                                                alt=''
                                                src={Cards[challengerCard].image.src}
                                                width={Cards[challengerCard].image.width / 2}
                                                height={Cards[challengerCard].image.height / 2}
                                            />
                                        </div>
                                        <div className='absolute flex flex-col justify-center items-center h-72 w-72'>
                                            {
                                                props.winner == 2 ? 
                                                (
                                                    <Image 
                                                        alt=''
                                                        src={LightningY2Looped.image.src}
                                                        width={LightningY2Looped.image.width}
                                                        height={LightningY2Looped.image.height}
                                                    />
                                                ) : 
                                                (
                                                    <Image 
                                                        alt=''
                                                        src={LightningY1Looped.image.src}
                                                        width={LightningY1Looped.image.width}
                                                        height={LightningY1Looped.image.height}
                                                    />
                                                )
                                            }
                                        </div>
                                    </div>
                                )
                            }
                        </div> 
                    </div>

                ) : <div className='hidden'></div>
            }
        </>
    );
}

export default CardManager
