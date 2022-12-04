import {useState} from 'react'

import UserForm from './user-form'

const USER_API = '/api/users/change-pass'

const UserProfile = () => {
    const [result, setResult] = useState({})

    const onChangePass = async(obj) => {
        
        const response = await fetch(USER_API, {
            method: 'PATCH',
            body: JSON.stringify(obj),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
        const data = await response.json()
        
        setResult({
            statusCode: response.status,
            appStatus: data.appStatus,
            detail: data.detail
        })

    }

    return (
        <section className='center'>
            Result: {JSON.stringify(result)}
            <UserForm onChangePass={onChangePass} parentToChild={result}  />
        </section>
    )
}

export default UserProfile