'use client';

import React, { useState } from 'react';
import { 
  UploadCloud, 
  Camera, 
  FileImage, 
  Languages, 
  Download, 
  Save, 
  RefreshCw, 
  ChevronRight,
  Maximize2,
  FileText,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';

export default function OCRDigitizerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasProcessed, setHasProcessed] = useState(false);
  const [language, setLanguage] = useState<'Urdu' | 'English'>('Urdu');
  const [extractedText, setExtractedText] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  // Mock Urdu FIR Text for demonstration
  const mockUrduText = `ابتدائی اطلاعی رپورٹ
تھانہ: سول لائنز، لاہور
تاریخ وقوعہ: 10 اکتوبر 2026
وقت: صبح 9:30 بجے

تفصیلات: 
درخواست دہندہ احمد علی نے رپورٹ درج کرائی ہے کہ ان کی دکان واقع مین بازار میں رات گئے نامعلوم افراد نے تالا توڑ کر چوری کی واردات کی۔ دکان سے نقدی اور قیمتی سامان غائب ہے۔ پولیس سے کارروائی کی اپیل ہے۔`;

  const mockEnglishText = `First Information Report (FIR)
Police Station: Civil Lines, Lahore
Date of Incident: 10 October 2026
Time: 9:30 AM

Details:
The complainant, Ahmed Ali, reported that unidentified individuals broke the lock of his shop located in Main Bazaar late at night and committed theft. Cash and valuable goods are missing from the shop. Requesting police action.`;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      simulateOCR();
    }
  };

  const simulateOCR = () => {
    setIsProcessing(true);
    setHasProcessed(false);
    setIsSaved(false);
    
    // Simulate OCR processing time
    setTimeout(() => {
      setExtractedText(mockUrduText);
      setLanguage('Urdu');
      setIsProcessing(false);
      setHasProcessed(true);
    }, 2500);
  };

  const handleTranslate = () => {
    if (language === 'Urdu') {
      setExtractedText(mockEnglishText);
      setLanguage('English');
    } else {
      setExtractedText(mockUrduText);
      setLanguage('Urdu');
    }
  };

  const handleSaveToVault = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-4 md:p-8 text-slate-900 dark:text-slate-100 pb-24">
      
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-6">
        <Link href="/dashboard/documents" className="hover:text-blue-600 transition-colors">Document Vault</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-slate-900 dark:text-slate-200 font-medium">OCR & Digitizer</span>
      </div>

      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">AI Document Digitizer (OCR)</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Extract editable Urdu & English text from scanned files, FIRs, or images.</p>
        </div>
        {hasProcessed && (
          <button 
            onClick={() => { setFile(null); setHasProcessed(false); }}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Scan New Document
          </button>
        )}
      </div>

      {!file && !isProcessing && !hasProcessed ? (
        /* Upload Area */
        <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 p-12 flex flex-col items-center justify-center text-center shadow-sm max-w-3xl mx-auto mt-12 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
          <div className="flex gap-4 mb-6">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-full flex items-center justify-center">
              <UploadCloud className="w-8 h-8" />
            </div>
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full flex items-center justify-center">
              <Camera className="w-8 h-8" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Upload or Capture Document</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8">
            Select a scanned PDF, hand-written Urdu FIR image, or capture directly from your camera to extract text instantly.
          </p>
          
          <div className="flex gap-4">
            <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-sm flex items-center gap-2">
              <UploadCloud className="w-5 h-5" /> Browse Files
              <input type="file" className="hidden" accept="image/*,.pdf" onChange={handleFileUpload} />
            </label>
            <button className="bg-slate-800 hover:bg-slate-900 dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-sm flex items-center gap-2">
              <Camera className="w-5 h-5" /> Open Camera
            </button>
          </div>
        </div>
      ) : (
        /* Processing or Side-by-Side View */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[700px]">
          
          {/* LEFT PANE: Original Document */}
          <div className="bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
            <div className="p-3 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <FileImage className="w-4 h-4 text-blue-600" /> Original Source
              </h3>
              <button className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-md">
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1 p-4 flex items-center justify-center relative overflow-hidden bg-slate-200/50 dark:bg-slate-800/30">
              {/* Fake Document Preview Image (using a stylized div for demo) */}
              <div className="w-full h-full max-w-md bg-white dark:bg-slate-200 shadow-xl border border-slate-300 transform -rotate-1 relative opacity-90 p-8 flex flex-col gap-4 overflow-hidden">
                <div className="w-full h-4 bg-slate-200 rounded-sm w-3/4 self-end"></div>
                <div className="w-full h-4 bg-slate-200 rounded-sm w-1/2 self-end"></div>
                <div className="w-full h-12 bg-slate-200 rounded-sm mt-4"></div>
                <div className="w-full h-4 bg-slate-200 rounded-sm mt-2"></div>
                <div className="w-full h-4 bg-slate-200 rounded-sm"></div>
                <div className="w-full h-4 bg-slate-200 rounded-sm w-5/6"></div>
                
                {/* Processing Overlay */}
                {isProcessing && (
                  <div className="absolute inset-0 bg-blue-600/10 backdrop-blur-sm flex flex-col items-center justify-center">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="font-bold text-blue-800 bg-white/80 px-4 py-1 rounded-full shadow-sm text-sm">
                      AI is scanning document...
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT PANE: Extracted Editable Text */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
            <div className="p-3 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-600" /> Extracted Text
              </h3>
              
              {/* Action Toolbar */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleTranslate}
                  disabled={isProcessing}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 dark:text-indigo-400 text-xs font-bold rounded-lg transition-colors disabled:opacity-50"
                >
                  <Languages className="w-3.5 h-3.5" /> 
                  Translate to {language === 'Urdu' ? 'English' : 'Urdu'}
                </button>
                <button 
                  disabled={isProcessing}
                  className="p-1.5 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors disabled:opacity-50"
                  title="Export as PDF"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button 
                  onClick={handleSaveToVault}
                  disabled={isProcessing}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-colors disabled:opacity-50 ${
                    isSaved 
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' 
                      : 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-blue-600 dark:hover:bg-blue-700'
                  }`}
                >
                  {isSaved ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
                  {isSaved ? 'Saved!' : 'Save to Vault'}
                </button>
              </div>
            </div>

            {/* Editable Text Area */}
            <div className="flex-1 p-4">
              {isProcessing ? (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <p className="text-sm font-medium animate-pulse">Running Optical Character Recognition...</p>
                </div>
              ) : (
                <textarea 
                  value={extractedText}
                  onChange={(e) => setExtractedText(e.target.value)}
                  dir={language === 'Urdu' ? 'rtl' : 'ltr'}
                  className={`w-full h-full resize-none p-4 bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    language === 'Urdu' 
                      ? 'font-sans text-xl leading-loose tracking-wide' 
                      : 'font-mono text-sm leading-relaxed'
                  }`}
                />
              )}
            </div>
            
            {!isProcessing && (
              <div className="p-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 flex justify-between">
                <span>{language} Output</span>
                <span>{extractedText.length} characters</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}