import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Org } from '../../types';

const OrgSwitcher: React.FC = () => {
  const { currentOrg, availableOrgs, switchOrg, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);
  
  if (!currentOrg || !user) return null;

  const handleSelectOrg = (org: Org) => {
    switchOrg(org.id);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm font-medium text-white">{currentOrg.name}</span>
        <svg className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 w-56 mt-2 origin-top-right bg-gray-800 divide-y divide-gray-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {availableOrgs.map((org) => (
              <a
                key={org.id}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleSelectOrg(org);
                }}
                className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
              >
                {org.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrgSwitcher;
