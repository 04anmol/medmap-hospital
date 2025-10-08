import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bed, Filter, Plus, User, MapPin, Wind, X } from "lucide-react";
import { StatusBadge, StatusType } from "@/components/ui/status-badge";
import { toast } from "sonner";

interface BedData {
  id: string;
  name: string;
  ward: string;
  status: StatusType;
  ventilator: boolean;
  patient?: string;
}

const mockBeds: BedData[] = [
  { id: "1", name: "ICU-01", ward: "ICU", status: "occupied", ventilator: true, patient: "John Doe" },
  { id: "2", name: "ICU-02", ward: "ICU", status: "available", ventilator: true },
  { id: "3", name: "ICU-03", ward: "ICU", status: "cleaning", ventilator: false },
  { id: "4", name: "ICU-04", ward: "ICU", status: "available", ventilator: true },
  { id: "5", name: "ICU-05", ward: "ICU", status: "occupied", ventilator: false, patient: "Jane Smith" },
  { id: "6", name: "CCU-01", ward: "CCU", status: "available", ventilator: true },
  { id: "7", name: "CCU-02", ward: "CCU", status: "blocked", ventilator: false },
  { id: "8", name: "CCU-03", ward: "CCU", status: "occupied", ventilator: true, patient: "Mike Johnson" },
];

export default function Beds() {
  const [beds, setBeds] = useState(mockBeds);
  const [filterWard, setFilterWard] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBed, setNewBed] = useState({
    name: "",
    ward: "",
    ventilator: false
  });

  const wards = ["all", ...Array.from(new Set(beds.map((b) => b.ward)))];
  const statuses = ["all", "available", "occupied", "cleaning", "blocked"];

  const filteredBeds = beds.filter((bed) => {
    if (filterWard !== "all" && bed.ward !== filterWard) return false;
    if (filterStatus !== "all" && bed.status !== filterStatus) return false;
    return true;
  });

  const stats = {
    total: beds.length,
    available: beds.filter((b) => b.status === "available").length,
    occupied: beds.filter((b) => b.status === "occupied").length,
    cleaning: beds.filter((b) => b.status === "cleaning").length,
  };

  const toggleStatus = (id: string) => {
    setBeds(
      beds.map((bed) =>
        bed.id === id
          ? { ...bed, status: bed.status === "available" ? "occupied" : "available" as StatusType }
          : bed
      )
    );
    toast.success("Bed status updated");
  };

  const handleAddBed = () => {
    if (newBed.name && newBed.ward) {
      const bed = {
        id: String(beds.length + 1),
        name: newBed.name,
        ward: newBed.ward,
        status: "available" as StatusType,
        ventilator: newBed.ventilator
      };
      setBeds([...beds, bed]);
      setNewBed({ name: "", ward: "", ventilator: false });
      setShowAddModal(false);
      toast.success("New bed added successfully");
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="gradient-primary rounded-2xl p-6 md:p-8 mb-6 text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Beds & ICU</h1>
        <p className="text-white/90">Manage bed availability and assignments</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-6 shadow-card rounded-2xl border-4 border-green-600 bg-green-100/80 text-green-900 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
              <Bed className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-green-900">{stats.available}</div>
              <div className="text-base text-green-700">Available</div>
            </div>
          </div>
        </Card>
        <Card className="p-6 shadow-card rounded-2xl border-4 border-red-600 bg-red-100/80 text-red-900 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-red-900">{stats.occupied}</div>
              <div className="text-base text-red-700">Occupied</div>
            </div>
          </div>
        </Card>
        <Card className="p-6 shadow-card rounded-2xl border-4 border-yellow-600 bg-yellow-100/80 text-yellow-900 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-600 flex items-center justify-center">
              <Filter className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-900">{stats.cleaning}</div>
              <div className="text-base text-yellow-700">Cleaning</div>
            </div>
          </div>
        </Card>
        <Card className="p-6 shadow-card rounded-2xl border-4 border-blue-600 bg-blue-100/80 text-blue-900 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
              <Bed className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-900">{stats.total}</div>
              <div className="text-base text-blue-700">Total Beds</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters and Add Button */}
      <div className="mb-6 flex flex-wrap gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Ward:</span>
            {wards.map((ward) => (
              <button
                key={ward}
                onClick={() => setFilterWard(ward)}
                className={filterWard === ward ? "pill-filter-active" : "pill-filter"}
              >
                {ward === "all" ? "All" : ward}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Status:</span>
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={filterStatus === status ? "pill-filter-active" : "pill-filter"}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <Button onClick={() => setShowAddModal(true)} className="rounded-xl gradient-primary text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Bed
        </Button>
      </div>

      {/* Beds Grid */}
      <div className="grid gap-4">
        {filteredBeds.map((bed) => (
          <Card key={bed.id} className="p-6 shadow-card rounded-2xl border-4 border-cyan-600 bg-cyan-100/80 text-cyan-900 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-cyan-600 flex items-center justify-center">
                  <Bed className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-cyan-900">{bed.name}</h3>
                  <p className="text-base text-cyan-700">Ward: {bed.ward}</p>
                  <p className="text-base text-cyan-700">Status: {bed.status}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <StatusBadge status={bed.status} />
                {bed.ventilator && (
                  <span className="inline-flex items-center text-xs bg-cyan-200/50 text-cyan-800 px-2 py-1 rounded-full">
                    <Wind className="w-3 h-3 mr-1" />
                    Ventilator
                  </span>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-cyan-600" />
                  <span className="text-base text-cyan-800">Ward: {bed.ward}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bed className="w-5 h-5 text-cyan-600" />
                  <span className="text-base text-cyan-800">Bed: {bed.name}</span>
                </div>
                {bed.ventilator && (
                  <div className="flex items-center gap-2">
                    <Wind className="w-5 h-5 text-cyan-600" />
                    <span className="text-base text-cyan-800">Ventilator Available</span>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                {bed.patient && (
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-cyan-600" />
                    <span className="text-base text-cyan-800">Patient: {bed.patient}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Bed className="w-5 h-5 text-cyan-600" />
                  <span className="text-base text-cyan-800">Status: {bed.status}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => toggleStatus(bed.id)}
                className="flex-1 bg-cyan-600 border-cyan-600 text-white hover:bg-cyan-700 text-base font-medium"
                disabled={bed.status === "cleaning" || bed.status === "blocked"}
              >
                <Bed className="w-5 h-5 mr-2" />
                {bed.status === "available" ? "Mark Occupied" : "Mark Available"}
              </Button>
              <Button variant="outline" className="bg-cyan-600 border-cyan-600 text-white hover:bg-cyan-700 text-base font-medium">
                <User className="w-5 h-5 mr-2" />
                Assign
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Bed Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Add New Bed</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowAddModal(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Bed Name *</label>
                <Input value={newBed.name} onChange={(e) => setNewBed({...newBed, name: e.target.value})} placeholder="ICU-01" />
              </div>
              <div>
                <label className="text-sm font-medium">Ward *</label>
                <select value={newBed.ward} onChange={(e) => setNewBed({...newBed, ward: e.target.value})} className="w-full px-3 py-2 border border-input rounded-md">
                  <option value="">Select Ward</option>
                  <option value="ICU">ICU</option>
                  <option value="CCU">CCU</option>
                  <option value="General">General</option>
                  <option value="Emergency">Emergency</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="ventilator" checked={newBed.ventilator} onChange={(e) => setNewBed({...newBed, ventilator: e.target.checked})} />
                <label htmlFor="ventilator" className="text-sm font-medium">Has Ventilator</label>
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleAddBed} className="flex-1">
                  Add Bed
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
