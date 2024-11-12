import Link from 'next/link'
import Button from '../components/Button'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
        Welcome to the Contact Management App
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        Manage all your contacts in one place.
      </p>
      <Link href="/login">
        <Button text="Login" />
      </Link>
    </div>
  )
}
