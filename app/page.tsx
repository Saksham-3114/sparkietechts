/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  Package, 
  MapPin, 
  Cloud, 
  Instagram, 
  Newspaper,
  DollarSign,
  Users,
  Settings,
  Bell,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedRegion, setSelectedRegion] = useState('Delhi NCR');

  // Sample data for charts
  const salesData = [
    { month: 'Jan', sales: 45000, profit: 12000 },
    { month: 'Feb', sales: 52000, profit: 15000 },
    { month: 'Mar', sales: 48000, profit: 13500 },
    { month: 'Apr', sales: 61000, profit: 18000 },
    { month: 'May', sales: 55000, profit: 16500 },
    { month: 'Jun', sales: 67000, profit: 21000 }
  ];

  const trendingProducts = [
    { name: 'Electronics', value: 35, color: '#0071ce' },
    { name: 'Clothing', value: 25, color: '#ffc220' },
    { name: 'Home & Garden', value: 20, color: '#f47b20' },
    { name: 'Food & Beverages', value: 15, color: '#004c91' },
    { name: 'Others', value: 5, color: '#e6f3ff' }
  ];

  const recommendations = [
    { 
      product: 'Monsoon Umbrellas', 
      demand: 'High', 
      profit: '₹2,500', 
      trend: 'up',
      reason: 'Weather forecast shows heavy rainfall'
    },
    { 
      product: 'Summer Beverages', 
      demand: 'Medium', 
      profit: '₹1,800', 
      trend: 'up',
      reason: 'Temperature rising in your region'
    },
    { 
      product: 'Festival Decorations', 
      demand: 'High', 
      profit: '₹3,200', 
      trend: 'up',
      reason: 'Upcoming festival season'
    },
    { 
      product: 'Back-to-School Items', 
      demand: 'Medium', 
      profit: '₹2,100', 
      trend: 'neutral',
      reason: 'School season approaching'
    }
  ];

  const regions = ['Delhi NCR', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad'];

  type TabButtonProps = {
    id: string;
    label: string;
    active: boolean;
  };

  const TabButton = ({ id, label, active }: TabButtonProps) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-6 py-3 rounded-lg font-medium transition-all ${
        active 
          ? 'bg-blue-600 text-white shadow-lg' 
          : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
      }`}
    >
      {label}
    </button>
  );

  type MetricCardProps = {
    title: string;
    value: string;
    change: number;
    icon: React.ElementType;
    color?: string;
  };

  const MetricCard = ({ title, value, change, icon: Icon, color = 'blue' }: MetricCardProps) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-${color}-50`}>
          <Icon className={`h-6 w-6 text-${color}-600`} />
        </div>
        <span className={`text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {change >= 0 ? '+' : ''}{change}%
        </span>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-gray-600 text-sm">{title}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">RetailAI</h1>
                  <p className="text-sm text-gray-600">Powered by Walmart Wholesale</p>
                </div>
              </div>
              <div className="h-8 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <select 
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="border-none bg-transparent text-sm font-medium text-gray-700 focus:outline-none"
                >
                  {regions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                <Settings className="h-5 w-5" />
              </button>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">DG</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex space-x-4">
            <TabButton id="overview" label="Overview" active={activeTab === 'overview'} />
            <TabButton id="recommendations" label="AI Recommendations" active={activeTab === 'recommendations'} />
            <TabButton id="trends" label="Market Trends" active={activeTab === 'trends'} />
            <TabButton id="inventory" label="Inventory" active={activeTab === 'inventory'} />
            <TabButton id="analytics" label="Analytics" active={activeTab === 'analytics'} />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard 
                title="Total Revenue" 
                value="₹3,45,000" 
                change={12.5} 
                icon={DollarSign}
                color="blue"
              />
              <MetricCard 
                title="Products Sold" 
                value="2,847" 
                change={8.2} 
                icon={Package}
                color="green"
              />
              <MetricCard 
                title="Profit Margin" 
                value="18.5%" 
                change={2.1} 
                icon={TrendingUp}
                color="purple"
              />
              <MetricCard 
                title="Customer Reach" 
                value="1,245" 
                change={-1.2} 
                icon={Users}
                color="orange"
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Sales & Profit Trends</h2>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View Details
                  </button>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="sales" 
                      stroke="#0071ce" 
                      strokeWidth={3}
                      dot={{ fill: '#0071ce' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="profit" 
                      stroke="#ffc220" 
                      strokeWidth={3}
                      dot={{ fill: '#ffc220' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Category Performance</h2>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View All
                  </button>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={trendingProducts}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {trendingProducts.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Data Sources Status */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Data Sources Status</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                  <Instagram className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900">Instagram Trends</p>
                    <p className="text-sm text-green-700">Connected • Last sync: 2 min ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                  <Cloud className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-900">Weather API</p>
                    <p className="text-sm text-blue-700">Connected • Last sync: 5 min ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
                  <Newspaper className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-purple-900">News API</p>
                    <p className="text-sm text-purple-700">Connected • Last sync: 1 min ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">AI-Powered Recommendations</h2>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <RefreshCw className="h-4 w-4" />
                  <span>Refresh</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </button>
              </div>
            </div>

            <div className="grid gap-6">
              {recommendations.map((rec, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Package className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{rec.product}</h3>
                        <p className="text-sm text-gray-600">{rec.reason}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Expected Profit</p>
                      <p className="text-xl font-bold text-green-600">{rec.profit}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        rec.demand === 'High' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {rec.demand} Demand
                      </span>
                      <span className={`flex items-center space-x-1 text-sm ${
                        rec.trend === 'up' ? 'text-green-600' : 'text-gray-600'
                      }`}>
                        <TrendingUp className="h-4 w-4" />
                        <span>Trending {rec.trend}</span>
                      </span>
                    </div>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'trends' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Market Trends Analysis</h2>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Download className="h-4 w-4" />
                <span>Export Report</span>
              </button>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Regional Trend Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Weather Impact</h4>
                  <p className="text-sm text-blue-800">Heavy rainfall expected - Umbrella demand ↑ 45%</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">Social Media Trends</h4>
                  <p className="text-sm text-green-800">Sustainable products trending - Eco-friendly items ↑ 32%</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                  <h4 className="font-medium text-purple-900 mb-2">Festival Season</h4>
                  <p className="text-sm text-purple-800">Upcoming Diwali - Decorations & sweets ↑ 67%</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Inventory Management</h2>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <p className="text-gray-600">Inventory management interface coming soon...</p>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Advanced Analytics</h2>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <p className="text-gray-600">Advanced analytics dashboard coming soon...</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;