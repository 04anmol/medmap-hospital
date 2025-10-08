import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Clock, MapPin, Phone, User, Droplet, Wind } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { toast } from "sonner";

interface EmergencyRequest {
  id: string;
  priority: "critical" | "high" | "medium";
  patient: {
    name: string;
    age: number;
    bloodType: string;
  };
  location: string;
  distance: string;
  requestTime: string;
  slaMinutes: number;
  resources: string[];
}

const mockRequests: EmergencyRequest[] = [
  {
    id: "REQ-001",
    priority: "critical",
    patient: { name: "Sarah Johnson", age: 45, bloodType: "A+" },
    location: "2.3 miles away",
    distance: "2.3",
    requestTime: "2 mins ago",
    slaMinutes: 120,
    resources: ["ICU Bed", "Blood Transfusion"],
  },
  {
    id: "REQ-002",
    priority: "high",
    patient: { name: "Mike Chen", age: 62, bloodType: "O-" },
    location: "3.8 miles away",
    distance: "3.8",
    requestTime: "5 mins ago",
    slaMinutes: 115,
    resources: ["Oxygen Support"],
  },
  {
    id: "REQ-003",
    priority: "medium",
    patient: { name: "Emily Davis", age: 28, bloodType: "B+" },
    location: "5.2 miles away",
    distance: "5.2",
    requestTime: "8 mins ago",
    slaMinutes: 112,
    resources: ["ICU Bed"],
  },
  {
    id: "REQ-004",
    priority: "critical",
    patient: { name: "Robert Wilson", age: 67, bloodType: "AB-" },
    location: "1.8 miles away",
    distance: "1.8",
    requestTime: "1 min ago",
    slaMinutes: 119,
    resources: ["ICU Bed", "Ventilator", "Blood Transfusion"],
  },
  {
    id: "REQ-005",
    priority: "high",
    patient: { name: "Lisa Martinez", age: 34, bloodType: "O+" },
    location: "4.1 miles away",
    distance: "4.1",
    requestTime: "6 mins ago",
    slaMinutes: 114,
    resources: ["Oxygen Support", "ICU Bed"],
  },
  {
    id: "REQ-006",
    priority: "medium",
    patient: { name: "David Thompson", age: 52, bloodType: "B-" },
    location: "6.7 miles away",
    distance: "6.7",
    requestTime: "10 mins ago",
    slaMinutes: 110,
    resources: ["ICU Bed"],
  },
  {
    id: "REQ-007",
    priority: "critical",
    patient: { name: "Anna Rodriguez", age: 29, bloodType: "A-" },
    location: "2.9 miles away",
    distance: "2.9",
    requestTime: "3 mins ago",
    slaMinutes: 117,
    resources: ["Blood Transfusion", "ICU Bed"],
  },
  {
    id: "REQ-008",
    priority: "high",
    patient: { name: "James Brown", age: 71, bloodType: "O-" },
    location: "3.5 miles away",
    distance: "3.5",
    requestTime: "7 mins ago",
    slaMinutes: 113,
    resources: ["Ventilator", "Oxygen Support"],
  },
];

export default function LiveRequests() {
  const [requests, setRequests] = useState(mockRequests);

  const handleAccept = (id: string) => {
    toast.success("Emergency request accepted!");
    setRequests(requests.filter((r) => r.id !== id));
  };

  const handleDecline = (id: string) => {
    toast.error("Request declined");
    setRequests(requests.filter((r) => r.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-emergency/10 text-emergency border-emergency/20";
      case "high":
        return "bg-warning/10 text-warning border-warning/20";
      default:
        return "bg-info/10 text-info border-info/20";
    }
  };

  const getSLAColor = (minutes: number) => {
    if (minutes < 30) return "text-emergency";
    if (minutes < 60) return "text-warning";
    return "text-success";
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="gradient-primary rounded-2xl p-6 md:p-8 mb-6 text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Live Requests</h1>
        <p className="text-white/90">Incoming emergency requests</p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-6 shadow-card rounded-2xl border-4 border-red-600 bg-red-100/80 text-red-900 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-red-900">{requests.length}</div>
              <div className="text-base text-red-700">Pending Requests</div>
            </div>
          </div>
        </Card>
        <Card className="p-6 shadow-card rounded-2xl border-4 border-green-600 bg-green-100/80 text-green-900 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-green-900">18</div>
              <div className="text-base text-green-700">Accepted Today</div>
            </div>
          </div>
        </Card>
        <Card className="p-6 shadow-card rounded-2xl border-4 border-blue-600 bg-blue-100/80 text-blue-900 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-900">4.2</div>
              <div className="text-base text-blue-700">Avg Response (min)</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Requests Queue */}
      <div className="space-y-4">
        {requests.length === 0 ? (
          <Card className="p-12 text-center shadow-card rounded-2xl border">
            <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium text-muted-foreground">No pending requests</p>
            <p className="text-sm text-muted-foreground mt-2">New emergency requests will appear here</p>
          </Card>
        ) : (
          <div className="grid gap-4">
            {requests.map((request) => (
              <Card key={request.id} className="p-6 shadow-card rounded-2xl border-4 border-orange-600 bg-orange-100/80 text-orange-900 hover:shadow-lg transition-all duration-300">
                {/* Header Row */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center">
                      <AlertCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-orange-900">{request.patient.name}</h3>
                      <p className="text-base text-orange-700">ID: {request.id}</p>
                      <p className="text-base text-orange-700">{request.patient.age} years, Blood Type: {request.patient.bloodType}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-bold uppercase border ${getPriorityColor(request.priority)}`}>
                      {request.priority}
                    </span>
                    <div className="flex items-center gap-2">
                      <Clock className={`w-5 h-5 ${getSLAColor(request.slaMinutes)}`} />
                      <span className={`text-base font-medium ${getSLAColor(request.slaMinutes)}`}>
                        {Math.floor(request.slaMinutes / 60)}:{(request.slaMinutes % 60).toString().padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Patient Info */}
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-orange-600" />
                      <span className="text-base text-orange-800">{request.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-orange-600" />
                      <span className="text-base text-orange-800">Requested: {request.requestTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Droplet className="w-5 h-5 text-orange-600" />
                      <span className="text-base text-orange-800">Blood Type: {request.patient.bloodType}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-base font-medium text-orange-900">Requested Resources:</p>
                    <div className="flex flex-wrap gap-2">
                      {request.resources.map((resource, idx) => (
                        <span key={idx} className="bg-orange-200/50 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                          {resource === "ICU Bed" && <Wind className="w-4 h-4 inline mr-1" />}
                          {resource === "Blood Transfusion" && <Droplet className="w-4 h-4 inline mr-1" />}
                          {resource === "Oxygen Support" && <Wind className="w-4 h-4 inline mr-1" />}
                          {resource === "Ventilator" && <Wind className="w-4 h-4 inline mr-1" />}
                          {resource}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleAccept(request.id)}
                    className="flex-1 bg-green-600 border-green-600 text-white hover:bg-green-700 text-base font-medium"
                  >
                    <Clock className="w-5 h-5 mr-2" />
                    Accept & Assign
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleDecline(request.id)}
                    className="flex-1 bg-red-600 border-red-600 text-white hover:bg-red-700 text-base font-medium"
                  >
                    <AlertCircle className="w-5 h-5 mr-2" />
                    Decline
                  </Button>
                  <Button variant="outline" className="bg-orange-600 border-orange-600 text-white hover:bg-orange-700 text-base font-medium">
                    <Phone className="w-5 h-5 mr-2" />
                    Call
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
