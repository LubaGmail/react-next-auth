import { useSession, getSession } from 'next-auth/react'

import styles from './landing.module.css'

const Landing = () => {
    const { data: session, status } = useSession()
    return (
        <div className={styles.landing}>
            <h2>Welcome On Board</h2>
            <p>
                Session: {JSON.stringify(session)} | Status: {status}
            </p>
        </div>
    )
}

export default Landing