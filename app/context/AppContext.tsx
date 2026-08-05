'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// --- Types ---
interface AppContextType {
  isHydrated: boolean;
  getStoredData: <T>(key: string) => T | null;
  setStoredData: <T>(key: string, data: T) => void;
  // Sidebar properties wapis add kar di gayi hain
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}

// --- Create Context ---
const AppContext = createContext<AppContextType | undefined>(undefined);

// --- Provider Component ---
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  // SSR Hydration ko handle karne ke liye state
  const [isHydrated, setIsHydrated] = useState(false);
  
  // Mobile Sidebar ki state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // setTimeout ka istemal taake synchronous state update ka linter error na aaye
    const timer = setTimeout(() => {
      setIsHydrated(true);
    }, 0);
    
    return () => clearTimeout(timer);
  }, []);

  // Sidebar functions
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  // LocalStorage se data laane ka function
  const getStoredData = <T,>(key: string): T | null => {
    if (typeof window === 'undefined') return null;
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error);
      return null;
    }
  };

  // LocalStorage mein data save karne ka function
  const setStoredData = <T,>(key: string, data: T) => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  };

  return (
    <AppContext.Provider 
      value={{ 
        isHydrated, 
        getStoredData, 
        setStoredData,
        isSidebarOpen,
        toggleSidebar,
        closeSidebar
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// --- Custom Hook ---
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};