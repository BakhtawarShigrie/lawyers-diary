'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { 
  ChevronRight, 
  UploadCloud, 
  FileText, 
  FileIcon, 
  Sparkles, 
  Clock, 
  AlertTriangle, 
  Crosshair, 
  BookOpen, 
  RefreshCw, 
  Download, 
  Copy,
  CheckCircle2,
  X
} from 'lucide-react';

// --- Types & Mock Data ---
interface AnalysisResult {
  executiveSummary: string;
  timeline: { date: string; event: string }[];
  riskFactors: string[];
  weaknesses: string[];
  citations: string[];
}

const mockAnalysis: AnalysisResult = {
  executiveSummary: "The document is a 45-page Civil Suit regarding a property dispute over Commercial Plot No. 42-B. The Plaintiff alleges breach of contract and illegal possession by the Defendant. The core of the argument relies on an unregistered sale agreement dated Jan 15, 2020. The Defendant claims the agreement was forged.",
  timeline: [
    { date: "Jan 15, 2020", event: "Alleged execution of the unregistered sale agreement." },
    { date: "Mar 10, 2021", event: "Defendant purportedly took physical possession of the property." },
    { date: "Aug 05, 2023", event: "Legal notice sent by Plaintiff demanding vacation of premises." },
    { date: "Oct 12, 2026", event: "Civil Suit officially filed in the District Court." }
  ],
  riskFactors: [
    "The primary sale agreement is unregistered, which weakens its evidentiary value under the Registration Act.",
    "Delay (Laches): There is a significant gap of over two years between the alleged illegal possession and the filing of the suit.",
    "Lack of original payment receipts attached to the plaint."
  ],
  weaknesses: [
    "The Defendant's claim of forgery is currently unsubstantiated by any forensic report.",
    "Defendant admitted to receiving a partial payment in para 4 of their previous legal notice reply.",
    "Contradictory dates mentioned by the defense regarding when they actually occupied the property."
  ],
  citations: [
    "PLD 2014 SC 232 (On unregistered agreements)",
    "2018 YLR 1024 (Evidentiary value of oral testimonies)",
    "Section 53-A of the Transfer of Property Act"
  ]
};

export default function DocumentAnalyzerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Drag & Drop Handlers
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
    setResult(null);
  };

  const handleAnalyze = () => {
    if (!file) return;
    setIsProcessing(true);
    setResult(null);

    // Simulate AI processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setResult(mockAnalysis);
    }, 3500);
  };

  const resetAnalyzer = () => {
    setFile(null);
    setResult(null);
    setIsProcessing(false);
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(JSON.stringify(result, null, 2));
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-4 md:p-8 text-slate-900 dark:text-slate-100 pb-24">
      
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-6">
        <Link href="/dashboard/ai-assistant" className="hover:text-blue-600 transition-colors">AI Assistant Hub</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-slate-900 dark:text-slate-200 font-medium">Document Analyzer</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            AI Document Summarizer
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Upload lengthy FIRs, court orders, or contracts to extract instant insights.</p>
        </div>
        {result && (
          <button 
            onClick={resetAnalyzer}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Analyze Another Document
          </button>
        )}
      </div>

      {!result && !isProcessing && (
        <div className="max-w-3xl mx-auto mt-12 animate-in fade-in slide-in-from-bottom-4">
          
          {/* Drag & Drop Upload Zone */}
          {!file ? (
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
                isDragging 
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10' 
                  : 'border-slate-300 dark:border-slate-700 hover:border-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-900/50 bg-white dark:bg-slate-900 shadow-sm'
              }`}
            >
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <UploadCloud className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-2">Drag & Drop your document here</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto">
                Supports PDF, DOCX, TXT, and Scanned Images (JPG/PNG). Maximum file size 50MB.
              </p>
              <button className="bg-slate-900 hover:bg-slate-800 text-white dark:bg-emerald-600 dark:hover:bg-emerald-700 px-6 py-3 rounded-lg font-bold transition-colors shadow-sm">
                Browse Files
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept=".pdf,.docx,.doc,.txt,image/jpeg,image/png" 
              />
            </div>
          ) : (
            /* Selected File Ready State */
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-4 relative">
                <FileText className="w-8 h-8" />
                <button 
                  onClick={(e) => { e.stopPropagation(); removeFile(); }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-sm hover:bg-red-600 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
              <h3 className="text-lg font-bold truncate max-w-sm mx-auto mb-1">{file.name}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
                {(file.size / (1024 * 1024)).toFixed(2)} MB • Ready for analysis
              </p>
              
              <button 
                onClick={handleAnalyze}
                className="w-full sm:w-auto px-8 py-3.5 bg-linear-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 mx-auto"
              >
                <Sparkles className="w-5 h-5" /> Extract Insights & Summarize
              </button>
            </div>
          )}
        </div>
      )}

      {/* Processing State */}
      {isProcessing && (
        <div className="max-w-2xl mx-auto mt-20 text-center animate-in fade-in">
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 border-4 border-slate-200 dark:border-slate-800 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center text-emerald-500">
              <FileIcon className="w-8 h-8 animate-pulse" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Analyzing Document...</h2>
          <p className="text-slate-500 dark:text-slate-400">
            Our AI is reading through {file?.name}, extracting timelines, identifying risks, and cross-referencing citations. This usually takes a few seconds.
          </p>
        </div>
      )}

      {/* Analysis Result View */}
      {result && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          
          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-end gap-3 mb-4">
            <button 
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-sm font-semibold transition-colors shadow-sm"
            >
              {isCopied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              {isCopied ? 'Copied!' : 'Copy Brief'}
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-white rounded-lg text-sm font-semibold transition-colors shadow-sm">
              <Download className="w-4 h-4" /> Export as PDF
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Main Content Column (Summary & Timeline) */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Executive Summary */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500"></div>
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-500" /> Executive Summary
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm md:text-base">
                  {result.executiveSummary}
                </p>
              </div>

              {/* Key Timeline Events */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-indigo-500" /> Key Timeline Events
                </h2>
                <div className="relative border-l-2 border-indigo-100 dark:border-indigo-900/30 ml-3 space-y-6">
                  {result.timeline.map((item, idx) => (
                    <div key={idx} className="ml-6 relative">
                      <div className="absolute -left-[33px] top-0.5 w-4 h-4 rounded-full bg-indigo-500 border-4 border-white dark:border-slate-900 shadow-xs"></div>
                      <div>
                        <span className="inline-block px-2 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 text-xs font-bold rounded-md mb-2 border border-indigo-100 dark:border-indigo-800/50">
                          {item.date}
                        </span>
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                          {item.event}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Sidebar Column (Risks, Weaknesses, Citations) */}
            <div className="space-y-6">
              
              {/* Risk Factors */}
              <div className="bg-orange-50 dark:bg-orange-950/20 rounded-2xl border border-orange-200 dark:border-orange-900/50 shadow-sm p-6">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-orange-800 dark:text-orange-400">
                  <AlertTriangle className="w-5 h-5" /> Risk Factors
                </h2>
                <ul className="space-y-3">
                  {result.riskFactors.map((risk, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-orange-900 dark:text-orange-200/90 leading-snug">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0"></span>
                      {risk}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Weaknesses in Opposing Arguments */}
              <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-200 dark:border-emerald-900/50 shadow-sm p-6">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-emerald-800 dark:text-emerald-400">
                  <Crosshair className="w-5 h-5" /> Opposing Weaknesses
                </h2>
                <ul className="space-y-3">
                  {result.weaknesses.map((weakness, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-emerald-900 dark:text-emerald-200/90 leading-snug">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                      {weakness}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Extracted Citations */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-purple-600" /> Extracted Citations
                </h2>
                <div className="flex flex-col gap-2">
                  {result.citations.map((citation, idx) => (
                    <div key={idx} className="px-3 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between group cursor-pointer hover:border-purple-300 dark:hover:border-purple-700 transition-colors">
                      <span className="truncate pr-2">{citation}</span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-purple-500 shrink-0" />
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}