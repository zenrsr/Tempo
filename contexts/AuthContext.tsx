import React, { createContext, useContext, useState, ReactNode, useMemo, useCallback } from 'react';
import { User, Org } from '../types';
import { USERS, ORGS } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  currentOrg: Org | null;
  availableOrgs: Org[];
  login: (email: string) => boolean;
  logout: () => void;
  switchOrg: (orgId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [currentOrgId, setCurrentOrgId] = useState<string | null>(null);

  const login = useCallback((email: string): boolean => {
    const foundUser = USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (foundUser) {
      setUser(foundUser);
      if (foundUser.memberships.length > 0) {
        setCurrentOrgId(foundUser.memberships[0].orgId);
      }
      return true;
    }
    alert('User not found. Please use one of the mock emails.');
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setCurrentOrgId(null);
  }, []);

  const switchOrg = useCallback((orgId: string) => {
    if (user?.memberships.some(m => m.orgId === orgId)) {
      setCurrentOrgId(orgId);
    }
  }, [user]);

  const availableOrgs = useMemo(() => {
    if (!user) return [];
    return ORGS.filter(org => user.memberships.some(m => m.orgId === org.id));
  }, [user]);

  const currentOrg = useMemo(() => {
    if (!currentOrgId) return null;
    return ORGS.find(org => org.id === currentOrgId) || null;
  }, [currentOrgId]);

  const value = { user, currentOrg, availableOrgs, login, logout, switchOrg };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
