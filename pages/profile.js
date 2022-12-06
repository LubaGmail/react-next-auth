import Head from 'next/head'
import { getSession } from 'next-auth/react';

import UserProfile from '../components/profile/user-profile'

const ProfilePage = () => {
  return (
    <>
      <UserProfile />

      <Head>
        <title>Profile Page</title>
        <meta
          name='Change password'
          content='You can change your password here'
        />
      </Head>
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })
  
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  }

  return {
    props: session
  }

}

export default ProfilePage

