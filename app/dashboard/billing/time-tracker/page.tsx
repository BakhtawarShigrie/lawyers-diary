'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ChevronRight, 
  Play, 
  Pause, 
  Square, 
  Clock, 
  Briefcase, 
  FileText, 
  CheckCircle2, 
  DollarSign, 
  ToggleLeft, 
  ToggleRight,
  Plus,
  Trash2,
  FileBox,
  Receipt
} from 'lucide-react';

// --- Types & Mock Data ---
interface TimeLog {
  id: string;
  caseTitle: string;
  activity: string;
  description: string;
  duration: string; // HH:MM:SS
  hourlyRate: number;
  isBillable: boolean;
  date: string;
}

const mockCases = [
  'State vs. Ahmed Ali (CR-2026/405)',
  'XYZ Corp vs. ABC Ltd (CIV-2026/112)',
  'Fatima Bibi vs. Khalid (FAM-2026/89)',
  'TechFlow SMC (Corporate Retainer)'
];

const mockActivities = [
  'Court Appearance',
  'Legal Research',
  'Drafting Documents',
  'Client Consultation',
  'Case Study & Prep',
  'Travel Time'
];

export default function TimeTrackerPage() {
  // Timer State
  const [timerState, setTimerState] = useState<'idle' | 'running' | 'paused'>('idle');
  const [seconds, setSeconds] = useState(0);
  
  // New Log Form State
  const [selectedCase, setSelectedCase] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');
  const [description, setDescription] = useState('');
  const [hourlyRate, setHourlyRate] = useState<number>(5000);
  const [isBillable, setIsBillable] = useState(true);

  // Timesheet Logs State
  const [logs, setLogs] = useState<TimeLog[]>([
    {
      id: 'LOG-001',
      caseTitle: 'XYZ Corp vs. ABC Ltd (CIV-2026/112)',
      activity: 'Legal Research',
      description: 'Researched precedents regarding corporate tax liabilities.',
      duration: '02:15:00',
      hourlyRate: 5000,
      isBillable: true,
      date: 'Oct 14, 2026'
    },
    {
      id: 'LOG-002',
      caseTitle: 'State vs. Ahmed Ali (CR-2026/405)',
      activity: 'Client Consultation',
      description: 'Discussed bail application strategy with client.',
      duration: '00:45:30',
      hourlyRate: 5000,
      isBillable: true,
      date: 'Oct 14, 2026'
    },
    {
      id: 'LOG-003',
      caseTitle: 'TechFlow SMC (Corporate Retainer)',
      activity: 'Travel Time',
      description: 'Travel to High Court for hearing.',
      duration: '01:00:00',
      hourlyRate: 2000,
      isBillable: false,
      date: 'Oct 13, 2026'
    }
  ]);

  // Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerState === 'running') {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerState]);

  // Formatting Time
  const formatTime = (totalSeconds: number) => {
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const secs = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${secs}`;
  };

  // Timer Controls
  const handleStart = () => {
    if (!selectedCase || !selectedActivity) {
      alert("Please select a Case and Activity type before starting the timer.");
      return;
    }
    setTimerState('running');
  };

  const handlePause = () => {
    setTimerState('paused');
  };

  const handleStop = () => {
    if (seconds > 0) {
      const newLog: TimeLog = {
        id: `LOG-${Date.now()}`,
        caseTitle: selectedCase,
        activity: selectedActivity,
        description: description || 'No description provided.',
        duration: formatTime(seconds),
        hourlyRate: hourlyRate,
        isBillable: isBillable,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
      };
      
      setLogs([newLog, ...logs]);
    }
    
    // Reset Timer
    setTimerState('idle');
    setSeconds(0);
    setSelectedCase('');
    setSelectedActivity('');
    setDescription('');
  };

  const toggleBillableStatus = (id: string) => {
    setLogs(logs.map(log => 
      log.id === id ? { ...log, isBillable: !log.isBillable } : log
    ));
  };

  const deleteLog = (id: string) => {
    setLogs(logs.filter(log => log.id !== id));
  };

  // Derived calculations for summary
  const totalUnbilled = logs
    .filter(log => log.isBillable)
    .reduce((total, log) => {
      const [h, m, s] = log.duration.split(':').map(Number);
      const hoursDecimal = h + (m / 60) + (s / 3600);
      return total + (hoursDecimal * log.hourlyRate);
    }, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-4 md:p-8 text-slate-900 dark:text-slate-100 pb-24">
      
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-6">
        <Link href="/dashboard/billing" className="hover:text-blue-600 transition-colors">Billing & Finance</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-slate-900 dark:text-slate-200 font-medium">Time Tracker</span>
      </div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Time Tracking & Timesheet</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Log your billable hours and convert them into invoices seamlessly.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Column: Timer Widget & Summary */}
        <div className="xl:col-span-1 space-y-6">
          
          {/* Live Stop-Watch Timer Widget */}
          <div className={`rounded-xl border shadow-sm p-6 transition-all duration-300 ${
            timerState === 'running' 
              ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 ring-1 ring-blue-500' 
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
          }`}>
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Clock className={`w-5 h-5 ${timerState === 'running' ? 'text-blue-600 animate-pulse' : 'text-slate-400'}`} />
              Live Timer
            </h2>

            <div className="flex justify-center mb-8">
              <div className="text-5xl md:text-6xl font-mono font-black text-slate-900 dark:text-white tracking-wider tabular-nums">
                {formatTime(seconds)}
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Select Case</label>
                <select 
                  value={selectedCase}
                  onChange={(e) => setSelectedCase(e.target.value)}
                  disabled={timerState !== 'idle'}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-blue-500 outline-none disabled:opacity-50"
                >
                  <option value="">Choose a case...</option>
                  {mockCases.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Activity</label>
                  <select 
                    value={selectedActivity}
                    onChange={(e) => setSelectedActivity(e.target.value)}
                    disabled={timerState !== 'idle'}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-blue-500 outline-none disabled:opacity-50"
                  >
                    <option value="">Select...</option>
                    {mockActivities.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Rate (Rs/hr)</label>
                  <input 
                    type="number" 
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(parseInt(e.target.value) || 0)}
                    disabled={timerState !== 'idle'}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Description</label>
                <input 
                  type="text" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What are you working on?"
                  disabled={timerState !== 'idle'}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none disabled:opacity-50"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input 
                  type="checkbox" 
                  id="billableCheck"
                  checked={isBillable}
                  onChange={(e) => setIsBillable(e.target.checked)}
                  disabled={timerState !== 'idle'}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
                />
                <label htmlFor="billableCheck" className="text-sm font-medium">This time is billable</label>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {timerState === 'idle' || timerState === 'paused' ? (
                <button 
                  onClick={handleStart}
                  className="col-span-3 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Play className="w-5 h-5 fill-current" /> 
                  {timerState === 'paused' ? 'Resume Timer' : 'Start Timer'}
                </button>
              ) : (
                <button 
                  onClick={handlePause}
                  className="col-span-2 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Pause className="w-5 h-5 fill-current" /> Pause
                </button>
              )}
              
              {timerState !== 'idle' && (
                <button 
                  onClick={handleStop}
                  className={`py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center shadow-sm ${timerState === 'running' ? 'col-span-1' : 'col-span-3 gap-2'}`}
                >
                  <Square className="w-5 h-5 fill-current" />
                  {timerState === 'paused' && 'Stop & Save Log'}
                </button>
              )}
            </div>
          </div>

          {/* Unbilled Summary Card */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 text-center">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Unbilled Amount</h3>
            <div className="text-3xl font-black text-slate-900 dark:text-white mb-6">
              Rs. {Math.round(totalUnbilled).toLocaleString()}
            </div>
            <button className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white dark:bg-blue-600 dark:hover:bg-blue-700 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
              <Receipt className="w-4 h-4" /> Convert to Invoice
            </button>
          </div>

        </div>

        {/* Right Column: Timesheet Log Table */}
        <div className="xl:col-span-2">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <FileBox className="w-5 h-5 text-blue-600" />
                Daily Timesheet
              </h2>
              <button className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                <Plus className="w-4 h-4" /> Manual Entry
              </button>
            </div>
            
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                    <th className="p-4 font-semibold">Case & Activity</th>
                    <th className="p-4 font-semibold">Description</th>
                    <th className="p-4 font-semibold text-center">Duration</th>
                    <th className="p-4 font-semibold text-center">Billable</th>
                    <th className="p-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                      <td className="p-4">
                        <p className="font-semibold text-sm text-slate-900 dark:text-white truncate max-w-[200px]" title={log.caseTitle}>
                          {log.caseTitle}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">{log.activity} • {log.date}</p>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-slate-600 dark:text-slate-300 truncate max-w-[250px]" title={log.description}>
                          {log.description}
                        </p>
                      </td>
                      <td className="p-4 text-center">
                        <span className="font-mono font-bold text-sm bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                          {log.duration}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <button 
                          onClick={() => toggleBillableStatus(log.id)}
                          className="inline-flex items-center justify-center transition-colors"
                          title={log.isBillable ? "Mark as Non-billable" : "Mark as Billable"}
                        >
                          {log.isBillable ? (
                            <ToggleRight className="w-8 h-8 text-emerald-500" />
                          ) : (
                            <ToggleLeft className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                          )}
                        </button>
                      </td>
                      <td className="p-4 text-right">
                        <button 
                          onClick={() => deleteLog(log.id)}
                          className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {logs.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-12 text-center text-slate-500">
                        No time logs found. Start the timer to track your work.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}