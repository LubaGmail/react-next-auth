
import styles from './layout.module.css'
import MainNav from './main-nav'

const Layout = (props) => {

    return (
        <>
            <MainNav />
            {props.children}
        </>
    )
}

export default Layout