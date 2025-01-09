import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { loginUser } from '../api/auth';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token } = await loginUser(email, password);
      localStorage.setItem('auth_token', token);
      router.push('/contacts');
    } catch (error) {
      alert('Invalid login credentials');
    }
  };

  return (
    <>
      <Head>
        <title>Login | BuildOnline</title>
      </Head>
      <div className='min-h-[90vh] bg-white flex flex-col items-center pt-12'>
        <h1 className='text-center font-display font-extrabold text-[39px] leading-[52px] text-[#120E21] mb-8'>
          Welcome
        </h1>
        <form onSubmit={handleLogin} className='w-full max-w-[527px] space-y-8'>
          <div className='space-y-4'>
            <input
              type='email'
              placeholder='john@doe.com'
              className='w-full h-[56px] rounded-lg bg-[#FBEEFF] text-[#99879D] text-[16px] px-4'
            />
            <input
              type='password'
              placeholder='********'
              className='w-full h-[56px] rounded-lg bg-[#FBEEFF] text-[#99879D] text-[16px] px-4'
            />
          </div>
          <div className='flex justify-center mt-6'>
            <button
              type='submit'
              className='w-[263px] h-[56px] bg-[#9378FF] rounded-full shadow-lg text-white text-[18px] leading-[21px] font-medium'
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
