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
  Filter
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
  }
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-6 text-center bg-sky-100 border-sky-300 text-sky-900 border-2">
          <Users className="w-8 h-8 text-sky-600 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-sky-900">{analyticsData.patientMetrics.totalPatients}</h3>
          <p className="text-sm text-sky-700">Total Patients</p>
          <div className="flex items-center justify-center mt-2">
            <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
            <span className="text-xs text-green-600">+12%</span>
          </div>
        </Card>
        <Card className="p-6 text-center bg-lime-100 border-lime-300 text-lime-900 border-2">
          <Activity className="w-8 h-8 text-lime-600 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-lime-900">{analyticsData.patientMetrics.currentOccupancy}%</h3>
          <p className="text-sm text-lime-700">Bed Occupancy</p>
          <div className="flex items-center justify-center mt-2">
            <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
            <span className="text-xs text-green-600">+5%</span>
          </div>
        </Card>
        <Card className="p-6 text-center bg-orange-100 border-orange-300 text-orange-900 border-2">
          <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-orange-900">{analyticsData.performanceMetrics.avgWaitTime}</h3>
          <p className="text-sm text-orange-700">Avg Wait Time (min)</p>
          <div className="flex items-center justify-center mt-2">
            <TrendingDown className="w-4 h-4 text-green-600 mr-1" />
            <span className="text-xs text-green-600">-8%</span>
          </div>
        </Card>
        <Card className="p-6 text-center bg-rose-100 border-rose-300 text-rose-900 border-2">
          <Heart className="w-8 h-8 text-rose-600 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-rose-900">{analyticsData.performanceMetrics.patientSatisfaction}</h3>
          <p className="text-sm text-rose-700">Satisfaction Score</p>
          <div className="flex items-center justify-center mt-2">
            <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
            <span className="text-xs text-green-600">+0.3</span>
          </div>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Patient Flow */}
        <Card className="p-6 shadow-card rounded-2xl border-2 bg-indigo-100 border-indigo-300 text-indigo-900">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-semibold text-indigo-900">Patient Flow</h2>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded-xl">
              <span className="text-sm font-medium">New Admissions</span>
              <span className="text-lg font-bold text-primary">{analyticsData.patientMetrics.newAdmissions}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded-xl">
              <span className="text-sm font-medium">Discharges</span>
              <span className="text-lg font-bold text-success">{analyticsData.patientMetrics.discharges}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded-xl">
              <span className="text-sm font-medium">Current Occupancy</span>
              <span className="text-lg font-bold text-warning">{analyticsData.patientMetrics.currentOccupancy}%</span>
            </div>
          </div>
        </Card>

        {/* Resource Utilization */}
        <Card className="p-6 shadow-card rounded-2xl border-2 bg-fuchsia-100 border-fuchsia-300 text-fuchsia-900">
          <div className="flex items-center gap-2 mb-4">
            <PieChart className="w-5 h-5 text-fuchsia-600" />
            <h2 className="text-lg font-semibold text-fuchsia-900">Resource Utilization</h2>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>ICU Utilization</span>
                <span>{analyticsData.resourceUtilization.icuUtilization}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-warning h-2 rounded-full" style={{ width: `${analyticsData.resourceUtilization.icuUtilization}%` }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Operating Room Usage</span>
                <span>{analyticsData.resourceUtilization.operatingRoomUsage}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-info h-2 rounded-full" style={{ width: `${analyticsData.resourceUtilization.operatingRoomUsage}%` }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Emergency Room Traffic</span>
                <span>{analyticsData.resourceUtilization.emergencyRoomTraffic}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-emergency h-2 rounded-full" style={{ width: `${analyticsData.resourceUtilization.emergencyRoomTraffic}%` }}></div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Performance Indicators */}
        <Card className="p-6 shadow-card rounded-2xl border-2 bg-teal-100 border-teal-300 text-teal-900">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-teal-600" />
            <h2 className="text-lg font-semibold text-teal-900">Performance Indicators</h2>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded-xl">
              <span className="text-sm font-medium">Average Response Time</span>
              <span className="text-lg font-bold text-success">{analyticsData.performanceMetrics.avgResponseTime} min</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded-xl">
              <span className="text-sm font-medium">Patient Satisfaction</span>
              <span className="text-lg font-bold text-info">{analyticsData.performanceMetrics.patientSatisfaction}/5.0</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded-xl">
              <span className="text-sm font-medium">Readmission Rate</span>
              <span className="text-lg font-bold text-warning">{analyticsData.performanceMetrics.readmissionRate}%</span>
            </div>
          </div>
        </Card>

        {/* Financial Overview */}
        <Card className="p-6 shadow-card rounded-2xl border-2 bg-emerald-100 border-emerald-300 text-emerald-900">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-semibold text-emerald-900">Financial Overview</h2>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded-xl">
              <span className="text-sm font-medium">Daily Revenue</span>
              <span className="text-lg font-bold text-success">${analyticsData.financialMetrics.dailyRevenue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded-xl">
              <span className="text-sm font-medium">Monthly Revenue</span>
              <span className="text-lg font-bold text-primary">${analyticsData.financialMetrics.monthlyRevenue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded-xl">
              <span className="text-sm font-medium">Cost per Patient</span>
              <span className="text-lg font-bold text-info">${analyticsData.financialMetrics.costPerPatient}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded-xl">
              <span className="text-sm font-medium">Profit Margin</span>
              <span className="text-lg font-bold text-success">{analyticsData.financialMetrics.profitMargin}%</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button className="rounded-xl gradient-primary text-white">
          <Calendar className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
        <Button variant="outline" className="rounded-xl">
          <Download className="w-4 h-4 mr-2" />
          Export Data
        </Button>
        <Button variant="outline" className="rounded-xl">
          <BarChart3 className="w-4 h-4 mr-2" />
          Advanced Analytics
        </Button>
      </div>
    </div>
  );
}
