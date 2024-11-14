import React from 'react'

interface ButtonProps {
  text: string
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => (
  <button
    onClick={onClick}
    className={`px-6 py-2 bg-blue-600 text-white font-semibold rounded-full shadow-md transition duration-200 ease-in-out transform hover:bg-blue-700 hover:scale-105`}
  >
    {text}
  </button>
)

export default Button
