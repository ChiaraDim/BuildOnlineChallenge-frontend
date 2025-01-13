import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/logo.svg';
import BaseButton from './shared/baseButton';

const Header = () => {
  return (
    <div className='w-[95%] max-w-[1440px] bg-[#FBEEFF] rounded-[30px] px-10 py-4 mx-auto mt-12'>
      <div className='flex justify-between items-center'>
        {/* Logo */}
        <div className='flex items-center gap-3'>
          <Image src={logo} alt="BuildOnline Logo" width={120} height={40} />
        </div>

        {/* Navigation Links */}
        <nav className='flex gap-24'>
          <Link href='/contacts'>
            <span className='text-lg font-medium bg-gradient-to-r from-[#3A3A3A] to-black bg-clip-text text-transparent leading-[40px] cursor-pointer'>
              Contacts
            </span>
          </Link>
          <Link href='/contacts'>
            <span className='text-lg font-medium bg-gradient-to-r from-[#3A3A3A] to-black bg-clip-text text-transparent leading-[40px] cursor-pointer'>
              Notes
            </span>
          </Link>
        </nav>

        {/* Auth Section (Log In + Sign In Button) */}
        <div className='flex items-center gap-12'>
          <span className='text-lg font-medium text-black leading-[40px] cursor-pointer'>
            Log In
          </span>
          <BaseButton size="sm" variant="primary">Sign In</BaseButton>
        </div>
      </div>
    </div>
  );
};

export default Header;
