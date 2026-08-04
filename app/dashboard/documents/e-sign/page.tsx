'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  ChevronRight, 
  PenTool, 
  Type, 
  Upload, 
  Stamp, 
  ShieldCheck, 
  Download, 
  FileText, 
  Maximize2,
  Trash2,
  Move,
  CheckCircle2,
  Lock
} from 'lucide-react';

// --- Types ---
type ToolMode = 'draw' | 'type' | 'upload' | 'watermark';

interface PlacedSignature {
  id: string;
  type: ToolMode;
  content: string; // Base64 image, text, etc.
  x: number;
  y: number;
}

export default function DigitalSignStudioPage() {
  const [activeMode, setActiveMode] = useState<ToolMode>('draw');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSecured, setIsSecured] = useState(false);
  
  // Signature States
  const [typedSignature, setTypedSignature] = useState('John Doe');
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');
  const [placedElements, setPlacedElements] = useState<PlacedSignature[]>([]);
  const [isWatermarkActive, setIsWatermarkActive] = useState(false);

  // Canvas Drawing Ref
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Initialize Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && activeMode === 'draw') {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#0f172a'; // Dark blue/slate
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  }, [activeMode]);

  // Canvas Drawing Handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.beginPath();
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  // Add signature to document (Mocking placement at center)
  const handleAddSignature = () => {
    let content = '';
    
    if (activeMode === 'draw') {
      const canvas = canvasRef.current;
      if (canvas) {
        content = canvas.toDataURL('image/png');
      }
    } else if (activeMode === 'type') {
      content = typedSignature;
    }

    if (content) {
      const newSig: PlacedSignature = {
        id: Date.now().toString(),
        type: activeMode,
        content: content,
        x: 50, // % position
        y: 80, // % position
      };
      setPlacedElements([...placedElements, newSig]);
    }
  };

  const removeElement = (id: string) => {
    setPlacedElements(placedElements.filter(el => el.id !== id));
  };

  const handleFinalize = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSecured(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-4 md:p-8 text-slate-900 dark:text-slate-100 pb-24">
      
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-6">
        <Link href="/dashboard/documents" className="hover:text-blue-600 transition-colors">Document Vault</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-slate-900 dark:text-slate-200 font-medium">Digital Signature Studio</span>
      </div>

      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Security & Signature Studio</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Sign, watermark, and encrypt your legal documents.</p>
        </div>
        
        <div className="flex items-center gap-3">
          {isSecured ? (
            <button className="px-5 py-2.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 font-bold rounded-lg transition-colors flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" /> Document Secured
            </button>
          ) : (
            <button 
              onClick={handleFinalize}
              disabled={isProcessing}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white dark:bg-blue-600 dark:hover:bg-blue-700 font-semibold rounded-lg transition-colors flex items-center gap-2 disabled:opacity-70 shadow-md"
            >
              {isProcessing ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <ShieldCheck className="w-5 h-5" />
              )}
              {isProcessing ? 'Encrypting...' : 'Finalize & Secure Document'}
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
        
        {/* LEFT PANE: Toolbar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            
            {/* Tool Selector Tabs */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
              <button 
                onClick={() => setActiveMode('draw')}
                className={`flex-1 py-3 text-xs font-bold uppercase flex flex-col items-center gap-1 transition-colors ${activeMode === 'draw' ? 'text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-900 border-t-2 border-t-blue-600' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
              >
                <PenTool className="w-4 h-4" /> Draw
              </button>
              <button 
                onClick={() => setActiveMode('type')}
                className={`flex-1 py-3 text-xs font-bold uppercase flex flex-col items-center gap-1 transition-colors ${activeMode === 'type' ? 'text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-900 border-t-2 border-t-blue-600' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
              >
                <Type className="w-4 h-4" /> Type
              </button>
              <button 
                onClick={() => setActiveMode('watermark')}
                className={`flex-1 py-3 text-xs font-bold uppercase flex flex-col items-center gap-1 transition-colors ${activeMode === 'watermark' ? 'text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-900 border-t-2 border-t-blue-600' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
              >
                <Stamp className="w-4 h-4" /> Stamp
              </button>
            </div>

            {/* Tool Panels */}
            <div className="p-4 md:p-5">
              
              {/* DRAW PANEL */}
              {activeMode === 'draw' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold">Draw your signature</label>
                    <button onClick={clearCanvas} className="text-xs text-slate-500 hover:text-red-500 transition-colors">Clear</button>
                  </div>
                  <div className="border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/30 overflow-hidden relative cursor-crosshair">
                    <canvas 
                      ref={canvasRef}
                      width={300} 
                      height={150} 
                      className="w-full h-full touch-none"
                      onMouseDown={startDrawing}
                      onMouseUp={stopDrawing}
                      onMouseOut={stopDrawing}
                      onMouseMove={draw}
                      onTouchStart={startDrawing}
                      onTouchEnd={stopDrawing}
                      onTouchMove={draw}
                    />
                  </div>
                  <button 
                    onClick={handleAddSignature}
                    className="w-full py-2.5 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 font-semibold rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors border border-blue-200 dark:border-blue-800/50"
                  >
                    Place on Document
                  </button>
                </div>
              )}

              {/* TYPE PANEL */}
              {activeMode === 'type' && (
                <div className="space-y-4 animate-in fade-in">
                  <label className="block text-sm font-semibold">Type your signature</label>
                  <input 
                    type="text" 
                    value={typedSignature}
                    onChange={(e) => setTypedSignature(e.target.value)}
                    placeholder="e.g., John Doe"
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  
                  {/* Preview */}
                  <div className="p-6 bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 rounded-lg flex items-center justify-center overflow-hidden h-32">
                    <span className="text-4xl font-serif text-slate-800 dark:text-slate-200 tracking-wider" style={{ fontFamily: "'Dancing Script', 'Brush Script MT', cursive" }}>
                      {typedSignature || 'Signature'}
                    </span>
                  </div>

                  <button 
                    onClick={handleAddSignature}
                    className="w-full py-2.5 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 font-semibold rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors border border-blue-200 dark:border-blue-800/50"
                  >
                    Place on Document
                  </button>
                </div>
              )}

              {/* WATERMARK PANEL */}
              {activeMode === 'watermark' && (
                <div className="space-y-4 animate-in fade-in">
                  <label className="block text-sm font-semibold">Custom Watermark</label>
                  <input 
                    type="text" 
                    value={watermarkText}
                    onChange={(e) => setWatermarkText(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none uppercase font-bold"
                  />
                  
                  <div className="pt-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div className="relative">
                        <input 
                          type="checkbox" 
                          checked={isWatermarkActive}
                          onChange={(e) => setIsWatermarkActive(e.target.checked)}
                          className="sr-only" 
                        />
                        <div className={`block w-10 h-6 rounded-full transition-colors ${isWatermarkActive ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'}`}></div>
                        <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isWatermarkActive ? 'transform translate-x-4' : ''}`}></div>
                      </div>
                      <span className="text-sm font-semibold">Enable Watermark Overlay</span>
                    </label>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Info Card */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-xl p-4">
            <h4 className="font-semibold text-blue-800 dark:text-blue-400 flex items-center gap-2 mb-2">
              <Lock className="w-4 h-4" /> Legal Compliance
            </h4>
            <p className="text-xs text-blue-700/80 dark:text-blue-300/80 leading-relaxed">
              Signatures placed via this studio are tracked and stamped with a secure hash. Once finalized, the document will be locked from further edits.
            </p>
          </div>
        </div>

        {/* RIGHT PANE: Document Canvas View */}
        <div className="lg:col-span-3">
          <div className="bg-slate-200/50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl h-[800px] flex flex-col overflow-hidden relative">
            
            {/* Viewer Header */}
            <div className="h-14 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 z-20 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <FileText className="w-4 h-4 text-blue-600" />
                XYZ_Corp_Master_Contract_v2.pdf
              </div>
              <div className="flex gap-2">
                <button className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-slate-50 dark:bg-slate-800 rounded-md">
                  <Download className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-slate-50 dark:bg-slate-800 rounded-md">
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Document Canvas Area */}
            <div className="flex-1 overflow-auto p-4 md:p-8 flex items-start justify-center relative">
              
              {/* Simulated PDF Page (A4 Aspect Ratio) */}
              <div className="bg-white w-full max-w-3xl aspect-[1/1.414] shadow-xl relative border border-slate-300">
                
                {/* Mock Document Content */}
                <div className="p-12 text-slate-800 opacity-60 font-serif select-none pointer-events-none">
                  <h1 className="text-2xl font-bold mb-6 text-center">MASTER SERVICES AGREEMENT</h1>
                  <p className="mb-4 text-sm leading-relaxed">This Master Services Agreement (&quot;Agreement&quot;) is entered into as of the date of the last signature below...</p>
                  <div className="space-y-3">
                    <div className="h-2 bg-slate-200 rounded w-full"></div>
                    <div className="h-2 bg-slate-200 rounded w-full"></div>
                    <div className="h-2 bg-slate-200 rounded w-5/6"></div>
                    <div className="h-2 bg-slate-200 rounded w-full mt-6"></div>
                    <div className="h-2 bg-slate-200 rounded w-3/4"></div>
                  </div>
                  
                  <div className="absolute bottom-24 left-12">
                    <p className="text-sm font-bold border-t border-slate-400 pt-2 w-48">Authorized Signature (Client)</p>
                  </div>
                  <div className="absolute bottom-24 right-12">
                    <p className="text-sm font-bold border-t border-slate-400 pt-2 w-48">Authorized Signature (Firm)</p>
                  </div>
                </div>

                {/* Placed Signatures Overlay */}
                {placedElements.map((el) => (
                  <div 
                    key={el.id} 
                    className="absolute group border-2 border-transparent hover:border-blue-500 hover:border-dashed p-2 cursor-move"
                    style={{ left: `${el.x}%`, top: `${el.y}%`, transform: 'translate(-50%, -50%)' }}
                  >
                    {/* Delete button (visible on hover) */}
                    <button 
                      onClick={() => removeElement(el.id)}
                      className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>

                    {/* Drag Handle (visible on hover) */}
                    <div className="absolute -top-3 -left-3 bg-blue-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <Move className="w-3 h-3" />
                    </div>

                    {el.type === 'draw' ? (
                      <img src={el.content} alt="Drawn Signature" className="max-h-24 pointer-events-none mix-blend-multiply" />
                    ) : (
                      <div className="text-4xl font-serif text-slate-800 pointer-events-none" style={{ fontFamily: "'Dancing Script', 'Brush Script MT', cursive" }}>
                        {el.content}
                      </div>
                    )}
                  </div>
                ))}

                {/* Global Watermark Overlay */}
                {isWatermarkActive && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
                    <div className="transform -rotate-45 text-red-500/20 font-black text-6xl md:text-8xl tracking-widest whitespace-nowrap border-8 border-red-500/20 p-8 rounded-xl uppercase">
                      {watermarkText || 'CONFIDENTIAL'}
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Secure Overlay Cover (when finalized) */}
            {isSecured && (
              <div className="absolute inset-0 z-30 bg-slate-900/60 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mb-4 shadow-xl shadow-emerald-500/30">
                  <ShieldCheck className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-2">Document Secured</h2>
                <p className="text-slate-200 mb-6 max-w-md text-center">The signatures have been applied and the document is now locked with an encrypted hash.</p>
                <div className="flex gap-4">
                  <button className="px-6 py-2.5 bg-white text-slate-900 font-bold rounded-lg hover:bg-slate-100 transition-colors">
                    Download Signed PDF
                  </button>
                  <button className="px-6 py-2.5 bg-slate-800 text-white font-bold rounded-lg hover:bg-slate-700 border border-slate-700 transition-colors">
                    Return to Vault
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}