'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAppContext } from '@/app/context/AppContext';
import { 
  Briefcase, Search, Filter, Plus, ChevronRight, 
  Gavel, Calendar, CheckCircle2, AlertCircle, Clock 
} from 'lucide-react';

// --- Types ---
interface CaseItem {
  id: string;
  title: string;
  clientName: string;
  type: string;
  court: string;
  status: string;
  nextDate: string;
}

export default function CasesListPage() {
  const { getStoredData, isHydrated } = useAppContext();
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    if (isHydrated) {
      // setTimeout to avoid synchronous state updates during render phase (set-state-in-effect fix)
      const timer = setTimeout(() => {
        const storedCases = getStoredData<CaseItem[]>('lawyer_cases') || [];
        setCases(storedCases);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isHydrated, getStoredData]);

  const filteredCases = cases.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Active': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
      case 'Pending': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800';
      case 'Closed': return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  if (!isHydrated) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 text-slate-900 dark:text-slate-100 pb-24">
      
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-6">
        <Link href="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-slate-900 dark:text-slate-200 font-medium">Cases</span>
      </div>

      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Cases Directory</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage all your active, pending, and closed client files.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard/cases/diary" className="px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 rounded-xl text-sm font-bold transition-all shadow-sm hover:shadow-md flex items-center gap-2">
            <Clock className="w-4 h-4" /> View Diary
          </Link>
          <Link href="/dashboard/cases/new" className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-all shadow-md flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add New Case
          </Link>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
        
        {/* Search & Filters */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by case title, client, or ID..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          <div className="relative w-full sm:w-48">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Table Area */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="p-4 font-semibold">Case Info</th>
                <th className="p-4 font-semibold">Client</th>
                <th className="p-4 font-semibold">Next Hearing</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {filteredCases.length > 0 ? (
                filteredCases.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                    <td className="p-4">
                      <p className="font-bold text-sm text-slate-900 dark:text-white mb-0.5">{c.title}</p>
                      <p className="text-xs text-slate-500 flex items-center gap-1"><Briefcase className="w-3 h-3" /> {c.id} • {c.type}</p>
                    </td>
                    <td className="p-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                      {c.clientName}
                    </td>
                    <td className="p-4">
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-blue-500" /> {c.nextDate || 'Not Scheduled'}</p>
                      <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1"><Gavel className="w-3 h-3" /> {c.court}</p>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border flex items-center gap-1.5 w-max ${getStatusBadge(c.status)}`}>
                        {c.status === 'Active' && <CheckCircle2 className="w-3.5 h-3.5" />}
                        {c.status === 'Pending' && <AlertCircle className="w-3.5 h-3.5" />}
                        {c.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Link href={`/dashboard/cases/${c.id}`} className="px-3 py-1.5 text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 rounded-lg transition-colors">
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-slate-500">
                    <Briefcase className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700 mb-3" />
                    <p className="font-semibold text-lg">No cases found</p>
                    <p className="text-sm mt-1">Try adjusting your filters or add a new case.</p>
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