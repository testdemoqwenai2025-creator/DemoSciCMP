'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  FlaskConical, 
  Play, 
  Pause, 
  RotateCcw,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Clock,
  Cpu,
  HardDrive,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Terminal,
  FileText,
  Users,
  TrendingUp,
  Activity,
  Package,
  GitBranch,
  Settings,
  Bell,
  ChevronRight,
  Zap,
  BarChart3,
  Layers
} from 'lucide-react';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('workspaces');
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  const sidebarItems = [
    { id: 'overview', icon: <BarChart3 className="w-5 h-5" />, label: 'Overview' },
    { id: 'workspaces', icon: <Layers className="w-5 h-5" />, label: 'Workspaces' },
    { id: 'jobs', icon: <Activity className="w-5 h-5" />, label: 'Jobs' },
    { id: 'packages', icon: <Package className="w-5 h-5" />, label: 'Packages' },
    { id: 'terminal', icon: <Terminal className="w-5 h-5" />, label: 'Terminal' },
    { id: 'collaborators', icon: <Users className="w-5 h-5" />, label: 'Team' },
    { id: 'settings', icon: <Settings className="w-5 h-5" />, label: 'Settings' },
  ];

  const workspaces = [
    { id: 'ws1', name: 'Protein Folding Analysis', files: 147, jobs: 892, updated: '2 hours ago', status: 'active' },
    { id: 'ws2', name: 'Drug Discovery Pipeline', files: 234, jobs: 1247, updated: '5 hours ago', status: 'active' },
    { id: 'ws3', name: 'Genome Sequencing Project', files: 89, jobs: 456, updated: '1 day ago', status: 'idle' },
    { id: 'ws4', name: 'Materials Simulation', files: 56, jobs: 234, updated: '3 days ago', status: 'completed' },
  ];

  const recentJobs = [
    { id: 'job1', name: 'BLAST+ Sequence Search', package: '@ncbi/blast-plus', status: 'completed', duration: '45 min', cost: '$0.45', time: '10 min ago' },
    { id: 'job2', name: 'Molecular Docking (Glide)', package: '@schrodinger/glide', status: 'running', progress: 67, duration: '2h 15m remaining', cost: '$12.30 so far', time: 'Running' },
    { id: 'job3', name: 'DFT Calculation (VASP)', package: '@vasp/vasp', status: 'queued', duration: '~8h estimated', cost: '$24.00 estimated', time: 'In queue' },
    { id: 'job4', name: 'ML Training (PyTorch)', package: '@pytorch/pytorch', status: 'failed', duration: '1h 20m', cost: '$8.50', time: '2 hours ago' },
    { id: 'job5', name: 'RNA-seq Analysis (DESeq2)', package: '@bioconductor/deseq2', status: 'completed', duration: '32 min', cost: '$0.22', time: '4 hours ago' },
  ];

  const packages = [
    { name: '@ncbi/blast-plus', version: '2.15.0', downloads: '125K', category: 'Bioinformatics' },
    { name: '@schrodinger/glide', version: '2024.2', downloads: '45K', category: 'Cheminformatics' },
    { name: '@vasp/vasp', version: '6.4.3', downloads: '32K', category: 'Materials Science' },
    { name: '@pytorch/pytorch', version: '2.1.0', downloads: '89K', category: 'Machine Learning' },
    { name: '@rdkit/rdkit', version: '2023.09', downloads: '56K', category: 'Cheminformatics' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'running':
        return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'queued':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50 dark:bg-green-950';
      case 'running': return 'text-blue-600 bg-blue-50 dark:bg-blue-950';
      case 'failed': return 'text-red-600 bg-red-50 dark:bg-red-950';
      case 'queued': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-950';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <FlaskConical className="w-8 h-8 text-primary" />
              Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">Welcome back, testdemo! Here's your research overview.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Bell className="w-4 h-4" />
              Notifications
              <span className="ml-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">3</span>
            </Button>
            <Button size="sm" className="gradient-bg text-white border-0 gap-2">
              <Plus className="w-4 h-4" />
              New Workspace
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Active Workspaces', value: '4', icon: <Layers className="w-5 h-5" />, change: '+1 this week', color: 'text-blue-600' },
            { label: 'Jobs Completed', value: '2,829', icon: <CheckCircle2 className="w-5 h-5" />, change: '+127 this month', color: 'text-green-600' },
            { label: 'Compute Hours', value: '1,247', icon: <Cpu className="w-5 h-5" />, change: '-12% vs last month', color: 'text-purple-600' },
            { label: 'Total Cost (MTD)', value: '$342.50', icon: <TrendingUp className="w-5 h-5" />, change: '+8% vs budget', color: 'text-orange-600' },
          ].map((stat, index) => (
            <div key={index} className="p-6 rounded-xl border bg-card hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                  {stat.icon}
                </div>
                <span className={`text-xs font-medium ${stat.change.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <nav className="lg:sticky lg:top-24 space-y-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                    activeTab === item.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-accent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Workspaces Tab */}
            {activeTab === 'workspaces' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Your Workspaces</h2>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Filter className="w-4 h-4" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Search className="w-4 h-4" />
                      Search
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4">
                  {workspaces.map((workspace) => (
                    <div
                      key={workspace.id}
                      className="p-6 rounded-xl border bg-card hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                              {workspace.name}
                            </h3>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              workspace.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                            }`}>
                              {workspace.status}
                            </span>
                          </div>
                          <div className="flex gap-6 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <FileText className="w-4 h-4" /> {workspace.files} files
                            </span>
                            <span className="flex items-center gap-1">
                              <Activity className="w-4 h-4" /> {workspace.jobs} jobs
                            </span>
                            <span>Updated {workspace.updated}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Jobs Tab */}
            {activeTab === 'jobs' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Recent Jobs</h2>
                  <Button size="sm" className="gradient-bg text-white border-0 gap-2">
                    <Play className="w-4 h-4" />
                    Submit New Job
                  </Button>
                </div>

                <div className="border rounded-xl overflow-hidden">
                  {/* Table Header */}
                  <div className="grid grid-cols-12 gap-4 p-4 bg-muted/50 text-sm font-semibold text-muted-foreground">
                    <div className="col-span-1"></div>
                    <div className="col-span-3">Job Name</div>
                    <div className="col-span-2">Package</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-2">Duration / Cost</div>
                    <div className="col-span-2">Time</div>
                  </div>

                  {/* Table Rows */}
                  {recentJobs.map((job) => (
                    <div
                      key={job.id}
                      onClick={() => setSelectedJob(job.id === selectedJob ? null : job.id)}
                      className={`grid grid-cols-12 gap-4 p-4 border-t items-center cursor-pointer transition-colors hover:bg-accent/50 ${
                        selectedJob === job.id ? 'bg-accent' : ''
                      }`}
                    >
                      <div className="col-span-1">{getStatusIcon(job.status)}</div>
                      <div className="col-span-3 font-medium truncate">{job.name}</div>
                      <div className="col-span-2 text-sm text-muted-foreground truncate">{job.package}</div>
                      <div className="col-span-2">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                          {job.status}
                          {job.status === 'running' && (
                            <span className="ml-1">{job.progress}%</span>
                          )}
                        </span>
                      </div>
                      <div className="col-span-2 text-sm">
                        <div>{job.duration}</div>
                        <div className="text-muted-foreground">{job.cost}</div>
                      </div>
                      <div className="col-span-2 text-sm text-muted-foreground">{job.time}</div>
                    </div>
                  ))}
                </div>

                {/* Job Details Panel */}
                {selectedJob && (
                  <div className="p-6 rounded-xl border bg-card mt-4 animate-in slide-in-from-bottom-2">
                    <h3 className="font-semibold mb-4">Job Details</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Job ID</p>
                        <p className="font-mono">{selectedJob}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Workspace</p>
                        <p>Drug Discovery Pipeline</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Resources Used</p>
                        <p>16 CPU cores, 64GB RAM, GPU: T4 x1</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Environment</p>
                        <p>python-3.11-bio (Docker)</p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <RotateCcw className="w-4 h-4" />
                        Rerun Job
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <FileText className="w-4 h-4" />
                        View Logs
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        Download Results
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Packages Tab */}
            {activeTab === 'packages' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">SciPKG Registry</h2>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Search className="w-4 h-4" />
                    Search Packages
                  </Button>
                </div>

                <div className="grid gap-4">
                  {packages.map((pkg, index) => (
                    <div key={index} className="p-4 rounded-xl border bg-card hover:shadow-md transition-all cursor-pointer group">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-bold">
                            {pkg.name.charAt(1).toUpperCase()}
                          </div>
                          <div>
                            <h3 className="font-semibold group-hover:text-primary transition-colors">{pkg.name}</h3>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <span>v{pkg.version}</span>
                              <span>•</span>
                              <span>{pkg.category}</span>
                              <span>•</span>
                              <span>{pkg.downloads} downloads</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          Install
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Overview Tab (Default) */}
            {(activeTab === 'overview' || !['workspaces', 'jobs', 'packages'].includes(activeTab)) && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Quick Actions</h2>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { title: 'Run BLAST Search', desc: 'Sequence alignment against NCBI databases', icon: <Zap className="w-5 h-5" />, color: 'from-blue-500 to-blue-600' },
                    { title: 'Start Docking', desc: 'Virtual screening with Glide/AutoDock', icon: <Cpu className="w-5 h-5" />, color: 'from-green-500 to-green-600' },
                    { title: 'Launch Notebook', desc: 'Interactive Jupyter environment', icon: <Terminal className="w-5 h-5" />, color: 'from-orange-500 to-orange-600' },
                    { title: 'Upload Dataset', desc: 'Import FASTA, PDB, SDF files', icon: <HardDrive className="w-5 h-5" />, color: 'from-purple-500 to-purple-600' },
                    { title: 'View Reports', desc: 'Generate publication-ready figures', icon: <FileText className="w-5 h-5" />, color: 'from-pink-500 to-pink-600' },
                    { title: 'Invite Collaborator', desc: 'Share workspace with team members', icon: <Users className="w-5 h-5" />, color: 'from-cyan-500 to-cyan-600' },
                  ].map((action, index) => (
                    <button
                      key={index}
                      className="p-4 rounded-xl border bg-card hover:shadow-md transition-all text-left group"
                    >
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform`}>
                        {action.icon}
                      </div>
                      <h3 className="font-semibold mb-1">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">{action.desc}</p>
                    </button>
                  ))}
                </div>

                {/* Recent Activity Feed */}
                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                  <div className="space-y-3">
                    {[
                      { action: 'Completed', item: 'BLAST+ job #2847', time: '10 minutes ago', type: 'success' },
                      { action: 'Started', item: 'Molecular docking batch', time: '25 minutes ago', type: 'info' },
                      { action: 'Invited', item: 'dr.sarah.chen@mit.edu to workspace', time: '1 hour ago', type: 'info' },
                      { action: 'Published', item: 'Custom pipeline v2.1', time: '3 hours ago', type: 'success' },
                      { action: 'Failed', item: 'DFT calculation (memory exceeded)', time: '5 hours ago', type: 'error' },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-card border">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'success' ? 'bg-green-500' :
                          activity.type === 'error' ? 'bg-red-500' :
                          'bg-blue-500'
                        }`} />
                        <div className="flex-1">
                          <span className="font-medium">{activity.action}</span>{' '}
                          <span className="text-muted-foreground">{activity.item}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
