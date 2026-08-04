'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '@/app/context/AppContext';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  CreditCard, 
  CalendarDays, 
  FileText, 
  Bot, 
  Video, 
  ShieldUser, 
  Settings,
  X,
  Scale
} from 'lucide-react';

const navLinks = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Cases & Diary', href: '/dashboard/cases', icon: Briefcase },
  { name: 'Clients CRM', href: '/dashboard/clients', icon: Users },
  { name: 'Billing & Finance', href: '/dashboard/billing', icon: CreditCard },
  { name: 'Appointments', href: '/dashboard/appointments', icon: CalendarDays },
  { name: 'Documents', href: '/dashboard/documents', icon: FileText },
  { name: 'AI Assistant', href: '/dashboard/ai-assistant', icon: Bot },
  { name: 'Meetings', href: '/dashboard/meetings', icon: Video },
  { name: 'Team', href: '/dashboard/team', icon: ShieldUser },
  { name: 'Settings', href: '/dashboard/settings/jurisdiction', icon: Settings },
];

// Extracted Component to prevent re-creation during render (fixes static-components error)
const SidebarContent = ({ pathname, closeSidebar }: { pathname: string, closeSidebar: () => void }) => (
  <div className="flex flex-col h-full bg-slate-900 text-slate-300">
    <div className="p-6 flex items-center justify-between border-b border-slate-800">
      <Link href="/dashboard" onClick={closeSidebar} className="flex items-center gap-2 text-white">
        <div className="bg-blue-600 p-1.5 rounded-lg">
          <Scale className="w-6 h-6" />
        </div>
        {/* Fixed unescaped entity */}
        <span className="font-bold text-xl tracking-tight">Lawyer&apos;s Diary</span>
      </Link>
      <button onClick={closeSidebar} className="lg:hidden text-slate-400 hover:text-white">
        <X className="w-6 h-6" />
      </button>
    </div>

    <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-hide">
      {navLinks.map((link) => {
        const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
        return (
          <Link 
            key={link.name} 
            href={link.href}
            onClick={closeSidebar}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
              isActive 
                ? 'bg-blue-600/10 text-blue-400 font-semibold' 
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <link.icon className={`w-5 h-5 ${isActive ? 'text-blue-500' : 'text-slate-400 group-hover:text-slate-300'}`} />
            {link.name}
            {isActive && (
              <motion.div 
                layoutId="activeTab" 
                className="absolute left-0 w-1 h-8 bg-blue-500 rounded-r-full" 
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </Link>
        );
      })}
    </nav>
    
    <div className="p-4 border-t border-slate-800">
      <div className="bg-slate-800 p-4 rounded-xl">
        <p className="text-xs text-slate-400 mb-2">Cloud Backup Status</p>
        <div className="flex items-center gap-2 text-sm text-emerald-400 font-semibold">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          Synced to Drive
        </div>
      </div>
    </div>
  </div>
);

export default function Sidebar() {
  const pathname = usePathname();
  const { isSidebarOpen, closeSidebar } = useAppContext();

  return (
    <>
      {/* Mobile Sidebar (Animated) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeSidebar}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-slate-900 z-50 lg:hidden shadow-2xl"
            >
              <SidebarContent pathname={pathname} closeSidebar={closeSidebar} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar (Static) */}
      <aside className="hidden lg:flex flex-col w-72 fixed inset-y-0 z-30 border-r border-slate-800">
        <SidebarContent pathname={pathname} closeSidebar={closeSidebar} />
      </aside>
    </>
  );
}