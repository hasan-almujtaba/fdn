import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../Base/Button'

type FormData = {
  product_name: string
}

type Product = {
  memory: string
  image: string
  id: number
} & FormData

const ProductTable = () => {
  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await axios.get('/api/test')

      return data.data as Product[]
    },
  })

  const [paginatedData, setPaginatedData] = useState<Product[]>([])
  const [page, setPage] = useState(1)
  const [showDialog, setShowDialog] = useState(false)
  const [dialogData, setDialogData] = useState<Product>()

  useEffect(() => {
    if (isSuccess) {
      setPaginatedData(() =>
        data.filter((item) => {
          if (page === 1) {
            return item.id < 10
          }

          return item.id > 10
        })
      )
    }
  }, [page, data]) // eslint-disable-line react-hooks/exhaustive-deps

  const { register, handleSubmit } = useForm<FormData>()

  const onSubmit = handleSubmit((data) => console.log(data))

  return (
    <div>
      <div className="mb-5 text-center text-blue-700">
        {isLoading ? 'Fetching Products' : 'Product Stocked'}
      </div>

      <div className="flex justify-between">
        <form onSubmit={onSubmit}>
          <input
            {...register('product_name', { required: true })}
            id="email"
            className="h-10 w-96 rounded border border-purple-600 p-2 outline-none"
            placeholder="Search product"
          ></input>
        </form>

        <Button>Add New Product</Button>
      </div>

      <div className="mt-5">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Status Product</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData!.map((item, index) => (
              <tr key={index}>
                <td>{item.product_name}</td>
                <td>{item.memory}</td>
                <td className="flex gap-x-3">
                  <Button
                    onClick={() => {
                      setShowDialog(true)
                      setDialogData(item)
                    }}
                  >
                    View
                  </Button>
                  <Button>Edit</Button>
                  <Button>Delete</Button>
                </td>
              </tr>
            ))}

            <div className="mt-10 flex gap-x-3 ">
              <Button onClick={() => setPage(1)}>Prev</Button>
              <Button onClick={() => setPage(2)}>Next</Button>
            </div>
          </tbody>
        </table>
      </div>

      {showDialog && (
        <div
          className="fixed inset-0 grid place-content-center bg-black/50"
          onClick={() => setShowDialog(false)}
        >
          <div className="h-56 w-64 rounded bg-white">
            <h1>{dialogData?.product_name}</h1>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductTable
