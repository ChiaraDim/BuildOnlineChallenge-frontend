import { useAuthCheck } from '../hooks/useAuthCheck';

const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const authChecked = useAuthCheck();
  return authChecked ? (
    <div className='max-w-screen-lg mx-auto'>
  {children}
</div>
  ) : null;
};

export default AuthWrapper;
