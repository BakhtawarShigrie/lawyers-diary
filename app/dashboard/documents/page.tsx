'use client';

import React, { useState } from 'react';
import { 
  Folder, 
  FileText, 
  UploadCloud, 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  Share2, 
  Stamp, 
  PenTool, 
  Lock, 
  Globe,
  FileImage,
  FileBadge,
  LayoutGrid,
  List as ListIcon,
  ChevronRight,
  Briefcase
} from 'lucide-react';
import Link from 'next/link';

// --- Mock Data ---
const folders = [
  { id: 1, name: 'Active Cases', count: 142, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  { id: 2, name: 'Client Files', count: 89, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
  { id: 3, name: 'Contracts & Agreements', count: 45, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
  { id: 4, name: 'Administrative', count: 12, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20' },
  { id: 5, name: 'Form Templates', count: 34, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-900/20' },
];

const files = [
  {
    id: 'DOC-001',
    name: 'Bail_Application_Ahmed_Ali.pdf',
    case: 'State vs. Ahmed Ali',
    size: '2.4 MB',
    date: 'Oct 14, 2026',
    security: 'Confidential',
    type: 'pdf'
  },
  {
    id: 'DOC-002',
    name: 'XYZ_Corp_Master_Contract_v2.docx',
    case: 'XYZ Corp vs. ABC Ltd',
    size: '1.1 MB',
    date: 'Oct 12, 2026',
    security: 'Confidential',
    type: 'docx'
  },
  {
    id: 'DOC-003',
    name: 'General_Power_of_Attorney_Template.pdf',
    case: 'Templates',
    size: '450 KB',
    date: 'Sep 28, 2026',
    security: 'Public',
    type: 'pdf'
  },
  {
    id: 'DOC-004',
    name: 'Property_Evidence_Photos.zip',
    case: 'Fatima Bibi vs. Khalid',
    size: '14.5 MB',
    date: 'Sep 15, 2026',
    security: 'Confidential',
    type: 'zip'
  }
];

export default function DocumentVaultPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [searchQuery, setSearchQuery] = useState('');

  // Drag and Drop Handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // In a real app, handle e.dataTransfer.files here
    alert('Files ready for batch upload!');
  };

  // Helper to render file icon based on extension/type
  const getFileIcon = (type: string) => {
    switch(type) {
      case 'pdf': return <FileText className="w-8 h-8 text-red-500" />;
      case 'docx': return <FileText className="w-8 h-8 text-blue-500" />;
      case 'zip': return <FileBadge className="w-8 h-8 text-yellow-500" />;
      default: return <FileImage className="w-8 h-8 text-emerald-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-4 md:p-8 text-slate-900 dark:text-slate-100 pb-24">
      
      {/* Breadcrumb & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-2">
            <Link href="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-slate-900 dark:text-slate-200 font-medium">Document Vault</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Master Document System</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Organize, upload, and secure all your legal files.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium rounded-lg transition-colors border border-slate-200 dark:border-slate-700">
            New Folder
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2">
            <UploadCloud className="w-4 h-4" /> Upload Files
          </button>
        </div>
      </div>

      {/* Upload Dropzone */}
      <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`mb-8 border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all ${
          isDragging 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50'
        }`}
      >
        <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-full mb-4">
          <UploadCloud className={`w-8 h-8 ${isDragging ? 'text-blue-600 animate-bounce' : 'text-blue-500'}`} />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Drag & Drop files here</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-4">
          Support for batch upload. You can upload PDFs, Word Documents, Images, and scanned evidence (Max 50MB per file).
        </p>
        <button className="px-6 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg text-sm font-semibold hover:bg-slate-800 dark:hover:bg-white transition-colors shadow-sm">
          Browse Files
        </button>
      </div>

      {/* Folders Grid */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4">Quick Folders</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
          {folders.map((folder) => (
            <div key={folder.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all cursor-pointer group">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${folder.bg} group-hover:scale-110 transition-transform`}>
                <Folder className={`w-6 h-6 ${folder.color} fill-current opacity-20 absolute`} />
                <Folder className={`w-6 h-6 ${folder.color} relative z-10`} />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white truncate">{folder.name}</h3>
              <p className="text-xs text-slate-500 mt-1">{folder.count} files</p>
            </div>
          ))}
        </div>
      </div>

      {/* File List Section */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search files by name or case..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
            <button className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
            <button 
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'table' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              <ListIcon className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Files Content */}
        {viewMode === 'table' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-sm">
                  <th className="p-4 font-medium">File Name</th>
                  <th className="p-4 font-medium">Associated Case</th>
                  <th className="p-4 font-medium">Size & Date</th>
                  <th className="p-4 font-medium">Security</th>
                  <th className="p-4 font-medium text-right">Quick Actions</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file) => (
                  <tr key={file.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {getFileIcon(file.type)}
                        <div>
                          <p className="font-semibold text-sm text-slate-900 dark:text-white truncate max-w-[200px] xl:max-w-[300px]">
                            {file.name}
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5 uppercase">{file.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 font-medium">
                        <Briefcase className="w-4 h-4 text-blue-500" /> {file.case}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm font-semibold">{file.size}</div>
                      <div className="text-xs text-slate-500">{file.date}</div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full ${
                        file.security === 'Confidential' 
                          ? 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800/50' 
                          : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50'
                      }`}>
                        {file.security === 'Confidential' ? <Lock className="w-3 h-3" /> : <Globe className="w-3 h-3" />}
                        {file.security}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors" title="Preview">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-lg transition-colors" title="Share">
                          <Share2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-lg transition-colors" title="Add Watermark">
                          <Stamp className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/30 rounded-lg transition-colors" title="E-Sign">
                          <PenTool className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-white rounded-lg transition-colors ml-1 border border-slate-200 dark:border-slate-700">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {/* Grid View Implementation */}
            {files.map((file) => (
              <div key={file.id} className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 hover:shadow-md transition-shadow relative group">
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1">
                  <button className="p-1.5 bg-white dark:bg-slate-800 rounded shadow border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-blue-600"><Eye className="w-3.5 h-3.5" /></button>
                  <button className="p-1.5 bg-white dark:bg-slate-800 rounded shadow border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-emerald-600"><Share2 className="w-3.5 h-3.5" /></button>
                </div>
                
                <div className="flex flex-col items-center text-center mb-4">
                  {getFileIcon(file.type)}
                  <h3 className="font-semibold text-sm text-slate-900 dark:text-white mt-3 truncate w-full" title={file.name}>
                    {file.name}
                  </h3>
                  <span className={`mt-2 inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase rounded-md ${
                    file.security === 'Confidential' 
                      ? 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400' 
                      : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                  }`}>
                    {file.security === 'Confidential' ? <Lock className="w-2.5 h-2.5" /> : <Globe className="w-2.5 h-2.5" />}
                    {file.security}
                  </span>
                </div>
                
                <div className="border-t border-slate-100 dark:border-slate-800 pt-3 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 truncate">
                    <Briefcase className="w-3.5 h-3.5" /> {file.case}
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{file.size}</span>
                    <span>{file.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}