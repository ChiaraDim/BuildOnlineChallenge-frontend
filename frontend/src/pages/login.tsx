import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { login, selectAuth } from '../store/slices/authSlice'
import { AppDispatch } from '../store'
import { useRouter } from 'next/router'

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold mb-6">Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="w-80 bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Field
                name="email"
                type="email"
                className="w-full p-2 border rounded mt-1"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Field
                name="password"
                type="password"
                className="w-full p-2 border rounded mt-1"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
            {auth.error && (
              <div className="text-red-500 text-center mt-4">{auth.error}</div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Login

// pages/login.tsx
/*import React from 'react'

const Login = () => {
  return <div>Login Page</div>
}

export default Login
*/
