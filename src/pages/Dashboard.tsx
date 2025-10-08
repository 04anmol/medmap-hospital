import { Activity, Bed, Droplet, Ambulance, Wind, TrendingUp, Clock, Users, Edit3, Plus, Send, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const kpis = [
  { 
    icon: Bed, 
    label: "ICU Beds", 
    value: "12", 
    total: "24", 
    status: "available", 
    trend: "+2",
    utilization: "50%",
    lastUpdate: "2 min ago",
    nextAvailable: "3 beds",
    department: "Critical Care",
    iconColor: "bg-success"
  },
  { 
    icon: Wind, 
    label: "Ventilators", 
    value: "8", 
    total: "15", 
    status: "available", 
    trend: "0",
    utilization: "53%",
    lastUpdate: "5 min ago",
    nextAvailable: "2 units",
    department: "Respiratory",
    iconColor: "bg-blue-600"
  },
  { 
    icon: Droplet, 
    label: "Blood Units", 
    value: "156", 
    total: "200", 
    status: "low", 
    trend: "-12",
    utilization: "78%",
    lastUpdate: "1 min ago",
    nextAvailable: "44 units",
    department: "Blood Bank",
    iconColor: "bg-warning"
  },
  { 
    icon: Ambulance, 
    label: "Ambulances", 
    value: "6", 
    total: "10", 
    status: "available", 
    trend: "+1",
    utilization: "60%",
    lastUpdate: "3 min ago",
    nextAvailable: "4 vehicles",
    department: "Emergency Services",
    iconColor: "bg-red-600"
  },
];

const quickActions = [
  { icon: Bed, label: "Update ICU", color: "bg-blue-500", path: "/beds" },
  { icon: Droplet, label: "Update Blood", color: "bg-red-500", path: "/blood" },
  { icon: Wind, label: "Update Oxygen", color: "bg-green-500", path: "/oxygen" },
  { icon: Ambulance, label: "Dispatch Ambulance", color: "bg-orange-500", path: "/ambulances" },
];

const recentActivity = [
  { time: "2 mins ago", action: "ICU Bed 12 marked available", type: "success" },
  { time: "5 mins ago", action: "Emergency request accepted", type: "emergency" },
  { time: "12 mins ago", action: "Ambulance #003 dispatched", type: "warning" },
  { time: "18 mins ago", action: "Blood type A+ restocked (+15 units)", type: "info" },
  { time: "25 mins ago", action: "Oxygen cylinder refilled", type: "success" },
];

export default function Dashboard() {
  const navigate = useNavigate();

  const handleQuickAction = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      {/* Header with Gradient */}
      <div className="gradient-primary rounded-2xl p-6 md:p-8 mb-6 text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-white/90">Apollo Hospitals, Delhi</p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.label} className="p-6 shadow-card rounded-2xl border-4 border-primary bg-primary/10 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${kpi.iconColor}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                {kpi.trend && (
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    kpi.trend.startsWith('+') ? 'bg-success/10 text-success' : 
                    kpi.trend === '0' ? 'bg-muted text-muted-foreground' : 'bg-emergency/10 text-emergency'
                  }`}>
                    {kpi.trend}
                  </span>
                )}
              </div>
              
              <div className="mb-4">
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-2xl font-bold text-primary">{kpi.value}</span>
                  <span className="text-primary/70">/{kpi.total}</span>
                </div>
                <p className="text-base font-medium text-primary">{kpi.label}</p>
                <p className="text-sm text-primary/70">{kpi.department}</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-primary/70">Utilization</span>
                  <span className="text-sm font-medium text-primary">{kpi.utilization}</span>
                </div>
                
                <div className="w-full bg-primary/20 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      kpi.status === 'available' ? 'bg-success' : 'bg-warning'
                    }`}
                    style={{ width: kpi.utilization }}
                  ></div>
                </div>

                <div className="flex justify-between items-center text-sm text-primary/70">
                  <span>Next: {kpi.nextAvailable}</span>
                  <span>{kpi.lastUpdate}</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                onClick={() => handleQuickAction(action.path)}
                className={`p-4 rounded-2xl border border-border shadow-soft hover:shadow-card transition-all hover:scale-[1.02] active:scale-[0.98] ${action.color}`}
              >
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-3 mx-auto">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium text-center text-white">{action.label}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="p-6 shadow-card rounded-2xl border">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Recent Activity</h2>
          </div>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => {
              const gradientColors = [
                "bg-gradient-to-r from-blue-100 to-blue-200 border-blue-300",
                "bg-gradient-to-r from-green-100 to-green-200 border-green-300",
                "bg-gradient-to-r from-purple-100 to-purple-200 border-purple-300",
                "bg-gradient-to-r from-pink-100 to-pink-200 border-pink-300",
                "bg-gradient-to-r from-cyan-100 to-cyan-200 border-cyan-300"
              ];
              const colorClass = gradientColors[index % gradientColors.length];
              
              return (
                <div key={index} className={`flex items-start gap-3 p-3 rounded-xl border ${colorClass} hover:shadow-md transition-all`}>
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    activity.type === 'success' ? 'bg-success' :
                    activity.type === 'emergency' ? 'bg-emergency' :
                    activity.type === 'warning' ? 'bg-warning' : 'bg-info'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Performance Stats */}
        <Card className="p-6 shadow-card rounded-2xl border">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Performance</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-emerald-100 to-emerald-200 border border-emerald-300 hover:shadow-md transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-sm font-medium">Avg Response Time</p>
                  <p className="text-xs text-muted-foreground">Last 24 hours</p>
                </div>
              </div>
              <span className="text-xl font-bold">4.2<span className="text-sm text-muted-foreground">min</span></span>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-blue-100 to-blue-200 border border-blue-300 hover:shadow-md transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-info/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-info" />
                </div>
                <div>
                  <p className="text-sm font-medium">Patients Admitted</p>
                  <p className="text-xs text-muted-foreground">Today</p>
                </div>
              </div>
              <span className="text-xl font-bold">24</span>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-orange-100 to-orange-200 border border-orange-300 hover:shadow-md transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emergency/10 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-emergency" />
                </div>
                <div>
                  <p className="text-sm font-medium">Bed Occupancy</p>
                  <p className="text-xs text-muted-foreground">Current</p>
                </div>
              </div>
              <span className="text-xl font-bold">78<span className="text-sm text-muted-foreground">%</span></span>
            </div>
          </div>
        </Card>
      </div>

      {/* Knowledge Section */}
      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        {/* Medical Tips */}
        <Card className="p-6 shadow-card rounded-2xl border">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-semibold">Medical Tips & Best Practices</h2>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">ICU Resource Management</h3>
              <p className="text-sm text-blue-800">
                Monitor ICU bed utilization closely. When occupancy exceeds 80%, consider 
                activating surge protocols and coordinating with other departments for patient transfers.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-green-50 border border-green-200">
              <h3 className="font-semibold text-green-900 mb-2">Emergency Response</h3>
              <p className="text-sm text-green-800">
                Maintain at least 2 ambulances on standby during peak hours. 
                Coordinate with dispatch to ensure optimal coverage across service areas.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-purple-50 border border-purple-200">
              <h3 className="font-semibold text-purple-900 mb-2">Blood Bank Protocols</h3>
              <p className="text-sm text-purple-800">
                Blood units should be rotated every 42 days. Monitor inventory levels 
                and coordinate with regional blood centers for emergency supplies.
              </p>
            </div>
          </div>
        </Card>

        {/* System Updates & News */}
        <Card className="p-6 shadow-card rounded-2xl border">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-semibold">System Updates & News</h2>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-xs text-emerald-700 font-medium">Latest Update</span>
              </div>
              <h3 className="font-semibold text-emerald-900 mb-1">New Analytics Dashboard</h3>
              <p className="text-sm text-emerald-800">
                Enhanced reporting features now available. Access detailed patient flow 
                analytics and resource utilization reports from the Analytics section.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-orange-50 border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-xs text-orange-700 font-medium">Maintenance</span>
              </div>
              <h3 className="font-semibold text-orange-900 mb-1">Scheduled System Maintenance</h3>
              <p className="text-sm text-orange-800">
                System maintenance scheduled for Sunday 2:00 AM - 4:00 AM. 
                Brief service interruption expected. Plan accordingly.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                <span className="text-xs text-indigo-700 font-medium">Training</span>
              </div>
              <h3 className="font-semibold text-indigo-900 mb-1">Staff Training Session</h3>
              <p className="text-sm text-indigo-800">
                New staff training on emergency protocols scheduled for Friday 3:00 PM. 
                All department heads are encouraged to attend.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
