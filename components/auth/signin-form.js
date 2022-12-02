import { useRef, useState } from 'react'

import styles from './auth-form.module.css'

const SigninForm = (props) => {
    const emailRef = useRef()
    const passRef = useRef()

    const SIGNUP_API = '/api/auth/signup'

    const [result, setResult] = useState()

    const clearForm = () => {
        emailRef.current.value = ''
        passRef.current.value = ''
    }
    const clearMessages = () => {
        setResult({})
    }

    const postRecord = async (obj) => {
        const response = await fetch(SIGNUP_API, {
            method: 'PATCH',
            body: JSON.stringify(obj),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application-json'
            }
        })
        let res = {}
        res.statusCode = response.status
        const data = await response.json()
        res.appStatus = data.appStatus
        res.detail = data.detail
        setResult(res)
        if (response.status === 201) {
            clearForm()
        } 
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const obj = {
            email: emailRef.current.value.trim(),
            pass: passRef.current.value.trim(),
        }
        postRecord(obj)
    }

    return (
        <>
           
            <form className={styles.auth} onSubmit={handleSubmit}>
                <h2>Create an account</h2>
                <p onClick={clearMessages}>
                    Result: {JSON.stringify(result)}
                </p>
                <div className={styles.control}>
                    <label htmlFor='email'>Your Email: </label>
                    <input type='email' id='email' name='email' required minlength="5" maxlength="20"
                        ref={emailRef} 
                    />
                </div>

                <div className={styles.control}>
                    <label htmlFor='pass'>Yout Password: </label>
                    <input type='password' id='pass' name='pass' required minlength="3" maxlength="20"
                        ref={passRef}
                    />
                </div>
             
                <div className={styles.actions}>
                    <button type='submit'>Submit</button>
                    <button type='reset'>Clear</button>
                </div>
            </form>

            <div className={styles.switcher}>
                <button onClick={props.toSignin}>Create a new account</button>
            </div>
     
        </>
    )
}

export default SigninForm