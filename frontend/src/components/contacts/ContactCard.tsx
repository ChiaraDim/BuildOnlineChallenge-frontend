import { useRouter } from 'next/router';
import Image from 'next/image';

interface ContactCardProps {
  name: string;
  email: string;
  profileImage?: string;
  message: string;
}

const ContactCard: React.FC<ContactCardProps> = ({ name, email, profileImage, message }) => {
  const router = useRouter();

  const handleArrowClick  = () => {
    router.push(`/contacts/${email}`);
  };
  
  return (
    <div className='bg-[#FBEAFF] p-6 rounded-[30px] shadow-md flex items-center'>
      <img
        src={profileImage || '/default-avatar.png'}
        alt={name}
        className='w-14 h-14 rounded-full object-cover mr-4'
      />
      <div>
        <h2 className='font-display font-bold text-[20px] leading-[26px] text-black'>{name}</h2>
        <p className='text-sm text-gray-500 mt-2'>{message}</p>
      </div>
      <span className='ml-auto mr-6 cursor-pointer' onClick={handleArrowClick}>
        <Image
          src='/arrowIcon.svg'
          alt='Arrow icon'
          width={9}
          height={6}
          className='text-[#FBEEFF]'
        />
      </span>
    </div>
  );
};

export default ContactCard;
