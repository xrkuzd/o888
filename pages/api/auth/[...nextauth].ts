import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth from 'next-auth'
import Moralis from "moralis"


export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'MoralisAuth',
            credentials: {
                message: {
                    label: 'Message',
                    type: 'text',
                    placeholder: '0x0',
                },
                signature: {
                    label: 'Signature',
                    type: 'text',
                    placeholder: '0x0',
                },
            },
            async authorize(credentials: any) {
                try {
                    // "message" and "signature" are needed for authorization we described them in "credentials" above
                    const { message, signature } = credentials

                    await Moralis.start({ apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY });

                    const { address, profileId, expirationTime } = (await Moralis.Auth.verify({ message, signature, network: 'evm' })).raw;

                    const user = { address, profileId, expirationTime, signature };
                    // returning the user object and creating a session
                    return user;
                } catch (e) {
                    // eslint-disable-next-line no-console
                    if (e  instanceof Error)
                    {
                        console.error(e);
                    }
                    return null;
                }
            },
        }),
    ],
    // adding user info to the user session object
    callbacks: {
        async jwt({ token, user }) {
            user && (token.user = user);
            return token;
        },
        async session({ session, token }) {
            session.expires =  token.user.expirationTime;
            session.user = token.user;
            return session;
        },
    },
    session: {
        strategy: 'jwt',
    },
});