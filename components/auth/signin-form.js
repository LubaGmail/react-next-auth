import { useRef, useState } from 'react'
import { signIn } from "next-auth/react"

import styles from './auth-form.module.css'

const SigninForm = (props) => {
    const emailRef = useRef()
    const passRef = useRef()
    const [result, setResult] = useState()

    const clearForm = () => {
        emailRef.current.value = ''
        passRef.current.value = ''
    }
    const clearMessages = () => {
        setResult({})
    }

    const handleSubmit = async(event) => {
        event.preventDefault()
        const obj = {
            email: emailRef.current.value.trim(),
            pass: passRef.current.value.trim(),
        }
        const result = await signIn('credentials', {
            redirect: false,        // stary on the
            email: obj.email,
            pass: obj.pass,
        });

        setResult({
            statusCode: result.status,
            appStatus: result.ok,
            error: result.error,
        })

        if (result.ok) {
            clearForm()
        }
    }

    return (
        <>
           
            <form className={styles.auth} onSubmit={handleSubmit}>
                <h2>Sign In</h2>
                <p onClick={clearMessages}>
                    Result: {JSON.stringify(result)}
                </p>
                <div className={styles.control}>
                    <label htmlFor='email'>Your Email: </label>
                    <input type='email' id='email' name='email' required minLength="5" maxLength="20"
                        ref={emailRef} 
                    />
                </div>

                <div className={styles.control}>
                    <label htmlFor='pass'>Yout Password: </label>
                    <input type='password' id='pass' name='pass' required minLength="3" maxLength="20"
                        ref={passRef}
                    />
                </div>
             
                <div className={styles.actions}>
                    <button type='submit'>Submit</button>
                    <button type='reset'>Clear</button>
                </div>
            </form>

            <div className={styles.switcher}>
                <button onClick={props.toSignup}>Create a new account</button>
            </div>
     
        </>
    )
}

export default SigninForm