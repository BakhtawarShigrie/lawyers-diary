'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  LayoutGrid, 
  List as ListIcon, 
  Download, 
  Trash2, 
  MoreVertical, 
  ChevronLeft, 
  ChevronRight,
  Briefcase,
  MapPin,
  Clock,
  User,
  Scale,
  Edit,
  Eye,
  Archive,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

// --- Mock Data ---
const casesData = [
  {
    id: 'CASE-001',
    title: 'State vs. Ahmed Ali',
    number: 'CR-2026/405',
    category: 'Criminal',
    status: 'Active',
    court: 'High Court, Lahore',
    nextDate: 'Oct 14, 2026',
    client: 'Ahmed Ali',
    lawyer: 'Adv. Shigrie',
    urgency: 'High'
  },
  {
    id: 'CASE-002',
    title: 'XYZ Corp vs. ABC Ltd',
    number: 'CIV-2025/112',
    category: 'Corporate',
    status: 'Active',
    court: 'Banking Court',
    nextDate: 'Oct 18, 2026',
    client: 'XYZ Corp',
    lawyer: 'Adv. Shigrie',
    urgency: 'Normal'
  },
  {
    id: 'CASE-003',
    title: 'Fatima Bibi vs. Khalid',
    number: 'FAM-2026/89',
    category: 'Family',
    status: 'Pending Appeal',
    court: 'Family Court',
    nextDate: 'Nov 02, 2026',
    client: 'Fatima Bibi',
    lawyer: 'Assoc. Ali',
    urgency: 'Normal'
  },
  {
    id: 'CASE-004',
    title: 'Commissioner IR vs. TechFlow',
    number: 'TAX-2024/902',
    category: 'Tax',
    status: 'Disposed',
    court: 'Supreme Court',
    nextDate: 'N/A',
    client: 'TechFlow SMC',
    lawyer: 'Adv. Shigrie',
    urgency: 'Normal'
  }
];

export default function CasesDirectoryPage() {
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedCases, setSelectedCases] = useState<string[]>([]);

  // Filtering Logic
  const filteredCases = casesData.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || c.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Bulk Selection Logic
  const toggleSelection = (id: string) => {
    setSelectedCases(prev => 
      prev.includes(id) ? prev.filter(caseId => caseId !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedCases.length === filteredCases.length) {
      setSelectedCases([]);
    } else {
      setSelectedCases(filteredCases.map(c => c.id));
    }
  };

  // Status & Urgency Badge Helpers
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
      case 'Disposed': return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700';
      case 'Pending Appeal': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-4 md:p-8 text-slate-900 dark:text-slate-100">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Master Cases Directory</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage, search and filter all your firm&apos;s cases.</p>
        </div>
        <Link 
          href="/dashboard/cases/new" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors inline-flex items-center justify-center gap-2"
        >
          <Briefcase className="w-5 h-5" />
          Add New Case
        </Link>
      </div>

      {/* Action Bar (Search & Filters) */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm mb-6 flex flex-col xl:flex-row gap-4 items-center justify-between">
        
        <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto flex-1">
          {/* Search Bar */}
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by Case No, Party, Client..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full sm:w-40 pl-9 pr-8 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="All">All Categories</option>
              <option value="Civil">Civil</option>
              <option value="Criminal">Criminal</option>
              <option value="Tax">Tax</option>
              <option value="Corporate">Corporate</option>
              <option value="Family">Family</option>
            </select>
          </div>

          {/* Status Filter */}
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-40 px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Disposed">Disposed</option>
            <option value="Pending Appeal">Pending Appeal</option>
          </select>
        </div>

        {/* View Toggle */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1 w-full sm:w-auto justify-center">
          <button 
            onClick={() => setViewMode('table')}
            className={`p-1.5 rounded-md transition-colors ${viewMode === 'table' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            <ListIcon className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
        </div>

      </div>

      {/* Bulk Actions Banner */}
      {selectedCases.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-xl p-3 mb-6 flex items-center justify-between animate-in fade-in slide-in-from-top-2">
          <span className="text-sm font-semibold text-blue-800 dark:text-blue-300 ml-2">
            {selectedCases.length} case(s) selected
          </span>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-medium rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              <Download className="w-4 h-4" /> Export PDF
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 text-red-600 dark:text-red-400 text-sm font-medium rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors">
              <Archive className="w-4 h-4" /> Archive
            </button>
          </div>
        </div>
      )}

      {/* Content Area */}
      {viewMode === 'table' ? (
        /* TABLE VIEW */
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-sm">
                <th className="p-4 w-12">
                  <input 
                    type="checkbox" 
                    checked={selectedCases.length === filteredCases.length && filteredCases.length > 0}
                    onChange={toggleAll}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="p-4 font-medium">Case Info</th>
                <th className="p-4 font-medium">Court / Forum</th>
                <th className="p-4 font-medium">Next Date</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCases.map(c => (
                <tr key={c.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                  <td className="p-4">
                    <input 
                      type="checkbox" 
                      checked={selectedCases.includes(c.id)}
                      onChange={() => toggleSelection(c.id)}
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-base text-slate-900 dark:text-white">{c.title}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">{c.number} • {c.category}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <MapPin className="w-4 h-4 text-blue-500" /> {c.court}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Clock className={`w-4 h-4 ${c.urgency === 'High' ? 'text-red-500' : 'text-slate-400'}`} />
                      <span className={c.urgency === 'High' ? 'text-red-600 dark:text-red-400' : 'text-slate-700 dark:text-slate-300'}>
                        {c.nextDate}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${getStatusColor(c.status)}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-md transition-colors" title="View Details">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/30 rounded-md transition-colors" title="Edit Case">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-colors" title="Archive">
                        <Archive className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredCases.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">No cases found matching your criteria.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCases.map(c => (
            <div key={c.id} className={`bg-white dark:bg-slate-900 border rounded-xl p-5 shadow-sm hover:shadow-md transition-all relative ${selectedCases.includes(c.id) ? 'border-blue-500 ring-1 ring-blue-500' : 'border-slate-200 dark:border-slate-800'}`}>
              
              <div className="absolute top-4 right-4">
                <input 
                  type="checkbox" 
                  checked={selectedCases.includes(c.id)}
                  onChange={() => toggleSelection(c.id)}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4 pr-8">
                <span className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md mb-2 ${c.category === 'Criminal' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'}`}>
                  {c.category}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{c.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Case No: {c.number}</p>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <MapPin className="w-4 h-4 text-slate-400" /> {c.court}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <User className="w-4 h-4 text-slate-400" /> Client: {c.client}
                </div>
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Clock className={`w-4 h-4 ${c.urgency === 'High' ? 'text-red-500' : 'text-slate-400'}`} />
                  <span className={c.urgency === 'High' ? 'text-red-600 dark:text-red-400' : 'text-slate-700 dark:text-slate-300'}>
                    Next Date: {c.nextDate}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${getStatusColor(c.status)}`}>
                  {c.status}
                </span>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-md transition-colors"><Eye className="w-4 h-4" /></button>
                  <button className="p-1.5 text-slate-400 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/30 rounded-md transition-colors"><Edit className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          ))}
          {filteredCases.length === 0 && (
            <div className="col-span-full p-12 text-center text-slate-500 bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
              No cases found matching your criteria.
            </div>
          )}
        </div>
      )}

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 px-2">
        <span className="text-sm text-slate-500 dark:text-slate-400">
          Showing <span className="font-medium text-slate-900 dark:text-white">1</span> to <span className="font-medium text-slate-900 dark:text-white">{filteredCases.length}</span> of <span className="font-medium text-slate-900 dark:text-white">4</span> results
        </span>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 flex items-center gap-1" disabled>
            <ChevronLeft className="w-4 h-4" /> Prev
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white text-sm font-medium">1</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-medium transition-colors">2</button>
          <button className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1">
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}