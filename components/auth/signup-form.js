import { useRef, useState } from 'react'

import styles from './auth-form.module.css'

const SignupForm = (props) => {
    const emailRef = useRef()
    const passRef = useRef()
    const repeatPassRef = useRef()

    const SIGNUP_API = '/api/auth/signup'

    const [result, setResult] = useState()
    const [isError, setIsError] = useState()

    const clearForm = () => {
        emailRef.current.value = ''
        passRef.current.value = ''
        repeatPassRef.current.value = ''
    }
    const clearMessages = () => {
        setResult({})
    }

    const postRecord = async (obj) => {
        const response = await fetch(SIGNUP_API, {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application-json'
            }
        })
        const data = await response.json()
        if (response.status === 201) {
            clearForm()
        } 

        setResult({
            statusCode: response.status,
            appStatus: data.appStatus,
            detail: data.detail
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (passRef.current.value.trim() !== repeatPassRef.current.value.trim()) {
            setResult({
                statusCode: 422,
                appStatus: 'error',
                detail: 'Password and Repeat Password should be equal.'
            })
            
            setIsError(true)
            return
        }
        const obj = {
            email: emailRef.current.value.trim(),
            pass: passRef.current.value.trim(),
            repeatPass: repeatPassRef.current.value.trim()
        }
        postRecord(obj)
    }

    return (
        <>
           
            <form onSubmit={handleSubmit} className={styles.auth}>
                <h2>Create an account</h2>
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
                    <label htmlFor='pass'>Create Password: </label>
                    <input type='password' id='pass' name='pass' required minLength="3" maxLength="20"
                        ref={passRef}
                    />
                </div>

                <div className={styles.control}>
                    <label htmlFor='repeatPass'>Repeat Password: </label>
                    <input type='password' id='repeatPass' name='repeatPass' required  minLength="3" maxLength="20"
                        ref={repeatPassRef}
                    />
                </div>
             
                <div className={styles.actions}>
                    <button type='submit'>Submit</button>
                    <button type='reset'>Clear</button>
                </div>
            </form>

            <div className={styles.switcher}>
                <button onClick={props.toSignin}>Sign In to your account</button>
            </div>
     
        </>
    )
}

export default SignupForm