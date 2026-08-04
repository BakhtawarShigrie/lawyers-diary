'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '@/app/context/AppContext';
import { 
  Users, Search, Filter, UserPlus, ChevronRight, 
  Mail, Phone, MoreVertical, X, CheckCircle2 
} from 'lucide-react';

// --- Types ---
interface ClientItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'Active' | 'Inactive';
  addedOn: string;
}

export default function ClientsListPage() {
  const { getStoredData, setStoredData, isHydrated } = useAppContext();
  
  const [clients, setClients] = useState<ClientItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Form States
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newStatus, setNewStatus] = useState<'Active' | 'Inactive'>('Active');

  useEffect(() => {
    if (isHydrated) {
      const timer = setTimeout(() => {
        const storedClients = getStoredData<ClientItem[]>('lawyer_clients') || [];
        setClients(storedClients);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isHydrated, getStoredData]);

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const newClient: ClientItem = {
      id: `CLI-${Math.floor(1000 + Math.random() * 9000)}`,
      name: newName,
      email: newEmail,
      phone: newPhone,
      status: newStatus,
      addedOn: new Date().toLocaleDateString(),
    };

    setTimeout(() => {
      const updatedClients = [newClient, ...clients];
      setStoredData('lawyer_clients', updatedClients);
      setClients(updatedClients);
      
      // Reset Form
      setNewName('');
      setNewEmail('');
      setNewPhone('');
      setNewStatus('Active');
      setIsSaving(false);
      setIsModalOpen(false);
    }, 600);
  };

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isHydrated) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 text-slate-900 dark:text-slate-100 pb-24 relative">
      
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-6">
        <Link href="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-slate-900 dark:text-slate-200 font-medium">Clients CRM</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Client Directory</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage all your client contacts and details.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2"
        >
          <UserPlus className="w-4 h-4" /> Add New Client
        </button>
      </div>

      {/* Main Table Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
        
        {/* Search & Filters */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name, email, or ID..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Table Area */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="p-4 font-semibold">Client Name</th>
                <th className="p-4 font-semibold">Contact Info</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Added On</th>
                <th className="p-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
              <AnimatePresence>
                {filteredClients.length > 0 ? (
                  filteredClients.map((c) => (
                    <motion.tr 
                      key={c.id} 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group"
                    >
                      <td className="p-4">
                        <p className="font-bold text-sm text-slate-900 dark:text-white mb-0.5">{c.name}</p>
                        <p className="text-xs text-slate-500">{c.id}</p>
                      </td>
                      <td className="p-4">
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-slate-400" /> {c.email || 'N/A'}</p>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-1 flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-slate-400" /> {c.phone || 'N/A'}</p>
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border flex items-center gap-1.5 w-max ${c.status === 'Active' ? 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-400' : 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400'}`}>
                          {c.status === 'Active' && <CheckCircle2 className="w-3.5 h-3.5" />}
                          {c.status}
                        </span>
                      </td>
                      <td className="p-4 text-sm font-medium text-slate-500">
                        {c.addedOn}
                      </td>
                      <td className="p-4 text-right">
                        <Link href={`/dashboard/clients/${c.id}`} className="px-3 py-1.5 text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 rounded-lg transition-colors inline-block">
                          View Profile
                        </Link>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-12 text-center text-slate-500">
                      <Users className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700 mb-3" />
                      <p className="font-semibold text-lg">No clients found</p>
                      <p className="text-sm mt-1">Try a different search or add a new client.</p>
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* --- Add New Client Modal --- */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-lg w-full p-6 md:p-8 relative border border-slate-200 dark:border-slate-800"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="mb-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-4">
                  <UserPlus className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Add New Client</h2>
                <p className="text-sm text-slate-500 mt-1">Enter client details to create a new profile.</p>
              </div>

              <form onSubmit={handleAddClient} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                  <input type="text" required value={newName} onChange={e => setNewName(e.target.value)} placeholder="e.g. John Doe" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email</label>
                    <input type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder="Email Address" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Phone</label>
                    <input type="text" value={newPhone} onChange={e => setNewPhone(e.target.value)} placeholder="Phone Number" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Status</label>
                  <select value={newStatus} onChange={e => setNewStatus(e.target.value as 'Active' | 'Inactive')} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none appearance-none transition-all">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div className="pt-4 flex gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3.5 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" disabled={isSaving || !newName.trim()} className="flex-1 py-3.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-md disabled:opacity-70 flex items-center justify-center">
                    {isSaving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Save Client'}
                  </button>
                </div>
              </form>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}