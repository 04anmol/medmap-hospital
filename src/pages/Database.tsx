import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Database,
  Download,
  Upload,
  RefreshCw,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  HardDrive,
  Activity,
  Trash2,
  Archive
} from "lucide-react";

const databaseStats = {
  totalSize: "2.4 TB",
  usedSpace: "1.8 TB",
  freeSpace: "600 GB",
  tables: 156,
  records: 2847392,
  lastBackup: "2024-01-15 02:00:00",
  backupSize: "1.2 TB",
  status: "Healthy"
};

const backupHistory = [
  {
    id: "B001",
    date: "2024-01-15 02:00:00",
    size: "1.2 TB",
    status: "Completed",
    type: "Full Backup",
    duration: "2h 15m"
  },
  {
    id: "B002",
    date: "2024-01-14 02:00:00",
    size: "1.1 TB",
    status: "Completed",
    type: "Full Backup",
    duration: "2h 8m"
  },
  {
    id: "B003",
    date: "2024-01-13 02:00:00",
    size: "1.0 TB",
    status: "Failed",
    type: "Full Backup",
    duration: "0h 45m"
  },
  {
    id: "B004",
    date: "2024-01-12 02:00:00",
    size: "1.1 TB",
    status: "Completed",
    type: "Full Backup",
    duration: "2h 12m"
  }
];

const systemTables = [
  {
    name: "patients",
    records: 1247392,
    size: "850 MB",
    lastUpdated: "2024-01-15 14:30:00",
    status: "Active"
  },
  {
    name: "medical_records",
    records: 892456,
    size: "1.2 GB",
    lastUpdated: "2024-01-15 14:25:00",
    status: "Active"
  },
  {
    name: "staff",
    records: 1256,
    size: "45 MB",
    lastUpdated: "2024-01-15 14:20:00",
    status: "Active"
  },
  {
    name: "appointments",
    records: 456789,
    size: "320 MB",
    lastUpdated: "2024-01-15 14:15:00",
    status: "Active"
  }
];

export default function Database() {
  const [isBackingUp, setIsBackingUp] = useState(false);

  const handleBackup = () => {
    setIsBackingUp(true);
    // Simulate backup process
    setTimeout(() => {
      setIsBackingUp(false);
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-success text-success-foreground";
      case "Failed": return "bg-emergency text-emergency-foreground";
      case "Active": return "bg-success text-success-foreground";
      case "Healthy": return "bg-success text-success-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed": return <CheckCircle className="w-4 h-4" />;
      case "Failed": return <AlertTriangle className="w-4 h-4" />;
      case "Active": return <Activity className="w-4 h-4" />;
      case "Healthy": return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="gradient-primary rounded-2xl p-6 md:p-8 mb-6 text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Database Management</h1>
        <p className="text-white/90">Monitor and manage hospital database systems</p>
      </div>

      {/* Database Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 text-center">
          <HardDrive className="w-8 h-8 text-primary mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-primary">{databaseStats.totalSize}</h3>
          <p className="text-sm text-muted-foreground">Total Size</p>
        </Card>
        <Card className="p-4 text-center">
          <Database className="w-8 h-8 text-success mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-success">{databaseStats.usedSpace}</h3>
          <p className="text-sm text-muted-foreground">Used Space</p>
        </Card>
        <Card className="p-4 text-center">
          <Shield className="w-8 h-8 text-info mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-info">{databaseStats.tables}</h3>
          <p className="text-sm text-muted-foreground">Tables</p>
        </Card>
        <Card className="p-4 text-center">
          <Activity className="w-8 h-8 text-warning mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-warning">{databaseStats.records.toLocaleString()}</h3>
          <p className="text-sm text-muted-foreground">Records</p>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Database Status */}
        <Card className="p-6 shadow-card rounded-2xl border-2 bg-violet-100 border-violet-300 text-violet-900">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
              <Database className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-violet-900">Database Status</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
              <span className="text-sm font-medium">System Status</span>
              <Badge className={getStatusColor(databaseStats.status)}>
                {getStatusIcon(databaseStats.status)}
                <span className="ml-1">{databaseStats.status}</span>
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
              <span className="text-sm font-medium">Free Space</span>
              <span className="text-sm font-bold text-success">{databaseStats.freeSpace}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
              <span className="text-sm font-medium">Last Backup</span>
              <span className="text-sm font-bold text-info">{databaseStats.lastBackup}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
              <span className="text-sm font-medium">Backup Size</span>
              <span className="text-sm font-bold text-primary">{databaseStats.backupSize}</span>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6 shadow-card rounded-2xl border-2 bg-lime-100 border-lime-300 text-lime-900">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-lime-600 rounded-lg flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-lime-900">Quick Actions</h2>
          </div>
          <div className="space-y-3">
            <Button 
              className="w-full justify-start" 
              onClick={handleBackup}
              disabled={isBackingUp}
            >
              {isBackingUp ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Archive className="w-4 h-4 mr-2" />
              )}
              {isBackingUp ? "Creating Backup..." : "Create Backup"}
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Download className="w-4 h-4 mr-2" />
              Download Backup
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Upload className="w-4 h-4 mr-2" />
              Restore Backup
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <RefreshCw className="w-4 h-4 mr-2" />
              Optimize Database
            </Button>
          </div>
        </Card>
      </div>

      {/* Backup History */}
      <Card className="p-6 shadow-card rounded-2xl border-2 bg-amber-100 border-amber-300 text-amber-900 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center">
            <Clock className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-lg font-semibold text-amber-900">Backup History</h2>
        </div>
        <div className="space-y-3">
          {backupHistory.map((backup) => (
            <div key={backup.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Archive className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{backup.type}</p>
                  <p className="text-xs text-muted-foreground">{backup.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">{backup.size}</span>
                <span className="text-sm text-muted-foreground">{backup.duration}</span>
                <Badge className={getStatusColor(backup.status)}>
                  {getStatusIcon(backup.status)}
                  <span className="ml-1">{backup.status}</span>
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* System Tables */}
      <Card className="p-6 shadow-card rounded-2xl border-2 bg-orange-100 border-orange-300 text-orange-900">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
            <Database className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-lg font-semibold text-orange-900">System Tables</h2>
        </div>
        <div className="space-y-3">
          {systemTables.map((table) => (
            <div key={table.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Database className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{table.name}</p>
                  <p className="text-xs text-muted-foreground">{table.records.toLocaleString()} records</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">{table.size}</span>
                <span className="text-sm text-muted-foreground">{table.lastUpdated}</span>
                <Badge className={getStatusColor(table.status)}>
                  {getStatusIcon(table.status)}
                  <span className="ml-1">{table.status}</span>
                </Badge>
                <Button variant="outline" size="sm">
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
