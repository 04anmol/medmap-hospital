import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplet, Plus, Minus, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface BloodInventory {
  type: string;
  units: number;
  threshold: number;
  component: string;
}

const mockInventory: BloodInventory[] = [
  { type: "A+", units: 45, threshold: 20, component: "Whole Blood" },
  { type: "A-", units: 12, threshold: 15, component: "Whole Blood" },
  { type: "B+", units: 38, threshold: 20, component: "Whole Blood" },
  { type: "B-", units: 8, threshold: 15, component: "Whole Blood" },
  { type: "AB+", units: 22, threshold: 15, component: "Whole Blood" },
  { type: "AB-", units: 5, threshold: 10, component: "Whole Blood" },
  { type: "O+", units: 67, threshold: 25, component: "Whole Blood" },
  { type: "O-", units: 18, threshold: 20, component: "Whole Blood" },
];

export default function BloodBank() {
  const [inventory, setInventory] = useState(mockInventory);
  const [filter, setFilter] = useState<string>("all");

  const components = ["all", "Whole Blood", "Plasma", "Platelets", "RBC"];

  const totalUnits = inventory.reduce((sum, item) => sum + item.units, 0);
  const lowStock = inventory.filter((item) => item.units < item.threshold).length;

  const getStockStatus = (units: number, threshold: number) => {
    if (units === 0) return { status: "out", color: "bg-emergency/10 text-emergency border-emergency/20" };
    if (units < threshold) return { status: "low", color: "bg-warning/10 text-warning border-warning/20" };
    return { status: "in-stock", color: "bg-success/10 text-success border-success/20" };
  };

  const updateUnits = (type: string, delta: number) => {
    setInventory(
      inventory.map((item) =>
        item.type === type ? { ...item, units: Math.max(0, item.units + delta) } : item
      )
    );
    toast.success(delta > 0 ? "Units added" : "Units removed");
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="gradient-emergency rounded-2xl p-6 md:p-8 mb-6 text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Blood Bank</h1>
        <p className="text-white/90">Manage blood inventory and stock levels</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 shadow-card rounded-2xl border">
          <div className="text-2xl font-bold text-emergency">{totalUnits}</div>
          <div className="text-sm text-muted-foreground">Total Units</div>
        </Card>
        <Card className="p-4 shadow-card rounded-2xl border">
          <div className="text-2xl font-bold text-success">{inventory.filter((i) => i.units >= i.threshold).length}</div>
          <div className="text-sm text-muted-foreground">In Stock</div>
        </Card>
        <Card className="p-4 shadow-card rounded-2xl border">
          <div className="text-2xl font-bold text-warning">{lowStock}</div>
          <div className="text-sm text-muted-foreground">Low Stock</div>
        </Card>
        <Card className="p-4 shadow-card rounded-2xl border">
          <div className="text-2xl font-bold text-muted-foreground">{inventory.filter((i) => i.units === 0).length}</div>
          <div className="text-sm text-muted-foreground">Out of Stock</div>
        </Card>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-3 items-center">
        <span className="text-sm font-medium">Component:</span>
        {components.map((component) => (
          <button
            key={component}
            onClick={() => setFilter(component)}
            className={filter === component ? "pill-filter-active" : "pill-filter"}
          >
            {component === "all" ? "All" : component}
          </button>
        ))}
      </div>

      {/* Inventory Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {inventory
          .filter((item) => filter === "all" || item.component === filter)
          .map((item) => {
            const stockStatus = getStockStatus(item.units, item.threshold);
            return (
              <Card key={item.type} className="p-5 shadow-card rounded-2xl border hover:shadow-elevated transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-emergency/10 flex items-center justify-center">
                      <Droplet className="w-5 h-5 text-emergency" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">{item.type}</h3>
                      <p className="text-xs text-muted-foreground">{item.component}</p>
                    </div>
                  </div>
                  {item.units < item.threshold && (
                    <AlertTriangle className="w-5 h-5 text-warning" />
                  )}
                </div>

                <div className="mb-4">
                  <div className="text-3xl font-bold mb-2">{item.units}</div>
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border ${stockStatus.color}`}>
                    {stockStatus.status.toUpperCase()}
                  </span>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => updateUnits(item.type, 5)}
                    variant="outline"
                    size="sm"
                    className="flex-1 rounded-xl"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add 5
                  </Button>
                  <Button
                    onClick={() => updateUnits(item.type, -1)}
                    variant="outline"
                    size="sm"
                    className="flex-1 rounded-xl"
                    disabled={item.units === 0}
                  >
                    <Minus className="w-4 h-4 mr-1" />
                    Remove
                  </Button>
                </div>

                {item.units < item.threshold && (
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    Below threshold ({item.threshold} units)
                  </p>
                )}
              </Card>
            );
          })}
      </div>
    </div>
  );
}
