import { getSession, signOut } from 'next-auth/react'
import { NextPageWithLayout } from './page';

// get a prop from getServerSideProps

const user: NextPageWithLayout = ({ ...user }) => {
    return (
        <div className="bgPattern08BLACK flex justify-center items-center min-h-screen w-full text-5xl text-slate-300">
            <h4> User session: </h4>
            <pre>{JSON.stringify(user, null, 2)}</pre>
            <button onClick={ () => { signOut({ redirect: false }) } }>Sign Out</button>
        </div>
    )
}

export default user;

user.getLayout = (page) => {
    return (
      <>
        {page}
      </>
    )
}