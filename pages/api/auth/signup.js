import { connectDb, findRecord, insertRecord } from '../../../lib/db'
import { hashPass } from '../../../lib/auth'

const validate = (email, pass, repeatPass) => {
    console.log('v', email, pass, repeatPass)
    if (!email || email?.length < 5 ||
        !email?.includes('@') ||
        !pass || pass?.length < 3 ||
        !repeatPass || repeatPass?.length < 3 ||
        pass !== repeatPass )
    {
        return false;    
    }
    return true
}

const handler = async (req, res) => {
    if (req.method !== 'POST') {
        res.status(500).json(
            { appStatus: 'error', detail: 'Unhandled HTTP method.' }
        )
        throw new Error('Unhandled HTTP method')
    }

    const obj = JSON.parse(req.body)
    const email = obj.email
    const pass = obj.pass
    const repeatPass = obj.repeatPass

    if (!validate (email, pass, repeatPass)) {
        res.status(422).json(
            { appStatus: 'error', detail: 'Field validation failed.' }
        )
        throw new Error('Validation failed.')
    }

    let client;
    try {
        client = client = await connectDb()
    } catch (error) {
        res.status(500).json(
            { appStatus: 'error', detail: error.toString() }
        )
        throw new Error('Failed to connect to the database.')
    }

    // client, dbName, collName, query
    let record = await findRecord(client, 'user_db', 'users', { "email": obj.email })
    if (record) {
        res.status(422).json({ appStatus: 'error', detail: 'Email already exists. Try again!' })
        if (client) { client.close() }
        throw new Error('Email already exists.')
    }

    let hashedPass
    try {
        hashedPass  = await hashPass(pass)
    } catch (error) {
        res.status(500).json({ appStatus: 'error', detail: error.toString() })
        if (client) { client.close() }
        return
    }

    obj.pass = hashedPass
    let ret
    try {
        ret = await insertRecord(client, 'user_db', 'users', obj) 
        res.status(201).json({appStatus: 'success', detail: 'Key=' +  ret.insertedId })
    } catch (error) {
        res.status(500).json({ appStatus: 'error', detail: error.toString() })
    }

    if (client) { client.close() }

}

export default handler