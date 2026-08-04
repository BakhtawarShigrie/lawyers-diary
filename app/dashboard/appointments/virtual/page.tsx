'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Video, Users, ExternalLink } from 'lucide-react';

export default function VirtualMeetingsHubPage() {
  const rooms = [
    { id: 'RM-101', title: 'Client Consultation Room #1', host: 'Adv. Shigrie', status: 'Active' },
    { id: 'RM-102', title: 'Mediation & Arbitration Suite', host: 'Adv. Shigrie', status: 'Standby' },
    { id: 'RM-103', title: 'Internal Associate Briefing', host: 'Senior Partner', status: 'Standby' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 text-slate-900 dark:text-slate-100 pb-24">
      
      <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-6">
        <Link href="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <Link href="/dashboard/appointments" className="hover:text-blue-600 transition-colors">Appointments</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-slate-900 dark:text-slate-200 font-medium">Virtual Rooms</span>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
          <Video className="w-7 h-7 text-purple-500" /> Virtual Meeting Rooms
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Secure, encrypted video conference rooms for client consultations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map(room => (
          <div key={room.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl">
                  <Video className="w-6 h-6" />
                </div>
                <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${room.status === 'Active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
                  {room.status}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{room.title}</h3>
              <p className="text-xs text-slate-500 flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> Host: {room.host}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button 
                onClick={() => alert(`Launching secure video link for ${room.title}...`)}
                className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm"
              >
                Join Room <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}