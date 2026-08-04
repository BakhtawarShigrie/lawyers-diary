'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronRight, 
  ShieldCheck, 
  Lock, 
  Key, 
  Database, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  History,
  Smartphone,
  Server,
  AlertTriangle,
  Check,
  X
} from 'lucide-react';

// --- Types & Mock Data ---
interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  ipAddress: string;
  action: string;
  status: 'Success' | 'Failed' | 'Warning';
}

const mockAuditLogs: AuditLog[] = [
  { id: 'AL-105', timestamp: 'Oct 14, 2026 14:32:10', user: 'Adv. Shigrie', ipAddress: '192.168.1.105', action: 'Exported Financial Report (Q3 2026)', status: 'Success' },
  { id: 'AL-104', timestamp: 'Oct 14, 2026 11:15:00', user: 'Ayesha Khan', ipAddress: '192.168.1.112', action: 'Viewed Confidential Case #402', status: 'Success' },
  { id: 'AL-103', timestamp: 'Oct 14, 2026 09:45:22', user: 'Unknown', ipAddress: '45.22.109.11', action: 'Failed Login Attempt (Invalid Password)', status: 'Failed' },
  { id: 'AL-102', timestamp: 'Oct 13, 2026 16:20:05', user: 'Ch. Rafiq', ipAddress: '192.168.1.118', action: 'Deleted Document: draft_v1.docx', status: 'Warning' },
  { id: 'AL-101', timestamp: 'Oct 13, 2026 09:00:12', user: 'Ali Raza', ipAddress: '192.168.1.108', action: 'Created New Case File (CIV-2026/112)', status: 'Success' },
];

const roles = ['Senior Partner', 'Associate', 'Paralegal', 'Clerk / Munshi'];

const initialPermissions = [
  { module: 'Case Files', permissions: [true, true, true, true] }, // Everyone can view
  { module: 'Confidential Documents', permissions: [true, true, false, false] }, // Only lawyers
  { module: 'Financial & Billing', permissions: [true, false, false, false] }, // Only Partner
  { module: 'Delete Records', permissions: [true, false, false, false] }, // Only Partner
  { module: 'Client Communications', permissions: [true, true, true, false] },
];

export default function SecurityAndAuditPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);
  const [permissionsMatrix, setPermissionsMatrix] = useState(initialPermissions);

  const filteredLogs = mockAuditLogs.filter(log => 
    log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.ipAddress.includes(searchQuery)
  );

  const togglePermission = (rowIndex: number, colIndex: number) => {
    const newMatrix = [...permissionsMatrix];
    newMatrix[rowIndex].permissions[colIndex] = !newMatrix[rowIndex].permissions[colIndex];
    setPermissionsMatrix(newMatrix);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Success': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
      case 'Failed': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
      case 'Warning': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-4 md:p-8 text-slate-900 dark:text-slate-100 pb-24">
      
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-6">
        <Link href="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <Link href="/dashboard/settings/jurisdiction" className="hover:text-blue-600 transition-colors">Settings</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-slate-900 dark:text-slate-200 font-medium">Security & Audit</span>
      </div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Security & Compliance</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage firm access controls, encryption statuses, and review audit logs.</p>
        </div>
        <button className="bg-slate-900 hover:bg-slate-800 text-white dark:bg-blue-600 dark:hover:bg-blue-700 px-5 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 shadow-sm">
          <Download className="w-4 h-4" />
          Export Security Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* 2FA & Auth Card */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-lg">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Two-Factor Auth</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Firm-wide policy enforcement</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <div>
              <p className="font-semibold text-sm">Require 2FA for all users</p>
              <p className="text-xs text-slate-500 mt-0.5">Use Authenticator App or SMS</p>
            </div>
            <button 
              onClick={() => setIs2FAEnabled(!is2FAEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${is2FAEnabled ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${is2FAEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
          <div className="mt-4 flex gap-2">
            <button className="flex-1 py-2 text-sm font-semibold text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
              Reset 2FA Keys
            </button>
          </div>
        </div>

        {/* Encrypted Backup Status Card */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-lg">
              <Server className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Data Encryption & Backups</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">AES-256 secure vault</p>
            </div>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="text-slate-600 dark:text-slate-400">Vault Status</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Fully Encrypted
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="text-slate-600 dark:text-slate-400">Last Cloud Backup</span>
              <span className="font-semibold">Today, 03:00 AM</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-400">Database Location</span>
              <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Database className="w-4 h-4 text-slate-400" /> Frankfurt, EU
              </span>
            </div>
          </div>
        </div>

        {/* Access Overview */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 rounded-lg">
              <Key className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Active Sessions</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Currently logged in devices</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="text-sm font-semibold">MacBook Pro (Chrome)</p>
                  <p className="text-xs text-slate-500">Lahore, PK • Current Session</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
                <div>
                  <p className="text-sm font-semibold">iPhone 14 Pro (App)</p>
                  <p className="text-xs text-slate-500">Lahore, PK • Last active 2h ago</p>
                </div>
              </div>
              <button className="text-xs text-red-600 hover:text-red-700 font-semibold">Revoke</button>
            </div>
          </div>
        </div>

      </div>

      {/* Role-Based Access Control (RBAC) Matrix */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm mb-8 overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Lock className="w-5 h-5 text-blue-600" /> Role-Based Access Control (RBAC)
          </h2>
          <p className="text-sm text-slate-500 mt-1">Define module permissions based on team hierarchy.</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-sm">
                <th className="p-4 font-semibold text-slate-500 dark:text-slate-400">Firm Module</th>
                {roles.map(role => (
                  <th key={role} className="p-4 font-semibold text-center">{role}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {permissionsMatrix.map((row, rowIndex) => (
                <tr key={row.module} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-medium text-sm text-slate-900 dark:text-white">
                    {row.module}
                  </td>
                  {row.permissions.map((hasAccess, colIndex) => (
                    <td key={colIndex} className="p-4 text-center">
                      <button 
                        onClick={() => togglePermission(rowIndex, colIndex)}
                        className={`inline-flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
                          hasAccess 
                            ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 hover:bg-emerald-200' 
                            : 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        {hasAccess ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                      </button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2">
              <History className="w-5 h-5 text-blue-600" /> Enterprise Audit Logs
            </h2>
            <p className="text-sm text-slate-500 mt-1">Immutable record of all system activities.</p>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search logs..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
            <button className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <Filter className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="p-4 font-semibold">Timestamp</th>
                <th className="p-4 font-semibold">User</th>
                <th className="p-4 font-semibold">IP Address</th>
                <th className="p-4 font-semibold">Action Taken</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 text-sm font-medium text-slate-600 dark:text-slate-300">
                    {log.timestamp}
                  </td>
                  <td className="p-4">
                    <span className="font-semibold text-sm text-slate-900 dark:text-white">
                      {log.user}
                    </span>
                  </td>
                  <td className="p-4 text-sm font-mono text-slate-500">
                    {log.ipAddress}
                  </td>
                  <td className="p-4">
                    <p className={`text-sm font-medium ${log.action.includes('Failed') || log.action.includes('Deleted') ? 'text-red-600 dark:text-red-400' : 'text-slate-700 dark:text-slate-200'}`}>
                      {log.action}
                    </p>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${getStatusBadge(log.status)} flex items-center gap-1.5 w-max`}>
                      {log.status === 'Warning' && <AlertTriangle className="w-3.5 h-3.5" />}
                      {log.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-1.5 text-slate-400 hover:text-blue-600 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-colors border border-transparent">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-slate-500">
                    No audit logs found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}