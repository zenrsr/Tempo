
import React, { useState, useCallback } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './components/pages/LoginPage';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import InboxPage from './components/pages/InboxPage';
import AuditLogPage from './components/pages/AuditLogPage';
import SettingsPage from './components/pages/SettingsPage';
import { Page } from './types';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
};

const Main: React.FC = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('inbox');

  const renderPage = useCallback(() => {
    switch (currentPage) {
      case 'inbox':
        return <InboxPage />;
      case 'audit':
        return <AuditLogPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <InboxPage />;
    }
  }, [currentPage]);

  if (!user) {
    return <LoginPage />;
  }

  return (
    <div className="h-screen w-full flex bg-gray-950 text-gray-200">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default App;
