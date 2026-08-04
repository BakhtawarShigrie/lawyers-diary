'use client';

import React from 'react';
import { Menu, Bell, Search, User } from 'lucide-react';
import { useAppContext } from '@/app/context/AppContext';

export default function Navbar() {
  const { toggleSidebar } = useAppContext();

  return (
    <header className="sticky top-0 z-20 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 h-16 flex items-center px-4 md:px-8 justify-between">
      
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar} 
          className="p-2 -ml-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        {/* Quick Search */}
        <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
          <Search className="w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Quick search cases, clients..." 
            className="bg-transparent border-none outline-none pl-2 text-sm text-slate-700 dark:text-slate-200 w-64"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <button className="relative p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-1"></div>
        
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">Adv. Shigrie</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Senior Partner</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
            <User className="w-5 h-5" />
          </div>
        </div>
      </div>
      
    </header>
  );
}