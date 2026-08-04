'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAppContext } from '@/app/context/AppContext';
import { ChevronRight, Clock, Play, Square, Save, FileText } from 'lucide-react';

interface TimeLogItem {
  id: string;
  task: string;
  caseId: string;
  duration: string; // HH:MM:SS
  date: string;
}

export default function TimeTrackerPage() {
  const { getStoredData, setStoredData, isHydrated } = useAppContext();
  
  // Stopwatch States
  const [time, setTime] = useState(0); // in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [task, setTask] = useState('');
  const [caseId, setCaseId] = useState('');
  
  // Logs State
  const [logs, setLogs] = useState<TimeLogItem[]>([]);

  useEffect(() => {
    if (isHydrated) {
      const timer = setTimeout(() => {
        const storedLogs = getStoredData<TimeLogItem[]>('lawyer_time_logs') || [];
        setLogs(storedLogs);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isHydrated, getStoredData]);

  // Stopwatch Logic
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isRunning) {
      intervalId = setInterval(() => setTime(prevTime => prevTime + 1), 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const getSeconds = `0${seconds % 60}`.slice(-2);
    const minutes = Math.floor(seconds / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(seconds / 3600)}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  const handleToggleTimer = () => {
    if (!task) {
      alert("Please enter a task description before starting the timer.");
      return;
    }
    setIsRunning(!isRunning);
  };

  const handleSaveLog = () => {
    if (time === 0) return;
    
    const newLog: TimeLogItem = {
      id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
      task,
      caseId: caseId || 'General',
      duration: formatTime(time),
      date: new Date().toLocaleDateString()
    };

    const updatedLogs = [newLog, ...logs];
    setStoredData('lawyer_time_logs', updatedLogs);
    setLogs(updatedLogs);

    // Reset Timer
    setIsRunning(false);
    setTime(0);
    setTask('');
    setCaseId('');
  };

  if (!isHydrated) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 text-slate-900 dark:text-slate-100 pb-24">
      
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-6">
        <Link href="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <Link href="/dashboard/billing" className="hover:text-blue-600 transition-colors">Billing</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-slate-900 dark:text-slate-200 font-medium">Time Tracker</span>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Time & Billable Hours</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Track billable hours to automatically include in your invoices.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        
        {/* Stopwatch Card */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 text-center sticky top-24">
            <h2 className="text-lg font-bold mb-6 flex items-center justify-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" /> Stopwatch
            </h2>
            
            <div className={`text-5xl font-mono font-black mb-8 tracking-wider ${isRunning ? 'text-blue-600 dark:text-blue-400 animate-pulse' : 'text-slate-900 dark:text-white'}`}>
              {formatTime(time)}
            </div>

            <div className="space-y-4 mb-8 text-left">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Task Description</label>
                <input type="text" disabled={isRunning} value={task} onChange={e => setTask(e.target.value)} placeholder="What are you working on?" className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Case ID (Optional)</label>
                <input type="text" disabled={isRunning} value={caseId} onChange={e => setCaseId(e.target.value)} placeholder="CAS-XXXX" className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50" />
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={handleToggleTimer}
                className={`flex-1 py-3 rounded-xl font-bold text-white transition-all shadow-md flex items-center justify-center gap-2 ${isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-emerald-500 hover:bg-emerald-600'}`}
              >
                {isRunning ? <><Square className="w-5 h-5 fill-current" /> Stop</> : <><Play className="w-5 h-5 fill-current" /> Start</>}
              </button>
              
              {!isRunning && time > 0 && (
                <button 
                  onClick={handleSaveLog}
                  className="flex-1 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" /> Save Log
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Logs History */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2"><FileText className="w-5 h-5 text-purple-500" /> Recent Time Logs</h2>
            
            <div className="space-y-4">
              {logs.length > 0 ? (
                logs.map(log => (
                  <div key={log.id} className="p-4 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white">{log.task}</h3>
                      <p className="text-xs font-semibold text-slate-500 mt-1">{log.caseId} • {log.date}</p>
                    </div>
                    <div className="px-4 py-2 bg-slate-200 dark:bg-slate-900 rounded-lg font-mono font-bold text-slate-700 dark:text-slate-300">
                      {log.duration}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-slate-500">
                  <Clock className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-700 mb-3" />
                  <p className="font-semibold">No time logs recorded yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}