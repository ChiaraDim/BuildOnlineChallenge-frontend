import { ReactNode } from 'react';
import Header from './Header';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='bg-white min-h-screen'>
      <Header />
      <main className='flex justify-center py-8'>{children}</main>
    </div>
  );
};

export default Layout;
