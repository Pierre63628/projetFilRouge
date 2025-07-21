import React, { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { AuthState, Employee } from '../types';

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

// Default employees for the demo (in a real app, this would come from a backend)
const defaultEmployees: Employee[] = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123', // In a real app, this would be hashed
    name: 'Administrateur',
    role: 'admin'
  },
  {
    id: '2',
    username: 'employee',
    password: 'emp123',
    name: 'Employé',
    role: 'employee'
  }
];

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [employees] = useLocalStorage<Employee[]>('horror-house-employees', defaultEmployees);
  const [currentEmployee, setCurrentEmployee] = useLocalStorage<Employee | null>('horror-house-current-employee', null);

  const login = (username: string, password: string): boolean => {
    const employee = employees.find(emp => 
      emp.username === username && emp.password === password
    );
    
    if (employee) {
      setCurrentEmployee(employee);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentEmployee(null);
  };

  // Check if the stored employee still exists in the employees list
  useEffect(() => {
    if (currentEmployee) {
      const stillExists = employees.find(emp => emp.id === currentEmployee.id);
      if (!stillExists) {
        logout();
      }
    }
  }, [employees, currentEmployee]);

  const value: AuthState = {
    isAuthenticated: !!currentEmployee,
    employee: currentEmployee,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
