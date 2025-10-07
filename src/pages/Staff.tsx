import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  Filter, 
  Users, 
  Phone, 
  Mail,
  Clock,
  MapPin,
  UserCheck,
  AlertCircle,
  Calendar,
  Activity
} from "lucide-react";

const staff = [
  {
    id: "S001",
    name: "Dr. Sarah Miller",
    role: "Chief of Cardiology",
    department: "Cardiology",
    status: "On Duty",
    shift: "Day Shift (7 AM - 7 PM)",
    phone: "+1-555-1001",
    email: "sarah.miller@hospital.com",
    experience: "15 years",
    specialization: "Interventional Cardiology",
    location: "Cardiology Ward",
    lastActive: "2024-01-15 14:30"
  },
  {
    id: "S002",
    name: "Dr. Michael Brown",
    role: "Emergency Physician",
    department: "Emergency Medicine",
    status: "On Call",
    shift: "Night Shift (7 PM - 7 AM)",
    phone: "+1-555-1002",
    email: "michael.brown@hospital.com",
    experience: "12 years",
    specialization: "Trauma Surgery",
    location: "Emergency Department",
    lastActive: "2024-01-15 13:45"
  },
  {
    id: "S003",
    name: "Nurse Emily Davis",
    role: "Senior ICU Nurse",
    department: "Intensive Care",
    status: "On Duty",
    shift: "Day Shift (7 AM - 7 PM)",
    phone: "+1-555-1003",
    email: "emily.davis@hospital.com",
    experience: "8 years",
    specialization: "Critical Care Nursing",
    location: "ICU Ward",
    lastActive: "2024-01-15 14:15"
  },
  {
    id: "S004",
    name: "Dr. James Wilson",
    role: "Orthopedic Surgeon",
    department: "Orthopedics",
    status: "Off Duty",
    shift: "Day Shift (7 AM - 7 PM)",
    phone: "+1-555-1004",
    email: "james.wilson@hospital.com",
    experience: "20 years",
    specialization: "Joint Replacement Surgery",
    location: "Surgery Department",
    lastActive: "2024-01-15 12:00"
  }
];

export default function Staff() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("All");

  const filteredStaff = staff.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterDepartment === "All" || member.department === filterDepartment;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Duty": return "bg-success text-success-foreground";
      case "On Call": return "bg-warning text-warning-foreground";
      case "Off Duty": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="gradient-primary rounded-2xl p-6 md:p-8 mb-6 text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Staff Management</h1>
        <p className="text-white/90">Manage hospital staff, schedules, and assignments</p>
      </div>

      {/* Staff Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 text-center">
          <Users className="w-8 h-8 text-primary mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-primary">156</h3>
          <p className="text-sm text-muted-foreground">Total Staff</p>
        </Card>
        <Card className="p-4 text-center">
          <UserCheck className="w-8 h-8 text-success mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-success">89</h3>
          <p className="text-sm text-muted-foreground">On Duty</p>
        </Card>
        <Card className="p-4 text-center">
          <Clock className="w-8 h-8 text-warning mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-warning">34</h3>
          <p className="text-sm text-muted-foreground">On Call</p>
        </Card>
        <Card className="p-4 text-center">
          <Activity className="w-8 h-8 text-info mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-info">33</h3>
          <p className="text-sm text-muted-foreground">Off Duty</p>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search staff by name, role, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="px-3 py-2 rounded-xl border border-border bg-background"
          >
            <option value="All">All Departments</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Emergency Medicine">Emergency Medicine</option>
            <option value="Intensive Care">Intensive Care</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="Surgery">Surgery</option>
          </select>
          <Button className="rounded-xl">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button className="rounded-xl gradient-primary text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Staff
          </Button>
        </div>
      </div>

      {/* Staff Cards */}
      <div className="grid gap-4">
        {filteredStaff.map((member) => (
          <Card key={member.id} className="p-6 shadow-card rounded-2xl border-2 bg-amber-100 border-amber-300 text-amber-900">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                  <p className="text-sm text-muted-foreground">ID: {member.id}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge className={getStatusColor(member.status)}>
                  {member.status}
                </Badge>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Department: {member.department}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Shift: {member.shift}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Location: {member.location}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{member.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{member.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Last Active: {member.lastActive}</span>
                </div>
              </div>
            </div>

            <div className="mb-4 p-3 bg-muted/30 rounded-xl">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-1">Experience:</p>
                  <p className="text-sm text-muted-foreground">{member.experience}</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Specialization:</p>
                  <p className="text-sm text-muted-foreground">{member.specialization}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                <Phone className="w-4 h-4 mr-2" />
                Contact
              </Button>
              <Button variant="outline" className="flex-1">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule
              </Button>
              <Button variant="outline" className="flex-1">
                <Activity className="w-4 h-4 mr-2" />
                Activity
              </Button>
              <Button variant="outline" className="flex-1">
                <Users className="w-4 h-4 mr-2" />
                Profile
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredStaff.length === 0 && (
        <Card className="p-8 text-center">
          <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No staff found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </Card>
      )}
    </div>
  );
}
