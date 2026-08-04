'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  CalendarDays, 
  ChevronRight, 
  Clock, 
  Video, 
  MapPin, 
  Copy, 
  ExternalLink, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Plus,
  ChevronLeft,
  User,
  Check
} from 'lucide-react';

// --- Types ---
type ApptStatus = 'Confirmed' | 'Pending' | 'Cancelled';
type ApptType = 'Virtual' | 'In-Person';

interface Appointment {
  id: string;
  clientName: string;
  date: string;
  time: string;
  type: ApptType;
  status: ApptStatus;
  notes?: string;
}

// --- Mock Data ---
const upcomingAppointments: Appointment[] = [
  { id: 'APT-01', clientName: 'Ahmed Ali', date: 'Oct 14, 2026', time: '10:00 AM - 11:00 AM', type: 'In-Person', status: 'Confirmed' },
  { id: 'APT-02', clientName: 'XYZ Corp (CEO)', date: 'Oct 14, 2026', time: '02:00 PM - 02:30 PM', type: 'Virtual', status: 'Pending' },
  { id: 'APT-03', clientName: 'Fatima Bibi', date: 'Oct 15, 2026', time: '11:30 AM - 12:15 PM', type: 'In-Person', status: 'Confirmed' },
  { id: 'APT-04', clientName: 'Tariq Mehmood', date: 'Oct 16, 2026', time: '04:00 PM - 05:00 PM', type: 'Virtual', status: 'Cancelled' },
];

const availableSlots = [
  '09:00 AM', '10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '05:00 PM'
];

export default function AppointmentsSchedulerPage() {
  const [selectedDate, setSelectedDate] = useState<number>(14);
  const [selectedSlot, setSelectedSlot] = useState<string>('10:00 AM');
  const [copied, setCopied] = useState(false);

  // Mock Calendar Days generation for October 2026 (Starting Thursday)
  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);
  const emptyStartDays = Array.from({ length: 4 }, (_, i) => i); // Offset for grid

  const bookingLink = "https://lawyerdiary.com/book/adv-shigrie";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(bookingLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusBadge = (status: ApptStatus) => {
    switch(status) {
      case 'Confirmed': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
      case 'Pending': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800';
      case 'Cancelled': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusIcon = (status: ApptStatus) => {
    switch(status) {
      case 'Confirmed': return <CheckCircle2 className="w-3.5 h-3.5" />;
      case 'Pending': return <AlertCircle className="w-3.5 h-3.5" />;
      case 'Cancelled': return <XCircle className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-4 md:p-8 text-slate-900 dark:text-slate-100 pb-24">
      
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-6">
        <Link href="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-slate-900 dark:text-slate-200 font-medium">Appointments</span>
      </div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Appointments & Scheduler</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your consultations and share your availability.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 shadow-sm">
          <Plus className="w-5 h-5" />
          New Appointment
        </button>
      </div>

      {/* Share Public Booking Link Widget */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-blue-200 dark:border-blue-800 shadow-sm p-5 md:p-6 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600"></div>
        <div>
          <h3 className="text-lg font-bold flex items-center gap-2 mb-1">
            <ExternalLink className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Share Public Booking Link
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl">
            Clients can use this link to view your public calendar and request a consultation slot automatically.
          </p>
        </div>
        <div className="flex w-full md:w-auto items-center gap-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1.5 rounded-lg">
          <input 
            type="text" 
            readOnly 
            value={bookingLink}
            className="bg-transparent text-sm font-medium text-slate-600 dark:text-slate-300 px-3 w-full md:w-64 outline-none"
          />
          <button 
            onClick={handleCopyLink}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
              copied 
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' 
                : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-blue-50 hover:text-blue-700 shadow-sm border border-slate-200 dark:border-slate-600'
            }`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Interactive Calendar & Time Slots */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-blue-600" />
                Select Date & Time
              </h2>
              <div className="flex items-center gap-4">
                <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"><ChevronLeft className="w-5 h-5" /></button>
                <span className="font-semibold text-sm">October 2026</span>
                <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"><ChevronRight className="w-5 h-5" /></button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Calendar Grid */}
              <div>
                <div className="grid grid-cols-7 gap-1 mb-2 text-center text-xs font-bold text-slate-400">
                  <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center">
                  {emptyStartDays.map(empty => <div key={`empty-${empty}`} className="p-2"></div>)}
                  {calendarDays.map(day => {
                    const isSelected = day === selectedDate;
                    const isToday = day === 14;
                    return (
                      <button 
                        key={day}
                        onClick={() => setSelectedDate(day)}
                        className={`p-2 w-full aspect-square flex items-center justify-center rounded-lg text-sm font-semibold transition-all ${
                          isSelected 
                            ? 'bg-blue-600 text-white shadow-md' 
                            : isToday 
                              ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800' 
                              : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {day}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Slots List */}
              <div className="border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800 pt-6 md:pt-0 md:pl-6">
                <h3 className="font-semibold text-sm mb-4 text-slate-600 dark:text-slate-400 flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Available slots for Oct {selectedDate}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {availableSlots.map(slot => (
                    <button 
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all border ${
                        selectedSlot === slot 
                          ? 'bg-blue-50 border-blue-600 text-blue-700 dark:bg-blue-900/30 dark:border-blue-500 dark:text-blue-400 ring-1 ring-blue-600' 
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-300 dark:hover:border-slate-500'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                  <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Quick Action</p>
                  <button className="w-full bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                    Block this Slot
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Upcoming Appointments List */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">Upcoming Sessions</h2>
              <Link href="#" className="text-sm text-blue-600 font-semibold hover:underline">View All</Link>
            </div>
            
            <div className="space-y-4">
              {upcomingAppointments.map((appt) => (
                <div key={appt.id} className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/50 flex items-center justify-center font-bold text-xs">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm leading-tight">{appt.clientName}</h4>
                        <p className="text-xs text-slate-500">{appt.date}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded-md flex items-center gap-1 border ${getStatusBadge(appt.status)}`}>
                      {getStatusIcon(appt.status)} {appt.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400">
                      <Clock className="w-3.5 h-3.5" />
                      {appt.time.split(' - ')[0]}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400">
                      {appt.type === 'Virtual' ? <Video className="w-3.5 h-3.5 text-blue-500" /> : <MapPin className="w-3.5 h-3.5 text-emerald-500" />}
                      {appt.type}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}