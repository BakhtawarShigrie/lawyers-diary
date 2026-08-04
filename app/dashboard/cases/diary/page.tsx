'use client';

import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  List, 
  Mic, 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  MapPin, 
  User, 
  Scale,
  Hash,
  MoreVertical,
  CheckCircle,
  PlayCircle,
  PauseCircle
} from 'lucide-react';

// --- Mock Data ---
const courts = ['All Courts', 'Supreme Court', 'High Court', 'District Court', 'Banking Court', 'Family Court'];

const hearings = [
  { 
    id: 1, 
    caseTitle: 'State vs. Ahmed Ali', 
    courtName: 'High Court, Lahore - Room 4', 
    judgeName: 'Hon. Justice Tariq Mehmood', 
    itemNo: '12', 
    clientName: 'Ahmed Ali (Respondent)',
    time: '09:00 AM',
    status: 'In Progress',
    type: 'Bail Hearing'
  },
  { 
    id: 2, 
    caseTitle: 'XYZ Corp vs. ABC Ltd', 
    courtName: 'Banking Court - Room 1', 
    judgeName: 'Hon. Justice Raza Khan', 
    itemNo: '04', 
    clientName: 'XYZ Corp (Petitioner)',
    time: '11:30 AM',
    status: 'Scheduled',
    type: 'Evidence Recording'
  },
  { 
    id: 3, 
    caseTitle: 'Fatima Bibi vs. Khalid', 
    courtName: 'Family Court - Room 2', 
    judgeName: 'Hon. Judge Ayesha Malik', 
    itemNo: '28', 
    clientName: 'Fatima Bibi (Petitioner)',
    time: '01:15 PM',
    status: 'Adjourned',
    type: 'Final Arguments'
  }
];

export default function DiaryPage() {
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [selectedCourt, setSelectedCourt] = useState('All Courts');
  const [isRecording, setIsRecording] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-4 md:p-8 text-slate-900 dark:text-slate-100">
      
      {/* Header Section */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Digital Diary & Cause List</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your daily court hearings and schedule.</p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-1 shadow-sm w-fit">
          <button 
            onClick={() => setView('list')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${view === 'list' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'}`}
          >
            <List className="w-4 h-4" /> List
          </button>
          <button 
            onClick={() => setView('calendar')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${view === 'calendar' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'}`}
          >
            <CalendarIcon className="w-4 h-4" /> Calendar
          </button>
        </div>
      </div>

      {/* Toolbar Section */}
      <div className="flex flex-col xl:flex-row gap-4 mb-8 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm items-center justify-between">
        
        {/* Date Picker Navigation */}
        <div className="flex items-center gap-4 w-full xl:w-auto justify-between xl:justify-start">
          <button className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg font-semibold border border-slate-200 dark:border-slate-700">
            <CalendarIcon className="w-4 h-4 text-blue-500" />
            Today: October 14, 2026
          </div>
          <button className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto">
          {/* Court Filter Dropdown */}
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Filter className="w-4 h-4 text-slate-400" />
            </div>
            <select 
              value={selectedCourt}
              onChange={(e) => setSelectedCourt(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
            >
              {courts.map(court => (
                <option key={court} value={court}>{court}</option>
              ))}
            </select>
          </div>

          {/* Voice Note Trigger */}
          <button 
            onClick={() => setIsRecording(!isRecording)}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm ${isRecording ? 'bg-red-50 text-red-600 border border-red-200 dark:bg-red-900/30 dark:border-red-800 dark:text-red-400 animate-pulse' : 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700'}`}
          >
            <Mic className="w-4 h-4" />
            {isRecording ? 'Recording Note...' : 'Dictate Note'}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {view === 'list' ? (
        <div className="space-y-4">
          {hearings.map((hearing) => (
            <div key={hearing.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                
                {/* Left side: Case & Time info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-md">
                      <Clock className="w-3.5 h-3.5" /> {hearing.time}
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-bold rounded-md">
                      <Hash className="w-3.5 h-3.5" /> Item {hearing.itemNo}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{hearing.caseTitle}</h3>
                  
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-500" /> {hearing.courtName}
                    </span>
                    <span className="flex items-center gap-2">
                      <Scale className="w-4 h-4 text-orange-500" /> {hearing.judgeName}
                    </span>
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4 text-emerald-500" /> {hearing.clientName}
                    </span>
                  </div>
                </div>

                {/* Right side: Actions & Status */}
                <div className="flex flex-col sm:flex-row xl:flex-col items-center sm:items-stretch xl:items-end gap-3 border-t xl:border-t-0 xl:border-l border-slate-100 dark:border-slate-800 pt-4 xl:pt-0 xl:pl-6">
                  
                  {/* Quick Status Update Select */}
                  <select 
                    defaultValue={hearing.status}
                    className={`w-full sm:w-40 px-4 py-2 border rounded-lg text-sm font-semibold outline-none appearance-none cursor-pointer text-center
                      ${hearing.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800' : ''}
                      ${hearing.status === 'Adjourned' ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800' : ''}
                      ${hearing.status === 'Scheduled' ? 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700' : ''}
                      ${hearing.status === 'Decided' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800' : ''}
                    `}
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Adjourned">Adjourned</option>
                    <option value="Decided">Decided</option>
                  </select>

                  <div className="flex gap-2 w-full sm:w-auto">
                    <button className="flex-1 xl:flex-none flex items-center justify-center px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-medium rounded-lg transition-colors">
                      View File
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Calendar View Placeholder */
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-sm min-h-[400px]">
          <CalendarIcon className="w-16 h-16 text-slate-300 dark:text-slate-600 mb-4" />
          <h3 className="text-xl font-bold mb-2">Monthly Calendar View</h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-md">
            The full interactive grid calendar will be rendered here, allowing you to drag and drop hearings across different dates.
          </p>
          <button 
            onClick={() => setView('list')}
            className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Switch back to List View
          </button>
        </div>
      )}

    </div>
  );
}