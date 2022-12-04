import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials"

import { connectDb, findRecord } from '../../../lib/db'
import { validatePass } from '../../../lib/auth'

export default NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        jwt: true,
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                const client = await connectDb()
                if (!client) {
                    throw new Error('Failed connect to dB')
                }

                const user = await findRecord(client, 'user_db', 'users', { email: credentials.email })
                if (!user) {
                    if (client) client.close()
                    throw new Error('User is not valid')
                }

                if (! await validatePass (
                    credentials.pass,
                    user.pass
                )) {
                    if (client) client.close()
                    throw new Error('Entered password is not valid.  Please try again!')
                }

                if (client) client.close()

                return { email: user.email }
            }
        })
    ]
})