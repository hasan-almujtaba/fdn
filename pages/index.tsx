import LoginForm from '@/components/LoginForm'
import Default from '@/layouts/Default'
import { NextPageWithLayout } from '@/types/layout'
import Head from 'next/head'
import React, { ReactElement } from 'react'

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <div className="mx-auto max-w-3xl px-5 py-20 lg:px-0">
        <h1 className="mb-40 text-center text-3xl font-medium lg:text-5xl">
          Welcome to{' '}
          <a
            href="https://github.com/hasan-almujtaba/next-starter"
            className="bg-gradient-to-r from-blue-600 to-purple-400 bg-clip-text text-transparent"
          >
            Female Daily
          </a>
          !
        </h1>

        <LoginForm />
      </div>
    </>
  )
}

Home.getLayout = (page: ReactElement) => {
  return <Default>{page}</Default>
}

export default Home
