import { Activity, Bed, Droplet, Ambulance, Wind, TrendingUp, Clock, Users, Edit3, Plus, Send, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

const kpis = [
  { icon: Bed, label: "ICU Beds", value: "12", total: "24", status: "available", trend: "+2" },
  { icon: Wind, label: "Ventilators", value: "8", total: "15", status: "available", trend: "0" },
  { icon: Droplet, label: "Blood Units", value: "156", total: "200", status: "low", trend: "-12" },
  { icon: Ambulance, label: "Ambulances", value: "6", total: "10", status: "available", trend: "+1" },
];

const quickActions = [
  { icon: Edit3, label: "Update ICU", color: "bg-info" },
  { icon: Plus, label: "Update Blood", color: "bg-emergency" },
  { icon: Zap, label: "Update Oxygen", color: "bg-success" },
  { icon: Send, label: "Dispatch Ambulance", color: "bg-warning" },
];

const recentActivity = [
  { time: "2 mins ago", action: "ICU Bed 12 marked available", type: "success" },
  { time: "5 mins ago", action: "Emergency request accepted", type: "emergency" },
  { time: "12 mins ago", action: "Ambulance #003 dispatched", type: "warning" },
  { time: "18 mins ago", action: "Blood type A+ restocked (+15 units)", type: "info" },
  { time: "25 mins ago", action: "Oxygen cylinder refilled", type: "success" },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      {/* Header with Gradient */}
      <div className="gradient-primary rounded-2xl p-6 md:p-8 mb-6 text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-white/90">New York Presbyterian Hospital</p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.label} className="p-4 shadow-card rounded-2xl border">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  kpi.status === 'available' ? 'bg-success/10' : 'bg-warning/10'
                }`}>
                  <Icon className={`w-5 h-5 ${
                    kpi.status === 'available' ? 'text-success' : 'text-warning'
                  }`} />
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
              <div className="mb-1">
                <span className="text-2xl font-bold">{kpi.value}</span>
                <span className="text-muted-foreground">/{kpi.total}</span>
              </div>
              <p className="text-sm text-muted-foreground">{kpi.label}</p>
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
                className="p-4 rounded-2xl bg-card border border-border shadow-soft hover:shadow-card transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className={`w-12 h-12 rounded-xl ${action.color} bg-opacity-10 flex items-center justify-center mb-3 mx-auto`}>
                  <Icon className="w-6 h-6" style={{ color: `hsl(var(--${action.color.replace('bg-', '')}))` }} />
                </div>
                <p className="text-sm font-medium text-center">{action.label}</p>
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
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
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
            ))}
          </div>
        </Card>

        {/* Performance Stats */}
        <Card className="p-6 shadow-card rounded-2xl border">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Performance</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
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
            
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
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

            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
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
    </div>
  );
}
