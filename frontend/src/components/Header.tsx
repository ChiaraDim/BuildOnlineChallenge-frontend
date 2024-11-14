import React from 'react'

const Header = () => {
  return (
    <header className="absolute left-[2.5%] right-[2.5%] top-[5.08%] bg-[#FBEEFF] rounded-[30px] h-[80px] flex items-center justify-between px-8">
      {/* Logo */}
      <div className="text-xl font-bold text-gray-800">BuildOnline</div>

      {/* Navigation Links */}
      <nav className="flex items-center space-x-10">
        <a
          href="#contacts"
          className="text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-black font-medium text-lg"
        >
          Contacts
        </a>
        <a
          href="#notes"
          className="text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-black font-medium text-lg"
        >
          Notes
        </a>
        <a href="#login" className="text-black font-medium text-lg">
          Log in
        </a>
      </nav>

      {/* Sign in Button */}
      <button
        className="bg-[#9378FF] text-white font-medium text-lg rounded-full px-6 py-2 shadow-md transition hover:bg-purple-700"
        style={{
          width: '117px',
          height: '49px',
        }}
      >
        Sign in
      </button>
    </header>
  )
}

export default Header
