'use client';

import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  MoreVertical, 
  Mail, 
  Phone, 
  Briefcase, 
  CreditCard, 
  ShieldCheck, 
  Clock,
  X,
  ChevronRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

// --- Mock Data ---
const clientStats = [
  { title: 'Total Clients', value: '248', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30' },
  { title: 'Active Retainers', value: '35', icon: Briefcase, color: 'text-emerald-600', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
  { title: 'Outstanding Dues', value: 'Rs. 850K', icon: CreditCard, color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900/30' },
];

const clientsData = [
  {
    id: 'CLI-001',
    name: 'Ahmed Ali',
    email: 'ahmed.ali@example.com',
    phone: '+92-300-1234567',
    totalCases: 3,
    feeStatus: 'Paid',
    portalAccess: 'Active',
    avatar: 'A'
  },
  {
    id: 'CLI-002',
    name: 'XYZ Corporation',
    email: 'legal@xyzcorp.com',
    phone: '+92-42-9876543',
    totalCases: 8,
    feeStatus: 'Pending',
    portalAccess: 'Active',
    avatar: 'X'
  },
  {
    id: 'CLI-003',
    name: 'Fatima Bibi',
    email: 'fatima.bibi@example.com',
    phone: '+92-321-7654321',
    totalCases: 1,
    feeStatus: 'Paid',
    portalAccess: 'Invited',
    avatar: 'F'
  },
  {
    id: 'CLI-004',
    name: 'Tariq Mehmood',
    email: 'tariq.m@example.com',
    phone: '+92-333-1122334',
    totalCases: 2,
    feeStatus: 'Overdue',
    portalAccess: 'Inactive',
    avatar: 'T'
  },
  {
    id: 'CLI-005',
    name: 'TechFlow SMC',
    email: 'contact@techflow.pk',
    phone: '+92-301-9988776',
    totalCases: 5,
    feeStatus: 'Pending',
    portalAccess: 'Invited',
    avatar: 'T'
  }
];

export default function ClientCRMPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [feeFilter, setFeeFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtering Logic
  const filteredClients = clientsData.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          client.phone.includes(searchQuery);
    const matchesFee = feeFilter === 'All' || client.feeStatus === feeFilter;
    
    return matchesSearch && matchesFee;
  });

  // Helper function for badges
  const getFeeBadge = (status: string) => {
    switch(status) {
      case 'Paid': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
      case 'Pending': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800';
      case 'Overdue': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getPortalBadge = (status: string) => {
    switch(status) {
      case 'Active': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case 'Invited': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-4 md:p-8 text-slate-900 dark:text-slate-100 pb-24">
      
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-6">
        <Link href="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-slate-900 dark:text-slate-200 font-medium">Clients CRM</span>
      </div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Client Directory</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage client profiles, retainers, and portal access.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <UserPlus className="w-5 h-5" />
          Add New Client
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {clientStats.map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
            <div className={`p-4 rounded-lg ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.title}</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar (Search & Filters) */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search clients by name, email, or phone..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-48">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select 
              value={feeFilter}
              onChange={(e) => setFeeFilter(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            >
              <option value="All">All Fee Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
        </div>
      </div>

      {/* Client Data Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-sm">
                <th className="p-4 font-medium">Client Info</th>
                <th className="p-4 font-medium">Contact Details</th>
                <th className="p-4 font-medium text-center">Total Cases</th>
                <th className="p-4 font-medium">Fee Status</th>
                <th className="p-4 font-medium">Portal Access</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                  
                  {/* Client Info */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 flex items-center justify-center font-bold text-lg">
                        {client.avatar}
                      </div>
                      <div>
                        <Link href={`/dashboard/clients/${client.id}`} className="font-semibold text-sm text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          {client.name}
                        </Link>
                        <p className="text-xs text-slate-500 mt-0.5">{client.id}</p>
                      </div>
                    </div>
                  </td>

                  {/* Contact Details */}
                  <td className="p-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <Mail className="w-3.5 h-3.5 text-slate-400" /> {client.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <Phone className="w-3.5 h-3.5 text-slate-400" /> {client.phone}
                      </div>
                    </div>
                  </td>

                  {/* Total Cases */}
                  <td className="p-4 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm">
                      {client.totalCases}
                    </span>
                  </td>

                  {/* Fee Status */}
                  <td className="p-4">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${getFeeBadge(client.feeStatus)} flex items-center gap-1.5 w-max`}>
                      {client.feeStatus === 'Paid' && <CheckCircle2 className="w-3.5 h-3.5" />}
                      {client.feeStatus === 'Pending' && <Clock className="w-3.5 h-3.5" />}
                      {client.feeStatus === 'Overdue' && <AlertCircle className="w-3.5 h-3.5" />}
                      {client.feeStatus}
                    </span>
                  </td>

                  {/* Portal Access */}
                  <td className="p-4">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${getPortalBadge(client.portalAccess)} flex items-center gap-1.5 w-max`}>
                      {client.portalAccess === 'Active' && <ShieldCheck className="w-3.5 h-3.5" />}
                      {client.portalAccess === 'Invited' && <Mail className="w-3.5 h-3.5" />}
                      {client.portalAccess}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link 
                        href={`/dashboard/clients/${client.id}`}
                        className="px-3 py-1.5 text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        View Profile
                      </Link>
                      <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-white rounded-lg transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredClients.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    No clients found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Client Modal Placeholder */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-blue-600" /> Add New Client
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Full Name <span className="text-red-500">*</span></label>
                <input type="text" placeholder="e.g., John Doe" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Phone Number <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="+92-XXX-XXXXXXX" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Email Address</label>
                  <input type="email" placeholder="client@example.com" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm font-medium">Send Portal Access Invitation via Email</span>
                </label>
              </div>
            </div>
            <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-end gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Save Client
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}