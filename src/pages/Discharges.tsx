import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  Filter, 
  Clock, 
  User, 
  FileText,
  CheckCircle,
  Calendar,
  Phone,
  Mail,
  Heart,
  AlertCircle
} from "lucide-react";

const discharges = [
  {
    id: "D001",
    patientName: "Emily Davis",
    age: 28,
    gender: "Female",
    admissionDate: "2024-01-10",
    dischargeDate: "2024-01-15",
    status: "Ready",
    diagnosis: "Appendicitis",
    treatment: "Laparoscopic Appendectomy",
    room: "Ward-205",
    doctor: "Dr. Sarah Miller",
    contact: "+1-555-0301",
    email: "emily.d@email.com",
    dischargeNotes: "Patient recovered well from surgery, no complications. Follow-up in 2 weeks."
  },
  {
    id: "D002",
    patientName: "James Wilson",
    age: 45,
    gender: "Male",
    admissionDate: "2024-01-08",
    dischargeDate: "2024-01-15",
    status: "Processing",
    diagnosis: "Pneumonia",
    treatment: "Antibiotic Therapy",
    room: "Ward-301",
    doctor: "Dr. Michael Brown",
    contact: "+1-555-0302",
    email: "james.w@email.com",
    dischargeNotes: "Pneumonia resolved with antibiotic treatment. Patient stable for discharge."
  },
  {
    id: "D003",
    patientName: "Lisa Anderson",
    age: 52,
    gender: "Female",
    admissionDate: "2024-01-12",
    dischargeDate: "2024-01-15",
    status: "Completed",
    diagnosis: "Gallbladder Surgery",
    treatment: "Laparoscopic Cholecystectomy",
    room: "Ward-102",
    doctor: "Dr. Emily Davis",
    contact: "+1-555-0303",
    email: "lisa.a@email.com",
    dischargeNotes: "Surgery successful, patient ready for discharge. Prescription provided."
  },
  {
    id: "D004",
    patientName: "Robert Thompson",
    age: 67,
    gender: "Male",
    admissionDate: "2024-01-05",
    dischargeDate: "2024-01-15",
    status: "Ready",
    diagnosis: "Hip Fracture",
    treatment: "Hip Replacement Surgery",
    room: "Ward-401",
    doctor: "Dr. James Wilson",
    contact: "+1-555-0304",
    email: "robert.t@email.com",
    dischargeNotes: "Hip replacement successful, patient mobile with assistance. Physical therapy scheduled."
  }
];

export default function Discharges() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const filteredDischarges = discharges.filter(discharge => {
    const matchesSearch = discharge.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discharge.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "All" || discharge.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ready": return "bg-success text-success-foreground";
      case "Processing": return "bg-warning text-warning-foreground";
      case "Completed": return "bg-info text-info-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Ready": return <CheckCircle className="w-4 h-4" />;
      case "Processing": return <Clock className="w-4 h-4" />;
      case "Completed": return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="gradient-primary rounded-2xl p-6 md:p-8 mb-6 text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Patient Discharges</h1>
        <p className="text-white/90">Manage patient discharge process and documentation</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search discharges by patient name or ID..."
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
            <option value="Ready">Ready</option>
            <option value="Processing">Processing</option>
            <option value="Completed">Completed</option>
          </select>
          <Button className="rounded-xl">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button className="rounded-xl gradient-primary text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Discharge
          </Button>
        </div>
      </div>

      {/* Discharge Cards */}
      <div className="grid gap-4">
        {filteredDischarges.map((discharge) => (
          <Card key={discharge.id} className="p-6 shadow-card rounded-2xl border-2 bg-emerald-100 border-emerald-300 text-emerald-900">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{discharge.patientName}</h3>
                  <p className="text-sm text-muted-foreground">ID: {discharge.id}</p>
                  <p className="text-sm text-muted-foreground">{discharge.age} years, {discharge.gender}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge className={getStatusColor(discharge.status)}>
                  {getStatusIcon(discharge.status)}
                  <span className="ml-1">{discharge.status}</span>
                </Badge>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Admitted: {discharge.admissionDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Discharge: {discharge.dischargeDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Room: {discharge.room}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Diagnosis: {discharge.diagnosis}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Doctor: {discharge.doctor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{discharge.contact}</span>
                </div>
              </div>
            </div>

            <div className="mb-4 p-3 bg-muted/30 rounded-xl">
              <p className="text-sm font-medium mb-1">Treatment:</p>
              <p className="text-sm text-muted-foreground">{discharge.treatment}</p>
            </div>

            <div className="mb-4 p-3 bg-muted/30 rounded-xl">
              <p className="text-sm font-medium mb-1">Discharge Notes:</p>
              <p className="text-sm text-muted-foreground">{discharge.dischargeNotes}</p>
            </div>

            <div className="flex gap-2">
              {discharge.status === "Ready" && (
                <>
                  <Button className="flex-1 bg-success hover:bg-success/90 text-white">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Process Discharge
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <FileText className="w-4 h-4 mr-2" />
                    Print Documents
                  </Button>
                </>
              )}
              {discharge.status === "Processing" && (
                <>
                  <Button className="flex-1 bg-info hover:bg-info/90 text-white">
                    <Clock className="w-4 h-4 mr-2" />
                    Complete Process
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <FileText className="w-4 h-4 mr-2" />
                    View Progress
                  </Button>
                </>
              )}
              {discharge.status === "Completed" && (
                <>
                  <Button variant="outline" className="flex-1">
                    <FileText className="w-4 h-4 mr-2" />
                    View Documents
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <User className="w-4 h-4 mr-2" />
                    Patient Profile
                  </Button>
                </>
              )}
              <Button variant="outline" className="flex-1">
                <Phone className="w-4 h-4 mr-2" />
                Contact
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredDischarges.length === 0 && (
        <Card className="p-8 text-center">
          <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No discharges found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </Card>
      )}
    </div>
  );
}
