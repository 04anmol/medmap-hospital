import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  Filter, 
  MoreHorizontal, 
  Phone, 
  Mail, 
  Calendar,
  Heart,
  AlertCircle,
  User,
  FileText
} from "lucide-react";

const patients = [
  {
    id: "P001",
    name: "John Smith",
    age: 45,
    gender: "Male",
    admissionDate: "2024-01-15",
    status: "Active",
    room: "ICU-101",
    diagnosis: "Myocardial Infarction",
    priority: "High",
    phone: "+1-555-0123",
    email: "john.smith@email.com"
  },
  {
    id: "P002", 
    name: "Sarah Johnson",
    age: 32,
    gender: "Female",
    admissionDate: "2024-01-14",
    status: "Recovering",
    room: "Ward-205",
    diagnosis: "Pneumonia",
    priority: "Medium",
    phone: "+1-555-0124",
    email: "sarah.j@email.com"
  },
  {
    id: "P003",
    name: "Michael Brown",
    age: 67,
    gender: "Male", 
    admissionDate: "2024-01-13",
    status: "Critical",
    room: "ICU-102",
    diagnosis: "Stroke",
    priority: "Critical",
    phone: "+1-555-0125",
    email: "m.brown@email.com"
  },
  {
    id: "P004",
    name: "Emily Davis",
    age: 28,
    gender: "Female",
    admissionDate: "2024-01-12",
    status: "Discharged",
    room: "N/A",
    diagnosis: "Appendicitis",
    priority: "Low",
    phone: "+1-555-0126",
    email: "emily.d@email.com"
  }
];

export default function Patients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "All" || patient.status === filterStatus;
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
      case "Critical": return "bg-emergency text-emergency-foreground";
      case "Active": return "bg-warning text-warning-foreground";
      case "Recovering": return "bg-info text-info-foreground";
      case "Discharged": return "bg-success text-success-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="gradient-primary rounded-2xl p-6 md:p-8 mb-6 text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Patient Registry</h1>
        <p className="text-white/90">Manage patient information and medical records</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search patients by name or ID..."
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
            <option value="Critical">Critical</option>
            <option value="Active">Active</option>
            <option value="Recovering">Recovering</option>
            <option value="Discharged">Discharged</option>
          </select>
          <Button className="rounded-xl">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button className="rounded-xl gradient-primary text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Patient
          </Button>
        </div>
      </div>

      {/* Patient Cards */}
      <div className="grid gap-4">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="p-6 shadow-card rounded-2xl border-2 bg-teal-100 border-teal-300 text-teal-900">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{patient.name}</h3>
                  <p className="text-sm text-muted-foreground">ID: {patient.id}</p>
                  <p className="text-sm text-muted-foreground">{patient.age} years, {patient.gender}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge className={getPriorityColor(patient.priority)}>
                  {patient.priority}
                </Badge>
                <Badge className={getStatusColor(patient.status)}>
                  {patient.status}
                </Badge>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Admitted: {patient.admissionDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Room: {patient.room}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Diagnosis: {patient.diagnosis}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{patient.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{patient.email}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <FileText className="w-4 h-4 mr-2" />
                View Records
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <AlertCircle className="w-4 h-4 mr-2" />
                Update Status
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Phone className="w-4 h-4 mr-2" />
                Contact
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <Card className="p-8 text-center">
          <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No patients found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </Card>
      )}
    </div>
  );
}
