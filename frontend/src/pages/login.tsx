import { useRouter } from 'next/router';
import Head from 'next/head';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { loginUser } from '../api/auth';
import BaseButton from 'components/shared/BaseButton';
import BaseInput from 'components/shared/BaseInput';

const Login: React.FC = () => {
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  return (
    <>
      <Head>
        <title>Login | BuildOnline</title>
      </Head>
      <div className='flex flex-col justify-center items-center bg-white py-64 px-32'>
        <h1 className='text-center font-display font-extrabold text-[39px] leading-[100px] text-[#120E21] mb-12'>
          Welcome
        </h1>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const { token } = await loginUser(values.email, values.password);
              localStorage.setItem('auth_token', token);
              router.push('/contacts');
            } catch (error) {
              alert('Invalid login credentials');
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className='w-full max-w-[800px] space-y-8'>
              <div className='space-y-8'>
                <div>
                  <Field
                    as={BaseInput}
                    name='email'
                    type='email'
                    placeholder='john@doe.com'
                    className='w-full h-[56px] max-w-[755px] rounded-lg bg-[#FBEEFF] text-[#99879D] text-[16px] px-9'
                  />
                  {touched.email && errors.email && (
                    <div className='text-red-500 text-sm mt-1'>{errors.email}</div>
                  )}
                </div>
                <div>
                  <Field
                    as={BaseInput}
                    name='password'
                    type='password'
                    placeholder='********'
                    className='w-full h-[56px] max-w-[755px] rounded-lg bg-[#FBEEFF] text-[#99879D] text-[16px] px-9'
                  />
                  {touched.password && errors.password && (
                    <div className='text-red-500 text-sm mt-1'>{errors.password}</div>
                  )}
                </div>
              </div>
              <div className='flex justify-center py-14'>
                <BaseButton type='submit' disabled={isSubmitting}>
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </BaseButton>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Login;
