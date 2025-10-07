import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  Filter, 
  AlertTriangle, 
  User, 
  Clock,
  Heart,
  Activity,
  Phone,
  MapPin,
  Stethoscope,
  AlertCircle
} from "lucide-react";

const emergencyCases = [
  {
    id: "E001",
    patientName: "Robert Wilson",
    age: 58,
    gender: "Male",
    arrivalTime: "2024-01-15 14:30",
    priority: "Critical",
    condition: "Chest Pain",
    vitalSigns: "BP: 180/110, HR: 120, Temp: 98.6°F",
    assignedDoctor: "Dr. Sarah Miller",
    status: "Active",
    location: "ER Room 1",
    contact: "+1-555-0401",
    notes: "Severe chest pain, possible MI. Immediate attention required."
  },
  {
    id: "E002",
    patientName: "Lisa Anderson",
    age: 34,
    gender: "Female",
    arrivalTime: "2024-01-15 13:45",
    priority: "High",
    condition: "Severe Allergic Reaction",
    vitalSigns: "BP: 90/60, HR: 140, Temp: 99.2°F",
    assignedDoctor: "Dr. Michael Brown",
    status: "Stabilizing",
    location: "ER Room 2",
    contact: "+1-555-0402",
    notes: "Anaphylactic shock from food allergy. Epinephrine administered."
  },
  {
    id: "E003",
    patientName: "David Thompson",
    age: 72,
    gender: "Male",
    arrivalTime: "2024-01-15 12:15",
    priority: "High",
    condition: "Stroke Symptoms",
    vitalSigns: "BP: 160/95, HR: 85, Temp: 98.8°F",
    assignedDoctor: "Dr. Emily Davis",
    status: "Under Observation",
    location: "ER Room 3",
    contact: "+1-555-0403",
    notes: "Sudden onset of weakness and speech difficulty. CT scan ordered."
  },
  {
    id: "E004",
    patientName: "Maria Garcia",
    age: 29,
    gender: "Female",
    arrivalTime: "2024-01-15 11:20",
    priority: "Medium",
    condition: "Severe Abdominal Pain",
    vitalSigns: "BP: 110/70, HR: 95, Temp: 100.4°F",
    assignedDoctor: "Dr. James Wilson",
    status: "Waiting for Tests",
    location: "ER Room 4",
    contact: "+1-555-0404",
    notes: "Acute appendicitis suspected. Blood work and imaging in progress."
  }
];

export default function Emergency() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState("All");

  const filteredCases = emergencyCases.filter(case_ => {
    const matchesSearch = case_.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.condition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterPriority === "All" || case_.priority === filterPriority;
    return matchesSearch && matchesFilter;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-emergency text-emergency-foreground";
      case "High": return "bg-warning text-warning-foreground";
      case "Medium": return "bg-info text-info-foreground";
      case "Low": return "bg-success text-success-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-emergency text-emergency-foreground";
      case "Stabilizing": return "bg-warning text-warning-foreground";
      case "Under Observation": return "bg-info text-info-foreground";
      case "Waiting for Tests": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="gradient-primary rounded-2xl p-6 md:p-8 mb-6 text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Emergency Department</h1>
        <p className="text-white/90">Real-time emergency cases and patient monitoring</p>
      </div>

      {/* Emergency Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 text-center">
          <AlertTriangle className="w-8 h-8 text-emergency mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-emergency">3</h3>
          <p className="text-sm text-muted-foreground">Critical Cases</p>
        </Card>
        <Card className="p-4 text-center">
          <Activity className="w-8 h-8 text-warning mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-warning">5</h3>
          <p className="text-sm text-muted-foreground">Active Cases</p>
        </Card>
        <Card className="p-4 text-center">
          <Clock className="w-8 h-8 text-info mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-info">12</h3>
          <p className="text-sm text-muted-foreground">Avg Wait Time (min)</p>
        </Card>
        <Card className="p-4 text-center">
          <Heart className="w-8 h-8 text-success mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-success">8</h3>
          <p className="text-sm text-muted-foreground">Discharged Today</p>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search cases by patient name, ID, or condition..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-3 py-2 rounded-xl border border-border bg-background"
          >
            <option value="All">All Priorities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <Button className="rounded-xl">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button className="rounded-xl gradient-primary text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Case
          </Button>
        </div>
      </div>

      {/* Emergency Cases */}
      <div className="grid gap-4">
        {filteredCases.map((case_) => (
          <Card key={case_.id} className="p-6 shadow-card rounded-2xl border-2 bg-red-100 border-red-300 text-red-900">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Stethoscope className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{case_.patientName}</h3>
                  <p className="text-sm text-muted-foreground">Case ID: {case_.id}</p>
                  <p className="text-sm text-muted-foreground">{case_.age} years, {case_.gender}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge className={getPriorityColor(case_.priority)}>
                  {case_.priority}
                </Badge>
                <Badge className={getStatusColor(case_.status)}>
                  {case_.status}
                </Badge>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Arrival: {case_.arrivalTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Condition: {case_.condition}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Vitals: {case_.vitalSigns}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Doctor: {case_.assignedDoctor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Location: {case_.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{case_.contact}</span>
                </div>
              </div>
            </div>

            <div className="mb-4 p-3 bg-muted/30 rounded-xl">
              <p className="text-sm font-medium mb-1">Notes:</p>
              <p className="text-sm text-muted-foreground">{case_.notes}</p>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1 bg-emergency hover:bg-emergency/90 text-white">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Urgent Action
              </Button>
              <Button variant="outline" className="flex-1">
                <User className="w-4 h-4 mr-2" />
                Patient Details
              </Button>
              <Button variant="outline" className="flex-1">
                <Phone className="w-4 h-4 mr-2" />
                Contact
              </Button>
              <Button variant="outline" className="flex-1">
                <Stethoscope className="w-4 h-4 mr-2" />
                Update Status
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredCases.length === 0 && (
        <Card className="p-8 text-center">
          <Stethoscope className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No emergency cases found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </Card>
      )}
    </div>
  );
}
