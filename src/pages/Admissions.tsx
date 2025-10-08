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
  AlertCircle,
  CheckCircle,
  XCircle,
  Calendar,
  Phone,
  Mail
} from "lucide-react";

const admissions = [
  {
    id: "A001",
    patientName: "Robert Wilson",
    age: 58,
    gender: "Male",
    admissionTime: "2024-01-15 14:30",
    status: "Pending",
    priority: "High",
    diagnosis: "Chest Pain",
    department: "Cardiology",
    assignedDoctor: "Dr. Sarah Miller",
    contact: "+1-555-0201",
    notes: "Patient experiencing severe chest pain, requires immediate attention"
  },
  {
    id: "A002",
    patientName: "Lisa Anderson",
    age: 34,
    gender: "Female", 
    admissionTime: "2024-01-15 13:45",
    status: "Approved",
    priority: "Medium",
    diagnosis: "Fractured Arm",
    department: "Orthopedics",
    assignedDoctor: "Dr. James Wilson",
    contact: "+1-555-0202",
    notes: "Fall from height, X-ray shows fracture in right arm"
  },
  {
    id: "A003",
    patientName: "David Thompson",
    age: 72,
    gender: "Male",
    admissionTime: "2024-01-15 12:15",
    status: "Rejected",
    priority: "Low",
    diagnosis: "Routine Checkup",
    department: "General Medicine",
    assignedDoctor: "Dr. Emily Brown",
    contact: "+1-555-0203",
    notes: "Patient requested admission for routine checkup, not medically necessary"
  },
  {
    id: "A004",
    patientName: "Maria Garcia",
    age: 29,
    gender: "Female",
    admissionTime: "2024-01-15 11:20",
    status: "Pending",
    priority: "Critical",
    diagnosis: "Severe Allergic Reaction",
    department: "Emergency",
    assignedDoctor: "Dr. Michael Davis",
    contact: "+1-555-0204",
    notes: "Anaphylactic shock, requires immediate ICU admission"
  }
];

export default function Admissions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAdmission, setNewAdmission] = useState({
    patientName: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    department: "",
    priority: "Medium",
    notes: ""
  });

  const filteredAdmissions = admissions.filter(admission => {
    const matchesSearch = admission.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         admission.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "All" || admission.status === filterStatus;
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

  const handleAddAdmission = () => {
    if (newAdmission.patientName && newAdmission.age && newAdmission.gender && newAdmission.phone) {
      const admission = {
        id: `A${String(admissions.length + 1).padStart(3, '0')}`,
        patientName: newAdmission.patientName,
        age: parseInt(newAdmission.age),
        gender: newAdmission.gender,
        admissionDate: new Date().toISOString().split('T')[0],
        status: "Pending",
        department: newAdmission.department || "General",
        priority: newAdmission.priority,
        contact: newAdmission.phone,
        email: newAdmission.email || "",
        notes: newAdmission.notes || ""
      };
      admissions.push(admission);
      setNewAdmission({
        patientName: "",
        age: "",
        gender: "",
        phone: "",
        email: "",
        department: "",
        priority: "Medium",
        notes: ""
      });
      setShowAddModal(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-warning text-warning-foreground";
      case "Approved": return "bg-success text-success-foreground";
      case "Rejected": return "bg-emergency text-emergency-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending": return <Clock className="w-4 h-4" />;
      case "Approved": return <CheckCircle className="w-4 h-4" />;
      case "Rejected": return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="gradient-primary rounded-2xl p-6 md:p-8 mb-6 text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Patient Admissions</h1>
        <p className="text-white/90">Manage patient admission requests and approvals</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search admissions by patient name or ID..."
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
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
          <Button className="rounded-xl">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button onClick={() => setShowAddModal(true)} className="rounded-xl gradient-primary text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Admission
          </Button>
        </div>
      </div>

      {/* Admission Cards */}
      <div className="grid gap-4">
        {filteredAdmissions.map((admission) => (
          <Card key={admission.id} className="p-6 shadow-card rounded-2xl border-2 bg-cyan-100 border-cyan-300 text-cyan-900 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{admission.patientName}</h3>
                  <p className="text-sm text-muted-foreground">ID: {admission.id}</p>
                  <p className="text-sm text-muted-foreground">{admission.age} years, {admission.gender}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge className={getPriorityColor(admission.priority)}>
                  {admission.priority}
                </Badge>
                <Badge className={getStatusColor(admission.status)}>
                  {getStatusIcon(admission.status)}
                  <span className="ml-1">{admission.status}</span>
                </Badge>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Admission Time: {admission.admissionTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Diagnosis: {admission.diagnosis}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Doctor: {admission.assignedDoctor}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Department: {admission.department}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{admission.contact}</span>
                </div>
              </div>
            </div>

            <div className="mb-4 p-3 bg-muted/30 rounded-xl">
              <p className="text-sm font-medium mb-1">Notes:</p>
              <p className="text-sm text-muted-foreground">{admission.notes}</p>
            </div>

            {admission.status === "Pending" && (
              <div className="flex gap-2">
                <Button className="flex-1 bg-success hover:bg-success/90 text-white">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve
                </Button>
                <Button variant="outline" className="flex-1 border-emergency text-emergency hover:bg-emergency hover:text-emergency-foreground">
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject
                </Button>
                <Button variant="outline" className="flex-1">
                  <FileText className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </div>
            )}

            {admission.status !== "Pending" && (
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <FileText className="w-4 h-4 mr-2" />
                  View Details
                </Button>
                <Button variant="outline" className="flex-1">
                  <User className="w-4 h-4 mr-2" />
                  Patient Profile
                </Button>
                <Button variant="outline" className="flex-1">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>

      {filteredAdmissions.length === 0 && (
        <Card className="p-8 text-center">
          <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No admissions found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </Card>
      )}

      {/* Add Admission Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">New Admission Request</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowAddModal(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Patient Name *</label>
                <Input
                  value={newAdmission.patientName}
                  onChange={(e) => setNewAdmission({...newAdmission, patientName: e.target.value})}
                  placeholder="Enter patient's full name"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Age *</label>
                  <Input
                    type="number"
                    value={newAdmission.age}
                    onChange={(e) => setNewAdmission({...newAdmission, age: e.target.value})}
                    placeholder="Age"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Gender *</label>
                  <select
                    value={newAdmission.gender}
                    onChange={(e) => setNewAdmission({...newAdmission, gender: e.target.value})}
                    className="w-full px-3 py-2 border border-input rounded-md"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Phone Number *</label>
                <Input
                  value={newAdmission.phone}
                  onChange={(e) => setNewAdmission({...newAdmission, phone: e.target.value})}
                  placeholder="+1-555-0123"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  value={newAdmission.email}
                  onChange={(e) => setNewAdmission({...newAdmission, email: e.target.value})}
                  placeholder="patient@email.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Department</label>
                  <select
                    value={newAdmission.department}
                    onChange={(e) => setNewAdmission({...newAdmission, department: e.target.value})}
                    className="w-full px-3 py-2 border border-input rounded-md"
                  >
                    <option value="">Select Department</option>
                    <option value="Emergency">Emergency</option>
                    <option value="ICU">ICU</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="General">General</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Priority</label>
                  <select
                    value={newAdmission.priority}
                    onChange={(e) => setNewAdmission({...newAdmission, priority: e.target.value})}
                    className="w-full px-3 py-2 border border-input rounded-md"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Notes</label>
                <textarea
                  value={newAdmission.notes}
                  onChange={(e) => setNewAdmission({...newAdmission, notes: e.target.value})}
                  placeholder="Additional notes or medical history"
                  className="w-full px-3 py-2 border border-input rounded-md h-20 resize-none"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleAddAdmission} className="flex-1">
                  Submit Admission
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
