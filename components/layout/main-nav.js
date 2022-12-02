import Link from 'next/link'
import { useEffect } from 'react'

import styles from './main-nav.module.css'

const MainNav = () => {

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
                        <li>Sign In </li>
                    </Link>
                    <Link href='/profile'>
                        <li>Profile</li>
                    </Link>
                    <li>Logout</li>
                </ul>
            </nav>
        </>
    )
}

export default MainNav