'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { ChevronRight, UploadCloud, Search, FileText, CheckCircle2 } from 'lucide-react';

export default function OCRScannerPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [extractedText, setExtractedText] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setExtractedText(''); // reset
        setProgress(0);
      };
      reader.readAsDataURL(file);
    }
  };

  const startScan = () => {
    if (!selectedImage) return;
    setIsScanning(true);
    setProgress(0);

    // Simulate OCR Scanning Progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          // Set mock extracted text
          setExtractedText("FIR NO: 123/2026\nPolice Station: Model Town, Lahore\nDate: 12-Aug-2026\n\nStatement:\nThe complainant stated that on the night of 10th August, two unidentified persons entered the premises and stole valuable documents. The CCTV footage has been attached for reference.\n\nInvestigating Officer: Sub-Inspector Ali Raza");
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 text-slate-900 dark:text-slate-100 pb-24">
      
      <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-6">
        <Link href="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <Link href="/dashboard/documents" className="hover:text-blue-600 transition-colors">Documents</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-slate-900 dark:text-slate-200 font-medium">OCR Scanner</span>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
          <Search className="w-7 h-7 text-orange-500" />
          OCR Document Scanner
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Extract editable text from images, scanned FIRs, and physical documents.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Upload & Image Preview */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex flex-col items-center justify-center min-h-[400px]">
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleImageUpload}
          />
          
          {selectedImage ? (
            <div className="w-full flex flex-col items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={selectedImage} alt="Uploaded for OCR" className="max-h-64 object-contain rounded-lg border border-slate-200 dark:border-slate-700 mb-6 shadow-sm" />
              
              <div className="flex gap-4 w-full max-w-sm">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isScanning}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl transition-colors disabled:opacity-50"
                >
                  Change Image
                </button>
                <button 
                  onClick={startScan}
                  disabled={isScanning}
                  className="flex-1 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition-all shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isScanning ? `${progress}%` : 'Start Scan'}
                </button>
              </div>
            </div>
          ) : (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-full border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors p-10 text-center"
            >
              <UploadCloud className="w-12 h-12 text-slate-400 mb-4" />
              <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-1">Upload Image to Scan</h3>
              <p className="text-sm text-slate-500">Supports JPG, PNG formats.</p>
            </div>
          )}
        </div>

        {/* OCR Result */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <FileText className="w-5 h-5 text-orange-500" />
            <h2 className="font-bold text-lg">Extracted Text</h2>
          </div>

          <div className="flex-1 relative min-h-[300px]">
            {isScanning ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-full max-w-xs bg-slate-100 dark:bg-slate-800 rounded-full h-2 mb-4 overflow-hidden">
                  <div className="bg-orange-500 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                </div>
                <p className="text-sm font-bold text-slate-500 animate-pulse">Running AI OCR Engine...</p>
              </div>
            ) : extractedText ? (
              <div className="h-full flex flex-col">
                <textarea 
                  value={extractedText}
                  onChange={(e) => setExtractedText(e.target.value)}
                  className="flex-1 w-full p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-sm leading-relaxed outline-none focus:ring-2 focus:ring-orange-500 resize-none mb-4"
                />
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(extractedText);
                    alert("Text copied to clipboard!");
                  }}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" /> Copy Extracted Text
                </button>
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                <FileText className="w-16 h-16 mb-4 opacity-20" />
                <p className="font-medium text-sm">Text will appear here after scanning.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}