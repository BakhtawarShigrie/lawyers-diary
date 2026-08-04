'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/app/context/AppContext';
import { ChevronRight, Briefcase, Calendar, Gavel, FileText, CheckCircle2 } from 'lucide-react';

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

// Next.js 15+ Pattern: params is now a Promise
export default function CaseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { getStoredData, isHydrated, setStoredData } = useAppContext();
  
  // Unwrap the params Promise using React.use()
  const { id } = use(params);
  
  const [caseData, setCaseData] = useState<CaseItem | null>(null);
  const [hearings, setHearings] = useState<HearingItem[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (isHydrated) {
      const timer = setTimeout(() => {
        const storedCases = getStoredData<CaseItem[]>('lawyer_cases') || [];
        const foundCase = storedCases.find(c => c.id === id); // Using unwrapped id
        
        if (foundCase) {
          setCaseData(foundCase);
          const storedHearings = getStoredData<HearingItem[]>('lawyer_hearings') || [];
          setHearings(storedHearings.filter(h => h.caseId === id));
        } else {
          router.push('/dashboard/cases');
        }
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isHydrated, getStoredData, id, router]); // Dependency updated to unwrapped 'id'

  const markAsClosed = () => {
    setIsUpdating(true);
    setTimeout(() => {
      const storedCases = getStoredData<CaseItem[]>('lawyer_cases') || [];
      const updatedCases = storedCases.map(c => c.id === id ? { ...c, status: 'Closed' } : c);
      
      setStoredData('lawyer_cases', updatedCases);
      
      if (caseData) {
        setCaseData({ ...caseData, status: 'Closed' });
      }
      setIsUpdating(false);
    }, 800);
  };

  if (!isHydrated || !caseData) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 text-slate-900 dark:text-slate-100 pb-24">
      
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-6">
        <Link href="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <Link href="/dashboard/cases" className="hover:text-blue-600 transition-colors">Cases</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-slate-900 dark:text-slate-200 font-medium">{caseData.id}</span>
      </div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${caseData.status === 'Active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-400'}`}>
              {caseData.status}
            </span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{caseData.type}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">{caseData.title}</h1>
          <p className="text-slate-600 dark:text-slate-400 font-medium">Client: {caseData.clientName}</p>
        </div>
        
        {caseData.status !== 'Closed' && (
          <button 
            onClick={markAsClosed}
            disabled={isUpdating}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white rounded-xl text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isUpdating ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
            {isUpdating ? 'Updating...' : 'Mark as Closed'}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Briefcase className="w-5 h-5 text-blue-500" /> Case Details</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-500 dark:text-slate-400 mb-1">Court / Jurisdiction</p>
                <p className="font-bold flex items-center gap-1.5"><Gavel className="w-4 h-4 text-slate-400" /> {caseData.court}</p>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400 mb-1">Filing Date</p>
                <p className="font-bold flex items-center gap-1.5"><Calendar className="w-4 h-4 text-slate-400" /> {caseData.filingDate}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Calendar className="w-5 h-5 text-purple-500" /> Hearing History</h2>
            <div className="space-y-4">
              {hearings.length > 0 ? (
                hearings.map(h => (
                  <div key={h.id} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                    <p className="font-bold text-sm text-blue-600 dark:text-blue-400 mb-1">{h.date}</p>
                    <p className="text-sm font-medium">{h.notes}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">No hearings recorded yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><FileText className="w-5 h-5 text-orange-500" /> Documents</h2>
            <div className="p-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl text-center text-sm text-slate-500">
              Drag & Drop files here, or <br/>
              <button className="font-bold text-blue-600 dark:text-blue-400 hover:underline mt-1">Browse Files</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}