'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  TrendingUp, 
  AlertCircle, 
  CreditCard, 
  DollarSign, 
  Search,
  Filter,
  Download, 
  Eye, 
  MoreVertical, 
  CheckCircle2, 
  Clock,
  ChevronRight,
  FileText,
  Briefcase,
  User
} from 'lucide-react';

// --- Mock Data ---
const financialStats = [
  { title: 'Monthly Revenue', value: 'Rs. 450,000', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-100 dark:bg-emerald-900/30', trend: '+12.5%' },
  { title: 'Outstanding Payments', value: 'Rs. 185,000', icon: AlertCircle, color: 'text-orange-600', bg: 'bg-orange-100 dark:bg-orange-900/30', trend: '4 Invoices' },
  { title: 'Total Expenses', value: 'Rs. 95,000', icon: CreditCard, color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900/30', trend: 'This Month' },
  { title: 'Net Profit', value: 'Rs. 355,000', icon: DollarSign, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30', trend: '+8.2%' },
];

const invoicesData = [
  {
    id: 'INV-2026-089',
    client: 'XYZ Corporation',
    caseTitle: 'XYZ Corp vs. ABC Ltd',
    amount: 150000,
    issueDate: 'Oct 01, 2026',
    dueDate: 'Oct 15, 2026',
    status: 'Unpaid'
  },
  {
    id: 'INV-2026-088',
    client: 'Ahmed Ali',
    caseTitle: 'State vs. Ahmed Ali',
    amount: 50000,
    issueDate: 'Sep 25, 2026',
    dueDate: 'Oct 05, 2026',
    status: 'Overdue'
  },
  {
    id: 'INV-2026-087',
    client: 'Fatima Bibi',
    caseTitle: 'Fatima Bibi vs. Khalid',
    amount: 75000,
    issueDate: 'Sep 15, 2026',
    dueDate: 'Sep 30, 2026',
    status: 'Paid'
  },
  {
    id: 'INV-2026-086',
    client: 'TechFlow SMC',
    caseTitle: 'Commissioner IR vs. TechFlow',
    amount: 200000,
    issueDate: 'Sep 10, 2026',
    dueDate: 'Sep 25, 2026',
    status: 'Paid'
  },
  {
    id: 'INV-2026-085',
    client: 'Tariq Mehmood',
    caseTitle: 'NAB vs. Tariq Mehmood',
    amount: 100000,
    issueDate: 'Oct 12, 2026',
    dueDate: 'Oct 26, 2026',
    status: 'Unpaid'
  }
];

export default function BillingDashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Filtering Logic
  const filteredInvoices = invoicesData.filter(inv => {
    const matchesSearch = inv.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          inv.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          inv.caseTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || inv.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Paid': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
      case 'Unpaid': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800';
      case 'Overdue': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Paid': return <CheckCircle2 className="w-3.5 h-3.5" />;
      case 'Unpaid': return <Clock className="w-3.5 h-3.5" />;
      case 'Overdue': return <AlertCircle className="w-3.5 h-3.5" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-4 md:p-8 text-slate-900 dark:text-slate-100 pb-24">
      
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-6">
        <Link href="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-slate-900 dark:text-slate-200 font-medium">Billing & Finance</span>
      </div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Financial Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your firm&apos;s invoices, track payments, and review analytics.</p>
        </div>
        <Link 
          href="/dashboard/billing/invoices/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Create New Invoice
        </Link>
      </div>

      {/* Financial Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {financialStats.map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col transition-all hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 ${stat.title.includes('Expense') || stat.title.includes('Outstanding') ? 'text-slate-600 dark:text-slate-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                {stat.trend}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{stat.title}</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Invoices Section */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        
        {/* Toolbar (Search & Filters) */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto flex-1">
            <div className="relative flex-1 sm:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search by invoice #, client, or case..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>

            <div className="relative w-full sm:w-48">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              >
                <option value="All">All Statuses</option>
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>
          </div>
          
          <button className="hidden md:flex px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-semibold rounded-lg transition-colors items-center gap-2 border border-slate-200 dark:border-slate-700">
            <Download className="w-4 h-4" /> Export Report
          </button>
        </div>

        {/* Invoices Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-sm">
                <th className="p-4 font-medium">Invoice Details</th>
                <th className="p-4 font-medium">Client & Case</th>
                <th className="p-4 font-medium">Amount</th>
                <th className="p-4 font-medium">Due Date</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                  
                  {/* Invoice Details */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-lg">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-slate-900 dark:text-white">{inv.id}</p>
                        <p className="text-xs text-slate-500 mt-0.5">Issued: {inv.issueDate}</p>
                      </div>
                    </div>
                  </td>

                  {/* Client & Case */}
                  <td className="p-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-slate-200">
                        <User className="w-3.5 h-3.5 text-slate-400" /> {inv.client}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <Briefcase className="w-3.5 h-3.5" /> {inv.caseTitle}
                      </div>
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="p-4">
                    <span className="font-bold text-slate-900 dark:text-white">
                      Rs. {inv.amount.toLocaleString()}
                    </span>
                  </td>

                  {/* Due Date */}
                  <td className="p-4 text-sm font-medium text-slate-600 dark:text-slate-300">
                    {inv.dueDate}
                  </td>

                  {/* Status */}
                  <td className="p-4">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${getStatusBadge(inv.status)} flex items-center gap-1.5 w-max`}>
                      {getStatusIcon(inv.status)}
                      {inv.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-md transition-colors" title="View Invoice">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-emerald-600 bg-slate-50 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-md transition-colors" title="Download PDF">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors border border-transparent">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredInvoices.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    No invoices found matching your criteria.
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