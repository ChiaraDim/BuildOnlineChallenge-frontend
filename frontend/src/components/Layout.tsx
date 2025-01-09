import Header from './Header';

import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-purple-100">
      <Header />
      <main className="p-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;