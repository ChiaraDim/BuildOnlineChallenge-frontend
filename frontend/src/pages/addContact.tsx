import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import BaseInput from 'components/shared/BaseInput';
import BaseButton from 'components/shared/BaseButton';
import { addContact } from '../api/contacts';

const AddContact: React.FC = () => {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const validationSchema = Yup.object({
    name: Yup.string().required('Full name is required'),
    address: Yup.string(),
    phoneNumber: Yup.string().required('Phone number is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
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

  return (
    <div className='w-[95%] max-w-[1440px] mx-auto px-4 py-16'>
      <h1 className='text-4xl py-16 font-bold'>Add Contact</h1>

      <Formik
        initialValues={{
          name: '',
          address: '',
          phoneNumber: '',
          email: '',
          profileImage: '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          try {
            await addContact(values); 
            alert('Contact added successfully!');
            router.push('/contacts');
          } catch (error) {
            console.error('Error creating contact:', error);
            alert('There was an error creating the contact.');
          }
        }}
      >
        {({ errors, touched, setFieldValue, isSubmitting }) => (
          <Form className='space-y-8'>
            <div className='bg-[#F8F8F8] p-10 rounded-[30px]'>
              <div className='grid grid-cols-2 gap-8'>
                <div>
                  <label className='block mb-2 text-lg text-[#120E21] font-bold text-black'>Full Name</label>
                  <Field
                    as={BaseInput}
                    name='name'
                    placeholder='e.g., John Doe'
                    className='w-full h-[56px] max-w-[755px] rounded-lg bg-[#FBEEFF] text-[#99879D] text-[16px] px-9'
                  />
                  {touched.name && errors.name && (
                    <p className='text-red-500 text-sm mt-1'>{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className='block mb-2 text-lg text-[#120E21] font-bold text-black'>Address</label>
                  <Field
                    as={BaseInput}
                    name='address'
                    placeholder='e.g., 123 Main St, Springfield'
                    className='w-full h-[56px] max-w-[755px] rounded-lg bg-[#FBEEFF] text-[#99879D] text-[16px] px-9'
                  />
                </div>

                <div>
                  <label className='block mb-2 text-lg text-[#120E21] font-bold text-black'>Email</label>
                  <Field
                    as={BaseInput}
                    name='email'
                    placeholder='e.g., john.doe@example.com'
                    className='w-full h-[56px] max-w-[755px] rounded-lg bg-[#FBEEFF] text-[#99879D] text-[16px] px-9'
                  />
                  {touched.email && errors.email && (
                    <p className='text-red-500 text-sm mt-1'>{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className='block mb-2 text-lg text-[#120E21] font-bold text-black'>Phone</label>
                  <Field
                    as={BaseInput}
                    name='phoneNumber'
                    placeholder='e.g., (123) 456-7890'
                    className='w-full h-[56px] max-w-[755px] rounded-lg bg-[#FBEEFF] text-[#99879D] text-[16px] px-9'
                  />
                  {touched.phoneNumber && errors.phoneNumber && (
                    <p className='text-red-500 text-sm mt-1'>{errors.phoneNumber}</p>
                  )}
                </div>

                <div className='col-span-2 flex flex-col items-center'>
                  <label className='block mb-4 text-lg text-[#120E21] font-bold text-black'>
                    Profile Picture
                  </label>

                  {/* Profile Picture Preview */}
                  <div className='w-32 h-32 rounded-full overflow-hidden border-4 border-[#9378FF] bg-[#F0F0F0] flex items-center justify-center mb-4'>
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

                  {/* File Upload Input */}
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
                      className='block bg-[#FBEEFF] rounded-lg px-4 py-2 h-[56px] flex justify-between items-center cursor-pointer'
                    >
                      <span className='text-[#99879D]'>Upload file</span>
                      <img
                        src='/uploadIcon.svg'
                        alt='Upload Icon'
                        className='w-6 h-6 text-[#99879D]'
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button Outside of the Card */}
            <div className='flex justify-center py-14'>
              <BaseButton size='lg' variant='primary' type='submit' disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create'}
              </BaseButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddContact;
