'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/app/context/AppContext';
import { ChevronRight, Save } from 'lucide-react';

// --- Types ---
interface CaseItem {
  id: string;
  title: string;
  clientName: string;
  type: string;
  court: string;
  status: string;
  nextDate: string;
  filingDate: string;
}

interface HearingItem {
  id: string;
  caseId: string;
  caseTitle: string;
  date: string;
  court: string;
  notes: string;
}

export default function AddNewCasePage() {
  const router = useRouter();
  const { getStoredData, setStoredData } = useAppContext();
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [clientName, setClientName] = useState('');
  const [type, setType] = useState('Civil Suit');
  const [court, setCourt] = useState('');
  const [status, setStatus] = useState('Active');
  const [nextDate, setNextDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const newCaseId = `CAS-${Math.floor(1000 + Math.random() * 9000)}`;
    
    const newCase: CaseItem = {
      id: newCaseId,
      title,
      clientName,
      type,
      court,
      status,
      nextDate,
      filingDate: new Date().toLocaleDateString(),
    };

    setTimeout(() => {
      // 1. Fetch existing cases and save the new one
      const existingCases = getStoredData<CaseItem[]>('lawyer_cases') || [];
      setStoredData('lawyer_cases', [newCase, ...existingCases]);

      // 2. Save Hearing to agenda if "Next Date" is provided
      if (nextDate) {
        const newHearingId = `HR-${Math.floor(1000 + Math.random() * 9000)}`;
        const newHearing: HearingItem = {
          id: newHearingId,
          caseId: newCaseId,
          caseTitle: title,
          date: nextDate,
          court: court,
          notes: 'Initial Hearing'
        };
        const existingHearings = getStoredData<HearingItem[]>('lawyer_hearings') || [];
        setStoredData('lawyer_hearings', [newHearing, ...existingHearings]);
      }

      router.push('/dashboard/cases');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 text-slate-900 dark:text-slate-100 pb-24">
      
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-6">
        <Link href="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <Link href="/dashboard/cases" className="hover:text-blue-600 transition-colors">Cases</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-slate-900 dark:text-slate-200 font-medium">Add New Case</span>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Register New Case</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Fill in the details to open a new client file.</p>
      </div>

      {/* Form Container */}
      <div className="max-w-2xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Case Title / Description</label>
            <input 
              type="text" 
              required 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              placeholder="e.g. State vs. Ahmed Ali (Bail)" 
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Client Name</label>
              <input 
                type="text" 
                required 
                value={clientName} 
                onChange={e => setClientName(e.target.value)} 
                placeholder="Client Name" 
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Case Type</label>
              <select 
                value={type} 
                onChange={e => setType(e.target.value)} 
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
              >
                <option value="Civil Suit">Civil Suit</option>
                <option value="Criminal (Bail)">Criminal (Bail)</option>
                <option value="Family / Divorce">Family / Divorce</option>
                <option value="Corporate">Corporate</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Court / Jurisdiction</label>
              <input 
                type="text" 
                required 
                value={court} 
                onChange={e => setCourt(e.target.value)} 
                placeholder="e.g. High Court, Lahore" 
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Next Hearing Date (Optional)</label>
              <input 
                type="date" 
                value={nextDate} 
                onChange={e => setNextDate(e.target.value)} 
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Current Status</label>
            <select 
              value={status} 
              onChange={e => setStatus(e.target.value)} 
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <button 
            type="submit" 
            disabled={isSaving} 
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 mt-4 disabled:opacity-70"
          >
            {isSaving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Save className="w-5 h-5" /> Save Case Record</>}
          </button>
        </form>
      </div>
    </div>
  );
}