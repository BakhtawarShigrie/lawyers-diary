'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAppContext } from '@/app/context/AppContext';
import { 
  Calendar as CalendarIcon, Clock, Plus, ChevronRight, 
  Video, CheckCircle2, X 
} from 'lucide-react'; // Removed unused 'User' import

// --- Types ---
interface AppointmentItem {
  id: string;
  clientName: string;
  date: string;
  time: string;
  type: 'In-Person' | 'Virtual Video';
  status: 'Confirmed' | 'Pending';
}

const generateId = () => `APT-${Date.now().toString().slice(-6)}`;

export default function AppointmentsHubPage() {
  const { getStoredData, setStoredData, isHydrated } = useAppContext();
  
  const [appointments, setAppointments] = useState<AppointmentItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form States
  const [clientName, setClientName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [type, setType] = useState<'In-Person' | 'Virtual Video'>('Virtual Video');

  useEffect(() => {
    if (isHydrated) {
      const timer = setTimeout(() => {
        const storedApts = getStoredData<AppointmentItem[]>('lawyer_appointments') || [];
        setAppointments(storedApts);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isHydrated, getStoredData]);

  const handleScheduleAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !date || !time) return;

    setIsSaving(true);

    const newApt: AppointmentItem = {
      id: generateId(),
      clientName,
      date,
      time,
      type,
      status: 'Confirmed'
    };

    setTimeout(() => {
      const updatedApts = [newApt, ...appointments];
      setStoredData('lawyer_appointments', updatedApts);
      setAppointments(updatedApts);

      // Reset form
      setClientName('');
      setDate('');
      setTime('');
      setType('Virtual Video');
      setIsSaving(false);
      setIsModalOpen(false);
    }, 600);
  };

  if (!isHydrated) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 text-slate-900 dark:text-slate-100 pb-24 relative">
      
      <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-6">
        <Link href="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-slate-900 dark:text-slate-200 font-medium">Appointments</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Appointments & Calendar</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Schedule client consultations and court hearing reminders.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard/appointments/virtual" className="px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 rounded-xl text-sm font-bold transition-all shadow-sm hover:shadow-md flex items-center gap-2">
            <Video className="w-4 h-4 text-purple-500" /> Virtual Rooms
          </Link>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-all shadow-md flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Schedule Appointment
          </button>
        </div>
      </div>

      {/* Appointments List */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <h2 className="text-lg font-bold flex items-center gap-2"><CalendarIcon className="w-5 h-5 text-blue-500" /> Upcoming Schedule</h2>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
          {appointments.length > 0 ? (
            appointments.map((apt) => (
              <div key={apt.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl shrink-0 mt-1">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">{apt.clientName}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-3">
                      <span className="flex items-center gap-1"><CalendarIcon className="w-3.5 h-3.5" /> {apt.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {apt.time}</span>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${apt.type === 'Virtual Video' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'}`}>
                    {apt.type}
                  </span>
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {apt.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center text-slate-500">
              <CalendarIcon className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700 mb-3" />
              <p className="font-semibold text-lg">No appointments scheduled</p>
              <p className="text-sm mt-1">Click &quot;Schedule Appointment&quot; to add a new session.</p>
            </div>
          )}
        </div>
      </div>

      {/* --- Schedule Modal --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-md w-full p-6 md:p-8 relative border border-slate-200 dark:border-slate-800">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-2xl font-bold mb-4">Schedule Consultation</h2>

            <form onSubmit={handleScheduleAppointment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Client Name</label>
                <input type="text" required value={clientName} onChange={e => setClientName(e.target.value)} placeholder="e.g. Ahmed Khan" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Date</label>
                  <input type="date" required value={date} onChange={e => setDate(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Time</label>
                  <input type="time" required value={time} onChange={e => setTime(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Consultation Type</label>
                <select value={type} onChange={e => setType(e.target.value as 'In-Person' | 'Virtual Video')} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none appearance-none">
                  <option value="Virtual Video">Virtual Video Consultation</option>
                  <option value="In-Person">In-Person Meeting</option>
                </select>
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 dark:bg-slate-800 dark:text-slate-300">
                  Cancel
                </button>
                <button type="submit" disabled={isSaving} className="flex-1 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md disabled:opacity-70">
                  {isSaving ? 'Scheduling...' : 'Confirm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}