import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react';

import styles from './main-nav.module.css'

const MainNav = () => {
    const { data: session, status } = useSession()
    
    const handleLogout = () => {
        signOut();
    }

    return (
         <>
            <nav className={styles.nav}>
                <Link href='/'>
                    <div className={styles.logo}>
                        LOGO
                    </div>
                </Link>
                <ul className={styles.menuItems}>


                    <Link href={{
                        pathname: "/auth",
                        query: { op: 'signin' }
                    }}>
                        <li>Sign In / Sign Up </li>
                    </Link>

                    {session && (
                        <Link href='/profile'>
                            <li>Profile</li>
                        </Link>
                    )}

                    {session && (
                        <li onClick={handleLogout}>Logout</li>
                    )}

                </ul>
            </nav>
        </>
    )
}

export default MainNav