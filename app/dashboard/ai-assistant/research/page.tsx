'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronRight, 
  Search, 
  Filter, 
  Sparkles, 
  Bookmark, 
  Scale, 
  BookOpen, 
  Calendar,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  FileText,
  CornerDownRight
} from 'lucide-react';

// --- Types & Mock Data ---
interface SearchResult {
  id: string;
  title: string;
  citation: string;
  court: string;
  date: string;
  status: 'Active' | 'Overruled' | 'Distinguished';
  highlights: string;
  matchScore: number;
}

const mockResults: SearchResult[] = [
  {
    id: 'RES-001',
    title: 'Tariq Mehmood vs. National Accountability Bureau (NAB)',
    citation: '2021 SCMR 1234',
    court: 'Supreme Court of Pakistan',
    date: 'Sep 15, 2021',
    status: 'Active',
    highlights: 'The Court held that anticipatory bail in NAB cases can be granted under exceptional circumstances where the arrest is mala fide, intended to humiliate the accused, and where no active recovery is required. The absolute bar under Section 9(b) of the NAO 1999 does not oust the constitutional jurisdiction of High Courts under Article 199.',
    matchScore: 98
  },
  {
    id: 'RES-002',
    title: 'State vs. Ahmed Ali',
    citation: 'PLD 2019 SC 456',
    court: 'Supreme Court of Pakistan',
    date: 'Mar 10, 2019',
    status: 'Distinguished',
    highlights: 'While considering pre-arrest bail, the court must evaluate the merits of the allegations tentatively. Bail was refused as the accused failed to prove mala fide intent on the part of the prosecution, setting a precedent that mere apprehension of arrest is insufficient for extraordinary relief.',
    matchScore: 85
  },
  {
    id: 'RES-003',
    title: 'XYZ Corporation vs. The State',
    citation: '2015 CLC 789',
    court: 'Lahore High Court',
    date: 'Nov 02, 2015',
    status: 'Overruled',
    highlights: 'Initially ruled that NAB courts have exclusive domain and High Courts cannot intervene for bail. This view was later completely overruled by the Supreme Court in PLD 2020 SC 15, affirming constitutional supremacy.',
    matchScore: 72
  }
];

export default function LegalResearchEnginePage() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filters State
  const [jurisdiction, setJurisdiction] = useState('Pakistan');
  const [courtLevel, setCourtLevel] = useState('Supreme Court');
  const [yearRange, setYearRange] = useState('All Time');
  const [journal, setJournal] = useState('All Journals');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsSearching(true);
    // Simulate AI Semantic Search delay
    setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);
    }, 1500);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Active': 
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50';
      case 'Overruled': 
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800/50';
      case 'Distinguished': 
        return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border border-orange-200 dark:border-orange-800/50';
      default: 
        return 'bg-slate-100 text-slate-700 border border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Active': return <CheckCircle2 className="w-3 h-3" />;
      case 'Overruled': return <AlertTriangle className="w-3 h-3" />;
      case 'Distinguished': return <CornerDownRight className="w-3 h-3" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-4 md:p-8 text-slate-900 dark:text-slate-100 pb-24">
      
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-6">
        <Link href="/dashboard/ai-assistant" className="hover:text-blue-600 transition-colors">AI Assistant Hub</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-slate-900 dark:text-slate-200 font-medium">Case Law Search Engine</span>
      </div>

      {/* Hero Search Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 md:p-10 mb-8 relative overflow-hidden">
        {/* Subtle Background Gradient */}
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-purple-50/50 to-blue-50/50 dark:from-purple-900/10 dark:to-blue-900/10 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight mb-3 flex items-center justify-center gap-3">
              <Search className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              Semantic Legal Search
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base">
              Describe your legal query in natural language. Our AI understands context, concepts, and nuances—not just keywords.
            </p>
          </div>

          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-linear-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative bg-white dark:bg-slate-950 rounded-2xl border border-slate-300 dark:border-slate-700 shadow-inner flex items-center p-2 focus-within:ring-2 focus-within:ring-purple-500 transition-all">
                <div className="pl-4">
                  <Sparkles className="w-6 h-6 text-purple-500" />
                </div>
                <input 
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g., Supreme court precedents on anticipatory bail in NAB cases..." 
                  className="w-full bg-transparent border-none outline-none px-4 py-4 text-base md:text-lg text-slate-900 dark:text-white placeholder:text-slate-400"
                />
                <button 
                  type="submit"
                  disabled={isSearching || !query.trim()}
                  className="bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-6 py-4 rounded-xl font-bold transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSearching ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Search <ChevronRight className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            </div>

            {/* Filters Toggle */}
            <div className="flex justify-center">
              <button 
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
              >
                <Filter className="w-4 h-4" /> 
                {showFilters ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Advanced Filters Panel */}
            {showFilters && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 animate-in fade-in slide-in-from-top-2">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Jurisdiction</label>
                  <select value={jurisdiction} onChange={(e) => setJurisdiction(e.target.value)} className="w-full px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:border-purple-500 appearance-none">
                    <option value="Pakistan">Pakistan</option>
                    <option value="UK">United Kingdom</option>
                    <option value="UAE">UAE</option>
                    <option value="US">United States</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Court Level</label>
                  <select value={courtLevel} onChange={(e) => setCourtLevel(e.target.value)} className="w-full px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:border-purple-500 appearance-none">
                    <option value="All Courts">All Courts</option>
                    <option value="Supreme Court">Supreme Court</option>
                    <option value="High Courts">High Courts</option>
                    <option value="District Courts">District Courts</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Year Range</label>
                  <select value={yearRange} onChange={(e) => setYearRange(e.target.value)} className="w-full px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:border-purple-500 appearance-none">
                    <option value="All Time">All Time</option>
                    <option value="Last 5 Years">Last 5 Years (2021-2026)</option>
                    <option value="Last 10 Years">Last 10 Years</option>
                    <option value="Pre-2010">Pre-2010</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Law Journal</label>
                  <select value={journal} onChange={(e) => setJournal(e.target.value)} className="w-full px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:border-purple-500 appearance-none">
                    <option value="All Journals">All Journals</option>
                    <option value="PLD">PLD</option>
                    <option value="SCMR">SCMR</option>
                    <option value="CLC">CLC</option>
                    <option value="AIR">AIR</option>
                  </select>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Search Results Area */}
      {hasSearched && (
        <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4">
          
          <div className="flex items-center justify-between mb-4 px-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Top Semantic Matches <span className="text-slate-500 font-normal text-sm ml-2">({mockResults.length} results found)</span>
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1"><Scale className="w-4 h-4" /> Sorted by Relevance</span>
            </div>
          </div>

          {mockResults.map((result) => (
            <div key={result.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 md:p-8 hover:shadow-md transition-shadow group">
              
              {/* Result Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400 hover:underline cursor-pointer leading-tight mb-2">
                    {result.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
                    <span className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 px-2 py-0.5 rounded-md border border-purple-100 dark:border-purple-800">
 কর্মী <BookOpen className="w-3.5 h-3.5" /> {result.citation}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Scale className="w-3.5 h-3.5 text-slate-400" /> {result.court}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" /> {result.date}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full flex items-center gap-1.5 shadow-sm ${getStatusBadge(result.status)}`}>
                    {getStatusIcon(result.status)} {result.status}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    {result.matchScore}% Match
                  </span>
                </div>
              </div>

              {/* Highlights Paragraph */}
              <div className="bg-slate-50 dark:bg-slate-800/30 p-4 rounded-lg border border-slate-100 dark:border-slate-700 mb-6 relative">
                <div className="absolute top-4 left-4">
                  <Sparkles className="w-5 h-5 text-purple-400 opacity-50" />
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed pl-8">
                  {result.highlights}
                </p>
              </div>

              {/* Result Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 rounded-lg text-sm font-bold transition-colors">
                  <FileText className="w-4 h-4" /> Summarize with AI
                </button>
                <div className="flex w-full sm:w-auto gap-3 sm:ml-auto">
                  <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-sm font-semibold transition-colors">
                    <Bookmark className="w-4 h-4" /> Bookmark
                  </button>
                  <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-sm font-semibold transition-colors">
                    View Full Judgment
                  </button>
                </div>
              </div>

            </div>
          ))}

          <div className="text-center pt-8">
            <button className="px-6 py-2.5 border border-slate-300 dark:border-slate-700 rounded-full text-sm font-bold text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors">
              Load More Results
            </button>
          </div>

        </div>
      )}

    </div>
  );
}