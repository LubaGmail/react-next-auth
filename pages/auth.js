import {useState, useEffect} from 'react'

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
        </>
    )
}

export default AuthPage