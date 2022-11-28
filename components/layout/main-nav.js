
import styles from './main-nav.module.css'

const MainNav = () => {

    return (
         <>
            <nav className={styles.header}>
                <div className={styles.logo}>
                    LOGO
                </div>
                <ul className={styles.nav}>
                    <li>Login</li>
                    <li>Profile</li>
                    <li>Logout</li>
                </ul>
            </nav>
        </>
    )
}

export default MainNav