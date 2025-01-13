import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import BaseInput from 'components/shared/baseInput';
import BaseButton from 'components/shared/BaseButton';
import { getContactByEmail, updateContact } from '../../../api/contacts';
import { sampleRoles } from 'utils/roles';

interface Contact {
  id: number;
  name: string;
  address: string;
  email: string;
  phoneNumber: string;
  profileImage?: string;
}

const EditContact: React.FC = () => {
  const router = useRouter();
  const { email } = router.query;
  const [contact, setContact] = useState<Contact | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [randomRole, setRandomRole] = useState<string>('');

  useEffect(() => {
    if (email) {
      (async () => {
        try {
          const contactData = await getContactByEmail(email as string);
          setContact(contactData);
          setProfileImage(contactData.profileImage || null);

          const randomIndex = Math.floor(Math.random() * sampleRoles.length);
          setRandomRole(sampleRoles[randomIndex]);
        } catch (error) {
          console.error('Error fetching contact:', error);
          alert('Could not fetch contact details.');
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [email]);

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    surname: Yup.string().required('Surname is required'),
    address: Yup.string(),
    phoneNumber: Yup.string().required('Phone number is required'),
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFieldValue('profileImage', reader.result);
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return <p className='text-center'>Loading contact details...</p>;
  }

  if (!contact) {
    return <p className='text-center text-red-500'>Contact not found.</p>;
  }

  const [firstName, surname] = contact.name.split(' ') || ['', ''];

  return (
    <div className='w-[95%] max-w-[1440px] mx-auto px-4 py-24'>

      <Formik
        initialValues={{
          firstName: firstName || '',
          surname: surname || '',
          address: contact.address || '',
          phoneNumber: contact.phoneNumber || '',
          email: contact.email || '',
          profileImage: contact.profileImage || '',
          title: randomRole || '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          const fullName = `${values.firstName} ${values.surname}`;
          const updatedContact = {
            id: contact.id,
            name: fullName,
            address: values.address,
            phoneNumber: values.phoneNumber,
            email: values.email,
            profileImage: values.profileImage,
          };

          try {
            await updateContact(contact.id, updatedContact);
            alert('Contact updated successfully!');
            router.push(`/contacts/${email}`);
          } catch (error) {
            console.error('Error updating contact:', error);
            alert('There was an error updating the contact.');
          }
        }}
      >
        {({ errors, touched, setFieldValue, isSubmitting }) => (
          <Form className='space-y-8'>
          <div className='bg-[#F8F8F8] p-10 rounded-[30px]'>

            {/* Profile Picture and Info Section */}
            <div className='flex items-center gap-12 mb-8'>
              <div className='w-36 h-36 rounded-full overflow-hidden border-4 border-[#9378FF] bg-[#F0F0F0] flex items-center justify-center'>
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt='Profile Preview'
                    className='object-cover w-full h-full'
                  />
                ) : (
                  <span className='text-[#99879D]'>No Image</span>
                )}
              </div>
        
              <div className='flex flex-col'>
                <h1 className='text-3xl font-bold text-[#120E21] leading-none'>{`${firstName} ${surname}`}</h1>
                <p className='text-lg text-[#99879D] mt-4'>{randomRole}</p>
              </div>
            </div>
        
            {/* Form Fields */}
            <div className='grid grid-cols-2 gap-8'>
              {/* First Name */}
              <div>
                <label className='block mb-2 text-lg font-bold'>First Name</label>
                <Field
                  as={BaseInput}
                  name='firstName'
                  placeholder='e.g., John'
                  className='w-full h-[56px] bg-[#FBEEFF] rounded-lg px-9 text-[#99879D]'
                />
                {touched.firstName && errors.firstName && (
                  <p className='text-red-500 text-sm'>{errors.firstName}</p>
                )}
              </div>
              
              {/* Surname */}
              <div>
                <label className='block mb-2 text-lg font-bold'>Surname</label>
                <Field
                  as={BaseInput}
                  name='surname'
                  placeholder='e.g., Doe'
                  className='w-full h-[56px] bg-[#FBEEFF] rounded-lg px-9 text-[#99879D]'
                />
                {touched.surname && errors.surname && (
                  <p className='text-red-500 text-sm'>{errors.surname}</p>
                )}
              </div>
        
              {/* Title */}
              <div>
                <label className='block mb-2 text-lg font-bold'>Title</label>
                <Field
                  as={BaseInput}
                  name='title'
                  placeholder='e.g., UX Designer'
                  className='w-full h-[56px] bg-[#FBEEFF] rounded-lg px-9 text-[#99879D]'
                  value={randomRole}
                  disabled
                />
              </div>
              
              {/* Profile Picture */}
              <div>
                <label className='block mb-2 text-lg font-bold'>Profile Picture</label>
                <div className='relative w-full max-w-[300px]'>
                  <input
                    type='file'
                    accept='image/*'
                    id='profile-upload'
                    className='hidden'
                    onChange={(e) => handleImageUpload(e, setFieldValue)}
                  />
                  <label
                    htmlFor='profile-upload'
                    className='w-full block bg-[#FBEEFF] rounded-lg px-9 py-4 h-[56px] w-[600px] flex justify-between items-center cursor-pointer'
                  >
                    <span className='text-[#99879D]'>Upload file</span>
                    <img
                      src='/uploadIcon.svg'
                      alt='Upload Icon'
                      className='w-5 h-5 text-[#99879D]'
                    />
                  </label>
                </div>
              </div>
    
            {/* Phone */}
              <div>
                <label className='block mb-2 text-lg font-bold'>Phone</label>
                <Field
                  as={BaseInput}
                  name='phoneNumber'
                  placeholder='e.g., (123) 456-7890'
                  className='w-full h-[56px] bg-[#FBEEFF] rounded-lg px-9 text-[#99879D]'
                />
                {touched.phoneNumber && errors.phoneNumber && (
                  <p className='text-red-500 text-sm'>{errors.phoneNumber}</p>
                )}
              </div>
              
              {/* Address */}
              <div>
                <label className='block mb-2 text-lg font-bold'>Address</label>
                <Field
                  as={BaseInput}
                  name='address'
                  placeholder='e.g., 123 Main St, Springfield'
                  className='w-full h-[56px] bg-[#FBEEFF] rounded-lg px-9 text-[#99879D]'
                />
                {touched.address && errors.address && (
                  <p className='text-red-500 text-sm'>{errors.address}</p>
                )}
              </div>
              
              {/* Email */}
              <div>
                <label className='block mb-2 text-lg font-bold'>Email</label>
                <Field
                  as={BaseInput}
                  name='email'
                  placeholder='e.g., john.doe@example.com'
                  className='w-full h-[56px] bg-[#FBEEFF] rounded-lg px-9 text-[#99879D]'
                  disabled
                />
              </div>
            </div>
          </div>
        
          {/* Save Button */}
          <div className='flex justify-center py-14'>
              <BaseButton size='lg' variant='primary' type='submit' disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save'}
              </BaseButton>
            </div>
        </Form>        
        )}
      </Formik>
    </div>
  );
};

export default EditContact;
