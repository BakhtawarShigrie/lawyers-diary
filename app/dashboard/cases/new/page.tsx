'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronRight, 
  Check, 
  Briefcase, 
  Users, 
  Calendar, 
  CreditCard, 
  UploadCloud, 
  Save, 
  ArrowRight, 
  ArrowLeft,
  AlertCircle
} from 'lucide-react';

// --- Types ---
type Step = 1 | 2 | 3 | 4;

interface FormData {
  // Step 1
  caseTitle: string;
  caseNumber: string;
  forum: string;
  judge: string;
  // Step 2
  clientName: string;
  clientRole: string;
  respondentName: string;
  opposingCounsel: string;
  // Step 3
  filingDate: string;
  firstHearingDate: string;
  limitationDate: string;
  // Step 4
  retainerFee: string;
  currency: string;
}

export default function NewCasePage() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>({
    caseTitle: '',
    caseNumber: '',
    forum: '',
    judge: '',
    clientName: '',
    clientRole: 'Petitioner',
    respondentName: '',
    opposingCounsel: '',
    filingDate: '',
    firstHearingDate: '',
    limitationDate: '',
    retainerFee: '',
    currency: 'PKR',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    { id: 1, title: 'Basic Info', icon: Briefcase },
    { id: 2, title: 'Parties', icon: Users },
    { id: 3, title: 'Dates', icon: Calendar },
    { id: 4, title: 'Fees & Files', icon: CreditCard },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateStep = (step: Step): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    let isValid = true;

    if (step === 1) {
      if (!formData.caseTitle.trim()) { newErrors.caseTitle = 'Case Title is required'; isValid = false; }
      if (!formData.caseNumber.trim()) { newErrors.caseNumber = 'Case Number is required'; isValid = false; }
      if (!formData.forum) { newErrors.forum = 'Forum / Court is required'; isValid = false; }
    } else if (step === 2) {
      if (!formData.clientName.trim()) { newErrors.clientName = 'Client Name is required'; isValid = false; }
      if (!formData.respondentName.trim()) { newErrors.respondentName = 'Opposing Party Name is required'; isValid = false; }
    } else if (step === 3) {
      if (!formData.filingDate) { newErrors.filingDate = 'Filing Date is required'; isValid = false; }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep(currentStep) && currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as Step);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step);
    }
  };

  const handleSaveDraft = () => {
    // In a real app, this would trigger an API call to save the current state
    alert('Draft saved successfully!');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(4)) {
      setIsSubmitting(true);
      // Simulate API submission
      setTimeout(() => {
        alert('Case created successfully!');
        setIsSubmitting(false);
        // router.push('/dashboard/cases');
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-4 md:p-8 text-slate-900 dark:text-slate-100 pb-24">
      
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-6">
        <Link href="/dashboard/cases" className="hover:text-blue-600 transition-colors">Cases Directory</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-slate-900 dark:text-slate-200 font-medium">Add New Case</span>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Create New Case File</h1>
          <p className="text-slate-500 dark:text-slate-400">Follow the steps to register a new matter in your digital diary.</p>
        </div>

        {/* Stepper Progress */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between relative">
            {/* Progress Line */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full z-0"></div>
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 rounded-full z-0 transition-all duration-300"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            ></div>

            {/* Steps */}
            {steps.map((step) => {
              const isCompleted = currentStep > step.id;
              const isActive = currentStep === step.id;
              
              return (
                <div key={step.id} className="relative z-10 flex flex-col items-center gap-2 bg-white dark:bg-slate-900 px-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                    isCompleted 
                      ? 'bg-blue-600 border-blue-600 text-white' 
                      : isActive 
                        ? 'bg-blue-50 border-blue-600 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' 
                        : 'bg-white border-slate-200 text-slate-400 dark:bg-slate-900 dark:border-slate-700'
                  }`}>
                    {isCompleted ? <Check className="w-5 h-5" /> : <step.icon className="w-4 h-4" />}
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-wider hidden sm:block ${
                    isActive || isCompleted ? 'text-slate-900 dark:text-slate-200' : 'text-slate-400'
                  }`}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Area */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="p-6 md:p-8">
            
            {/* STEP 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <h2 className="text-xl font-bold flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <Briefcase className="w-5 h-5 text-blue-600" /> Basic Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-semibold mb-2">Case Title <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      name="caseTitle"
                      value={formData.caseTitle}
                      onChange={handleInputChange}
                      placeholder="e.g., State vs. Ahmed Ali" 
                      className={`w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all ${errors.caseTitle ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'}`}
                    />
                    {errors.caseTitle && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.caseTitle}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Case Number / FIR No <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      name="caseNumber"
                      value={formData.caseNumber}
                      onChange={handleInputChange}
                      placeholder="e.g., CR-2026/405" 
                      className={`w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all ${errors.caseNumber ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'}`}
                    />
                    {errors.caseNumber && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.caseNumber}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Forum / Court <span className="text-red-500">*</span></label>
                    <select 
                      name="forum"
                      value={formData.forum}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border rounded-lg text-sm appearance-none focus:ring-2 focus:ring-blue-500 outline-none transition-all ${errors.forum ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'}`}
                    >
                      <option value="">Select Court...</option>
                      <option value="Supreme Court">Supreme Court</option>
                      <option value="High Court">High Court</option>
                      <option value="District Court">District Court</option>
                      <option value="Banking Court">Banking Court</option>
                      <option value="Family Court">Family Court</option>
                    </select>
                    {errors.forum && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.forum}</p>}
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-semibold mb-2">Assigned Judge (Optional)</label>
                    <input 
                      type="text" 
                      name="judge"
                      value={formData.judge}
                      onChange={handleInputChange}
                      placeholder="e.g., Hon. Justice Tariq Mehmood" 
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Parties Details */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <h2 className="text-xl font-bold flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <Users className="w-5 h-5 text-blue-600" /> Client & Opposing Party
                </h2>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-lg space-y-4">
                  <h3 className="font-semibold text-blue-800 dark:text-blue-300">Our Client Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Client Name <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        name="clientName"
                        value={formData.clientName}
                        onChange={handleInputChange}
                        placeholder="Enter Client Name" 
                        className={`w-full px-4 py-2.5 bg-white dark:bg-slate-900 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all ${errors.clientName ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'}`}
                      />
                      {errors.clientName && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.clientName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Client Role</label>
                      <select 
                        name="clientRole"
                        value={formData.clientRole}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      >
                        <option value="Petitioner">Petitioner / Plaintiff</option>
                        <option value="Respondent">Respondent / Defendant</option>
                        <option value="Appellant">Appellant</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800/50 rounded-lg space-y-4 mt-6">
                  <h3 className="font-semibold text-orange-800 dark:text-orange-300">Opposing Party Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Opposing Party Name <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        name="respondentName"
                        value={formData.respondentName}
                        onChange={handleInputChange}
                        placeholder="Enter Opposing Party" 
                        className={`w-full px-4 py-2.5 bg-white dark:bg-slate-900 border rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none transition-all ${errors.respondentName ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'}`}
                      />
                      {errors.respondentName && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.respondentName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Opposing Counsel (Optional)</label>
                      <input 
                        type="text" 
                        name="opposingCounsel"
                        value={formData.opposingCounsel}
                        onChange={handleInputChange}
                        placeholder="Name of opposing lawyer" 
                        className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Dates & Deadlines */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <h2 className="text-xl font-bold flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <Calendar className="w-5 h-5 text-blue-600" /> Dates & Deadlines
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Institution / Filing Date <span className="text-red-500">*</span></label>
                    <input 
                      type="date" 
                      name="filingDate"
                      value={formData.filingDate}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all ${errors.filingDate ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'}`}
                    />
                    {errors.filingDate && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.filingDate}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold mb-2">First Hearing Date (Optional)</label>
                    <input 
                      type="date" 
                      name="firstHearingDate"
                      value={formData.firstHearingDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>

                  <div className="col-span-1 md:col-span-2">
                    <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 p-4 rounded-lg">
                      <label className="block text-sm font-semibold text-red-800 dark:text-red-400 mb-2 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" /> Limitation Deadline (Optional)
                      </label>
                      <p className="text-xs text-red-600 dark:text-red-500 mb-3">Set a deadline for filing appeals or written statements to trigger automated reminders.</p>
                      <input 
                        type="date" 
                        name="limitationDate"
                        value={formData.limitationDate}
                        onChange={handleInputChange}
                        className="w-full md:w-1/2 px-4 py-2.5 bg-white dark:bg-slate-900 border border-red-200 dark:border-red-800 rounded-lg text-sm focus:ring-2 focus:ring-red-500 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Fees & Attachments */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <h2 className="text-xl font-bold flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <CreditCard className="w-5 h-5 text-blue-600" /> Fees & Initial Attachments
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Fee Section */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">Initial Retainer Fee (Optional)</label>
                    <div className="flex">
                      <select 
                        name="currency"
                        value={formData.currency}
                        onChange={handleInputChange}
                        className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border border-r-0 border-slate-200 dark:border-slate-700 rounded-l-lg text-sm font-semibold appearance-none outline-none"
                      >
                        <option value="PKR">PKR</option>
                        <option value="USD">USD</option>
                        <option value="GBP">GBP</option>
                      </select>
                      <input 
                        type="number" 
                        name="retainerFee"
                        value={formData.retainerFee}
                        onChange={handleInputChange}
                        placeholder="0.00" 
                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-r-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-2">You can generate a formal invoice for this amount later from the dashboard.</p>
                  </div>

                  {/* Upload Section */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">Upload Initial Documents (Optional)</label>
                    <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
                      <UploadCloud className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Click to upload or drag and drop</p>
                      <p className="text-xs text-slate-500 mt-1">PDF, DOCX, JPG (Max 10MB)</p>
                      <button className="mt-4 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700">
                        Select Files
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Footer Actions */}
          <div className="p-6 md:p-8 border-t border-slate-100 dark:border-slate-800 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-900/50 rounded-b-xl">
            <button 
              type="button"
              onClick={handleSaveDraft}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
            >
              <Save className="w-4 h-4" /> Save as Draft
            </button>
            
            <div className="flex gap-3 w-full sm:w-auto">
              <button 
                type="button"
                onClick={handleBack}
                disabled={currentStep === 1}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors border ${
                  currentStep === 1 
                    ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed dark:bg-slate-800 dark:border-slate-700 dark:text-slate-500' 
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800'
                }`}
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>

              {currentStep < 4 ? (
                <button 
                  type="button"
                  onClick={handleNext}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  Next Step <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button 
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Saving...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Check className="w-4 h-4" /> Create Case
                    </span>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}