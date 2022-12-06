import { useSession, getSession } from 'next-auth/react'
import Head from 'next/head'

import styles from './landing.module.css'

const Landing = () => {
    const { data: session, status } = useSession()

    return (
        <>
            <div className={styles.landing}>
                {
                    session && <h2>Welcome On Board</h2>    
                }
                {
                    !session && <h2>Welcome!</h2>
                }
                <p>
                    Session: {JSON.stringify(session)} | Status: {status}
                </p>
            </div>

            <Head>
                <title> Auth according to Next/React</title>
            </Head>
        </>
    )
}

export default Landing