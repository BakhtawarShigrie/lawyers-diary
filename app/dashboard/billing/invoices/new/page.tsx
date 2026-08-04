'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  ChevronRight, 
  FileText, 
  Plus, 
  Trash2, 
  Eye, 
  Save, 
  Send, 
  CreditCard, 
  Building,
  Smartphone,
  Globe
} from 'lucide-react';

// --- Types & Mock Data ---
interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

type PaymentMethodType = 'Bank' | 'JazzCash' | 'EasyPaisa' | 'Stripe';

const predefinedItems = [
  'Court Appearance Fee',
  'Legal Research & Drafting',
  'Initial Retainer Fee',
  'Consultation Charges',
  'Filing & Administrative Costs',
  'Out of Pocket Expenses'
];

const mockClients = [
  'Ahmed Ali',
  'XYZ Corporation',
  'Fatima Bibi',
  'TechFlow SMC',
  'Tariq Mehmood'
];

export default function InvoiceGeneratorPage() {
  // Form State - Using lazy initialization to fix the purity error with Math.random()
  const [invoiceDetails, setInvoiceDetails] = useState(() => ({
    invoiceId: `INV-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
    clientId: '',
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    taxId: 'NTN-1234567-8',
    notes: 'Please make the payment within 15 days of receiving this invoice.'
  }));

  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: '1', description: '', quantity: 1, rate: 0 }
  ]);

  const [taxRate, setTaxRate] = useState<number>(16); // e.g., 16% GST/PST
  const [discount, setDiscount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('Bank');

  // Derived Calculations
  const subTotal = useMemo(() => {
    return lineItems.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
  }, [lineItems]);

  const taxAmount = useMemo(() => {
    return (subTotal * taxRate) / 100;
  }, [subTotal, taxRate]);

  const grandTotal = useMemo(() => {
    return subTotal + taxAmount - discount;
  }, [subTotal, taxAmount, discount]);

  // Handlers
  const handleDetailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInvoiceDetails(prev => ({ ...prev, [name]: value }));
  };

  const addLineItem = () => {
    setLineItems(prev => [
      ...prev, 
      { id: Date.now().toString(), description: '', quantity: 1, rate: 0 }
    ]);
  };

  const removeLineItem = (id: string) => {
    if (lineItems.length > 1) {
      setLineItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: string | number) => {
    setLineItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-4 md:p-8 text-slate-900 dark:text-slate-100 pb-24">
      
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-6">
        <Link href="/dashboard/billing" className="hover:text-blue-600 transition-colors">Billing & Finance</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-slate-900 dark:text-slate-200 font-medium">Create Invoice</span>
      </div>

      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Invoice Generator</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Create and send professional legal invoices to your clients.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium rounded-lg transition-colors border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700">
            <Save className="w-4 h-4" /> Save Draft
          </button>
          <button className="px-4 py-2 bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-medium rounded-lg transition-colors border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/30">
            <Eye className="w-4 h-4" /> Preview PDF
          </button>
          <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2 shadow-sm">
            <Send className="w-4 h-4" /> Generate & Send
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Column (Main Form) */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* Section 1: Basic Details */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
              <FileText className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold">Invoice Details</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Invoice Number</label>
                <input 
                  type="text" 
                  name="invoiceId"
                  value={invoiceDetails.invoiceId}
                  onChange={handleDetailChange}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Client / Bill To <span className="text-red-500">*</span></label>
                <select 
                  name="clientId"
                  value={invoiceDetails.clientId}
                  onChange={handleDetailChange}
                  className="w-full px-4 py-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                >
                  <option value="">Select a Client...</option>
                  {mockClients.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Issue Date</label>
                <input 
                  type="date" 
                  name="issueDate"
                  value={invoiceDetails.issueDate}
                  onChange={handleDetailChange}
                  className="w-full px-4 py-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Due Date</label>
                <input 
                  type="date" 
                  name="dueDate"
                  value={invoiceDetails.dueDate}
                  onChange={handleDetailChange}
                  className="w-full px-4 py-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Line Items */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 md:p-8">
            <h2 className="text-lg font-bold mb-6">Line Items & Services</h2>
            
            <div className="overflow-x-auto mb-4">
              {/* Fixed Tailwind canonical class min-w-150 instead of min-w-[600px] */}
              <table className="w-full text-left border-collapse min-w-150">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                    <th className="pb-3 font-semibold w-1/2">Description / Service</th>
                    <th className="pb-3 font-semibold text-center w-24">Qty</th>
                    <th className="pb-3 font-semibold text-right w-32">Rate (Rs)</th>
                    <th className="pb-3 font-semibold text-right w-32">Amount</th>
                    <th className="pb-3 font-semibold text-center w-12"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                  {lineItems.map((item) => (
                    <tr key={item.id}>
                      <td className="py-3 pr-4">
                        <input 
                          type="text" 
                          list="services"
                          value={item.description}
                          onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                          placeholder="Enter service description..."
                          className="w-full px-3 py-2 bg-transparent border border-slate-200 dark:border-slate-700 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                        <datalist id="services">
                          {predefinedItems.map(si => <option key={si} value={si} />)}
                        </datalist>
                      </td>
                      <td className="py-3 px-2">
                        <input 
                          type="number" 
                          min="1"
                          value={item.quantity || ''}
                          onChange={(e) => updateLineItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                          className="w-full px-3 py-2 bg-transparent border border-slate-200 dark:border-slate-700 rounded-md text-sm text-center focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                      </td>
                      <td className="py-3 px-2">
                        <input 
                          type="number" 
                          min="0"
                          value={item.rate || ''}
                          onChange={(e) => updateLineItem(item.id, 'rate', parseInt(e.target.value) || 0)}
                          className="w-full px-3 py-2 bg-transparent border border-slate-200 dark:border-slate-700 rounded-md text-sm text-right focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                      </td>
                      <td className="py-3 pl-4 text-right font-semibold text-slate-900 dark:text-white">
                        {(item.quantity * item.rate).toLocaleString()}
                      </td>
                      <td className="py-3 pl-2 text-right">
                        <button 
                          onClick={() => removeLineItem(item.id)}
                          disabled={lineItems.length === 1}
                          className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <button 
              onClick={addLineItem}
              className="flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Line Item
            </button>
          </div>

        </div>

        {/* Right Column (Totals & Payments) */}
        <div className="space-y-6">
          
          {/* Totals Calculation Card */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4">Summary</h2>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900 dark:text-white">Rs. {subTotal.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center gap-4">
                <span className="text-slate-600 dark:text-slate-400 whitespace-nowrap">Tax / GST (%)</span>
                <input 
                  type="number"
                  value={taxRate}
                  onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                  className="w-20 px-2 py-1 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded text-right outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-between items-center gap-4">
                <span className="text-slate-600 dark:text-slate-400 whitespace-nowrap">Discount (Rs)</span>
                <input 
                  type="number"
                  value={discount || ''}
                  onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                  placeholder="0"
                  className="w-24 px-2 py-1 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded text-right outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <span className="font-bold text-lg">Grand Total</span>
              <span className="font-black text-2xl text-blue-600 dark:text-blue-400">Rs. {grandTotal.toLocaleString()}</span>
            </div>
          </div>

          {/* Payment Methods Integration */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-emerald-600" /> Accepted Payments
            </h2>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { id: 'Bank', icon: Building, label: 'Bank Transfer' },
                { id: 'JazzCash', icon: Smartphone, label: 'JazzCash' },
                { id: 'EasyPaisa', icon: Smartphone, label: 'EasyPaisa' },
                { id: 'Stripe', icon: Globe, label: 'Credit Card' }
              ].map(method => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id as PaymentMethodType)}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg border text-sm font-semibold transition-all ${
                    paymentMethod === method.id 
                      ? 'bg-blue-50 border-blue-600 text-blue-700 dark:bg-blue-900/30 dark:border-blue-500 dark:text-blue-400 ring-1 ring-blue-600' 
                      : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-blue-300'
                  }`}
                >
                  <method.icon className="w-5 h-5 mb-1.5" />
                  {method.label}
                </button>
              ))}
            </div>

            {/* Dynamic Payment Details Display */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700 text-sm">
              {paymentMethod === 'Bank' && (
                <div className="space-y-1.5 text-slate-600 dark:text-slate-300">
                  <p><span className="font-semibold text-slate-900 dark:text-white">Bank:</span> Meezan Bank Ltd</p>
                  <p><span className="font-semibold text-slate-900 dark:text-white">Title:</span> Adv Shigrie Law Firm</p>
                  <p><span className="font-semibold text-slate-900 dark:text-white">IBAN:</span> PK34 MEZN 0001 2345 6789</p>
                </div>
              )}
              {paymentMethod === 'JazzCash' && (
                <div className="space-y-1.5 text-slate-600 dark:text-slate-300">
                  <p><span className="font-semibold text-slate-900 dark:text-white">JazzCash Till ID:</span> 00123456</p>
                  <p><span className="font-semibold text-slate-900 dark:text-white">Mobile No:</span> +92 300 1234567</p>
                  <p className="text-xs text-slate-500 mt-2">Scan QR code on invoice to pay directly.</p>
                </div>
              )}
              {paymentMethod === 'EasyPaisa' && (
                <div className="space-y-1.5 text-slate-600 dark:text-slate-300">
                  <p><span className="font-semibold text-slate-900 dark:text-white">EasyPaisa Account:</span> Adv Shigrie</p>
                  <p><span className="font-semibold text-slate-900 dark:text-white">Mobile No:</span> +92 345 1234567</p>
                </div>
              )}
              {paymentMethod === 'Stripe' && (
                <div className="space-y-1.5 text-slate-600 dark:text-slate-300">
                  <p className="font-semibold text-blue-600 dark:text-blue-400">Secure Online Payment Link</p>
                  <p className="text-xs">A Stripe checkout link will be automatically appended to the PDF invoice and email.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}