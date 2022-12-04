import Head from 'next/head'
import Image from 'next/image'
import { getSession } from 'next-auth/react';

import UserProfile from '../components/profile/user-profile'

const ProfilePage = () => {
  return (

    <>
      <UserProfile />
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

