import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wind, Plus, Minus, AlertTriangle, Package } from "lucide-react";
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 shadow-card rounded-2xl border">
            <div className="text-2xl font-bold text-success">{totalOxygen}</div>
            <div className="text-sm text-muted-foreground">Available</div>
          </Card>
          <Card className="p-4 shadow-card rounded-2xl border">
            <div className="text-2xl font-bold text-info">
              {oxygenStock.reduce((sum, item) => sum + item.inUse, 0)}
            </div>
            <div className="text-sm text-muted-foreground">In Use</div>
          </Card>
          <Card className="p-4 shadow-card rounded-2xl border">
            <div className="text-2xl font-bold text-warning">{lowOxygen}</div>
            <div className="text-sm text-muted-foreground">Low Stock</div>
          </Card>
          <Card className="p-4 shadow-card rounded-2xl border">
            <div className="text-2xl font-bold text-muted-foreground">
              {oxygenStock.reduce((sum, item) => sum + item.refilling, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Refilling</div>
          </Card>
        </div>

        {/* Oxygen Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {oxygenStock.map((item) => (
            <Card
              key={item.id}
              className="p-5 shadow-card rounded-2xl border hover:shadow-elevated transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                    <Wind className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">{item.type}</h3>
                    <p className="text-xs text-muted-foreground">Size {item.size}</p>
                  </div>
                </div>
                {item.available < item.threshold && (
                  <AlertTriangle className="w-5 h-5 text-warning" />
                )}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Available:</span>
                  <span className="font-bold">{item.available}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">In Use:</span>
                  <span className="font-medium">{item.inUse}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Refilling:</span>
                  <span className="font-medium">{item.refilling}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => updateOxygen(item.id, 5)}
                  variant="outline"
                  size="sm"
                  className="flex-1 rounded-xl"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </Button>
                <Button
                  onClick={() => updateOxygen(item.id, -1)}
                  variant="outline"
                  size="sm"
                  className="flex-1 rounded-xl"
                  disabled={item.available === 0}
                >
                  <Minus className="w-4 h-4 mr-1" />
                  Use
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Equipment Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Medical Equipment</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {equipment.map((item) => (
            <Card
              key={item.id}
              className="p-5 shadow-card rounded-2xl border hover:shadow-elevated transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-info/10 flex items-center justify-center">
                  <Package className="w-5 h-5 text-info" />
                </div>
                <h3 className="font-bold">{item.name}</h3>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Available:</span>
                  <span className="font-bold text-success">{item.available}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">In Use:</span>
                  <span className="font-medium">{item.inUse}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Maintenance:</span>
                  <span className="font-medium text-warning">{item.maintenance}</span>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total:</span>
                    <span className="font-bold">{item.total}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-success h-2 rounded-full transition-all"
                    style={{ width: `${(item.available / item.total) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground text-center mt-1">
                  {Math.round((item.available / item.total) * 100)}% available
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
