'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  Users, 
  UserMinus, 
  Cpu, 
  Search, 
  Filter, 
  MoreVertical, 
  ChevronRight,
  CreditCard,
  MessageSquare,
  Zap,
  CheckCircle2,
  AlertCircle,
  Download,
  Building2,
  Settings2
} from 'lucide-react';

// --- Types & Mock Data ---
interface Subscriber {
  id: string;
  firmName: string;
  owner: string;
  plan: 'Solo Basic' | 'Pro Lawyer' | 'Enterprise';
  status: 'Active' | 'Past Due' | 'Canceled';
  mrr: number;
  nextRenewal: string;
}

const mockSubscribers: Subscriber[] = [
  { id: 'SUB-1001', firmName: 'Shigrie Law Associates', owner: 'Adv. Shigrie', plan: 'Enterprise', status: 'Active', mrr: 12000, nextRenewal: 'Nov 01, 2026' },
  { id: 'SUB-1002', firmName: 'Ali & Co. Legal', owner: 'Ahmed Ali', plan: 'Pro Lawyer', status: 'Active', mrr: 4500, nextRenewal: 'Oct 28, 2026' },
  { id: 'SUB-1003', firmName: 'TechFlow SMC', owner: 'Tariq Mehmood', plan: 'Solo Basic', status: 'Active', mrr: 0, nextRenewal: 'Lifetime' },
  { id: 'SUB-1004', firmName: 'Khan Family Law', owner: 'Ayesha Khan', plan: 'Pro Lawyer', status: 'Past Due', mrr: 4500, nextRenewal: 'Oct 10, 2026' },
  { id: 'SUB-1005', firmName: 'Justice Chambers', owner: 'Fatima Bibi', plan: 'Enterprise', status: 'Canceled', mrr: 0, nextRenewal: 'N/A' },
];

const addonUsage = [
  { 
    id: 'ADD-01', 
    name: 'AI Draft Credits (OpenAI/Anthropic)', 
    icon: Cpu, 
    used: 125400, 
    limit: 500000, 
    cost: 'Rs. 15,400', 
    trend: '+12%',
    color: 'text-purple-600',
    bg: 'bg-purple-100 dark:bg-purple-900/30'
  },
  { 
    id: 'ADD-02', 
    name: 'WhatsApp SMS Reminders (Twilio)', 
    icon: MessageSquare, 
    used: 8430, 
    limit: 10000, 
    cost: 'Rs. 4,215', 
    trend: '+5%',
    color: 'text-emerald-600',
    bg: 'bg-emerald-100 dark:bg-emerald-900/30'
  }
];

export default function AdminRevenueDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [planFilter, setPlanFilter] = useState('All');

  // Filtering Logic
  const filteredSubscribers = mockSubscribers.filter(sub => {
    const matchesSearch = sub.firmName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          sub.owner.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlan = planFilter === 'All' || sub.plan === planFilter;
    
    return matchesSearch && matchesPlan;
  });

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Active': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
      case 'Past Due': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800';
      case 'Canceled': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-4 md:p-8 text-slate-900 dark:text-slate-100 pb-24">
      
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-6">
        <Link href="/admin" className="hover:text-blue-600 transition-colors">Admin Portal</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-slate-900 dark:text-slate-200 font-medium">Revenue & Monetization</span>
      </div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">SaaS Revenue Overview</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Monitor MRR, track platform subscriptions, and manage AI API usage costs.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 font-medium rounded-lg transition-colors border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800">
            <Settings2 className="w-4 h-4" /> Pricing Settings
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2 shadow-sm">
            <Download className="w-4 h-4" /> Export Financials
          </button>
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* MRR Card */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
              <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <span className="text-xs font-bold px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
              +15.2%
            </span>
          </div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Monthly Recurring Revenue (MRR)</p>
          <h3 className="text-3xl font-black text-slate-900 dark:text-white">Rs. 845,000</h3>
        </div>

        {/* Active Subscribers */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-xs font-bold px-2 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
              +43 New
            </span>
          </div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Active Law Firms / Solo Users</p>
          <h3 className="text-3xl font-black text-slate-900 dark:text-white">342</h3>
        </div>

        {/* Churn Rate */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-orange-500"></div>
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-900/30">
              <UserMinus className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <span className="text-xs font-bold px-2 py-1 rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
              +0.5%
            </span>
          </div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Monthly Churn Rate</p>
          <h3 className="text-3xl font-black text-slate-900 dark:text-white">2.4%</h3>
        </div>

        {/* API Usage Costs */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-purple-500"></div>
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/30">
              <Cpu className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-xs font-bold px-2 py-1 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              This Month
            </span>
          </div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">AI API & Infrastructure Cost</p>
          <h3 className="text-3xl font-black text-slate-900 dark:text-white">Rs. 85,400</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Column (Subscribers Table) */}
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden h-full flex flex-col">
            
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600" /> Subscribers & Firms
              </h2>
              
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search firm or owner..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
                <div className="relative w-full sm:w-40">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select 
                    value={planFilter}
                    onChange={(e) => setPlanFilter(e.target.value)}
                    className="w-full pl-9 pr-8 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  >
                    <option value="All">All Plans</option>
                    <option value="Solo Basic">Solo Basic</option>
                    <option value="Pro Lawyer">Pro Lawyer</option>
                    <option value="Enterprise">Enterprise</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <th className="p-4 font-semibold">Firm / Lawyer</th>
                    <th className="p-4 font-semibold">Plan Tier</th>
                    <th className="p-4 font-semibold">MRR</th>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 font-semibold">Next Renewal</th>
                    <th className="p-4 font-semibold text-right">Manage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                  {filteredSubscribers.map((sub) => (
                    <tr key={sub.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="p-4">
                        <p className="font-semibold text-sm text-slate-900 dark:text-white">{sub.firmName}</p>
                        <p className="text-xs text-slate-500">{sub.owner} • {sub.id}</p>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-md border ${
                          sub.plan === 'Enterprise' ? 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:border-indigo-800/50 dark:text-indigo-400' :
                          sub.plan === 'Pro Lawyer' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:border-blue-800/50 dark:text-blue-400' :
                          'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'
                        }`}>
                          <Zap className="w-3 h-3" /> {sub.plan}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="font-bold text-sm">Rs. {sub.mrr.toLocaleString()}</span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border flex items-center gap-1.5 w-max ${getStatusBadge(sub.status)}`}>
                          {sub.status === 'Active' && <CheckCircle2 className="w-3.5 h-3.5" />}
                          {sub.status === 'Past Due' && <AlertCircle className="w-3.5 h-3.5" />}
                          {sub.status}
                        </span>
                      </td>
                      <td className="p-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                        {sub.nextRenewal}
                      </td>
                      <td className="p-4 text-right">
                        <button className="p-1.5 text-slate-400 hover:text-blue-600 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-colors border border-transparent">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredSubscribers.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-12 text-center text-slate-500">
                        No subscribers found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (Usage & Add-ons) */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-600" /> Platform Add-ons & Usage
              </h2>
            </div>
            
            <div className="space-y-6">
              {addonUsage.map(addon => {
                const percentage = Math.round((addon.used / addon.limit) * 100);
                return (
                  <div key={addon.id} className="p-4 bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg ${addon.bg}`}>
                        <addon.icon className={`w-5 h-5 ${addon.color}`} />
                      </div>
                      <h3 className="font-semibold text-sm text-slate-900 dark:text-white leading-tight">
                        {addon.name}
                      </h3>
                    </div>
                    
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400 font-medium">Platform Usage</span>
                      <span className="font-bold text-slate-900 dark:text-white">{addon.used.toLocaleString()} <span className="text-slate-400 font-normal">/ {addon.limit.toLocaleString()}</span></span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-4 overflow-hidden">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-700 pt-3">
                      <div>
                        <p className="text-xs text-slate-500 mb-0.5">Estimated Cost</p>
                        <p className="font-bold text-slate-900 dark:text-white">{addon.cost}</p>
                      </div>
                      <button className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                        Manage Limits
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-lg">
              <h4 className="font-semibold text-sm text-blue-800 dark:text-blue-400 flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4" /> Monetization Tip
              </h4>
              <p className="text-xs text-blue-700/80 dark:text-blue-300/80 leading-relaxed">
                Platform API costs are up {addonUsage[0].trend}. Consider creating an &quot;AI Power User&quot; add-on tier to pass heavy usage costs to high-volume law firms.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}