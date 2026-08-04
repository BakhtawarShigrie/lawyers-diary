'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/app/context/AppContext';
import { ChevronRight, User, Mail, Phone, Briefcase, Calendar } from 'lucide-react';

// --- Types ---
interface ClientItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'Active' | 'Inactive';
  addedOn: string;
}

interface CaseItem {
  id: string;
  title: string;
  clientName: string;
  type: string;
  court: string;
  status: string;
  nextDate: string;
}

export default function ClientProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params); // Next.js 15 unwrapping
  const { getStoredData, isHydrated } = useAppContext();
  
  const [clientData, setClientData] = useState<ClientItem | null>(null);
  const [clientCases, setClientCases] = useState<CaseItem[]>([]);

  useEffect(() => {
    if (isHydrated) {
      const timer = setTimeout(() => {
        // Fetch Client Data
        const storedClients = getStoredData<ClientItem[]>('lawyer_clients') || [];
        const foundClient = storedClients.find(c => c.id === id);
        
        if (foundClient) {
          setClientData(foundClient);
          
          // Fetch cases associated with this client's name
          const storedCases = getStoredData<CaseItem[]>('lawyer_cases') || [];
          const matchedCases = storedCases.filter(c => c.clientName.toLowerCase() === foundClient.name.toLowerCase());
          setClientCases(matchedCases);
        } else {
          router.push('/dashboard/clients');
        }
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isHydrated, getStoredData, id, router]);

  if (!isHydrated || !clientData) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 text-slate-900 dark:text-slate-100 pb-24">
      
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-6">
        <Link href="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <Link href="/dashboard/clients" className="hover:text-blue-600 transition-colors">Clients</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-slate-900 dark:text-slate-200 font-medium">{clientData.id}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        
        {/* Left Column: Client Profile Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex flex-col items-center text-center relative overflow-hidden">
            <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-4">
              <User className="w-10 h-10" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{clientData.name}</h1>
            <p className="text-sm font-medium text-slate-500 mb-4">{clientData.id}</p>
            
            <span className={`px-3 py-1 text-xs font-bold rounded-full mb-6 ${clientData.status === 'Active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'}`}>
              {clientData.status}
            </span>

            <div className="w-full space-y-4 text-left border-t border-slate-100 dark:border-slate-800 pt-6">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email</p>
                <p className="text-sm font-semibold flex items-center gap-2"><Mail className="w-4 h-4 text-slate-400" /> {clientData.email || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Phone</p>
                <p className="text-sm font-semibold flex items-center gap-2"><Phone className="w-4 h-4 text-slate-400" /> {clientData.phone || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Added On</p>
                <p className="text-sm font-semibold flex items-center gap-2"><Calendar className="w-4 h-4 text-slate-400" /> {clientData.addedOn}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Associated Cases */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
              <h2 className="text-lg font-bold flex items-center gap-2"><Briefcase className="w-5 h-5 text-blue-500" /> Associated Cases</h2>
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold">
                {clientCases.length} Files
              </span>
            </div>

            <div className="space-y-4">
              {clientCases.length > 0 ? (
                clientCases.map(c => (
                  <Link 
                    href={`/dashboard/cases/${c.id}`} 
                    key={c.id} 
                    className="block p-4 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/50 dark:hover:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 transition-colors group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{c.title}</h3>
                        <p className="text-xs text-slate-500 mt-1">{c.id} • {c.court}</p>
                      </div>
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full w-max ${c.status === 'Active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'}`}>
                        {c.status}
                      </span>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-8">
                  <Briefcase className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
                  <p className="font-semibold text-slate-600 dark:text-slate-400">No cases found for this client.</p>
                  <Link href="/dashboard/cases/new" className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline mt-2 inline-block">
                    Add New Case
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}