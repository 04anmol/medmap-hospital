import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Droplet, Plus, Minus, AlertTriangle, Filter, X } from "lucide-react";
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
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBlood, setNewBlood] = useState({
    type: "",
    units: "",
    threshold: "",
    component: "Whole Blood"
  });

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

  const handleAddBlood = () => {
    if (newBlood.type && newBlood.units && newBlood.threshold) {
      const blood = {
        type: newBlood.type,
        units: parseInt(newBlood.units),
        threshold: parseInt(newBlood.threshold),
        component: newBlood.component
      };
      setInventory([...inventory, blood]);
      setNewBlood({ type: "", units: "", threshold: "", component: "Whole Blood" });
      setShowAddModal(false);
      toast.success("New blood type added successfully");
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="gradient-emergency rounded-2xl p-6 md:p-8 mb-6 text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Blood Bank</h1>
        <p className="text-white/90">Manage blood inventory and stock levels</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-6 shadow-card rounded-2xl border-4 border-red-600 bg-red-100/80 text-red-900 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
              <Droplet className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-red-900">{totalUnits}</div>
              <div className="text-base text-red-700">Total Units</div>
            </div>
          </div>
        </Card>
        <Card className="p-6 shadow-card rounded-2xl border-4 border-green-600 bg-green-100/80 text-green-900 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
              <Droplet className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-green-900">{inventory.filter((i) => i.units >= i.threshold).length}</div>
              <div className="text-base text-green-700">In Stock</div>
            </div>
          </div>
        </Card>
        <Card className="p-6 shadow-card rounded-2xl border-4 border-yellow-600 bg-yellow-100/80 text-yellow-900 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-600 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-900">{lowStock}</div>
              <div className="text-base text-yellow-700">Low Stock</div>
            </div>
          </div>
        </Card>
        <Card className="p-6 shadow-card rounded-2xl border-4 border-gray-600 bg-gray-100/80 text-gray-900 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center">
              <Droplet className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{inventory.filter((i) => i.units === 0).length}</div>
              <div className="text-base text-gray-700">Out of Stock</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters and Add Button */}
      <div className="mb-6 flex flex-wrap gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-3 items-center">
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
        <Button onClick={() => setShowAddModal(true)} className="rounded-xl gradient-primary text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Blood Type
        </Button>
      </div>

      {/* Inventory Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {inventory
          .filter((item) => filter === "all" || item.component === filter)
          .map((item) => {
            const stockStatus = getStockStatus(item.units, item.threshold);
            return (
              <Card key={item.type} className="p-6 shadow-card rounded-2xl border-4 border-pink-600 bg-pink-100/80 text-pink-900 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-pink-600 flex items-center justify-center">
                      <Droplet className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-pink-900">{item.type}</h3>
                      <p className="text-base text-pink-700">Component: {item.component}</p>
                      <p className="text-base text-pink-700">Units: {item.units}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium border ${stockStatus.color}`}>
                      {stockStatus.status.toUpperCase()}
                    </span>
                    {item.units < item.threshold && (
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Droplet className="w-5 h-5 text-pink-600" />
                      <span className="text-base text-pink-800">Blood Type: {item.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Droplet className="w-5 h-5 text-pink-600" />
                      <span className="text-base text-pink-800">Component: {item.component}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Droplet className="w-5 h-5 text-pink-600" />
                      <span className="text-base text-pink-800">Current Stock: {item.units} units</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-pink-600" />
                      <span className="text-base text-pink-800">Threshold: {item.threshold} units</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Droplet className="w-5 h-5 text-pink-600" />
                      <span className="text-base text-pink-800">Status: {stockStatus.status}</span>
                    </div>
                    {item.units < item.threshold && (
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-yellow-600" />
                        <span className="text-base text-yellow-800">Below threshold</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => updateUnits(item.type, 5)}
                    className="flex-1 bg-pink-600 border-pink-600 text-white hover:bg-pink-700 text-base font-medium"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add 5 Units
                  </Button>
                  <Button
                    onClick={() => updateUnits(item.type, -1)}
                    className="flex-1 bg-red-600 border-red-600 text-white hover:bg-red-700 text-base font-medium"
                    disabled={item.units === 0}
                  >
                    <Minus className="w-5 h-5 mr-2" />
                    Remove Unit
                  </Button>
                </div>
              </Card>
            );
          })}
      </div>

      {/* Add Blood Type Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Add New Blood Type</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowAddModal(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Blood Type *</label>
                <select value={newBlood.type} onChange={(e) => setNewBlood({...newBlood, type: e.target.value})} className="w-full px-3 py-2 border border-input rounded-md">
                  <option value="">Select Blood Type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Initial Units *</label>
                  <Input type="number" value={newBlood.units} onChange={(e) => setNewBlood({...newBlood, units: e.target.value})} placeholder="0" />
                </div>
                <div>
                  <label className="text-sm font-medium">Threshold *</label>
                  <Input type="number" value={newBlood.threshold} onChange={(e) => setNewBlood({...newBlood, threshold: e.target.value})} placeholder="20" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Component</label>
                <select value={newBlood.component} onChange={(e) => setNewBlood({...newBlood, component: e.target.value})} className="w-full px-3 py-2 border border-input rounded-md">
                  <option value="Whole Blood">Whole Blood</option>
                  <option value="Plasma">Plasma</option>
                  <option value="Platelets">Platelets</option>
                  <option value="RBC">RBC</option>
                </select>
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleAddBlood} className="flex-1">
                  Add Blood Type
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
