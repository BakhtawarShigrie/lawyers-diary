'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Video, 
  Calendar, 
  Clock, 
  Users, 
  Lock, 
  Copy, 
  ExternalLink, 
  Plus, 
  ChevronRight, 
  Check, 
  Radio,
  Briefcase,
  Shield,
  Layers
} from 'lucide-react';

// --- Types & Mock Data ---
type VideoPlatform = 'Zoom' | 'Google Meet' | 'Jitsi';

interface VirtualMeeting {
  id: string;
  title: string;
  caseNo: string;
  platform: VideoPlatform;
  time: string;
  date: string;
  duration: string;
  attendees: string[];
  password?: string;
  meetingLink: string;
  status: 'Upcoming' | 'Live' | 'Completed';
}

const mockMeetings: VirtualMeeting[] = [
  {
    id: 'MEET-001',
    title: 'High Court Bail Hearing - State vs Ahmed Ali',
    caseNo: 'CR-2026/405',
    platform: 'Zoom',
    time: '10:00 AM',
    date: 'Today, Oct 14, 2026',
    duration: '45 mins',
    attendees: ['Justice Tariq Mehmood', 'Adv. Shigrie', 'Prosecutor General'],
    password: 'lawyer_secure_405',
    meetingLink: 'https://zoom.us/j/1234567890',
    status: 'Live'
  },
  {
    id: 'MEET-002',
    title: 'Client Strategy Discussion with XYZ Corp',
    caseNo: 'CIV-2026/112',
    platform: 'Google Meet',
    time: '02:30 PM',
    date: 'Today, Oct 14, 2026',
    duration: '30 mins',
    attendees: ['Ahmed Ali (CEO)', 'Adv. Shigrie'],
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    status: 'Upcoming'
  },
  {
    id: 'MEET-003',
    title: 'Family Court Mediation Session',
    caseNo: 'FAM-2026/89',
    platform: 'Jitsi',
    time: '11:00 AM',
    date: 'Tomorrow, Oct 15, 2026',
    duration: '1 hour',
    attendees: ['Judge Ayesha Malik', 'Fatima Bibi', 'Opposing Counsel'],
    password: 'jitsi_secure_89',
    meetingLink: 'https://meet.jit.si/LawyerDiaryFamilyMediation',
    status: 'Upcoming'
  }
];

export default function VirtualCourtroomPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<VideoPlatform>('Zoom');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyLink = (link: string, id: string) => {
    navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleInstantStart = () => {
    alert(`Launching instant secure room via ${selectedPlatform}...`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-4 md:p-8 text-slate-900 dark:text-slate-100 pb-24">
      
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-6">
        <Link href="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-slate-900 dark:text-slate-200 font-medium">Virtual Courtroom & Meetings</span>
      </div>

      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Virtual Courtroom Hub</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Host online hearings and coordinate video consultations securely.</p>
        </div>
        
        {/* Instant Meeting Start Widget */}
        <div className="flex flex-col sm:flex-row items-center gap-3 bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <select 
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value as VideoPlatform)}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold outline-none"
          >
            <option value="Zoom">Zoom Meeting</option>
            <option value="Google Meet">Google Meet</option>
            <option value="Jitsi">Jitsi Secure</option>
          </select>
          <button 
            onClick={handleInstantStart}
            className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm text-sm"
          >
            <Video className="w-4 h-4" /> Instant Meeting Start
          </button>
        </div>
      </div>

      {/* Live / Upcoming Meetings Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Radio className="w-5 h-5 text-red-500 animate-pulse" />
            Scheduled Hearings & Client Calls
          </h2>
          <button className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
            <Plus className="w-4 h-4" /> Schedule Call
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {mockMeetings.map((meeting) => (
            <div 
              key={meeting.id} 
              className={`bg-white dark:bg-slate-900 rounded-2xl border shadow-sm p-6 flex flex-col justify-between transition-all relative overflow-hidden ${
                meeting.status === 'Live' 
                  ? 'border-red-300 dark:border-red-900/60 ring-2 ring-red-500/20' 
                  : 'border-slate-200 dark:border-slate-800 hover:shadow-md'
              }`}
            >
              {/* Top Accent Strip */}
              <div className={`absolute top-0 left-0 w-full h-1.5 ${
                meeting.status === 'Live' ? 'bg-red-500' : 'bg-blue-600'
              }`}></div>

              <div>
                {/* Status & Platform Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2.5 py-1 text-xs font-bold rounded-full flex items-center gap-1.5 ${
                    meeting.status === 'Live' 
                      ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 animate-pulse' 
                      : 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                  }`}>
                    {meeting.status === 'Live' && <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>}
                    {meeting.status} • {meeting.platform}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {meeting.duration}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-tight">
                  {meeting.title}
                </h3>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 font-medium">
                    <Briefcase className="w-4 h-4 text-blue-500" /> {meeting.caseNo}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Calendar className="w-4 h-4 text-slate-400" /> {meeting.date} at {meeting.time}
                  </div>
                </div>

                {/* Attendees list */}
                <div className="mb-6 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" /> Attendees ({meeting.attendees.length})
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {meeting.attendees.map((att, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium rounded-md">
                        {att}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Password if any */}
                {meeting.password && (
                  <div className="flex items-center justify-between text-xs font-medium text-slate-500 bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/30 p-2.5 rounded-lg mb-6">
                    <span className="flex items-center gap-1.5 text-orange-800 dark:text-orange-400 font-semibold">
                      <Lock className="w-3.5 h-3.5" /> Password:
                    </span>
                    <code className="bg-white dark:bg-slate-900 px-2 py-0.5 rounded font-mono text-slate-800 dark:text-slate-200 border border-orange-100 dark:border-slate-800">
                      {meeting.password}
                    </code>
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button 
                  onClick={() => handleCopyLink(meeting.meetingLink, meeting.id)}
                  className="p-2.5 text-slate-600 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors border border-slate-200 dark:border-slate-700"
                  title="Copy Meeting Link"
                >
                  {copiedId === meeting.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>

                <a 
                  href={meeting.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-bold text-sm transition-colors shadow-sm ${
                    meeting.status === 'Live'
                      ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  <Video className="w-4 h-4" /> 
                  {meeting.status === 'Live' ? 'Join Live Hearing' : 'Join Meeting'}
                  <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-80" />
                </a>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}