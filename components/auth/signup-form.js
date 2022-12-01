import {useRef} from 'react'

const SignupForm = (props) => {
    const emailRef = useRef()
    const passRef = useRef()
    const repeatPassRef = useRef()

    const handleSubmit = (event) => {
        event.preventDefault()
        const obj = {
            email: emailRef.current.value,
            pass: passRef.current.value,
            repeatPass: repeatPassRef.current.value
    
        }
        console.log('obj', obj)
    }

    return (
        <>
           
            <form onSubmit={handleSubmit}>
                <h2>Create an account</h2>
                <div>
                    <label htmlFor='email'>Your Email: </label>
                    <input type='email' id='email' name='email' required minlength="5" maxlength="20"
                        ref={emailRef} 
                    />
                </div>

                <div>
                    <label htmlFor='pass'>Create Password: </label>
                    <input type='password' id='pass' name='pass' required minlength="3" maxlength="20"
                        ref={passRef}
                    />
                </div>

                <div>
                    <label htmlFor='repeatPass'>Repeat Password: </label>
                    <input type='password' id='repeatPass' name='repeatPass' required  minlength="3" maxlength="20"
                        ref={repeatPassRef}
                    />
                </div>
             
                <div>
                    <button type='submit'>Submit</button>
                    <button type='reset'>Clear</button>
                </div>
            </form>

            <div>
                <button onClick={props.toSignin}>Sign In to your account</button>
            </div>
     
        </>
    )
}

export default SignupForm