import { ReactNode } from 'react';
import Header from './Header';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='bg-white min-h-screen'>
      <Header />
      <main className='w-full justify-center'>{children}</main>
    </div>
  );
};

export default Layout;
