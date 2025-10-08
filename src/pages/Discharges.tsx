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
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDischarge, setNewDischarge] = useState({
    patientName: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    dischargeDate: "",
    dischargeType: "Routine",
    notes: ""
  });

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

  const handleAddDischarge = () => {
    if (newDischarge.patientName && newDischarge.age && newDischarge.gender && newDischarge.phone) {
      const discharge = {
        id: `D${String(discharges.length + 1).padStart(3, '0')}`,
        patientName: newDischarge.patientName,
        age: parseInt(newDischarge.age),
        gender: newDischarge.gender,
        admissionDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days ago
        dischargeDate: newDischarge.dischargeDate || new Date().toISOString().split('T')[0],
        status: "Processing",
        dischargeType: newDischarge.dischargeType,
        contact: newDischarge.phone,
        email: newDischarge.email || "",
        dischargeNotes: newDischarge.notes || ""
      };
      discharges.push(discharge);
      setNewDischarge({
        patientName: "",
        age: "",
        gender: "",
        phone: "",
        email: "",
        dischargeDate: "",
        dischargeType: "Routine",
        notes: ""
      });
      setShowAddModal(false);
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
          <Button onClick={() => setShowAddModal(true)} className="rounded-xl gradient-primary text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Discharge
          </Button>
        </div>
      </div>

      {/* Discharge Cards */}
      <div className="grid gap-4">
        {filteredDischarges.map((discharge) => (
          <Card key={discharge.id} className="p-6 shadow-card rounded-2xl border-4 border-emerald-600 bg-emerald-100/80 text-emerald-900 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-emerald-900">{discharge.patientName}</h3>
                  <p className="text-base text-emerald-700">ID: {discharge.id}</p>
                  <p className="text-base text-emerald-700">{discharge.age} years, {discharge.gender}</p>
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

            <div className="mb-4 p-3 bg-emerald-200/50 rounded-xl">
              <p className="text-base font-medium mb-1 text-emerald-900">Treatment:</p>
              <p className="text-base text-emerald-800">{discharge.treatment}</p>
            </div>

            <div className="mb-4 p-3 bg-emerald-200/50 rounded-xl">
              <p className="text-base font-medium mb-1 text-emerald-900">Discharge Notes:</p>
              <p className="text-base text-emerald-800">{discharge.dischargeNotes}</p>
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
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-base font-medium">
                    <Clock className="w-5 h-5 mr-2" />
                    Complete Process
                  </Button>
                  <Button variant="outline" className="flex-1 bg-emerald-600 border-emerald-600 text-white hover:bg-emerald-700 text-base font-medium">
                    <FileText className="w-5 h-5 mr-2" />
                    View Progress
                  </Button>
                </>
              )}
              {discharge.status === "Completed" && (
                <>
                  <Button variant="outline" className="flex-1 bg-emerald-600 border-emerald-600 text-white hover:bg-emerald-700 text-base font-medium">
                    <FileText className="w-5 h-5 mr-2" />
                    View Documents
                  </Button>
                  <Button variant="outline" className="flex-1 bg-emerald-600 border-emerald-600 text-white hover:bg-emerald-700 text-base font-medium">
                    <User className="w-5 h-5 mr-2" />
                    Patient Profile
                  </Button>
                </>
              )}
              <Button variant="outline" className="flex-1 bg-emerald-600 border-emerald-600 text-white hover:bg-emerald-700 text-base font-medium">
                <Phone className="w-5 h-5 mr-2" />
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

      {/* Add Discharge Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">New Discharge</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowAddModal(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Patient Name *</label>
                <Input
                  value={newDischarge.patientName}
                  onChange={(e) => setNewDischarge({...newDischarge, patientName: e.target.value})}
                  placeholder="Enter patient's full name"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Age *</label>
                  <Input
                    type="number"
                    value={newDischarge.age}
                    onChange={(e) => setNewDischarge({...newDischarge, age: e.target.value})}
                    placeholder="Age"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Gender *</label>
                  <select
                    value={newDischarge.gender}
                    onChange={(e) => setNewDischarge({...newDischarge, gender: e.target.value})}
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
                  value={newDischarge.phone}
                  onChange={(e) => setNewDischarge({...newDischarge, phone: e.target.value})}
                  placeholder="+1-555-0123"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  value={newDischarge.email}
                  onChange={(e) => setNewDischarge({...newDischarge, email: e.target.value})}
                  placeholder="patient@email.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Discharge Date</label>
                  <Input
                    type="date"
                    value={newDischarge.dischargeDate}
                    onChange={(e) => setNewDischarge({...newDischarge, dischargeDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Discharge Type</label>
                  <select
                    value={newDischarge.dischargeType}
                    onChange={(e) => setNewDischarge({...newDischarge, dischargeType: e.target.value})}
                    className="w-full px-3 py-2 border border-input rounded-md"
                  >
                    <option value="Routine">Routine</option>
                    <option value="Against Medical Advice">Against Medical Advice</option>
                    <option value="Transfer">Transfer</option>
                    <option value="Deceased">Deceased</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Discharge Notes</label>
                <textarea
                  value={newDischarge.notes}
                  onChange={(e) => setNewDischarge({...newDischarge, notes: e.target.value})}
                  placeholder="Discharge instructions and follow-up care"
                  className="w-full px-3 py-2 border border-input rounded-md h-20 resize-none"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleAddDischarge} className="flex-1">
                  Process Discharge
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
