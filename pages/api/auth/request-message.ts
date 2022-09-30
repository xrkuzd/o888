import Moralis from 'moralis'

const config = {
    domain: process.env.NEXT_PUBLIC_APP_DOMAIN,
    statement: "SIGN THIS MESSAAGE TO PLAY OSIRIS",
    uri: process.env.NEXTAUTH_URL,
    timeout: 60,
}

export default async function handler(req: any, res: any) {
    const { address, chain, network } = req.body

    await Moralis.start({ apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY })

    try {
        const message = await Moralis.Auth.requestMessage({
            address,
            chain,
            network,
            ...config,
        } as any)

        console.log("WTF1")
        console.log(message)
        res.status(200).json(message)
        
    } catch (error) {
        console.log("WTF2")
        res.status(400).json({ error })
        //console.error(error)
    }

}