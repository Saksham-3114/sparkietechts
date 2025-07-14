/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React, { useState, useEffect } from 'react';
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
  Cell,
  AreaChart,
  Area
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
  RefreshCw,
  ShoppingCart,
  AlertCircle,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Eye,
  Star,
  Calendar,
  Clock,
  Target,
  Zap,
  TrendingDown
} from 'lucide-react';

// Data fetching interfaces
interface SalesData {
  month: string;
  sales: number;
  profit: number;
  orders: number;
  customers: number;
}

interface ProductCategory {
  name: string;
  value: number;
  color: string;
  revenue: number;
  growth: number;
}

interface Recommendation {
  id: string;
  product: string;
  demand: 'High' | 'Medium' | 'Low';
  profit: string;
  trend: 'up' | 'down' | 'neutral';
  reason: string;
  confidence: number;
  category: string;
  expectedSales: number;
  roi: number;
  competition: 'Low' | 'Medium' | 'High';
}

interface Metrics {
  totalRevenue: number;
  revenueChange: number;
  productsSold: number;
  productsSoldChange: number;
  profitMargin: number;
  profitMarginChange: number;
  customerReach: number;
  customerReachChange: number;
  conversionRate: number;
  conversionRateChange: number;
  averageOrderValue: number;
  averageOrderValueChange: number;
}

interface DataSource {
  name: string;
  icon: React.ElementType;
  status: 'connected' | 'disconnected' | 'syncing';
  lastSync: string;
  color: string;
}

// Mock API functions (replace with your actual API calls)
const mockAPI = {
  fetchMetrics: async (region: string): Promise<Metrics> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      totalRevenue: Math.floor(Math.random() * 1000000) + 345000,
      revenueChange: Math.floor(Math.random() * 30) - 10,
      productsSold: Math.floor(Math.random() * 5000) + 2000,
      productsSoldChange: Math.floor(Math.random() * 20) - 5,
      profitMargin: Math.floor(Math.random() * 30) + 15,
      profitMarginChange: Math.floor(Math.random() * 10) - 3,
      customerReach: Math.floor(Math.random() * 2000) + 1000,
      customerReachChange: Math.floor(Math.random() * 15) - 5,
      conversionRate: Math.floor(Math.random() * 10) + 5,
      conversionRateChange: Math.floor(Math.random() * 5) - 2,
      averageOrderValue: Math.floor(Math.random() * 3000) + 1500,
      averageOrderValueChange: Math.floor(Math.random() * 8) - 2
    };
  },

  fetchSalesData: async (region: string): Promise<SalesData[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map(month => ({
      month,
      sales: Math.floor(Math.random() * 50000) + 40000,
      profit: Math.floor(Math.random() * 20000) + 10000,
      orders: Math.floor(Math.random() * 500) + 200,
      customers: Math.floor(Math.random() * 300) + 150
    }));
  },

  fetchCategories: async (region: string): Promise<ProductCategory[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return [
      { name: 'Electronics', value: 35, color: '#0071ce', revenue: 125000, growth: 12 },
      { name: 'Clothing', value: 25, color: '#ffc220', revenue: 89000, growth: 8 },
      { name: 'Home & Garden', value: 20, color: '#f47b20', revenue: 71000, growth: 15 },
      { name: 'Food & Beverages', value: 15, color: '#004c91', revenue: 53000, growth: 5 },
      { name: 'Others', value: 5, color: '#e6f3ff', revenue: 18000, growth: -2 }
    ];
  },

  fetchRecommendations: async (region: string): Promise<Recommendation[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return [
      {
        id: '1',
        product: 'Monsoon Umbrellas',
        demand: 'High',
        profit: '₹2,500',
        trend: 'up',
        reason: 'Weather forecast shows heavy rainfall for next 2 weeks',
        confidence: 94,
        category: 'Seasonal',
        expectedSales: 450,
        roi: 180,
        competition: 'Low'
      },
      {
        id: '2',
        product: 'Summer Beverages',
        demand: 'Medium',
        profit: '₹1,800',
        trend: 'up',
        reason: 'Temperature rising in your region with heat wave warning',
        confidence: 87,
        category: 'Food & Beverages',
        expectedSales: 320,
        roi: 145,
        competition: 'Medium'
      },
      {
        id: '3',
        product: 'Festival Decorations',
        demand: 'High',
        profit: '₹3,200',
        trend: 'up',
        reason: 'Upcoming Diwali festival in 3 weeks - high search volume',
        confidence: 96,
        category: 'Seasonal',
        expectedSales: 580,
        roi: 210,
        competition: 'Low'
      },
      {
        id: '4',
        product: 'Back-to-School Items',
        demand: 'Medium',
        profit: '₹2,100',
        trend: 'neutral',
        reason: 'School season approaching - notebooks and stationery trending',
        confidence: 78,
        category: 'Education',
        expectedSales: 290,
        roi: 125,
        competition: 'High'
      }
    ];
  },

  fetchDataSources: async (): Promise<DataSource[]> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return [
      { name: 'Instagram Trends', icon: Instagram, status: 'connected', lastSync: '2 min ago', color: 'green' },
      { name: 'Weather API', icon: Cloud, status: 'connected', lastSync: '5 min ago', color: 'blue' },
      { name: 'News API', icon: Newspaper, status: 'syncing', lastSync: '1 min ago', color: 'purple' },
      { name: 'Google Trends', icon: TrendingUp, status: 'connected', lastSync: '3 min ago', color: 'orange' }
    ];
  }
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedRegion, setSelectedRegion] = useState('Delhi NCR');
  const [isLoading, setIsLoading] = useState(false);
  
  // Data states
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [dataSources, setDataSources] = useState<DataSource[]>([]);

  const regions = ['Delhi NCR', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad'];

  // Fetch data when region changes
  useEffect(() => {
    fetchData();
  }, [selectedRegion]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [metricsData, salesDataRes, categoriesData, recommendationsData, dataSourcesData] = await Promise.all([
        mockAPI.fetchMetrics(selectedRegion),
        mockAPI.fetchSalesData(selectedRegion),
        mockAPI.fetchCategories(selectedRegion),
        mockAPI.fetchRecommendations(selectedRegion),
        mockAPI.fetchDataSources()
      ]);

      setMetrics(metricsData);
      setSalesData(salesDataRes);
      setCategories(categoriesData);
      setRecommendations(recommendationsData);
      setDataSources(dataSourcesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-IN').format(value);
  };

  type TabButtonProps = {
    id: string;
    label: string;
    active: boolean;
    icon?: React.ElementType;
  };

  const TabButton = ({ id, label, active, icon: Icon }: TabButtonProps) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
        active 
          ? 'bg-blue-600 text-white shadow-lg transform scale-105' 
          : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-blue-600 border border-gray-200'
      }`}
    >
      {Icon && <Icon className="h-4 w-4" />}
      <span>{label}</span>
    </button>
  );

  type MetricCardProps = {
    title: string;
    value: string;
    change: number;
    icon: React.ElementType;
    color?: string;
    isLoading?: boolean;
  };

  const MetricCard = ({ title, value, change, icon: Icon, color = 'blue', isLoading = false }: MetricCardProps) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gradient-to-r ${
          color === 'blue' ? 'from-blue-50 to-blue-100' :
          color === 'green' ? 'from-green-50 to-green-100' :
          color === 'purple' ? 'from-purple-50 to-purple-100' :
          color === 'orange' ? 'from-orange-50 to-orange-100' :
          'from-gray-50 to-gray-100'
        }`}>
          <Icon className={`h-6 w-6 ${
            color === 'blue' ? 'text-blue-600' :
            color === 'green' ? 'text-green-600' :
            color === 'purple' ? 'text-purple-600' :
            color === 'orange' ? 'text-orange-600' :
            'text-gray-600'
          }`} />
        </div>
        <div className="flex items-center space-x-1">
          {change >= 0 ? (
            <ArrowUp className="h-4 w-4 text-green-600" />
          ) : (
            <ArrowDown className="h-4 w-4 text-red-600" />
          )}
          <span className={`text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {Math.abs(change)}%
          </span>
        </div>
      </div>
      {isLoading ? (
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      ) : (
        <>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
          <p className="text-gray-600 text-sm">{title}</p>
        </>
      )}
    </div>
  );

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">RetailAI</h1>
                  <p className="text-sm text-gray-600">Powered by Walmart Intelligence</p>
                </div>
              </div>
              <div className="h-8 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <select 
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="border-none bg-transparent text-sm font-medium text-gray-700 focus:outline-none cursor-pointer"
                >
                  {regions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>Last updated: {new Date().toLocaleTimeString()}</span>
              </div>
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="h-5 w-5" />
              </button>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">DG</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex space-x-4 overflow-x-auto">
            <TabButton id="overview" label="Overview" active={activeTab === 'overview'} icon={Eye} />
            <TabButton id="recommendations" label="AI Recommendations" active={activeTab === 'recommendations'} icon={Zap} />
            <TabButton id="trends" label="Market Trends" active={activeTab === 'trends'} icon={TrendingUp} />
            <TabButton id="inventory" label="Inventory" active={activeTab === 'inventory'} icon={Package} />
            <TabButton id="analytics" label="Analytics" active={activeTab === 'analytics'} icon={Target} />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <MetricCard 
                title="Total Revenue" 
                value={metrics ? formatCurrency(metrics.totalRevenue) : '₹0'} 
                change={metrics ? metrics.revenueChange : 0} 
                icon={DollarSign}
                color="blue"
                isLoading={isLoading}
              />
              <MetricCard 
                title="Products Sold" 
                value={metrics ? formatNumber(metrics.productsSold) : '0'} 
                change={metrics ? metrics.productsSoldChange : 0} 
                icon={Package}
                color="green"
                isLoading={isLoading}
              />
              <MetricCard 
                title="Profit Margin" 
                value={metrics ? `${metrics.profitMargin}%` : '0%'} 
                change={metrics ? metrics.profitMarginChange : 0} 
                icon={TrendingUp}
                color="purple"
                isLoading={isLoading}
              />
              <MetricCard 
                title="Customer Reach" 
                value={metrics ? formatNumber(metrics.customerReach) : '0'} 
                change={metrics ? metrics.customerReachChange : 0} 
                icon={Users}
                color="orange"
                isLoading={isLoading}
              />
              <MetricCard 
                title="Conversion Rate" 
                value={metrics ? `${metrics.conversionRate}%` : '0%'} 
                change={metrics ? metrics.conversionRateChange : 0} 
                icon={Target}
                color="green"
                isLoading={isLoading}
              />
              <MetricCard 
                title="Avg Order Value" 
                value={metrics ? formatCurrency(metrics.averageOrderValue) : '₹0'} 
                change={metrics ? metrics.averageOrderValueChange : 0} 
                icon={ShoppingCart}
                color="blue"
                isLoading={isLoading}
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Sales & Profit Trends</h2>
                  <button 
                    onClick={fetchData}
                    disabled={isLoading}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium disabled:opacity-50"
                  >
                    <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                    <span>Refresh</span>
                  </button>
                </div>
                {isLoading ? (
                  <LoadingSpinner />
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={salesData}>
                      <defs>
                        <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0071ce" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#0071ce" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ffc220" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#ffc220" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" stroke="#666" />
                      <YAxis stroke="#666" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="sales" 
                        stroke="#0071ce" 
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#salesGradient)"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="profit" 
                        stroke="#ffc220" 
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#profitGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Category Performance</h2>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View All
                  </button>
                </div>
                {isLoading ? (
                  <LoadingSpinner />
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categories}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {categories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value, name) => [
                          `${value}%`,
                          name
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* Data Sources Status */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Data Sources Status</h2>
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-20 bg-gray-200 rounded-lg"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {dataSources.map((source, index) => (
                    <div key={index} className={`flex items-center space-x-3 p-4 rounded-lg border ${
                      source.status === 'connected' ? 'bg-green-50 border-green-200' :
                      source.status === 'syncing' ? 'bg-yellow-50 border-yellow-200' :
                      'bg-red-50 border-red-200'
                    }`}>
                      <source.icon className={`h-5 w-5 ${
                        source.status === 'connected' ? 'text-green-600' :
                        source.status === 'syncing' ? 'text-yellow-600' :
                        'text-red-600'
                      }`} />
                      <div className="flex-1">
                        <p className={`font-medium ${
                          source.status === 'connected' ? 'text-green-900' :
                          source.status === 'syncing' ? 'text-yellow-900' :
                          'text-red-900'
                        }`}>
                          {source.name}
                        </p>
                        <p className={`text-sm ${
                          source.status === 'connected' ? 'text-green-700' :
                          source.status === 'syncing' ? 'text-yellow-700' :
                          'text-red-700'
                        }`}>
                          {source.status === 'connected' ? 'Connected' : 
                           source.status === 'syncing' ? 'Syncing...' : 'Disconnected'} • {source.lastSync}
                        </p>
                      </div>
                      {source.status === 'connected' && (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                      {source.status === 'syncing' && (
                        <RefreshCw className="h-4 w-4 text-yellow-600 animate-spin" />
                      )}
                      {source.status === 'disconnected' && (
                        <AlertCircle className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">AI-Powered Recommendations</h2>
                <p className="text-gray-600 mt-1">Smart product suggestions based on market trends and local data</p>
              </div>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={fetchData}
                  disabled={isLoading}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </button>
              </div>
            </div>

            {isLoading ? (
              <div className="grid gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-32 bg-gray-200 rounded-xl"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid gap-6">
                {recommendations.map((rec) => (
                  <div key={rec.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
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
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Confidence</p>
                        <p className="text-lg font-semibold text-blue-600">{rec.confidence}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Expected Sales</p>
                        <p className="text-lg font-semibold text-purple-600">{rec.expectedSales}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">ROI</p>
                        <p className="text-lg font-semibold text-green-600">{rec.roi}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Competition</p>
                        <p className={`text-lg font-semibold ${
                          rec.competition === 'Low' ? 'text-green-600' :
                          rec.competition === 'Medium' ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {rec.competition}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          rec.demand === 'High' 
                            ? 'bg-red-100 text-red-800' 
                            : rec.demand === 'Medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {rec.demand} Demand
                        </span>
                        <span className={`flex items-center space-x-1 text-sm ${
                          rec.trend === 'up' ? 'text-green-600' : 
                          rec.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {rec.trend === 'up' ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : rec.trend === 'down' ? (
                            <TrendingDown className="h-4 w-4" />
                          ) : (
                            <TrendingUp className="h-4 w-4" />
                          )}
                          <span>Trending {rec.trend}</span>
                        </span>
                        <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                          {rec.category}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                          View Details
                        </button>
                        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'trends' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Market Trends Analysis</h2>
                <p className="text-gray-600 mt-1">Real-time insights from weather, social media, and news data</p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Download className="h-4 w-4" />
                  <span>Export Report</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Calendar className="h-4 w-4" />
                  <span>Schedule Report</span>
                </button>
              </div>
            </div>

            {/* Trend Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Cloud className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Weather Impact</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium text-blue-900">Monsoon Products</p>
                      <p className="text-sm text-blue-700">Heavy rainfall expected</p>
                    </div>
                    <div className="flex items-center space-x-1 text-green-600">
                      <ArrowUp className="h-4 w-4" />
                      <span className="font-semibold">45%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div>
                      <p className="font-medium text-orange-900">Cooling Products</p>
                      <p className="text-sm text-orange-700">Heat wave warning</p>
                    </div>
                    <div className="flex items-center space-x-1 text-green-600">
                      <ArrowUp className="h-4 w-4" />
                      <span className="font-semibold">32%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-pink-100 rounded-lg">
                    <Instagram className="h-5 w-5 text-pink-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Social Media Trends</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium text-green-900">Sustainable Products</p>
                      <p className="text-sm text-green-700">Eco-friendly trending</p>
                    </div>
                    <div className="flex items-center space-x-1 text-green-600">
                      <ArrowUp className="h-4 w-4" />
                      <span className="font-semibold">68%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div>
                      <p className="font-medium text-purple-900">Fitness Gear</p>
                      <p className="text-sm text-purple-700">Health consciousness rising</p>
                    </div>
                    <div className="flex items-center space-x-1 text-green-600">
                      <ArrowUp className="h-4 w-4" />
                      <span className="font-semibold">41%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Calendar className="h-5 w-5 text-yellow-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Seasonal Trends</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <p className="font-medium text-yellow-900">Festival Items</p>
                      <p className="text-sm text-yellow-700">Diwali preparations</p>
                    </div>
                    <div className="flex items-center space-x-1 text-green-600">
                      <ArrowUp className="h-4 w-4" />
                      <span className="font-semibold">89%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
                    <div>
                      <p className="font-medium text-indigo-900">Back to School</p>
                      <p className="text-sm text-indigo-700">Academic season</p>
                    </div>
                    <div className="flex items-center space-x-1 text-green-600">
                      <ArrowUp className="h-4 w-4" />
                      <span className="font-semibold">28%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trend Chart */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Trend Performance Over Time</h3>
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="sales" 
                      stroke="#0071ce" 
                      strokeWidth={3}
                      dot={{ fill: '#0071ce', strokeWidth: 2, r: 4 }}
                      name="Sales Volume"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="customers" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                      name="Customer Growth"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="orders" 
                      stroke="#f59e0b" 
                      strokeWidth={3}
                      dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                      name="Order Volume"
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Inventory Management</h2>
                <p className="text-gray-600 mt-1">Smart inventory tracking and optimization</p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Package className="h-4 w-4" />
                  <span>Add Product</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Package className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Products</p>
                    <p className="text-2xl font-bold text-gray-900">1,247</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-green-600">
                  <ArrowUp className="h-4 w-4" />
                  <span className="text-sm font-medium">12% from last month</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Low Stock</p>
                    <p className="text-2xl font-bold text-gray-900">23</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-red-600">
                  <ArrowUp className="h-4 w-4" />
                  <span className="text-sm font-medium">Action required</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Clock className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Pending Orders</p>
                    <p className="text-2xl font-bold text-gray-900">89</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-yellow-600">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm font-medium">Processing</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Star className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Top Performers</p>
                    <p className="text-2xl font-bold text-gray-900">156</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-blue-600">
                  <Star className="h-4 w-4" />
                  <span className="text-sm font-medium">High demand</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Inventory Alerts</h3>
              <div className="space-y-4">
                {[
                  { product: "Monsoon Umbrellas", status: "Low Stock", quantity: 12, action: "Reorder", severity: "high" },
                  { product: "Summer Beverages", status: "Out of Stock", quantity: 0, action: "Urgent Reorder", severity: "critical" },
                  { product: "Festival Decorations", status: "High Demand", quantity: 45, action: "Increase Stock", severity: "medium" },
                  { product: "Back-to-School Items", status: "Overstocked", quantity: 234, action: "Promotion", severity: "low" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${
                        item.severity === 'critical' ? 'bg-red-500' :
                        item.severity === 'high' ? 'bg-orange-500' :
                        item.severity === 'medium' ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}></div>
                      <div>
                        <p className="font-medium text-gray-900">{item.product}</p>
                        <p className="text-sm text-gray-600">{item.status} • Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <button className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      item.severity === 'critical' ? 'bg-red-600 text-white' :
                      item.severity === 'high' ? 'bg-orange-600 text-white' :
                      item.severity === 'medium' ? 'bg-yellow-600 text-white' :
                      'bg-green-600 text-white'
                    }`}>
                      {item.action}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Advanced Analytics</h2>
                <p className="text-gray-600 mt-1">Deep insights and predictive analytics</p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Calendar className="h-4 w-4" />
                  <span>Date Range</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Forecast</h3>
                {isLoading ? (
                  <LoadingSpinner />
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={salesData}>
                      <defs>
                        <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" stroke="#666" />
                      <YAxis stroke="#666" />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="sales" 
                        stroke="#8b5cf6" 
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#forecastGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Segmentation</h3>
                {isLoading ? (
                  <LoadingSpinner />
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Premium', value: 30, color: '#8b5cf6' },
                          { name: 'Regular', value: 45, color: '#06b6d4' },
                          { name: 'Budget', value: 25, color: '#10b981' }
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {[
                          { color: '#8b5cf6' },
                          { color: '#06b6d4' },
                          { color: '#10b981' }
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">94.2%</p>
                  <p className="text-sm text-gray-600">Target Achievement</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">87.5%</p>
                  <p className="text-sm text-gray-600">Customer Satisfaction</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">156%</p>
                  <p className="text-sm text-gray-600">Growth Rate</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <DollarSign className="h-8 w-8 text-orange-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">₹2.4M</p>
                  <p className="text-sm text-gray-600">Monthly Revenue</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;