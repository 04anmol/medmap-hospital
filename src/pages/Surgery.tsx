import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Activity, Plus, User, Clock, MapPin, X, Calendar, Stethoscope } from "lucide-react";
import { toast } from "sonner";

interface SurgeryData {
  id: string;
  patientName: string;
  procedure: string;
  surgeon: string;
  scheduledTime: string;
  duration: string;
  status: "scheduled" | "in-progress" | "completed" | "cancelled";
  room: string;
  priority: "low" | "medium" | "high" | "urgent";
}

const mockSurgeries: SurgeryData[] = [
  {
    id: "S001",
    patientName: "John Smith",
    procedure: "Appendectomy",
    surgeon: "Dr. Johnson",
    scheduledTime: "2024-01-15 09:00",
    duration: "2 hours",
    status: "scheduled",
    room: "OR-1",
    priority: "high"
  },
  {
    id: "S002",
    patientName: "Sarah Wilson",
    procedure: "Knee Replacement",
    surgeon: "Dr. Brown",
    scheduledTime: "2024-01-15 11:00",
    duration: "4 hours",
    status: "scheduled",
    room: "OR-2",
    priority: "medium"
  },
  {
    id: "S003",
    patientName: "Mike Davis",
    procedure: "Gallbladder Removal",
    surgeon: "Dr. Lee",
    scheduledTime: "2024-01-15 14:00",
    duration: "3 hours",
    status: "in-progress",
    room: "OR-3",
    priority: "urgent"
  }
];

export default function Surgery() {
  const [surgeries, setSurgeries] = useState(mockSurgeries);
  const [filter, setFilter] = useState<string>("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSurgery, setNewSurgery] = useState({
    patientName: "",
    procedure: "",
    surgeon: "",
    scheduledTime: "",
    duration: "",
    room: "",
    priority: "medium"
  });

  const filters = ["all", "scheduled", "in-progress", "completed", "cancelled"];

  const stats = {
    total: surgeries.length,
    scheduled: surgeries.filter((s) => s.status === "scheduled").length,
    inProgress: surgeries.filter((s) => s.status === "in-progress").length,
    completed: surgeries.filter((s) => s.status === "completed").length
  };

  const filteredSurgeries = filter === "all" ? surgeries : surgeries.filter((s) => s.status === filter);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "bg-red-100 text-red-800 border-red-200";
      case "high": return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled": return "bg-blue-100 text-blue-800 border-blue-200";
      case "in-progress": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "completed": return "bg-green-100 text-green-800 border-green-200";
      case "cancelled": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleAddSurgery = () => {
    if (newSurgery.patientName && newSurgery.procedure && newSurgery.surgeon && newSurgery.scheduledTime) {
      const surgery = {
        id: `S${String(surgeries.length + 1).padStart(3, '0')}`,
        patientName: newSurgery.patientName,
        procedure: newSurgery.procedure,
        surgeon: newSurgery.surgeon,
        scheduledTime: newSurgery.scheduledTime,
        duration: newSurgery.duration,
        status: "scheduled" as const,
        room: newSurgery.room,
        priority: newSurgery.priority as "low" | "medium" | "high" | "urgent"
      };
      setSurgeries([...surgeries, surgery]);
      setNewSurgery({ patientName: "", procedure: "", surgeon: "", scheduledTime: "", duration: "", room: "", priority: "medium" });
      setShowAddModal(false);
      toast.success("New surgery scheduled successfully");
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="gradient-primary rounded-2xl p-6 md:p-8 mb-6 text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Surgery Schedule</h1>
        <p className="text-white/90">Manage surgical procedures and schedules</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-6 shadow-card rounded-2xl border-4 border-blue-600 bg-blue-100/80 text-blue-900 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-900">{stats.total}</div>
              <div className="text-base text-blue-700">Total Surgeries</div>
            </div>
          </div>
        </Card>
        <Card className="p-6 shadow-card rounded-2xl border-4 border-green-600 bg-green-100/80 text-green-900 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-green-900">{stats.scheduled}</div>
              <div className="text-base text-green-700">Scheduled</div>
            </div>
          </div>
        </Card>
        <Card className="p-6 shadow-card rounded-2xl border-4 border-yellow-600 bg-yellow-100/80 text-yellow-900 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-600 flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-900">{stats.inProgress}</div>
              <div className="text-base text-yellow-700">In Progress</div>
            </div>
          </div>
        </Card>
        <Card className="p-6 shadow-card rounded-2xl border-4 border-purple-600 bg-purple-100/80 text-purple-900 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-900">{stats.completed}</div>
              <div className="text-base text-purple-700">Completed</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters and Add Button */}
      <div className="mb-6 flex flex-wrap gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-3 items-center">
          <span className="text-sm font-medium">Status:</span>
          {filters.map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={filter === filterOption ? "pill-filter-active" : "pill-filter"}
            >
              {filterOption === "all" ? "All" : filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
            </button>
          ))}
        </div>
        <Button onClick={() => setShowAddModal(true)} className="rounded-xl gradient-primary text-white">
          <Plus className="w-4 h-4 mr-2" />
          Schedule Surgery
        </Button>
      </div>

      {/* Surgery Cards */}
      <div className="grid gap-4">
        {filteredSurgeries.map((surgery) => (
          <Card key={surgery.id} className="p-6 shadow-card rounded-2xl border-4 border-violet-600 bg-violet-100/80 text-violet-900 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-violet-600 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-violet-900">{surgery.patientName}</h3>
                  <p className="text-base text-violet-700">Procedure: {surgery.procedure}</p>
                  <p className="text-base text-violet-700">Surgeon: {surgery.surgeon}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium border ${getPriorityColor(surgery.priority)}`}>
                  {surgery.priority.toUpperCase()}
                </span>
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium border ${getStatusColor(surgery.status)}`}>
                  {surgery.status.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-violet-600" />
                  <span className="text-base text-violet-800">Scheduled: {surgery.scheduledTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-violet-600" />
                  <span className="text-base text-violet-800">Duration: {surgery.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-violet-600" />
                  <span className="text-base text-violet-800">Room: {surgery.room}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-violet-600" />
                  <span className="text-base text-violet-800">Patient: {surgery.patientName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-violet-600" />
                  <span className="text-base text-violet-800">Surgeon: {surgery.surgeon}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-violet-600" />
                  <span className="text-base text-violet-800">Procedure: {surgery.procedure}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1 bg-violet-600 border-violet-600 text-white hover:bg-violet-700 text-base font-medium">
                <Activity className="w-5 h-5 mr-2" />
                View Details
              </Button>
              <Button variant="outline" className="bg-violet-600 border-violet-600 text-white hover:bg-violet-700 text-base font-medium">
                <Clock className="w-5 h-5 mr-2" />
                Update Status
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Surgery Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Schedule New Surgery</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowAddModal(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Patient Name *</label>
                <Input value={newSurgery.patientName} onChange={(e) => setNewSurgery({...newSurgery, patientName: e.target.value})} placeholder="John Doe" />
              </div>
              <div>
                <label className="text-sm font-medium">Procedure *</label>
                <Input value={newSurgery.procedure} onChange={(e) => setNewSurgery({...newSurgery, procedure: e.target.value})} placeholder="Appendectomy" />
              </div>
              <div>
                <label className="text-sm font-medium">Surgeon *</label>
                <Input value={newSurgery.surgeon} onChange={(e) => setNewSurgery({...newSurgery, surgeon: e.target.value})} placeholder="Dr. Johnson" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Scheduled Time *</label>
                  <Input type="datetime-local" value={newSurgery.scheduledTime} onChange={(e) => setNewSurgery({...newSurgery, scheduledTime: e.target.value})} />
                </div>
                <div>
                  <label className="text-sm font-medium">Duration</label>
                  <Input value={newSurgery.duration} onChange={(e) => setNewSurgery({...newSurgery, duration: e.target.value})} placeholder="2 hours" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Operating Room</label>
                  <Input value={newSurgery.room} onChange={(e) => setNewSurgery({...newSurgery, room: e.target.value})} placeholder="OR-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Priority</label>
                  <select value={newSurgery.priority} onChange={(e) => setNewSurgery({...newSurgery, priority: e.target.value})} className="w-full px-3 py-2 border border-input rounded-md">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleAddSurgery} className="flex-1">
                  Schedule Surgery
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
