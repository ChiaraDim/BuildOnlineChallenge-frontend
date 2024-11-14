const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-6">
      <h1 className="text-4xl font-heading font-bold text-gray-800">
        Welcome to Your Contact Manager
      </h1>
      <p className="mt-4 text-lg text-gray-600">
        Manage all your contacts in one place
      </p>
      <button className="mt-8 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-blue-700">
        Get Started
      </button>
    </div>
  )
}

export default Home
