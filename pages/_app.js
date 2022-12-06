import { SessionProvider } from "next-auth/react"
import Head from 'next/head'

import '../styles/globals.css'
import Layout from '../components/layout/layout'

function MyApp(
  { Component,
    pageProps: {session, ...pageProps}
  }
  ) {

  return (
    <>
      <SessionProvider session={session} refetchInterval={5 * 60}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>

      <Head>
        <link rel='icon' href='/images/icons8-locked-with-key-48.png' type='image/x-icon' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        />
      </Head>
    </>
  )
   
}

export default MyApp
