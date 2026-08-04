import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Briefcase, 
  Bot, 
  FolderOpen, 
  Users, 
  CreditCard, 
  Settings 
} from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lawyer Diary & Legal AI Assistant",
  description: "Modern Legal Practice Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 dark:bg-slate-950`}>
        <div className="flex h-screen overflow-hidden">
          
          {/* Sidebar Navigation - Fixed CSS Conflict here */}
          <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 hidden md:flex flex-col">
            <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-blue-600" />
                LawyerDiary
              </span>
            </div>
            
            <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1.5">
              <Link 
                href="/dashboard" 
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400 font-medium transition-colors"
              >
                <LayoutDashboard className="w-5 h-5" /> 
                Dashboard
              </Link>
              
              <Link 
                href="/dashboard/cases" 
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50 transition-colors font-medium"
              >
                <Briefcase className="w-5 h-5" /> 
                Cases & Diary
              </Link>
              
              <Link 
                href="/dashboard/ai-assistant" 
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50 transition-colors font-medium"
              >
                <Bot className="w-5 h-5" /> 
                AI Assistant
              </Link>
              
              <Link 
                href="/dashboard/documents" 
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50 transition-colors font-medium"
              >
                <FolderOpen className="w-5 h-5" /> 
                Document Vault
              </Link>
              
              <Link 
                href="/dashboard/clients" 
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50 transition-colors font-medium"
              >
                <Users className="w-5 h-5" /> 
                Clients CRM
              </Link>
              
              <Link 
                href="/dashboard/billing" 
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50 transition-colors font-medium"
              >
                <CreditCard className="w-5 h-5" /> 
                Billing & Finance
              </Link>
            </nav>

            <div className="p-4 border-t border-slate-200 dark:border-slate-800">
              <Link 
                href="/dashboard/settings/jurisdiction" 
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50 transition-colors font-medium"
              >
                <Settings className="w-5 h-5" /> 
                Settings
              </Link>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
          
        </div>
      </body>
    </html>
  );
}