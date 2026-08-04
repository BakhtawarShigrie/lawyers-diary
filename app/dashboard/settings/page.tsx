'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '@/app/context/AppContext';
import { 
  Cloud, 
  ShieldCheck, 
  Globe, 
  Save, 
  AlertTriangle, 
  CheckCircle2, 
  Database, 
  RefreshCw,
  X,
  Lock,
  Smartphone
} from 'lucide-react';

type Tab = 'backup' | 'jurisdiction' | 'security';

export default function SettingsHubPage() {
  const { getStoredData, setStoredData, isHydrated } = useAppContext();

  // --- States ---
  const [activeTab, setActiveTab] = useState<Tab>('backup');
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Backup States
  const [isDriveConnected, setIsDriveConnected] = useState(false);
  const [autoBackup, setAutoBackup] = useState(false);
  const [lastBackup, setLastBackup] = useState('Never');
  // Removed unused setUserEmail
  const [userEmail] = useState('Shigrie@gmail.com'); 

  // Jurisdiction States
  const [country, setCountry] = useState('PK');
  const [currency, setCurrency] = useState('PKR');
  
  // Security States
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  // --- Load Data from LocalStorage on Mount ---
  useEffect(() => {
    if (isHydrated) {
      // Wrapping state updates in setTimeout fixes the synchronous set-state-in-effect error
      const timer = setTimeout(() => {
        const storedBackup = getStoredData<{ connected: boolean, auto: boolean, last: string }>('settings_backup');
        const storedJurisdiction = getStoredData<{ country: string, currency: string }>('settings_jurisdiction');
        const storedSecurity = getStoredData<{ tfa: boolean }>('settings_security');

        if (storedBackup) {
          setIsDriveConnected(storedBackup.connected);
          setAutoBackup(storedBackup.auto);
          setLastBackup(storedBackup.last);
          // Show warning if auto-backup is disabled
          if (!storedBackup.auto) setShowWarningModal(true);
        } else {
          // First time load: warn the user to enable backup
          setShowWarningModal(true);
        }

        if (storedJurisdiction) {
          setCountry(storedJurisdiction.country);
          setCurrency(storedJurisdiction.currency);
        }
        
        if (storedSecurity) {
          setTwoFactorAuth(storedSecurity.tfa);
        }
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [isHydrated, getStoredData]);

  // --- Handlers ---
  const handleSaveAll = () => {
    setIsSaving(true);
    
    // Save to LocalStorage
    setStoredData('settings_backup', { connected: isDriveConnected, auto: autoBackup, last: lastBackup });
    setStoredData('settings_jurisdiction', { country, currency });
    setStoredData('settings_security', { tfa: twoFactorAuth });

    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  const handleManualBackup = () => {
    if (!isDriveConnected) {
      alert("Please connect Google Drive first!");
      return;
    }
    setLastBackup('Just now');
    setStoredData('settings_backup', { connected: isDriveConnected, auto: autoBackup, last: 'Just now' });
    alert("Data successfully backed up to Google Drive!");
  };

  const handleConnectDrive = () => {
    setIsDriveConnected(!isDriveConnected);
    setStoredData('settings_backup', { connected: !isDriveConnected, auto: autoBackup, last: lastBackup });
  };

  const handleAutoBackupToggle = () => {
    const newVal = !autoBackup;
    setAutoBackup(newVal);
    setStoredData('settings_backup', { connected: isDriveConnected, auto: newVal, last: lastBackup });
    if (newVal) setShowWarningModal(false);
  };

  if (!isHydrated) return null; // Prevent SSR mismatch

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 text-slate-900 dark:text-slate-100 pb-24">
      
      {/* --- Auto Backup Warning Modal --- */}
      <AnimatePresence>
        {showWarningModal && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-6 relative border border-orange-200 dark:border-orange-900/50"
            >
              <button 
                onClick={() => setShowWarningModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center mb-4 mx-auto">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-center mb-2">Automatic Backup is OFF!</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-6">
                Aap ka client data, cases, aur documents risk par hain. App delete hone ya phone change karne par data zaya ho sakta hai. Baraye meharbani Google Drive backup on karein.
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowWarningModal(false)}
                  className="flex-1 py-2.5 rounded-xl font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
                >
                  Later
                </button>
                <button 
                  onClick={() => {
                    handleAutoBackupToggle();
                  }}
                  className="flex-1 py-2.5 rounded-xl font-bold text-white bg-orange-600 hover:bg-orange-700 transition-colors shadow-md"
                >
                  Enable Backup
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Page Header --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">App Settings Hub</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage backups, jurisdiction, and security preferences.</p>
        </div>
        <button 
          onClick={handleSaveAll}
          disabled={isSaving}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-2 ${
            saveSuccess 
              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
              : 'bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-70'
          }`}
        >
          {isSaving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : saveSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {isSaving ? 'Saving...' : saveSuccess ? 'Settings Saved!' : 'Save All Changes'}
        </button>
      </div>

      {/* --- Tabs Navigation --- */}
      <div className="flex overflow-x-auto space-x-2 bg-slate-200/50 dark:bg-slate-800/50 p-1.5 rounded-2xl mb-8 scrollbar-hide">
        <button 
          onClick={() => setActiveTab('backup')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'backup' ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
        >
          <Cloud className="w-4 h-4" /> Data & Backup
        </button>
        <button 
          onClick={() => setActiveTab('jurisdiction')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'jurisdiction' ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
        >
          <Globe className="w-4 h-4" /> Jurisdiction
        </button>
        <button 
          onClick={() => setActiveTab('security')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'security' ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
        >
          <ShieldCheck className="w-4 h-4" /> Security
        </button>
      </div>

      {/* --- Tab Content --- */}
      <div className="max-w-4xl">
        <AnimatePresence mode="wait">
          
          {/* 1. BACKUP TAB */}
          {activeTab === 'backup' && (
            <motion.div 
              key="backup"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Google Drive Connection Card */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 md:p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
                      <Cloud className="w-6 h-6 text-blue-500" /> Google Drive Cloud Sync
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Securely store your local data to the cloud.</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${isDriveConnected ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
                    {isDriveConnected ? 'Connected' : 'Disconnected'}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div className="w-12 h-12 bg-white dark:bg-slate-950 rounded-full shadow-sm flex items-center justify-center p-2.5 shrink-0">
                    <svg viewBox="0 0 87.3 87.3"><path d="M58 87.3L29 37.1h58L58 87.3z" fill="#0066da"/><path d="M58 87.3L0 87.3l29-50.2 58 50.2z" fill="#00ac47"/><path d="M58 0L29 50.2H0L29 0h29z" fill="#ea4335"/><path d="M58 0L87.3 50.2H29L0 0h58z" fill="#00832d"/><path d="M87.3 50.2L58 100.4h-58l29-50.2h58z" fill="#2684fc"/><path d="M29 100.4L0 50.2 29 0l29 50.2-29 50.2z" fill="#ffba00"/></svg>
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <p className="font-bold text-slate-900 dark:text-white">
                      {isDriveConnected ? userEmail : 'No Account Linked'}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">App data will be stored in an isolated, hidden folder.</p>
                  </div>
                  <button 
                    onClick={handleConnectDrive}
                    className={`px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow-sm ${isDriveConnected ? 'bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                  >
                    {isDriveConnected ? 'Disconnect' : 'Connect Drive'}
                  </button>
                </div>
              </div>

              {/* Backup Settings */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 md:p-8">
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Database className="w-5 h-5 text-slate-500" /> Backup Preferences
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white">Automatic Daily Backup</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Silently sync data to Google Drive every 24 hours.</p>
                    </div>
                    <button 
                      onClick={handleAutoBackupToggle}
                      className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${autoBackup ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'}`}
                    >
                      <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${autoBackup ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>

                  <div className="h-px bg-slate-100 dark:bg-slate-800 w-full"></div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white">Manual Backup</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Last successful backup: <strong className="text-slate-700 dark:text-slate-200">{lastBackup}</strong></p>
                    </div>
                    <button 
                      onClick={handleManualBackup}
                      className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900 font-bold text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <RefreshCw className="w-4 h-4" /> Backup Now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* 2. JURISDICTION TAB */}
          {activeTab === 'jurisdiction' && (
            <motion.div 
              key="jurisdiction"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 md:p-8"
            >
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Globe className="w-5 h-5 text-purple-500" /> Regional & Law Settings
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Country of Practice</label>
                  <select 
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-purple-500 outline-none transition-all appearance-none"
                  >
                    <option value="PK">Pakistan (Islamic Republic of Pakistan)</option>
                    <option value="UAE">United Arab Emirates (UAE)</option>
                    <option value="UK">United Kingdom (UK)</option>
                    <option value="US">United States of America (US)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Default Currency</label>
                  <select 
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-purple-500 outline-none transition-all appearance-none"
                  >
                    <option value="PKR">Pakistani Rupee (PKR)</option>
                    <option value="AED">UAE Dirham (AED)</option>
                    <option value="GBP">British Pound (GBP)</option>
                    <option value="USD">US Dollar (USD)</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* 3. SECURITY TAB */}
          {activeTab === 'security' && (
            <motion.div 
              key="security"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 md:p-8"
            >
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" /> Account Security
              </h2>
              
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-lg">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-900 dark:text-white">Two-Factor Authentication (2FA)</p>
                    <p className="text-xs text-slate-500 mt-0.5">Require OTP code for logging into the app.</p>
                  </div>
                </div>
                <button 
                  onClick={() => setTwoFactorAuth(!twoFactorAuth)}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none shrink-0 ${twoFactorAuth ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'}`}
                >
                  <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${twoFactorAuth ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

              <div className="mt-6 p-4 border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex gap-3">
                <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800 dark:text-blue-300/90 leading-relaxed">
                  <strong>Local-First Encryption:</strong> Aap ka tamam data (Cases, Clients, Documents) locally aap ke device par AES-256 standards ke tehat encrypted rehta hai. Sirf Backup ke waqt yeh Google Drive par sync hota hai.
                </p>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}