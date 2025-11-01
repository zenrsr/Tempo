import React from 'react';
import OrgSwitcher from '../common/OrgSwitcher';

const Header: React.FC = () => {
  return (
    <header className="flex-shrink-0 bg-gray-900 border-b border-gray-800">
      <div className="flex items-center justify-between h-16 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center">
            {/* Can add breadcrumbs or page title here later */}
        </div>
        <div className="flex items-center space-x-4">
          <OrgSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;
