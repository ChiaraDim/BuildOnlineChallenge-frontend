import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getUser } from '../api/auth';

export const useAuthCheck = () => {
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getUser();
        setAuthChecked(true);
      } catch (error) {
        localStorage.removeItem('auth_token');
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  return authChecked;
};
