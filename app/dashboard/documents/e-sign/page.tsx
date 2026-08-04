'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { useAppContext } from '@/app/context/AppContext';
import { ChevronRight, PenTool, Eraser, Save, CheckCircle2 } from 'lucide-react';

// --- Types ---
interface DocumentItem {
  id: string;
  name: string;
  size: string;
  type: string;
  date: string;
}

// --- Helper Functions ---
const generateId = () => `SIGN-${Date.now().toString().slice(-6)}`;
const getCurrentDate = () => new Date().toLocaleDateString();

export default function ESignaturePage() {
  const { getStoredData, setStoredData, isHydrated } = useAppContext();
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Initialize Canvas Context
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#0f172a'; // dark slate for ink
      }
    }
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.beginPath(); // reset path so next click doesn't connect lines
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      let x = 0;
      let y = 0;

      if ('touches' in e) {
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
      } else {
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
      }

      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    setIsSaved(false);
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      // Create a mock document item for the vault
      const newSignatureDoc: DocumentItem = {
        id: generateId(),
        name: 'Digital_Signature.png',
        size: '15 KB', // Mock size for data URL
        type: 'image/png',
        date: getCurrentDate()
      };

      // Save as a document in the vault
      const existingDocs = getStoredData<DocumentItem[]>('lawyer_documents') || [];
      setStoredData('lawyer_documents', [newSignatureDoc, ...existingDocs]);

      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  if (!isHydrated) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 text-slate-900 dark:text-slate-100 pb-24">
      
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-6">
        <Link href="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <Link href="/dashboard/documents" className="hover:text-blue-600 transition-colors">Documents</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-slate-900 dark:text-slate-200 font-medium">Digital Signature</span>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
          <PenTool className="w-7 h-7 text-emerald-500" />
          Digital Signature Pad
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Draw your signature and save it securely to your vault for appending to legal drafts.</p>
      </div>

      <div className="max-w-2xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 md:p-8">
        
        <div className="mb-6">
          <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Draw Signature Below</p>
          <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30 rounded-2xl overflow-hidden cursor-crosshair touch-none">
            <canvas 
              ref={canvasRef}
              width={600}
              height={250}
              onMouseDown={startDrawing}
              onMouseUp={stopDrawing}
              onMouseMove={draw}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchEnd={stopDrawing}
              onTouchMove={draw}
              className="w-full h-auto bg-transparent block"
              style={{ touchAction: 'none' }} // Prevents scrolling on mobile while drawing
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={clearCanvas}
            className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Eraser className="w-4 h-4" /> Clear Pad
          </button>
          <button 
            onClick={saveSignature}
            disabled={isSaved}
            className={`flex-1 py-3 font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 ${isSaved ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-emerald-600 hover:bg-emerald-700 text-white'}`}
          >
            {isSaved ? <CheckCircle2 className="w-5 h-5" /> : <Save className="w-5 h-5" />}
            {isSaved ? 'Saved to Vault!' : 'Save Signature'}
          </button>
        </div>

      </div>
    </div>
  );
}