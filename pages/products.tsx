import ProductTable from '@/components/ProductTable'
import Default from '@/layouts/Default'
import { NextPageWithLayout } from '@/types/layout'
import Head from 'next/head'
import React from 'react'

const Products: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Products</title>
      </Head>

      <div className="mx-auto max-w-3xl px-5 py-20 lg:px-0">
        <h1 className="mb-5 text-center text-5xl font-bold">Products</h1>

        <ProductTable />
      </div>
    </>
  )
}

Products.getLayout = (page) => {
  return <Default>{page}</Default>
}

export default Products
