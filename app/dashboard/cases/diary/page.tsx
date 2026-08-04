'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAppContext } from '@/app/context/AppContext';
import { ChevronRight, Calendar, Gavel, ArrowRight } from 'lucide-react';

// --- Types ---
interface HearingItem {
  id: string;
  caseId: string;
  caseTitle: string;
  date: string;
  court: string;
  notes: string;
}

export default function CaseDiaryPage() {
  const { getStoredData, isHydrated } = useAppContext();
  const [hearings, setHearings] = useState<HearingItem[]>([]);

  useEffect(() => {
    if (isHydrated) {
      const timer = setTimeout(() => {
        const storedHearings = getStoredData<HearingItem[]>('lawyer_hearings') || [];
        setHearings(storedHearings.reverse()); // Simple reverse chronological sort
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
        <Link href="/dashboard/cases" className="hover:text-blue-600 transition-colors">Cases</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-slate-900 dark:text-slate-200 font-medium">Diary / Agenda</span>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Lawyer&apos;s Diary & Agenda</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Track your upcoming court hearings and deadlines.</p>
      </div>

      <div className="max-w-4xl space-y-4">
        {hearings.length > 0 ? (
          hearings.map(h => (
            <div key={h.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-blue-300 dark:hover:border-blue-800 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-xl shrink-0 mt-1">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-lg text-blue-600 dark:text-blue-400 mb-1">{h.date}</p>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1">{h.caseTitle}</h3>
                  <p className="text-sm text-slate-500 flex items-center gap-1.5"><Gavel className="w-3.5 h-3.5" /> {h.court}</p>
                </div>
              </div>
              <Link href={`/dashboard/cases/${h.caseId}`} className="shrink-0 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
                View Case <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))
        ) : (
          <div className="bg-white dark:bg-slate-900 p-12 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
            <Calendar className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
            <h3 className="text-lg font-bold">Diary is Empty</h3>
            <p className="text-sm text-slate-500 mt-1">Add a case with a next hearing date to see it here.</p>
          </div>
        )}
      </div>
    </div>
  );
}