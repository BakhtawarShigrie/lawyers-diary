'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { 
  ChevronRight, 
  Sparkles, 
  Settings2, 
  FileText, 
  Wand2, 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Heading, 
  Copy, 
  Download, 
  RefreshCw, 
  Feather,
  Save,
  CheckCircle2
} from 'lucide-react';

// --- Types ---
type Language = 'English' | 'Urdu';

export default function AIDraftingWorkspacePage() {
  // Form State
  const [templateType, setTemplateType] = useState('Bail Application');
  const [language, setLanguage] = useState<Language>('English');
  const [partyOne, setPartyOne] = useState('');
  const [partyTwo, setPartyTwo] = useState('');
  const [keyFacts, setKeyFacts] = useState('');

  // Editor State
  const [isGenerating, setIsGenerating] = useState(false);
  const [editorContent, setEditorContent] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  // Mock Generation
  const handleGenerateDraft = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyFacts.trim()) {
      alert('Please enter key facts to generate the draft.');
      return;
    }

    setIsGenerating(true);
    setEditorContent('');

    // Simulate AI Generation Delay
    setTimeout(() => {
      const mockEnglishDraft = `IN THE COURT OF SESSIONS JUDGE, LAHORE

Bail Application No. _____ / 2026

${partyOne || '[Petitioner Name]'}
VS.
${partyTwo || '[Respondent Name / The State]'}

APPLICATION FOR POST-ARREST BAIL UNDER SECTION 497 Cr.P.C.

Respectfully Sheweth:

1. That the Petitioner has been falsely implicated in FIR No. ___ dated ___ registered at Police Station ___.
2. That the key facts of the case are as follows: ${keyFacts}
3. That the Petitioner is innocent and has no connection with the alleged offense. The FIR is a result of mala fide intentions.
4. That the Petitioner is a law-abiding citizen and is ready to furnish reliable surety bonds to the satisfaction of this Honorable Court.

PRAYER:
It is, therefore, respectfully prayed that the Petitioner may graciously be granted post-arrest bail till the final disposal of the case.

Advocate for Petitioner
Dated: ${new Date().toLocaleDateString()}`;

      const mockUrduDraft = `بعدالت جناب سیشن جج صاحب، لاہور

درخواست ضمانت نمبر _____ / 2026

${partyOne || '[نام سائل]'}
بمقابلہ
${partyTwo || '[نام رسپانڈنٹ / سرکار]'}

درخواست ضمانت بعد از گرفتاری زیر دفعہ 497 ضابطہ فوجداری

جناب عالی!
گزارش حسب ذیل ہے:

1. یہ کہ سائل کو مقدمہ/ایف آئی آر نمبر ___ مورخہ ___ تھانہ ___ میں جھوٹا ملوث کیا گیا ہے۔
2. یہ کہ مقدمہ کے اہم حقائق درج ذیل ہیں: ${keyFacts}
3. یہ کہ سائل بالکل بے گناہ ہے اور اس کا مبینہ جرم سے کوئی تعلق نہیں ہے۔ یہ مقدمہ بدنیتی پر مبنی ہے۔
4. یہ کہ سائل ایک معزز شہری ہے اور معزز عدالت کی تسلی کے مطابق قابلِ اعتماد ضمانتی مچلکے داخل کرنے کو تیار ہے۔

استدعا:
لہٰذا استدعا ہے کہ سائل کی ضمانت بعد از گرفتاری تا فیصلہ مقدمہ منظور فرمائی جائے۔

وکیل برائے سائل
تاریخ: ${new Date().toLocaleDateString()}`;

      setEditorContent(language === 'English' ? mockEnglishDraft : mockUrduDraft);
      setIsGenerating(false);
      
      if (editorRef.current) {
        editorRef.current.innerHTML = (language === 'English' ? mockEnglishDraft : mockUrduDraft).replace(/\n/g, '<br/>');
      }
    }, 2500);
  };

  const handleCopy = () => {
    if (editorRef.current) {
      navigator.clipboard.writeText(editorRef.current.innerText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const applyFormat = (command: string) => {
    document.execCommand(command, false, undefined);
    editorRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-4 md:p-8 text-slate-900 dark:text-slate-100 pb-24">
      
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-6">
        <Link href="/dashboard/ai-assistant" className="hover:text-blue-600 transition-colors">AI Assistant Hub</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-slate-900 dark:text-slate-200 font-medium">Drafting Workspace</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            AI Draft Generator
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Provide key facts and let AI generate a legally sound initial draft.</p>
        </div>
      </div>

      {/* Main Split-Screen Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full lg:h-[calc(100vh-200px)] min-h-[700px]">
        
        {/* LEFT PANEL: Inputs & Configuration */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-2">
            <Settings2 className="w-5 h-5 text-blue-600" />
            <h2 className="font-bold">Draft Parameters</h2>
          </div>

          <form onSubmit={handleGenerateDraft} className="p-5 flex-1 overflow-y-auto space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Template Type</label>
              <select 
                value={templateType}
                onChange={(e) => setTemplateType(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium focus:ring-2 focus:ring-purple-500 outline-none transition-all appearance-none"
              >
                <option value="Bail Application">Bail Application (Post/Pre-Arrest)</option>
                <option value="Rent Agreement">Rent / Lease Agreement</option>
                <option value="Written Statement">Written Statement (Civil)</option>
                <option value="Legal Notice">Legal Notice</option>
                <option value="Divorce Deed">Divorce Deed / Khula</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Output Language</label>
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                <button 
                  type="button"
                  onClick={() => setLanguage('English')}
                  className={`flex-1 py-1.5 text-sm font-semibold rounded-md transition-colors ${language === 'English' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                >
                  English
                </button>
                <button 
                  type="button"
                  onClick={() => setLanguage('Urdu')}
                  className={`flex-1 py-1.5 text-sm font-semibold rounded-md transition-colors ${language === 'Urdu' ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                >
                  Urdu (اردو)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Party 1 (e.g., Client)</label>
                <input 
                  type="text" 
                  value={partyOne}
                  onChange={(e) => setPartyOne(e.target.value)}
                  placeholder="Name..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Party 2 (e.g., State)</label>
                <input 
                  type="text" 
                  value={partyTwo}
                  onChange={(e) => setPartyTwo(e.target.value)}
                  placeholder="Name..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Key Facts & Context</label>
              <textarea 
                value={keyFacts}
                onChange={(e) => setKeyFacts(e.target.value)}
                placeholder="Enter the main facts, dates, or specific demands to be included in the draft..."
                className="w-full h-40 px-3 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none transition-all resize-none"
              ></textarea>
            </div>

            <button 
              type="submit"
              disabled={isGenerating || !keyFacts.trim()}
              className="w-full py-3 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-lg transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating Draft...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" /> Generate Draft with AI
                </>
              )}
            </button>
          </form>
        </div>

        {/* RIGHT PANEL: Real-time Interactive AI Text Editor */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col relative overflow-hidden">
          
          {/* Toolbar */}
          <div className="p-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex flex-wrap items-center justify-between gap-3">
            
            {/* Formatting Tools */}
            <div className="flex items-center gap-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-1 rounded-md">
              <button onClick={() => applyFormat('bold')} className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"><Bold className="w-4 h-4" /></button>
              <button onClick={() => applyFormat('italic')} className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"><Italic className="w-4 h-4" /></button>
              <button onClick={() => applyFormat('underline')} className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"><Underline className="w-4 h-4" /></button>
              <div className="w-px h-5 bg-slate-200 dark:bg-slate-700 mx-1"></div>
              <button onClick={() => applyFormat('justifyLeft')} className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"><AlignLeft className="w-4 h-4" /></button>
              <button onClick={() => applyFormat('justifyCenter')} className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"><AlignCenter className="w-4 h-4" /></button>
              <button onClick={() => applyFormat('justifyRight')} className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"><AlignRight className="w-4 h-4" /></button>
              <div className="w-px h-5 bg-slate-200 dark:bg-slate-700 mx-1"></div>
              <button onClick={() => applyFormat('formatBlock')} className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"><Heading className="w-4 h-4" /></button>
            </div>

            {/* Document Actions */}
            <div className="flex items-center gap-2">
              <button 
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-md transition-colors"
              >
                {isCopied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                {isCopied ? 'Copied' : 'Copy'}
              </button>
              <div className="flex bg-slate-100 dark:bg-slate-800 rounded-md overflow-hidden border border-slate-200 dark:border-slate-700">
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors border-r border-slate-200 dark:border-slate-700">
                  <Download className="w-4 h-4" /> DOCX
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors">
                  PDF
                </button>
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-200 dark:text-slate-900 rounded-md transition-colors">
                <Save className="w-4 h-4" /> Save
              </button>
            </div>
          </div>

          {/* Editor Area */}
          <div className="flex-1 relative bg-slate-100/50 dark:bg-slate-950/50 p-6 overflow-y-auto">
            
            {/* Loading Overlay */}
            {isGenerating && (
              <div className="absolute inset-0 z-10 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm flex flex-col items-center justify-center">
                <Sparkles className="w-12 h-12 text-purple-600 dark:text-purple-400 animate-pulse mb-4" />
                <p className="font-bold text-slate-900 dark:text-white text-lg">Drafting Legal Document...</p>
                <p className="text-sm text-slate-500 mt-2">Analyzing facts and structuring legal arguments.</p>
              </div>
            )}

            {/* Editable Canvas (A4 Aspect Ratio Container) */}
            <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 shadow-md border border-slate-200 dark:border-slate-700 min-h-[800px] p-8 md:p-12 focus-within:ring-2 focus-within:ring-purple-500 outline-none transition-all">
              
              {!editorContent && !isGenerating && (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 opacity-50 select-none">
                  <FileText className="w-16 h-16 mb-4" />
                  <p className="text-lg font-medium">Your AI generated draft will appear here.</p>
                </div>
              )}

              <div 
                ref={editorRef}
                contentEditable={true}
                suppressContentEditableWarning={true}
                className={`w-full h-full outline-none leading-relaxed ${
                  language === 'Urdu' 
                    ? 'text-right font-sans text-xl leading-loose tracking-wide' 
                    : 'text-left font-serif'
                }`}
                dir={language === 'Urdu' ? 'rtl' : 'ltr'}
              >
                {/* Content injected via JS for the mockup */}
              </div>

            </div>
          </div>

          {/* Floating AI Actions Menu (Appears at bottom) */}
          {editorContent && !isGenerating && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-slate-800 text-white px-2 py-2 rounded-full shadow-2xl border border-slate-700 flex items-center gap-1 animate-in slide-in-from-bottom-8 fade-in">
              <button className="flex items-center gap-2 px-4 py-1.5 text-sm font-semibold rounded-full hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors">
                <RefreshCw className="w-4 h-4 text-blue-400" />
                Regenerate Clause
              </button>
              <div className="w-px h-5 bg-slate-700"></div>
              <button className="flex items-center gap-2 px-4 py-1.5 text-sm font-semibold rounded-full hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors">
                <Feather className="w-4 h-4 text-emerald-400" />
                Simplify Language
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}