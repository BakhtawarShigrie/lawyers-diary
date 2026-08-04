'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useAppContext } from '@/app/context/AppContext';
import { 
  Folder, ChevronRight, UploadCloud, Search, 
  FileText, Image as ImageIcon, File, Trash2, CheckCircle2
} from 'lucide-react';

// --- Types ---
interface DocumentItem {
  id: string;
  name: string;
  size: string;
  type: string;
  date: string;
}

// Helper Functions
const generateId = () => `DOC-${Date.now().toString().slice(-6)}`;
const getCurrentDate = () => new Date().toLocaleDateString();

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export default function DocumentVaultPage() {
  const { getStoredData, setStoredData, isHydrated } = useAppContext();
  
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isHydrated) {
      const timer = setTimeout(() => {
        const storedDocs = getStoredData<DocumentItem[]>('lawyer_documents') || [];
        setDocuments(storedDocs);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isHydrated, getStoredData]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    // Process files and extract metadata
    const newDocs: DocumentItem[] = Array.from(files).map(file => ({
      id: generateId() + Math.floor(Math.random() * 1000), // Ensure uniqueness if multiple files
      name: file.name,
      size: formatBytes(file.size),
      type: file.type || 'unknown',
      date: getCurrentDate()
    }));

    setTimeout(() => {
      const existingDocs = getStoredData<DocumentItem[]>('lawyer_documents') || [];
      const updatedDocs = [...newDocs, ...existingDocs];
      
      setStoredData('lawyer_documents', updatedDocs);
      setDocuments(updatedDocs);
      setIsUploading(false);
      
      // Reset input
      if (fileInputRef.current) fileInputRef.current.value = '';
    }, 1000); // Simulate upload delay
  };

  const deleteDocument = (id: string) => {
    const updatedDocs = documents.filter(doc => doc.id !== id);
    setStoredData('lawyer_documents', updatedDocs);
    setDocuments(updatedDocs);
  };

  const filteredDocs = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getFileIcon = (type: string) => {
    if (type.includes('image')) return <ImageIcon className="w-5 h-5 text-blue-500" />;
    if (type.includes('pdf')) return <FileText className="w-5 h-5 text-red-500" />;
    return <File className="w-5 h-5 text-slate-500" />;
  };

  if (!isHydrated) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 text-slate-900 dark:text-slate-100 pb-24">
      
      <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-6">
        <Link href="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-slate-900 dark:text-slate-200 font-medium">Documents Vault</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Documents Vault</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Securely store and manage your case files and evidences.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard/documents/ocr" className="px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 rounded-xl text-sm font-bold transition-all shadow-sm hover:shadow-md flex items-center gap-2">
            <Search className="w-4 h-4" /> OCR Scanner
          </Link>
          <Link href="/dashboard/documents/e-sign" className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold transition-all shadow-md flex items-center gap-2">
            E-Sign
          </Link>
        </div>
      </div>

      {/* Upload Zone */}
      <div 
        onClick={() => fileInputRef.current?.click()}
        className="mb-8 w-full border-2 border-dashed border-blue-300 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
      >
        <input 
          type="file" 
          multiple 
          className="hidden" 
          ref={fileInputRef} 
          onChange={handleFileUpload}
        />
        {isUploading ? (
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <p className="font-bold text-blue-600 dark:text-blue-400">Uploading Files...</p>
          </div>
        ) : (
          <>
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-4">
              <UploadCloud className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Click or Drag Files Here</h3>
            <p className="text-sm text-slate-500 max-w-sm">Upload PDFs, Images, and Word documents to your secure local vault.</p>
          </>
        )}
      </div>

      {/* Documents List */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search documents by name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="p-4 font-semibold">File Name</th>
                <th className="p-4 font-semibold">Size</th>
                <th className="p-4 font-semibold">Date Uploaded</th>
                <th className="p-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {filteredDocs.length > 0 ? (
                filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                        {getFileIcon(doc.type)}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">{doc.name}</p>
                        <p className="text-xs text-slate-500 uppercase">{doc.type.split('/')[1] || 'FILE'}</p>
                      </div>
                    </td>
                    <td className="p-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                      {doc.size}
                    </td>
                    <td className="p-4 text-sm font-medium text-slate-500">
                      {doc.date}
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => deleteDocument(doc.id)}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-slate-500">
                    <Folder className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700 mb-3" />
                    <p className="font-semibold text-lg">No documents found</p>
                    <p className="text-sm mt-1">Upload a file to see it here.</p>
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