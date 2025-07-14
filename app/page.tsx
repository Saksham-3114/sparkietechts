/* eslint-disable @typescript-eslint/no-unused-vars */
// app/page.js
'use client';

import { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  Package, 
  TrendingUp, 
  Users, 
  Activity, 
  Bell, 
  Settings,
  Search,
  Menu,
  X,
  RefreshCw,
  Eye,
  Heart,
  Database,
  Zap,
  Brain,
  MessageSquare
} from 'lucide-react';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [activeModule, setActiveModule] = useState('overview');

  // Sample data
  const [stats, setStats] = useState({
    totalSales: 125840,
    activeRetailers: 47,
    recommendationsServed: 2341,
    healthAlerts: 12
  });

  type ModuleType = {
    id: string;
    title: string;
    icon: React.ElementType;
    color: string;
    status: StatusType;
    count: number;
  };

  const modules: ModuleType[] = [
    {
      id: 'onboarding',
      title: 'Retailer Onboarding',
      icon: Users,
      color: 'bg-blue-500',
      status: 'active',
      count: 15
    },
    {
      id: 'data-integration',
      title: 'Data Integration',
      icon: Database,
      color: 'bg-orange-500',
      status: 'processing',
      count: 8
    },
    {
      id: 'ai-processing',
      title: 'AI Processing',
      icon: Brain,
      color: 'bg-purple-500',
      status: 'active',
      count: 23
    },
    {
      id: 'recommendations',
      title: 'Recommendations',
      icon: TrendingUp,
      color: 'bg-green-500',
      status: 'active',
      count: 156
    },
    {
      id: 'health-tracking',
      title: 'Health Tracking',
      icon: Heart,
      color: 'bg-red-500',
      status: 'warning',
      count: 12
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      color: 'bg-yellow-500',
      status: 'active',
      count: 34
    }
  ];

  const recentActivities = [
    { id: 1, type: 'retailer', message: 'New retailer "FreshMart" completed onboarding', time: '2 mins ago' },
    { id: 2, type: 'ai', message: 'AI recommendation engine processed 150 new items', time: '5 mins ago' },
    { id: 3, type: 'health', message: 'Health alert: High sodium detected in 3 products', time: '10 mins ago' },
    { id: 4, type: 'data', message: 'POS data sync completed for 12 stores', time: '15 mins ago' }
  ];

  type StatusType = 'active' | 'processing' | 'warning' | 'error';

  const StatusBadge = ({ status }: { status: StatusType }) => {
    const statusColors: Record<StatusType, string> = {
      active: 'bg-green-100 text-green-800',
      processing: 'bg-blue-100 text-blue-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`px-2 py-1 text-xs rounded-full font-medium ${statusColors[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Menu */}
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 lg:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="flex items-center ml-4 lg:ml-0">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <h1 className="ml-3 text-xl font-bold text-gray-900">RetailHub</h1>
              </div>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search retailers, products, or data..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg">
                <RefreshCw className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg relative">
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden">
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl z-50">
            <div className="p-4 border-b">
              <button
                onClick={() => setSidebarOpen(false)}
                className="float-right p-1 rounded-md hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-lg font-semibold text-gray-900">Navigation</h2>
            </div>
            <nav className="p-4">
              {modules.map((module) => (
                <button
                  key={module.id}
                  onClick={() => {
                    setActiveModule(module.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center px-3 py-2 mb-2 rounded-lg text-left transition-colors ${
                    activeModule === module.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <module.icon className="w-5 h-5 mr-3" />
                  <span className="flex-1">{module.title}</span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {module.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 bg-white shadow-sm h-screen sticky top-16">
          <nav className="p-4">
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Modules
              </h3>
              {modules.map((module) => (
                <button
                  key={module.id}
                  onClick={() => setActiveModule(module.id)}
                  className={`w-full flex items-center px-3 py-2 mb-2 rounded-lg text-left transition-colors ${
                    activeModule === module.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <module.icon className="w-5 h-5 mr-3" />
                  <span className="flex-1">{module.title}</span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {module.count}
                  </span>
                </button>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Sales</p>
                  <p className="text-2xl font-bold text-gray-900">${stats.totalSales.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <ShoppingCart className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Retailers</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeRetailers}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Recommendations</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.recommendationsServed}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Health Alerts</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.healthAlerts}</p>
                </div>
                <div className="p-3 bg-red-100 rounded-lg">
                  <Activity className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Module Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {modules.map((module) => (
              <div key={module.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg ${module.color}`}>
                      <module.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="ml-3 text-lg font-semibold text-gray-900">{module.title}</h3>
                  </div>
                  <StatusBadge status={module.status} />
                </div>
                <p className="text-gray-600 mb-4">
                  {module.id === 'onboarding' && 'Manage retailer registration and verification process'}
                  {module.id === 'data-integration' && 'Connect and sync POS data from various sources'}
                  {module.id === 'ai-processing' && 'AI-powered analysis and recommendation engine'}
                  {module.id === 'recommendations' && 'Personalized product and placement suggestions'}
                  {module.id === 'health-tracking' && 'Monitor nutritional and health metrics'}
                  {module.id === 'notifications' && 'Real-time alerts and communication system'}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{module.count} items</span>
                  <button className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium">
                    <Eye className="w-4 h-4 mr-1" />
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg mr-3 ${
                        activity.type === 'retailer' ? 'bg-blue-100' :
                        activity.type === 'ai' ? 'bg-purple-100' :
                        activity.type === 'health' ? 'bg-red-100' :
                        'bg-orange-100'
                      }`}>
                        {activity.type === 'retailer' && <Users className="w-4 h-4 text-blue-600" />}
                        {activity.type === 'ai' && <Brain className="w-4 h-4 text-purple-600" />}
                        {activity.type === 'health' && <Heart className="w-4 h-4 text-red-600" />}
                        {activity.type === 'data' && <Database className="w-4 h-4 text-orange-600" />}
                      </div>
                      <div>
                        <p className="text-sm text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;