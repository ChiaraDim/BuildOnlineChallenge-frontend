import React from 'react'
import Header from '../components/Header'

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-16 bg-white">
      <Header />
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Welcome</h1>
        <form className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="john@doe.com"
            className="w-72 px-4 py-3 border border-gray-300 rounded-lg bg-purple-100 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="password"
            placeholder="********"
            className="w-72 px-4 py-3 border border-gray-300 rounded-lg bg-purple-100 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button className="w-72 py-3 bg-purple-500 text-white rounded-full shadow-md transition transform hover:bg-purple-600">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Home
