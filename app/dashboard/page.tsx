import React from 'react';
import { 
  Briefcase, 
  Calendar, 
  FileText, 
  DollarSign, 
  PlusCircle, 
  Bot, 
  Clock, 
  Users,
  AlertCircle,
  CheckCircle2,
  Clock3,
  Activity,
  MoreVertical,
  ChevronRight
} from 'lucide-react';

// --- Mock Data ---
const stats = [
  { title: 'Total Active Cases', value: '142', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30' },
  { title: "Today's Hearings", value: '8', icon: Calendar, color: 'text-orange-600', bg: 'bg-orange-100 dark:bg-orange-900/30' },
  { title: 'Pending Drafts', value: '12', icon: FileText, color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900/30' },
  { title: 'Total Earnings', value: 'Rs. 450K', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
];

const todayCauseList = [
  { id: 1, time: '09:00 AM', case: 'State vs. Ahmed Ali', court: 'High Court, Room 4', status: 'Urgent', type: 'Bail Hearing' },
  { id: 2, time: '11:30 AM', case: 'XYZ Corp vs. ABC Ltd', court: 'Civil Court, Room 12', status: 'Completed', type: 'Evidence' },
  { id: 3, time: '01:15 PM', case: 'Fatima Bibi vs. Khalid', court: 'Family Court, Room 2', status: 'Scheduled', type: 'Final Arguments' },
  { id: 4, time: '03:00 PM', case: 'NAB vs. Tariq Mehmood', court: 'Accountability Court', status: 'Postponed', type: 'Indictment' },
];

const upcomingDeadlines = [
  { id: 1, task: 'File Written Statement', case: 'Civil Suit #402', date: 'Tomorrow, 5:00 PM', urgent: true },
  { id: 2, task: 'Submit Appeal in High Court', case: 'Crim. App #109', date: 'Oct 15, 2026', urgent: false },
  { id: 3, task: 'Draft Rent Agreement', case: 'Client: Ali Raza', date: 'Oct 16, 2026', urgent: false },
];

const recentActivity = [
  { id: 1, action: 'Document Uploaded', detail: 'FIR copy attached to State vs Ahmed Ali', time: '2 hours ago' },
  { id: 2, action: 'Invoice Paid', detail: 'Rs. 50,000 received from XYZ Corp', time: '5 hours ago' },
  { id: 3, action: 'AI Draft Generated', detail: 'Bail Application generated for review', time: 'Yesterday' },
];

// --- Helper Components ---
const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    'Urgent': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    'Completed': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    'Scheduled': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    'Postponed': 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
  };
  
  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${styles[status] || styles['Scheduled']}`}>
      {status}
    </span>
  );
};

// --- Main Page Component ---
export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-4 md:p-8 text-slate-900 dark:text-slate-100">
      
      {/* Header Section */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Overview Dashboard</h1>
          {/* Fixed unescaped entity here */}
          <p className="text-slate-500 dark:text-slate-400 mt-1">Welcome back, here is what&apos;s happening today.</p>
        </div>
      </div>

      {/* Top Bar: Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
            <div className={`p-4 rounded-lg ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.title}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions Grid */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-500 transition-colors group shadow-sm">
            <PlusCircle className="w-8 h-8 mb-2 text-slate-400 group-hover:text-blue-500" />
            <span className="text-sm font-medium">Add New Case</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-purple-500 hover:text-purple-600 dark:hover:border-purple-500 transition-colors group shadow-sm">
            <Bot className="w-8 h-8 mb-2 text-slate-400 group-hover:text-purple-500" />
            <span className="text-sm font-medium">Draft AI Document</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-orange-500 hover:text-orange-600 dark:hover:border-orange-500 transition-colors group shadow-sm">
            <Clock className="w-8 h-8 mb-2 text-slate-400 group-hover:text-orange-500" />
            <span className="text-sm font-medium">Log Hours</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-emerald-500 hover:text-emerald-600 dark:hover:border-emerald-500 transition-colors group shadow-sm">
            <Users className="w-8 h-8 mb-2 text-slate-400 group-hover:text-emerald-500" />
            <span className="text-sm font-medium">Book Appointment</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Column: Daily Cause List */}
        <div className="xl:col-span-2 space-y-8">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                {/* Fixed unescaped entity here */}
                Today&apos;s Cause List
              </h2>
              <button className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center">
                View Full Diary <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            
            {/* Added space-y-8 to replace mb-8 and last:mb-0 conflicts */}
            <div className="relative border-l-2 border-slate-100 dark:border-slate-800 ml-3 md:ml-4 space-y-8">
              {/* Removed unused 'index' parameter */}
              {todayCauseList.map((item) => (
                <div key={item.id} className="ml-6 md:ml-8 relative">
                  {/* Replaced arbitrary values with standard tailwind spacing */}
                  <div className="absolute -left-8 md:-left-10 top-1 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-2 border-blue-500"></div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4 p-4 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{item.time}</span>
                        <StatusBadge status={item.status} />
                      </div>
                      <h4 className="font-semibold text-base">{item.case}</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{item.court} • {item.type}</p>
                    </div>
                    <button className="hidden md:flex p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Deadlines & Activity */}
        <div className="space-y-8">
          
          {/* Upcoming Deadlines */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              Upcoming Deadlines
            </h2>
            <div className="space-y-4">
              {upcomingDeadlines.map((deadline) => (
                <div key={deadline.id} className="flex gap-4 items-start p-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:shadow-sm transition-all">
                  <div className={`mt-0.5 p-2 rounded-full ${deadline.urgent ? 'bg-red-100 text-red-600 dark:bg-red-900/30' : 'bg-slate-100 text-slate-600 dark:bg-slate-800'}`}>
                    <Clock3 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{deadline.task}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{deadline.case}</p>
                    <p className={`text-xs font-semibold mt-2 ${deadline.urgent ? 'text-red-600 dark:text-red-400' : 'text-slate-500 dark:text-slate-400'}`}>
                      Due: {deadline.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-500" />
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex gap-3">
                  <div className="mt-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{activity.action}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{activity.detail}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{activity.time}</p>
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