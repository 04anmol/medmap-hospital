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
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="p-4 shadow-card rounded-2xl border text-center">
          <div className="text-2xl font-bold text-emergency">{requests.length}</div>
          <div className="text-sm text-muted-foreground">Pending</div>
        </Card>
        <Card className="p-4 shadow-card rounded-2xl border text-center">
          <div className="text-2xl font-bold text-success">18</div>
          <div className="text-sm text-muted-foreground">Accepted Today</div>
        </Card>
        <Card className="p-4 shadow-card rounded-2xl border text-center">
          <div className="text-2xl font-bold text-info">4.2</div>
          <div className="text-sm text-muted-foreground">Avg Response (min)</div>
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
          requests.map((request) => (
            <Card key={request.id} className="p-6 shadow-card rounded-2xl border hover:shadow-elevated transition-shadow">
              {/* Header Row */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase border ${getPriorityColor(request.priority)}`}>
                    {request.priority}
                  </span>
                  <span className="text-sm text-muted-foreground">{request.id}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className={`w-4 h-4 ${getSLAColor(request.slaMinutes)}`} />
                  <span className={`text-sm font-medium ${getSLAColor(request.slaMinutes)}`}>
                    {Math.floor(request.slaMinutes / 60)}:{(request.slaMinutes % 60).toString().padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* Patient Info */}
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{request.patient.name}</span>
                    <span className="text-sm text-muted-foreground">• {request.patient.age}y</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Droplet className="w-4 h-4 text-emergency" />
                    <span className="text-sm">Blood Type: <span className="font-semibold">{request.patient.bloodType}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-info" />
                    <span className="text-sm">{request.location}</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Requested Resources:</p>
                  <div className="flex flex-wrap gap-2">
                    {request.resources.map((resource, idx) => (
                      <span key={idx} className="pill-filter-active text-xs">
                        {resource === "ICU Bed" && <Wind className="w-3 h-3 inline mr-1" />}
                        {resource === "Blood Transfusion" && <Droplet className="w-3 h-3 inline mr-1" />}
                        {resource === "Oxygen Support" && <Wind className="w-3 h-3 inline mr-1" />}
                        {resource}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-4 border-t">
                <Button
                  onClick={() => handleAccept(request.id)}
                  className="flex-1 h-12 gradient-success text-white font-semibold rounded-xl hover:opacity-90"
                >
                  Accept & Assign
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleDecline(request.id)}
                  className="h-12 px-6 rounded-xl"
                >
                  Decline
                </Button>
                <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl">
                  <Phone className="w-5 h-5" />
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
