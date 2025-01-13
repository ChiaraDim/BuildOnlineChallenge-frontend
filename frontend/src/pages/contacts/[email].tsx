import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getContactByEmail } from '../../api/contacts';
import { sampleRoles } from 'utils/roles';

const ContactDetails: React.FC = () => {
  const router = useRouter();
  const { email } = router.query;
  const [contact, setContact] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [randomRole, setRandomRole] = useState<string>('');

  useEffect(() => {
    if (email) {
      (async () => {
        try {
          const contactData = await getContactByEmail(email as string);
          setContact(contactData);

          const randomIndex = Math.floor(Math.random() * sampleRoles.length);
          setRandomRole(sampleRoles[randomIndex]);
        } catch (error: any) {
          console.error('Error fetching contact:', error);
          if (error.response?.status === 404) {
            alert('Contact not found. Please verify the email.');
          } else if (error.response?.status === 500) {
            alert('Server error. Please try again later.');
          } else {
            alert('An unexpected error occurred. Please try again.');
          }
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [email]);

  if (loading) {
    return <p className='text-center text-lg'>Loading contact details...</p>;
  }

  if (!contact) {
    return <p className='text-center text-lg text-red-500'>Contact not found.</p>;
  }

  return (
    <div className='w-full max-w-3xl mx-auto p-12 mt-8'>
      <div className='bg-[#F8F8F8] p-12 rounded-[30px] relative'>
        {/* Edit Icon */}
        <button
          onClick={() => router.push(`/contacts/${email}/edit`)}
          className='absolute top-6 right-6 p-2 hover:bg-gray-200 rounded-full'
        >
          <Image
            src='/editPencil.svg' 
            alt='Edit Icon'
            width={24}
            height={24}
            className='w-6 h-6'
          />
        </button>

        {/* Profile Picture */}
        <div className='flex justify-center'>
          <img
            src={contact.profileImage || '/default-avatar.png'}
            alt={`${contact.name}'s profile`}
            className='w-48 h-48 rounded-full border-4 border-[#9378FF] object-cover'
          />
        </div>

        {/* Contact Name and Role */}
        <div className='text-center mt-9'>
          <h1 className='text-3xl font-bold'>{contact.name || 'No Name Provided'}</h1>
          <p className='text-lg text-gray-600 mt-4'>{randomRole}</p> {/* You can make this dynamic */}
        </div>

        {/* Contact Details */}
        <div className='mt-6 space-y-4 text-center'>
          <div>
            <h3 className='font-semibold text-gray 900 p-2'>Address</h3>
            <p className='text-gray-500'>{contact.address || 'No Address Provided'}</p>
          </div>
          <div>
            <h3 className='font-semibold text-gray-900 p-2'>Phone</h3>
            <p className='text-gray-500'>{contact.phoneNumber || 'No Phone Number'}</p>
          </div>
          <div>
            <h3 className='font-semibold text-gray-900 p-2'>Email</h3>
            <p className='text-gray-500'>{contact.email || 'No Email Provided'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
