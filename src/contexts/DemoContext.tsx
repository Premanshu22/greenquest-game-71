import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, getCurrentUser, switchUser, mockUsers } from '@/data/mockData';

interface DemoContextType {
  isDemoMode: boolean;
  setIsDemoMode: (enabled: boolean) => void;
  isPresentationMode: boolean;
  setIsPresentationMode: (enabled: boolean) => void;
  currentUser: User;
  currentRole: 'guest' | 'student' | 'teacher' | 'admin';
  setCurrentRole: (role: 'guest' | 'student' | 'teacher' | 'admin') => void;
  impersonateUser: (userId: string) => void;
  demoStep: number;
  setDemoStep: (step: number) => void;
  totalDemoSteps: number;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

interface DemoProviderProps {
  children: ReactNode;
}

export const DemoProvider = ({ children }: DemoProviderProps) => {
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>(getCurrentUser());
  const [currentRole, setCurrentRole] = useState<'guest' | 'student' | 'teacher' | 'admin'>('guest');
  const [demoStep, setDemoStep] = useState(0);
  const totalDemoSteps = 8;

  const impersonateUser = (userId: string) => {
    const user = switchUser(userId);
    if (user) {
      setCurrentUser(user);
    }
  };

  const value: DemoContextType = {
    isDemoMode,
    setIsDemoMode,
    isPresentationMode,
    setIsPresentationMode,
    currentUser,
    currentRole,
    setCurrentRole,
    impersonateUser,
    demoStep,
    setDemoStep,
    totalDemoSteps
  };

  return (
    <DemoContext.Provider value={value}>
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (context === undefined) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
};