'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronRight, 
  Check, 
  X, 
  CreditCard, 
  Zap, 
  Building2, 
  User, 
  Star,
  ShieldCheck,
  ArrowRight,
  Clock
} from 'lucide-react';

// --- Types & Mock Data ---
interface PlanFeature {
  name: string;
  included: boolean;
  limit?: string;
}

interface PricingPlan {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  monthlyPrice: number;
  annualPrice: number; // monthly equivalent when billed annually
  highlighted: boolean;
  features: PlanFeature[];
}

const pricingPlans: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Solo Basic',
    icon: User,
    description: 'Perfect for solo practitioners starting their digital journey.',
    monthlyPrice: 0,
    annualPrice: 0,
    highlighted: false,
    features: [
      { name: 'Active Cases', included: true, limit: 'Up to 20' },
      { name: 'Document Storage', included: true, limit: '5 GB' },
      { name: 'Basic Cause List', included: true },
      { name: 'Client CRM', included: true, limit: '50 Clients' },
      { name: 'AI Assistant', included: false },
      { name: 'Team Management', included: false },
    ]
  },
  {
    id: 'pro',
    name: 'Professional Lawyer',
    icon: Zap,
    description: 'Everything you need to scale your legal practice with AI.',
    monthlyPrice: 4500,
    annualPrice: 3600, // 20% off
    highlighted: true,
    features: [
      { name: 'Active Cases', included: true, limit: 'Unlimited' },
      { name: 'Document Storage', included: true, limit: '100 GB' },
      { name: 'Automated Cause List', included: true },
      { name: 'Client CRM & Portal', included: true, limit: 'Unlimited' },
      { name: 'AI Legal Assistant', included: true, limit: 'Unlimited Drafts' },
      { name: 'Team Management', included: false },
    ]
  },
  {
    id: 'enterprise',
    name: 'Law Firm / Enterprise',
    icon: Building2,
    description: 'Advanced collaboration and analytics for multi-partner firms.',
    monthlyPrice: 12000,
    annualPrice: 9600, // 20% off
    highlighted: false,
    features: [
      { name: 'Active Cases', included: true, limit: 'Unlimited' },
      { name: 'Document Storage', included: true, limit: '1 TB' },
      { name: 'Automated Cause List', included: true },
      { name: 'Client CRM & Portal', included: true, limit: 'Unlimited' },
      { name: 'AI Legal Assistant', included: true, limit: 'Unlimited Drafts' },
      { name: 'Team Management', included: true, limit: 'Up to 15 Users' },
    ]
  }
];

const featureMatrix = [
  { feature: 'Cases Management', basic: '20 Cases', pro: 'Unlimited', enterprise: 'Unlimited' },
  { feature: 'Cloud Storage Vault', basic: '5 GB', pro: '100 GB', enterprise: '1 TB' },
  { feature: 'AI Draft Generator', basic: false, pro: true, enterprise: true },
  { feature: 'Case Law Search Engine', basic: false, pro: true, enterprise: true },
  { feature: 'Document OCR Scanner', basic: '10 / month', pro: 'Unlimited', enterprise: 'Unlimited' },
  { feature: 'Client Access Portal', basic: false, pro: true, enterprise: true },
  { feature: 'Custom Firm Branding', basic: false, pro: false, enterprise: true },
  { feature: 'Role-Based Access (RBAC)', basic: false, pro: false, enterprise: true },
  { feature: 'Dedicated Account Manager', basic: false, pro: false, enterprise: true },
];

export default function SubscriptionPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-4 md:p-8 text-slate-900 dark:text-slate-100 pb-24">
      
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-6">
        <Link href="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-slate-900 dark:text-slate-200 font-medium">Subscription & Billing</span>
      </div>

      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header & Current Plan Widget */}
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Plans & Billing</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Manage your subscription, upgrade your plan, and review features.</p>
          </div>
          
          {/* Current Active Plan Card */}
          <div className="bg-white dark:bg-slate-900 p-4 md:p-5 rounded-xl border border-blue-200 dark:border-blue-800 shadow-sm flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto relative overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-1.5 bg-blue-600"></div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Current Plan</p>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Solo Basic</h3>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs font-bold rounded-md flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Active
                </span>
              </div>
              <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                <Clock className="w-3.5 h-3.5" /> Renews on: Lifetime Free
              </p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto mt-2 sm:mt-0">
              <button className="flex-1 sm:flex-none px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-semibold rounded-lg transition-colors border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-2">
                <CreditCard className="w-4 h-4" /> Payment Methods
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="pt-8">
          {/* Billing Toggle */}
          <div className="flex flex-col items-center justify-center mb-12">
            <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-2 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm relative">
              <button 
                onClick={() => setIsAnnual(false)}
                className={`relative z-10 px-6 py-2.5 text-sm font-bold rounded-full transition-colors ${!isAnnual ? 'text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setIsAnnual(true)}
                className={`relative z-10 px-6 py-2.5 text-sm font-bold rounded-full transition-colors flex items-center gap-2 ${isAnnual ? 'text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
              >
                Annually 
                <span className={`px-2 py-0.5 text-[10px] uppercase rounded-full ${isAnnual ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400'}`}>Save 20%</span>
              </button>
              
              {/* Sliding Background */}
              <div 
                className={`absolute top-2 bottom-2 bg-blue-600 rounded-full transition-all duration-300 ease-in-out ${!isAnnual ? 'left-2 w-[100px]' : 'left-[108px] w-[145px]'}`}
              />
            </div>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <div 
                key={plan.id}
                className={`relative bg-white dark:bg-slate-900 rounded-2xl flex flex-col transition-all duration-300 ${
                  plan.highlighted 
                    ? 'border-2 border-blue-600 shadow-xl md:scale-105 z-10' 
                    : 'border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1 uppercase tracking-wider">
                    <Star className="w-3 h-3 fill-current" /> Most Popular
                  </div>
                )}
                
                <div className="p-6 md:p-8 flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2.5 rounded-lg ${plan.highlighted ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30' : 'bg-slate-100 text-slate-600 dark:bg-slate-800'}`}>
                      <plan.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                  </div>
                  
                  <p className="text-sm text-slate-500 dark:text-slate-400 min-h-[40px] mb-6">
                    {plan.description}
                  </p>

                  <div className="mb-6">
                    <span className="text-4xl font-black">
                      Rs. {(isAnnual ? plan.annualPrice : plan.monthlyPrice).toLocaleString()}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 font-medium">
                      /mo
                    </span>
                    {isAnnual && plan.monthlyPrice > 0 && (
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                        Billed Rs. {(plan.annualPrice * 12).toLocaleString()} annually
                      </p>
                    )}
                  </div>

                  <button 
                    className={`w-full py-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 mb-8 ${
                      plan.highlighted 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md' 
                        : plan.monthlyPrice === 0 
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed dark:bg-slate-800'
                          : 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900'
                    }`}
                    disabled={plan.monthlyPrice === 0}
                  >
                    {plan.monthlyPrice === 0 ? 'Current Plan' : 'Upgrade Now'} 
                    {plan.monthlyPrice !== 0 && <ArrowRight className="w-4 h-4" />}
                  </button>

                  <div className="space-y-4">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">What&apos;s included</p>
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-slate-300 dark:text-slate-700 shrink-0" />
                        )}
                        <div>
                          <p className={`text-sm ${feature.included ? 'text-slate-700 dark:text-slate-300 font-medium' : 'text-slate-400 dark:text-slate-600 line-through'}`}>
                            {feature.name}
                          </p>
                          {feature.limit && feature.included && (
                            <p className="text-xs text-slate-500">{feature.limit}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Comparison Matrix */}
        <div className="pt-12">
          <h2 className="text-2xl font-bold mb-8 text-center">Compare Plan Features</h2>
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                    <th className="p-5 font-bold text-slate-900 dark:text-white w-1/3">Core Features</th>
                    <th className="p-5 font-bold text-center text-slate-900 dark:text-white">Solo Basic</th>
                    <th className="p-5 font-bold text-center text-blue-600 dark:text-blue-400">Pro Lawyer</th>
                    <th className="p-5 font-bold text-center text-slate-900 dark:text-white">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                  {featureMatrix.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="p-5 font-medium text-sm text-slate-700 dark:text-slate-300">
                        {row.feature}
                      </td>
                      
                      {/* Basic */}
                      <td className="p-5 text-center text-sm font-medium text-slate-600 dark:text-slate-400">
                        {typeof row.basic === 'boolean' ? (
                          row.basic ? <Check className="w-5 h-5 text-emerald-500 mx-auto" /> : <X className="w-5 h-5 text-slate-300 dark:text-slate-700 mx-auto" />
                        ) : (
                          row.basic
                        )}
                      </td>
                      
                      {/* Pro */}
                      <td className="p-5 text-center text-sm font-bold text-blue-700 dark:text-blue-400 bg-blue-50/30 dark:bg-blue-900/10">
                        {typeof row.pro === 'boolean' ? (
                          row.pro ? <Check className="w-5 h-5 text-blue-500 mx-auto" /> : <X className="w-5 h-5 text-slate-300 dark:text-slate-700 mx-auto" />
                        ) : (
                          row.pro
                        )}
                      </td>
                      
                      {/* Enterprise */}
                      <td className="p-5 text-center text-sm font-medium text-slate-600 dark:text-slate-400">
                        {typeof row.enterprise === 'boolean' ? (
                          row.enterprise ? <Check className="w-5 h-5 text-emerald-500 mx-auto" /> : <X className="w-5 h-5 text-slate-300 dark:text-slate-700 mx-auto" />
                        ) : (
                          row.enterprise
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}