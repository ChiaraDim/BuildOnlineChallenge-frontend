import axiosInstance from './axiosInstance';

interface Contact {
    id: number;
    name: string;
    address: string;
    email: string;
    phoneNumber: string;
    profileImage?: string;
    }

export const getContacts = async (): Promise<Contact[]> => {
  const { data } = await axiosInstance.get('/api/contacts');
  console.log(data.contacts);
  return data.contacts;
};
