import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { loginUser } from '../api/auth';
import BaseButton from 'components/shared/BaseButton';
import BaseInput from 'components/shared/BaseInput';

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
      <div className='flex flex-col justify-center items-center bg-white py-64 px-32'>
        <h1 className='text-center font-display font-extrabold text-[39px] leading-[100px] text-[#120E21] mb-12'>
          Welcome
        </h1>
        <form onSubmit={handleLogin} className='w-full max-w-[800px] space-y-8'>
          <div className='space-y-8'>
            <BaseInput
              type='email'
              placeholder='john@doe.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full h-[56px] max-w-[755px] rounded-lg bg-[#FBEEFF] text-[#99879D] text-[16px] px-9'
            />
            <BaseInput
              type='password'
              placeholder='********'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full h-[56px] max-w-[755px] rounded-lg bg-[#FBEEFF] text-[#99879D] text-[16px] px-9'
            />
          </div>
          <div className='flex justify-center py-14'>
            <BaseButton type='submit'>Login</BaseButton>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
