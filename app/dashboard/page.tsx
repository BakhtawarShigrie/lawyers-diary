'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { useAppContext } from '@/app/context/AppContext';
import { 
  Briefcase, 
  CreditCard, 
  Gavel, 
  Clock, 
  PlusCircle, 
  FileEdit, 
  FileText, 
  Bot,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

// --- Types ---
interface CaseItem {
  id: string;
  title?: string;
  clientName?: string;
  status: string;
}

interface InvoiceItem {
  id: string;
  amount: number;
  status: string;
  date: string; // YYYY-MM-DD
}

interface AppointmentItem {
  id: string;
  clientName: string;
  date: string;
  time: string;
  type: string;
}

interface HearingItem {
  id: string;
  caseTitle: string;
  date: string;
  court: string;
}

export default function DashboardPage() {
  const { getStoredData, isHydrated } = useAppContext();

  // Dashboard Stats States
  const [totalCases, setTotalCases] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [pendingInvoices, setPendingInvoices] = useState(0);
  const [upcomingHearings, setUpcomingHearings] = useState<HearingItem[]>([]);

  // Fetch data from LocalStorage on mount
  useEffect(() => {
    if (isHydrated) {
      const timer = setTimeout(() => {
        
        // 1. Fetch Cases (Active Cases Calculation)
        const storedCases = getStoredData<CaseItem[]>('lawyer_cases') || [];
        const activeCases = storedCases.filter(c => c.status?.toLowerCase() !== 'closed').length;
        setTotalCases(activeCases); // NO Dummy Data

        // 2. Fetch Invoices / Billing (Revenue & Pending)
        const storedInvoices = getStoredData<InvoiceItem[]>('lawyer_billing') || getStoredData<InvoiceItem[]>('lawyer_invoices') || [];
        
        let rev = 0;
        let pend = 0;
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        storedInvoices.forEach(inv => {
          if (inv.status?.toLowerCase() === 'pending' || inv.status?.toLowerCase() === 'unpaid') {
            pend++;
          }
          if (inv.status?.toLowerCase() === 'paid' && inv.date) {
            const invDate = new Date(inv.date);
            // Only add revenue if the paid invoice belongs to the current month
            if (invDate.getMonth() === currentMonth && invDate.getFullYear() === currentYear) {
              rev += Number(inv.amount) || 0;
            }
          }
        });
        
        setMonthlyRevenue(rev);
        setPendingInvoices(pend);

        // 3. Fetch Appointments / Hearings
        const storedAppointments = getStoredData<AppointmentItem[]>('lawyer_appointments') || [];
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

        const validHearings = storedAppointments
          .filter(apt => {
            if (!apt.date) return false;
            const aptDate = new Date(apt.date).getTime();
            // Filter appointments from today up to next 7 days
            return aptDate >= today.getTime() && aptDate <= nextWeek.getTime();
          })
          .map(apt => ({
            id: apt.id,
            caseTitle: apt.clientName || 'Client Consultation',
            date: `${apt.date} ${apt.time ? '| ' + apt.time : ''}`,
            court: apt.type || 'Meeting'
          }))
          // Sort by nearest date
          .sort((a, b) => new Date(a.date.split(' |')[0]).getTime() - new Date(b.date.split(' |')[0]).getTime());

        setUpcomingHearings(validHearings);

      }, 0);
      
      return () => clearTimeout(timer);
    }
  }, [isHydrated, getStoredData]);

  // Framer Motion Animation Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring' as const, stiffness: 300, damping: 24 } 
    }
  };

  if (!isHydrated) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 text-slate-900 dark:text-slate-100 pb-24">
      
      {/* --- Header --- */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, Adv. Shigrie</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Here is the latest summary of your law practice.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link 
            href="/dashboard/ai-assistant"
            className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:hover:bg-purple-900/50 rounded-lg text-sm font-semibold transition-colors"
          >
            <Bot className="w-4 h-4" /> Ask AI Assistant
          </Link>
        </div>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-8 max-w-6xl"
      >
        {/* --- Key Metrics Stats Row --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          
          <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 bg-blue-50 dark:bg-blue-900/10 w-24 h-24 rounded-full group-hover:scale-150 transition-transform duration-500 z-0"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-xl">
                  <Briefcase className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-1">{totalCases}</h3>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Cases</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 bg-emerald-50 dark:bg-emerald-900/10 w-24 h-24 rounded-full group-hover:scale-150 transition-transform duration-500 z-0"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-xl">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-1">
                <span className="text-lg font-bold text-slate-400 mr-1">Rs.</span>
                {monthlyRevenue.toLocaleString()}
              </h3>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Monthly Revenue</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 bg-orange-50 dark:bg-orange-900/10 w-24 h-24 rounded-full group-hover:scale-150 transition-transform duration-500 z-0"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 rounded-xl">
                  <AlertCircle className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-1">{pendingInvoices}</h3>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Pending Invoices</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 bg-purple-50 dark:bg-purple-900/10 w-24 h-24 rounded-full group-hover:scale-150 transition-transform duration-500 z-0"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 rounded-xl">
                  <Gavel className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-1">{upcomingHearings.length}</h3>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Hearings This Week</p>
            </div>
          </motion.div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          
          {/* --- Quick Actions (Modules) --- */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-blue-600" /> Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <Link href="/dashboard/cases/new" className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors">
                  <Briefcase className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">Add New Case</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Register a new client file</p>
                </div>
              </Link>

              <Link href="/dashboard/ai-assistant/drafting" className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md hover:border-purple-300 dark:hover:border-purple-700 transition-all flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-purple-50 dark:group-hover:bg-purple-900/30 transition-colors">
                  <FileEdit className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">Draft Document</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Generate legal drafts with AI</p>
                </div>
              </Link>

              <Link href="/dashboard/billing/invoices/new" className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-700 transition-all flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/30 transition-colors">
                  <CreditCard className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">Create Invoice</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Bill your clients instantly</p>
                </div>
              </Link>

              <Link href="/dashboard/documents/ocr" className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md hover:border-orange-300 dark:hover:border-orange-700 transition-all flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-orange-50 dark:group-hover:bg-orange-900/30 transition-colors">
                  <FileText className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-orange-600 dark:group-hover:text-orange-400" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">Scan Document (OCR)</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Convert images to text</p>
                </div>
              </Link>

            </div>
          </motion.div>

          {/* --- Upcoming Hearings / Agenda --- */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-xl font-bold flex items-center justify-between">
              <span className="flex items-center gap-2"><Clock className="w-5 h-5 text-blue-600" /> Agenda</span>
              <Link href="/dashboard/appointments" className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">View Calendar</Link>
            </h2>
            
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-5 space-y-4">
              {/* Only show top 4 in agenda to keep UI clean, but card stat shows true length */}
              {upcomingHearings.slice(0, 4).map((hearing, idx) => (
                <div key={hearing.id} className={`group ${idx !== Math.min(upcomingHearings.length, 4) - 1 ? 'border-b border-slate-100 dark:border-slate-800 pb-4' : ''}`}>
                  <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-1">{hearing.date}</p>
                  <Link href={`/dashboard/appointments`} className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                    {hearing.caseTitle}
                  </Link>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1.5">
                    <Gavel className="w-3.5 h-3.5" /> {hearing.court}
                  </p>
                </div>
              ))}
              
              {upcomingHearings.length === 0 && (
                <div className="text-center py-6 text-slate-500">
                  <p>No upcoming hearings.</p>
                </div>
              )}
            </div>
          </motion.div>

        </div>
      </motion.div>

    </div>
  );
}