import { getSession } from 'next-auth/react'

import { connectDb, findRecord, updateRecord } from '../../../lib/db'
import { hashPass, validatePass } from '../../../lib/auth'

const validInput = (email, oldPass, newPass, repeatNewPass) => {
    if (newPass !== repeatNewPass || oldPass === newPass || newPass.length < 3) {
        return false
    }

    return true
}

async function handler(req, res) {
    if (req.method !== 'PATCH') {
        res.status(403).json({ appStatus: 'error', detail: 'Invalid HTTP Request' })
        throw new Error('403: Unsupported HTTP Request')
    }

    const session = await getSession({ req: req })
    if (!session || !session?.user ) {
        res.status(401).json({ appStatus: 'error', detail: 'Unauthorized user' })
        throw new Error('401: Unauthorized User')
    }

    const email = session.user.email;
    const oldPass = req.body.oldPass
    const newPass = req.body.newPass
    const repeatNewPass = req.body.repeatNewPass

    if (!validInput(email, oldPass, newPass, repeatNewPass) ) {
        res.status(422).json({ appStatus: 'error', detail: 'Invalid input received at the server.' })
        throw new Error('422:  Invalid input received at the server.  Please call...')
    }

    // get db connection
    let client 
    try {
        client = await connectDb()
    } catch (error) {
        res.status(500).json({ appStatus: 'error', detail: 'Could not connect to the database.' })
        throw new Error('500: Could not connect to the database.')
    }
  
    let user
    try {
        user = await findRecord(client, 'user_db', 'users', {email: email})
    } catch (error) {
        if (client) client.close()
        res.status(500).json({ appStatus: 'error', detail: error.toString() })
        throw new Error(error.toString() )
    }

    // is user in db?
    if (!user) {
        res.status(500).json({ appStatus: 'error', detail: 'The user is not in the database.' })
        throw new Error('The user is not in the database.')
    }

    // is the oldPass valid?
    const dbOldPass = user.pass
    if (! await validatePass(oldPass, dbOldPass) ) {
        if (client) client.close()
        res.status(422).json({ appStatus: 'error', detail: 'Old pass is not valid. Please try again!' })
        throw new Error('Old pass is not valid.')
    }

    const hashedNewPass = await hashPass(newPass)
    let result
    try {
        result = await updateRecord(client, 'user_db', 'users', { email: email }, { $set: { pass: hashedNewPass } })
    } catch (error) {
        if (client) client.close()
        res.status(500).json({ appStatus: 'error', detail: error.toString() })
        throw new Error(error.toString())
    }

    if (result.modifiedCount !== 1) {
        res.status(500).json({ appStatus: 'error', detail: 'Invalid entry in the database ' + user.email })
        if (client) client.close()
        throw new Error('Invalid entry in the database ' + user.email )
    }

    if (client) client.close()
    res.status(200).json({ appStatus: 'success', detail: 'Yout password has been changed.'})
}

export default handler
