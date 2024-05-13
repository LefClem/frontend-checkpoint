import Head from 'next/head'
import React from 'react'
import Header from '@/components/Header'

function Layout({children} : {children : React.ReactNode}) {
  return (
    <>
        <Head>
            <title>Frontend-checkpoint</title>
            <meta name="description" content="frontend-checkpoint" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <main className='main-content'>
            {children}
        </main>
    </>
    )
}

export default Layout