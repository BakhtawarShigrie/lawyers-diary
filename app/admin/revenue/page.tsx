'use client';

import React, { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  TrendingUp, Users, CreditCard, Activity, 
  LogOut, ShieldAlert, ArrowUpRight, ArrowDownRight,
  Database
} from 'lucide-react';

// --- Types ---
interface SaaSMetrics {
  mrr: number;
  totalSubscribers: number;
  activeUsers: number;
  churnRate: number;
}

interface Subscriber {
  id: string;
  firmName: string;
  email: string;
  plan: 'Basic' | 'Pro' | 'Enterprise';
  status: 'Active' | 'Canceled' | 'Past Due';
  joinedAt: string;
  amount: number;
}

export default function AdminRevenueDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [isLoadingData, setIsLoadingData] = useState(true);
  const [metrics, setMetrics] = useState<SaaSMetrics | null>(null);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  // --- Authentication & Authorization Check ---
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/auth');
    } else if (status === 'authenticated') {
      // Check if the logged-in user is the Admin
      if (session?.user?.email !== 'Shigrie@gmail.com') {
        router.replace('/dashboard'); // Redirect normal users back to their dashboard
      }
    }
  }, [status, session, router]);

  // --- Simulate MongoDB Data Fetching ---
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.email === 'Shigrie@gmail.com') {
      const fetchDatabase = setTimeout(() => {
        // Simulated Database Response
        setMetrics({
          mrr: 450000,
          totalSubscribers: 128,
          activeUsers: 115,
          churnRate: 2.4,
        });

        setSubscribers([
          { id: 'SUB-9012', firmName: 'Ali & Associates', email: 'ali@lawfirm.com', plan: 'Pro', status: 'Active', joinedAt: '2026-08-01', amount: 5000 },
          { id: 'SUB-9013', firmName: 'Justice Chambers', email: 'info@justice.pk', plan: 'Enterprise', status: 'Active', joinedAt: '2026-08-03', amount: 15000 },
          { id: 'SUB-9014', firmName: 'Khan Legal', email: 'khan@legal.com', plan: 'Basic', status: 'Past Due', joinedAt: '2026-07-28', amount: 2000 },
          { id: 'SUB-9015', firmName: 'Qureshi Law', email: 'contact@qureshi.com', plan: 'Pro', status: 'Canceled', joinedAt: '2026-06-15', amount: 5000 },
          { id: 'SUB-9016', firmName: 'Syed Partners', email: 'syed@partners.pk', plan: 'Enterprise', status: 'Active', joinedAt: '2026-08-05', amount: 15000 },
        ]);
        
        setIsLoadingData(false);
      }, 1500); // Simulate network latency

      return () => clearTimeout(fetchDatabase);
    }
  }, [status, session]);

  // Loading States
  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (session?.user?.email !== 'Shigrie@gmail.com') {
    return null; // Prevents flashing before redirect
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30">
      
      {/* Admin Top Navigation */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white leading-tight">Super Admin Portal</h1>
              <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">Connected to MongoDB Database</p>
            </div>
          </div>
          <button 
            onClick={() => signOut({ callbackUrl: '/auth' })}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-sm font-semibold rounded-lg transition-colors text-slate-300 hover:text-white border border-slate-700"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
        
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white tracking-tight">SaaS Revenue Dashboard</h2>
          <p className="text-slate-400 mt-1">Real-time metrics for Lawyer&apos;s Diary subscriptions and platform health.</p>
        </div>

        {isLoadingData || !metrics ? (
          <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-slate-800 rounded-2xl">
            <Database className="w-8 h-8 text-slate-600 animate-pulse mb-3" />
            <p className="text-slate-400 font-mono text-sm">Querying MongoDB Collections...</p>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            
            {/* Top Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl relative overflow-hidden">
                <div className="absolute -right-4 -top-4 bg-emerald-500/10 w-24 h-24 rounded-full blur-2xl"></div>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2.5 bg-slate-800 rounded-lg border border-slate-700">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="flex items-center text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md">
                    +12.5% <ArrowUpRight className="w-3 h-3 ml-1" />
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-400 mb-1">Monthly Recurring Rev. (MRR)</p>
                <h3 className="text-3xl font-black text-white">Rs. {(metrics.mrr).toLocaleString()}</h3>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl relative overflow-hidden">
                <div className="absolute -right-4 -top-4 bg-blue-500/10 w-24 h-24 rounded-full blur-2xl"></div>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2.5 bg-slate-800 rounded-lg border border-slate-700">
                    <Users className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="flex items-center text-xs font-bold text-blue-400 bg-blue-400/10 px-2 py-1 rounded-md">
                    +5 New <ArrowUpRight className="w-3 h-3 ml-1" />
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-400 mb-1">Total Subscribers</p>
                <h3 className="text-3xl font-black text-white">{metrics.totalSubscribers} <span className="text-sm font-medium text-slate-500">Lawyers</span></h3>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl relative overflow-hidden">
                <div className="absolute -right-4 -top-4 bg-purple-500/10 w-24 h-24 rounded-full blur-2xl"></div>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2.5 bg-slate-800 rounded-lg border border-slate-700">
                    <Activity className="w-5 h-5 text-purple-400" />
                  </div>
                </div>
                <p className="text-sm font-semibold text-slate-400 mb-1">Active Daily Users</p>
                <h3 className="text-3xl font-black text-white">{metrics.activeUsers}</h3>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl relative overflow-hidden">
                <div className="absolute -right-4 -top-4 bg-red-500/10 w-24 h-24 rounded-full blur-2xl"></div>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2.5 bg-slate-800 rounded-lg border border-slate-700">
                    <CreditCard className="w-5 h-5 text-red-400" />
                  </div>
                  <span className="flex items-center text-xs font-bold text-red-400 bg-red-400/10 px-2 py-1 rounded-md">
                    +0.2% <ArrowDownRight className="w-3 h-3 ml-1" />
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-400 mb-1">Churn Rate</p>
                <h3 className="text-3xl font-black text-white">{metrics.churnRate}%</h3>
              </div>

            </div>

            {/* Subscriber Database Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="p-5 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Database className="w-5 h-5 text-blue-500" /> Recent Subscriptions (MongoDB)
                </h2>
                <button className="text-sm font-bold text-blue-500 hover:text-blue-400 transition-colors">View All Database</button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-950/50 text-xs uppercase tracking-wider text-slate-400">
                      <th className="p-4 font-semibold">Sub ID</th>
                      <th className="p-4 font-semibold">Firm / Lawyer Name</th>
                      <th className="p-4 font-semibold">Plan Tier</th>
                      <th className="p-4 font-semibold">MRR Contribution</th>
                      <th className="p-4 font-semibold">Status</th>
                      <th className="p-4 font-semibold text-right">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {subscribers.map((sub) => (
                      <tr key={sub.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="p-4 font-mono text-xs text-slate-400">{sub.id}</td>
                        <td className="p-4">
                          <p className="font-bold text-sm text-white">{sub.firmName}</p>
                          <p className="text-xs text-slate-500">{sub.email}</p>
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 text-xs font-bold rounded-lg border ${
                            sub.plan === 'Enterprise' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 
                            sub.plan === 'Pro' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                            'bg-slate-800 text-slate-300 border-slate-700'
                          }`}>
                            {sub.plan}
                          </span>
                        </td>
                        <td className="p-4 font-mono text-sm text-emerald-400">Rs. {sub.amount.toLocaleString()}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 text-xs font-bold rounded-full flex items-center gap-1.5 w-max ${
                            sub.status === 'Active' ? 'text-emerald-400' :
                            sub.status === 'Past Due' ? 'text-orange-400' :
                            'text-red-400'
                          }`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${sub.status === 'Active' ? 'bg-emerald-400' : sub.status === 'Past Due' ? 'bg-orange-400' : 'bg-red-400'}`}></div>
                            {sub.status}
                          </span>
                        </td>
                        <td className="p-4 text-right text-sm font-medium text-slate-400">{sub.joinedAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </motion.div>
        )}
      </main>
    </div>
  );
}