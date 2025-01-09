import Link from 'next/link';
import Image from 'next/image';

const Header = () => (
  <header className="bg-purple-100 p-6 flex justify-between items-center shadow-lg">
    <div className="flex items-center">
      <Image src="/logo.svg" alt="BuildOnline Logo" width={40} height={40} />
      <span className="ml-4 text-3xl font-extrabold text-gray-800">BuildOnline</span>
    </div>
    <nav className="flex gap-8">
      <Link href="/contacts" className="text-gray-700 hover:text-gray-900 font-medium text-lg">
        Contacts
      </Link>
      <Link href="/notes" className="text-gray-700 hover:text-gray-900 font-medium text-lg">
        Notes
      </Link>
      <Link href="/login">
        <button className="bg-gradient-to-r from-purple-500 to-purple-700 text-white py-2 px-6 rounded-full font-semibold hover:shadow-xl">
          Sign In
        </button>
      </Link>
    </nav>
  </header>
);

export default Header;
