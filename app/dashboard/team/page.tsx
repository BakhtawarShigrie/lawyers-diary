'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronRight, 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  Briefcase, 
  Clock, 
  Activity, 
  CheckCircle2, 
  AlertCircle, 
  Send,
  MoreVertical,
  UserCheck,
  ShieldAlert,
  FileText
} from 'lucide-react';

// --- Types & Mock Data ---
type Role = 'Senior Partner' | 'Associate' | 'Paralegal' | 'Clerk / Munshi';
type TaskStatus = 'Pending' | 'In Progress' | 'Completed';

interface TeamMember {
  id: string;
  name: string;
  role: Role;
  email: string;
  activeTasks: number;
  avatar: string;
}

interface Task {
  id: string;
  title: string;
  assignee: string;
  type: string;
  dueDate: string;
  status: TaskStatus;
  priority: 'High' | 'Normal';
}

const mockTeam: TeamMember[] = [
  { id: 'TM-01', name: 'Adv. Shigrie', role: 'Senior Partner', email: 'shigrie@firm.com', activeTasks: 12, avatar: 'S' },
  { id: 'TM-02', name: 'Ali Raza', role: 'Associate', email: 'ali.raza@firm.com', activeTasks: 5, avatar: 'A' },
  { id: 'TM-03', name: 'Ayesha Khan', role: 'Associate', email: 'ayesha.k@firm.com', activeTasks: 8, avatar: 'A' },
  { id: 'TM-04', name: 'Usman Tariq', role: 'Paralegal', email: 'usman.t@firm.com', activeTasks: 3, avatar: 'U' },
  { id: 'TM-05', name: 'Ch. Rafiq', role: 'Clerk / Munshi', email: 'rafiq@firm.com', activeTasks: 15, avatar: 'R' },
];

const mockTasks: Task[] = [
  { id: 'TSK-101', title: 'Draft Bail Application (Ahmed Ali)', assignee: 'Ali Raza', type: 'Drafting', dueDate: 'Oct 15, 2026', status: 'In Progress', priority: 'High' },
  { id: 'TSK-102', title: 'Submit FIR Copy in High Court', assignee: 'Ch. Rafiq', type: 'Administrative', dueDate: 'Oct 14, 2026', status: 'Pending', priority: 'High' },
  { id: 'TSK-103', title: 'Research Tax Precedents for TechFlow', assignee: 'Ayesha Khan', type: 'Research', dueDate: 'Oct 18, 2026', status: 'Pending', priority: 'Normal' },
];

const mockActivities = [
  { id: 1, user: 'Ayesha Khan', action: 'Uploaded a document', context: 'Tax_Precedents_Report.pdf', time: '10 mins ago' },
  { id: 2, user: 'Ch. Rafiq', action: 'Updated case status', context: 'State vs. Ahmed Ali - Next Date: Oct 28', time: '1 hour ago' },
  { id: 3, user: 'Ali Raza', action: 'Completed task', context: 'Draft Written Statement for CIV-2026/112', time: '3 hours ago' },
  { id: 4, user: 'Adv. Shigrie', action: 'Assigned a task to Usman Tariq', context: 'Client Onboarding', time: 'Yesterday' },
];

export default function TeamManagementPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  
  // New Task Form State
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskAssignee, setNewTaskAssignee] = useState('');
  const [newTaskType, setNewTaskType] = useState('Drafting');

  const filteredTeam = mockTeam.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'All' || member.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (role: Role) => {
    switch(role) {
      case 'Senior Partner': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800';
      case 'Associate': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case 'Paralegal': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
      case 'Clerk / Munshi': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800';
    }
  };

  const getStatusIcon = (status: TaskStatus) => {
    switch(status) {
      case 'Completed': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'In Progress': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'Pending': return <AlertCircle className="w-4 h-4 text-orange-500" />;
    }
  };

  const handleAssignTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle || !newTaskAssignee) {
      alert("Please fill in task title and assignee.");
      return;
    }
    alert(`Task "${newTaskTitle}" assigned to ${newTaskAssignee} successfully!`);
    setNewTaskTitle('');
    setNewTaskAssignee('');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-4 md:p-8 text-slate-900 dark:text-slate-100 pb-24">
      
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-6">
        <Link href="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-slate-900 dark:text-slate-200 font-medium">Team & Delegation</span>
      </div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Team Members & Delegation</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage firm staff, delegate case tasks, and track activities.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 shadow-sm">
          <UserPlus className="w-5 h-5" />
          Add Member
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Column: Team Members Directory */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* Toolbar */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search team members..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
            <div className="relative w-full sm:w-48">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select 
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              >
                <option value="All">All Roles</option>
                <option value="Senior Partner">Senior Partner</option>
                <option value="Associate">Associate</option>
                <option value="Paralegal">Paralegal</option>
                <option value="Clerk / Munshi">Clerk / Munshi</option>
              </select>
            </div>
          </div>

          {/* Team Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTeam.map(member => (
              <div key={member.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow group flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 flex items-center justify-center font-bold text-xl">
                      {member.avatar}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-xs text-slate-500">{member.email}</p>
                    </div>
                  </div>
                  <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-white rounded-md transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${getRoleBadge(member.role)}`}>
                    {member.role}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 px-2 py-1 rounded-md border border-slate-100 dark:border-slate-700">
                    <Briefcase className="w-3.5 h-3.5" />
                    {member.activeTasks} Active Tasks
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Active Delegated Tasks List */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 mt-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-600" /> Current Delegated Tasks
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                    <th className="p-3 font-semibold">Task Title</th>
                    <th className="p-3 font-semibold">Assignee</th>
                    <th className="p-3 font-semibold">Due Date</th>
                    <th className="p-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                  {mockTasks.map(task => (
                    <tr key={task.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="p-3">
                        <p className="font-semibold text-sm text-slate-900 dark:text-white">
                          {task.title}
                        </p>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <FileText className="w-3 h-3" /> {task.type}
                          {task.priority === 'High' && <span className="ml-2 text-red-500 font-semibold flex items-center gap-0.5"><ShieldAlert className="w-3 h-3" /> High Priority</span>}
                        </p>
                      </td>
                      <td className="p-3">
                        <span className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">
                          <UserCheck className="w-4 h-4 text-slate-400" /> {task.assignee}
                        </span>
                      </td>
                      <td className="p-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                        {task.dueDate}
                      </td>
                      <td className="p-3">
                        <span className="flex items-center gap-1.5 text-xs font-semibold">
                          {getStatusIcon(task.status)}
                          {task.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Column: Task Assignment & Activity Log */}
        <div className="space-y-6">
          
          {/* Quick Task Delegation Panel */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Send className="w-5 h-5 text-emerald-600" /> Delegate New Task
            </h2>
            <form onSubmit={handleAssignTask} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Task Title</label>
                <input 
                  type="text" 
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="e.g., Draft Written Statement"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Assign To</label>
                <select 
                  value={newTaskAssignee}
                  onChange={(e) => setNewTaskAssignee(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                >
                  <option value="">Select team member...</option>
                  {mockTeam.filter(m => m.role !== 'Senior Partner').map(m => (
                    <option key={m.id} value={m.name}>{m.name} ({m.role})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Task Category</label>
                <select 
                  value={newTaskType}
                  onChange={(e) => setNewTaskType(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                >
                  <option value="Drafting">Document Drafting</option>
                  <option value="Research">Legal Research</option>
                  <option value="Administrative">Administrative / Filing</option>
                  <option value="Hearing">Court Hearing Attendance</option>
                </select>
              </div>
              <button 
                type="submit"
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                Assign Task
              </button>
            </form>
          </div>

          {/* Activity Tracker */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" /> Team Activity Feed
            </h2>
            <div className="relative border-l-2 border-slate-100 dark:border-slate-800 ml-3 space-y-6">
              {mockActivities.map(activity => (
                <div key={activity.id} className="ml-6 relative">
                  <div className="absolute -left-[33px] top-1 w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white dark:border-slate-900"></div>
                  <div>
                    <p className="text-sm text-slate-800 dark:text-slate-200">
                      <span className="font-bold text-slate-900 dark:text-white">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mt-0.5 bg-blue-50 dark:bg-blue-900/20 inline-block px-2 py-0.5 rounded-md border border-blue-100 dark:border-blue-800/50">
                      {activity.context}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors">
              View Full Audit Log
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}