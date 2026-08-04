'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAppContext } from '@/app/context/AppContext';
import { 
  CreditCard, Plus, ChevronRight, FileText, 
  TrendingUp, Clock, CheckCircle2, AlertCircle
} from 'lucide-react';

interface InvoiceItem {
  id: string;
  clientName: string;
  caseId: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
}

export default function BillingOverviewPage() {
  const { getStoredData, isHydrated } = useAppContext();
  const [invoices, setInvoices] = useState<InvoiceItem[]>([]);
  
  // Stats
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [pendingAmount, setPendingAmount] = useState(0);

  useEffect(() => {
    if (isHydrated) {
      const timer = setTimeout(() => {
        const storedInvoices = getStoredData<InvoiceItem[]>('lawyer_invoices') || [];
        setInvoices(storedInvoices);

        // Calculate Stats
        const revenue = storedInvoices.filter(i => i.status === 'Paid').reduce((acc, curr) => acc + curr.amount, 0);
        const pending = storedInvoices.filter(i => i.status === 'Pending').reduce((acc, curr) => acc + curr.amount, 0);
        
        setTotalRevenue(revenue);
        setPendingAmount(pending);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isHydrated, getStoredData]);

  if (!isHydrated) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 text-slate-900 dark:text-slate-100 pb-24">
      
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-6">
        <Link href="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-slate-900 dark:text-slate-200 font-medium">Billing & Finance</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Billing & Finance</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage invoices, track payments, and monitor revenue.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard/billing/time-tracker" className="px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 rounded-xl text-sm font-bold transition-all shadow-sm hover:shadow-md flex items-center gap-2">
            <Clock className="w-4 h-4" /> Time Tracker
          </Link>
          <Link href="/dashboard/billing/invoices/new" className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-all shadow-md flex items-center gap-2">
            <Plus className="w-4 h-4" /> Create Invoice
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-xl">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-3xl font-black mb-1">Rs. {totalRevenue.toLocaleString()}</h3>
          <p className="text-sm font-medium text-slate-500">Total Collected</p>
        </div>
        
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 rounded-xl">
              <Clock className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-3xl font-black mb-1">Rs. {pendingAmount.toLocaleString()}</h3>
          <p className="text-sm font-medium text-slate-500">Pending Payments</p>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <h2 className="text-lg font-bold flex items-center gap-2"><FileText className="w-5 h-5 text-blue-500" /> Recent Invoices</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="p-4 font-semibold">Invoice ID</th>
                <th className="p-4 font-semibold">Client & Case</th>
                <th className="p-4 font-semibold">Amount</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Due Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {invoices.length > 0 ? (
                invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 font-bold text-sm">{inv.id}</td>
                    <td className="p-4">
                      <p className="font-bold text-sm text-slate-900 dark:text-white">{inv.clientName}</p>
                      <p className="text-xs text-slate-500">{inv.caseId}</p>
                    </td>
                    <td className="p-4 font-bold text-sm">Rs. {inv.amount.toLocaleString()}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border flex items-center gap-1.5 w-max ${
                        inv.status === 'Paid' ? 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:border-emerald-800' :
                        inv.status === 'Pending' ? 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:border-orange-800' :
                        'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:border-red-800'
                      }`}>
                        {inv.status === 'Paid' && <CheckCircle2 className="w-3.5 h-3.5" />}
                        {inv.status === 'Pending' && <Clock className="w-3.5 h-3.5" />}
                        {inv.status === 'Overdue' && <AlertCircle className="w-3.5 h-3.5" />}
                        {inv.status}
                      </span>
                    </td>
                    <td className="p-4 text-right text-sm font-medium text-slate-500">{inv.dueDate}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-slate-500">
                    <CreditCard className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700 mb-3" />
                    <p className="font-semibold text-lg">No invoices generated yet</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}