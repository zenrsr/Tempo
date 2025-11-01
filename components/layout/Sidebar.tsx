import React from 'react';
import { Page } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const NavItem: React.FC<{
  page: Page;
  label: string;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  // Fix: Cannot find namespace 'JSX'. Use React.ReactElement instead.
  icon: React.ReactElement;
}> = ({ page, label, currentPage, setCurrentPage, icon }) => (
  <li>
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        setCurrentPage(page);
      }}
      className={`flex items-center p-2 text-base font-normal rounded-lg hover:bg-gray-700 ${
        currentPage === page ? 'bg-gray-700 text-white' : 'text-gray-400'
      }`}
    >
      {icon}
      <span className="ml-3">{label}</span>
    </a>
  </li>
);

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
    const { user, logout } = useAuth();
    if (!user) return null;

  return (
    <aside className="w-64" aria-label="Sidebar">
      <div className="flex flex-col h-full px-3 py-4 overflow-y-auto bg-gray-900 border-r border-gray-800">
        <a href="#" className="flex items-center pl-2.5 mb-5">
           <span className="self-center text-xl font-semibold whitespace-nowrap text-white">Tempo</span>
        </a>
        <ul className="space-y-2 flex-1">
          <NavItem
            page="inbox"
            label="Inbox"
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>}
          />
          <NavItem
            page="audit"
            label="Audit Log"
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>}
          />
          <NavItem
            page="settings"
            label="Settings"
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>}
          />
        </ul>
        <div className="pt-4 mt-4 space-y-2 border-t border-gray-700">
             <div className="flex items-center p-2 text-white">
                <img className="w-10 h-10 rounded-full" src={user.avatarUrl} alt={user.name} />
                <div className="ml-3">
                    <p className="text-sm font-semibold">{user.name}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                </div>
            </div>
            <a href="#" onClick={(e) => { e.preventDefault(); logout(); }} className="flex items-center p-2 text-base font-normal text-gray-400 rounded-lg hover:bg-gray-700 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                <span className="ml-3">Sign Out</span>
            </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
