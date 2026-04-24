'use client'

import DashboardLayout from '@/components/DashboardLayout';
import JobCard from '@/components/JobCard';
import { useGetJobsQuery, useGetStatsQuery } from '@/store/api';
import { useState, useEffect } from 'react';
import { PlusCircle, Search, Briefcase } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const { data: jobs, isLoading: jobsLoading, error } = useGetJobsQuery();
  const { data: stats } = useGetStatsQuery();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setRole(localStorage.getItem('umurava_role'));
  }, []);

  const isAdmin = role === 'admin';

  return (
    <DashboardLayout>
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {isAdmin ? 'System Dashboard Overview' : 'Recruiter Dashboard'}
            </h1>
            <p className="text-gray-500 mt-1">
              {isAdmin ? 'Platform-wide monitoring and system governance.' : 'Manage and screen incoming talent with AI.'}
            </p>
          </div>
          
          <Link href="/jobs/new" className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-500 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-md hover:shadow-lg">
            <PlusCircle className="w-5 h-5" />
            <span>Create New Role</span>
          </Link>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <StatCard title="Active Jobs" value={stats?.totalJobs ?? 0} trend="Live" />
           <StatCard title="Total Candidates" value={stats?.totalCandidates ?? 0} trend="Ingested Profiles" />
           <StatCard title="AI Screenings Done" value={stats?.completedScreenings ?? 0} trend="Rankings Generated" />
        </div>

        {/* Jobs List Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
             <h2 className="text-xl font-semibold">Active Hiring Roles</h2>
             <div className="relative border border-[var(--border)] rounded-lg bg-[var(--card)] focus-within:ring-2 focus-within:ring-primary-500/50 flex">
                <Search className="w-4 h-4 ml-3 self-center text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search jobs..." 
                  className="pl-3 pr-4 py-2 bg-transparent focus:outline-none text-sm w-64"
                />
             </div>
          </div>

          {jobsLoading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1,2,3].map(i => <div key={i} className="h-64 bg-[var(--card)] animate-pulse rounded-2xl border border-[var(--border)]"></div>)}
             </div>
          ) : error ? (
             <div className="p-8 text-center bg-red-50 dark:bg-red-900/10 text-red-500 rounded-2xl border border-red-200 dark:border-red-800">
               Failed to load jobs. Is your backend running securely?
             </div>
          ) : jobs?.length === 0 ? (
             <div className="p-16 text-center bg-[var(--card)] border border-[var(--border)] rounded-2xl flex flex-col items-center justify-center">
               <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                 <Briefcase className="w-8 h-8 text-gray-400" />
               </div>
               <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No Active Roles</h3>
               <p className="text-gray-500 max-w-sm">You haven't posted any jobs yet. Create a new role to start accepting AI screenings.</p>
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {jobs?.map((job: any) => (
                <JobCard key={job._id || job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ title, value, trend }: { title: string, value: string | number, trend: string }) {
  return (
    <div className="glass p-6 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-shadow relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-bl-[100px] -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-125"></div>
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 relative z-10">{title}</h3>
      <div className="text-3xl font-bold mb-2 relative z-10 text-gray-900 dark:text-white">{value}</div>
      <div className="text-xs text-primary-500 font-semibold relative z-10">{trend}</div>
    </div>
  );
}
