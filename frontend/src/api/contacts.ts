import axiosInstance from './axiosInstance';

interface Contact {
    name: string;
    address: string;
    email: string;
    phoneNumber: string;
    profileImage?: string;
    }

export const getContacts = async (): Promise<Contact[]> => {
  const { data } = await axiosInstance.get('/api/contacts');
  return data.contacts;
};

export const addContact = async (contact: Contact): Promise<void> => {
  console.log(contact);
  const { data } = await axiosInstance.post('/api/contacts', contact);
};
