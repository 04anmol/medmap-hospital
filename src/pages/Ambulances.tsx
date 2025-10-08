import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Ambulance, Phone, MapPin, Clock, Wrench, Plus, User, X } from "lucide-react";
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
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAmbulance, setNewAmbulance] = useState({
    vehicleId: "",
    driver: "",
    location: ""
  });

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

  const handleAddAmbulance = () => {
    if (newAmbulance.vehicleId && newAmbulance.driver && newAmbulance.location) {
      const ambulance = {
        id: String(ambulances.length + 1),
        vehicleId: newAmbulance.vehicleId,
        driver: newAmbulance.driver,
        status: "onduty" as StatusType,
        location: newAmbulance.location,
        lastPing: "Just added"
      };
      setAmbulances([...ambulances, ambulance]);
      setNewAmbulance({ vehicleId: "", driver: "", location: "" });
      setShowAddModal(false);
      toast.success("New ambulance added successfully");
    }
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-6 shadow-card rounded-2xl border-4 border-green-600 bg-green-100/80 text-green-900 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
              <Ambulance className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-green-900">{stats.onduty}</div>
              <div className="text-base text-green-700">On Duty</div>
            </div>
          </div>
        </Card>
        <Card className="p-6 shadow-card rounded-2xl border-4 border-yellow-600 bg-yellow-100/80 text-yellow-900 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-600 flex items-center justify-center">
              <Ambulance className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-900">{stats.dispatched}</div>
              <div className="text-base text-yellow-700">Dispatched</div>
            </div>
          </div>
        </Card>
        <Card className="p-6 shadow-card rounded-2xl border-4 border-gray-600 bg-gray-100/80 text-gray-900 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center">
              <Ambulance className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats.off}</div>
              <div className="text-base text-gray-700">Off Duty</div>
            </div>
          </div>
        </Card>
        <Card className="p-6 shadow-card rounded-2xl border-4 border-blue-600 bg-blue-100/80 text-blue-900 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
              <Ambulance className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-900">{stats.total}</div>
              <div className="text-base text-blue-700">Total Fleet</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters and Add Button */}
      <div className="mb-6 flex flex-wrap gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-3 items-center">
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
        <Button onClick={() => setShowAddModal(true)} className="rounded-xl gradient-primary text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Ambulance
        </Button>
      </div>

      {/* Ambulances Grid */}
      <div className="grid gap-4">
        {filteredAmbulances.map((ambulance) => (
          <Card
            key={ambulance.id}
            className="p-6 shadow-card rounded-2xl border-4 border-amber-600 bg-amber-100/80 text-amber-900 hover:shadow-lg transition-all duration-300"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-600 flex items-center justify-center">
                  <Ambulance className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-amber-900">{ambulance.vehicleId}</h3>
                  <p className="text-base text-amber-700">Driver: {ambulance.driver}</p>
                  <p className="text-base text-amber-700">Status: {ambulance.status}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <StatusBadge status={ambulance.status} />
              </div>
            </div>

            {/* Info */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-600" />
                  <span className="text-base text-amber-800">Location: {ambulance.location}</span>
                </div>
                {ambulance.distance && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-amber-600" />
                    <span className="text-base text-amber-800">Distance: {ambulance.distance}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-600" />
                  <span className="text-base text-amber-800">Last ping: {ambulance.lastPing}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-amber-600" />
                  <span className="text-base text-amber-800">Driver: {ambulance.driver}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Ambulance className="w-5 h-5 text-amber-600" />
                  <span className="text-base text-amber-800">Vehicle: {ambulance.vehicleId}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Ambulance className="w-5 h-5 text-amber-600" />
                  <span className="text-base text-amber-800">Status: {ambulance.status}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              {ambulance.status === "onduty" && (
                <Button
                  onClick={() => handleDispatch(ambulance.id)}
                  className="flex-1 bg-amber-600 border-amber-600 text-white hover:bg-amber-700 text-base font-medium"
                >
                  <Ambulance className="w-5 h-5 mr-2" />
                  Dispatch
                </Button>
              )}
              {(ambulance.status === "dispatched" || ambulance.status === "enroute") && (
                <Button className="flex-1 bg-amber-600 border-amber-600 text-white hover:bg-amber-700 text-base font-medium">
                  <MapPin className="w-5 h-5 mr-2" />
                  Track
                </Button>
              )}
              <Button
                onClick={() => handleCall(ambulance.driver)}
                className="bg-amber-600 border-amber-600 text-white hover:bg-amber-700 text-base font-medium"
                disabled={ambulance.status === "off"}
              >
                <Phone className="w-5 h-5 mr-2" />
                Call
              </Button>
              {ambulance.status === "off" && (
                <Button className="bg-amber-600 border-amber-600 text-white hover:bg-amber-700 text-base font-medium">
                  <Wrench className="w-5 h-5 mr-2" />
                  Service
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Add Ambulance Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Add New Ambulance</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowAddModal(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Vehicle ID *</label>
                <Input value={newAmbulance.vehicleId} onChange={(e) => setNewAmbulance({...newAmbulance, vehicleId: e.target.value})} placeholder="AMB-007" />
              </div>
              <div>
                <label className="text-sm font-medium">Driver Name *</label>
                <Input value={newAmbulance.driver} onChange={(e) => setNewAmbulance({...newAmbulance, driver: e.target.value})} placeholder="John Doe" />
              </div>
              <div>
                <label className="text-sm font-medium">Initial Location *</label>
                <Input value={newAmbulance.location} onChange={(e) => setNewAmbulance({...newAmbulance, location: e.target.value})} placeholder="Base Station" />
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleAddAmbulance} className="flex-1">
                  Add Ambulance
                </Button>
                <Button variant="outline" onClick={() => setShowAddModal(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
