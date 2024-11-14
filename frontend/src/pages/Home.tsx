import React, { useState } from 'react'
import { AppDispatch } from '../store'
import { useDispatch } from 'react-redux'
import { login } from '../store/slices/authSlice'
import { useRouter } from 'next/router'
import axiosInstance from '../api/axiosInstance'
import Header from '../components/Header'

const Home = () => {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setError('')

    try {
      const response = await axiosInstance.post('/auth/login', {
        email,
        password,
      })

      if (response.status === 200) {
        dispatch(login(response.data))
        router.push('/contacts')
      }
    } catch (err: unknown) {
      setError('Invalid email or password')
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-16 bg-white">
      <Header />
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Welcome</h1>

        {/* Display error message if any */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="john@doe.com"
            className="w-72 px-4 py-3 border border-gray-300 rounded-lg bg-purple-100 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="********"
            className="w-72 px-4 py-3 border border-gray-300 rounded-lg bg-purple-100 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-72 py-3 bg-purple-500 text-white rounded-full shadow-md transition transform hover:bg-purple-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Home
