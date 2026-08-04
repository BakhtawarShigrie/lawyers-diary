'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronRight, 
  Bot, 
  Sparkles, 
  Scale, 
  FileEdit, 
  Search, 
  FileText, 
  ShieldCheck, 
  Clock, 
  MessageSquare,
  ArrowRight,
  Send
} from 'lucide-react';

// --- Mock Data ---
const recentActivity = [
  {
    id: 'ACT-01',
    type: 'Chat',
    title: 'Supreme Court precedents on anticipatory bail in NAB cases',
    date: 'Today, 10:30 AM',
    icon: MessageSquare,
    color: 'text-blue-500',
    bg: 'bg-blue-100 dark:bg-blue-900/30'
  },
  {
    id: 'ACT-02',
    type: 'Draft',
    title: 'Bail Application Draft - State vs. Ahmed Ali',
    date: 'Yesterday, 04:15 PM',
    icon: FileEdit,
    color: 'text-emerald-500',
    bg: 'bg-emerald-100 dark:bg-emerald-900/30'
  },
  {
    id: 'ACT-03',
    type: 'Summary',
    title: 'Summary of FIR No. 405/2026',
    date: 'Oct 12, 2026',
    icon: FileText,
    color: 'text-purple-500',
    bg: 'bg-purple-100 dark:bg-purple-900/30'
  },
  {
    id: 'ACT-04',
    type: 'Validation',
    title: 'Citation Check: PLD 2020 SC 15',
    date: 'Oct 10, 2026',
    icon: ShieldCheck,
    color: 'text-orange-500',
    bg: 'bg-orange-100 dark:bg-orange-900/30'
  }
];

export default function AIAssistantHubPage() {
  const [chatQuery, setChatQuery] = useState('');

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatQuery.trim()) return;
    alert(`Initiating AI query: ${chatQuery}`);
    setChatQuery('');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-4 md:p-8 text-slate-900 dark:text-slate-100 pb-24">
      
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-6">
        <Link href="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-slate-900 dark:text-slate-200 font-medium">AI Legal Assistant</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-3">
          <Bot className="w-8 h-8 text-blue-600 dark:text-blue-500" />
          AI Legal Hub
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg max-w-3xl">
          Your intelligent co-counsel. Ask legal questions, draft documents, analyze precedents, and summarize case files in seconds.
        </p>
      </div>

      {/* Quick AI Chat Input (Futuristic Area) */}
      <div className="relative mb-10 group">
        <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
        <div className="relative bg-white dark:bg-slate-900 rounded-2xl p-2 flex items-center shadow-sm">
          <div className="pl-4">
            <Sparkles className="w-6 h-6 text-purple-500 animate-pulse" />
          </div>
          <form onSubmit={handleChatSubmit} className="flex-1 flex items-center">
            <input 
              type="text" 
              value={chatQuery}
              onChange={(e) => setChatQuery(e.target.value)}
              placeholder="Ask any instant legal query in English or Urdu (e.g., 'What are the grounds for pre-arrest bail in cybercrime?')" 
              className="w-full bg-transparent border-none outline-none px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400"
            />
            <button 
              type="submit"
              disabled={!chatQuery.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:dark:bg-slate-800 text-white p-3 rounded-xl transition-colors shadow-sm shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Cards for Core AI Modules */}
      <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-blue-600" /> Core AI Modules
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        
        {/* Module A */}
        <Link href="/dashboard/ai-assistant/drafting" className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:-translate-y-1 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-800 transition-all duration-300 flex flex-col">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <FileEdit className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">AI Legal Draft Generator</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 flex-1">
            Instantly generate standardized legal drafts, bail applications, and notices in Urdu or English.
          </p>
          <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-semibold mt-auto">
            Open Workspace <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Module B */}
        <Link href="/dashboard/ai-assistant/research" className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:-translate-y-1 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-800 transition-all duration-300 flex flex-col">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">Case Law Search Engine</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 flex-1">
            Semantic search across millions of precedents and judgments using natural language.
          </p>
          <div className="flex items-center text-purple-600 dark:text-purple-400 text-sm font-semibold mt-auto">
            Start Research <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Module C */}
        <Link href="/dashboard/ai-assistant/analyzer" className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:-translate-y-1 hover:shadow-lg hover:emerald-300 dark:hover:border-emerald-800 transition-all duration-300 flex flex-col">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">Document Summarizer</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 flex-1">
            Extract executive summaries, key timeline events, and risk factors from lengthy FIRs and documents.
          </p>
          <div className="flex items-center text-emerald-600 dark:text-emerald-400 text-sm font-semibold mt-auto">
            Analyze File <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Module D */}
        <Link href="#" className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:-translate-y-1 hover:shadow-lg hover:border-orange-300 dark:hover:border-orange-800 transition-all duration-300 flex flex-col">
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">Citation Validator</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 flex-1">
            Automatically verify if your cited precedents are active or have been overruled by higher courts.
          </p>
          <div className="flex items-center text-orange-600 dark:text-orange-400 text-sm font-semibold mt-auto">
            Verify Citations <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

      </div>

      {/* Recent Activity / Saved Drafts */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Clock className="w-5 h-5 text-slate-500" /> Recent AI Activity
          </h2>
          <button className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            View All History
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentActivity.map((item) => (
            <div key={item.id} className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
              <div className={`p-3 rounded-lg shrink-0 ${item.bg}`}>
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{item.type}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                  <span className="text-xs text-slate-400">{item.date}</span>
                </div>
                <h4 className="font-semibold text-sm text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}