import React from 'react'

interface ButtonProps {
  text: string
  onClick?: () => void
  className?: string
}

const Button: React.FC<ButtonProps> = ({ text, onClick, className }) => (
  <button
    onClick={onClick}
    className={`px-8 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 text-lg ${className}`}
  >
    {text}
  </button>
)

export default Button
