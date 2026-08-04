'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// --- Types ---
interface AppContextType {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  // LocalStorage generic getter/setter (Fixed 'any' type using Generics)
  getStoredData: <T>(key: string) => T | null;
  setStoredData: <T>(key: string, data: T) => void;
  isHydrated: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydration check to prevent SSR hydration mismatch 
  // Fixed set-state-in-effect by wrapping in setTimeout
  useEffect(() => {
    const timer = setTimeout(() => setIsHydrated(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  // LocalStorage Handlers using Generic Types <T>
  const getStoredData = <T,>(key: string): T | null => {
    if (typeof window === 'undefined') return null;
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return null;
    }
  };

  const setStoredData = <T,>(key: string, data: T): void => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return (
    <AppContext.Provider value={{ 
      isSidebarOpen, 
      toggleSidebar, 
      closeSidebar, 
      getStoredData, 
      setStoredData,
      isHydrated
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}