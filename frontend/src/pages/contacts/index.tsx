import React, { useEffect, useState } from 'react';
import { getContacts } from '../../api/contacts';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { sampleMessages } from 'utils/messages';
import ContactCard from '../../components/contacts/ContactCard';
import { PlusIcon } from '@heroicons/react/solid';

interface Contact {
  name: string;
  address: string;
  email: string;
  phoneNumber: string;
  profileImage?: string;
}

const ContactsPage: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const token = useSelector((state: RootState) => state.auth.token);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchContacts = async () => {
      setLoading(true);
      try {
        const contactsData = await getContacts();
        setContacts(contactsData);
      } catch (error) {
        console.error('Failed to fetch contacts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [token, router]);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddContactClick = () => {
    router.push('/addContact');
  };

  return (
    <div className='w-[95%] max-w-[1440px] mx-auto px-4 py-8 pt-32'>
      <div className='space-y-14'>
        {/* Title and Plus Icon */}
        <div className='flex justify-between items-center'>
          <h1 className='text-4xl font-bold'>Contacts</h1>
          <button
            onClick={handleAddContactClick}
            title='Add Contact'
          >
            <PlusIcon className='h-6 w-24 text-[#000000]' />
          </button>
        </div>

        {/* Search Bar */}
        <div className='relative w-full max-w-[1368px] mx-auto'>
          <input
            type='text'
            placeholder='| '
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='input-search'
          />
          <div className='absolute right-10 top-[12px] w-5 h-5'>
            <Image
              src='/searchIcon.svg'
              alt='Search icon'
              width={24}
              height={24}
              className='text-[#99879D]'
            />
          </div>
        </div>

        {/* Contacts List */}
        {loading ? (
          <p>Loading contacts...</p>
        ) : filteredContacts.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {filteredContacts.map((contact) => (
              <ContactCard
                key={contact.email}
                name={contact.name}
                email={contact.email}
                profileImage={contact.profileImage}
                message={sampleMessages[Math.floor(Math.random() * sampleMessages.length)]}
              />
            ))}
          </div>
        ) : (
          <p>No contacts found.</p>
        )}
      </div>
    </div>
  );
};

export default ContactsPage;
