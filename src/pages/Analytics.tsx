import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown,
  Users,
  Activity,
  Heart,
  AlertTriangle,
  Clock,
  BarChart3,
  PieChart,
  Calendar,
  Download,
  Filter,
  Bed,
  Droplet,
  Wind,
  Ambulance,
  Stethoscope,
  DollarSign,
  Target,
  Zap
} from "lucide-react";

const analyticsData = {
  patientMetrics: {
    totalPatients: 1247,
    newAdmissions: 89,
    discharges: 76,
    currentOccupancy: 78
  },
  resourceUtilization: {
    bedOccupancy: 78,
    icuUtilization: 85,
    operatingRoomUsage: 62,
    emergencyRoomTraffic: 94
  },
  performanceMetrics: {
    avgWaitTime: 12,
    avgResponseTime: 4.2,
    patientSatisfaction: 4.6,
    readmissionRate: 3.2
  },
  financialMetrics: {
    dailyRevenue: 125000,
    monthlyRevenue: 3750000,
    costPerPatient: 850,
    profitMargin: 18.5
  },
  departmentData: [
    { name: "Cardiology", patients: 234, revenue: 450000, utilization: 85 },
    { name: "Neurology", patients: 189, revenue: 380000, utilization: 78 },
    { name: "Orthopedics", patients: 156, revenue: 320000, utilization: 72 },
    { name: "Emergency", patients: 298, revenue: 280000, utilization: 94 },
    { name: "ICU", patients: 89, revenue: 420000, utilization: 88 },
    { name: "Surgery", patients: 134, revenue: 350000, utilization: 65 }
  ],
  monthlyTrends: [
    { month: "Jan", patients: 1100, revenue: 3200000 },
    { month: "Feb", patients: 1150, revenue: 3400000 },
    { month: "Mar", patients: 1200, revenue: 3600000 },
    { month: "Apr", patients: 1180, revenue: 3550000 },
    { month: "May", patients: 1250, revenue: 3750000 },
    { month: "Jun", patients: 1300, revenue: 3900000 }
  ],
  ageDistribution: [
    { age: "0-18", count: 156, percentage: 12.5 },
    { age: "19-35", count: 298, percentage: 23.9 },
    { age: "36-50", count: 312, percentage: 25.0 },
    { age: "51-65", count: 289, percentage: 23.2 },
    { age: "65+", count: 192, percentage: 15.4 }
  ],
  resourceAllocation: [
    { resource: "ICU Beds", allocated: 45, available: 55, utilization: 82 },
    { resource: "Ventilators", allocated: 28, available: 32, utilization: 88 },
    { resource: "Blood Units", allocated: 156, available: 200, utilization: 78 },
    { resource: "Ambulances", allocated: 6, available: 10, utilization: 60 }
  ]
};

export default function Analytics() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="gradient-primary rounded-2xl p-6 md:p-8 mb-6 text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Hospital Analytics</h1>
        <p className="text-white/90">Comprehensive insights and performance metrics</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex gap-2">
          <select className="px-3 py-2 rounded-xl border border-border bg-background">
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="1year">Last Year</option>
          </select>
          <Button className="rounded-xl">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button className="rounded-xl gradient-primary text-white">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-6 shadow-card rounded-2xl border-4 border-blue-600 bg-blue-100/80 text-blue-900 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-900">{analyticsData.patientMetrics.totalPatients}</div>
              <div className="text-base text-blue-700">Total Patients</div>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-xs text-green-600">+12%</span>
              </div>
            </div>
          </div>
        </Card>
        <Card className="p-6 shadow-card rounded-2xl border-4 border-green-600 bg-green-100/80 text-green-900 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-green-900">{analyticsData.patientMetrics.currentOccupancy}%</div>
              <div className="text-base text-green-700">Bed Occupancy</div>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-xs text-green-600">+5%</span>
              </div>
            </div>
          </div>
        </Card>
        <Card className="p-6 shadow-card rounded-2xl border-4 border-orange-600 bg-orange-100/80 text-orange-900 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-900">{analyticsData.performanceMetrics.avgWaitTime}</div>
              <div className="text-base text-orange-700">Avg Wait Time (min)</div>
              <div className="flex items-center gap-1 mt-1">
                <TrendingDown className="w-4 h-4 text-green-600" />
                <span className="text-xs text-green-600">-8%</span>
              </div>
            </div>
          </div>
        </Card>
        <Card className="p-6 shadow-card rounded-2xl border-4 border-red-600 bg-red-100/80 text-red-900 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-red-900">{analyticsData.performanceMetrics.patientSatisfaction}</div>
              <div className="text-base text-red-700">Satisfaction Score</div>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-xs text-green-600">+0.3</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Visual Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Monthly Trends Chart */}
        <Card className="p-6 shadow-card rounded-2xl border-4 border-purple-600 bg-purple-100/80 text-purple-900 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-purple-900">Monthly Trends</h2>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-purple-800">Patient Volume</span>
              <span className="text-sm text-purple-700">Revenue (₹)</span>
            </div>
            {analyticsData.monthlyTrends.map((trend, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-purple-800">{trend.month}</span>
                  <span className="text-purple-700">{trend.patients} patients</span>
                </div>
                <div className="w-full bg-purple-200 rounded-full h-3">
                  <div 
                    className="bg-purple-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(trend.patients / 1300) * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-purple-600">
                  Revenue: ₹{(trend.revenue / 100000).toFixed(1)}L
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Department Performance Pie Chart */}
        <Card className="p-6 shadow-card rounded-2xl border-4 border-cyan-600 bg-cyan-100/80 text-cyan-900 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-cyan-600 rounded-lg flex items-center justify-center">
              <PieChart className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-cyan-900">Department Performance</h2>
          </div>
          
          {/* Pie Chart Visualization */}
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-80 h-80">
              {/* Pie Chart Slices */}
              <svg className="w-80 h-80 transform -rotate-90" viewBox="0 0 100 100">
                {/* Calculate cumulative percentages for pie slices */}
                {(() => {
                  const totalPatients = analyticsData.departmentData.reduce((sum, dept) => sum + dept.patients, 0);
                  let cumulativePercentage = 0;
                  const colors = ['#0891b2', '#06b6d4', '#22d3ee', '#67e8f9', '#a7f3d0', '#d1fae5'];
                  
                  return analyticsData.departmentData.map((dept, index) => {
                    const percentage = (dept.patients / totalPatients) * 100;
                    const startAngle = cumulativePercentage * 3.6; // Convert percentage to degrees
                    const endAngle = (cumulativePercentage + percentage) * 3.6;
                    const largeArcFlag = percentage > 50 ? 1 : 0;
                    
                    // Calculate path for pie slice
                    const x1 = 50 + 40 * Math.cos((startAngle - 90) * Math.PI / 180);
                    const y1 = 50 + 40 * Math.sin((startAngle - 90) * Math.PI / 180);
                    const x2 = 50 + 40 * Math.cos((endAngle - 90) * Math.PI / 180);
                    const y2 = 50 + 40 * Math.sin((endAngle - 90) * Math.PI / 180);
                    
                    const pathData = [
                      `M 50 50`,
                      `L ${x1} ${y1}`,
                      `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                      `Z`
                    ].join(' ');
                    
                    cumulativePercentage += percentage;
                    
                    return (
                      <path
                        key={index}
                        d={pathData}
                        fill={colors[index]}
                        stroke="white"
                        strokeWidth="3"
                        className="hover:opacity-80 transition-opacity duration-200"
                      />
                    );
                  });
                })()}
              </svg>
              
              {/* Center circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-base font-bold text-cyan-900">Total</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Legend */}
          <div className="space-y-2">
            {analyticsData.departmentData.map((dept, index) => {
              const colors = ['bg-cyan-600', 'bg-cyan-500', 'bg-cyan-400', 'bg-cyan-300', 'bg-emerald-400', 'bg-emerald-300'];
              const totalPatients = analyticsData.departmentData.reduce((sum, d) => sum + d.patients, 0);
              const percentage = ((dept.patients / totalPatients) * 100).toFixed(1);
              
              return (
                <div key={index} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${colors[index]}`}></div>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-cyan-800 font-medium">{dept.name}</span>
                      <span className="text-cyan-700">{dept.patients} ({percentage}%)</span>
                    </div>
                    <div className="text-xs text-cyan-600">
                      Revenue: ₹{(dept.revenue / 100000).toFixed(1)}L | Utilization: {dept.utilization}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Age Distribution & Resource Allocation */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Age Distribution Pie Chart */}
        <Card className="p-6 shadow-card rounded-2xl border-4 border-pink-600 bg-pink-100/80 text-pink-900 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-pink-600 rounded-lg flex items-center justify-center">
              <PieChart className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-pink-900">Age Distribution</h2>
          </div>
          <div className="space-y-3">
            {analyticsData.ageDistribution.map((age, index) => {
              const colors = ['bg-pink-500', 'bg-pink-400', 'bg-pink-300', 'bg-pink-200', 'bg-pink-100'];
              return (
                <div key={index} className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${colors[index]}`}></div>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-pink-800">{age.age} years</span>
                      <span className="text-pink-700">{age.count} ({age.percentage}%)</span>
                    </div>
                    <div className="w-full bg-pink-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-pink-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${age.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Resource Allocation */}
        <Card className="p-6 shadow-card rounded-2xl border-4 border-emerald-600 bg-emerald-100/80 text-emerald-900 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Target className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-emerald-900">Resource Allocation</h2>
          </div>
          <div className="space-y-4">
            {analyticsData.resourceAllocation.map((resource, index) => {
              const icons = [Bed, Wind, Droplet, Ambulance];
              const Icon = icons[index];
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm font-medium text-emerald-800">{resource.resource}</span>
                  </div>
                  <div className="flex justify-between text-sm text-emerald-700">
                    <span>Allocated: {resource.allocated}</span>
                    <span>Available: {resource.available}</span>
                  </div>
                  <div className="w-full bg-emerald-200 rounded-full h-3">
                    <div 
                      className="bg-emerald-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${resource.utilization}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-emerald-600">
                    Utilization: {resource.utilization}%
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Performance & Financial Metrics */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Performance Indicators */}
        <Card className="p-6 shadow-card rounded-2xl border-4 border-teal-600 bg-teal-100/80 text-teal-900 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-teal-900">Performance Indicators</h2>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-teal-200/50 rounded-xl">
            <span className="text-sm font-medium text-teal-800">Average Response Time</span>
            <span className="text-lg font-bold text-teal-900">{analyticsData.performanceMetrics.avgResponseTime} min</span>
          </div>
            <div className="flex justify-between items-center p-3 bg-teal-200/50 rounded-xl">
              <span className="text-sm font-medium text-teal-800">Patient Satisfaction</span>
              <span className="text-lg font-bold text-teal-900">{analyticsData.performanceMetrics.patientSatisfaction}/5.0</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-teal-200/50 rounded-xl">
              <span className="text-sm font-medium text-teal-800">Readmission Rate</span>
              <span className="text-lg font-bold text-teal-900">{analyticsData.performanceMetrics.readmissionRate}%</span>
            </div>
          </div>
        </Card>

        {/* Financial Overview */}
        <Card className="p-6 shadow-card rounded-2xl border-4 border-amber-600 bg-amber-100/80 text-amber-900 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-amber-900">Financial Overview</h2>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-amber-200/50 rounded-xl">
              <span className="text-sm font-medium text-amber-800">Daily Revenue</span>
              <span className="text-lg font-bold text-amber-900">₹{analyticsData.financialMetrics.dailyRevenue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-amber-200/50 rounded-xl">
              <span className="text-sm font-medium text-amber-800">Monthly Revenue</span>
              <span className="text-lg font-bold text-amber-900">₹{analyticsData.financialMetrics.monthlyRevenue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-amber-200/50 rounded-xl">
              <span className="text-sm font-medium text-amber-800">Cost per Patient</span>
              <span className="text-lg font-bold text-amber-900">₹{analyticsData.financialMetrics.costPerPatient}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-amber-200/50 rounded-xl">
              <span className="text-sm font-medium text-amber-800">Profit Margin</span>
              <span className="text-lg font-bold text-amber-900">{analyticsData.financialMetrics.profitMargin}%</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Additional Analytics Charts */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Emergency Response Times */}
        <Card className="p-6 shadow-card rounded-2xl border-4 border-red-600 bg-red-100/80 text-red-900 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-red-900">Emergency Response</h2>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-red-800">Critical Cases</span>
              <span className="text-red-700">4.2 min</span>
            </div>
            <div className="w-full bg-red-200 rounded-full h-2">
              <div className="bg-red-600 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-red-800">High Priority</span>
              <span className="text-red-700">6.8 min</span>
            </div>
            <div className="w-full bg-red-200 rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full" style={{ width: '70%' }}></div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-red-800">Medium Priority</span>
              <span className="text-red-700">12.5 min</span>
            </div>
            <div className="w-full bg-red-200 rounded-full h-2">
              <div className="bg-red-400 h-2 rounded-full" style={{ width: '55%' }}></div>
            </div>
          </div>
        </Card>

        {/* Staff Efficiency */}
        <Card className="p-6 shadow-card rounded-2xl border-4 border-indigo-600 bg-indigo-100/80 text-indigo-900 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-indigo-900">Staff Efficiency</h2>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-indigo-800">Doctors</span>
              <span className="text-indigo-700">92%</span>
            </div>
            <div className="w-full bg-indigo-200 rounded-full h-2">
              <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '92%' }}></div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-indigo-800">Nurses</span>
              <span className="text-indigo-700">88%</span>
            </div>
            <div className="w-full bg-indigo-200 rounded-full h-2">
              <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '88%' }}></div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-indigo-800">Support Staff</span>
              <span className="text-indigo-700">85%</span>
            </div>
            <div className="w-full bg-indigo-200 rounded-full h-2">
              <div className="bg-indigo-400 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
        </Card>

        {/* Equipment Status */}
        <Card className="p-6 shadow-card rounded-2xl border-4 border-violet-600 bg-violet-100/80 text-violet-900 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
              <Stethoscope className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-violet-900">Equipment Status</h2>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-violet-800">Operational</span>
              <span className="text-violet-700">94%</span>
            </div>
            <div className="w-full bg-violet-200 rounded-full h-2">
              <div className="bg-violet-600 h-2 rounded-full" style={{ width: '94%' }}></div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-violet-800">Maintenance</span>
              <span className="text-violet-700">4%</span>
            </div>
            <div className="w-full bg-violet-200 rounded-full h-2">
              <div className="bg-violet-500 h-2 rounded-full" style={{ width: '4%' }}></div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-violet-800">Out of Service</span>
              <span className="text-violet-700">2%</span>
            </div>
            <div className="w-full bg-violet-200 rounded-full h-2">
              <div className="bg-violet-400 h-2 rounded-full" style={{ width: '2%' }}></div>
            </div>
          </div>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <Button className="rounded-xl gradient-primary text-white">
          <Calendar className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
        <Button variant="outline" className="rounded-xl border-2 hover:bg-primary hover:text-white">
          <Download className="w-4 h-4 mr-2" />
          Export Data
        </Button>
        <Button variant="outline" className="rounded-xl border-2 hover:bg-primary hover:text-white">
          <BarChart3 className="w-4 h-4 mr-2" />
          Advanced Analytics
        </Button>
        <Button variant="outline" className="rounded-xl border-2 hover:bg-primary hover:text-white">
          <Filter className="w-4 h-4 mr-2" />
          Custom Filters
        </Button>
      </div>
    </div>
  );
}
