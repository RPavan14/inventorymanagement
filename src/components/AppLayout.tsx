import React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import LoginScreen from './LoginScreen';
import Dashboard from './Dashboard';

const AppLayout: React.FC = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="min-h-screen">
      {isLoggedIn ? <Dashboard /> : <LoginScreen />}
    </div>
  );
};

export default AppLayout;