'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAppContext } from '@/app/context/AppContext';
import { Users, UserPlus, ChevronRight, Mail, Phone, X, CheckCircle2 } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  status: 'Active' | 'On Leave';
}

const generateId = () => `STAFF-${Date.now().toString().slice(-6)}`;

export default function TeamDelegationPage() {
  const { getStoredData, setStoredData, isHydrated } = useAppContext();
  
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form States
  const [name, setName] = useState('');
  const [role, setRole] = useState('Junior Associate');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (isHydrated) {
      const timer = setTimeout(() => {
        const storedTeam = getStoredData<TeamMember[]>('lawyer_team') || [];
        setTeam(storedTeam);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isHydrated, getStoredData]);

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSaving(true);

    const newMember: TeamMember = {
      id: generateId(),
      name,
      role,
      email,
      phone,
      status: 'Active'
    };

    setTimeout(() => {
      const updatedTeam = [newMember, ...team];
      setStoredData('lawyer_team', updatedTeam);
      setTeam(updatedTeam);

      // Reset
      setName('');
      setRole('Junior Associate');
      setEmail('');
      setPhone('');
      setIsSaving(false);
      setIsModalOpen(false);
    }, 600);
  };

  if (!isHydrated) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 text-slate-900 dark:text-slate-100 pb-24 relative">
      
      <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-6">
        <Link href="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <Link href="/dashboard/appointments" className="hover:text-blue-600 transition-colors">Appointments</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-slate-900 dark:text-slate-200 font-medium">Team Delegation</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Team Delegation & Staff</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage junior lawyers, paralegals, and administrative staff.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2"
        >
          <UserPlus className="w-4 h-4" /> Add Team Member
        </button>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.length > 0 ? (
          team.map(member => (
            <div key={member.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center font-bold text-lg">
                    {member.name.charAt(0)}
                  </div>
                  <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> {member.status}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-0.5">{member.name}</h3>
                <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-4">{member.role}</p>

                <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-4">
                  <p className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> {member.email || 'N/A'}</p>
                  <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> {member.phone || 'N/A'}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-white dark:bg-slate-900 p-12 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
            <Users className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700 mb-3" />
            <p className="font-semibold text-lg">No team members added</p>
            <p className="text-sm text-slate-500 mt-1">Click &quot;Add Team Member&quot; to build your law firm directory.</p>
          </div>
        )}
      </div>

      {/* --- Add Team Modal --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-md w-full p-6 md:p-8 relative border border-slate-200 dark:border-slate-800">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-2xl font-bold mb-4">Add Staff Member</h2>

            <form onSubmit={handleAddMember} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                <input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Barrister Bilawal" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Role / Designation</label>
                <select value={role} onChange={e => setRole(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none appearance-none">
                  <option value="Junior Associate">Junior Associate</option>
                  <option value="Senior Partner">Senior Partner</option>
                  <option value="Legal Clerk">Legal Clerk</option>
                  <option value="Office Manager">Office Manager</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@lawfirm.com" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Phone</label>
                <input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+92 300 XXXXXXX" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 dark:bg-slate-800 dark:text-slate-300">
                  Cancel
                </button>
                <button type="submit" disabled={isSaving} className="flex-1 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md disabled:opacity-70">
                  {isSaving ? 'Saving...' : 'Save Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}