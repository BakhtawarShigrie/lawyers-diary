'use client';

import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  MapPin, 
  Scale, 
  Edit, 
  Clock, 
  AlertTriangle,
  User,
  Users,
  FileText,
  History,
  CreditCard,
  Download,
  Eye,
  CheckCircle2,
  Calendar,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';

// --- Type Definitions ---
type TabType = 'overview' | 'history' | 'documents' | 'billing';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
}

// --- Mock Data ---
const caseDetail = {
  id: 'CASE-001',
  title: 'State vs. Ahmed Ali',
  suitNo: 'CR-2026/405',
  category: 'Criminal',
  status: 'Active',
  forum: 'High Court, Lahore',
  roomNo: 'Court Room 4',
  judge: 'Hon. Justice Tariq Mehmood',
  filingDate: 'Jan 10, 2026',
  nextHearing: 'Oct 14, 2026',
  limitationDeadline: '2026-11-15T23:59:59',
  petitioner: {
    name: 'The State',
    counsel: 'Prosecutor General Punjab',
    contact: 'N/A'
  },
  respondent: {
    name: 'Ahmed Ali',
    counsel: 'Adv. Shigrie (Our Firm)',
    contact: '+92-300-1234567'
  }
};

const historyLog = [
  { id: 1, date: 'Sep 20, 2026', judge: 'Justice Tariq Mehmood', order: 'Bail application arguments heard partially. Respondent requested time for producing additional evidence. Adjourned to next date.', nextDate: 'Oct 14, 2026' },
  { id: 2, date: 'Aug 15, 2026', judge: 'Justice Tariq Mehmood', order: 'Notices issued to the petitioner. FIR copy submitted on record.', nextDate: 'Sep 20, 2026' },
  { id: 3, date: 'Jul 01, 2026', judge: 'Justice Raza Khan', order: 'Initial petition filed. Office objection removed.', nextDate: 'Aug 15, 2026' },
];

const documents = [
  { id: 1, name: 'FIR Copy - Translated.pdf', type: 'PDF', size: '2.4 MB', date: 'Jul 02, 2026' },
  { id: 2, name: 'Bail Application Draft.docx', type: 'DOCX', size: '45 KB', date: 'Aug 10, 2026' },
  { id: 3, name: 'Medical Report.jpg', type: 'IMAGE', size: '1.2 MB', date: 'Sep 18, 2026' },
];

const billing = {
  totalFee: 150000,
  paid: 50000,
  pending: 100000,
  transactions: [
    { id: 1, date: 'Jan 15, 2026', desc: 'Retainer Fee / Advance', amount: 50000, status: 'Paid' },
    { id: 2, date: 'Oct 01, 2026', desc: 'Hearing Appearance Fee', amount: 100000, status: 'Pending' }
  ]
};

// Removed unused 'params' prop
export default function SingleCaseDetailPage() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  
  // Limitation Countdown State (Initial state null prevents hydration error and fixes set-state-in-effect warning)
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const targetDate = new Date(caseDetail.limitationDeadline).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
      }
    };

    updateTimer();
    const timerId = setInterval(updateTimer, 60000); // Update every minute
    return () => clearInterval(timerId);
  }, []);

  const tabsConfig = [
    { id: 'overview', label: 'Overview', icon: Briefcase },
    { id: 'history', label: 'Order Sheets', icon: History },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'billing', label: 'Billing & Fees', icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-4 md:p-8 text-slate-900 dark:text-slate-100 pb-24">
      
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-6">
        <Link href="/dashboard/cases" className="hover:text-blue-600 transition-colors">Cases Directory</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-slate-900 dark:text-slate-200 font-medium">{caseDetail.suitNo}</span>
      </div>

      {/* Header Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 mb-8 relative overflow-hidden">
        {/* Fixed Tailwind v4 Gradient Class */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-blue-600 to-indigo-600"></div>
        
        <div className="flex flex-col lg:flex-row justify-between gap-6 items-start lg:items-center">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-bold rounded-md">
                {caseDetail.category}
              </span>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs font-bold rounded-md flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> {caseDetail.status}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">{caseDetail.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400 font-medium">
              <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" /> {caseDetail.suitNo}</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {caseDetail.forum}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium rounded-lg transition-colors border border-slate-200 dark:border-slate-700">
              <Edit className="w-4 h-4" /> Edit Case
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Main Content Area (Tabs) */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* Tabs Navigation */}
          <div className="flex overflow-x-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-1.5 shadow-sm scrollbar-hide">
            {tabsConfig.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-all flex-1 justify-center ${
                  activeTab === tab.id 
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400 shadow-sm' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <tab.icon className="w-4 h-4" /> {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Court Info Card */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Scale className="w-4 h-4" /> Court Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Assigned Judge</p>
                      <p className="font-semibold">{caseDetail.judge}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Court Room</p>
                      <p className="font-semibold">{caseDetail.roomNo}</p>
                    </div>
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between">
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Filing Date</p>
                        <p className="font-semibold text-sm">{caseDetail.filingDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Next Hearing</p>
                        <p className="font-bold text-sm text-blue-600 dark:text-blue-400">{caseDetail.nextHearing}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Parties Card */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Users className="w-4 h-4" /> Parties Involved
                  </h3>
                  
                  <div className="space-y-5">
                    {/* Petitioner */}
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700">
                      <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase mb-1">Petitioner</p>
                      <p className="font-bold text-lg leading-tight">{caseDetail.petitioner.name}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Counsel: {caseDetail.petitioner.counsel}</p>
                    </div>

                    {/* Respondent */}
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700">
                      <p className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase mb-1">Respondent</p>
                      <p className="font-bold text-lg leading-tight">{caseDetail.respondent.name}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Counsel: {caseDetail.respondent.counsel}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HISTORY / ORDER SHEETS */}
          {activeTab === 'history' && (
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 animate-in fade-in slide-in-from-bottom-2">
              <h3 className="text-lg font-bold mb-6">Chronological History</h3>
              <div className="relative border-l-2 border-slate-100 dark:border-slate-800 ml-4 space-y-8">
                {historyLog.map((log) => (
                  <div key={log.id} className="ml-8 relative">
                    {/* Fixed Canonical Class Spacing */}
                    <div className="absolute -left-10.25 top-1 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/50 border-4 border-white dark:border-slate-900 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-xl border border-slate-100 dark:border-slate-700">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-bold text-sm text-blue-600 dark:text-blue-400 flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {log.date}</span>
                        <span className="text-xs text-slate-500 font-medium">Before: {log.judge}</span>
                      </div>
                      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                        {log.order}
                      </p>
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400 text-xs font-bold rounded-md">
                        <Clock className="w-3.5 h-3.5" /> Next Date Given: {log.nextDate}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: DOCUMENTS */}
          {activeTab === 'documents' && (
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">Associated Files</h3>
                <button className="text-sm text-blue-600 font-medium hover:underline">+ Upload New</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:shadow-md transition-shadow group cursor-pointer">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg mr-4 text-blue-600 dark:text-blue-400">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <h4 className="font-semibold text-sm truncate">{doc.name}</h4>
                      <p className="text-xs text-slate-500 mt-1">{doc.size} • {doc.date}</p>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-blue-600 bg-slate-50 dark:bg-slate-800 rounded-md"><Eye className="w-4 h-4" /></button>
                      <button className="p-2 text-slate-400 hover:text-blue-600 bg-slate-50 dark:bg-slate-800 rounded-md"><Download className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: BILLING */}
          {activeTab === 'billing' && (
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 animate-in fade-in slide-in-from-bottom-2">
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
                  <p className="text-xs text-slate-500 mb-1 font-semibold">Total Case Fee</p>
                  <p className="text-2xl font-bold">Rs. {billing.totalFee.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 mb-1 font-semibold">Amount Paid</p>
                  <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">Rs. {billing.paid.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-800/30">
                  <p className="text-xs text-red-600 dark:text-red-400 mb-1 font-semibold">Pending Balance</p>
                  <p className="text-2xl font-bold text-red-700 dark:text-red-300">Rs. {billing.pending.toLocaleString()}</p>
                </div>
              </div>

              <h4 className="font-bold text-sm text-slate-400 uppercase tracking-wider mb-4">Fee History</h4>
              <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                    <tr>
                      <th className="p-3 font-semibold">Date</th>
                      <th className="p-3 font-semibold">Description</th>
                      <th className="p-3 font-semibold">Amount</th>
                      <th className="p-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {billing.transactions.map((tx) => (
                      <tr key={tx.id} className="border-b last:border-0 border-slate-100 dark:border-slate-700/50">
                        <td className="p-3 text-slate-600 dark:text-slate-400">{tx.date}</td>
                        <td className="p-3 font-medium">{tx.desc}</td>
                        <td className="p-3 font-bold">Rs. {tx.amount.toLocaleString()}</td>
                        <td className="p-3">
                          <span className={`px-2.5 py-1 text-xs font-bold rounded-md ${tx.status === 'Paid' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30' : 'bg-red-100 text-red-700 dark:bg-red-900/30'}`}>
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

        {/* Right Sidebar Widgets */}
        <div className="space-y-6">
          
          {/* Limitation Period Countdown Widget */}
          {timeLeft !== null && (
            // Fixed Tailwind v4 Gradient Class
            <div className="bg-linear-to-br from-orange-50 to-red-50 dark:from-slate-900 dark:to-slate-900 rounded-xl border border-orange-200 dark:border-red-900/50 shadow-sm p-6 relative overflow-hidden">
              <div className="absolute -right-4 -top-4 opacity-10">
                <AlertTriangle className="w-32 h-32 text-red-600" />
              </div>
              
              <div className="flex items-center gap-2 mb-4 relative z-10">
                <div className="p-2 bg-red-100 dark:bg-red-900/50 rounded-lg text-red-600 dark:text-red-400 animate-pulse">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-red-900 dark:text-red-400">Limitation Deadline</h3>
              </div>
              
              <p className="text-sm text-orange-800 dark:text-slate-400 mb-6 relative z-10">
                Time remaining to file appeal/revision for this case.
              </p>

              <div className="grid grid-cols-3 gap-3 text-center relative z-10">
                <div className="bg-white dark:bg-slate-800 rounded-lg py-3 border border-orange-100 dark:border-slate-700 shadow-sm">
                  <div className="text-2xl font-black text-red-600 dark:text-red-400">{timeLeft.days}</div>
                  <div className="text-[10px] font-bold uppercase text-slate-500 mt-1">Days</div>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg py-3 border border-orange-100 dark:border-slate-700 shadow-sm">
                  <div className="text-2xl font-black text-red-600 dark:text-red-400">{timeLeft.hours}</div>
                  <div className="text-[10px] font-bold uppercase text-slate-500 mt-1">Hours</div>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg py-3 border border-orange-100 dark:border-slate-700 shadow-sm">
                  <div className="text-2xl font-black text-red-600 dark:text-red-400">{timeLeft.minutes}</div>
                  <div className="text-[10px] font-bold uppercase text-slate-500 mt-1">Mins</div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions Card */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <h3 className="font-bold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-colors border border-slate-100 dark:border-slate-700">
                <FileText className="w-4 h-4" /> Generate AI Draft
              </button>
              <button className="w-full flex items-center gap-3 p-3 text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-lg transition-colors border border-slate-100 dark:border-slate-700">
                <User className="w-4 h-4" /> Message Client
              </button>
              <button className="w-full flex items-center gap-3 p-3 text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-orange-900/30 hover:text-orange-600 dark:hover:text-orange-400 rounded-lg transition-colors border border-slate-100 dark:border-slate-700">
                <CreditCard className="w-4 h-4" /> Generate Invoice
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}