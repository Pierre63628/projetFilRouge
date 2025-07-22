import React, { createContext, useContext, useState } from 'react';
import { authApi, LoadingState, createLoadingState, setLoading } from '../services/api.ts';

export interface Employee {
  id: string;
  username: string;
  name: string;
  role: 'admin' | 'employee';
}

export interface AuthState {
  isAuthenticated: boolean;
  employee: Employee | null;
  loading: LoadingState;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(() => {
    // Try to restore from localStorage on initial load
    try {
      const stored = localStorage.getItem('horror-house-current-employee');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoadingState] = useState<LoadingState>(createLoadingState());

  const login = async (username: string, password: string): Promise<boolean> => {
    setLoadingState(setLoading(loading, true));

    try {
      const response = await authApi.login(username, password);

      if (response.success && response.data) {
        const employee = response.data.employee;
        setCurrentEmployee(employee);
        // Store in localStorage for persistence
        localStorage.setItem('horror-house-current-employee', JSON.stringify(employee));
        setLoadingState(setLoading(loading, false));
        return true;
      } else {
        setLoadingState(setLoading(loading, false, response.error || 'Login failed'));
        return false;
      }
    } catch (error) {
      setLoadingState(setLoading(loading, false, 'Network error occurred'));
      return false;
    }
  };

  const logout = () => {
    setCurrentEmployee(null);
    localStorage.removeItem('horror-house-current-employee');
    setLoadingState(createLoadingState());
  };

  const value: AuthState = {
    isAuthenticated: !!currentEmployee,
    employee: currentEmployee,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
