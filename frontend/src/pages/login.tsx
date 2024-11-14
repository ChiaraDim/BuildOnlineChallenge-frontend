import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { login, selectAuth } from '../store/slices/authSlice'
import { AppDispatch } from '../store'
import { useRouter } from 'next/router'
import Button from '../components/Button'

const Login = () => {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const auth = useSelector(selectAuth)

  const initialValues = { email: '', password: '' }
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Required'),
  })

  const handleSubmit = async (values: typeof initialValues) => {
    const result = await dispatch(login(values))
    if (login.fulfilled.match(result)) {
      router.push('/contacts')
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
          Login
        </h2>
        <form className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="pt-4">
            <Button text="Login" onClick={() => {}} />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
