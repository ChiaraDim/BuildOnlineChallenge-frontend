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
  return data.contacts;
};

export const getContactByEmail = async (email: string): Promise<Contact> => {
  const { data } = await axiosInstance.get(`/api/contacts/${email}`);
  return data.contact;
};

export const addContact = async (contact: Contact): Promise<void> => {
  const { data } = await axiosInstance.post('/api/contacts', contact);
};

export const updateContact = async (id: number , contact: Contact): Promise<void> => {
  const { data } = await axiosInstance.put(`/api/contacts/${id}`, contact);
};