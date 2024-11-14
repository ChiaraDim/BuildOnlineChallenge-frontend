import React from 'react'

const Contacts: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Contacts</h1>
      <p className="text-lg text-gray-600">
        Here you can view and manage all your contacts.
      </p>
      {/* You can add the actual contacts management functionality here later */}
    </div>
  )
}

export default Contacts
