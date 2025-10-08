import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  Filter, 
  FileText, 
  User, 
  Calendar,
  Download,
  Eye,
  Edit,
  Trash2,
  Heart,
  Pill,
  Activity,
  AlertCircle
} from "lucide-react";

const medicalRecords = [
  {
    id: "MR001",
    patientName: "John Smith",
    patientId: "P001",
    recordType: "Medical History",
    dateCreated: "2024-01-15",
    lastUpdated: "2024-01-15 14:30",
    status: "Active",
    department: "Cardiology",
    doctor: "Dr. Sarah Miller",
    description: "Complete medical history including previous heart conditions",
    attachments: 3
  },
  {
    id: "MR002",
    patientName: "Sarah Johnson",
    patientId: "P002",
    recordType: "Lab Results",
    dateCreated: "2024-01-14",
    lastUpdated: "2024-01-14 16:45",
    status: "Active",
    department: "Laboratory",
    doctor: "Dr. Michael Brown",
    description: "Blood work and urine analysis results",
    attachments: 5
  },
  {
    id: "MR003",
    patientName: "Michael Brown",
    patientId: "P003",
    recordType: "Imaging Report",
    dateCreated: "2024-01-13",
    lastUpdated: "2024-01-13 10:20",
    status: "Active",
    department: "Radiology",
    doctor: "Dr. Emily Davis",
    description: "CT scan and MRI results for stroke assessment",
    attachments: 2
  },
  {
    id: "MR004",
    patientName: "Emily Davis",
    patientId: "P004",
    recordType: "Surgery Report",
    dateCreated: "2024-01-12",
    lastUpdated: "2024-01-12 18:15",
    status: "Archived",
    department: "Surgery",
    doctor: "Dr. James Wilson",
    description: "Appendectomy procedure documentation and post-op notes",
    attachments: 4
  }
];

export default function MedicalRecords() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRecord, setNewRecord] = useState({
    patientName: "",
    patientId: "",
    recordType: "Lab Results",
    description: "",
    doctor: "",
    date: "",
    notes: ""
  });

  const filteredRecords = medicalRecords.filter(record => {
    const matchesSearch = record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.recordType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "All" || record.recordType === filterType;
    return matchesSearch && matchesFilter;
  });

  const getRecordTypeIcon = (type: string) => {
    switch (type) {
      case "Medical History": return <Heart className="w-4 h-4" />;
      case "Lab Results": return <Activity className="w-4 h-4" />;
      case "Imaging Report": return <AlertCircle className="w-4 h-4" />;
      case "Surgery Report": return <Pill className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const handleAddRecord = () => {
    if (newRecord.patientName && newRecord.patientId && newRecord.description && newRecord.doctor) {
      const record = {
        id: `MR${String(medicalRecords.length + 1).padStart(3, '0')}`,
        patientName: newRecord.patientName,
        patientId: newRecord.patientId,
        recordType: newRecord.recordType,
        description: newRecord.description,
        doctor: newRecord.doctor,
        date: newRecord.date || new Date().toISOString().split('T')[0],
        status: "Active",
        attachments: 0,
        notes: newRecord.notes || ""
      };
      medicalRecords.push(record);
      setNewRecord({
        patientName: "",
        patientId: "",
        recordType: "Lab Results",
        description: "",
        doctor: "",
        date: "",
        notes: ""
      });
      setShowAddModal(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-success text-success-foreground";
      case "Archived": return "bg-muted text-muted-foreground";
      default: return "bg-warning text-warning-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="gradient-primary rounded-2xl p-6 md:p-8 mb-6 text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Medical Records</h1>
        <p className="text-white/90">Manage patient medical records and documentation</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search records by patient name, ID, or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 rounded-xl border border-border bg-background"
          >
            <option value="All">All Types</option>
            <option value="Medical History">Medical History</option>
            <option value="Lab Results">Lab Results</option>
            <option value="Imaging Report">Imaging Report</option>
            <option value="Surgery Report">Surgery Report</option>
          </select>
          <Button className="rounded-xl">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button onClick={() => setShowAddModal(true)} className="rounded-xl gradient-primary text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Record
          </Button>
        </div>
      </div>

      {/* Record Cards */}
      <div className="grid gap-4">
        {filteredRecords.map((record) => (
          <Card key={record.id} className="p-6 shadow-card rounded-2xl border-2 bg-slate-100 border-slate-300 text-slate-900 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  <div className="text-white">
                    {getRecordTypeIcon(record.recordType)}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{record.patientName}</h3>
                  <p className="text-sm text-muted-foreground">Record ID: {record.id}</p>
                  <p className="text-sm text-muted-foreground">Patient ID: {record.patientId}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge className={getStatusColor(record.status)}>
                  {record.status}
                </Badge>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Type: {record.recordType}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Created: {record.dateCreated}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Updated: {record.lastUpdated}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Doctor: {record.doctor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Department: {record.department}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Attachments: {record.attachments}</span>
                </div>
              </div>
            </div>

            <div className="mb-4 p-3 bg-muted/30 rounded-xl">
              <p className="text-sm font-medium mb-1">Description:</p>
              <p className="text-sm text-muted-foreground">{record.description}</p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                <Eye className="w-4 h-4 mr-2" />
                View Record
              </Button>
              <Button variant="outline" className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" className="flex-1">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline" className="flex-1 border-emergency text-emergency hover:bg-emergency hover:text-emergency-foreground">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredRecords.length === 0 && (
        <Card className="p-8 text-center">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No records found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </Card>
      )}

      {/* Add Record Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Add New Record</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowAddModal(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Patient Name *</label>
                <Input
                  value={newRecord.patientName}
                  onChange={(e) => setNewRecord({...newRecord, patientName: e.target.value})}
                  placeholder="Enter patient's full name"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Patient ID *</label>
                <Input
                  value={newRecord.patientId}
                  onChange={(e) => setNewRecord({...newRecord, patientId: e.target.value})}
                  placeholder="P001"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Record Type</label>
                <select
                  value={newRecord.recordType}
                  onChange={(e) => setNewRecord({...newRecord, recordType: e.target.value})}
                  className="w-full px-3 py-2 border border-input rounded-md"
                >
                  <option value="Lab Results">Lab Results</option>
                  <option value="Medical History">Medical History</option>
                  <option value="Imaging Report">Imaging Report</option>
                  <option value="Surgery Report">Surgery Report</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">Description *</label>
                <Input
                  value={newRecord.description}
                  onChange={(e) => setNewRecord({...newRecord, description: e.target.value})}
                  placeholder="Brief description of the record"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Doctor *</label>
                  <Input
                    value={newRecord.doctor}
                    onChange={(e) => setNewRecord({...newRecord, doctor: e.target.value})}
                    placeholder="Dr. Smith"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Date</label>
                  <Input
                    type="date"
                    value={newRecord.date}
                    onChange={(e) => setNewRecord({...newRecord, date: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Notes</label>
                <textarea
                  value={newRecord.notes}
                  onChange={(e) => setNewRecord({...newRecord, notes: e.target.value})}
                  placeholder="Additional notes or observations"
                  className="w-full px-3 py-2 border border-input rounded-md h-20 resize-none"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleAddRecord} className="flex-1">
                  Add Record
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
