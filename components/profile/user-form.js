import { useRef, useState } from 'react'

import styles from './user-form.module.css'

const UserForm = ({ onChangePass, parentToChild }) => {
    const oldPassRef = useRef()
    const newPassRef = useRef()
    const repeatNewPassRef = useRef()
    const [error, setError] = useState()

    const handleSubmit = (event) => {
        event.preventDefault()
        setError(null)
        const obj = {
            oldPass: oldPassRef.current.value.trim(),
            newPass: newPassRef.current.value.trim(),
            repeatNewPass: repeatNewPassRef.current.value.trim()
        }

        if (obj.newPass !== obj.repeatNewPass) {
            setError('New password and Repeat new password must match.')
            return
        }
        if (obj.newPass === obj.oldPass) {
            setError('New password should not be the same as the old password.')
            return
        }

        onChangePass(obj)
       }
    const handleClear = () => {
        oldPassRef.current.value = ''
        newPassRef.current.value = ''
        repeatNewPassRef.current.value = ''
    }

    return (
        <>
            <section  className={styles.container}>
    
                <h2>Change Password</h2>

                {error && <p>{error}</p>}

                {/* parentToChild: {JSON.stringify(parentToChild.statusCode)} */}
               
                {
                    parentToChild.statusCode === 200 ? handleClear() : null
                }

                <form onSubmit={handleSubmit} onReset={handleClear}>
                    <div className={styles.control}>
                        <label htmlFor='oldPass'>Old Password</label>
                        <input type='password' id='pass' name='pass'
                            required 
                            ref={oldPassRef}
                        />
                    </div>
                    <div className={styles.control} >
                        <label htmlFor='newPass'>New Password</label>
                        <input type='password' id='newPass' name='newPass' 
                            required minLength={3} maxLength={20}
                            ref={newPassRef}
                        />
                    </div>
                    <div className={styles.control} >
                        <label htmlFor='repeatNewPass'>Repeat New Password</label>
                        <input type='password' id='repeatNewPass' name='repeatNewPass' 
                            required minLength={3} maxLength={20}
                            ref={repeatNewPassRef}
                        />
                    </div>
                    <div className={styles.actions }>
                        <button>Submit</button>
                        <button type='reset'>Clear</button>
                    </div>

                </form>
                
            </section>
        </>
    )
}

export default UserForm
