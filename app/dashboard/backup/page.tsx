'use client';

import React, { useState } from 'react';
import { Cloud, RefreshCw, Download, Database, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function BackupPage() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState(new Date().toLocaleString());

  const handleManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setLastSync(new Date().toLocaleString());
      setIsSyncing(false);
    }, 2000);
  };

  const handleExportData = () => {
    alert("Exporting all your database securely as a JSON/CSV file. (Simulation)");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 text-slate-900 dark:text-slate-100 pb-24">
      
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
          <Cloud className="w-7 h-7 text-emerald-500" /> Cloud Backup & Storage
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your data synchronization and download manual backups.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        
        {/* Sync Status Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-4">
              <Database className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold mb-2">Storage Status</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Your files and cases are end-to-end encrypted and synced securely.</p>
            
            <div className="flex items-center gap-2 text-sm font-semibold mb-6">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Last Synced: <span className="text-emerald-600 dark:text-emerald-400">{lastSync}</span></span>
            </div>
          </div>

          <button 
            onClick={handleManualSync}
            disabled={isSyncing}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} /> 
            {isSyncing ? 'Syncing to Cloud...' : 'Sync Now'}
          </button>
        </div>

        {/* Data Export Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center mb-4">
              <Download className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold mb-2">Export Data</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Download a copy of your entire practice database (Cases, Clients, Billing) to your local machine.</p>
            
            <div className="bg-orange-50 dark:bg-orange-900/10 p-4 rounded-xl border border-orange-200 dark:border-orange-900/30 mb-6 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
              <p className="text-xs text-orange-800 dark:text-orange-300 font-medium leading-relaxed">Keep your exported backup file in a secure location. It contains sensitive client information.</p>
            </div>
          </div>

          <button 
            onClick={handleExportData}
            className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" /> Download Backup
          </button>
        </div>

      </div>
    </div>
  );
}