import { useState, useEffect } from 'react'
import Head from 'next/head'

import SigninForm from "../components/auth/signin-form"
import SignupForm from '../components/auth/signup-form'

const AuthPage = () => {
    const [op, setOp] = useState('signin')

    const toSignup = () => {    
        setOp('signup')   
    }
    const toSignin = () => {    
        setOp('signin')   
    }

    let title
    op === 'signin' ? title = 'Sign In into your account' : title = 'Sign Up to our services'

    return (
        <>
            <h2 className="center">
                {
                    (op === 'signin') && (<SigninForm toSignup={toSignup} /> )
                }
                {
                    (op === 'signup') && (<SignupForm toSignin={toSignin} /> )
                }
            </h2>
            <Head>
                <title>{title}</title>
            </Head>
        </>
    )
}

export default AuthPage