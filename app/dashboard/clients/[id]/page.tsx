'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronRight, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  CreditCard, 
  Briefcase, 
  MessageSquare, 
  FileText, 
  Edit,
  IdCard,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  Download,
  Eye,
  Send
} from 'lucide-react';

// --- Types ---
type TabType = 'cases' | 'billing' | 'communication' | 'documents';

// --- Mock Data ---
const clientDetail = {
  id: 'CLI-001',
  name: 'Ahmed Ali',
  email: 'ahmed.ali@example.com',
  phone: '+92-300-1234567',
  cnic: '35202-1234567-1',
  address: '123 Main Boulevard, Gulberg III, Lahore',
  joinDate: 'Jan 15, 2026',
  status: 'Active',
  avatar: 'A'
};

const linkedCases = [
  { id: 'CR-2026/405', title: 'State vs. Ahmed Ali', category: 'Criminal', court: 'High Court, Lahore', status: 'Active', nextDate: 'Oct 14, 2026' },
  { id: 'CIV-2026/112', title: 'Ahmed Ali vs. ABC Builders', category: 'Civil', court: 'District Court', status: 'Disposed', nextDate: 'N/A' },
];

const invoices = [
  { id: 'INV-2026-042', date: 'Oct 01, 2026', description: 'Hearing Appearance Fee', amount: 50000, status: 'Pending' },
  { id: 'INV-2026-018', date: 'Jan 15, 2026', description: 'Initial Retainer Fee', amount: 100000, status: 'Paid' },
];

const communicationLog = [
  { id: 1, type: 'WhatsApp', date: 'Oct 12, 2026 - 10:30 AM', message: 'Reminder: Your hearing for case CR-2026/405 is scheduled for Oct 14 at High Court.', status: 'Delivered' },
  { id: 2, type: 'Email', date: 'Oct 01, 2026 - 02:15 PM', message: 'Invoice INV-2026-042 has been generated and sent for your review.', status: 'Read' },
  { id: 3, type: 'SMS', date: 'Sep 20, 2026 - 09:00 AM', message: 'Hearing Update: Case adjourned to next date Oct 14.', status: 'Delivered' },
];

const sharedDocuments = [
  { id: 'DOC-101', name: 'Bail_Application_Copy.pdf', size: '2.4 MB', date: 'Oct 10, 2026' },
  { id: 'DOC-102', name: 'Court_Order_Sep20.pdf', size: '1.1 MB', date: 'Sep 22, 2026' },
  { id: 'DOC-103', name: 'Initial_Retainer_Agreement.pdf', size: '450 KB', date: 'Jan 16, 2026' },
];

export default function ClientProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>('cases');

  const tabsConfig = [
    { id: 'cases', label: 'Linked Cases', icon: Briefcase, count: linkedCases.length },
    { id: 'billing', label: 'Billing & Invoices', icon: CreditCard, count: invoices.length },
    { id: 'communication', label: 'Communication', icon: MessageSquare, count: communicationLog.length },
    { id: 'documents', label: 'Shared Documents', icon: FileText, count: sharedDocuments.length },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-4 md:p-8 text-slate-900 dark:text-slate-100 pb-24">
      
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-6">
        <Link href="/dashboard/clients" className="hover:text-blue-600 transition-colors">Clients CRM</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-slate-900 dark:text-slate-200 font-medium">{clientDetail.name}</span>
      </div>

      {/* Client Profile Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 md:p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-blue-600"></div>
        
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 flex items-center justify-center font-bold text-4xl shrink-0">
            {clientDetail.avatar}
          </div>
          
          {/* Info */}
          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{clientDetail.name}</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs font-bold rounded-md">
                    {clientDetail.status} Client
                  </span>
                  • Client ID: {clientDetail.id}
                </p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium rounded-lg transition-colors border border-slate-200 dark:border-slate-700">
                <Edit className="w-4 h-4" /> Edit Profile
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Email Address</p>
                  <p className="text-sm font-semibold">{clientDetail.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Phone Number</p>
                  <p className="text-sm font-semibold">{clientDetail.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <IdCard className="w-4 h-4 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">CNIC / National ID</p>
                  <p className="text-sm font-semibold">{clientDetail.cnic}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Address</p>
                  <p className="text-sm font-semibold leading-snug">{clientDetail.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex overflow-x-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-1.5 shadow-sm mb-6 scrollbar-hide">
        {tabsConfig.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold whitespace-nowrap transition-all flex-1 ${
              activeTab === tab.id 
                ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400 shadow-sm' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <tab.icon className="w-4 h-4" /> 
            {tab.label}
            <span className={`ml-1.5 px-2 py-0.5 text-xs rounded-full ${
              activeTab === tab.id 
                ? 'bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200' 
                : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Tab Content Area */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 animate-in fade-in slide-in-from-bottom-2">
        
        {/* TAB 1: Linked Cases */}
        {activeTab === 'cases' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Associated Case Files</h3>
              <button className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                + Link New Case
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-sm">
                    <th className="p-4 font-medium">Case Info</th>
                    <th className="p-4 font-medium">Court</th>
                    <th className="p-4 font-medium">Next Date</th>
                    <th className="p-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {linkedCases.map((c) => (
                    <tr key={c.id} className="border-b last:border-0 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer">
                      <td className="p-4">
                        <p className="font-semibold text-slate-900 dark:text-white">{c.title}</p>
                        <p className="text-xs text-slate-500">{c.id} • {c.category}</p>
                      </td>
                      <td className="p-4 text-sm font-medium text-slate-600 dark:text-slate-300">{c.court}</td>
                      <td className="p-4 text-sm font-medium">{c.nextDate}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${
                          c.status === 'Active' 
                            ? 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800'
                            : 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
                        }`}>
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: Billing & Invoices */}
        {activeTab === 'billing' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Billing History</h3>
              <button className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                + Generate Invoice
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-sm">
                    <th className="p-4 font-medium">Invoice No & Date</th>
                    <th className="p-4 font-medium">Description</th>
                    <th className="p-4 font-medium">Amount</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="border-b last:border-0 border-slate-100 dark:border-slate-800">
                      <td className="p-4">
                        <p className="font-semibold text-slate-900 dark:text-white">{inv.id}</p>
                        <p className="text-xs text-slate-500">{inv.date}</p>
                      </td>
                      <td className="p-4 text-sm font-medium text-slate-600 dark:text-slate-300">{inv.description}</td>
                      <td className="p-4 text-sm font-bold">Rs. {inv.amount.toLocaleString()}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full flex items-center gap-1.5 w-max ${
                          inv.status === 'Paid'
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                            : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                        }`}>
                          {inv.status === 'Paid' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                          {inv.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button className="p-1.5 text-slate-400 hover:text-blue-600 bg-slate-50 dark:bg-slate-800 rounded-md transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: Communication Log */}
        {activeTab === 'communication' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">Notification Logs</h3>
              <button className="text-sm font-semibold bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2">
                <Send className="w-4 h-4" /> Send Message
              </button>
            </div>
            <div className="relative border-l-2 border-slate-100 dark:border-slate-800 ml-4 space-y-8">
              {communicationLog.map((log) => (
                <div key={log.id} className="ml-8 relative">
                  <div className={`absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center ${
                    log.type === 'WhatsApp' ? 'bg-emerald-500' : log.type === 'Email' ? 'bg-blue-500' : 'bg-slate-500'
                  }`}></div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm flex items-center gap-1.5">
                        {log.type} Message
                      </span>
                      <span className="text-xs text-slate-500">{log.date}</span>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">{log.message}</p>
                    <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {log.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Shared Documents */}
        {activeTab === 'documents' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Portal Files</h3>
              <button className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                Manage Access
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sharedDocuments.map((doc) => (
                <div key={doc.id} className="flex flex-col p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:shadow-md transition-shadow bg-slate-50 dark:bg-slate-800/30">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200 dark:border-slate-700">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <h4 className="font-semibold text-sm truncate" title={doc.name}>{doc.name}</h4>
                      <p className="text-xs text-slate-500 mt-1">{doc.size} • {doc.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-auto border-t border-slate-200 dark:border-slate-700 pt-3">
                    <button className="flex-1 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors flex items-center justify-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" /> View
                    </button>
                    <button className="flex-1 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors flex items-center justify-center gap-1.5">
                      <Download className="w-3.5 h-3.5" /> Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}