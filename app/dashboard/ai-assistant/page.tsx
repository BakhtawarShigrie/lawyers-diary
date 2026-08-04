'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAppContext } from '@/app/context/AppContext';
import { 
  Bot, ChevronRight, FileEdit, Search, FileText, 
  Clock, ArrowRight, Sparkles 
} from 'lucide-react';

// --- Types ---
interface DraftItem {
  id: string;
  title: string;
  content: string;
  date: string;
}

export default function AIAssistantHubPage() {
  const { getStoredData, isHydrated } = useAppContext();
  const [recentDrafts, setRecentDrafts] = useState<DraftItem[]>([]);

  useEffect(() => {
    if (isHydrated) {
      const timer = setTimeout(() => {
        const storedDrafts = getStoredData<DraftItem[]>('lawyer_ai_drafts') || [];
        setRecentDrafts(storedDrafts);
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
        <span className="text-slate-900 dark:text-slate-200 font-medium">AI Assistant</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
          <Bot className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          AI Legal Assistant Hub
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Supercharge your legal practice with intelligent drafting, research, and analysis.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        
        {/* Main AI Tools */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Drafting Card */}
            <Link href="/dashboard/ai-assistant/drafting" className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-purple-300 dark:hover:border-purple-700 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <FileEdit className="w-24 h-24 text-purple-500" />
              </div>
              <div className="w-12 h-12 bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 rounded-xl flex items-center justify-center mb-4 relative z-10">
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2 relative z-10">AI Drafting</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 relative z-10">Generate legal notices, contracts, and petitions in seconds.</p>
              <div className="mt-4 flex items-center text-sm font-bold text-purple-600 dark:text-purple-400 group-hover:gap-2 transition-all relative z-10">
                Start Drafting <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </Link>

            {/* Document Analyzer Card */}
            <Link href="/dashboard/ai-assistant/analyzer" className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-700 transition-all group relative overflow-hidden">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-xl flex items-center justify-center mb-4 relative z-10">
                <FileText className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2 relative z-10">Document Analyzer</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 relative z-10">Upload lengthy FIRs or orders to extract instant summaries and timelines.</p>
              <div className="mt-4 flex items-center text-sm font-bold text-emerald-600 dark:text-emerald-400 group-hover:gap-2 transition-all relative z-10">
                Analyze Document <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </Link>

            {/* Legal Research Card */}
            <Link href="/dashboard/ai-assistant/research" className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all group relative overflow-hidden sm:col-span-2">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-xl flex items-center justify-center shrink-0">
                  <Search className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Deep Legal Research</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">Ask complex legal questions, find relevant case laws, and explore precedents specific to your jurisdiction.</p>
                  <div className="mt-4 flex items-center text-sm font-bold text-blue-600 dark:text-blue-400 group-hover:gap-2 transition-all">
                    Start Researching <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </div>
            </Link>

          </div>
        </div>

        {/* Recent Activity / Saved Drafts */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Clock className="w-5 h-5 text-slate-500" /> Recent Activity
          </h2>
          
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-5 space-y-4">
            {recentDrafts.length > 0 ? (
              recentDrafts.slice(0, 5).map((draft) => (
                <div key={draft.id} className="group border-b border-slate-100 dark:border-slate-800 last:border-0 pb-4 last:pb-0">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-xs font-bold text-purple-600 dark:text-purple-400">AI Draft</p>
                    <p className="text-xs text-slate-400">{draft.date}</p>
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white truncate">{draft.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{draft.content}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-500">
                <FileEdit className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-700 mb-3" />
                <p className="font-semibold text-sm">No recent AI activity</p>
                <p className="text-xs mt-1">Generated drafts will appear here.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}