'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/app/context/AppContext';
import { 
  ChevronRight, Sparkles, Save, Copy, 
  CheckCircle2, Loader2, FileEdit 
} from 'lucide-react';

// --- Types ---
interface DraftItem {
  id: string;
  title: string;
  content: string;
  date: string;
}

export default function DraftingWorkspacePage() {
  const router = useRouter();
  const { getStoredData, setStoredData, isHydrated } = useAppContext();
  
  // States
  const [prompt, setPrompt] = useState('');
  const [draftTitle, setDraftTitle] = useState('');
  const [draftContent, setDraftContent] = useState('');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Helper Functions
  const generateId = () => `DRAFT-${Date.now().toString().slice(-6)}`;
  const getCurrentDate = () => new Date().toLocaleDateString();

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI Generation Delay
    setTimeout(() => {
      const generatedText = `LEGAL NOTICE\n\nTo,\n[Opposite Party Name]\n[Address]\n\nSubject: Legal Notice under section [Relevant Section]\n\nUnder the instructions of my client, [Client Name], I hereby serve upon you this legal notice:\n\n1. That my client had entered into an agreement...\n\n(Generated based on: "${prompt}")\n\nTherefore, you are hereby called upon to comply within 14 days, failing which my client will be forced to initiate legal proceedings against you in a court of competent jurisdiction.`;
      
      setDraftTitle(prompt.slice(0, 30) + '...');
      setDraftContent(generatedText);
      setIsGenerating(false);
    }, 2500);
  };

  const handleSaveDraft = () => {
    if (!draftContent) return;
    setIsSaving(true);

    const newDraft: DraftItem = {
      id: generateId(),
      title: draftTitle || 'Untitled Draft',
      content: draftContent,
      date: getCurrentDate()
    };

    setTimeout(() => {
      const existingDrafts = getStoredData<DraftItem[]>('lawyer_ai_drafts') || [];
      setStoredData('lawyer_ai_drafts', [newDraft, ...existingDrafts]);
      
      setIsSaving(false);
      router.push('/dashboard/ai-assistant');
    }, 800);
  };

  const copyToClipboard = () => {
    if (draftContent) {
      navigator.clipboard.writeText(draftContent);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  if (!isHydrated) return null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 p-4 md:p-8 text-slate-900 dark:text-slate-100">
      
      {/* Breadcrumb & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-2">
            <Link href="/dashboard/ai-assistant" className="hover:text-purple-600 transition-colors">AI Assistant</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-slate-900 dark:text-slate-200 font-medium">Drafting</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <FileEdit className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            AI Drafting Workspace
          </h1>
        </div>
        
        {draftContent && (
          <div className="flex items-center gap-3">
            <button 
              onClick={copyToClipboard}
              className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-sm font-semibold transition-colors shadow-sm flex items-center gap-2"
            >
              {isCopied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              {isCopied ? 'Copied!' : 'Copy'}
            </button>
            <button 
              onClick={handleSaveDraft}
              disabled={isSaving}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-bold transition-all shadow-md flex items-center gap-2 disabled:opacity-70"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Draft
            </button>
          </div>
        )}
      </div>

      {/* Split Screen Container */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-[500px]">
        
        {/* Left Panel: AI Prompt Input */}
        <div className="w-full lg:w-1/3 flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <h2 className="font-bold text-sm">Instruction Prompt</h2>
          </div>
          <form onSubmit={handleGenerate} className="flex-1 flex flex-col p-4">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
              Describe the legal document you want to generate. Include details like party names, jurisdictions, and specific sections.
            </p>
            <textarea 
              required
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Draft a legal notice for recovery of Rs. 500,000 against Ali for a bounced cheque under Section 489-F..."
              className="flex-1 w-full p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 outline-none resize-none mb-4 min-h-[150px]"
            />
            <button 
              type="submit" 
              disabled={isGenerating || !prompt.trim()}
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
              {isGenerating ? 'Generating Draft...' : 'Generate with AI'}
            </button>
          </form>
        </div>

        {/* Right Panel: Text Editor / Preview */}
        <div className="w-full lg:w-2/3 flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
            <input 
              type="text" 
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.target.value)}
              placeholder="Draft Title..."
              disabled={!draftContent}
              className="w-full font-bold text-lg bg-transparent outline-none placeholder:text-slate-400 disabled:opacity-50"
            />
          </div>
          
          <div className="flex-1 p-4 relative min-h-[350px]">
            {isGenerating ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                <Loader2 className="w-10 h-10 animate-spin text-purple-500 mb-4" />
                <p className="font-medium animate-pulse">Drafting your document...</p>
              </div>
            ) : draftContent ? (
              <textarea 
                value={draftContent}
                onChange={(e) => setDraftContent(e.target.value)}
                className="w-full h-full min-h-[350px] p-2 bg-transparent text-sm text-slate-800 dark:text-slate-200 leading-relaxed outline-none resize-none"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                <FileEdit className="w-16 h-16 mb-4 opacity-20" />
                <p className="font-medium">Your generated draft will appear here.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}