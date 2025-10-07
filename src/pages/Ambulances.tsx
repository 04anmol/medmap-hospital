import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ambulance, Phone, MapPin, Clock, Wrench } from "lucide-react";
import { StatusBadge, StatusType } from "@/components/ui/status-badge";
import { toast } from "sonner";

interface AmbulanceData {
  id: string;
  vehicleId: string;
  driver: string;
  status: StatusType;
  location: string;
  lastPing: string;
  distance?: string;
}

const mockAmbulances: AmbulanceData[] = [
  {
    id: "1",
    vehicleId: "AMB-001",
    driver: "John Martinez",
    status: "onduty",
    location: "Base Station",
    lastPing: "1 min ago",
  },
  {
    id: "2",
    vehicleId: "AMB-002",
    driver: "Sarah Johnson",
    status: "enroute",
    location: "En route to emergency",
    lastPing: "30 sec ago",
    distance: "2.3 miles",
  },
  {
    id: "3",
    vehicleId: "AMB-003",
    driver: "Mike Chen",
    status: "dispatched",
    location: "Heading to pickup",
    lastPing: "45 sec ago",
    distance: "4.1 miles",
  },
  {
    id: "4",
    vehicleId: "AMB-004",
    driver: "Emily Davis",
    status: "onduty",
    location: "Base Station",
    lastPing: "2 mins ago",
  },
  {
    id: "5",
    vehicleId: "AMB-005",
    driver: "Robert Wilson",
    status: "off",
    location: "Maintenance",
    lastPing: "1 hour ago",
  },
  {
    id: "6",
    vehicleId: "AMB-006",
    driver: "Lisa Anderson",
    status: "onduty",
    location: "Base Station",
    lastPing: "3 mins ago",
  },
];

export default function Ambulances() {
  const [ambulances, setAmbulances] = useState(mockAmbulances);
  const [filter, setFilter] = useState<string>("all");

  const filters = ["all", "onduty", "dispatched", "enroute", "off"];

  const stats = {
    total: ambulances.length,
    onduty: ambulances.filter((a) => a.status === "onduty").length,
    dispatched: ambulances.filter((a) => a.status === "dispatched" || a.status === "enroute").length,
    off: ambulances.filter((a) => a.status === "off").length,
  };

  const filteredAmbulances =
    filter === "all" ? ambulances : ambulances.filter((a) => a.status === filter);

  const handleCall = (driver: string) => {
    toast.success(`Calling ${driver}...`);
  };

  const handleDispatch = (id: string) => {
    setAmbulances(
      ambulances.map((amb) =>
        amb.id === id ? { ...amb, status: "dispatched" as StatusType } : amb
      )
    );
    toast.success("Ambulance dispatched!");
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="gradient-primary rounded-2xl p-6 md:p-8 mb-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Ambulances</h1>
            <p className="text-white/90">Fleet management and dispatch</p>
          </div>
          <Ambulance className="w-12 h-12 text-white/50" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 shadow-card rounded-2xl border">
          <div className="text-2xl font-bold text-success">{stats.onduty}</div>
          <div className="text-sm text-muted-foreground">On Duty</div>
        </Card>
        <Card className="p-4 shadow-card rounded-2xl border">
          <div className="text-2xl font-bold text-warning">{stats.dispatched}</div>
          <div className="text-sm text-muted-foreground">Dispatched</div>
        </Card>
        <Card className="p-4 shadow-card rounded-2xl border">
          <div className="text-2xl font-bold text-muted-foreground">{stats.off}</div>
          <div className="text-sm text-muted-foreground">Off Duty</div>
        </Card>
        <Card className="p-4 shadow-card rounded-2xl border">
          <div className="text-2xl font-bold">{stats.total}</div>
          <div className="text-sm text-muted-foreground">Total Fleet</div>
        </Card>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-3 items-center">
        <span className="text-sm font-medium">Status:</span>
        {filters.map((filterOption) => (
          <button
            key={filterOption}
            onClick={() => setFilter(filterOption)}
            className={filter === filterOption ? "pill-filter-active" : "pill-filter"}
          >
            {filterOption === "all" ? "All" : filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
          </button>
        ))}
      </div>

      {/* Ambulances Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAmbulances.map((ambulance) => (
          <Card
            key={ambulance.id}
            className="p-5 shadow-card rounded-2xl border hover:shadow-elevated transition-shadow"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  ambulance.status === "onduty" ? "bg-success/10" :
                  ambulance.status === "dispatched" || ambulance.status === "enroute" ? "bg-warning/10" :
                  "bg-muted"
                }`}>
                  <Ambulance className={`w-6 h-6 ${
                    ambulance.status === "onduty" ? "text-success" :
                    ambulance.status === "dispatched" || ambulance.status === "enroute" ? "text-warning" :
                    "text-muted-foreground"
                  }`} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{ambulance.vehicleId}</h3>
                  <p className="text-sm text-muted-foreground">{ambulance.driver}</p>
                </div>
              </div>
              <StatusBadge status={ambulance.status} />
            </div>

            {/* Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>{ambulance.location}</span>
              </div>
              {ambulance.distance && (
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-info" />
                  <span className="font-medium text-info">{ambulance.distance}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>Last ping: {ambulance.lastPing}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              {ambulance.status === "onduty" && (
                <Button
                  onClick={() => handleDispatch(ambulance.id)}
                  className="flex-1 gradient-primary text-white rounded-xl"
                >
                  Dispatch
                </Button>
              )}
              {(ambulance.status === "dispatched" || ambulance.status === "enroute") && (
                <Button variant="outline" className="flex-1 rounded-xl">
                  <MapPin className="w-4 h-4 mr-2" />
                  Track
                </Button>
              )}
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleCall(ambulance.driver)}
                className="w-10 h-10 rounded-xl"
                disabled={ambulance.status === "off"}
              >
                <Phone className="w-4 h-4" />
              </Button>
              {ambulance.status === "off" && (
                <Button variant="outline" size="icon" className="w-10 h-10 rounded-xl">
                  <Wrench className="w-4 h-4" />
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
