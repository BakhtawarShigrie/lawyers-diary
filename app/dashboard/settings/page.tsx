'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '@/app/context/AppContext';
import { 
  Building2, MapPin, Scale, User, Mail, Phone, 
  Save, ShieldCheck, Map, Briefcase, Bell, 
  Lock, KeyRound, ShieldAlert, Unlock
} from 'lucide-react';

// --- Types ---
interface LawyerSettings {
  firmName?: string;
  lawyerName?: string;
  email?: string;
  phone?: string;
  province?: string;
  city?: string;
  defaultCourt?: string;
  practiceAreas?: string;
  emailNotifs?: boolean;
  smsNotifs?: boolean;
  twoFactorAuth?: boolean;
}

export default function UnifiedSettingsPage() {
  const { getStoredData, setStoredData, isHydrated } = useAppContext();
  
  // Tabs order updated: profile -> security -> jurisdiction -> notifications
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'jurisdiction' | 'notifications'>('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // --- General Profile States ---
  const [firmName, setFirmName] = useState('Adv. Shigrie Law Associates');
  const [lawyerName, setLawyerName] = useState('Adv. Shigrie');
  const [email, setEmail] = useState('Shigrie@gmail.com');
  const [phone, setPhone] = useState('+92 300 1234567');
  
  // --- Jurisdiction States ---
  const [province, setProvince] = useState('Punjab');
  const [city, setCity] = useState('Lahore');
  const [defaultCourt, setDefaultCourt] = useState('Lahore High Court');
  const [practiceAreas, setPracticeAreas] = useState('Criminal Defense, Civil Litigation');

  // --- Security States (Change Passcode) ---
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  // --- Security States (Forget Passcode) ---
  const [isForgetOtpSent, setIsForgetOtpSent] = useState(false);
  const [forgetOtp, setForgetOtp] = useState('');
  const [forgetNewPassword, setForgetNewPassword] = useState('');
  const [forgetConfirmPassword, setForgetConfirmPassword] = useState('');
  const [forgetMessage, setForgetMessage] = useState('');

  // --- Notification States ---
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(false);

  useEffect(() => {
    if (isHydrated) {
      const timer = setTimeout(() => {
        const storedSettings = getStoredData<LawyerSettings>('lawyer_settings') || {};
        
        if (storedSettings.firmName) setFirmName(storedSettings.firmName);
        if (storedSettings.lawyerName) setLawyerName(storedSettings.lawyerName);
        if (storedSettings.email) setEmail(storedSettings.email);
        if (storedSettings.phone) setPhone(storedSettings.phone);
        
        if (storedSettings.province) setProvince(storedSettings.province);
        if (storedSettings.city) setCity(storedSettings.city);
        if (storedSettings.defaultCourt) setDefaultCourt(storedSettings.defaultCourt);
        if (storedSettings.practiceAreas) setPracticeAreas(storedSettings.practiceAreas);
        
        if (storedSettings.twoFactorAuth !== undefined) setTwoFactorAuth(storedSettings.twoFactorAuth);
        
        if (storedSettings.emailNotifs !== undefined) setEmailNotifs(storedSettings.emailNotifs);
        if (storedSettings.smsNotifs !== undefined) setSmsNotifs(storedSettings.smsNotifs);
      }, 0);
      
      return () => clearTimeout(timer);
    }
  }, [isHydrated, getStoredData]);

  // Handle Main Settings Save
  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setStoredData<LawyerSettings>('lawyer_settings', { 
        firmName, lawyerName, email, phone, 
        province, city, defaultCourt, practiceAreas,
        emailNotifs, smsNotifs, twoFactorAuth
      });
      setIsSaving(false);
      setSaveMessage('All settings saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    }, 800);
  };

  // --- 1. Normal Change Passcode Logic (No OTP) ---
  const handleChangePassword = () => {
    if (!currentPassword) {
      setPasswordMessage('Please enter your current passcode.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMessage('New passcodes do not match!');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordMessage('Passcode must be at least 6 characters.');
      return;
    }
    
    // Simulate direct save
    setPasswordMessage('Passcode updated successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPasswordMessage(''), 4000);
  };

  // --- 2. Forget Passcode Logic (With OTP) ---
  const handleSendForgetOtp = () => {
    setForgetMessage('');
    setIsForgetOtpSent(true);
  };

  const handleVerifyForgetOtp = () => {
    if (forgetOtp.length < 4) {
      setForgetMessage('Please enter a valid OTP.');
      return;
    }
    if (forgetNewPassword !== forgetConfirmPassword) {
      setForgetMessage('New passcodes do not match!');
      return;
    }
    if (forgetNewPassword.length < 6) {
      setForgetMessage('Passcode must be at least 6 characters.');
      return;
    }

    // Simulate OTP Verification & Save
    setTimeout(() => {
      setIsForgetOtpSent(false);
      setForgetOtp('');
      setForgetNewPassword('');
      setForgetConfirmPassword('');
      setForgetMessage('Passcode recovered and updated successfully!');
      setTimeout(() => setForgetMessage(''), 4000);
    }, 1000);
  };

  if (!isHydrated) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 text-slate-900 dark:text-slate-100 pb-24">
      
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Platform Settings</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your firm profile, security, jurisdiction, and notifications.</p>
      </div>

      <div className="max-w-5xl flex flex-col md:flex-row gap-8">
        
        {/* --- Sidebar Tabs (Reordered) --- */}
        <div className="w-full md:w-64 shrink-0 space-y-2">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${activeTab === 'profile' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800'}`}
          >
            <User className="w-5 h-5" /> General Profile
          </button>
          
          <button 
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${activeTab === 'security' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800'}`}
          >
            <Lock className="w-5 h-5" /> Security
          </button>

          <button 
            onClick={() => setActiveTab('jurisdiction')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${activeTab === 'jurisdiction' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800'}`}
          >
            <Scale className="w-5 h-5" /> Jurisdiction & Courts
          </button>
          
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${activeTab === 'notifications' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800'}`}
          >
            <Bell className="w-5 h-5" /> Notifications
          </button>
        </div>

        {/* --- Settings Content Area --- */}
        <div className="flex-1">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
            
            <div className="p-6 md:p-8 min-h-100 flex-1">
              <AnimatePresence mode="wait">
                
                {/* 1. Profile Tab */}
                {activeTab === 'profile' && (
                  <motion.div 
                    key="profile"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <h2 className="text-xl font-bold flex items-center gap-2 mb-6"><Building2 className="w-5 h-5 text-blue-500" /> Firm Details</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Law Firm Name</label>
                        <input type="text" value={firmName} onChange={e => setFirmName(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Primary Lawyer Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                          <input type="text" value={lawyerName} onChange={e => setLawyerName(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                          <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                          <input type="text" value={phone} onChange={e => setPhone(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 2. Security Tab (Reordered to 2nd position) */}
                {activeTab === 'security' && (
                  <motion.div 
                    key="security"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="space-y-10"
                  >
                    {/* A. Change Passcode (Direct, no OTP) */}
                    <div>
                      <h2 className="text-xl font-bold flex items-center gap-2 mb-6"><KeyRound className="w-5 h-5 text-emerald-500" /> Change Passcode</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Current Passcode</label>
                          <input type="password" placeholder="Enter current passcode" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">New Passcode</label>
                          <input type="password" placeholder="Min 6 characters" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Confirm Passcode</label>
                          <input type="password" placeholder="Repeat new passcode" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500" />
                        </div>
                        <div className="md:col-span-2 flex items-center justify-between mt-2">
                          <span className={`text-sm font-semibold ${passwordMessage.includes('success') ? 'text-emerald-500' : 'text-red-500'}`}>{passwordMessage}</span>
                          <button type="button" onClick={handleChangePassword} className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-sm">
                            Update Passcode
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* B. Forget Passcode (With OTP) */}
                    <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
                      <h2 className="text-xl font-bold flex items-center gap-2 mb-6"><Unlock className="w-5 h-5 text-orange-500" /> Forget Passcode?</h2>
                      
                      {!isForgetOtpSent ? (
                        <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/30 rounded-2xl gap-4">
                          <div>
                            <h3 className="font-bold text-orange-900 dark:text-orange-400">Reset via Email Verification</h3>
                            <p className="text-sm text-orange-800 dark:text-orange-300 mt-1">If you have forgotten your current passcode, we can send a One-Time Password (OTP) to <strong>{email}</strong> to help you reset it safely.</p>
                            {forgetMessage && <p className="text-emerald-600 dark:text-emerald-400 font-bold text-sm mt-2">{forgetMessage}</p>}
                          </div>
                          <button type="button" onClick={handleSendForgetOtp} className="w-full sm:w-auto px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition-all shadow-sm shrink-0">
                            Send OTP
                          </button>
                        </div>
                      ) : (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-6">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-full text-orange-600 dark:text-orange-400">
                              <ShieldAlert className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 dark:text-white">OTP sent to {email}</p>
                              <p className="text-xs text-slate-500">Please enter the 6-digit code and your new passcode below.</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Enter OTP</label>
                              <input type="text" placeholder="123456" value={forgetOtp} onChange={e => setForgetOtp(e.target.value)} className="w-full md:w-1/2 px-4 py-3 tracking-widest font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500" />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">New Passcode</label>
                              <input type="password" placeholder="Min 6 characters" value={forgetNewPassword} onChange={e => setForgetNewPassword(e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500" />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Confirm Passcode</label>
                              <input type="password" placeholder="Repeat new passcode" value={forgetConfirmPassword} onChange={e => setForgetConfirmPassword(e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500" />
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
                            <span className="text-sm font-semibold text-red-500">{forgetMessage}</span>
                            <div className="flex gap-3">
                              <button type="button" onClick={() => setIsForgetOtpSent(false)} className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl transition-all">Cancel</button>
                              <button type="button" onClick={handleVerifyForgetOtp} className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition-all shadow-sm">Verify & Reset</button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* C. Two-Step Authentication */}
                    <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
                      <h2 className="text-xl font-bold flex items-center gap-2 mb-6"><Lock className="w-5 h-5 text-blue-500" /> Two-Step Authentication</h2>
                      
                      <label className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer">
                        <div className="pr-4">
                          <p className="font-bold text-sm text-slate-900 dark:text-white">Enable 2FA (Recommended)</p>
                          <p className="text-xs text-slate-500 mt-1 leading-relaxed">Add an extra layer of security to your account. When logging in, you&apos;ll need to provide an OTP sent to your registered email.</p>
                        </div>
                        <div className="relative inline-block w-12 shrink-0 align-middle select-none transition duration-200 ease-in">
                          <input type="checkbox" checked={twoFactorAuth} onChange={() => setTwoFactorAuth(!twoFactorAuth)} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-slate-300 dark:border-slate-600 checked:right-0 checked:border-blue-600 transition-all" />
                          <label className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-300 dark:bg-slate-700 cursor-pointer transition-colors"></label>
                        </div>
                      </label>
                    </div>
                  </motion.div>
                )}

                {/* 3. Jurisdiction Tab (Reordered to 3rd position) */}
                {activeTab === 'jurisdiction' && (
                  <motion.div 
                    key="jurisdiction"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <h2 className="text-xl font-bold flex items-center gap-2 mb-6"><Scale className="w-5 h-5 text-purple-500" /> Jurisdiction Defaults</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Province / State</label>
                        <div className="relative">
                          <Map className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                          <select value={province} onChange={e => setProvince(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none appearance-none focus:ring-2 focus:ring-purple-500">
                            <option value="Punjab">Punjab</option>
                            <option value="Sindh">Sindh</option>
                            <option value="KPK">KPK</option>
                            <option value="Balochistan">Balochistan</option>
                            <option value="Islamabad Capital Territory">Islamabad Capital Territory</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">City</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                          <input type="text" value={city} onChange={e => setCity(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-500" />
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Default Court System</label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                          <select value={defaultCourt} onChange={e => setDefaultCourt(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none appearance-none focus:ring-2 focus:ring-purple-500">
                            <option value="Lahore High Court">Lahore High Court</option>
                            <option value="Islamabad High Court">Islamabad High Court</option>
                            <option value="Sindh High Court">Sindh High Court</option>
                            <option value="District & Sessions Court">District & Sessions Court</option>
                            <option value="Supreme Court of Pakistan">Supreme Court of Pakistan</option>
                          </select>
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Key Practice Areas</label>
                        <div className="relative">
                          <Briefcase className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                          <input type="text" value={practiceAreas} onChange={e => setPracticeAreas(e.target.value)} placeholder="e.g. Corporate Law, Civil Litigation" className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-500" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 4. Notifications Tab */}
                {activeTab === 'notifications' && (
                  <motion.div 
                    key="notifications"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <h2 className="text-xl font-bold flex items-center gap-2 mb-6"><Bell className="w-5 h-5 text-orange-500" /> Alert Preferences</h2>
                    
                    <div className="space-y-4">
                      <label className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer">
                        <div>
                          <p className="font-bold text-sm">Email Notifications</p>
                          <p className="text-xs text-slate-500">Receive hearing reminders and daily agenda via email.</p>
                        </div>
                        <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                          <input type="checkbox" checked={emailNotifs} onChange={() => setEmailNotifs(!emailNotifs)} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-slate-300 dark:border-slate-600 checked:right-0 checked:border-blue-600" />
                          <label className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-300 dark:bg-slate-700 cursor-pointer"></label>
                        </div>
                      </label>

                      <label className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer">
                        <div>
                          <p className="font-bold text-sm">SMS Alerts</p>
                          <p className="text-xs text-slate-500">Get immediate text messages for urgent client updates.</p>
                        </div>
                        <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                          <input type="checkbox" checked={smsNotifs} onChange={() => setSmsNotifs(!smsNotifs)} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-slate-300 dark:border-slate-600 checked:right-0 checked:border-blue-600" />
                          <label className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-300 dark:bg-slate-700 cursor-pointer"></label>
                        </div>
                      </label>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* --- Save Footer (Hide on Security Tab to prevent confusion with password buttons) --- */}
            {activeTab !== 'security' && (
              <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
                <div className="h-6">
                  {saveMessage && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-emerald-600 dark:text-emerald-400 font-bold text-sm flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5" /> {saveMessage}
                    </motion.span>
                  )}
                </div>
                <button type="button" onClick={handleSave} disabled={isSaving} className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70">
                  <Save className="w-4 h-4" /> {isSaving ? 'Saving Changes...' : 'Save Settings'}
                </button>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}