import { useState } from 'react';
import { useRouter } from 'next/router';
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
    <div className="min-h-screen bg-purple-100 flex items-center justify-center">
      <form onSubmit={handleLogin} className="bg-white p-12 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-4xl font-bold text-center mb-8">Welcome</h2>
        <input
          type="email"
          placeholder="john@doe.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-purple-300 px-4 py-3 rounded-lg mb-4 bg-purple-50 text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border border-purple-300 px-4 py-3 rounded-lg mb-6 bg-purple-50 text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-500 to-purple-700 text-white py-3 px-6 rounded-full w-full text-lg font-semibold shadow-md hover:bg-purple-800 hover:shadow-xl"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;