import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import Button from '../Base/Button'

type FormData = {
  email: string
}

function LoginForm() {
  const { push } = useRouter()

  const { mutate, isLoading } = useMutation({
    mutationFn: (user: FormData) =>
      axios.get(
        `https://sweet-icons-buy-103-165-155-71.loca.lt/users?email=${user.email}`
      ),
    onSuccess: (response) => {
      const { data } = response
      const token = data[0].token

      alert('Successfully logged in')
      setCookie('token', token)
      push('/products')
    },
  })

  const { register, handleSubmit } = useForm<FormData>()

  const onSubmit = handleSubmit((data) => mutate(data))

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-10 text-center ">
        {isLoading ? 'Please wait' : 'Please input required data'}
      </div>
      <div className="mb-5 flex justify-between">
        <label
          htmlFor="email"
          className="text-xl font-semibold"
        >
          Input your email
        </label>
        <input
          {...register('email', { required: true })}
          id="email"
          className="h-10 w-96 rounded border border-purple-600 p-2 outline-none"
        ></input>
      </div>

      <div className="text-center">
        <Button
          className="w-full"
          type="submit"
        >
          Submit
        </Button>
      </div>
    </form>
  )
}

export default LoginForm
