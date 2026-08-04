'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/app/context/AppContext';
import { ChevronRight, Plus, Trash2, Save } from 'lucide-react';

// --- Types ---
interface InvoiceItemDetails {
  id: string;
  description: string;
  rate: number;
  hours: number;
  amount: number;
}

interface InvoiceItem {
  id: string;
  clientName: string;
  caseId: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  items: InvoiceItemDetails[];
  taxAmount: number;
  subtotal: number;
}

// --- Helper Functions (Defined OUTSIDE the component to avoid react-hooks/purity errors) ---
const generateId = (prefix: string) => {
  return `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`;
};

const getCurrentDate = () => {
  return new Date().toLocaleDateString();
};

export default function InvoiceGeneratorPage() {
  const router = useRouter();
  const { getStoredData, setStoredData, isHydrated } = useAppContext();
  const [isSaving, setIsSaving] = useState(false);

  // Invoice Details
  const [clientName, setClientName] = useState('');
  const [caseId, setCaseId] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [taxRate, setTaxRate] = useState(0);

  // Line Items
  const [items, setItems] = useState<InvoiceItemDetails[]>([
    { id: 'item-initial', description: 'Legal Consultation', rate: 5000, hours: 1, amount: 5000 }
  ]);

  // Math Calculations
  const subtotal = items.reduce((acc, item) => acc + item.amount, 0);
  const taxAmount = (subtotal * taxRate) / 100;
  const grandTotal = subtotal + taxAmount;

  const handleItemChange = (id: string, field: keyof InvoiceItemDetails, value: string | number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'rate' || field === 'hours') {
          updatedItem.amount = Number(updatedItem.rate) * Number(updatedItem.hours);
        }
        return updatedItem;
      }
      return item;
    }));
  };

  const addItem = () => {
    const newItem: InvoiceItemDetails = {
      id: generateId('item'), // Uses external helper function safely
      description: '',
      rate: 0,
      hours: 1,
      amount: 0
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleSaveInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || items.length === 0) return;
    setIsSaving(true);

    const newInvoice: InvoiceItem = {
      id: generateId('INV'), // Uses external helper function safely
      clientName,
      caseId: caseId || 'General',
      date: getCurrentDate(), // Uses external helper function safely
      dueDate,
      amount: grandTotal,
      status: 'Pending',
      items,
      taxAmount,
      subtotal
    };

    setTimeout(() => {
      const existingInvoices = getStoredData<InvoiceItem[]>('lawyer_invoices') || [];
      setStoredData('lawyer_invoices', [newInvoice, ...existingInvoices]);
      router.push('/dashboard/billing');
    }, 800);
  };

  if (!isHydrated) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 text-slate-900 dark:text-slate-100 pb-24">
      <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-6">
        <Link href="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <Link href="/dashboard/billing" className="hover:text-blue-600 transition-colors">Billing</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-slate-900 dark:text-slate-200 font-medium">Create Invoice</span>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Invoice Generator</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Create and save professional invoices instantly.</p>
      </div>

      <form onSubmit={handleSaveInvoice} className="max-w-4xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 md:p-8">
        
        {/* Client Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Client Name</label>
            <input type="text" required value={clientName} onChange={e => setClientName(e.target.value)} placeholder="John Doe" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Case ID / Reference</label>
            <input type="text" value={caseId} onChange={e => setCaseId(e.target.value)} placeholder="CAS-XXXX" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Due Date</label>
            <input type="date" required value={dueDate} onChange={e => setDueDate(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        {/* Line Items */}
        <div className="mb-8">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">Line Items</h3>
          {items.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row gap-4 items-end mb-4 bg-slate-50 dark:bg-slate-800/30 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
              <div className="flex-1 w-full">
                <label className="block text-xs font-semibold text-slate-500 mb-1">Description</label>
                <input type="text" required value={item.description} onChange={e => handleItemChange(item.id, 'description', e.target.value)} placeholder="Service description..." className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none" />
              </div>
              <div className="w-full sm:w-24">
                <label className="block text-xs font-semibold text-slate-500 mb-1">Rate (Rs)</label>
                <input type="number" min="0" required value={item.rate === 0 ? '' : item.rate} onChange={e => handleItemChange(item.id, 'rate', e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none" />
              </div>
              <div className="w-full sm:w-20">
                <label className="block text-xs font-semibold text-slate-500 mb-1">Qty/Hrs</label>
                <input type="number" min="1" required value={item.hours === 0 ? '' : item.hours} onChange={e => handleItemChange(item.id, 'hours', e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none" />
              </div>
              <div className="w-full sm:w-32">
                <label className="block text-xs font-semibold text-slate-500 mb-1">Amount</label>
                <div className="w-full px-3 py-2 bg-slate-200 dark:bg-slate-800 border border-transparent rounded-lg text-sm font-bold text-slate-700 dark:text-slate-300">
                  {item.amount.toLocaleString()}
                </div>
              </div>
              {items.length > 1 && (
                <button type="button" onClick={() => removeItem(item.id)} className="p-2.5 bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addItem} className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 mt-2">
            <Plus className="w-4 h-4" /> Add Line Item
          </button>
        </div>

        {/* Math & Totals */}
        <div className="flex flex-col items-end border-t border-slate-200 dark:border-slate-800 pt-6">
          <div className="w-full sm:w-64 space-y-3">
            <div className="flex justify-between text-sm font-semibold text-slate-500">
              <span>Subtotal:</span>
              <span>Rs. {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm font-semibold text-slate-500">
              <span>Tax Rate (%):</span>
              <input type="number" min="0" max="100" value={taxRate === 0 ? '' : taxRate} onChange={e => setTaxRate(Number(e.target.value))} className="w-16 px-2 py-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded outline-none text-right" />
            </div>
            {taxRate > 0 && (
              <div className="flex justify-between text-sm font-semibold text-slate-500">
                <span>Tax Amount:</span>
                <span>Rs. {taxAmount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-black text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-800">
              <span>Grand Total:</span>
              <span>Rs. {grandTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button type="submit" disabled={isSaving} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md flex items-center gap-2 disabled:opacity-70">
            {isSaving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-5 h-5" />}
            Save Invoice
          </button>
        </div>

      </form>
    </div>
  );
}