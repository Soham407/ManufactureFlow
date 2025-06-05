import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, hidingPassword?: string) => Promise<boolean>;
  logout: () => void;
  canSeeHiddenTransactions: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    email: 'superadmin@company.com',
    name: 'Super Admin',
    role: 'super_admin',
    isActive: true,
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    email: 'admin@company.com',
    name: 'Admin User',
    role: 'admin',
    isActive: true,
    createdAt: '2024-01-01'
  },
  {
    id: '3',
    email: 'accounts@company.com',
    name: 'Accounts Manager',
    role: 'accounts',
    isActive: true,
    createdAt: '2024-01-01'
  },
  {
    id: '4',
    email: 'production@company.com',
    name: 'Production Manager',
    role: 'production_manager',
    isActive: true,
    createdAt: '2024-01-01'
  },
  {
    id: '5',
    email: 'dispatch@company.com',
    name: 'Dispatch User',
    role: 'dispatch',
    isActive: true,
    createdAt: '2024-01-01'
  },
  {
    id: '6',
    email: 'worker@company.com',
    name: 'Worker',
    role: 'worker',
    isActive: true,
    createdAt: '2024-01-01'
  },
  {
    id: '7',
    email: 'customer@company.com',
    name: 'Customer User',
    role: 'customer',
    isActive: true,
    createdAt: '2024-01-01'
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Try to restore user from localStorage on initial load
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [canSeeHiddenTransactions, setCanSeeHiddenTransactions] = useState(() => {
    // Try to restore hidden transactions state from localStorage
    return localStorage.getItem('canSeeHiddenTransactions') === 'true';
  });

  // Save user and hidden transactions state to localStorage whenever they change
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
    localStorage.setItem('canSeeHiddenTransactions', String(canSeeHiddenTransactions));
  }, [user, canSeeHiddenTransactions]);

  const login = async (email: string, password: string, hidingPassword?: string): Promise<boolean> => {
    console.log('Login attempt:', { email, password, hidingPassword });
    
    // Simple mock authentication
    if (password === 'password123') {
      const foundUser = mockUsers.find(u => u.email === email && u.isActive);
      if (foundUser) {
        setUser(foundUser);
        
        // Super Admin dual password logic
        if (foundUser.role === 'super_admin') {
          if (hidingPassword === 'hide123') {
            setCanSeeHiddenTransactions(true);
            console.log('Super Admin logged in with hiding password - can see hidden transactions');
          } else {
            setCanSeeHiddenTransactions(false);
            console.log('Super Admin logged in with normal password - cannot see hidden transactions');
          }
        } else {
          setCanSeeHiddenTransactions(false);
        }
        
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setCanSeeHiddenTransactions(false);
    // Clear localStorage on logout
    localStorage.removeItem('user');
    localStorage.removeItem('canSeeHiddenTransactions');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      canSeeHiddenTransactions
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
