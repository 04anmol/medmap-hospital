import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bed, Filter } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="gradient-primary rounded-2xl p-6 md:p-8 mb-6 text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Beds & ICU</h1>
        <p className="text-white/90">Manage bed availability and assignments</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 shadow-card rounded-2xl border">
          <div className="text-2xl font-bold">{stats.available}</div>
          <div className="text-sm text-muted-foreground">Available</div>
        </Card>
        <Card className="p-4 shadow-card rounded-2xl border">
          <div className="text-2xl font-bold">{stats.occupied}</div>
          <div className="text-sm text-muted-foreground">Occupied</div>
        </Card>
        <Card className="p-4 shadow-card rounded-2xl border">
          <div className="text-2xl font-bold">{stats.cleaning}</div>
          <div className="text-sm text-muted-foreground">Cleaning</div>
        </Card>
        <Card className="p-4 shadow-card rounded-2xl border">
          <div className="text-2xl font-bold">{stats.total}</div>
          <div className="text-sm text-muted-foreground">Total</div>
        </Card>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-3">
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

      {/* Beds Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredBeds.map((bed) => (
          <Card key={bed.id} className="p-5 shadow-card rounded-2xl border hover:shadow-elevated transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-lg">{bed.name}</h3>
                <p className="text-sm text-muted-foreground">{bed.ward}</p>
              </div>
              <Bed className="w-5 h-5 text-primary" />
            </div>

            <div className="space-y-3 mb-4">
              <StatusBadge status={bed.status} />
              {bed.ventilator && (
                <span className="inline-flex items-center text-xs bg-info/10 text-info px-2 py-1 rounded-full">
                  Ventilator
                </span>
              )}
              {bed.patient && (
                <p className="text-sm">
                  <span className="text-muted-foreground">Patient:</span>{" "}
                  <span className="font-medium">{bed.patient}</span>
                </p>
              )}
            </div>

            <Button
              onClick={() => toggleStatus(bed.id)}
              variant="outline"
              className="w-full rounded-xl"
              disabled={bed.status === "cleaning" || bed.status === "blocked"}
            >
              {bed.status === "available" ? "Mark Occupied" : "Mark Available"}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
