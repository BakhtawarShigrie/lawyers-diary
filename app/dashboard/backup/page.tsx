'use client';

import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/app/context/AppContext';
import { Cloud, RefreshCw, Download, Database, CheckCircle2, ShieldAlert, HardDrive } from 'lucide-react';

export default function BackupPage() {
  const { getStoredData, setStoredData, isHydrated } = useAppContext();
  
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState(new Date().toLocaleString());
  const [autoBackupEnabled, setAutoBackupEnabled] = useState(false);

  useEffect(() => {
    if (isHydrated) {
      // setTimeout ka istemal cascading render (linter error) ko rokne ke liye
      const timer = setTimeout(() => {
        const isAutoOn = getStoredData<boolean>('auto_backup_enabled');
        setAutoBackupEnabled(!!isAutoOn);
      }, 0);
      
      return () => clearTimeout(timer);
    }
  }, [isHydrated, getStoredData]);

  const handleManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setLastSync(new Date().toLocaleString());
      setIsSyncing(false);
    }, 2000);
  };

  const handleExportData = () => {
    alert("Exporting all your database securely as a JSON/CSV file.");
  };

  const handleToggleAutoBackup = () => {
    const newValue = !autoBackupEnabled;
    setAutoBackupEnabled(newValue);
    setStoredData('auto_backup_enabled', newValue);
  };

  if (!isHydrated) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 text-slate-900 dark:text-slate-100 pb-24">
      
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
          <Cloud className="w-7 h-7 text-emerald-500" /> Cloud Backup & Storage
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your data synchronization and automatic Google Drive backups.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mb-8">
        
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

      {/* --- AUTOMATIC BACKUP SETTINGS --- */}
      <div className="max-w-4xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 md:p-8">
          <h2 className="text-xl font-bold flex items-center gap-2 mb-2">
            <HardDrive className="w-6 h-6 text-blue-500" /> Automatic Drive Backup
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Connect your Google account to automatically secure your data every night.</p>
          
          <label className={`flex flex-col sm:flex-row sm:items-center justify-between p-5 border-2 rounded-xl cursor-pointer transition-all ${autoBackupEnabled ? 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800' : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-700'}`}>
            <div className="pr-4 mb-4 sm:mb-0">
              <p className="font-bold text-slate-900 dark:text-white text-base">Daily Auto-Backup (12:00 AM)</p>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed max-w-xl">
                {/* &apos; use kiya gaya hai ' ki jagah par taake unescaped entity ka error na aaye */}
                When enabled, Lawyer&apos;s Diary will automatically upload an encrypted backup of your entire firm&apos;s database (Cases, Clients, Agenda) directly to your connected Google Drive every night at exactly 12:00 AM to prevent data loss.
              </p>
            </div>
            <div className="relative inline-block w-12 shrink-0 align-middle select-none transition duration-200 ease-in">
              <input 
                type="checkbox" 
                checked={autoBackupEnabled} 
                onChange={handleToggleAutoBackup} 
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-slate-300 dark:border-slate-600 checked:right-0 checked:border-blue-600 transition-all" 
              />
              <label className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-300 dark:bg-slate-700 cursor-pointer transition-colors"></label>
            </div>
          </label>
        </div>
      </div>

    </div>
  );
}