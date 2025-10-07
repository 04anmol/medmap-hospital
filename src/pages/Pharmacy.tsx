import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  Filter, 
  Pill, 
  AlertTriangle, 
  Clock,
  Package,
  Activity,
  TrendingDown,
  TrendingUp,
  AlertCircle
} from "lucide-react";

const medications = [
  {
    id: "MED001",
    name: "Morphine Sulfate",
    genericName: "Morphine",
    category: "Opioid Analgesic",
    stock: 45,
    minStock: 20,
    maxStock: 100,
    unit: "vials",
    expiryDate: "2024-06-15",
    supplier: "MedSupply Corp",
    status: "Available",
    lastRestocked: "2024-01-10",
    price: 125.50
  },
  {
    id: "MED002",
    name: "Insulin Glargine",
    genericName: "Lantus",
    category: "Antidiabetic",
    stock: 8,
    minStock: 15,
    maxStock: 50,
    unit: "vials",
    expiryDate: "2024-08-20",
    supplier: "PharmaDirect",
    status: "Low Stock",
    lastRestocked: "2024-01-05",
    price: 89.99
  },
  {
    id: "MED003",
    name: "Ceftriaxone",
    genericName: "Rocephin",
    category: "Antibiotic",
    stock: 0,
    minStock: 10,
    maxStock: 30,
    unit: "vials",
    expiryDate: "2024-05-10",
    supplier: "MedSupply Corp",
    status: "Out of Stock",
    lastRestocked: "2024-01-01",
    price: 45.75
  },
  {
    id: "MED004",
    name: "Lisinopril",
    genericName: "Prinivil",
    category: "ACE Inhibitor",
    stock: 120,
    minStock: 25,
    maxStock: 150,
    unit: "tablets",
    expiryDate: "2025-02-28",
    supplier: "Generic Pharma",
    status: "Available",
    lastRestocked: "2024-01-12",
    price: 12.30
  }
];

export default function Pharmacy() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const filteredMedications = medications.filter(med => {
    const matchesSearch = med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         med.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         med.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "All" || med.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available": return "bg-success text-success-foreground";
      case "Low Stock": return "bg-warning text-warning-foreground";
      case "Out of Stock": return "bg-emergency text-emergency-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStockTrend = (stock: number, minStock: number) => {
    if (stock === 0) return <TrendingDown className="w-4 h-4 text-emergency" />;
    if (stock <= minStock) return <AlertTriangle className="w-4 h-4 text-warning" />;
    return <TrendingUp className="w-4 h-4 text-success" />;
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="gradient-primary rounded-2xl p-6 md:p-8 mb-6 text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Pharmacy Management</h1>
        <p className="text-white/90">Medication inventory and pharmaceutical services</p>
      </div>

      {/* Pharmacy Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 text-center">
          <Package className="w-8 h-8 text-primary mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-primary">156</h3>
          <p className="text-sm text-muted-foreground">Total Medications</p>
        </Card>
        <Card className="p-4 text-center">
          <AlertTriangle className="w-8 h-8 text-warning mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-warning">8</h3>
          <p className="text-sm text-muted-foreground">Low Stock</p>
        </Card>
        <Card className="p-4 text-center">
          <AlertCircle className="w-8 h-8 text-emergency mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-emergency">3</h3>
          <p className="text-sm text-muted-foreground">Out of Stock</p>
        </Card>
        <Card className="p-4 text-center">
          <Activity className="w-8 h-8 text-success mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-success">145</h3>
          <p className="text-sm text-muted-foreground">Available</p>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search medications by name, generic name, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 rounded-xl border border-border bg-background"
          >
            <option value="All">All Status</option>
            <option value="Available">Available</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
          <Button className="rounded-xl">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button className="rounded-xl gradient-primary text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Medication
          </Button>
        </div>
      </div>

      {/* Medication Cards */}
      <div className="grid gap-4">
        {filteredMedications.map((med) => (
          <Card key={med.id} className="p-6 shadow-card rounded-2xl border-2 bg-violet-100 border-violet-300 text-violet-900">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Pill className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{med.name}</h3>
                  <p className="text-sm text-muted-foreground">Generic: {med.genericName}</p>
                  <p className="text-sm text-muted-foreground">ID: {med.id}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge className={getStatusColor(med.status)}>
                  {med.status}
                </Badge>
                {getStockTrend(med.stock, med.minStock)}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Category: {med.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Stock: {med.stock} {med.unit}</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Min: {med.minStock} | Max: {med.maxStock}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Expiry: {med.expiryDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Supplier: {med.supplier}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Last Restocked: {med.lastRestocked}</span>
                </div>
              </div>
            </div>

            <div className="mb-4 p-3 bg-muted/30 rounded-xl">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Stock Level:</span>
                <span className="text-sm font-medium">${med.price.toFixed(2)} per {med.unit}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 mt-2">
                <div 
                  className={`h-2 rounded-full ${
                    med.stock === 0 ? 'bg-emergency' :
                    med.stock <= med.minStock ? 'bg-warning' : 'bg-success'
                  }`}
                  style={{ width: `${Math.min((med.stock / med.maxStock) * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                <Package className="w-4 h-4 mr-2" />
                Restock
              </Button>
              <Button variant="outline" className="flex-1">
                <Activity className="w-4 h-4 mr-2" />
                View Details
              </Button>
              <Button variant="outline" className="flex-1">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Alert Supplier
              </Button>
              <Button variant="outline" className="flex-1">
                <Clock className="w-4 h-4 mr-2" />
                Expiry Check
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredMedications.length === 0 && (
        <Card className="p-8 text-center">
          <Pill className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No medications found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </Card>
      )}
    </div>
  );
}
