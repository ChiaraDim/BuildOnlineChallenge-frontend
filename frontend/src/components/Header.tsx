import Link from 'next/link';

const Header = () => {
  return (
    <div className='w-[95%] max-w-[1440px] bg-[#FBEEFF] rounded-[30px] px-10 py-6 shadow-lg mx-auto mt-4'>
      <div className='flex justify-between items-center'>
        {/* Logo */}
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 bg-gray-300 rounded-full' />
          <span className='text-2xl font-bold bg-gradient-to-r from-gray-700 to-black bg-clip-text text-transparent'>
            BuildOnline
          </span>
        </div>

        {/* Navigation Links */}
        <nav className='flex gap-6'>
          <Link href='/contacts'>
            <span className='text-lg font-medium bg-gradient-to-r from-[#3A3A3A] to-black bg-clip-text text-transparent leading-[40px] cursor-pointer'>
              Contacts
            </span>
          </Link>
          <Link href='/notes'>
            <span className='text-lg font-medium bg-gradient-to-r from-[#3A3A3A] to-black bg-clip-text text-transparent leading-[40px] cursor-pointer'>
              Notes
            </span>
          </Link>
        </nav>

        {/* Log In Text */}
        <span className='text-lg font-medium text-black leading-[40px] cursor-pointer'>
          Log In
        </span>

        {/* Sign In Button */}
        <button className='bg-[#9378FF] text-white px-6 py-[10px] w-[117px] h-[49px] rounded-[30px] text-[16px] font-medium leading-[40px] hover:bg-purple-600'>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Header;
