import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wind, Plus, Minus, AlertTriangle, Package, X } from "lucide-react";
import { toast } from "sonner";

interface OxygenStock {
  id: string;
  type: string;
  size: string;
  available: number;
  inUse: number;
  refilling: number;
  threshold: number;
}

const mockOxygen: OxygenStock[] = [
  { id: "1", type: "Oxygen Cylinder", size: "D", available: 24, inUse: 8, refilling: 3, threshold: 15 },
  { id: "2", type: "Oxygen Cylinder", size: "E", available: 18, inUse: 12, refilling: 2, threshold: 12 },
  { id: "3", type: "Oxygen Cylinder", size: "M", available: 8, inUse: 4, refilling: 1, threshold: 8 },
  { id: "4", type: "Liquid Oxygen Tank", size: "Large", available: 5, inUse: 2, refilling: 0, threshold: 3 },
];

interface Equipment {
  id: string;
  name: string;
  available: number;
  inUse: number;
  maintenance: number;
  total: number;
}

const mockEquipment: Equipment[] = [
  { id: "1", name: "Ventilators", available: 8, inUse: 7, maintenance: 0, total: 15 },
  { id: "2", name: "Monitors", available: 12, inUse: 18, maintenance: 2, total: 32 },
  { id: "3", name: "Infusion Pumps", available: 15, inUse: 20, maintenance: 1, total: 36 },
  { id: "4", name: "Defibrillators", available: 6, inUse: 2, maintenance: 0, total: 8 },
];

export default function Oxygen() {
  const [oxygenStock, setOxygenStock] = useState(mockOxygen);
  const [equipment, setEquipment] = useState(mockEquipment);
  const [showAddOxygenModal, setShowAddOxygenModal] = useState(false);
  const [showAddEquipmentModal, setShowAddEquipmentModal] = useState(false);
  const [newOxygen, setNewOxygen] = useState({
    type: "",
    size: "",
    available: "",
    threshold: ""
  });
  const [newEquipment, setNewEquipment] = useState({
    name: "",
    available: "",
    total: ""
  });

  const totalOxygen = oxygenStock.reduce((sum, item) => sum + item.available, 0);
  const lowOxygen = oxygenStock.filter((item) => item.available < item.threshold).length;

  const updateOxygen = (id: string, delta: number) => {
    setOxygenStock(
      oxygenStock.map((item) =>
        item.id === id ? { ...item, available: Math.max(0, item.available + delta) } : item
      )
    );
    toast.success(delta > 0 ? "Stock updated" : "Stock reduced");
  };

  const handleAddOxygen = () => {
    if (newOxygen.type && newOxygen.size && newOxygen.available && newOxygen.threshold) {
      const oxygen = {
        id: String(oxygenStock.length + 1),
        type: newOxygen.type,
        size: newOxygen.size,
        available: parseInt(newOxygen.available),
        inUse: 0,
        refilling: 0,
        threshold: parseInt(newOxygen.threshold)
      };
      setOxygenStock([...oxygenStock, oxygen]);
      setNewOxygen({ type: "", size: "", available: "", threshold: "" });
      setShowAddOxygenModal(false);
      toast.success("New oxygen stock added successfully");
    }
  };

  const handleAddEquipment = () => {
    if (newEquipment.name && newEquipment.available && newEquipment.total) {
      const equip = {
        id: String(equipment.length + 1),
        name: newEquipment.name,
        available: parseInt(newEquipment.available),
        inUse: 0,
        maintenance: 0,
        total: parseInt(newEquipment.total)
      };
      setEquipment([...equipment, equip]);
      setNewEquipment({ name: "", available: "", total: "" });
      setShowAddEquipmentModal(false);
      toast.success("New equipment added successfully");
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="gradient-success rounded-2xl p-6 md:p-8 mb-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Oxygen & Equipment</h1>
            <p className="text-white/90">Manage oxygen supply and medical equipment</p>
          </div>
          <Wind className="w-12 h-12 text-white/50" />
        </div>
      </div>

      {/* Oxygen Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Oxygen Supply</h2>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-6 shadow-card rounded-2xl border-4 border-green-600 bg-green-100/80 text-green-900 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
                <Wind className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-green-900">{totalOxygen}</div>
                <div className="text-base text-green-700">Available</div>
              </div>
            </div>
          </Card>
          <Card className="p-6 shadow-card rounded-2xl border-4 border-blue-600 bg-blue-100/80 text-blue-900 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                <Wind className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-900">{oxygenStock.reduce((sum, item) => sum + item.inUse, 0)}</div>
                <div className="text-base text-blue-700">In Use</div>
              </div>
            </div>
          </Card>
          <Card className="p-6 shadow-card rounded-2xl border-4 border-yellow-600 bg-yellow-100/80 text-yellow-900 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-yellow-600 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-900">{lowOxygen}</div>
                <div className="text-base text-yellow-700">Low Stock</div>
              </div>
            </div>
          </Card>
          <Card className="p-6 shadow-card rounded-2xl border-4 border-purple-600 bg-purple-100/80 text-purple-900 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center">
                <Wind className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-900">{oxygenStock.reduce((sum, item) => sum + item.refilling, 0)}</div>
                <div className="text-base text-purple-700">Refilling</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Oxygen Grid */}
        <div className="mb-6 flex justify-end">
          <Button onClick={() => setShowAddOxygenModal(true)} className="rounded-xl gradient-primary text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Oxygen Stock
          </Button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {oxygenStock.map((item) => (
            <Card
              key={item.id}
              className="p-6 shadow-card rounded-2xl border-4 border-teal-600 bg-teal-100/80 text-teal-900 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-teal-600 flex items-center justify-center">
                    <Wind className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-teal-900">{item.type}</h3>
                    <p className="text-base text-teal-700">Size: {item.size}</p>
                    <p className="text-base text-teal-700">Available: {item.available}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {item.available < item.threshold && (
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Wind className="w-5 h-5 text-teal-600" />
                    <span className="text-base text-teal-800">Available: {item.available}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wind className="w-5 h-5 text-teal-600" />
                    <span className="text-base text-teal-800">In Use: {item.inUse}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wind className="w-5 h-5 text-teal-600" />
                    <span className="text-base text-teal-800">Refilling: {item.refilling}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-teal-600" />
                    <span className="text-base text-teal-800">Threshold: {item.threshold}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wind className="w-5 h-5 text-teal-600" />
                    <span className="text-base text-teal-800">Type: {item.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wind className="w-5 h-5 text-teal-600" />
                    <span className="text-base text-teal-800">Size: {item.size}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => updateOxygen(item.id, 5)}
                  className="flex-1 bg-teal-600 border-teal-600 text-white hover:bg-teal-700 text-base font-medium"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Stock
                </Button>
                <Button
                  onClick={() => updateOxygen(item.id, -1)}
                  className="flex-1 bg-red-600 border-red-600 text-white hover:bg-red-700 text-base font-medium"
                  disabled={item.available === 0}
                >
                  <Minus className="w-5 h-5 mr-2" />
                  Use Stock
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Equipment Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Medical Equipment</h2>
          <Button onClick={() => setShowAddEquipmentModal(true)} className="rounded-xl gradient-primary text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Equipment
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {equipment.map((item) => (
            <Card
              key={item.id}
              className="p-6 shadow-card rounded-2xl border-4 border-indigo-600 bg-indigo-100/80 text-indigo-900 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-indigo-900">{item.name}</h3>
                    <p className="text-base text-indigo-700">Available: {item.available}</p>
                    <p className="text-base text-indigo-700">Total: {item.total}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="text-base font-medium text-indigo-800">
                    {Math.round((item.available / item.total) * 100)}% available
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-indigo-600" />
                    <span className="text-base text-indigo-800">Available: {item.available}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-indigo-600" />
                    <span className="text-base text-indigo-800">In Use: {item.inUse}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-indigo-600" />
                    <span className="text-base text-indigo-800">Maintenance: {item.maintenance}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-indigo-600" />
                    <span className="text-base text-indigo-800">Total: {item.total}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-indigo-600" />
                    <span className="text-base text-indigo-800">Equipment: {item.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-indigo-600" />
                    <span className="text-base text-indigo-800">Status: {item.available > 0 ? 'Available' : 'Out of Stock'}</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="w-full bg-indigo-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full transition-all"
                    style={{ width: `${(item.available / item.total) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-700 text-base font-medium">
                  <Package className="w-5 h-5 mr-2" />
                  Manage
                </Button>
                <Button variant="outline" className="bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-700 text-base font-medium">
                  <Package className="w-5 h-5 mr-2" />
                  Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Add Oxygen Modal */}
      {showAddOxygenModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Add Oxygen Stock</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowAddOxygenModal(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Oxygen Type *</label>
                <select value={newOxygen.type} onChange={(e) => setNewOxygen({...newOxygen, type: e.target.value})} className="w-full px-3 py-2 border border-input rounded-md">
                  <option value="">Select Type</option>
                  <option value="Oxygen Cylinder">Oxygen Cylinder</option>
                  <option value="Liquid Oxygen Tank">Liquid Oxygen Tank</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Size *</label>
                <select value={newOxygen.size} onChange={(e) => setNewOxygen({...newOxygen, size: e.target.value})} className="w-full px-3 py-2 border border-input rounded-md">
                  <option value="">Select Size</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="M">M</option>
                  <option value="Large">Large</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Available Units *</label>
                  <Input type="number" value={newOxygen.available} onChange={(e) => setNewOxygen({...newOxygen, available: e.target.value})} placeholder="0" />
                </div>
                <div>
                  <label className="text-sm font-medium">Threshold *</label>
                  <Input type="number" value={newOxygen.threshold} onChange={(e) => setNewOxygen({...newOxygen, threshold: e.target.value})} placeholder="10" />
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleAddOxygen} className="flex-1">
                  Add Oxygen Stock
                </Button>
                <Button variant="outline" onClick={() => setShowAddOxygenModal(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Add Equipment Modal */}
      {showAddEquipmentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Add Medical Equipment</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowAddEquipmentModal(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Equipment Name *</label>
                <Input value={newEquipment.name} onChange={(e) => setNewEquipment({...newEquipment, name: e.target.value})} placeholder="Ventilator" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Available Units *</label>
                  <Input type="number" value={newEquipment.available} onChange={(e) => setNewEquipment({...newEquipment, available: e.target.value})} placeholder="0" />
                </div>
                <div>
                  <label className="text-sm font-medium">Total Units *</label>
                  <Input type="number" value={newEquipment.total} onChange={(e) => setNewEquipment({...newEquipment, total: e.target.value})} placeholder="0" />
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleAddEquipment} className="flex-1">
                  Add Equipment
                </Button>
                <Button variant="outline" onClick={() => setShowAddEquipmentModal(false)} className="flex-1">
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
