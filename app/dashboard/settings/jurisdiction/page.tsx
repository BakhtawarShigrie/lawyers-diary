'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronRight, 
  Globe, 
  Map, 
  Scale, 
  Languages, 
  DollarSign, 
  Save, 
  ShieldCheck,
  Building2,
  BookOpen,
  CheckCircle2
} from 'lucide-react';

// --- Types & Data Mapping ---
type CountryCode = 'PK' | 'UAE' | 'UK' | 'US';

interface JurisdictionData {
  name: string;
  regions: string[];
  courts: string[];
  defaultLaws: string[];
  currencies: string[];
  languages: string[];
}

const jurisdictionMap: Record<CountryCode, JurisdictionData> = {
  PK: {
    name: 'Pakistan',
    regions: ['Federal', 'Punjab', 'Sindh', 'KPK', 'Balochistan', 'Islamabad Capital Territory'],
    courts: ['Supreme Court', 'High Court', 'District Courts', 'Banking Court', 'Family Court', 'Anti-Terrorism Court'],
    defaultLaws: ['Pakistan Penal Code (PPC)', 'Criminal Procedure Code (CrPC)', 'Civil Procedure Code (CPC)', 'Qanun-e-Shahadat Order'],
    currencies: ['PKR', 'USD'],
    languages: ['English', 'Urdu']
  },
  UAE: {
    name: 'United Arab Emirates',
    regions: ['Dubai (Local Courts)', 'DIFC (Dubai Intl Financial Centre)', 'ADGM (Abu Dhabi Global Market)', 'Sharjah', 'Abu Dhabi (Local Courts)'],
    courts: ['Court of Cassation', 'Court of Appeal', 'Court of First Instance', 'DIFC Courts'],
    defaultLaws: ['UAE Civil Code', 'Commercial Transactions Law', 'Labor Law', 'DIFC Employment Law'],
    currencies: ['AED', 'USD'],
    languages: ['English', 'Arabic']
  },
  UK: {
    name: 'United Kingdom',
    regions: ['England & Wales', 'Scotland', 'Northern Ireland'],
    courts: ['Supreme Court', 'Court of Appeal', 'High Court of Justice', 'Crown Court', 'Magistrates\' Court'],
    defaultLaws: ['Common Law', 'Companies Act 2006', 'Employment Rights Act 1996'],
    currencies: ['GBP', 'EUR', 'USD'],
    languages: ['English']
  },
  US: {
    name: 'United States',
    regions: ['Federal', 'New York', 'California', 'Texas', 'Florida', 'Delaware'],
    courts: ['Supreme Court', 'Federal Court of Appeals', 'District Court', 'State Supreme Court'],
    defaultLaws: ['US Constitution', 'Uniform Commercial Code (UCC)', 'Federal Rules of Civil Procedure (FRCP)'],
    currencies: ['USD'],
    languages: ['English', 'Spanish']
  }
};

export default function JurisdictionSettingsPage() {
  // Form State initialized with default 'PK' values
  const [country, setCountry] = useState<CountryCode>('PK');
  const [region, setRegion] = useState(jurisdictionMap['PK'].regions[0]);
  const [courtSystem, setCourtSystem] = useState(jurisdictionMap['PK'].courts[0]);
  const [currency, setCurrency] = useState(jurisdictionMap['PK'].currencies[0]);
  const [language, setLanguage] = useState(jurisdictionMap['PK'].languages[0]);
  
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const activeJurisdiction = jurisdictionMap[country];

  // Handler to update all dependent fields when country changes directly (no useEffect needed)
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountry = e.target.value as CountryCode;
    const newJurisdiction = jurisdictionMap[newCountry];
    
    setCountry(newCountry);
    setRegion(newJurisdiction.regions[0]);
    setCourtSystem(newJurisdiction.courts[0]);
    setCurrency(newJurisdiction.currencies[0]);
    
    // Prefer English if available in the new country, else pick the first one
    if (newJurisdiction.languages.includes('English')) {
      setLanguage('English');
    } else {
      setLanguage(newJurisdiction.languages[0]);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-4 md:p-8 text-slate-900 dark:text-slate-100 pb-24">
      
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-6">
        <Link href="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-slate-900 dark:text-slate-200 font-medium">Jurisdiction & Regional Settings</span>
      </div>

      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Global Jurisdiction Setup</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Configure your firm&apos;s operating regions, legal codes, and local preferences.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-2 ${
            isSaved 
              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
              : 'bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-70 disabled:cursor-not-allowed'
          }`}
        >
          {isSaving ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : isSaved ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {isSaving ? 'Saving Changes...' : isSaved ? 'Settings Saved!' : 'Save Configurations'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Main Settings) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Card 1: Geography & Region */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50">
              <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-lg font-bold">Base Location & Region</h2>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Country of Practice</label>
                <select 
                  value={country}
                  onChange={handleCountryChange}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none"
                >
                  <option value="PK">Pakistan (Islamic Republic of Pakistan)</option>
                  <option value="UAE">United Arab Emirates (UAE)</option>
                  <option value="UK">United Kingdom (UK)</option>
                  <option value="US">United States of America (US)</option>
                </select>
                <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                  <Map className="w-3.5 h-3.5" /> Sets default templates and compliance rules.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">State / Province / Region</label>
                <select 
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none"
                >
                  {activeJurisdiction.regions.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Card 2: Legal Codes & Courts */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50">
              <Scale className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-lg font-bold">Court System Integration</h2>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Default Court System API Integration</label>
                <select 
                  value={courtSystem}
                  onChange={(e) => setCourtSystem(e.target.value)}
                  className="w-full md:w-1/2 px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none"
                >
                  {activeJurisdiction.courts.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5" /> Used to fetch automated daily cause lists.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <label className="block text-sm font-semibold mb-3 text-slate-700 dark:text-slate-300">Enabled Legal Codes (AI Assistant)</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {activeJurisdiction.defaultLaws.map(law => (
                    <div key={law} className="flex items-center gap-3 p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/30">
                      <div className="w-5 h-5 bg-blue-600 text-white rounded flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{law}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-3 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" /> The AI Legal Assistant is currently trained and grounded on these specific jurisdictional codes.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (Localization & Security) */}
        <div className="space-y-6">
          
          {/* Localization Card */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <h2 className="text-lg font-bold mb-5 pb-4 border-b border-slate-100 dark:border-slate-800">Localization</h2>
            
            <div className="space-y-5">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                  <DollarSign className="w-4 h-4 text-slate-500" /> Default Currency
                </label>
                <select 
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                >
                  {activeJurisdiction.currencies.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                  <Languages className="w-4 h-4 text-slate-500" /> Primary Language
                </label>
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                >
                  {activeJurisdiction.languages.map(l => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Compliance Notice Card */}
          <div className="bg-linear-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 border border-blue-100 dark:border-slate-700 rounded-xl p-6 relative overflow-hidden">
            <ShieldCheck className="w-24 h-24 text-blue-500/10 absolute -top-4 -right-4" />
            <h3 className="font-bold text-blue-900 dark:text-blue-400 mb-2 relative z-10">Data Residency & Compliance</h3>
            <p className="text-sm text-blue-800/80 dark:text-slate-400 leading-relaxed relative z-10 mb-4">
              By selecting <strong>{activeJurisdiction.name}</strong>, your data servers and backup protocols automatically comply with local data protection laws.
            </p>
            <div className="text-xs font-semibold px-3 py-1.5 bg-white dark:bg-slate-950 text-blue-700 dark:text-blue-400 rounded-md inline-block shadow-sm relative z-10">
              Encryption standard: AES-256
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}